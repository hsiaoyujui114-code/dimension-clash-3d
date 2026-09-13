/**
 * 《CyberStriker: Quantum Arena》
 * 遊戲主控制器與介面驅動器 (Master App Controller)
 * 整合所有模組：登入、大廳展示台、四大大廳分頁、配技載入、60 FPS 戰鬥、AI 行為、重播短碼、雙人對打與行動觸控
 */

import { SKILLS, ARCHETYPES } from './data/skills.js';
import { SKINS } from './data/skins.js';
import { STAGES, getStageById, getRandomStage } from './data/stages.js';
import { saveSystem } from './save_system.js';
import { soundEngine } from './engine/audio.js';
import { characterRenderer } from './engine/character_renderer.js';
import { combatEngine } from './engine/combat.js';
import { stageRenderer } from './engine/stage_renderer.js';
import { announcerEngine } from './engine/announcer.js';
import { aiController } from './engine/ai.js';
import { p2pNetwork } from './network/p2p.js';

class CyberStrikerApp {
  constructor() {
    this.currentTab = 'skins';
    this.pedestalSkin = null;
    this.pedestalAction = 'idle';
    this.pedestalActionTimer = 0;
    this.pedestalTime = 0;
    this.pedestalAnimId = null;

    // 戰鬥狀態
    this.isFighting = false;
    this.matchMode = 'ai'; // 'ai', 'local_2p', 'p2p', 'training', 'arcade'
    this.aiDifficulty = 'normal';
    this.loadoutSelection = ['SK-01', 'SK-02', 'SK-09'];
    this.loadoutTimer = 15;
    this.loadoutInterval = null;

    // 主題戰鬥場景與單人街機闖關
    this.selectedStageId = 'random';
    this.currentStage = STAGES[0];
    this.arcadeMode = false;
    this.arcadeStage = 1;
    this.arcadeMaxStages = 5;
    this.arcadeScore = 0;
    this.arcadeStreakWins = 0;

    // 按鍵映射
    this.keys = {};
    this.mobileInputs = { x: 0, y: 0, punch: false, kick: false, guard: false, skill1: false, skill2: false, skill3: false, burst: false, superMove: false };

    // 畫布
    this.canvas = null;
    this.ctx = null;
    this.pedestalCanvas = null;
    this.pedestalCtx = null;
    this._battleLoopId = null;
  }

  init() {
    // 1. 初始化存檔與音效
    saveSystem.init();
    saveSystem.onSyncChange((state, msg) => {
      this.updateCloudSyncUI(state, msg);
    });
    this.pedestalSkin = this.getEquippedSkin();

    // 2. 畫布初始化
    this.canvas = document.getElementById('gameCanvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this._resizeCanvas();
      window.addEventListener('resize', () => this._resizeCanvas());
    }

    this.pedestalCanvas = document.getElementById('pedestalCanvas');
    if (this.pedestalCanvas) {
      this.pedestalCtx = this.pedestalCanvas.getContext('2d');
      this.pedestalCanvas.width = 400;
      this.pedestalCanvas.height = 360;
    }

    // 3. 綁定全域事件
    this._bindDOMEvents();
    this._bindKeyboardEvents();
    this._bindTouchEvents();

    // 4. 啟動開場載入動畫 (Splash Flow)
    this._startLoadingFlow();

    // 5. 啟動展示台渲染循環
    this._startPedestalLoop();

    // 6. 更新 UI 初始狀態
    this.updateUserHUD();
    this.renderSkinsInventory();
    this.renderShopCatalog();
  }

  _resizeCanvas() {
    if (!this.canvas) return;
    const dpr = Math.min((typeof window !== 'undefined' && window.devicePixelRatio) || 1, 2);
    this.dpr = dpr;
    this.logicalWidth = window.innerWidth;
    this.logicalHeight = window.innerHeight;
    this.canvas.width = Math.round(window.innerWidth * dpr);
    this.canvas.height = Math.round(window.innerHeight * dpr);
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';

    // 戰鬥擂台寬度與高度全面自適應螢幕，無任何被擋住的不可抵達區域
    combatEngine.arenaWidth = window.innerWidth;
    const newFloorY = Math.max(380, Math.round(window.innerHeight - 130));
    combatEngine.floorY = newFloorY;
    if (combatEngine.updatePlatforms) {
      combatEngine.updatePlatforms(window.innerWidth, newFloorY);
    }

    if (combatEngine.p1 && combatEngine.p1.isGrounded && !combatEngine.p1.currentPlatform) combatEngine.p1.y = newFloorY;
    if (combatEngine.p2 && combatEngine.p2.isGrounded && !combatEngine.p2.currentPlatform) combatEngine.p2.y = newFloorY;
  }

