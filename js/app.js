/**
 * 跨次元大亂鬥 3D (Dimension Clash Online 3D) - 主應用協調器
 * (Separated Quests & Shop Views, Dedicated Non-conflicting Controls, Cooldown Timers & 3D Solid Collision)
 */

class App3D {
  constructor() {
    this.sceneManager = null;
    this.cameraController = null;
    this.activeTab = "roster";

    this.teamSize = 3;
    this.aiDifficulty = "medium"; // "easy", "medium", "hard"
    this.shopFilterSeries = "all";
    this.p1Team = window.saveSystem.user.selectedTeam || ["goku_kid", "cap_america", "gm_rgm79"];
    this.p2Team = ["spiderman_classic", "krillin", "rx78_2"];
    this.pickingSlotIndex = 0;
    this.pickingForTeam = 1;
    this.shopFilterSeries = "all";
    this.rosterFilterSeries = "all";

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

    // 初始化 P2P 聯機庫
    if (window.p2pNetwork) {
      window.p2pNetwork.init();
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

    // ── 每 5 分鐘自動同步與存檔 ──
    setInterval(() => {
      this.autoSync("5 分鐘定時自動同步");
    }, 5 * 60 * 1000);

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  // ─── 每次更換出場角色時，動態更新觸控動作按鈕標籤 ───
  updateActionButtonsForFighter(charData) {
    if (!charData) return;
    const cfg = charData.attackConfig;
    const flightBtn = document.getElementById("touchBtnFlight");
    if (flightBtn) {
      flightBtn.style.display = charData.canFly ? "inline-flex" : "none";
      const lbl = flightBtn.querySelector(".label");
      if (lbl) lbl.textContent = "飛行[F]";
    }

    const setBtnLabel = (id, label) => {
      const btn = document.getElementById(id);
      if (btn) {
        const lbl = btn.querySelector(".label");
        if (lbl) lbl.textContent = label;
      }
    };

    if (cfg) {
      if (cfg.light) setBtnLabel("touchBtnAtk", `普攻[J]`);
      if (cfg.heavy) setBtnLabel("touchBtnHeavy", `破防[K]`);
      if (cfg.grab) setBtnLabel("touchBtnGrab", `抓技[O]`);
      if (charData.skills && charData.skills.skill1) setBtnLabel("touchBtnSkill1", `技1[U]`);
      if (charData.skills && charData.skills.skill2) setBtnLabel("touchBtnSkill2", `技2[I]`);
      if (charData.skills && charData.skills.ult) setBtnLabel("touchBtnUlt", `奧義[L]`);
    }
  }

  // ─── 調整隊伍長度以符合 1v1 ~ 5v5 賽制 ───
  adjustTeamSize() {
    const defaultAvailable = window.saveSystem.user.unlockedCharacters || ["goku_kid", "cap_america", "gm_rgm79"];
    while (this.p1Team.length < this.teamSize) {
      const nextChar = defaultAvailable.find(id => !this.p1Team.includes(id)) || defaultAvailable[0] || "goku_kid";
      this.p1Team.push(nextChar);
    }
    if (this.p1Team.length > this.teamSize) {
      this.p1Team = this.p1Team.slice(0, this.teamSize);
    }

    const enemyPool = window.CHARACTERS_DATA.map(c => c.id);
    while (this.p2Team.length < this.teamSize) {
      const nextEnemy = enemyPool.find(id => !this.p2Team.includes(id)) || enemyPool[0];
      this.p2Team.push(nextEnemy);
    }
    if (this.p2Team.length > this.teamSize) {
      this.p2Team = this.p2Team.slice(0, this.teamSize);
    }
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

  // ─── 🔄 手動立即更新 ───
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

  // ─── 🔄 事件完成與定時自動同步 ───
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

  // ─── 🎁 每日獎勵補給彈窗 ───
  openDailyRewardModal() {
    const modal = document.getElementById("dailyRewardModal");
    const container = document.getElementById("dailyRewardContent");
    if (!modal || !container) return;

    const u = window.saveSystem.user;
    const rewards = [
      { day: 1, gold: 500, desc: "初入戰場禮包" },
      { day: 2, gold: 800, desc: "雙倍晶石補給" },
      { day: 3, gold: 1200, desc: "高級能源電池" },
      { day: 4, gold: 1600, desc: "戰術核芯配件" },
      { day: 5, gold: 2000, desc: "特級招募補貼" },
      { day: 6, gold: 3000, desc: "黃金戰士寶箱" },
      { day: 7, gold: 5000, desc: "★ 史詩英雄神威禮包" }
    ];

    const currentStreak = u.loginStreak || 1;
    const canClaim = window.saveSystem.canClaimDaily();

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 20px;">
        ${rewards.map(r => {
          const isToday = r.day === ((currentStreak - 1) % 7 + 1);
          const isPast = r.day < ((currentStreak - 1) % 7 + 1);
          return `
            <div style="background: rgba(30, 41, 59, 0.8); border: 2px solid ${isToday ? '#facc15' : (isPast ? '#10b981' : 'rgba(255,255,255,0.1)')}; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 11px; font-weight: 800; color: ${isToday ? '#facc15' : '#94a3b8'};">第 ${r.day} 天</div>
              <div style="font-size: 24px; margin: 4px 0;">${r.day === 7 ? '👑' : '🎁'}</div>
              <div style="font-size: 13px; font-weight: 800; color: #f8fafc;">+${r.gold.toLocaleString()}</div>
              <div style="font-size: 10px; color: #94a3b8; margin-top: 2px;">${r.desc}</div>
              <div style="font-size: 10px; font-weight: 800; margin-top: 6px; color: ${isPast ? '#10b981' : (isToday ? (canClaim ? '#facc15' : '#64748b') : '#64748b')};">
                ${isPast ? '✅ 已領取' : (isToday ? (canClaim ? '可領取' : '今日已領') : '鎖定中')}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div style="text-align: center;">
        <button class="btn-primary" style="padding: 12px 36px; font-size: 16px; font-weight: 900; justify-content: center; ${canClaim ? 'background: linear-gradient(135deg, #10b981, #059669);' : 'opacity: 0.6;'}" onclick="window.app.claimDailyReward()" ${canClaim ? '' : 'disabled'}>
          <i class="fa-solid fa-gift"></i> ${canClaim ? '立即領取今日獎勵' : '今日已完成簽到，明天再來！'}
        </button>
      </div>
    `;

    modal.classList.add("active");
  }

  claimDailyReward() {
    const res = window.saveSystem.claimDailyReward();
    if (res.success) {
      if (window.soundEngine) window.soundEngine.playVictory();
      this.updateUserStatusBar();
      this.openDailyRewardModal();
      this.autoSync("領取每日簽到獎勵");
      alert(`🎉 成功領取每日簽到獎勵 +${res.gold.toLocaleString()} 金幣！連續登入 ${res.streak} 天！`);
    } else {
      alert(res.reason || "今日已經領取過每日獎勵囉！");
    }
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
      if (this.sceneManager) {
        this.sceneManager.onWindowResize();
      }
      setTimeout(() => {
        if (this.sceneManager) {
          this.sceneManager.onWindowResize();
        }
      }, 50);
      setTimeout(() => {
        if (this.sceneManager) {
          this.sceneManager.onWindowResize();
        }
      }, 200);
    }

    if (tabId === "roster") this.renderRosterView();
    if (tabId === "quests") this.renderQuestsView();
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

    // 1v1 ~ 5v5 賽制切換
    document.querySelectorAll(".team-size-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".team-size-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.teamSize = parseInt(btn.dataset.size);
        this.adjustTeamSize();
        this.renderTeamSelectors();
        this.renderRosterView();
        this.autoSync(`變更為 ${this.teamSize}v${this.teamSize} 賽制`);
      });
    });

    // 🤖 AI 難度分級選擇切換 (簡單 / 中等 / 困難)
    document.querySelectorAll(".diff-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.aiDifficulty = btn.dataset.diff;
        const hint = document.getElementById("difficultyRewardHint");
        if (hint) {
          if (this.aiDifficulty === "easy") {
            hint.innerHTML = `<b style="color:#22c55e;">[簡單]</b>：AI 攻擊頻率較低、反應較慢 ｜ 勝場 +400 金幣 / +15 獎盃`;
          } else if (this.aiDifficulty === "hard") {
            hint.innerHTML = `<b style="color:#ef4444;">[困難]</b>：AI 幀級極速反擊、空中制空、主動破防 ｜ 勝場 +1,800 金幣 / +75 獎盃 / 掉落感應結晶！`;
          } else {
            hint.innerHTML = `<b style="color:#eab308;">[中等]</b>：AI 標準反應與戰術連招 ｜ 勝場 +800 金幣 / +35 獎盃`;
          }
        }
        if (window.fighterAI3D) {
          window.fighterAI3D.setDifficulty(this.aiDifficulty);
        }
        this.autoSync(`調整 AI 難度為 ${this.aiDifficulty}`);
      });
    });

