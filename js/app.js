/**
 * 跨次元大亂鬥 3D (Dimension Clash Online 3D) - 主應用協調器
 * (Dynamic Action Configurations, Flight Controller, Strict Genesis Unlocks, User Avatar & Auto/Manual Sync)
 */

class App3D {
  constructor() {
    this.sceneManager = null;
    this.cameraController = null;
    this.activeTab = "roster";

    this.teamSize = 3;
    this.p1Team = window.saveSystem.user.selectedTeam || ["goku_kid", "cap_america", "gm_rgm79"];
    this.p2Team = ["spiderman_classic", "krillin", "rx78_2"];
    this.pickingSlotIndex = 0;
    this.pickingForTeam = 1;

    this.keys = {};
    this.joystick = { active: false, startX: 0, startY: 0, moveX: 0, moveY: 0 };
    this.lastFrameTime = performance.now();
    this.isRunning = true;
  }

  init() {
    const container = document.getElementById("battle3DContainer");
    if (container) {
      this.sceneManager = new Arena3DScene(container);
      this.sceneManager.init();

      this.cameraController = new CameraController3D(
        this.sceneManager.camera,
        this.sceneManager.renderer.domElement
      );

      window.matchEngine3D.init(this.sceneManager.scene);
    }

    this.bindEvents();
    this.setupKeyboard();
    this.setupTouchControls();
    this.renderAllViews();
    this.updateUserStatusBar();

    // 預先加載並準備好 3D 戰鬥對局
    this.startSelectedBattle("kof");

    if (!window.saveSystem.user.isLoggedIn) {
      this.openGoogleLoginModal();
    } else {
      this.switchTab("roster");
    }

    // ── 每 5 分鐘自動同步與存檔 (Auto-Sync every 5 minutes) ──
    setInterval(() => {
      this.autoSync("5 分鐘定時自動同步");
    }, 5 * 60 * 1000);

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  // ─── 更新頂部狀態列 (含頭像與暱稱) ───
  updateUserStatusBar() {
    const goldElem = document.getElementById("userGoldDisplay");
    const trophyElem = document.getElementById("userTrophyDisplay");
    const nameElem = document.getElementById("userNicknameDisplay");
    const avatarImg = document.getElementById("userAvatarImg");

    if (goldElem) goldElem.textContent = window.saveSystem.user.gold.toLocaleString();
    if (trophyElem) trophyElem.textContent = window.saveSystem.user.trophies.toLocaleString();
    if (nameElem) nameElem.textContent = window.saveSystem.user.nickname;
    if (avatarImg) {
      avatarImg.src = window.saveSystem.user.avatar || ("https://api.dicebear.com/7.x/bottts/svg?seed=" + encodeURIComponent(window.saveSystem.user.nickname));
    }
  }

  // ─── 🔄 手動立即更新 (Manual Instant Sync) ───
  manualSync() {
    const spinIcon = document.getElementById("syncSpinIcon");
    if (spinIcon) spinIcon.classList.add("spinning");

    window.saveSystem.save();
    this.updateUserStatusBar();
    this.renderAllViews();

    if (this.sceneManager) {
      this.sceneManager.onWindowResize();
    }

    setTimeout(() => {
      if (spinIcon) spinIcon.classList.remove("spinning");
      alert("✅ 遊戲資料已成功立即手動同步並更新！");
    }, 600);
  }

  // ─── 🔄 事件完成與定時自動同步 (Auto Sync) ───
  autoSync(source = "事件自動同步") {
    window.saveSystem.save();
    this.updateUserStatusBar();
    console.log(`[AutoSync] ${source} 完成: ${new Date().toLocaleTimeString()}`);
  }

  // ─── 👤 玩家個人檔案與頭像選擇彈窗 ───
  openProfileModal() {
    const modal = document.getElementById("userProfileModal");
    const container = document.getElementById("userProfileContent");
    if (!modal || !container) return;

    const u = window.saveSystem.user;
    const avatarOptions = [
      { id: "robot", name: "次元機體", url: "https://api.dicebear.com/7.x/bottts/svg?seed=GundamMecha" },
      { id: "saiyan", name: "超級賽亞人", url: "https://api.dicebear.com/7.x/adventurer/svg?seed=SaiyanGoku" },
      { id: "hero", name: "漫威英雄", url: "https://api.dicebear.com/7.x/adventurer/svg?seed=IronHero" },
      { id: "titan", name: "宇宙泰坦", url: "https://api.dicebear.com/7.x/bottts/svg?seed=ThanosTitan" },
      { id: "warrior", name: "神話戰士", url: "https://api.dicebear.com/7.x/adventurer/svg?seed=DimensionClash" }
    ];

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 16px;">
        <img src="${u.avatar || avatarOptions[0].url}" style="width: 72px; height: 72px; border-radius: 50%; border: 3px solid #38bdf8; background: #0f172a; margin-bottom: 8px;">
        <h2 style="font-size: 20px; font-weight: 900; color: #f8fafc;">${u.nickname}</h2>
        <div style="font-size: 12px; color: #94a3b8;">${u.email} ｜ UID: ${u.uid}</div>
      </div>

      <h4 style="font-size: 13px; font-weight: 800; color: #38bdf8; margin-bottom: 8px;">選擇個人頭像：</h4>
      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin-bottom: 16px;">
        ${avatarOptions.map(av => `
          <div style="border: 2px solid ${u.avatar === av.url ? '#38bdf8' : 'rgba(255,255,255,0.1)'}; border-radius: 10px; padding: 4px; text-align: center; cursor: pointer; background: rgba(30,41,59,0.7);" onclick="window.app.changeUserAvatar('${av.url}')">
            <img src="${av.url}" style="width: 40px; height: 40px; border-radius: 50%;">
            <div style="font-size: 10px; color: #cbd5e1; margin-top: 2px;">${av.name}</div>
          </div>
        `).join("")}
      </div>

      <div style="background: rgba(30, 41, 59, 0.7); border-radius: 10px; padding: 12px; margin-bottom: 16px; font-size: 12px; line-height: 1.8;">
        <div>🏆 天梯排位：<b>${u.trophies} 獎盃</b> (勝 ${u.pvpWins} / 敗 ${u.pvpLosses})</div>
        <div>💰 總金幣：<b>${u.gold.toLocaleString()}</b> ｜ 🗼 魔王塔通關：<b>第 ${u.bossRushMaxFloor} 層</b></div>
        <div>💎 感應骨架結晶：<b>${u.psychoCrystals} 顆</b> ｜ ⚔️ 總傷害：<b>${u.totalDamage.toLocaleString()} 點</b></div>
      </div>

      <div style="display: flex; gap: 8px;">
        <button class="btn-primary" style="flex: 1; justify-content: center; font-size: 13px; padding: 10px;" onclick="window.app.manualSync()">
          <i class="fa-solid fa-rotate"></i> 立即手動同步
        </button>
        <button class="btn-secondary" style="font-size: 13px; padding: 10px 14px;" onclick="window.app.logoutUser()">
          <i class="fa-solid fa-right-from-bracket"></i> 登出
        </button>
      </div>
    `;

    modal.classList.add("active");
  }

  changeUserAvatar(avatarUrl) {
    window.saveSystem.setAvatar(avatarUrl);
    this.updateUserStatusBar();
    this.openProfileModal();
  }

  logoutUser() {
    window.saveSystem.logout();
    this.closeModal();
    this.openGoogleLoginModal();
  }

  openGoogleLoginModal() {
    const modal = document.getElementById("googleLoginModal");
    if (modal) modal.classList.add("active");
  }

  performGoogleLogin(email, nickname) {
    const avatar = "https://api.dicebear.com/7.x/bottts/svg?seed=" + encodeURIComponent(nickname);
    window.saveSystem.loginWithGoogle(email, nickname, avatar);
    this.updateUserStatusBar();
    this.closeModal();
    this.switchTab("roster");
    alert(`🎉 Google 登入成功！歡迎【${nickname}】，已為您加載專屬 3D 角色庫！`);
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.toggle("active", sec.id === `view_${tabId}`);
    });

    if (tabId === "battle") {
      if (!window.matchEngine3D.p1Current || window.matchEngine3D.matchState === "standby") {
        this.startSelectedBattle("kof");
      }
      setTimeout(() => {
        if (this.sceneManager) {
          this.sceneManager.onWindowResize();
        }
      }, 50);
    }

    if (tabId === "roster") this.renderRosterView();
    if (tabId === "workshop") this.renderWorkshopView();
    if (tabId === "shop") this.renderShopView();
    if (tabId === "boss_rush") this.renderBossRushView();
  }

  bindEvents() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => this.switchTab(btn.dataset.tab));
    });

    const startBattleBtn = document.getElementById("startBattleBtn");
    if (startBattleBtn) {
      startBattleBtn.addEventListener("click", () => this.startSelectedBattle("kof"));
    }

    // 手動立即更新按鈕
    const manualSyncBtn = document.getElementById("manualSyncBtn");
    if (manualSyncBtn) {
      manualSyncBtn.addEventListener("click", () => this.manualSync());
    }

    // 頭像徽章點擊
    const userAvatarBadge = document.getElementById("userAvatarBadge");
    if (userAvatarBadge) {
      userAvatarBadge.addEventListener("click", () => this.openProfileModal());
    }

    const dailyRewardBtn = document.getElementById("dailyRewardBtn");
    if (dailyRewardBtn) {
      dailyRewardBtn.addEventListener("click", () => this.openDailyRewardModal());
    }

    const googleSubmitBtn = document.getElementById("confirmGoogleLoginBtn");
    if (googleSubmitBtn) {
      googleSubmitBtn.addEventListener("click", () => {
        const email = document.getElementById("googleEmailInput").value || "player@gmail.com";
        const nick = document.getElementById("googleNickInput").value || "次元格鬥大師";
        this.performGoogleLogin(email, nick);
      });
    }

    const cameraBtn = document.getElementById("cameraViewBtn");
    if (cameraBtn) {
      cameraBtn.addEventListener("click", () => {
        if (this.cameraController) {
          this.cameraController.cycleViewMode();
          cameraBtn.innerHTML = `<i class="fa-solid fa-video"></i> ${this.cameraController.getViewModeLabel()}`;
        }
      });
    }

    document.querySelectorAll(".team-size-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".team-size-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.teamSize = parseInt(btn.dataset.size);
        this.adjustTeamSize();
        this.renderTeamSelectors();
        this.renderRosterView();
        this.autoSync("變更隊伍人數");
      });
    });

    const muteBtn = document.getElementById("muteToggleBtn");
    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        const muted = window.soundEngine.toggleMute();
        muteBtn.innerHTML = muted ? `<i class="fa-solid fa-volume-xmark"></i> 靜音` : `<i class="fa-solid fa-volume-high"></i> 音效`;
      });
    }

    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", () => this.closeModal());
    });
  }

  updateActionButtonsForFighter(charData) {
    if (!charData || !charData.attackConfig) return;
    const cfg = charData.attackConfig;

    const setBtn = (id, labelText) => {
      const elem = document.getElementById(id);
      if (elem) {
        const labelElem = elem.querySelector(".label");
        if (labelElem) labelElem.textContent = labelText;
      }
    };

    setBtn("touchBtnAtk", `普攻[J]`);
    setBtn("touchBtnHeavy", `破防[K]`);
    setBtn("touchBtnGrab", `抓技[O]`);
    setBtn("touchBtnSkill1", `${cfg.skill1.name.slice(0, 4)}[U]`);
    setBtn("touchBtnSkill2", `${cfg.skill2.name.slice(0, 4)}[I]`);
    setBtn("touchBtnUlt", `${cfg.ult.name.slice(0, 4)}[L]`);

    const flightBtn = document.getElementById("touchBtnFlight");
    if (flightBtn) {
      if (charData.canFly) {
        flightBtn.style.display = "flex";
        flightBtn.querySelector(".label").textContent = "飛行[F]";
      } else {
        flightBtn.style.display = "none";
      }
    }
  }

  openDailyRewardModal() {
    const modal = document.getElementById("dailyRewardModal");
    const container = document.getElementById("dailyRewardContent");
    if (!modal || !container) return;

    const streak = window.saveSystem.user.dailyReward.streakDay || 1;
    const isClaimed = window.saveSystem.user.dailyReward.claimedToday;

    const rewards = [
      { day: 1, gold: 500, gift: "仙豆補給包" },
      { day: 2, gold: 1000, gift: "綠階召募券" },
      { day: 3, gold: 1500, gift: "振金編織內襯" },
      { day: 4, gold: 2000, gift: "初鋼改裝零件" },
      { day: 5, gold: 3000, gift: "2顆感應結晶" },
      { day: 6, gold: 4000, gift: "特南克斯碎片" },
      { day: 7, gold: 10000, gift: "史詩自選箱！" }
    ];

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 8px; margin-bottom: 20px;">
        ${rewards.map(r => `
          <div style="background: ${r.day === streak ? 'rgba(56, 189, 248, 0.25)' : 'rgba(15, 23, 42, 0.6)'}; border: 1px solid ${r.day === streak ? '#38bdf8' : 'rgba(255,255,255,0.1)'}; border-radius: 8px; padding: 10px 6px; text-align: center;">
            <div style="font-size: 11px; font-weight: 800; color: #94a3b8;">第 ${r.day} 天</div>
            <div style="font-size: 18px; margin: 4px 0;">🎁</div>
            <div style="font-size: 12px; font-weight: 800; color: #facc15;">+${r.gold} 金幣</div>
            <div style="font-size: 10px; color: #cbd5e1; margin-top: 2px;">${r.gift}</div>
            ${r.day < streak ? `<div style="font-size: 10px; color: #4ade80; margin-top: 4px;">✅ 已領</div>` : (r.day === streak && isClaimed ? `<div style="font-size: 10px; color: #4ade80; margin-top: 4px;">✅ 今日已領</div>` : '')}
          </div>
        `).join("")}
      </div>

      <button class="btn-primary" style="width: 100%; padding: 12px; font-size: 16px; justify-content: center;" ${isClaimed ? 'disabled' : ''} onclick="window.app.claimDailyReward()">
        ${isClaimed ? '✅ 今日獎勵已領取 (明天再來！)' : '🎁 立即領取今日登入獎勵！'}
      </button>
    `;

    modal.classList.add("active");
  }

  claimDailyReward() {
    const res = window.saveSystem.claimDailyReward();
    if (res.success) {
      if (window.soundEngine) window.soundEngine.playLevelUp();
      this.updateUserStatusBar();
      this.openDailyRewardModal();
      this.autoSync("領取每日獎勵");
      alert(`🎉 成功領取第 ${res.reward.day} 天獎勵：\n${res.reward.desc} (+${res.reward.gold} 金幣)！`);
    } else {
      alert(res.reason);
    }
  }

  adjustTeamSize() {
    while (this.p1Team.length < this.teamSize) this.p1Team.push(window.saveSystem.user.unlockedCharacters[0] || "goku_kid");
    while (this.p1Team.length > this.teamSize) this.p1Team.pop();
    window.saveSystem.setTeam(this.p1Team);

    const enemies = ["rx78_2", "spiderman_classic", "krillin", "char_zaku2", "hulk", "vegeta", "thor"];
    while (this.p2Team.length < this.teamSize) {
      this.p2Team.push(enemies[Math.floor(Math.random() * enemies.length)]);
    }
    while (this.p2Team.length > this.teamSize) this.p2Team.pop();
  }

  setupKeyboard() {
    window.addEventListener("keydown", (e) => {
      if (e.repeat) return;
      this.keys[e.key.toLowerCase()] = true;
      this.keys[e.code] = true;

      if (e.key === "Enter" || e.code === "Enter") {
        if (window.matchEngine3D) {
          window.matchEngine3D.confirmStartMatch();
        }
        return;
      }

      const p1 = window.matchEngine3D.p1Current;
      if (!p1 || window.matchEngine3D.matchState !== "fighting") return;
      const p2 = window.matchEngine3D.p2Current;

      if (e.key.toLowerCase() === "f") {
        p1.toggleFlight();
      }

      if (e.key.toLowerCase() === "v") {
        if (this.cameraController) {
          this.cameraController.cycleViewMode();
          const cameraBtn = document.getElementById("cameraViewBtn");
          if (cameraBtn) {
            cameraBtn.innerHTML = `<i class="fa-solid fa-video"></i> ${this.cameraController.getViewModeLabel()}`;
          }
        }
      }

      if (e.code === "Space") {
        p1.jump();
      }

      if (e.key === "Shift" || e.code === "ShiftLeft") {
        p1.dodge();
      }

      if (e.key.toLowerCase() === "s") {
        p1.guard(true);
      }

      if (e.key.toLowerCase() === "j") {
        p1.lightAttack(p2);
      }

      if (e.key.toLowerCase() === "k") {
        p1.startHeavyCharge();
        setTimeout(() => {
          if (p1 && p1.isCharging) p1.releaseHeavyCharge(p2);
        }, 700);
      }

      if (e.key.toLowerCase() === "o") {
        p1.grab(p2);
      }

      if (e.key.toLowerCase() === "u") {
        p1.useSkill1(p2);
      }

      if (e.key.toLowerCase() === "i") {
        p1.useSkill2(p2);
      }

      if (e.key.toLowerCase() === "l") {
        p1.useUlt(p2);
      }

      if (e.key.toLowerCase() === "q" || e.key.toLowerCase() === "e") {
        window.matchEngine3D.callAssist();
      }

      if (e.key.toLowerCase() === "b") {
        p1.useBurst(p2);
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
      this.keys[e.code] = false;

      const p1 = window.matchEngine3D.p1Current;
      if (p1 && e.key.toLowerCase() === "s") {
        p1.guard(false);
      }
    });
  }

  setupTouchControls() {
    const joystickArea = document.getElementById("virtualJoystickArea");
    const joystickKnob = document.getElementById("virtualJoystickKnob");

    if (joystickArea && joystickKnob) {
      const handleJoystick = (clientX, clientY) => {
        const rect = joystickArea.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let dx = clientX - centerX;
        let dy = clientY - centerY;
        const maxDist = 35;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > maxDist) {
          dx = (dx / dist) * maxDist;
          dy = (dy / dist) * maxDist;
        }

        joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
        this.joystick.moveX = dx / maxDist;
        this.joystick.moveY = dy / maxDist;
      };

      joystickArea.addEventListener("touchstart", (e) => {
        this.joystick.active = true;
        handleJoystick(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: false });

      window.addEventListener("touchmove", (e) => {
        if (!this.joystick.active) return;
        handleJoystick(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: false });

      window.addEventListener("touchend", () => {
        this.joystick.active = false;
        this.joystick.moveX = 0;
        this.joystick.moveY = 0;
        joystickKnob.style.transform = "translate(0px, 0px)";
      });
    }

    const bindTouch = (id, onDown, onUp) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener("touchstart", (e) => { e.preventDefault(); if (onDown) onDown(); });
      btn.addEventListener("touchend", (e) => { e.preventDefault(); if (onUp) onUp(); });
      btn.addEventListener("mousedown", (e) => { e.preventDefault(); if (onDown) onDown(); });
      btn.addEventListener("mouseup", (e) => { e.preventDefault(); if (onUp) onUp(); });
    };

    const p1 = () => window.matchEngine3D.p1Current;
    const p2 = () => window.matchEngine3D.p2Current;

    bindTouch("touchBtnFlight", () => { if (p1()) p1().toggleFlight(); });
    bindTouch("touchBtnJump", () => { if (p1()) p1().jump(); });
    bindTouch("touchBtnRoll", () => { if (p1()) p1().dodge(); });
    bindTouch("touchBtnGuard", () => { if (p1()) p1().guard(true); }, () => { if (p1()) p1().guard(false); });
    bindTouch("touchBtnAtk", () => { if (p1()) p1().lightAttack(p2()); });
    bindTouch("touchBtnHeavy", () => { if (p1()) { p1().startHeavyCharge(); setTimeout(() => p1().releaseHeavyCharge(p2()), 700); } });
    bindTouch("touchBtnGrab", () => { if (p1()) p1().grab(p2()); });
    bindTouch("touchBtnSkill1", () => { if (p1()) p1().useSkill1(p2()); });
    bindTouch("touchBtnSkill2", () => { if (p1()) p1().useSkill2(p2()); });
    bindTouch("touchBtnUlt", () => { if (p1()) p1().useUlt(p2()); });
    bindTouch("touchBtnBurst", () => { if (p1()) p1().useBurst(p2()); });
    bindTouch("touchBtnAssist", () => { window.matchEngine3D.callAssist(); });
  }

  startSelectedBattle(mode = "kof", customP2Roster = null, isRanked = false, bossFloor = 0) {
    const p1RosterData = this.p1Team.map(id => {
      const base = window.CHARACTERS_DATA.find(c => c.id === id) || window.CHARACTERS_DATA[0];
      return Object.assign({}, base, {
        userLevel: window.saveSystem.user.characterLevels[id] || 1,
        equippedGear: (window.saveSystem.user.equippedGear[id] || []).map(gid => window.EQUIPMENT_DATA.find(e => e.id === gid))
      });
    });

    const p2RosterData = (customP2Roster || this.p2Team).map(id => {
      const base = window.CHARACTERS_DATA.find(c => c.id === id) || window.CHARACTERS_DATA[0];
      return Object.assign({}, base, {
        userLevel: isRanked ? 100 : (base.rarity * 10),
        equippedGear: []
      });
    });

    window.matchEngine3D.startMatch(p1RosterData, p2RosterData, mode, isRanked, bossFloor);

    if (this.cameraController && window.matchEngine3D.p1Current) {
      this.cameraController.target = window.matchEngine3D.p1Current.model.group;
      this.cameraController.opponent = window.matchEngine3D.p2Current.model.group;
    }

    window.matchEngine3D.onMatchEnd = (result) => {
      this.handleMatchResult(result);
    };

    this.switchTab("battle");
    setTimeout(() => {
      if (this.sceneManager) {
        this.sceneManager.onWindowResize();
      }
    }, 50);
  }

  handleMatchResult(result) {
    const isWin = result.winner === "player";
    const isBossRush = result.mode === "boss_rush";

    window.saveSystem.addGold(result.gold);
    window.saveSystem.recordMatchResult(
      isWin,
      3500,
      result.mode === "ranked",
      isBossRush,
      result.bossFloor,
      result.isSweep1v5
    );
    this.updateUserStatusBar();
    this.autoSync("戰鬥結算");

    const title = isWin ? "🏆 3D 榮耀大勝利 (VICTORY)!" : "💀 戰鬥落敗 (DEFEATED)";
    const sweepNotice = result.isSweep1v5 ? "\n🔥【1 穿 5 完封紀錄達成！】解鎖吉連成就資格！" : (result.isSweep ? "\n🔥【一挑多雙倍金幣獎勵】" : "");

    alert(`${title}\n\n獲得金幣獎勵：+${result.gold} 金幣！${sweepNotice}`);
  }

  renderTeamSelectors() {
    const p1Container = document.getElementById("p1TeamSlots");
    const p2Container = document.getElementById("p2TeamSlots");
    if (!p1Container || !p2Container) return;

    p1Container.innerHTML = this.p1Team.map((charId, idx) => {
      const char = window.CHARACTERS_DATA.find(c => c.id === charId) || window.CHARACTERS_DATA[0];
      const lvl = window.saveSystem.user.characterLevels[charId] || 1;
      return `
        <div class="team-slot-card" onclick="window.app.openHeroPicker(${idx}, 1)">
          <div class="slot-badge">${idx + 1} 號位 ${idx === 0 ? '(首發)' : ''}</div>
          <div class="slot-char-name" style="color: ${char.themeColor}">${char.name}</div>
          <div class="slot-char-lvl">Lv.${lvl}</div>
        </div>
      `;
    }).join("");

    p2Container.innerHTML = this.p2Team.map((charId, idx) => {
      const char = window.CHARACTERS_DATA.find(c => c.id === charId) || window.CHARACTERS_DATA[0];
      return `
        <div class="team-slot-card" onclick="window.app.openHeroPicker(${idx}, 2)">
          <div class="slot-badge">${idx + 1} 號位</div>
          <div class="slot-char-name" style="color: ${char.themeColor}">${char.name}</div>
          <div class="slot-char-lvl">Lv.${char.rarity * 10}</div>
        </div>
      `;
    }).join("");
  }

  openHeroPicker(slotIdx, teamNum) {
    this.pickingSlotIndex = slotIdx;
    this.pickingForTeam = teamNum;
    const modal = document.getElementById("heroPickerModal");
    const grid = document.getElementById("pickerHeroGrid");
    if (!modal || !grid) return;

    const list = teamNum === 1
      ? window.CHARACTERS_DATA.filter(c => window.saveSystem.user.unlockedCharacters.includes(c.id))
      : window.CHARACTERS_DATA;

    grid.innerHTML = list.map(c => `
      <div class="picker-card" onclick="window.app.selectHeroForSlot('${c.id}')">
        <div style="font-weight: 800; color: ${c.themeColor}">${c.name}</div>
        <div style="font-size: 11px; color: #94a3b8">${c.seriesName} · ${c.role}</div>
      </div>
    `).join("");

    modal.classList.add("active");
  }

  selectHeroForSlot(charId) {
    if (this.pickingForTeam === 1) {
      this.p1Team[this.pickingSlotIndex] = charId;
      window.saveSystem.setTeam(this.p1Team);
    } else {
      this.p2Team[this.pickingSlotIndex] = charId;
    }
    this.closeModal();
    this.renderTeamSelectors();
    this.renderRosterView();
    this.autoSync("更換出場英雄");
  }

  // ─── 自由指派出場順序 [ 1 ] / [ 2 ] / [ 3 ] ───
  setHeroToTeamSlot(charId, slotIndex = 0) {
    if (slotIndex < this.p1Team.length) {
      this.p1Team[slotIndex] = charId;
    } else if (this.p1Team.length < 5) {
      this.p1Team.push(charId);
    }
    window.saveSystem.setTeam(this.p1Team);
    this.renderTeamSelectors();
    this.renderRosterView();
    this.autoSync("指派出場號位");
    const char = window.CHARACTERS_DATA.find(c => c.id === charId) || { name: charId };
    alert(`✅ 已將【${char.name}】指派為第 ${slotIndex + 1} 號位出場！`);
  }

  closeModal() {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
  }

  renderRosterView() {
    const grid = document.getElementById("rosterGrid");
    const currentTeamBanner = document.getElementById("rosterTeamBanner");

    if (currentTeamBanner) {
      currentTeamBanner.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid #38bdf8; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div>
              <h3 style="font-size: 16px; font-weight: 900; color: #38bdf8;">⚔️ 當前出賽陣容 (${this.p1Team.length} 隻參賽英雄)</h3>
              <p style="font-size: 12px; color: #94a3b8;">點擊下方角色卡片上的號位按鈕 [ 1 ]、[ 2 ]、[ 3 ] 即可自由指派出場順序！(1 代表首發，已選過則不顯示亮色)</p>
            </div>
            <button class="btn-primary" style="font-size: 15px; padding: 10px 22px;" onclick="window.app.startSelectedBattle('kof')">
              <i class="fa-solid fa-play"></i> ⚔️ 開始遊戲 [前往 3D 戰鬥]
            </button>
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${this.p1Team.map((id, idx) => {
              const char = window.CHARACTERS_DATA.find(c => c.id === id) || window.CHARACTERS_DATA[0];
              const lvl = window.saveSystem.user.characterLevels[id] || 1;
              return `
                <div style="background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 8px 12px; min-width: 130px;">
                  <div style="font-size: 11px; font-weight: 800; color: #facc15;">${idx + 1} 號位 ${idx === 0 ? '(首發)' : ''}</div>
                  <div style="font-weight: 800; color: ${char.themeColor}; font-size: 14px;">${char.name}</div>
                  <div style="font-size: 11px; color: #94a3b8;">Lv.${lvl} / 100 ${char.canFly ? '✈️ 具備飛行' : ''}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    if (!grid) return;

    grid.innerHTML = window.CHARACTERS_DATA.map(c => {
      const isUnlocked = window.saveSystem.user.unlockedCharacters.includes(c.id);
      const lvl = window.saveSystem.user.characterLevels[c.id] || 1;
      const rarity = window.RARITY_TIERS[c.rarity];

      // ─── 自由選人按鈕：1, 2, 3 號位 ───
      const slotButtons = [];
      if (isUnlocked) {
        for (let s = 0; s < this.teamSize; s++) {
          const slotNum = s + 1;
          const isThisCharInThisSlot = (this.p1Team[s] === c.id);
          const isSlotTakenBySomeoneElse = (this.p1Team[s] && this.p1Team[s] !== c.id);

          if (isThisCharInThisSlot) {
            // 已選中該號位
            slotButtons.push(`
              <button class="slot-num-btn active-slot" onclick="window.app.setHeroToTeamSlot('${c.id}', ${s})" title="已指派為第 ${slotNum} 號位出場">
                ✅ ${slotNum}
              </button>
            `);
          } else if (isSlotTakenBySomeoneElse) {
            // 該號位已被其他英雄選走：不顯示高亮亮色，維持暗色
            slotButtons.push(`
              <button class="slot-num-btn taken-slot" onclick="window.app.setHeroToTeamSlot('${c.id}', ${s})" title="第 ${slotNum} 號位已選，點擊可替換">
                ${slotNum}
              </button>
            `);
          } else {
            // 號位空缺，可點擊選入
            slotButtons.push(`
              <button class="slot-num-btn available-slot" onclick="window.app.setHeroToTeamSlot('${c.id}', ${s})" title="指派為第 ${slotNum} 號位出場">
                +${slotNum}
              </button>
            `);
          }
        }
      }

      return `
        <div class="character-card ${isUnlocked ? '' : 'locked'}" style="border-top: 3px solid ${rarity.color}">
          <div class="rarity-ribbon" style="background: ${rarity.bg}; color: ${rarity.border}; border: 1px solid ${rarity.border}">${rarity.label}</div>
          <div class="card-avatar-box" style="border-color: ${c.themeColor}">
            ${c.series === 'gundam' ? '🤖' : (c.series === 'dragonball' ? '⚡' : '🦸')}
          </div>
          <div class="card-char-name">${c.name}</div>
          <div class="card-char-title">${c.seriesName} · ${c.role} ${c.canFly ? '✈️' : ''}</div>
          <div class="card-stats-row">
            <span>${isUnlocked ? `Lv.${lvl} / 100` : '🔒 未解鎖'}</span>
            <span style="color: ${c.themeColor}">ATK ${Math.round(c.baseAtk * (1 + (lvl - 1) * 0.02))}</span>
          </div>

          <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 6px;">
            ${isUnlocked ? `
              <div style="display: flex; gap: 4px; align-items: center;">
                <span style="font-size: 11px; color: #94a3b8; font-weight: 700; margin-right: 2px;">出場:</span>
                ${slotButtons.join("")}
              </div>
            ` : ''}
            <button class="btn-secondary" style="font-size: 11px; padding: 5px; width: 100%; justify-content: center;" onclick="window.app.openCharacterDetail('${c.id}')">
              🔍 詳情 / 升級
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  openCharacterDetail(charId) {
    const char = window.CHARACTERS_DATA.find(c => c.id === charId);
    if (!char) return;
    const modal = document.getElementById("charDetailModal");
    const container = document.getElementById("charDetailContent");
    if (!modal || !container) return;

    const isUnlocked = window.saveSystem.user.unlockedCharacters.includes(char.id);
    const lvl = window.saveSystem.user.characterLevels[char.id] || 1;
    const upgradeCost = Math.round(200 * Math.pow(lvl, 1.4));
    const rarity = window.RARITY_TIERS[char.rarity];
    const cfg = char.attackConfig;

    container.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 16px;">
        <div style="font-size: 48px;">${char.series === 'gundam' ? '🤖' : (char.series === 'dragonball' ? '⚡' : '🦸')}</div>
        <div>
          <h2 style="font-size: 24px; font-weight: 900; color: ${char.themeColor}">${char.name}</h2>
          <div style="color: #94a3b8; font-size: 13px;">${char.seriesName} · ${char.title} · <span style="color: ${rarity.color}">${rarity.name}</span> · ${char.canFly ? '<b style="color:#38bdf8;">✈️ 支援飛行升空</b>' : '地面戰鬥型'}</div>
        </div>
      </div>

      <div style="background: rgba(30, 41, 59, 0.6); padding: 14px; border-radius: 10px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; font-weight: 800; margin-bottom: 6px;">
          <span>3D 角色等級：Lv.${lvl} / 100</span>
          <span>屬性倍率：${(1 + (lvl - 1) * 0.02).toFixed(2)}x</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 13px;">
          <div>❤️ 生命：<b>${Math.round(char.baseHp * (1 + (lvl - 1) * 0.02))}</b></div>
          <div>⚔️ 攻擊：<b>${Math.round(char.baseAtk * (1 + (lvl - 1) * 0.02))}</b></div>
          <div>🛡️ 防禦：<b>${char.baseDef}</b></div>
        </div>
      </div>

      <h4 style="font-size: 15px; margin-bottom: 8px; color: #38bdf8;">🎮 專屬 3D 招式設定</h4>
      <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; margin-bottom: 16px;">
        ${char.canFly ? `<div style="background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; padding: 8px 12px; border-radius: 6px; color:#38bdf8;"><b>[F] 飛行起飛</b>：${cfg.flight.name} (升空懸浮，可空中四向作戰)</div>` : ''}
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px;"><b>[J] 普攻連擊</b>：${cfg.light.name}</div>
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px;"><b>[K] 破防重擊</b>：${cfg.heavy.name}</div>
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px;"><b>[O] 近身抓技</b>：${cfg.grab.name}</div>
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px;"><b>[U] 小招 1【${char.skills.skill1.name}】</b> (CD ${char.skills.skill1.cd}s)：${char.skills.skill1.desc}</div>
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px;"><b>[I] 小招 2【${char.skills.skill2.name}】</b> (CD ${char.skills.skill2.cd}s)：${char.skills.skill2.desc}</div>
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px; border-left: 3px solid #facc15;"><b>[L] 奧義大招【${char.skills.ult.name}】</b> (CD ${char.skills.ult.cd}s + 100% 怒氣)：${char.skills.ult.desc}</div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        ${isUnlocked ? `
          <button class="btn-primary" onclick="window.app.upgradeCurrentHero('${char.id}')">
            🔼 升級角色 (消耗 ${upgradeCost.toLocaleString()} 金幣)
          </button>
        ` : `
          <div style="color: #ef4444; font-weight: 700;">解鎖條件：${char.unlockCondition}</div>
        `}
      </div>
    `;

    modal.classList.add("active");
  }

  upgradeCurrentHero(charId) {
    const res = window.saveSystem.upgradeCharacter(charId);
    if (res.success) {
      if (window.soundEngine) window.soundEngine.playLevelUp();
      this.updateUserStatusBar();
      this.openCharacterDetail(charId);
      this.renderRosterView();
      this.autoSync("升級角色等級");
    } else {
      alert(res.reason);
    }
  }

  renderWorkshopView() {
    const select = document.getElementById("workshopHeroSelect");
    const container = document.getElementById("workshopSlotsContainer");
    if (!select || !container) return;

    const unlocked = window.saveSystem.user.unlockedCharacters;
    select.innerHTML = unlocked.map(id => {
      const c = window.CHARACTERS_DATA.find(x => x.id === id) || window.CHARACTERS_DATA[0];
      return `<option value="${id}">${c.name} (${c.seriesName})</option>`;
    }).join("");

    this.selectedCharForWorkshop = select.value || unlocked[0];
    select.onchange = (e) => {
      this.selectedCharForWorkshop = e.target.value;
      this.renderWorkshopSlots();
    };
    this.renderWorkshopSlots();
  }

  renderWorkshopSlots() {
    const container = document.getElementById("workshopSlotsContainer");
    if (!container) return;

    const charId = this.selectedCharForWorkshop;
    const equipped = window.saveSystem.user.equippedGear[charId] || [null, null, null, null];

    container.innerHTML = [1, 2, 3, 4].map(slotNum => {
      const slotDef = window.EQUIPMENT_SLOTS[slotNum];
      const gearId = equipped[slotNum - 1];
      const gear = gearId ? window.EQUIPMENT_DATA.find(g => g.id === gearId) : null;

      return `
        <div class="workshop-slot-card" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px;">
          <div style="font-size: 13px; font-weight: 800; color: #38bdf8; margin-bottom: 8px;">
            ${slotDef.icon} 插槽 ${slotNum}：${slotDef.name}
          </div>
          ${gear ? `
            <div style="background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(56, 189, 248, 0.4); padding: 12px; border-radius: 8px; margin-bottom: 10px;">
              <div style="font-weight: 800; color: #fde047;">${gear.name}</div>
              <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">${gear.perkDesc}</div>
            </div>
            <button class="btn-secondary" style="font-size: 11px; padding: 4px 10px;" onclick="window.app.unequipGear('${charId}', ${slotNum})">卸下配件</button>
          ` : `
            <div style="color: #64748b; font-size: 12px; margin-bottom: 10px;">[ 未安裝配件 ]</div>
            <button class="btn-primary" style="font-size: 11px; padding: 4px 10px;" onclick="window.app.openGearEquipModal('${charId}', ${slotNum})">安裝配件</button>
          `}
        </div>
      `;
    }).join("");
  }

  unequipGear(charId, slotNum) {
    window.saveSystem.unequipItem(charId, slotNum);
    this.renderWorkshopSlots();
    this.autoSync("卸下裝備配件");
  }

  openGearEquipModal(charId, slotNum) {
    const modal = document.getElementById("gearPickerModal");
    const listContainer = document.getElementById("gearPickerList");
    if (!modal || !listContainer) return;

    const availableGears = window.EQUIPMENT_DATA.filter(g => g.slot === slotNum);
    listContainer.innerHTML = availableGears.map(g => `
      <div style="background: rgba(30, 41, 59, 0.8); padding: 12px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 800; color: #38bdf8;">${g.icon} ${g.name} (${g.seriesName})</div>
          <div style="font-size: 11px; color: #94a3b8;">${g.perkDesc}</div>
        </div>
        <button class="btn-primary" style="font-size: 12px; padding: 6px 12px;" onclick="window.app.confirmEquipGear('${charId}', ${slotNum}, '${g.id}')">裝備</button>
      </div>
    `).join("");

    modal.classList.add("active");
  }

  confirmEquipGear(charId, slotNum, gearId) {
    window.saveSystem.equipItem(charId, slotNum, gearId);
    this.closeModal();
    this.renderWorkshopSlots();
    this.autoSync("安裝裝備配件");
  }

  renderShopView() {
    const grid = document.getElementById("shopHeroGrid");
    const genesisList = document.getElementById("genesisChallengesList");
    if (!grid || !genesisList) return;

    const purchasable = window.CHARACTERS_DATA.filter(c => !c.isFree && !c.isNonPurchasable);
    grid.innerHTML = purchasable.map(c => {
      const isOwned = window.saveSystem.user.unlockedCharacters.includes(c.id);
      const rarity = window.RARITY_TIERS[c.rarity];
      return `
        <div class="character-card" style="border-top: 3px solid ${rarity.color}">
          <div class="rarity-ribbon" style="background: ${rarity.bg}; color: ${rarity.border}">${rarity.label}</div>
          <div class="card-char-name">${c.name}</div>
          <div class="card-char-title">${c.seriesName} · ${c.role}</div>
          <div style="margin-top: 12px;">
            ${isOwned ? `<div style="color: #4ade80; font-weight: 800; font-size: 12px;">✅ 已招募</div>` : `
              <button class="btn-primary" style="width: 100%; font-size: 12px; padding: 6px 10px;" onclick="window.app.buyHero('${c.id}', ${c.cost})">
                💰 招募 (${c.cost.toLocaleString()} 金幣)
              </button>
            `}
          </div>
        </div>
      `;
    }).join("");

    const genesisHeroes = window.CHARACTERS_DATA.filter(c => c.rarity === 9);
    genesisList.innerHTML = genesisHeroes.map(g => {
      const isUnlocked = window.saveSystem.user.unlockedCharacters.includes(g.id);
      const progress = window.saveSystem.getGenesisProgress(g.id);

      return `
        <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid ${isUnlocked ? '#4ade80' : '#fb7185'}; border-radius: 12px; padding: 16px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 900; color: #fb7185; font-size: 16px;">★ 創世級【${g.name}】</div>
            <div style="font-size: 12px; font-weight: 800; color: ${isUnlocked ? '#4ade80' : (progress.achieved ? '#facc15' : '#f43f5e')}">
              ${isUnlocked ? '👑 已登頂解鎖' : (progress.achieved ? '⚡ 目標已達成！可領取' : '🔒 挑戰進行中')}
            </div>
          </div>
          <div style="font-size: 12px; color: #cbd5e1; margin-top: 6px;"><b>目標要求：</b>${progress.desc}</div>
          <div style="font-size: 12px; color: #38bdf8; margin-top: 4px;"><b>目前真實進度：</b>${progress.progressText}</div>

          <div style="background: rgba(0,0,0,0.5); height: 8px; border-radius: 4px; overflow: hidden; margin-top: 8px;">
            <div style="background: ${isUnlocked ? '#4ade80' : '#fb7185'}; height: 100%; width: ${isUnlocked ? 100 : progress.percent}%;"></div>
          </div>

          ${!isUnlocked ? `
            <button class="btn-primary" style="margin-top: 10px; font-size: 12px; padding: 6px 16px; background: ${progress.achieved ? 'linear-gradient(135deg, #f59e0b, #eab308)' : 'rgba(51, 65, 85, 0.8)'}" onclick="window.app.tryGenesisUnlock('${g.id}')">
              ${progress.achieved ? '🎁 達成目標！立即解鎖角色' : '🔒 驗證並解鎖 (未達標無法領取)'}
            </button>
          ` : ''}
        </div>
      `;
    }).join("");
  }

  buyHero(charId, cost) {
    if (window.saveSystem.spendGold(cost)) {
      window.saveSystem.unlockCharacter(charId);
      if (window.soundEngine) window.soundEngine.playLevelUp();
      this.updateUserStatusBar();
      this.renderShopView();
      this.renderRosterView();
      this.autoSync("招募英雄");
      alert(`🎉 恭喜招募成功！`);
    } else {
      alert(`金幣不足！招募需要 ${cost.toLocaleString()} 金幣`);
    }
  }

  tryGenesisUnlock(charId) {
    const res = window.saveSystem.tryStrictGenesisUnlock(charId);
    if (res.success) {
      if (window.soundEngine) window.soundEngine.playVictory();
      this.renderShopView();
      this.renderRosterView();
      this.autoSync("解鎖創世英雄");
      alert(`👑 恭喜達成極限神級成就！創世級【${charId}】已成功降臨！`);
    } else {
      alert(res.reason);
    }
  }

  renderBossRushView() {
    const list = document.getElementById("bossRushFloorList");
    if (!list) return;

    list.innerHTML = window.BOSS_RUSH_FLOORS.map(f => `
      <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 800; font-size: 15px; color: #38bdf8;">${f.name} (Lv.${f.level})</div>
          <div style="font-size: 12px; color: #cbd5e1; margin-top: 2px;">${f.affix}</div>
          <div style="font-size: 11px; color: #facc15; margin-top: 2px;">💰 通關獎勵：${f.rewardGold} 金幣 ｜ 💎 掉落感應骨架結晶</div>
        </div>
        <button class="btn-primary" style="font-size: 12px; padding: 8px 16px;" onclick="window.app.startBossRushFloor(${f.floor})">
          ⚔️ 挑戰第 ${f.floor} 層 3D 魔王
        </button>
      </div>
    `).join("");
  }

  startBossRushFloor(floorNum) {
    const floorData = window.BOSS_RUSH_FLOORS.find(f => f.floor === floorNum);
    if (!floorData) return;
    this.startSelectedBattle("boss_rush", floorData.bosses, false, floorNum);
  }

  renderAllViews() {
    this.renderTeamSelectors();
    this.renderRosterView();
    this.renderWorkshopView();
    this.renderShopView();
    this.renderBossRushView();
  }

  gameLoop(currentTime) {
    const dt = Math.min(0.1, (currentTime - this.lastFrameTime) / 1000);
    this.lastFrameTime = currentTime;

    if (window.matchEngine3D && window.matchEngine3D.p1Current && window.matchEngine3D.matchState === "fighting") {
      const p1 = window.matchEngine3D.p1Current;
      let moveX = 0;
      let moveZ = 0;

      if (this.keys["w"] || this.keys["arrowup"]) moveZ -= 1;
      if (this.keys["s"] || this.keys["arrowdown"]) moveZ += 1;
      if (this.keys["a"] || this.keys["arrowleft"]) moveX -= 1;
      if (this.keys["d"] || this.keys["arrowright"]) moveX += 1;

      if (this.joystick.active) {
        moveX = this.joystick.moveX;
        moveZ = this.joystick.moveY;
      }

      const camYaw = this.cameraController ? this.cameraController.yaw : 0;
      p1.move3D(moveX, moveZ, camYaw);
    }

    if (window.matchEngine3D && window.matchEngine3D.p2Current && window.fighterAI3D && window.matchEngine3D.matchState === "fighting") {
      window.fighterAI3D.update(dt, window.matchEngine3D.p2Current, window.matchEngine3D.p1Current);
    }

    if (window.matchEngine3D) {
      window.matchEngine3D.update(dt);
    }

    if (this.cameraController) {
      if (window.matchEngine3D.p1Current && window.matchEngine3D.p1Current.model) {
        this.cameraController.target = window.matchEngine3D.p1Current.model.group;
      }
      if (window.matchEngine3D.p2Current && window.matchEngine3D.p2Current.model) {
        this.cameraController.opponent = window.matchEngine3D.p2Current.model.group;
      }
      this.cameraController.update(dt);
    }

    if (this.sceneManager) {
      this.sceneManager.render();
    }

    this.updateHUD();

    if (this.isRunning) {
      requestAnimationFrame((t) => this.gameLoop(t));
    }
  }

  updateHUD() {
    const p1 = window.matchEngine3D ? window.matchEngine3D.p1Current : null;
    const p2 = window.matchEngine3D ? window.matchEngine3D.p2Current : null;

    if (p1) {
      const p1HpFill = document.getElementById("p1HpFill");
      const p1RageFill = document.getElementById("p1RageFill");
      const p1Name = document.getElementById("p1NameDisplay");
      const p1Lvl = document.getElementById("p1LvlDisplay");

      if (p1HpFill) p1HpFill.style.width = `${Math.max(0, (p1.hp / p1.maxHp) * 100)}%`;
      if (p1RageFill) p1RageFill.style.width = `${p1.rage}%`;
      if (p1Name) p1Name.textContent = p1.charData.name + (p1.isFlying ? ' [✈️飛行中]' : '');
      if (p1Lvl) p1Lvl.textContent = `Lv.${p1.level}`;
    }

    if (p2) {
      const p2HpFill = document.getElementById("p2HpFill");
      const p2RageFill = document.getElementById("p2RageFill");
      const p2Name = document.getElementById("p2NameDisplay");
      const p2Lvl = document.getElementById("p2LvlDisplay");

      if (p2HpFill) p2HpFill.style.width = `${Math.max(0, (p2.hp / p2.maxHp) * 100)}%`;
      if (p2RageFill) p2RageFill.style.width = `${p2.rage}%`;
      if (p2Name) p2Name.textContent = p2.charData.name;
      if (p2Lvl) p2Lvl.textContent = `Lv.${p2.level}`;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.app = new App3D();
  window.app.init();
});