  // ─── 開場前置載入動畫 ───
  _startLoadingFlow() {
    const splash = document.getElementById('splashScreen');
    const bar = document.getElementById('splashProgressBar');
    const text = document.getElementById('splashStatusText');
    if (!splash || !bar || !text) return;

    let progress = 0;
    const stages = [
      { p: 35, text: '正在初始化量子戰鬥引擎 (60 FPS Physical Engine)...' },
      { p: 75, text: '正在編譯 10 大核心技能矩陣數據庫...' },
      { p: 100, text: '正在連接全息裝備網絡與雲端資料庫...' }
    ];

    const interval = setInterval(() => {
      progress += 2;
      bar.style.width = progress + '%';

      if (progress < 35) text.textContent = stages[0].text;
      else if (progress < 75) text.textContent = stages[1].text;
      else text.textContent = stages[2].text;

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          soundEngine.playHit('burst');
          splash.style.opacity = '0';
          setTimeout(() => {
            splash.style.display = 'none';
            // 進入遊戲後的第一個畫面：登入 Google 帳號授權儀
            this.openAuthModal();
          }, 500);
        }, 300);
      }
    }, 25);
  }

  // ─── 大廳展示台 (Skeletal Real-Time Pedestal) ───
  _startPedestalLoop() {
    const render = () => {
      this.pedestalTime++;
      if (this.pedestalCanvas && this.pedestalCtx) {
        const ctx = this.pedestalCtx;
        const w = this.pedestalCanvas.width;
        const h = this.pedestalCanvas.height;
        ctx.clearRect(0, 0, w, h);

        const currentSkin = this.pedestalSkin || SKINS[0];

        // 1. 繪製全息光圈底座
        characterRenderer.drawPedestal(ctx, w / 2, h - 50, 90, currentSkin, this.pedestalTime);

        // 2. 處理預覽動作計時
        if (this.pedestalActionTimer > 0) {
          this.pedestalActionTimer--;
          if (this.pedestalActionTimer <= 0) {
            this.pedestalAction = 'idle';
          }
        }

        // 3. 繪製 2D 骨骼角色
        const dummyModel = {
          x: w / 2,
          y: h - 60,
          facing: 1,
          state: this.pedestalAction,
          stateTime: this.pedestalTime,
          skin: currentSkin,
          isGuarding: this.pedestalAction.includes('guard'),
          guardStance: 'high',
          invincibleTimer: 0
        };
        characterRenderer.draw(ctx, dummyModel);
      }
      this.pedestalAnimId = requestAnimationFrame(render);
    };
    render();
  }

  previewPedestalAction(action) {
    this.pedestalAction = action;
    this.pedestalActionTimer = action === 'jump' ? 35 : 20;
    soundEngine.playHit(action === 'light_punch' ? 'punch' : (action === 'heavy_kick' ? 'kick' : (action === 'high_guard' ? 'guard' : (action === 'ranged_attack' ? 'projectile' : 'dp'))));
  }

  // ─── 畫面導航與分頁 ───
  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.toggle('active', view.id === `view_${tabId}`);
    });
    soundEngine.playUI('click');
  }

  updateUserHUD() {
    const u = saveSystem.currentUser;
    if (!u) return;

    // 頂部導航玩家資訊
    const nickEl = document.getElementById('userNickDisplay');
    const credEl = document.getElementById('userCreditsDisplay');
    const avatarEl = document.getElementById('userAvatarImg');
    const guestBadge = document.getElementById('guestStatusBadge');

    if (nickEl) nickEl.textContent = u.nickname;
    if (credEl) credEl.textContent = u.credits.toLocaleString();
    if (avatarEl) avatarEl.src = u.avatar;
    if (guestBadge) guestBadge.style.display = saveSystem.isGuest ? 'inline-block' : 'none';
    this.updateCloudSyncUI(saveSystem.syncState, saveSystem.lastSyncMessage);

    // 更新設定滑桿
    if (u.preferences) {
      soundEngine.setBgmVolume(u.preferences.bgmVol || 0.4);
      soundEngine.setSfxVolume(u.preferences.sfxVol || 0.8);
      combatEngine.enableHaptics = u.preferences.haptics !== false;
    }

    this.updateDailySupplyUI();
  }

  updateDailySupplyUI() {
    const claimRewardBtn = document.getElementById('dailyRewardClaimBtn');
    if (!claimRewardBtn) return;
    const canClaim = saveSystem.canClaimDailySupply();
    if (canClaim) {
      claimRewardBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
      claimRewardBtn.style.color = '#ffffff';
      claimRewardBtn.style.cursor = 'pointer';
      claimRewardBtn.style.opacity = '1';
      claimRewardBtn.style.border = 'none';
      claimRewardBtn.innerHTML = '<i class="fa-solid fa-gift"></i> 領取戰備補給 (+1,500 能量幣・每日限領一次)';
      claimRewardBtn.title = '點擊領取今日戰備補給 +1,500 能量幣';
    } else {
      const resetTime = saveSystem.getTimeUntilNextDailyReset();
      claimRewardBtn.style.background = '#374151';
      claimRewardBtn.style.color = '#9ca3af';
      claimRewardBtn.style.cursor = 'not-allowed';
      claimRewardBtn.style.opacity = '0.75';
      claimRewardBtn.style.border = '1px solid #4b5563';
      claimRewardBtn.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> 今日戰備補給已領取 (明日再來)';
      claimRewardBtn.title = `今日戰備補給已領取完畢！距離明日 00:00 重置還剩 ${resetTime}`;
    }
  }

  updateCloudSyncUI(state, message = '') {
    // 頂部導航狀態標籤
    const headerBadge = document.getElementById('cloudSyncHeaderBadge');
    if (headerBadge) {
      if (saveSystem.isGuest) {
        headerBadge.style.display = 'none';
      } else {
        headerBadge.style.display = 'inline-flex';
        if (state === 'syncing') {
          headerBadge.innerHTML = '<i class="fa-solid fa-rotate fa-spin" style="color: #ffd700;"></i> <span style="color: #ffd700;">同步中...</span>';
          headerBadge.title = message || '正在與全球雲端同步存檔';
        } else if (state === 'synced') {
          headerBadge.innerHTML = '<i class="fa-solid fa-cloud" style="color: #00f3ff;"></i> <span style="color: #00f3ff;">雲端同步</span>';
          headerBadge.title = message || '已連線至全球雲端伺服器 (進度跨電腦同步中)';
        } else if (state === 'error') {
          headerBadge.innerHTML = '<i class="fa-solid fa-cloud-slash" style="color: #ff007f;"></i> <span style="color: #ff007f;">本機快取</span>';
          headerBadge.title = message || '雲端連線受限，進度暫存於本機';
        } else {
          headerBadge.innerHTML = '<i class="fa-solid fa-cloud" style="color: #94a3b8;"></i> <span>雲端存檔</span>';
        }
      }
    }

    // Modal 內的同步狀態面板
    const modalIcon = document.getElementById('cloudSyncModalIcon');
    const modalTitle = document.getElementById('cloudSyncModalTitle');
    const modalDesc = document.getElementById('cloudSyncModalDesc');
    if (modalTitle) {
      if (saveSystem.isGuest) {
        if (modalIcon) modalIcon.innerHTML = '<i class="fa-solid fa-user-ninja" style="color: #ffd700;"></i>';
        modalTitle.textContent = '訪客模式：進度僅儲存於本機';
        modalTitle.style.color = '#ffd700';
        if (modalDesc) modalDesc.textContent = '輸入下方 Gmail 信箱即可升級為全球雲端帳號，跨電腦永不丟失！';
      } else if (state === 'syncing') {
        if (modalIcon) modalIcon.innerHTML = '<i class="fa-solid fa-rotate fa-spin" style="color: #ffd700;"></i>';
        modalTitle.textContent = '全球雲端存檔：正在雙向同步資料...';
        modalTitle.style.color = '#ffd700';
        if (modalDesc) modalDesc.textContent = message || '正在驗證跨電腦進度並合併最新外觀與金幣';
      } else if (state === 'synced') {
        if (modalIcon) modalIcon.innerHTML = '<i class="fa-solid fa-cloud-check" style="color: #00f3ff;"></i>';
        modalTitle.textContent = '全球雲端存檔服務：已同步最新紀錄 🟢';
        modalTitle.style.color = '#00f3ff';
        if (modalDesc) modalDesc.textContent = message || '在任何電腦登入此帳號，皆能自動接續遊玩！';
      } else if (state === 'error') {
        if (modalIcon) modalIcon.innerHTML = '<i class="fa-solid fa-cloud-slash" style="color: #ff007f;"></i>';
        modalTitle.textContent = '全球雲端存檔服務：連線暫時受限 🟡';
        modalTitle.style.color = '#ff007f';
        if (modalDesc) modalDesc.textContent = message || '已先儲存至本機，網路恢復時將自動補推至雲端。';
      } else {
        if (modalIcon) modalIcon.innerHTML = '<i class="fa-solid fa-cloud" style="color: #00f3ff;"></i>';
        modalTitle.textContent = '全球雲端存檔服務：已就緒';
        modalTitle.style.color = '#00f3ff';
        if (modalDesc) modalDesc.textContent = '登入同一個 Email 即可在任何電腦自動同步金幣、造型與戰績';
      }
    }
  }

  getEquippedSkin() {
    const u = saveSystem.currentUser;
    const skinId = u ? u.equippedSkin : 'skin_cyber_warrior';
    return SKINS.find(s => s.id === skinId) || SKINS[0];
  }

  // ─── 分頁一：我的外觀渲染 (只會出現玩家擁有的外觀) ───
  renderSkinsInventory() {
    const container = document.getElementById('skinsGrid');
    if (!container) return;

    const u = saveSystem.currentUser;
    const owned = u ? u.skins : ['skin_cyber_warrior'];
    const equipped = u ? u.equippedSkin : 'skin_cyber_warrior';

    // 嚴格篩選：只顯示玩家當前已擁有的造型
    const myOwnedSkins = SKINS.filter(s => owned.includes(s.id));

    if (myOwnedSkins.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
          <i class="fa-solid fa-box-open" style="font-size: 36px; margin-bottom: 12px; color: #00f3ff;"></i>
          <div>目前無解鎖外觀，請前往商店解鎖！</div>
        </div>
      `;
      return;
    }

    container.innerHTML = myOwnedSkins.map(s => {
      const isEquipped = equipped === s.id;

      let btnHtml = '';
      if (isEquipped) {
        btnHtml = `<button class="nav-tab-btn" style="border-color: #00ff66; color: #00ff66; width: 100%; justify-content: center; font-weight: 800;"><i class="fa-solid fa-check"></i> 戰鬥裝備中</button>`;
      } else {
        btnHtml = `<button class="nav-tab-btn equip-skin-btn" data-id="${s.id}" style="background: rgba(0, 243, 255, 0.18); border-color: #00f3ff; color: #00f3ff; width: 100%; justify-content: center; font-weight: 800;"><i class="fa-solid fa-shield"></i> 裝備此造型</button>`;
      }

      return `
        <div class="skin-card ${isEquipped ? 'equipped' : ''}" data-id="${s.id}" style="cursor: pointer;">
          <div class="skin-header">
            <div>
              <div class="skin-name" style="color: ${s.themeColor}">${s.name}</div>
              <div style="font-size: 11px; color: #94a3b8;">${s.title}</div>
            </div>
            <span class="skin-tag" style="border: 1px solid ${s.themeColor}; color: ${s.themeColor}">${s.isDefault ? '初始預設' : (s.category === 'shop' ? '已擁有' : '限定外觀')}</span>
          </div>
          <div class="skin-desc">${s.desc}</div>
          <div class="skin-vfx-box">
            <div><strong>⚡ 普攻光軌：</strong>${s.vfx.punchTrail}</div>
            <div><strong>🔥 技能特效：</strong>${s.vfx.sk1}</div>
          </div>
          ${btnHtml}
        </div>
      `;
    }).join('');

    // 綁定卡片點擊預覽與裝備
    container.querySelectorAll('.skin-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.dataset.id;
        const skinObj = SKINS.find(s => s.id === id);
        if (skinObj) {
          this.pedestalSkin = skinObj;
          soundEngine.playUI('hover');
        }
      });
    });

    container.querySelectorAll('.equip-skin-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        saveSystem.equipSkin(id);
        this.pedestalSkin = this.getEquippedSkin();
        soundEngine.playUI('equip');
        this.renderSkinsInventory();
        this.updateUserHUD();
      });
    });
  }

  // ─── 分頁二：商店渲染 ───
  renderShopCatalog(filterSeries = 'all') {
    const container = document.getElementById('shopGrid');
    if (!container) return;

    const u = saveSystem.currentUser;
    const owned = u ? u.skins : [];

    let forSaleSkins = SKINS.filter(s => s.price > 0);
    if (filterSeries && filterSeries !== 'all') {
      forSaleSkins = forSaleSkins.filter(s => s.series === filterSeries);
    }

    container.innerHTML = forSaleSkins.map(s => {
      const isOwned = owned.includes(s.id);
      const isMarvel = s.series === '漫威宇宙';
      const isDB = s.series === '七龍珠超';
      const isBrawl = s.series === '荒野亂鬥';

      return `
        <div class="skin-card">
          <div class="skin-header">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
                ${isBrawl ? '<span style="font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 4px; background: rgba(168,85,247,0.2); color: #d8b4fe; border: 1px solid #a855f7;">🌵 荒野亂鬥</span>' : ''}
                ${isMarvel ? '<span style="font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 4px; background: rgba(239,68,68,0.2); color: #f87171; border: 1px solid #ef4444;">🦸 漫威宇宙</span>' : ''}
                ${isDB ? '<span style="font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 4px; background: rgba(234,179,8,0.2); color: #fde047; border: 1px solid #eab308;">🐉 七龍珠超</span>' : ''}
                <span class="skin-name" style="color: ${s.themeColor}">${s.name}</span>
              </div>
              <div style="font-size: 11px; color: #94a3b8;">${s.title} | ${s.series || '戰術外裝'}</div>
            </div>
            <span class="stat-capsule" style="font-size: 13px; font-weight: 800; color: #ffd700; border-color: #ffd700;">🪙 ${s.price.toLocaleString()}</span>
          </div>
          <div class="skin-desc">${s.desc}</div>
          <div class="skin-vfx-box">
            <div><strong>⚡ 專屬光軌：</strong>${s.vfx.punchTrail}</div>
            <div><strong>🛡️ 專屬護盾：</strong>${s.vfx.guardShield}</div>
          </div>
          <div style="font-size: 11px; color: #64748b;">🎨 官方經典還原：${s.creator || '官方經典'}</div>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button class="nav-tab-btn try-on-btn" data-id="${s.id}" style="flex: 1; justify-content: center; border-color: ${s.themeColor}; color: ${s.themeColor}">
              <i class="fa-solid fa-eye"></i> 試穿演示
            </button>
            ${isOwned ? `
              <button class="nav-tab-btn" disabled style="flex: 1; justify-content: center; color: #10b981; border-color: #10b981; font-weight: bold; background: rgba(16, 185, 129, 0.1);">
                <i class="fa-solid fa-check"></i> 已擁有
              </button>
            ` : `
              <button class="nav-tab-btn buy-skin-btn" data-id="${s.id}" data-price="${s.price}" style="flex: 1; justify-content: center; background: linear-gradient(135deg, #00f3ff, #ff007f); color: #fff; font-weight: 800; box-shadow: 0 0 10px rgba(0,243,255,0.4);">
                <i class="fa-solid fa-cart-shopping"></i> 購買 (🪙 ${s.price.toLocaleString()})
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.try-on-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const skinObj = SKINS.find(s => s.id === id);
        if (skinObj) {
          this.pedestalSkin = skinObj;
          this.switchTab('skins');
          soundEngine.playUI('hover');
        }
      });
    });

    container.querySelectorAll('.buy-skin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const price = parseInt(btn.dataset.price, 10);
        const skinObj = SKINS.find(s => s.id === id);
        const skinName = skinObj ? skinObj.name : '造型';
        const res = saveSystem.purchaseSkin(id, price);
        if (res.success) {
          soundEngine.playUI('equip');
          this.pedestalSkin = this.getEquippedSkin();
          alert(`🎉 恭喜成功購買解鎖【${skinName}】！已直接為您出戰裝備，可前往「我的外觀」查看！`);
          this.renderShopCatalog(filterSeries);
          this.renderSkinsInventory();
          this.updateUserHUD();
        } else {
          soundEngine.playHit('guard');
          alert(`購買失敗：${res.reason}`);
        }
      });
    });
  }

  // ─── 量子身分授權儀 (Authentication Gateway) ───
  openAuthModal() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.classList.add('active');

    this.renderRegisteredAccounts();
    this.updateCloudSyncUI(saveSystem.syncState, saveSystem.lastSyncMessage);
  }

  renderRegisteredAccounts() {
    // 渲染本機已登記 Google 帳號清單 (多帳號切換體驗)
    const listContainer = document.getElementById('googleAccountsList');
    if (listContainer) {
      const accounts = saveSystem.getRegisteredAccountsList();
      listContainer.innerHTML = accounts.map(acc => `
        <div class="google-account-card ${acc.isCurrent ? 'current' : ''}" style="background: rgba(255,255,255,0.04); border: 1px solid ${acc.isCurrent ? '#00f3ff' : 'rgba(255,255,255,0.1)'}; border-radius: 8px; padding: 12px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${acc.avatar}" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid #00f3ff;">
            <div>
              <div style="font-weight: 800; font-size: 14px;">${acc.nickname} ${acc.isCurrent ? '<span style="color:#00f3ff; font-size: 11px;">(當前使用)</span>' : ''}</div>
              <div style="font-size: 12px; color: #94a3b8;">${acc.email}</div>
            </div>
          </div>
          <button class="nav-tab-btn switch-acc-btn" data-email="${acc.email}" style="padding: 6px 12px; font-size: 12px; border-color: #00f3ff; color: #00f3ff;">
            一鍵切換
          </button>
        </div>
      `).join('');

      listContainer.querySelectorAll('.switch-acc-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const email = btn.dataset.email;
          btn.disabled = true;
          btn.textContent = '切換中...';
          await saveSystem.switchAccount(email);
          this.updateUserHUD();
          this.renderSkinsInventory();
          this.renderShopCatalog();
          this.closeAuthModal();
          soundEngine.playUI('equip');
        });
      });
    }
  }

  closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('active');
  }

  // ─── 賽前戰術武器與技能配置視窗 (20 款自由挑選 3 項・無時間限制) ───
  openLoadoutModal(startMatchCallback) {
    const modal = document.getElementById('loadoutModal');
    if (!modal) return;
    modal.classList.add('active');

    // 清除舊倒數 (若有)
    if (this.loadoutInterval) {
      clearInterval(this.loadoutInterval);
      this.loadoutInterval = null;
    }

    const u = saveSystem.currentUser;
    this.loadoutSelection = (u && u.loadout && u.loadout.length === 3) ? [...u.loadout] : ['SK-15', 'SK-16', 'SK-18'];
    this.loadoutFilter = this.loadoutFilter || 'all';

    // 綁定武裝分類篩選標籤 (全部武裝 / 遠程武器庫 / 近戰格鬥武藝)
    document.querySelectorAll('.loadout-filter-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.loadout-filter-btn').forEach(b => {
          b.classList.remove('active');
          b.style.background = 'transparent';
        });
        btn.classList.add('active');
        btn.style.background = 'rgba(255,255,255,0.1)';
        this.loadoutFilter = btn.dataset.filter || 'all';
        this._renderLoadoutSkillsGrid();
        soundEngine.playUI('click');
      };
    });

    this._renderLoadoutSkillsGrid();

    // 綁定五大戰術流派快捷按鈕
    document.querySelectorAll('.archetype-btn').forEach(btn => {
      btn.onclick = () => {
        const archId = btn.dataset.arch;
        const arch = ARCHETYPES.find(a => a.id === archId);
        if (arch) {
          this.loadoutSelection = [...arch.skills];
          this._renderLoadoutSkillsGrid();
          soundEngine.playUI('click');
        }
      };
    });

    // 確認按鈕 (點擊後才開戰，完全無時間限制)
    const confirmBtn = document.getElementById('confirmLoadoutBtn');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        this._confirmLoadout(startMatchCallback);
      };
    }
  }

  _renderLoadoutSkillsGrid() {
    const container = document.getElementById('loadoutSkillsGrid');
    if (!container) return;

    const filter = this.loadoutFilter || 'all';
    const displayedSkills = SKILLS.filter(sk => {
      if (filter === 'all') return true;
      return sk.category === filter;
    });

    container.innerHTML = displayedSkills.map(sk => {
      const isSelected = this.loadoutSelection.includes(sk.id);
      const slotIndex = this.loadoutSelection.indexOf(sk.id);
      const keyName = slotIndex === 0 ? '[U]' : (slotIndex === 1 ? '[I]' : (slotIndex === 2 ? '[O]' : ''));
      const isRanged = sk.category === 'ranged';

      return `
        <div class="skill-card ${isSelected ? 'selected' : ''}" data-id="${sk.id}" style="background: rgba(255,255,255,0.03); border: 1.5px solid ${isSelected ? '#00f3ff' : 'rgba(255,255,255,0.1)'}; border-radius: 8px; padding: 10px; cursor: pointer; position: relative; transition: all 0.2s;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 4px; background: ${isRanged ? 'rgba(56,189,248,0.2)' : 'rgba(244,63,94,0.2)'}; color: ${isRanged ? '#38bdf8' : '#fb7185'}; border: 1px solid ${isRanged ? '#38bdf8' : '#fb7185'};">
                ${isRanged ? '🏹 遠程武器' : '⚔️ 近戰武藝'}
              </span>
              <strong style="color: ${sk.color}; font-size: 13px;"><i class="${sk.icon}"></i> ${sk.name}</strong>
            </div>
            ${isSelected ? `<span style="background: #00f3ff; color: #000; font-size: 11px; font-weight: 900; padding: 1px 7px; border-radius: 4px; box-shadow: 0 0 8px rgba(0,243,255,0.6);">${keyName}</span>` : ''}
          </div>
          <div style="font-size: 11px; color: #94a3b8; font-weight: 600;">${sk.typeName} | 傷害 ${sk.damage} | CD ${sk.cd}s</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 4px; line-height: 1.35;">${sk.description}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        if (this.loadoutSelection.includes(id)) {
          // 已勾選則移除 (若至少保留1個)
          if (this.loadoutSelection.length > 1) {
            this.loadoutSelection = this.loadoutSelection.filter(s => s !== id);
          }
        } else {
          if (this.loadoutSelection.length < 3) {
            this.loadoutSelection.push(id);
          } else {
            // 已滿3個，替換最先選擇的項目
            this.loadoutSelection.shift();
            this.loadoutSelection.push(id);
          }
        }
        soundEngine.playUI('click');
        this._renderLoadoutSkillsGrid();
      });
    });
  }

  _confirmLoadout(callback) {
    const modal = document.getElementById('loadoutModal');
    if (modal) modal.classList.remove('active');
    saveSystem.updateLoadout(this.loadoutSelection);
    if (callback) callback();
  }

  // ─── 進入對戰系統 ───
  startBattle(mode = 'ai', diff = 'normal') {
    this.matchMode = mode;
    this.aiDifficulty = diff;
    aiController.setDifficulty(diff);

    // 主題場景挑選 (隨機或指定)
    if (this.selectedStageId === 'random') {
      this.currentStage = getRandomStage();
    } else {
      this.currentStage = getStageById(this.selectedStageId);
    }

    this.openLoadoutModal(() => {
      this._launchMatch();
    });
  }

  startArcadeMode() {
    this.arcadeMode = true;
    this.arcadeStage = 1;
    this.arcadeScore = 0;
    this.arcadeStreakWins = 0;
    this.startBattle('arcade', 'normal');
  }

  nextArcadeStage() {
    const endModal = document.getElementById('matchEndModal');
    if (endModal) endModal.classList.remove('active');
    this.arcadeStage++;
    this._launchMatch();
  }

  _launchMatch() {
    if (this._battleLoopId) {
      cancelAnimationFrame(this._battleLoopId);
      this._battleLoopId = null;
    }
    const battleScreen = document.getElementById('battleScreen');
    if (battleScreen) battleScreen.classList.add('active');

    const p1Skin = this.getEquippedSkin();
    let p2Skin = SKINS[1]; // 預設對手
    let p2Name = `AI (${this.aiDifficulty.toUpperCase()})`;
    let p2Diff = this.aiDifficulty;

    const arcadeBadge = document.getElementById('arcadeStageBadge');

    if (this.matchMode === 'arcade') {
      if (arcadeBadge) {
        arcadeBadge.style.display = 'block';
        arcadeBadge.innerHTML = `<i class="fa-solid fa-trophy"></i> STAGE ${this.arcadeStage} / ${this.arcadeMaxStages}`;
      }

      // 5 大關卡對手與經典主題場景規劃
      if (this.arcadeStage === 1) {
        p2Skin = SKINS.find(s => s.id === 'skin_spiderman') || SKINS[1];
        p2Name = '第 1 關：彼得帕克・蜘蛛人';
        p2Diff = 'normal';
        this.currentStage = getStageById('stage_stark_tower');
      } else if (this.arcadeStage === 2) {
        p2Skin = SKINS.find(s => s.id === 'skin_piccolo') || SKINS[2];
        p2Name = '第 2 關：魔族大師・比克';
        p2Diff = 'hard';
        this.currentStage = getStageById('stage_namek');
      } else if (this.arcadeStage === 3) {
        p2Skin = SKINS.find(s => s.id === 'skin_trunks_future') || SKINS[3];
        p2Name = '第 3 關：未來希望・特南克斯';
        p2Diff = 'hard';
        this.currentStage = getStageById('stage_tenkaichi');
      } else if (this.arcadeStage === 4) {
        p2Skin = SKINS.find(s => s.id === 'skin_vegeta_ssj') || SKINS[4];
        p2Name = '第 4 關：賽亞人王子・達爾';
        p2Diff = 'nightmare';
        this.currentStage = getStageById('stage_cyber_matrix');
      } else {
        p2Skin = SKINS.find(s => s.id === 'skin_thanos') || SKINS.find(s => s.id === 'skin_omega_emperor') || SKINS[5];
        p2Name = '👑 最終魔王：宇宙霸主・薩諾斯';
        p2Diff = 'nightmare';
        this.currentStage = getStageById('stage_stark_tower');
      }
      this.aiDifficulty = p2Diff;
      aiController.setDifficulty(p2Diff);
    } else {
      if (arcadeBadge) arcadeBadge.style.display = 'none';
      if (this.aiDifficulty === 'hard') p2Skin = SKINS[2];
      if (this.aiDifficulty === 'nightmare') p2Skin = SKINS[4];
      if (this.matchMode === 'training') p2Name = '練習木樁假人';
      else if (this.matchMode === 'local_2p') p2Name = 'Player 2';
    }

    const p1Data = {
      name: saveSystem.currentUser ? saveSystem.currentUser.nickname : 'Player 1',
      skin: p1Skin,
      loadout: this.loadoutSelection
    };

    const p2Data = {
      name: p2Name,
      skin: p2Skin,
      loadout: ['SK-01', 'SK-02', 'SK-09']
    };

    // 戰鬥前確保畫布尺寸與擂台邊界自適應當前螢幕
    this._resizeCanvas();
    this.matchEndTimer = 0;
    this._lastFrameTime = 0;
    this._timeAccumulator = 0;

    combatEngine.initMatch(p1Data, p2Data, this.matchMode === 'training');

    // 街機闖關第 2~5 關生命值恢復機制 (+350 HP 獎勵)
    if (this.matchMode === 'arcade' && this.arcadeStage > 1) {
      combatEngine.p1.hp = Math.min(combatEngine.p1.maxHp, 650 + 350);
    }

    this.isFighting = true;
    soundEngine.playUI('fight');
    soundEngine.startBgm();

    // 觸發熱血開場倒數播報與橫幅 (ROUND 1 -> FIGHT!)
    announcerEngine.startRoundIntro(1);

    // 更新技能快捷鍵 HUD 圖標與頂部角色標籤
    const p1NameEl = document.getElementById('p1NameDisplay');
    const p2NameEl = document.getElementById('p2NameDisplay');
    const p2RoleTag = document.getElementById('p2RoleTag');
    if (p1NameEl) p1NameEl.textContent = p1Data.name;
    if (p2NameEl) p2NameEl.textContent = p2Data.name;
    if (p2RoleTag) {
      const p2Text = this.matchMode === 'local_2p' ? '2P 對手' : (this.matchMode === 'training' ? '訓練木樁' : (this.matchMode === 'arcade' ? `街機對手 (STAGE ${this.arcadeStage})` : '電腦對手 / AI'));
      p2RoleTag.innerHTML = `<i class="fa-solid fa-robot"></i> ${p2Text}`;
    }
    this._updateSkillActionBar();

    // 進入 60 FPS 戰鬥主循環
    this._runBattleLoop();
  }

  _updateSkillActionBar() {
    const bar = document.getElementById('battleActionBar');
    if (!bar) return;

    bar.innerHTML = combatEngine.p1.skills.map((sk, idx) => {
      const hotkey = idx === 0 ? 'U' : (idx === 1 ? 'I' : 'O');
      return `
        <div class="skill-hud-card" id="skillCard_${idx}" style="border-color: ${sk.color};">
          <div class="skill-cd-overlay" id="skillCdOverlay_${idx}"></div>
          <i class="${sk.icon}" style="font-size: 20px; color: ${sk.color};"></i>
          <span style="font-size: 10px; font-weight: 900; color: #fff;">[${hotkey}]</span>
        </div>
      `;
    }).join('') + `
      <div class="guard-hud-card" id="guardHudBtn" title="按住召喚量子防護罩 (快捷鍵: L / Shift)">
        <i class="fa-solid fa-shield-halved" style="font-size: 20px; color: #38bdf8;"></i>
        <span style="font-size: 10px; font-weight: 900; color: #38bdf8;">[L] 護盾</span>
      </div>
      <div class="burst-hud-card" id="burstHudBtn" title="受擊時脫身爆發 [B]">
        <span style="font-size: 11px;">BURST</span>
        <span style="font-size: 9px; opacity: 0.8;">[B]</span>
      </div>
      <div class="burst-hud-card" id="superHudBtn" style="background: linear-gradient(135deg, #ffd700, #ff007f); border-color: #ffd700;" title="滿能量或殘血時發動終極奧義 [P]">
        <span style="font-size: 11px; font-weight: 900; color: #fff;">SUPER</span>
        <span style="font-size: 9px; opacity: 0.9; color: #ffd700;">[P] 奧義</span>
      </div>
    `;

    // 綁定防護罩 HUD 按鈕點擊/按住事件
    const guardBtn = document.getElementById('guardHudBtn');
    if (guardBtn) {
      guardBtn.onmousedown = (e) => { e.preventDefault(); this.keys['KeyL'] = true; };
      guardBtn.onmouseup = (e) => { e.preventDefault(); this.keys['KeyL'] = false; };
      guardBtn.onmouseleave = () => { this.keys['KeyL'] = false; };
      guardBtn.ontouchstart = (e) => { e.preventDefault(); this.mobileInputs.guard = true; };
      guardBtn.ontouchend = (e) => { e.preventDefault(); this.mobileInputs.guard = false; };
    }

    // 綁定終極奧義 HUD 按鈕點擊事件
    const superBtn = document.getElementById('superHudBtn');
    if (superBtn) {
      superBtn.onclick = (e) => {
        e.preventDefault();
        this.keys['KeyP'] = true;
        setTimeout(() => { this.keys['KeyP'] = false; }, 80);
      };
      superBtn.ontouchstart = (e) => {
        e.preventDefault();
        this.mobileInputs.superMove = true;
      };
      superBtn.ontouchend = (e) => {
        e.preventDefault();
        this.mobileInputs.superMove = false;
      };
    }

    // 訓練營控制工具列
    const trainingBar = document.getElementById('trainingToolbar');
    if (trainingBar) {
      trainingBar.style.display = this.matchMode === 'training' ? 'flex' : 'none';
    }
  }

  _runBattleLoop(timestamp = 0) {
    if (!this.isFighting) return;

    if (!this._lastFrameTime) {
      this._lastFrameTime = timestamp || performance.now();
      this._timeAccumulator = 0;
    }

    const now = timestamp || performance.now();
    let delta = now - this._lastFrameTime;
    this._lastFrameTime = now;

    // 防止切換分頁或背景休眠產生過大時間差
    if (delta > 100) delta = 100;
    this._timeAccumulator += delta;

    const FIXED_STEP = 1000 / 60; // 16.6667ms 標準 60 FPS 物理週期
    let steps = 0;

    // 限制每渲染幀最多執行 3 次物理步進，確保高刷新率（120Hz/144Hz）或低幀率下均極致順暢
    while (this._timeAccumulator >= FIXED_STEP && steps < 3) {
      // 1. 採集 1P 輸入 (對局結束時停止採集，勝者保持勝利姿態)
      const inputP1 = combatEngine.isOver
        ? { x: 0, y: 0, punch: false, kick: false, guard: false, skill1: false, skill2: false, skill3: false, burst: false }
        : this._gatherInputsP1();

      // 2. 採集 2P / AI 輸入
      let inputP2 = null;
      if (combatEngine.isOver) {
        inputP2 = { x: 0, y: 0, punch: false, kick: false, guard: false, skill1: false, skill2: false, skill3: false, burst: false };
      } else if (this.matchMode === 'local_2p') {
        inputP2 = this._gatherInputsP2();
      } else {
        inputP2 = aiController.decide(combatEngine.p2, combatEngine.p1, combatEngine);
      }

      // 3. 戰鬥物理精準推進 1 幀 (60 FPS 確定性週期)
      combatEngine.update(inputP1, inputP2);

      // 4. 檢查對局結算與勝利姿態慶祝展示計時
      if (combatEngine.isOver && !combatEngine.isTraining) {
        if (!this.matchEndTimer) {
          this.matchEndTimer = 1;
        } else {
          this.matchEndTimer++;
        }

        // 勝利慶祝展示 110 幀 (~1.8 秒) 後彈出結算對話框，背景姿態動畫持續播放
        if (this.matchEndTimer === 110) {
          this._showMatchEndModal();
        }
      }

      this._timeAccumulator -= FIXED_STEP;
      steps++;
    }

    // 5. 渲染戰鬥畫面 (隨螢幕更新率即時呈現，消除撕裂與微卡頓)
    this._renderBattleFrame();

    // 6. 更新戰鬥 HUD
    this._updateBattleHUD();

    this._battleLoopId = requestAnimationFrame((ts) => this._runBattleLoop(ts));
  }

  _gatherInputsP1() {
    const k = this.keys;
    const m = this.mobileInputs;

    let x = 0;
    let y = 0;
    if (k['KeyA'] || k['ArrowLeft']) x -= 1;
    if (k['KeyD'] || k['ArrowRight']) x += 1;
    if (k['KeyW'] || k['ArrowUp'] || k['Space']) y -= 1;
    if (k['KeyS'] || k['ArrowDown']) y += 1;

    // 疊加行動端觸控搖桿
    if (Math.abs(m.x) > 0.1) x = m.x;
    if (Math.abs(m.y) > 0.1) y = m.y;

    return {
      x,
      y,
      punch: !!(k['KeyJ'] || m.punch),
      kick: !!(k['KeyK'] || m.kick),
      guard: !!(k['KeyL'] || k['ShiftLeft'] || k['ShiftRight'] || m.guard),
      skill1: !!(k['KeyU'] || m.skill1),
      skill2: !!(k['KeyI'] || m.skill2),
      skill3: !!(k['KeyO'] || m.skill3),
      burst: !!(k['KeyB'] || m.burst),
      superMove: !!(k['KeyP'] || m.superMove)
    };
  }

  _gatherInputsP2() {
    // 本地雙人同機對決 2P 鍵位 (方向鍵 + 數字鍵盤 1/2/4/5/6/3)
    const k = this.keys;
    let x = 0;
    let y = 0;
    if (k['ArrowLeft']) x -= 1;
    if (k['ArrowRight']) x += 1;
    if (k['ArrowUp']) y -= 1;
    if (k['ArrowDown']) y += 1;

    return {
      x,
      y,
      punch: !!(k['Numpad1'] || k['Digit1']),
      kick: !!(k['Numpad2'] || k['Digit2']),
      guard: !!(k['Numpad0'] || k['NumpadDecimal']),
      skill1: !!(k['Numpad4'] || k['Digit4']),
      skill2: !!(k['Numpad5'] || k['Digit5']),
      skill3: !!(k['Numpad6'] || k['Digit6']),
      burst: !!(k['NumpadPlus'] || k['NumpadEnter'] || k['Digit7']),
      superMove: !!(k['Numpad3'] || k['Digit3'])
    };
  }

  _renderBattleFrame() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const dpr = this.dpr || 1;
    const w = this.logicalWidth || window.innerWidth;
    const h = this.logicalHeight || window.innerHeight;

    // 清除畫布並重設高解析度縮放矩陣
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // 1. 繪製多主題經典戰鬥場景 (Multi-Themed Battle Stage: 天下第一武道會、斯塔克大樓天台、那美克星、賽博矩陣)
    stageRenderer.drawStage(ctx, this.currentStage, w, h, combatEngine.floorY);

    // 儲存戰鬥世界視口 (World Matrix)
    ctx.save();

    // 畫面震動衝擊反饋 (Screen Shake) 作用於世界視口
    if (combatEngine.screenShake && combatEngine.screenShake.intensity > 0.1) {
      ctx.translate(combatEngine.screenShake.x, combatEngine.screenShake.y);
    }

    const groundY = combatEngine.floorY;

    // 2. 繪製與場景主題深度融合之高低懸浮空中戰鬥平台
    stageRenderer.drawPlatforms(ctx, combatEngine.platforms, this.currentStage);

    // 3. 繪製角色腳底發光光環 (地面定位圈)
    this._drawFighterFloorRings(ctx, groundY);

    // 4. 繪製雙方角色
    characterRenderer.draw(ctx, combatEngine.p1);
    characterRenderer.draw(ctx, combatEngine.p2);

    // 5. 繪製角色頭頂醒目標籤與攻擊招式細節
    this._drawFighterOverheadBadges(ctx);

    // 6. 繪製飛行道具 (Projectiles - 全向多元光子武裝 & 技能飛行道具)
    combatEngine.projectiles.forEach(p => {
      ctx.save();
      const themeCol = p.skin && p.skin.themeColor ? p.skin.themeColor : '#00f3ff';
      const secCol = p.skin && p.skin.secondaryColor ? p.skin.secondaryColor : '#ffffff';
      const rad = p.radius || 10;
      const angle = Math.atan2(p.vy || 0, p.vx || 1);

      if (p.type === 'ground_wave') {
        // 地裂爬行震波：貼地滑行之裂地電弧光冠
        ctx.shadowColor = '#ffaa00';
        ctx.shadowBlur = 18;
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(p.x - 24, p.y + 4);
        ctx.lineTo(p.x - 8, p.y - 12);
        ctx.lineTo(p.x + 4, p.y - 4);
        ctx.lineTo(p.x + 20, p.y - 18);
        ctx.lineTo(p.x + 28, p.y + 4);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x + 8, p.y - 10, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'heavy') {
        // 超載穿透重砲：大型等離子重型聚能球與環繞能量光環
        ctx.shadowColor = themeCol;
        ctx.shadowBlur = 24;
        ctx.fillStyle = themeCol;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad * 0.55, 0, Math.PI * 2);
        ctx.fill();

        // 環形公轉離子軌道
        const ringT = Date.now() / 150;
        ctx.strokeStyle = secCol;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, rad * 1.5, rad * 0.6, ringT, 0, Math.PI * 2);
        ctx.stroke();

        // 巨型破空拖尾光柱
        ctx.strokeStyle = themeCol;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 3.5, p.y - (p.vy || 0) * 3.5);
        ctx.stroke();
      } else if (p.type === 'homing') {
        // 追蹤微型飛彈：高科技流線型微導彈與尾焰
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 15;

        // 彈體金屬梭形
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-8, -4.5);
        ctx.lineTo(-6, 0);
        ctx.lineTo(-8, 4.5);
        ctx.closePath();
        ctx.fill();

        // 噴射尾焰
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.moveTo(-7, -2);
        ctx.lineTo(-18 - Math.random() * 6, 0);
        ctx.lineTo(-7, 2);
        ctx.closePath();
        ctx.fill();
      } else if (p.type === 'bouncing') {
        // 折射稜鏡激光：旋轉幾何稜鏡晶核與高亮折射射線
        ctx.translate(p.x, p.y);
        const rot = Date.now() / 120;
        ctx.rotate(rot);
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 20;

        // 八面菱形稜鏡
        ctx.fillStyle = '#c084fc';
        ctx.beginPath();
        ctx.moveTo(0, -rad);
        ctx.lineTo(rad, 0);
        ctx.lineTo(0, rad);
        ctx.lineTo(-rad, 0);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, rad * 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (p.type === 'bomb') {
        // 空對地爆彈：高能聚能核彈與警示危險紅圈
        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#ff0055';
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // 下墜拖尾
        ctx.strokeStyle = '#ff0055';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 2.5, p.y - p.vy * 2.5);
        ctx.stroke();
      } else if (p.type === 'vortex') {
        // 虛空引力黑洞：事件視界與旋轉吸積盤
        const vRot = Date.now() / 200;
        ctx.shadowColor = '#00f3ff';
        ctx.shadowBlur = 24;

        // 外層引力吸積螺旋
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.75)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad * (1 + Math.sin(vRot * 2) * 0.15), 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad * 0.75, 0, Math.PI * 2);
        ctx.stroke();

        // 黑色引力奇點核心
        ctx.fillStyle = '#050510';
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#00f3ff';
        ctx.stroke();
      } else if (p.type === 'sniper') {
        // 高斯狙擊穿甲重槍：超音速針狀電磁穿甲彈與擴散音爆環
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 24;
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(-22, -3, 44, 6);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-12, -1.5, 30, 3);
        // 超音速音爆衝擊環
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.75)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(-18, 0, 9, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(-34, 0, 14, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
      } else if (p.type === 'shotgun') {
        // 擴散式電漿霰彈：高溫紫曜電漿霰彈球
        ctx.shadowColor = '#d946ef';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#d946ef';
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad * 0.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'funnel') {
        // 脈衝浮游砲：懸浮跟隨型高科技綠曜無人戰機
        ctx.translate(p.x, p.y);
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#064e3b';
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(14, 0);
        ctx.lineTo(0, -9);
        ctx.lineTo(-12, 0);
        ctx.lineTo(0, 9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#6ee7b7';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#00f3ff';
        ctx.beginPath();
        ctx.arc(-13, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'funnel_laser') {
        // 浮游砲雷射束：翡翠高速離子光束
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#34d399';
        ctx.fillRect(p.x - 18, p.y - 3, 36, 6);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(p.x - 12, p.y - 1.5, 24, 3);
      } else if (p.type === 'cryo_arrow') {
        // 極凍冰霜穿透箭：晶瑩透亮冰晶尖錐長箭
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#00e5ff';
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.lineTo(-16, -7);
        ctx.lineTo(-10, 0);
        ctx.lineTo(-16, 7);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(15, 0);
        ctx.lineTo(-8, -3);
        ctx.lineTo(-4, 0);
        ctx.lineTo(-8, 3);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-16, 0);
        ctx.lineTo(-28, 0);
        ctx.stroke();
      } else if (p.type === 'grenade') {
        // 燃燒榴彈：高速翻滾榴彈彈筒與引信火花
        ctx.translate(p.x, p.y);
        ctx.rotate(Date.now() / 90);
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#c2410c';
        ctx.fillRect(-8, -6, 16, 12);
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 2;
        ctx.strokeRect(-8, -6, 16, 12);
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'napalm_pool') {
        // 燃燒火海：地面燃燒熔岩火場與跳動烈焰
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 22;
        const flameH = Math.sin(Date.now() / 80 + p.x) * 5;
        const grad = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, p.radius || 48);
        grad.addColorStop(0, 'rgba(255, 235, 59, 0.85)');
        grad.addColorStop(0.45, 'rgba(234, 88, 12, 0.65)');
        grad.addColorStop(1, 'rgba(220, 38, 38, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y + 4, p.radius || 48, 13 + flameH, 0, 0, Math.PI * 2);
        ctx.fill();
        for (let s = -2; s <= 2; s++) {
          const sx = p.x + s * 15 + Math.sin(Date.now() / 110 + s) * 4;
          const sy = p.y - 6 - Math.abs(Math.cos(Date.now() / 90 + s * 2)) * 18;
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (p.type === 'boomerang') {
        // 迴旋雷霆光刃鏢：高速旋轉十字等離子雷霆飛鏢
        ctx.translate(p.x, p.y);
        ctx.rotate(Date.now() / 40);
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 22;
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        for (let k = 0; k < 4; k++) {
          const a = (k * Math.PI) / 2;
          ctx.lineTo(Math.cos(a) * 18, Math.sin(a) * 18);
          ctx.lineTo(Math.cos(a + Math.PI / 4) * 6, Math.sin(a + Math.PI / 4) * 6);
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // 常規 / 仰角 / 躍空光彈 (Normal, Anti-air, Air dive)
        ctx.shadowColor = themeCol;
        ctx.shadowBlur = 18;
        ctx.fillStyle = themeCol;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad * 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = secCol;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 3, p.y - (p.vy || 0) * 3);
        ctx.stroke();
      }

      ctx.restore();
    });

    // 7. 繪製衝擊波與巨砲 (Shockwaves, Super Beams & K.O. Rings)
    combatEngine.shockwaves.forEach(s => {
      ctx.save();
      ctx.strokeStyle = s.color || '#00f3ff';
      ctx.shadowColor = s.color || '#00f3ff';
      ctx.shadowBlur = 20;

      if (s.isSuperBeam) {
        // 終極必殺巨型全屏光柱與衝擊波
        const beamH = s.height || 80;
        // 外層漫射發光層
        ctx.fillStyle = s.color;
        ctx.globalAlpha = 0.35;
        ctx.fillRect(0, s.y - beamH * 0.75, w, beamH * 1.5);

        // 主光柱
        ctx.globalAlpha = 0.85;
        ctx.fillRect(0, s.y - beamH / 2, w, beamH);

        // 核心白熾光核
        ctx.fillStyle = s.coreColor || '#ffffff';
        ctx.globalAlpha = 0.95;
        ctx.fillRect(0, s.y - beamH * 0.25, w, beamH * 0.5);

        // 螺旋雷霆光環 (Spiral Helix & Lightning Arcs)
        const tNow = Date.now() / 60;
        ctx.strokeStyle = s.coreColor || '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let lx = 0; lx < w; lx += 25) {
          const ly = s.y + Math.sin(tNow + lx * 0.05) * (beamH * 0.45);
          if (lx === 0) ctx.moveTo(lx, ly);
          else ctx.lineTo(lx, ly);
        }
        ctx.stroke();
      } else if (s.isKO) {
        // K.O. 終結巨型震撼擴散金芒環
        const progress = Math.min(1, s.radius / s.maxRadius);
        ctx.globalAlpha = Math.max(0, 1 - progress);
        ctx.lineWidth = Math.max(2, (1 - progress) * 14);
        ctx.strokeStyle = s.color || '#ffd700';
        ctx.shadowColor = s.color || '#ffd700';
        ctx.shadowBlur = 35;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (progress < 0.4) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(s.x, s.y, (1 - progress * 2.5) * 80, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (s.isBeam) {
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x - s.width / 2, s.y - s.height / 2, s.width, s.height);
      } else {
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    });

    // 8. 繪製打擊爆裂火花與放射狀斬擊光芒 (Hit Sparks & Impact Rays)
    this._drawHitSparks(ctx);

    // 9. 繪製浮動傷害與提示文字 (Floating Texts)
    combatEngine.floatingTexts.forEach(t => {
      ctx.save();
      ctx.font = 'bold 18px Orbitron, sans-serif';
      ctx.fillStyle = t.color;
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 10;
      ctx.fillText(t.text, t.x - 40, t.y);
      ctx.restore();
    });

    // 恢復世界視口（HUD 與 UI 不受世界震動偏移影響）
    ctx.restore();

    // 10. 繪製熱血連擊計數器 (Arcade Combo Counter HUD)
    this._drawComboCounters(ctx, w, h);

    // 11. 戰鬥結束勝利橫幅與冠軍慶祝 (Victory Celebration Banner)
    if (combatEngine.isOver && !combatEngine.isTraining) {
      this._drawVictoryBanner(ctx, w, h);
    }

    // 12. 戰鬥播報語音與華麗動態文字橫幅 (Announcer & Combat Banners)
    announcerEngine.draw(ctx, w, h);
  }

  // ─── 打擊爆裂火花與斬芒特效 (Hit Sparks & Impact Rays) ───
  _drawHitSparks(ctx) {
    if (!combatEngine.hitSparks || combatEngine.hitSparks.length === 0) return;

    for (const spark of combatEngine.hitSparks) {
      const alpha = Math.max(0, spark.life / spark.maxLife);
      const progress = 1 - alpha;
      ctx.save();

      // 1. 核心衝擊擴散環 (Expanding Impact Ring)
      const currentRadius = (spark.coreRadius || 20) * (0.4 + progress * 1.3);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = spark.color || '#ff007f';
      ctx.lineWidth = Math.max(1, (1 - progress) * 4);
      ctx.shadowColor = spark.color || '#ff007f';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, currentRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 2. 核心白熾爆閃 (White Flash)
      if (spark.life >= spark.maxLife - 4) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, (spark.coreRadius || 20) * 0.5 * (1 - progress), 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. 破空放射狀斬擊光芒 (Directional Rays)
      if (spark.rays && spark.rays.length > 0) {
        ctx.strokeStyle = spark.color || '#ffd700';
        ctx.lineWidth = Math.max(1, 2.8 * alpha);
        ctx.shadowColor = spark.color || '#ffd700';
        ctx.shadowBlur = 12;
        for (const ray of spark.rays) {
          const rayLen = ray.len * (0.6 + progress * 0.8);
          const startDist = progress * 6;
          const sx = spark.x + Math.cos(ray.angle) * startDist;
          const sy = spark.y + Math.sin(ray.angle) * startDist;
          const ex = spark.x + Math.cos(ray.angle) * (startDist + rayLen);
          const ey = spark.y + Math.sin(ray.angle) * (startDist + rayLen);
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
      }

      // 4. 飛濺火花微粒 (Flying Spark Particles)
      if (spark.particles) {
        for (const p of spark.particles) {
          if (p.life <= 0) continue;
          const pAlpha = Math.max(0, p.life / p.maxLife);
          ctx.globalAlpha = pAlpha;
          ctx.fillStyle = p.color || spark.color;
          ctx.shadowColor = p.color || spark.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, (p.size || 2.5) * pAlpha, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    }
  }

  // ─── 街機風格連擊計數器 (Arcade Combo Counter HUD) ───
  _drawComboCounters(ctx, w, h) {
    const p1 = combatEngine.p1;
    const p2 = combatEngine.p2;

    const renderCombo = (fighter, isLeft) => {
      if (!fighter || fighter.comboCount < 2) return;

      ctx.save();
      const count = fighter.comboCount;
      const damage = fighter.comboDamage;
      const themeColor = isLeft ? '#00f3ff' : '#ff007f';
      const secColor = isLeft ? '#ffd700' : '#ff9900';

      // 依連擊數微幅脈衝縮放
      const pulse = 1 + Math.min(0.2, (fighter.comboResetTimer / 45) * 0.15);
      const posX = isLeft ? Math.max(80, w * 0.16) : Math.min(w - 80, w * 0.84);
      const posY = Math.max(140, h * 0.35);

      ctx.translate(posX, posY);
      ctx.scale(pulse, pulse);
      ctx.textAlign = isLeft ? 'left' : 'right';

      // 1. 連擊數主文字 (Huge arcade combo number)
      ctx.font = '900 42px "Orbitron", sans-serif';
      ctx.fillStyle = themeColor;
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 18;
      ctx.fillText(`${count} HITS!`, 0, 0);

      // 2. 總傷害與連段評價 (Total damage & combo title)
      ctx.font = 'bold 15px "Orbitron", "Noto Sans TC", sans-serif';
      ctx.fillStyle = secColor;
      ctx.shadowColor = secColor;
      ctx.shadowBlur = 10;
      let praise = 'GOOD COMBO';
      if (count >= 7) praise = '★ QUANTUM MASTER! ★';
      else if (count >= 5) praise = '★ AMAZING COMBO! ★';
      else if (count >= 3) praise = 'GREAT COMBO!';

      ctx.fillText(`DAMAGE: ${damage}  [${praise}]`, 0, 24);

      ctx.restore();
    };

    renderCombo(p1, true);
    renderCombo(p2, false);
  }

  _drawVictoryBanner(ctx, w, h) {
    const isP1Win = combatEngine.winner === 1;
    const isP2Win = combatEngine.winner === 2;
    if (!isP1Win && !isP2Win) return;

    const winner = isP1Win ? combatEngine.p1 : combatEngine.p2;
    const winTitle = isP1Win ? 'VICTORY 戰鬥勝利' : 'K.O. 戰鬥結束';
    const subTitle = isP1Win ? '★ 恭喜獲勝！漂亮擊倒對手奪下冠軍 ★' : `${winner.name} 贏得了本場對決！`;
    const themeColor = isP1Win ? '#ffd700' : '#ff007f';

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 背景慶祝暗幕
    ctx.fillStyle = 'rgba(5, 8, 20, 0.45)';
    ctx.fillRect(0, 0, w, h);

    // 冠軍光芒主橫幅
    const cy = Math.max(160, h * 0.28);
    const bannerW = Math.min(w * 0.88, 560);
    const bannerH = 76;
    const bx = w / 2 - bannerW / 2;
    const by = cy - bannerH / 2;

    ctx.fillStyle = 'rgba(11, 17, 32, 0.9)';
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 3;
    ctx.shadowColor = themeColor;
    ctx.shadowBlur = 24;

    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(bx, by, bannerW, bannerH, 12);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillRect(bx, by, bannerW, bannerH);
      ctx.strokeRect(bx, by, bannerW, bannerH);
    }

    // 主標題文字
    ctx.font = '900 32px "Orbitron", "Noto Sans TC", sans-serif';
    ctx.fillStyle = themeColor;
    ctx.shadowColor = themeColor;
    ctx.shadowBlur = 16;
    ctx.fillText(winTitle, w / 2, cy - 10);

    // 副標題文字
    ctx.font = '700 13px "Noto Sans TC", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 6;
    ctx.fillText(subTitle, w / 2, cy + 20);

    ctx.restore();
  }

  // ─── 瑪利歐風格空中高低平台繪製 (Mario Style Floating Platforms) ───
  _drawPlatforms(ctx) {
    if (!combatEngine.platforms || combatEngine.platforms.length === 0) return;
    const time = Date.now() / 400;

    combatEngine.platforms.forEach(plat => {
      const { x, y, width, height, color, id } = plat;

      ctx.save();

      // 1. 底部反重力離子噴射流 (Anti-gravity Hover Jets)
      const thrusterOffsets = [width * 0.22, width * 0.78];
      thrusterOffsets.forEach(ox => {
        const tx = x + ox;
        const ty = y + height;
        const flameH = 10 + Math.sin(time * 3 + ox) * 4;

        // 噴口基座金屬塊
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(tx - 6, ty, 12, 3);

        // 離子火焰漸變
        const grad = ctx.createLinearGradient(tx, ty + 3, tx, ty + 3 + flameH);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(tx - 5, ty + 3);
        ctx.lineTo(tx + 5, ty + 3);
        ctx.lineTo(tx, ty + 3 + flameH);
        ctx.closePath();
        ctx.fill();
      });

      // 2. 平台本體外發光與高科技金屬磚塊底色
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;

      const gradBody = ctx.createLinearGradient(x, y, x, y + height);
      gradBody.addColorStop(0, '#1a2333');
      gradBody.addColorStop(0.5, '#0f172a');
      gradBody.addColorStop(1, '#080d1a');
      ctx.fillStyle = gradBody;
      ctx.fillRect(x, y, width, height);

      // 外框與高亮站立導軌
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      // 頂部實體著陸能量線 (清楚標示角色站立面)
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, 3);

      // 3. 瑪利歐風格經典磚塊交錯接縫 (Mario Cyber Brick Pattern)
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1.5;

      const midY = y + height / 2;
      ctx.beginPath();
      ctx.moveTo(x + 2, midY);
      ctx.lineTo(x + width - 2, midY);
      ctx.stroke();

      const brickCount = 5;
      const brickW = width / brickCount;
      // 上層磚塊垂直縫
      for (let i = 1; i < brickCount; i++) {
        const bx = x + i * brickW;
        ctx.beginPath();
        ctx.moveTo(bx, y + 3);
        ctx.lineTo(bx, midY);
        ctx.stroke();
      }
      // 下層交錯垂直縫 (位移半個磚長)
      for (let i = 0; i < brickCount; i++) {
        const bx = x + (i + 0.5) * brickW;
        if (bx > x + 4 && bx < x + width - 4) {
          ctx.beginPath();
          ctx.moveTo(bx, midY);
          ctx.lineTo(bx, y + height - 1);
          ctx.stroke();
        }
      }

      // 4. 四角加固鉚釘
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      const rivets = [
        [x + 4, y + 5],
        [x + width - 4, y + 5],
        [x + 4, y + height - 5],
        [x + width - 4, y + height - 5]
      ];
      rivets.forEach(([rx, ry]) => {
        ctx.beginPath();
        ctx.arc(rx, ry, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. 中央高台具有象徵瑪利歐神秘問號磚的金色問號徽記 [ ? ]
      if (id === 'plat_center') {
        ctx.save();
        ctx.font = 'bold 13px "Orbitron", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffd700';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 10;
        ctx.fillText('?', x + width / 2, y + height / 2);
        ctx.restore();
      }

      ctx.restore();
    });
  }

  _drawFighterFloorRings(ctx, groundY) {
    const p1 = combatEngine.p1;
    const p2 = combatEngine.p2;
    if (!p1 || !p2) return;
    const time = Date.now() / 250;

    // 當角色著陸在空中平台或地面時，光環精準貼合站立面 (p.y)
    const p1Floor = p1.isGrounded ? p1.y : groundY;
    const p2Floor = p2.isGrounded ? p2.y : groundY;

    // 1P (玩家) 腳底賽博藍光環
    ctx.save();
    ctx.translate(p1.x, p1Floor);
    ctx.scale(1, 0.3);
    ctx.beginPath();
    ctx.arc(0, 0, 46 + Math.sin(time) * 4, 0, Math.PI * 2);
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 243, 255, 0.2)';
    ctx.fill();
    ctx.restore();

    // 2P (對手) 腳底粉紅光環
    ctx.save();
    ctx.translate(p2.x, p2Floor);
    ctx.scale(1, 0.3);
    ctx.beginPath();
    ctx.arc(0, 0, 46 + Math.sin(time + 1.5) * 4, 0, Math.PI * 2);
    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 0, 127, 0.2)';
    ctx.fill();
    ctx.restore();
  }

  _drawFighterOverheadBadges(ctx) {
    const p1 = combatEngine.p1;
    const p2 = combatEngine.p2;
    if (!p1 || !p2) return;
    const bounce = Math.sin(Date.now() / 180) * 4;

    // ─── 玩家 1P 頭頂標記 (這是玩家的角色) ───
    const p1HeadY = p1.y - 170 + bounce;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 1P 下指立體發光箭頭
    ctx.fillStyle = '#00f3ff';
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1HeadY);
    ctx.lineTo(p1.x - 7, p1HeadY - 9);
    ctx.lineTo(p1.x + 7, p1HeadY - 9);
    ctx.closePath();
    ctx.fill();

    // 1P 科技毛玻璃標籤底框 (含血量顯示)
    const p1Hp = Math.max(0, Math.round(p1.hp));
    const badgeW1 = 186;
    const badgeH1 = 28;
    const badgeX1 = p1.x - badgeW1 / 2;
    const badgeY1 = p1HeadY - 9 - badgeH1;

    ctx.fillStyle = 'rgba(5, 15, 30, 0.9)';
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(badgeX1, badgeY1, badgeW1, badgeH1, 6);
    } else {
      ctx.rect(badgeX1, badgeY1, badgeW1, badgeH1);
    }
    ctx.fill();
    ctx.stroke();

    // 1P 文字: ★ 這是玩家的角色 [HP]
    ctx.font = '900 12px "Orbitron", "Noto Sans TC", sans-serif';
    ctx.fillStyle = '#00f3ff';
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 10;
    ctx.fillText(`★ 這是玩家的角色 [${p1Hp} HP]`, p1.x, badgeY1 + badgeH1 / 2);

    // 1P 攻擊動作細節與招式屬性標籤 (所有細節即時動態顯示)
    if (p1.currentAction) {
      const act = p1.currentAction;
      let propText = '上段';
      let propColor = '#00f3ff';
      if (act.guardType === 'crouch_only') {
        propText = '下段・掃倒';
        propColor = '#ffaa00';
      } else if (act.guardType === 'stand_only') {
        propText = '中段・破蹲';
        propColor = '#ff007f';
      } else if (act.guardType === 'unblockable') {
        propText = '投技・破防';
        propColor = '#ffd700';
      } else if (act.isRanged) {
        propText = '遠程彈道';
        propColor = '#38bdf8';
      }

      const actTagW = 200;
      const actTagH = 22;
      const actTagX = p1.x - actTagW / 2;
      const actTagY = badgeY1 - actTagH - 4;
      ctx.fillStyle = 'rgba(2, 10, 24, 0.95)';
      ctx.strokeStyle = propColor;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = propColor;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(actTagX, actTagY, actTagW, actTagH, 5);
      else ctx.rect(actTagX, actTagY, actTagW, actTagH);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 11px "Noto Sans TC", "Orbitron", sans-serif';
      ctx.fillStyle = propColor;
      ctx.fillText(`⚔️ ${act.name} [${propText}] ${act.damage}D`, p1.x, actTagY + actTagH / 2);
    } else if (p1.isGuarding) {
      const guardTagW = 160;
      const guardTagH = 20;
      const guardTagX = p1.x - guardTagW / 2;
      const guardTagY = badgeY1 - guardTagH - 4;
      ctx.fillStyle = 'rgba(2, 16, 32, 0.9)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(guardTagX, guardTagY, guardTagW, guardTagH, 4);
      else ctx.rect(guardTagX, guardTagY, guardTagW, guardTagH);
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 10px "Noto Sans TC", sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`🛡️ 防護罩防禦 (50%減傷)`, p1.x, guardTagY + guardTagH / 2);
    }
    ctx.restore();

    // ─── 對手 2P 頭頂標記 ───
    const p2HeadY = p2.y - 170 - bounce;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 2P 下指箭頭
    ctx.fillStyle = '#ff007f';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(p2.x, p2HeadY);
    ctx.lineTo(p2.x - 7, p2HeadY - 9);
    ctx.lineTo(p2.x + 7, p2HeadY - 9);
    ctx.closePath();
    ctx.fill();

    // 2P 底框 (含血量顯示)
    const p2Hp = Math.max(0, Math.round(p2.hp));
    const p2Label = this.matchMode === 'local_2p' ? '2P 對手' : (this.matchMode === 'training' ? '訓練木樁' : '電腦對手 (AI)');
    const badgeW2 = 168;
    const badgeH2 = 28;
    const badgeX2 = p2.x - badgeW2 / 2;
    const badgeY2 = p2HeadY - 9 - badgeH2;

    ctx.fillStyle = 'rgba(25, 5, 15, 0.9)';
    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(badgeX2, badgeY2, badgeW2, badgeH2, 6);
    } else {
      ctx.rect(badgeX2, badgeY2, badgeW2, badgeH2);
    }
    ctx.fill();
    ctx.stroke();

    // 2P 文字
    ctx.font = '900 12px "Orbitron", "Noto Sans TC", sans-serif';
    ctx.fillStyle = '#ff007f';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 10;
    ctx.fillText(`${p2Label} [${p2Hp} HP]`, p2.x, badgeY2 + badgeH2 / 2);

    // 2P 攻擊動作細節與招式屬性標籤
    if (p2.currentAction) {
      const act = p2.currentAction;
      let propText = '上段';
      let propColor = '#ff007f';
      if (act.guardType === 'crouch_only') {
        propText = '下段・掃倒';
        propColor = '#ffaa00';
      } else if (act.guardType === 'stand_only') {
        propText = '中段・破蹲';
        propColor = '#ff007f';
      } else if (act.guardType === 'unblockable') {
        propText = '投技・破防';
        propColor = '#ffd700';
      } else if (act.isRanged) {
        propText = '遠程彈道';
        propColor = '#38bdf8';
      }

      const actTagW = 200;
      const actTagH = 22;
      const actTagX = p2.x - actTagW / 2;
      const actTagY = badgeY2 - actTagH - 4;
      ctx.fillStyle = 'rgba(25, 5, 15, 0.95)';
      ctx.strokeStyle = propColor;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = propColor;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(actTagX, actTagY, actTagW, actTagH, 5);
      else ctx.rect(actTagX, actTagY, actTagW, actTagH);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 11px "Noto Sans TC", "Orbitron", sans-serif';
      ctx.fillStyle = propColor;
      ctx.fillText(`⚔️ ${act.name} [${propText}] ${act.damage}D`, p2.x, actTagY + actTagH / 2);
    } else if (p2.isGuarding) {
      const guardTagW = 160;
      const guardTagH = 20;
      const guardTagX = p2.x - guardTagW / 2;
      const guardTagY = badgeY2 - guardTagH - 4;
      ctx.fillStyle = 'rgba(28, 5, 20, 0.9)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(guardTagX, guardTagY, guardTagW, guardTagH, 4);
      else ctx.rect(guardTagX, guardTagY, guardTagW, guardTagH);
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 10px "Noto Sans TC", sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`🛡️ 防護罩防禦 (50%減傷)`, p2.x, guardTagY + guardTagH / 2);
    }
    ctx.restore();
  }

  _updateBattleHUD() {
    // 1. 生命值與數值百分比顯示
    const hp1El = document.getElementById('p1HpFill');
    const hp2El = document.getElementById('p2HpFill');
    const hp1Text = document.getElementById('p1HpText');
    const hp2Text = document.getElementById('p2HpText');

    const p1Hp = Math.max(0, Math.round(combatEngine.p1.hp));
    const p1Max = combatEngine.p1.maxHp;
    const p2Hp = Math.max(0, Math.round(combatEngine.p2.hp));
    const p2Max = combatEngine.p2.maxHp;

    if (hp1El) hp1El.style.width = `${(p1Hp / p1Max) * 100}%`;
    if (hp2El) hp2El.style.width = `${(p2Hp / p2Max) * 100}%`;
    if (hp1Text) hp1Text.textContent = `${p1Hp} / ${p1Max}`;
    if (hp2Text) hp2Text.textContent = `${p2Hp} / ${p2Max}`;

    const p1HpBig = document.getElementById('p1HpBigText');
    const p2HpBig = document.getElementById('p2HpBigText');
    if (p1HpBig) p1HpBig.textContent = `${p1Hp} / ${p1Max}`;
    if (p2HpBig) p2HpBig.textContent = `${p2Hp} / ${p2Max}`;

    // 2. 倒數計時 (訓練模式顯示 ∞)
    const timerEl = document.getElementById('roundTimerText');
    if (timerEl) {
      timerEl.textContent = combatEngine.isTraining ? '∞' : combatEngine.roundTime;
    }

    // 3. 量子爆發計量槽
    const burst1El = document.getElementById('p1BurstFill');
    if (burst1El) burst1El.style.width = `${(combatEngine.p1.burstMeter / combatEngine.p1.burstMax) * 100}%`;

    // 4. 技能冷卻遮罩
    combatEngine.p1.cooldowns.forEach((cd, idx) => {
      const overlay = document.getElementById(`skillCdOverlay_${idx}`);
      if (overlay) {
        const totalCd = combatEngine.p1.skills[idx].cd;
        const ratio = cd > 0 ? (cd / totalCd) : 0;
        overlay.style.height = `${ratio * 100}%`;
      }
    });

    // 5. 訓練營幀數優劣勢指示燈
    const frameEl = document.getElementById('frameAdvantageIndicator');
    if (frameEl && combatEngine.isTraining) {
      const adv = combatEngine.p1.frameAdvantage;
      if (adv > 0) {
        frameEl.innerHTML = `<span style="color: #00ff66;">有利 +${adv} 幀</span>`;
      } else if (adv < 0) {
        frameEl.innerHTML = `<span style="color: #ff007f;">不利 ${adv} 幀</span>`;
      } else {
        frameEl.innerHTML = `<span style="color: #94a3b8;">均勢 0 幀</span>`;
      }
    }

    // 6. 防護罩召喚按鈕即時高亮反饋
    const guardHudBtn = document.getElementById('guardHudBtn');
    if (guardHudBtn) {
      if (combatEngine.p1.isGuarding) {
        guardHudBtn.classList.add('active');
      } else {
        guardHudBtn.classList.remove('active');
      }
    }
    const touchGuardBtn = document.getElementById('touchGuardBtn');
    if (touchGuardBtn) {
      if (combatEngine.p1.isGuarding) {
        touchGuardBtn.classList.add('active');
      } else {
        touchGuardBtn.classList.remove('active');
      }
    }

    // 7. 終極必殺能量槽與按鈕狀態即時更新
    const super1El = document.getElementById('p1SuperFill');
    const super2El = document.getElementById('p2SuperFill');
    const superBtn = document.getElementById('superHudBtn');
    const touchSuperBtn = document.getElementById('touchSuperBtn');
    const isP1SuperReady = (combatEngine.p1.superMeter >= combatEngine.p1.superMax) || (combatEngine.p1.hp <= 350 && !combatEngine.p1.usedCrisisSuper);

    if (super1El) {
      const super1Ratio = isP1SuperReady ? 1 : (combatEngine.p1.superMeter / combatEngine.p1.superMax);
      super1El.style.width = `${Math.min(100, Math.round(super1Ratio * 100))}%`;
      super1El.style.background = isP1SuperReady
        ? 'linear-gradient(90deg, #ffd700, #ff007f)'
        : 'linear-gradient(90deg, #38bdf8, #818cf8)';
    }
    if (super2El) {
      const super2Ratio = (combatEngine.p2.superMeter / combatEngine.p2.superMax);
      super2El.style.width = `${Math.min(100, Math.round(super2Ratio * 100))}%`;
    }
    if (superBtn) {
      if (isP1SuperReady) {
        superBtn.style.opacity = '1';
        superBtn.style.boxShadow = '0 0 16px #ffd700';
      } else {
        superBtn.style.opacity = '0.45';
        superBtn.style.boxShadow = 'none';
      }
    }
    if (touchSuperBtn) {
      touchSuperBtn.style.opacity = isP1SuperReady ? '1' : '0.45';
    }
  }

  // ─── 對決結束與結算面板彈出 ───
  _showMatchEndModal() {
    soundEngine.stopBgm();

    const won = combatEngine.winner === 1;
    const isAi = this.matchMode === 'ai' || this.matchMode === 'arcade';
    const reward = saveSystem.recordBattleResult(won, this.aiDifficulty, isAi);

    const endModal = document.getElementById('matchEndModal');
    const resultTitle = document.getElementById('matchResultTitle');
    const creditsReward = document.getElementById('matchRewardAmount');
    const playAgainBtn = document.getElementById('matchPlayAgainBtn');
    const nextStageBtn = document.getElementById('matchNextStageBtn');

    if (this.matchMode === 'arcade') {
      if (won) {
        this.arcadeScore += 18000 + Math.round(combatEngine.p1.hp * 12);
        this.arcadeStreakWins++;
        if (this.arcadeStage < this.arcadeMaxStages) {
          // 闖過當前關卡，準備進入下一關
          if (resultTitle) {
            resultTitle.textContent = `STAGE ${this.arcadeStage} CLEAR!`;
            resultTitle.style.color = '#ffd700';
          }
          if (creditsReward) {
            creditsReward.innerHTML = `+${reward.gained} 能量幣<div style="font-size: 13px; color: #00ff88; margin-top: 4px;">生命值恢復 +350！即將迎戰第 ${this.arcadeStage + 1} 關</div>`;
          }
          if (nextStageBtn) nextStageBtn.style.display = 'flex';
          if (playAgainBtn) playAgainBtn.style.display = 'none';
        } else {
          // 全破街機 5 連關！彈出大榮譽獎盃對話框
          if (endModal) endModal.classList.remove('active');
          const trophyModal = document.getElementById('arcadeTrophyModal');
          const trophyScore = document.getElementById('arcadeTrophyScore');
          if (trophyScore) trophyScore.textContent = `${this.arcadeScore.toLocaleString()} PTS`;
          saveSystem.addCredits(2500);
          soundEngine.playHit('super');
          if (trophyModal) trophyModal.classList.add('active');
          this.updateUserHUD();
          return;
        }
      } else {
        // 街機闖關失敗
        if (resultTitle) {
          resultTitle.textContent = `STAGE ${this.arcadeStage} FAILED`;
          resultTitle.style.color = '#ff007f';
        }
        if (creditsReward) creditsReward.textContent = `+${reward.gained} 能量幣 (闖關止步於第 ${this.arcadeStage} 關)`;
        if (nextStageBtn) nextStageBtn.style.display = 'none';
        if (playAgainBtn) {
          playAgainBtn.style.display = 'flex';
          playAgainBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> 重試本關';
        }
      }
    } else {
      if (nextStageBtn) nextStageBtn.style.display = 'none';
      if (playAgainBtn) {
        playAgainBtn.style.display = 'flex';
        playAgainBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> 再玩一次';
      }
      if (resultTitle) {
        resultTitle.textContent = won ? 'VICTORY 戰鬥勝利' : 'DEFEAT 戰鬥落敗';
        resultTitle.style.color = won ? '#00f3ff' : '#ff007f';
      }
      if (creditsReward) creditsReward.textContent = `+${reward.gained} 能量幣`;
    }

    if (endModal) endModal.classList.add('active');
    this.updateUserHUD();
  }

  exitBattleToLobby() {
    this.isFighting = false;
    if (this._battleLoopId) {
      cancelAnimationFrame(this._battleLoopId);
      this._battleLoopId = null;
    }
    this.matchEndTimer = 0;
    combatEngine.isOver = true;
    soundEngine.stopBgm();
    const battleScreen = document.getElementById('battleScreen');
    if (battleScreen) battleScreen.classList.remove('active');
    const endModal = document.getElementById('matchEndModal');
    if (endModal) endModal.classList.remove('active');
    const trainingBar = document.getElementById('trainingToolbar');
    if (trainingBar) trainingBar.style.display = 'none';
    this.updateUserHUD();
  }

  playAgain() {
    const endModal = document.getElementById('matchEndModal');
    if (endModal) endModal.classList.remove('active');
    this._launchMatch();
  }

  // ─── 事件綁定 ───
  _bindDOMEvents() {
    // 導航分頁切換
    document.querySelectorAll('.nav-tab-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
    });

    // 點擊使用者頭像打開量子授權儀
    const userBadge = document.getElementById('userBadge');
    if (userBadge) {
      userBadge.addEventListener('click', () => this.openAuthModal());
    }

    // 展示台 4 大動作按鈕
    const pPunch = document.getElementById('pedestalPunchBtn');
    const pKick = document.getElementById('pedestalKickBtn');
    const pJump = document.getElementById('pedestalJumpBtn');
    const pGuard = document.getElementById('pedestalGuardBtn');

    if (pPunch) pPunch.onclick = () => this.previewPedestalAction('light_punch');
    if (pKick) pKick.onclick = () => this.previewPedestalAction('heavy_kick');
    if (pJump) pJump.onclick = () => this.previewPedestalAction('jump');
    if (pGuard) pGuard.onclick = () => this.previewPedestalAction('high_guard');

    // 常駐右下角開始按鈕 (FAB)
    const fab = document.getElementById('fabStartBtn');
    if (fab) {
      fab.addEventListener('click', () => {
        const modeModal = document.getElementById('modeSelectModal');
        if (modeModal) modeModal.classList.add('active');
        soundEngine.playUI('click');
      });
    }

    // 模式選擇：對戰 AI (4 種難度)
    document.querySelectorAll('.select-ai-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const diff = btn.dataset.diff;
        document.getElementById('modeSelectModal').classList.remove('active');
        this.startBattle('ai', diff);
      });
    });

    // 模式選擇：本地同機雙人
    const local2pBtn = document.getElementById('selectLocal2pBtn');
    if (local2pBtn) {
      local2pBtn.onclick = () => {
        document.getElementById('modeSelectModal').classList.remove('active');
        this.startBattle('local_2p');
      };
    }

    // 模式選擇：單人街機闖關模式 (Arcade Mode)
    const startArcadeBtn = document.getElementById('startArcadeModeBtn');
    if (startArcadeBtn) {
      startArcadeBtn.onclick = () => {
        document.getElementById('modeSelectModal').classList.remove('active');
        this.startArcadeMode();
      };
    }

    // 街機闖關進入下一關按鈕
    const matchNextBtn = document.getElementById('matchNextStageBtn');
    if (matchNextBtn) {
      matchNextBtn.onclick = () => {
        this.nextArcadeStage();
      };
    }

    // 街機通關王者獎盃對話框領取獎勵
    const trophyClaimBtn = document.getElementById('arcadeTrophyClaimBtn');
    if (trophyClaimBtn) {
      trophyClaimBtn.onclick = () => {
        const tModal = document.getElementById('arcadeTrophyModal');
        if (tModal) tModal.classList.remove('active');
        this.exitBattleToLobby();
      };
    }

    // 戰鬥主題場景選擇按鈕
    document.querySelectorAll('.stage-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.stage-select-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedStageId = btn.dataset.stage;
        soundEngine.playUI('click');
      });
    });

    // 模式選擇：自由格鬥訓練營
    const trainingBtn = document.getElementById('selectTrainingBtn');
    if (trainingBtn) {
      trainingBtn.onclick = () => {
        document.getElementById('modeSelectModal').classList.remove('active');
        this.startBattle('training');
      };
    }

    // 模式選擇：雙人連線房間 (P2P)
    const hostRoomBtn = document.getElementById('hostRoomBtn');
    if (hostRoomBtn) {
      hostRoomBtn.onclick = () => {
        const code = p2pNetwork.initHost((status, data) => {
          if (status === 'connected') {
            document.getElementById('modeSelectModal').classList.remove('active');
            this.startBattle('p2p');
          }
        });
        alert(`🎮 房間已建立！房間代碼：${code}\n請將代碼分享給好友連線對決。`);
      };
    }

    const joinRoomBtn = document.getElementById('joinRoomBtn');
    if (joinRoomBtn) {
      joinRoomBtn.onclick = () => {
        const code = prompt('請輸入 6 位數房間代碼（例如：CY-8821）：');
        if (code) {
          p2pNetwork.joinRoom(code, (status) => {
            if (status === 'connected') {
              document.getElementById('modeSelectModal').classList.remove('active');
              this.startBattle('p2p');
            }
          });
        }
      };
    }

    // 授權儀表單處理 (途徑一：手動 Gmail，跨電腦自動雲端還原)
    const emailForm = document.getElementById('manualEmailForm');
    if (emailForm) {
      emailForm.onsubmit = async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('authEmailInput');
        const nickInput = document.getElementById('authNicknameInput');
        const submitBtn = document.getElementById('authSubmitBtn');
        const email = emailInput ? emailInput.value.trim() : '';
        const nick = nickInput ? nickInput.value.trim() : '';

        if (!email.includes('@') || !email.includes('.')) {
          alert('請輸入有效的 Gmail 信箱格式！');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> 正在檢索雲端存檔...';
        }

        try {
          const res = await saveSystem.loginWithEmail(email, nick);
          soundEngine.playUI('equip');

          if (res.restoreSource === 'cloud') {
            alert(`☁️ 跨電腦雲端存檔還原成功！\n歡迎回來，${res.user.nickname}！\n已成功自全球雲端同步您上次遊玩之能量幣 (${res.user.credits.toLocaleString()}) 與所有外觀。`);
          } else if (res.isNewUser) {
            alert(`🎉 歡迎新戰士！已發放 1,200 能量幣與 3 套預設造型，並建立全球雲端存檔。`);
          } else {
            alert(`✅ 歡迎回來！已載入進度並同步至全球雲端。`);
          }

          this.updateUserHUD();
          this.renderSkinsInventory();
          this.renderShopCatalog();
          this.closeAuthModal();
        } catch (err) {
          console.error('Login error:', err);
          alert('登入處理發生問題，請再試一次。');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> 確認登入並自雲端還原進度';
          }
        }
      };
    }

    // 立即強制雲端雙向同步按鈕
    const forceCloudSyncBtn = document.getElementById('forceCloudSyncBtn');
    if (forceCloudSyncBtn) {
      forceCloudSyncBtn.onclick = async () => {
        if (saveSystem.isGuest) {
          alert('訪客身分無法同步雲端，請先在下方輸入 Gmail 登入！');
          return;
        }
        forceCloudSyncBtn.disabled = true;
        forceCloudSyncBtn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> 同步中...';
        const res = await saveSystem.syncWithCloud();
        forceCloudSyncBtn.disabled = false;
        forceCloudSyncBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> 立即同步';

        if (res.success) {
          soundEngine.playUI('equip');
          this.updateUserHUD();
          this.renderSkinsInventory();
          this.renderShopCatalog();
          this.renderRegisteredAccounts();
          alert(`✅ 跨電腦雙向同步成功！\n已拉取最新雲端存檔。\n目前帳號：${res.user.email}\n能量幣：${res.user.credits.toLocaleString()}`);
        } else {
          soundEngine.playHit('guard');
          alert(`⚠️ 同步失敗：${res.reason || res.error || '網路異常'}`);
        }
      };
    }

    // 複製備用量子存檔代碼
    const exportSaveTokenBtn = document.getElementById('exportSaveTokenBtn');
    if (exportSaveTokenBtn) {
      exportSaveTokenBtn.onclick = () => {
        const token = saveSystem.exportSaveToken();
        if (!token) {
          alert('當前無有效帳號存檔可複製！');
          return;
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(token).then(() => {
            soundEngine.playUI('equip');
            alert('📋 萬用存檔代碼已複製到剪貼簿！\n您可以在其他電腦或瀏覽器點擊「導入存檔代碼」立即還原！');
          }).catch(() => {
            prompt('請手動複製下列存檔代碼：', token);
          });
        } else {
          prompt('請手動複製下列存檔代碼：', token);
        }
      };
    }

    // 導入備用量子存檔代碼
    const importSaveTokenBtn = document.getElementById('importSaveTokenBtn');
    if (importSaveTokenBtn) {
      importSaveTokenBtn.onclick = async () => {
        const token = prompt('請貼上以 CY-SAVE- 開頭的量子存檔代碼：');
        if (!token || !token.trim()) return;

        const res = await saveSystem.importSaveToken(token.trim());
        if (res.success) {
          soundEngine.playUI('equip');
          this.updateUserHUD();
          this.renderSkinsInventory();
          this.renderShopCatalog();
          this.renderRegisteredAccounts();
          alert(`🎉 存檔代碼導入成功！\n帳號：${res.user.email}\n暱稱：${res.user.nickname}\n能量幣：${res.user.credits.toLocaleString()}\n已自動同步至全球雲端！`);
        } else {
          soundEngine.playHit('guard');
          alert(`❌ 存檔代碼導入失敗：${res.reason || '代碼無效'}`);
        }
      };
    }

    // 訪客試玩按鈕
    const guestBtn = document.getElementById('authGuestBtn');
    if (guestBtn) {
      guestBtn.onclick = () => {
        saveSystem.loginAsGuest();
        this.updateUserHUD();
        this.closeAuthModal();
        soundEngine.playUI('click');
      };
    }

    // 錯誤回報表單送出
    const bugForm = document.getElementById('bugReportForm');
    if (bugForm) {
      bugForm.onsubmit = (e) => {
        e.preventDefault();
        const ticketCode = 'BUG-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(1000 + Math.random() * 9000);
        soundEngine.playUI('equip');
        alert(`✅ 感謝您的反饋！工單已成功派發：【${ticketCode}】\n系統已自動打包您的 UID、Gmail 與效能幀數數據。`);
        bugForm.reset();
      };
    }

    // 音效開關
    const muteBtn = document.getElementById('muteToggleBtn');
    if (muteBtn) {
      muteBtn.onclick = () => {
        soundEngine.setMuted(!soundEngine.isMuted);
        muteBtn.innerHTML = soundEngine.isMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
      };
    }

    // 賽後「再玩一次」按鈕與「回到大廳」按鈕
    const playAgainBtn = document.getElementById('matchPlayAgainBtn');
    if (playAgainBtn) {
      playAgainBtn.onclick = () => this.playAgain();
    }

    const backLobbyBtn = document.getElementById('matchBackLobbyBtn');
    if (backLobbyBtn) {
      backLobbyBtn.onclick = () => this.exitBattleToLobby();
    }

    // 左上角常駐退出鈕
    const cornerExitBtn = document.getElementById('battleCornerExitBtn');
    if (cornerExitBtn) {
      cornerExitBtn.onclick = () => this.exitBattleToLobby();
    }

    // HUD 中央計時器下方退出鈕
    const hudExitBtn = document.getElementById('battleHudExitBtn');
    if (hudExitBtn) {
      hudExitBtn.onclick = () => this.exitBattleToLobby();
    }

    // 自由訓練營退出按鈕
    const exitTrainingBtn = document.getElementById('exitTrainingBtn');
    if (exitTrainingBtn) {
      exitTrainingBtn.onclick = () => this.exitBattleToLobby();
    }

    // 自由訓練營重置按鈕
    const resetTrainingBtn = document.getElementById('resetTrainingBtn');
    if (resetTrainingBtn) {
      resetTrainingBtn.onclick = () => {
        combatEngine.p1.hp = combatEngine.p1.maxHp;
        combatEngine.p2.hp = combatEngine.p2.maxHp;
        combatEngine.p1.x = 200;
        combatEngine.p2.x = 800;
        combatEngine.p1.vx = 0;
        combatEngine.p1.vy = 0;
        combatEngine.p2.vx = 0;
        combatEngine.p2.vy = 0;
        combatEngine.p1.state = 'idle';
        combatEngine.p2.state = 'idle';
        combatEngine.p1.cooldowns = [0, 0, 0];
        combatEngine.p2.cooldowns = [0, 0, 0];
        combatEngine.floatingTexts.push({
          text: 'RESET COMPLETED!',
          x: 500,
          y: 260,
          color: '#ffd700',
          life: 40
        });
        soundEngine.playUI('click');
      };
    }

    // 社群外觀工作坊彈窗
    const workshopBtn = document.getElementById('workshopOpenBtn');
    if (workshopBtn) {
      workshopBtn.onclick = () => {
        const m = document.getElementById('workshopModal');
        if (m) m.classList.add('active');
      };
    }

    // 商城系列分類過濾
    document.querySelectorAll('.shop-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.shop-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const series = btn.dataset.series;
        this.renderShopCatalog(series);
        soundEngine.playUI('click');
      });
    });

    // 戰備補給領取按鈕（嚴格每日限領一次）
    const claimRewardBtn = document.getElementById('dailyRewardClaimBtn');
    if (claimRewardBtn) {
      claimRewardBtn.addEventListener('click', () => {
        if (!saveSystem.currentUser) return;
        const res = saveSystem.claimDailySupply(1500);
        if (res.success) {
          this.updateUserHUD();
          this.updateDailySupplyUI();
          soundEngine.playUI('equip');
          alert(`🎁 每日戰備補給領取成功！\n\n已獲得 +1,500 能量幣！\n當前能量幣餘額：${res.newBalance.toLocaleString()} 幣。\n\n⚠️ 每日僅限領取 1 次，明天 00:00 後可再次領取！快去商城解鎖心儀的英雄吧！`);
          this.renderShopCatalog();
        } else {
          soundEngine.playUI('error');
          const resetTime = saveSystem.getTimeUntilNextDailyReset();
          alert(`⚠️ 今日戰備補給已領取完畢！\n\n每天只能領取一次戰備補給，拿完就只能等隔天了。\n距離明天 00:00 重置還剩：${resetTime}。\n請明天再來領取！`);
        }
      });
    }

    // 所有關閉按鈕
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.onclick = () => {
        const m = btn.closest('.modal-overlay');
        if (m) m.classList.remove('active');
      };
    });
  }

  _bindKeyboardEvents() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.key === 'Escape') {
        if (this.isFighting) {
          this.exitBattleToLobby();
        } else {
          document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        }
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }

  _bindTouchEvents() {
    // 左側虛擬搖桿 (動態中心)
    const joyZone = document.getElementById('mobileJoystickZone');
    if (joyZone) {
      joyZone.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = joyZone.getBoundingClientRect();
        this._updateJoystick(touch.clientX - rect.left - rect.width / 2, touch.clientY - rect.top - rect.height / 2);
      });
      joyZone.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = joyZone.getBoundingClientRect();
        this._updateJoystick(touch.clientX - rect.left - rect.width / 2, touch.clientY - rect.top - rect.height / 2);
      });
      joyZone.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.mobileInputs.x = 0;
        this.mobileInputs.y = 0;
      });
    }

    // 右側技能觸控按鈕
    const bindTouchBtn = (id, key) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.mobileInputs[key] = true;
        });
        btn.addEventListener('touchend', (e) => {
          e.preventDefault();
          this.mobileInputs[key] = false;
        });
      }
    };

    bindTouchBtn('touchPunchBtn', 'punch');
    bindTouchBtn('touchKickBtn', 'kick');
    bindTouchBtn('touchGuardBtn', 'guard');
    bindTouchBtn('touchSkill1Btn', 'skill1');
    bindTouchBtn('touchSkill2Btn', 'skill2');
    bindTouchBtn('touchSkill3Btn', 'skill3');
    bindTouchBtn('touchBurstBtn', 'burst');
    bindTouchBtn('touchSuperBtn', 'superMove');
  }

  _updateJoystick(dx, dy) {
    const dist = Math.hypot(dx, dy);
    const maxRadius = 60;
    const clampedDist = Math.min(dist, maxRadius);
    const angle = Math.atan2(dy, dx);
    this.mobileInputs.x = (Math.cos(angle) * clampedDist) / maxRadius;
    this.mobileInputs.y = (Math.sin(angle) * clampedDist) / maxRadius;
  }
}

// 實例化並暴露給視窗
window.app = new CyberStrikerApp();
window.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});