    // 商店系列篩選按鈕
    document.querySelectorAll(".shop-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".shop-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.shopFilterSeries = btn.dataset.series;
        this.renderShopView();
      });
    });

    // 角色名冊系列篩選按鈕
    document.querySelectorAll(".roster-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".roster-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.rosterFilterSeries = btn.dataset.series;
        this.renderRosterView();
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

  // ─── 專屬獨立動作按鍵設定 (各動作獨立按鍵，絕不重疊衝突) ───
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

      // 1. 飛行起飛 / 降落 [F]
      if (e.key.toLowerCase() === "f") {
        p1.toggleFlight();
      }

      // 2. 視角切換 [V]
      if (e.key.toLowerCase() === "v") {
        if (this.cameraController) {
          this.cameraController.cycleViewMode();
          const cameraBtn = document.getElementById("cameraViewBtn");
          if (cameraBtn) {
            cameraBtn.innerHTML = `<i class="fa-solid fa-video"></i> ${this.cameraController.getViewModeLabel()}`;
          }
        }
      }

      // 3. 跳躍 [Space]
      if (e.code === "Space") {
        p1.jump();
      }

      // 4. 閃避翻滾 [Shift] (CD 1.2s)
      if (e.key === "Shift" || e.code === "ShiftLeft" || e.code === "ShiftRight") {
        p1.dodge();
      }

      // 5. 獨立格擋防禦 [G] (不使用 S 鍵，避免與後退移動衝突)
      if (e.key.toLowerCase() === "g") {
        p1.guard(true);
      }

      // 6. 輕擊普攻 [J] (無 CD)
      if (e.key.toLowerCase() === "j") {
        p1.lightAttack(p2);
      }

      // 7. 蓄力破防重擊 [K] (CD 2.5s)
      if (e.key.toLowerCase() === "k") {
        p1.startHeavyCharge();
        setTimeout(() => {
          if (p1 && p1.isCharging) p1.releaseHeavyCharge(p2);
        }, 700);
      }

      // 8. 摔投抓技 [O] (CD 3.5s)
      if (e.key.toLowerCase() === "o") {
        p1.grab(p2);
      }

      // 9. 戰術小招 1 [U] (CD 6~10s)
      if (e.key.toLowerCase() === "u") {
        p1.useSkill1(p2);
      }

      // 10. 戰術小招 2 [I] (CD 8~14s)
      if (e.key.toLowerCase() === "i") {
        p1.useSkill2(p2);
      }

      // 11. 終極奧義大招 [L] (CD 20s + 100% 怒氣)
      if (e.key.toLowerCase() === "l") {
        p1.useUlt(p2);
      }

      // 12. 援護出擊 [Q] 或 [E] (CD 20s)
      if (e.key.toLowerCase() === "q" || e.key.toLowerCase() === "e") {
        window.matchEngine3D.callAssist();
      }

      // 13. 極限爆氣脫身 [B] (CD 12s + 50% 怒氣)
      if (e.key.toLowerCase() === "b") {
        p1.useBurst(p2);
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
      this.keys[e.code] = false;

      const p1 = window.matchEngine3D.p1Current;
      if (p1 && e.key.toLowerCase() === "g") {
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
        equippedGear: []
      });
    });

    const p2RosterData = (customP2Roster || this.p2Team).map(id => {
      const base = window.CHARACTERS_DATA.find(c => c.id === id) || window.CHARACTERS_DATA[0];
      return Object.assign({}, base, {
        userLevel: isRanked ? 100 : (base.rarity * 10),
        equippedGear: []
      });
    });

    const appliedDifficulty = mode === "kof" ? this.aiDifficulty : "medium";
    window.matchEngine3D.startMatch(p1RosterData, p2RosterData, mode, isRanked, bossFloor, appliedDifficulty);

    if (this.cameraController && window.matchEngine3D.p1Current) {
      this.cameraController.target = window.matchEngine3D.p1Current.model.group;
      this.cameraController.opponent = window.matchEngine3D.p2Current.model.group;
    }

    window.matchEngine3D.onMatchEnd = (result) => {
      this.handleMatchResult(result);
    };

    this.switchTab("battle");
    if (this.sceneManager) {
      this.sceneManager.onWindowResize();
    }
    setTimeout(() => {
      if (this.sceneManager) {
        this.sceneManager.onWindowResize();
      }
    }, 50);
  }

  // ─── 🏆 戰鬥勝負結算彈窗 ───
  handleMatchResult(result) {
    const isWin = result.winner === "player";
    const isBossRush = result.mode === "boss_rush";

    window.saveSystem.addGold(result.gold);
    if (result.crystalReward > 0) {
      window.saveSystem.addPsychoCrystals(result.crystalReward);
    }

    window.saveSystem.recordMatchResult(
      isWin,
      3500,
      result.mode === "ranked" || result.mode === "p2p",
      isBossRush,
      result.bossFloor,
      result.isSweep1v5
    );
    this.updateUserStatusBar();
    this.autoSync("戰鬥結算");

    this.showMatchSettlementModal(result);
  }

  showMatchSettlementModal(result) {
    const modal = document.getElementById("matchSettlementModal");
    const container = document.getElementById("settlementCardContent");
    if (!modal || !container) return;

    const isWin = result.winner === "player";
    container.className = `modal-content settlement-card ${isWin ? 'victory-theme' : 'defeat-theme'}`;

    const sweepNotice = result.isSweep1v5 ? `<div style="color: #facc15; font-weight: 900; font-size: 14px; margin-top: 6px;">👑【神級成就達成】首發先鋒 1 穿 5 完封大滿貫！</div>` : (result.isSweep ? `<div style="color: #38bdf8; font-weight: 800; font-size: 13px; margin-top: 6px;">🔥【一挑多連勝】獲得雙倍金幣獎勵！</div>` : '');

    const diffLabel = result.difficulty === "easy" ? "🟢 簡單 (Easy)" : (result.difficulty === "hard" ? "🔴 困難 (Hard)" : "🟡 中等 (Normal)");

    container.innerHTML = `
      <div style="font-size: 52px; margin-bottom: 8px;">
        ${isWin ? '🏆' : '💀'}
      </div>
      <h2 style="font-size: 30px; font-weight: 900; color: ${isWin ? '#10b981' : '#ef4444'}; margin-bottom: 4px; text-shadow: 0 0 20px ${isWin ? 'rgba(16,185,129,0.6)' : 'rgba(239,68,68,0.6)'};">
        ${isWin ? '你贏了！(VICTORY)' : '你輸了 (DEFEATED)'}
      </h2>
      <p style="font-size: 14px; color: #cbd5e1; margin-bottom: 12px;">
        ${isWin ? '恭喜獲得本次跨次元 3D 對決勝利！' : '全體出賽英雄已力竭倒下，請再接再厲！'}
      </p>
      ${sweepNotice}

      <div class="settlement-stat-box">
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #94a3b8;">🎮 對戰賽制與難度：</span>
          <b style="color: #38bdf8;">${result.mode === 'boss_rush' ? `魔王塔第 ${result.bossFloor} 層` : (result.mode === 'ranked' ? '天梯標準公平排位' : diffLabel)}</b>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #94a3b8;">💰 結算金幣獎勵：</span>
          <b style="color: #facc15; font-size: 15px;">+${result.gold.toLocaleString()} 金幣</b>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #94a3b8;">🏆 天梯積分結算：</span>
          <b style="color: ${result.trophiesDelta > 0 ? '#34d399' : '#f87171'}; font-size: 15px;">${result.trophiesDelta > 0 ? `+${result.trophiesDelta}` : result.trophiesDelta} 獎盃</b>
        </div>
        ${result.crystalReward > 0 ? `
          <div style="display: flex; justify-content: space-between; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 6px;">
            <span style="color: #f472b6;">💎 稀有掉落物：</span>
            <b style="color: #f472b6;">+${result.crystalReward} 顆感應骨架結晶！</b>
          </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #94a3b8;">⚔️ 擊敗敵方角色數：</span>
          <b style="color: #f8fafc;">${result.p1DefeatedCount !== undefined ? result.p1DefeatedCount + (isWin ? 1 : 0) : 1} 位</b>
        </div>
      </div>

      <button class="btn-primary" style="width: 100%; font-size: 18px; font-weight: 900; padding: 14px 28px; justify-content: center; background: linear-gradient(135deg, #10b981, #059669); margin-top: 16px; box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);" onclick="window.app.restartToRoster()">
        <i class="fa-solid fa-rotate-left"></i> 🔄 重新開始 (回到我的角色)
      </button>
    `;

    modal.classList.add("active");
  }

  // ─── 🔄 重新開始回到初始角色頁面 ───
  restartToRoster() {
    this.closeModal();
    if (window.matchEngine3D) {
      window.matchEngine3D.matchState = "standby";
      if (window.matchEngine3D.p1Current) window.matchEngine3D.p1Current.destroy();
      if (window.matchEngine3D.p2Current) window.matchEngine3D.p2Current.destroy();
    }
    this.switchTab("roster");
    this.renderAllViews();
    this.updateUserStatusBar();
    this.autoSync("戰鬥結束重置回到首頁");
  }

  // ─── 🌐 跨裝置 P2P 房間 ───
  createP2PRoom() {
    const banner = document.getElementById("p2pStatusBanner");
    if (banner) banner.textContent = "⏳ 正在初始化 WebRTC P2P 房間...";

    window.p2pNetwork.createRoom((code) => {
      if (banner) {
        banner.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; padding: 10px; border-radius: 8px; margin-top: 8px;">
            🏠 <b>房間建立成功！</b><br>
            房間碼：<b style="font-size: 18px; color: #facc15; letter-spacing: 2px;">${code}</b><br>
            <span style="font-size: 11px; color: #cbd5e1;">請在另一台電腦或手機輸入此 6 位數房間碼並點擊「加入房間」！</span>
          </div>
        `;
      }

      window.p2pNetwork.onConnected = () => {
        if (banner) banner.innerHTML = `<span style="color: #34d399;">✅ 雙方裝置已連線！正在啟動 3D 即時對決...</span>`;
        window.p2pNetwork.send({ type: "ROSTER_INFO", team: this.p1Team });
      };

      window.p2pNetwork.onMessageReceived = (data) => {
        if (data.type === "ROSTER_INFO") {
          this.startSelectedBattle("p2p", data.team, true);
        }
      };
    });
  }

  joinP2PRoom() {
    const input = document.getElementById("p2pRoomInput");
    const code = input ? input.value.trim() : "";
    const banner = document.getElementById("p2pStatusBanner");

    if (!code) {
      alert("請先輸入 6 位數房間碼！");
      return;
    }

    if (banner) banner.textContent = `⏳ 正在連接至房間【${code}】...`;

    window.p2pNetwork.joinRoom(code, (ok) => {
      if (ok) {
        if (banner) banner.innerHTML = `<span style="color: #34d399;">✅ 成功加入房間！正在加載雙方 3D 機台...</span>`;
        window.p2pNetwork.onConnected = () => {
          window.p2pNetwork.send({ type: "ROSTER_INFO", team: this.p1Team });
        };
        window.p2pNetwork.onMessageReceived = (data) => {
          if (data.type === "ROSTER_INFO") {
            this.startSelectedBattle("p2p", data.team, true);
          }
        };
      } else {
        if (banner) banner.innerHTML = `<span style="color: #ef4444;">❌ 連接房間失敗，請確認房間碼是否正確！</span>`;
      }
    });
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

    let rosterList = window.CHARACTERS_DATA;
    if (this.rosterFilterSeries && this.rosterFilterSeries !== "all") {
      rosterList = rosterList.filter(c => c.series === this.rosterFilterSeries);
    }

    grid.innerHTML = rosterList.map(c => {
      const isUnlocked = window.saveSystem.user.unlockedCharacters.includes(c.id);
      const lvl = window.saveSystem.user.characterLevels[c.id] || 1;
      const rarity = window.RARITY_TIERS[c.rarity];

      const slotButtons = [];
      if (isUnlocked) {
        for (let s = 0; s < this.teamSize; s++) {
          const slotNum = s + 1;
          const isThisCharInThisSlot = (this.p1Team[s] === c.id);
          const isSlotTakenBySomeoneElse = (this.p1Team[s] && this.p1Team[s] !== c.id);

          if (isThisCharInThisSlot) {
            slotButtons.push(`
              <button class="slot-num-btn active-slot" onclick="window.app.setHeroToTeamSlot('${c.id}', ${s})" title="已指派為第 ${slotNum} 號位出場">
                ✅ ${slotNum}
              </button>
            `);
          } else if (isSlotTakenBySomeoneElse) {
            slotButtons.push(`
              <button class="slot-num-btn taken-slot" onclick="window.app.setHeroToTeamSlot('${c.id}', ${s})" title="第 ${slotNum} 號位已選，點擊可替換">
                ${slotNum}
              </button>
            `);
          } else {
            slotButtons.push(`
              <button class="slot-num-btn available-slot" onclick="window.app.setHeroToTeamSlot('${c.id}', ${s})" title="指派為第 ${slotNum} 號位出場">
                +${slotNum}
              </button>
            `);
          }
        }
      }

      const getIcon = (s) => s === 'gundam' ? '🤖' : (s === 'dragonball' ? '⚡' : (s === 'marvel' ? '🦸' : (s === 'anime' ? '⚔️' : '🎮')));

      return `
        <div class="character-card ${isUnlocked ? '' : 'locked'}" style="border-top: 3px solid ${rarity.color}">
          <div class="rarity-ribbon" style="background: ${rarity.bg}; color: ${rarity.border}">${rarity.label}</div>
          <div class="card-avatar-box" style="border-color: ${c.themeColor}">
            ${getIcon(c.series)}
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
    const getIcon = (s) => s === 'gundam' ? '🤖' : (s === 'dragonball' ? '⚡' : (s === 'marvel' ? '🦸' : (s === 'anime' ? '⚔️' : '🎮')));

    container.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 16px;">
        <div style="font-size: 48px;">${getIcon(char.series)}</div>
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
        ${char.canFly ? `<div style="background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; padding: 8px 12px; border-radius: 6px; color:#38bdf8;"><b>[F] 飛行起飛</b>：${cfg.flight.name} (升空懸浮，可空中全向作戰)</div>` : ''}
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px;"><b>[G] 獨立格擋</b>：減免 80% 傷害，消耗格擋條</div>
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px;"><b>[J] 普攻連擊</b>：${cfg.light.name}</div>
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px;"><b>[K] 破防重擊</b>：${cfg.heavy.name} (CD 2.5s)</div>
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px;"><b>[O] 近身抓技</b>：${cfg.grab.name} (CD 3.5s)</div>
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

  // ─── 📜 5. 獨立任務與成就挑戰視圖 (Quests View) ───
  renderQuestsView() {
    const genesisList = document.getElementById("genesisChallengesList");
    const achList = document.getElementById("achievementsMilestoneList");
    if (!genesisList || !achList) return;

    // 1. 六大創世神級挑戰
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

    // 2. 里程碑成就列表
    const achievements = window.ACHIEVEMENTS_DATA ? window.ACHIEVEMENTS_DATA.filter(a => !a.id.startsWith("ach_genesis")) : [];
    achList.innerHTML = achievements.map(ach => {
      const prog = window.saveSystem.getAchievementProgress(ach);
      return `
        <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid ${prog.claimed ? 'rgba(255,255,255,0.1)' : (prog.achieved ? '#38bdf8' : 'rgba(255,255,255,0.15)')}; border-radius: 10px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-weight: 800; font-size: 14px; color: #f8fafc;">${ach.title}</span>
              <span style="font-size: 11px; font-weight: 800; color: #facc15;">+${ach.rewardGold.toLocaleString()} 金幣</span>
            </div>
            <div style="font-size: 12px; color: #94a3b8; margin-bottom: 8px;">${ach.desc}</div>
            <div style="background: rgba(0,0,0,0.4); height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 8px;">
              <div style="background: ${prog.claimed ? '#64748b' : '#38bdf8'}; height: 100%; width: ${prog.percent}%;"></div>
            </div>
          </div>

          <div>
            ${prog.claimed ? `
              <div style="font-size: 11px; color: #64748b; font-weight: 700; text-align: right;">✅ 已領取獎勵</div>
            ` : (prog.achieved ? `
              <button class="btn-primary" style="width: 100%; font-size: 12px; padding: 6px 12px; justify-content: center; background: linear-gradient(135deg, #10b981, #059669);" onclick="window.app.claimQuestAchievement('${ach.id}')">
                🎁 領取 +${ach.rewardGold} 金幣
              </button>
            ` : `
              <div style="font-size: 11px; color: #94a3b8; text-align: right;">進度: ${prog.current.toLocaleString()} / ${prog.target.toLocaleString()} (${prog.percent}%)</div>
            `)}
          </div>
        </div>
      `;
    }).join("");
  }

  claimQuestAchievement(achId) {
    const res = window.saveSystem.claimAchievement(achId);
    if (res.success) {
      if (window.soundEngine) window.soundEngine.playLevelUp();
      this.updateUserStatusBar();
      this.renderQuestsView();
      this.autoSync("領取成就獎勵");
      alert(`🎉 恭喜成功領取成就獎勵 +${res.rewardGold.toLocaleString()} 金幣！`);
    } else {
      alert(res.reason);
    }
  }

  // ─── 🛒 6. 純淨英雄招募商店 (Shop View) ───
  renderShopView() {
    const grid = document.getElementById("shopHeroGrid");
    if (!grid) return;

    let purchasable = window.CHARACTERS_DATA.filter(c => !c.isFree && !c.isNonPurchasable);
    if (this.shopFilterSeries !== "all") {
      purchasable = purchasable.filter(c => c.series === this.shopFilterSeries);
    }

    const getIcon = (s) => s === 'gundam' ? '🤖' : (s === 'dragonball' ? '⚡' : (s === 'marvel' ? '🦸' : (s === 'anime' ? '⚔️' : '🎮')));

    grid.innerHTML = purchasable.map(c => {
      const isOwned = window.saveSystem.user.unlockedCharacters.includes(c.id);
      const rarity = window.RARITY_TIERS[c.rarity];
      return `
        <div class="character-card" style="border-top: 3px solid ${rarity.color}">
          <div class="rarity-ribbon" style="background: ${rarity.bg}; color: ${rarity.border}">${rarity.label}</div>
          <div class="card-avatar-box" style="border-color: ${c.themeColor}">
            ${getIcon(c.series)}
          </div>
          <div class="card-char-name">${c.name}</div>
          <div class="card-char-title">${c.seriesName} · ${c.role} ${c.canFly ? '✈️' : ''}</div>
          <div style="margin-top: 12px;">
            ${isOwned ? `<div style="color: #4ade80; font-weight: 800; font-size: 12px; text-align: center; padding: 6px;">✅ 英雄已招募</div>` : `
              <button class="btn-primary" style="width: 100%; font-size: 12px; padding: 8px 10px; justify-content: center;" onclick="window.app.buyHero('${c.id}', ${c.cost})">
                💰 招募 (${c.cost.toLocaleString()} 金幣)
              </button>
            `}
          </div>
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
      this.renderQuestsView();
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
          <div style="font-weight: 800; font-size: 15px; color: #38bdf8;">${f.name} (Lv.${f.level}) 🔒 固定挑戰難度</div>
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
    this.renderQuestsView();
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

  // ─── 即時更新戰鬥 HUD 與各招式 CD 冷卻狀態 ───
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

      // 更新觸控按鈕上的 CD 冷卻秒數顯示
      const updateBtnCD = (btnId, cd, label) => {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        const labelElem = btn.querySelector(".label");
        if (cd > 0) {
          btn.style.opacity = "0.5";
          if (labelElem) labelElem.textContent = `${label} (${cd.toFixed(1)}s)`;
        } else {
          btn.style.opacity = "1";
          if (labelElem) labelElem.textContent = label;
        }
      };

      updateBtnCD("touchBtnSkill1", p1.skill1Cd, "技1[U]");
      updateBtnCD("touchBtnSkill2", p1.skill2Cd, "技2[I]");
      updateBtnCD("touchBtnUlt", p1.ultCd, p1.rage >= 100 ? "奧義[L]" : `奧義(${Math.round(p1.rage)}%)`);
      updateBtnCD("touchBtnHeavy", p1.heavyCd, "破防[K]");
      updateBtnCD("touchBtnGrab", p1.grabCd, "抓技[O]");
      updateBtnCD("touchBtnRoll", p1.dodgeCd, "閃避[Shift]");
      updateBtnCD("touchBtnBurst", p1.burstCd, p1.rage >= 50 ? "爆發[B]" : "爆發");
      updateBtnCD("touchBtnAssist", window.matchEngine3D.assistCooldown, "援護[Q]");
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
