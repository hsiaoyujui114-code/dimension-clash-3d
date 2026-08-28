/**
 * 跨次元大亂鬥 (Dimension Clash Online) - 3D 主應用協調器
 * (Main Application Coordinator & 3D WebGL Controller)
 */

class App3D {
  constructor() {
    this.sceneManager = null;
    this.cameraController = null;
    this.activeTab = "battle";

    // Team selection (1 to 5 KOF format)
    this.teamSize = 3;
    this.p1Team = ["goku_kid", "cap_america", "gm_rgm79"];
    this.p2Team = ["spiderman_classic", "krillin", "rx78_2"];
    this.pickingSlotIndex = 0;
    this.pickingForTeam = 1;

    // Continuous 3D movement input keys
    this.keys = {};
    this.jKeyHeld = false;
    this.jKeyHoldTime = 0;

    // Mobile Virtual Joystick state (360 degrees)
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

    // Start 3D default battle
    this.startSelectedBattle("kof");

    // Start 60 FPS 3D Game Loop
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  updateUserStatusBar() {
    const goldElem = document.getElementById("userGoldDisplay");
    const trophyElem = document.getElementById("userTrophyDisplay");
    const nameElem = document.getElementById("userNicknameDisplay");

    if (goldElem) goldElem.textContent = window.saveSystem.user.gold.toLocaleString();
    if (trophyElem) trophyElem.textContent = window.saveSystem.user.trophies.toLocaleString();
    if (nameElem) nameElem.textContent = window.saveSystem.user.nickname;
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.toggle("active", sec.id === `view_${tabId}`);
    });

    if (tabId === "roster") this.renderRosterView();
    if (tabId === "workshop") this.renderWorkshopView();
    if (tabId === "shop") this.renderShopView();
    if (tabId === "boss_rush") this.renderBossRushView();
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => this.switchTab(btn.dataset.tab));
    });

    // Start battle button
    const startBattleBtn = document.getElementById("startBattleBtn");
    if (startBattleBtn) {
      startBattleBtn.addEventListener("click", () => this.startSelectedBattle("kof"));
    }

    // Camera Switcher Button (3rd Person / 1st Person / Top-Down)
    const cameraBtn = document.getElementById("cameraViewBtn");
    if (cameraBtn) {
      cameraBtn.addEventListener("click", () => {
        if (this.cameraController) {
          const newMode = this.cameraController.cycleViewMode();
          cameraBtn.innerHTML = `<i class="fa-solid fa-video"></i> ${this.cameraController.getViewModeLabel()}`;
        }
      });
    }

    // Team Size Selectors
    document.querySelectorAll(".team-size-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".team-size-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.teamSize = parseInt(btn.dataset.size);
        this.adjustTeamSize();
        this.renderTeamSelectors();
      });
    });

    // Mute toggle
    const muteBtn = document.getElementById("muteToggleBtn");
    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        const muted = window.soundEngine.toggleMute();
        muteBtn.innerHTML = muted ? `<i class="fa-solid fa-volume-xmark"></i> 靜音` : `<i class="fa-solid fa-volume-high"></i> 音效`;
      });
    }

    // Google Login simulation
    const googleLoginBtn = document.getElementById("googleLoginBtn");
    if (googleLoginBtn) {
      googleLoginBtn.addEventListener("click", () => {
        const newNick = prompt("輸入您的 Google 玩家暱稱：", window.saveSystem.user.nickname);
        if (newNick) {
          window.saveSystem.loginWithGoogle(newNick);
          this.updateUserStatusBar();
          alert(`🎉 歡迎！Google 帳號 [${newNick}] 存檔已同步！`);
        }
      });
    }

    // Modal close buttons
    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", () => this.closeModal());
    });
  }

  adjustTeamSize() {
    while (this.p1Team.length < this.teamSize) this.p1Team.push("goku_kid");
    while (this.p1Team.length > this.teamSize) this.p1Team.pop();

    const enemies = ["rx78_2", "spiderman_classic", "krillin", "char_zaku2", "hulk", "vegeta", "thor"];
    while (this.p2Team.length < this.teamSize) {
      this.p2Team.push(enemies[Math.floor(Math.random() * enemies.length)]);
    }
    while (this.p2Team.length > this.teamSize) this.p2Team.pop();
  }

  // ─── 3D 鍵盤四面八方移動與技能控制 ───
  setupKeyboard() {
    window.addEventListener("keydown", (e) => {
      if (e.repeat) return;
      this.keys[e.key.toLowerCase()] = true;
      this.keys[e.code] = true;

      const p1 = window.matchEngine3D.p1Current;
      if (!p1 || window.matchEngine3D.matchState !== "fighting") return;
      const p2 = window.matchEngine3D.p2Current;

      // Camera Switcher Key [V]
      if (e.key.toLowerCase() === "v") {
        if (this.cameraController) {
          this.cameraController.cycleViewMode();
          const cameraBtn = document.getElementById("cameraViewBtn");
          if (cameraBtn) {
            cameraBtn.innerHTML = `<i class="fa-solid fa-video"></i> ${this.cameraController.getViewModeLabel()}`;
          }
        }
      }

      // Space / Spacebar: 3D Jump & Double Jump
      if (e.code === "Space") {
        p1.jump();
      }

      // Shift: 3D Dodge / Roll
      if (e.key === "Shift" || e.code === "ShiftLeft") {
        p1.dodge();
      }

      // J: Attack / Charge Heavy Break
      if (e.key.toLowerCase() === "j") {
        this.jKeyHeld = true;
        this.jKeyHoldTime = performance.now();
        p1.startHeavyCharge();
      }

      // S + J: Grab / Throw
      if (this.keys["s"] && e.key.toLowerCase() === "j") {
        p1.grab(p2);
        return;
      }

      // U: Skill 1
      if (e.key.toLowerCase() === "u") {
        p1.useSkill1(p2);
      }

      // I: Skill 2
      if (e.key.toLowerCase() === "i") {
        p1.useSkill2(p2);
      }

      // K: Ultimate (100% Rage)
      if (e.key.toLowerCase() === "k") {
        p1.useUlt(p2);
      }

      // Q or E: Bench Assist
      if (e.key.toLowerCase() === "q" || e.key.toLowerCase() === "e") {
        window.matchEngine3D.callAssist();
      }

      // B: Burst Combo Breaker
      if (e.key.toLowerCase() === "b") {
        p1.useBurst(p2);
      }
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
      this.keys[e.code] = false;

      const p1 = window.matchEngine3D.p1Current;
      if (!p1) return;
      const p2 = window.matchEngine3D.p2Current;

      if (e.key.toLowerCase() === "j") {
        this.jKeyHeld = false;
        const holdTime = (performance.now() - this.jKeyHoldTime) / 1000;
        if (p1.isCharging) {
          if (holdTime < 0.3) {
            p1.isCharging = false;
            p1.lightAttack(p2);
          } else {
            p1.releaseHeavyCharge(p2);
          }
        }
      }
    });
  }

  // ─── 手機端 360° 虛擬搖桿與觸控按鍵 ───
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

    bindTouch("touchBtnJump", () => { if (p1()) p1().jump(); });
    bindTouch("touchBtnRoll", () => { if (p1()) p1().dodge(); });
    bindTouch("touchBtnGuard", () => { if (p1()) p1().guard(true); }, () => { if (p1()) p1().guard(false); });
    bindTouch("touchBtnAtk", () => { if (p1()) p1().lightAttack(p2()); });
    bindTouch("touchBtnHeavy", () => { if (p1()) { p1().startHeavyCharge(); setTimeout(() => p1().releaseHeavyCharge(p2()), 800); } });
    bindTouch("touchBtnGrab", () => { if (p1()) p1().grab(p2()); });
    bindTouch("touchBtnSkill1", () => { if (p1()) p1().useSkill1(p2()); });
    bindTouch("touchBtnSkill2", () => { if (p1()) p1().useSkill2(p2()); });
    bindTouch("touchBtnUlt", () => { if (p1()) p1().useUlt(p2()); });
    bindTouch("touchBtnBurst", () => { if (p1()) p1().useBurst(p2()); });
    bindTouch("touchBtnAssist", () => { window.matchEngine3D.callAssist(); });
  }

  startSelectedBattle(mode = "kof", customP2Roster = null, isRanked = false) {
    const p1RosterData = this.p1Team.map(id => {
      const base = window.CHARACTERS_DATA.find(c => c.id === id);
      return Object.assign({}, base, {
        userLevel: window.saveSystem.user.characterLevels[id] || 1,
        equippedGear: (window.saveSystem.user.equippedGear[id] || []).map(gid => window.EQUIPMENT_DATA.find(e => e.id === gid))
      });
    });

    const p2RosterData = (customP2Roster || this.p2Team).map(id => {
      const base = window.CHARACTERS_DATA.find(c => c.id === id);
      return Object.assign({}, base, {
        userLevel: isRanked ? 100 : (base.rarity * 10),
        equippedGear: []
      });
    });

    window.matchEngine3D.startMatch(p1RosterData, p2RosterData, mode, isRanked);

    // Link camera target to player fighter
    if (this.cameraController && window.matchEngine3D.p1Current) {
      this.cameraController.target = window.matchEngine3D.p1Current.model.group;
      this.cameraController.opponent = window.matchEngine3D.p2Current.model.group;
    }

    window.matchEngine3D.onMatchEnd = (result) => {
      this.handleMatchResult(result);
    };

    this.switchTab("battle");
  }

  handleMatchResult(result) {
    const isWin = result.winner === "player";
    window.saveSystem.addGold(result.gold);
    window.saveSystem.recordMatchResult(isWin, 2000, true);
    this.updateUserStatusBar();

    const title = isWin ? "🏆 3D 榮耀大勝利 (VICTORY)!" : "💀 戰鬥落敗 (DEFEATED)";
    const sweepNotice = result.isSweep ? "🔥【一挑多雙倍金幣獎勵】首發單人穿隊達成！" : "";

    alert(`${title}\n\n獲得金幣獎勵：+${result.gold} 金幣！\n${sweepNotice}`);
  }

  renderTeamSelectors() {
    const p1Container = document.getElementById("p1TeamSlots");
    const p2Container = document.getElementById("p2TeamSlots");
    if (!p1Container || !p2Container) return;

    const slotNames = ["先鋒 (Vanguard)", "次鋒 (Second)", "中堅 (Center)", "副將 (Vice-Captain)", "大將 (Captain)"];

    p1Container.innerHTML = this.p1Team.map((charId, idx) => {
      const char = window.CHARACTERS_DATA.find(c => c.id === charId) || window.CHARACTERS_DATA[0];
      const lvl = window.saveSystem.user.characterLevels[charId] || 1;
      return `
        <div class="team-slot-card" onclick="window.app.openHeroPicker(${idx}, 1)">
          <div class="slot-badge">${slotNames[idx]}</div>
          <div class="slot-char-name" style="color: ${char.themeColor}">${char.name}</div>
          <div class="slot-char-lvl">Lv.${lvl}</div>
        </div>
      `;
    }).join("");

    p2Container.innerHTML = this.p2Team.map((charId, idx) => {
      const char = window.CHARACTERS_DATA.find(c => c.id === charId) || window.CHARACTERS_DATA[0];
      return `
        <div class="team-slot-card" onclick="window.app.openHeroPicker(${idx}, 2)">
          <div class="slot-badge">${slotNames[idx]}</div>
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
    } else {
      this.p2Team[this.pickingSlotIndex] = charId;
    }
    this.closeModal();
    this.renderTeamSelectors();
  }

  closeModal() {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
  }

  renderRosterView() {
    const grid = document.getElementById("rosterGrid");
    if (!grid) return;

    grid.innerHTML = window.CHARACTERS_DATA.map(c => {
      const isUnlocked = window.saveSystem.user.unlockedCharacters.includes(c.id);
      const lvl = window.saveSystem.user.characterLevels[c.id] || 1;
      const rarity = window.RARITY_TIERS[c.rarity];

      return `
        <div class="character-card ${isUnlocked ? '' : 'locked'}" onclick="window.app.openCharacterDetail('${c.id}')" style="border-top: 3px solid ${rarity.color}">
          <div class="rarity-ribbon" style="background: ${rarity.bg}; color: ${rarity.border}; border: 1px solid ${rarity.border}">${rarity.label}</div>
          <div class="card-avatar-box" style="border-color: ${c.themeColor}">
            ${c.series === 'gundam' ? '🤖' : (c.series === 'dragonball' ? '⚡' : '🦸')}
          </div>
          <div class="card-char-name">${c.name}</div>
          <div class="card-char-title">${c.title} · ${c.role}</div>
          <div class="card-stats-row">
            <span>${isUnlocked ? `Lv.${lvl} / 100` : '🔒 未解鎖'}</span>
            <span style="color: ${c.themeColor}">ATK ${Math.round(c.baseAtk * (1 + (lvl - 1) * 0.02))}</span>
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
    const upgradeCost = Math.round(100 * Math.pow(lvl, 1.35));
    const rarity = window.RARITY_TIERS[char.rarity];

    container.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 16px;">
        <div style="font-size: 48px;">${char.series === 'gundam' ? '🤖' : (char.series === 'dragonball' ? '⚡' : '🦸')}</div>
        <div>
          <h2 style="font-size: 24px; font-weight: 900; color: ${char.themeColor}">${char.name}</h2>
          <div style="color: #94a3b8; font-size: 13px;">${char.seriesName} · ${char.title} · <span style="color: ${rarity.color}">${rarity.name}</span></div>
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

      <h4 style="font-size: 15px; margin-bottom: 8px; color: #38bdf8;">3D 招式配置</h4>
      <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px; margin-bottom: 16px;">
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px;"><b>小招 1【${char.skills.skill1.name}】</b> (CD ${char.skills.skill1.cd}s)：${char.skills.skill1.desc}</div>
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px;"><b>小招 2【${char.skills.skill2.name}】</b> (CD ${char.skills.skill2.cd}s)：${char.skills.skill2.desc}</div>
        <div style="background: rgba(15, 23, 42, 0.8); padding: 8px 12px; border-radius: 6px; border-left: 3px solid #facc15;"><b>奧義大招【${char.skills.ult.name}】</b> (CD ${char.skills.ult.cd}s + 100% 怒氣)：${char.skills.ult.desc}</div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        ${isUnlocked ? `
          <button class="btn-primary" onclick="window.app.upgradeCurrentHero('${char.id}')">
            🔼 升級角色 (消耗 ${upgradeCost} 金幣)
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
      const c = window.CHARACTERS_DATA.find(x => x.id === id);
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
                💰 招募 (${c.cost} 金幣)
              </button>
            `}
          </div>
        </div>
      `;
    }).join("");

    const genesisHeroes = window.CHARACTERS_DATA.filter(c => c.rarity === 9);
    genesisList.innerHTML = genesisHeroes.map(g => {
      const isUnlocked = window.saveSystem.user.unlockedCharacters.includes(g.id);
      return `
        <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid #fb7185; border-radius: 12px; padding: 14px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 900; color: #fb7185; font-size: 16px;">★ 創世級【${g.name}】</div>
            <div style="font-size: 12px; font-weight: 800; color: ${isUnlocked ? '#4ade80' : '#f59e0b'}">
              ${isUnlocked ? '👑 已登頂解鎖' : '🔒 挑戰中'}
            </div>
          </div>
          <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">解鎖條件：${g.unlockCondition}</div>
          ${!isUnlocked ? `
            <button class="btn-secondary" style="margin-top: 8px; font-size: 11px;" onclick="window.app.tryGenesisUnlock('${g.id}')">
              ⚡ 驗證並解鎖
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
      alert(`🎉 恭喜招募成功！`);
    } else {
      alert(`金幣不足！`);
    }
  }

  tryGenesisUnlock(charId) {
    window.saveSystem.unlockCharacter(charId);
    if (window.soundEngine) window.soundEngine.playVictory();
    this.renderShopView();
    alert(`👑 恭喜達成極限神級成就！創世級【${charId}】已成功降臨！`);
  }

  renderBossRushView() {
    const list = document.getElementById("bossRushFloorList");
    if (!list) return;

    list.innerHTML = window.BOSS_RUSH_FLOORS.map(f => `
      <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 800; font-size: 15px; color: #38bdf8;">${f.name} (Lv.${f.level})</div>
          <div style="font-size: 12px; color: #cbd5e1; margin-top: 2px;">${f.affix}</div>
          <div style="font-size: 11px; color: #facc15; margin-top: 2px;">💰 通關獎勵：${f.rewardGold} 金幣</div>
        </div>
        <button class="btn-primary" style="font-size: 12px; padding: 8px 16px;" onclick="window.app.startBossRushFloor(${f.floor})">
          ⚔️ 挑戰本層 3D 魔王
        </button>
      </div>
    `).join("");
  }

  startBossRushFloor(floorNum) {
    const floorData = window.BOSS_RUSH_FLOORS.find(f => f.floor === floorNum);
    if (!floorData) return;
    this.startSelectedBattle("boss_rush", floorData.bosses, false);
  }

  renderAllViews() {
    this.renderTeamSelectors();
    this.renderRosterView();
    this.renderWorkshopView();
    this.renderShopView();
    this.renderBossRushView();
  }

  // ─── 3D 60 FPS 主戰鬥迴圈 (Main 3D Game Loop) ───
  gameLoop(currentTime) {
    const dt = Math.min(0.1, (currentTime - this.lastFrameTime) / 1000);
    this.lastFrameTime = currentTime;

    // 1. Process 3D Omnidirectional Movement (四面八方走位)
    if (window.matchEngine3D && window.matchEngine3D.p1Current && window.matchEngine3D.matchState === "fighting") {
      const p1 = window.matchEngine3D.p1Current;
      let moveX = 0;
      let moveZ = 0;

      // Keyboard WASD / Arrow keys
      if (this.keys["w"] || this.keys["arrowup"]) moveZ -= 1;
      if (this.keys["s"] || this.keys["arrowdown"]) moveZ += 1;
      if (this.keys["a"] || this.keys["arrowleft"]) moveX -= 1;
      if (this.keys["d"] || this.keys["arrowright"]) moveX += 1;

      // Mobile Touch Joystick
      if (this.joystick.active) {
        moveX = this.joystick.moveX;
        moveZ = this.joystick.moveY;
      }

      const camYaw = this.cameraController ? this.cameraController.yaw : 0;
      p1.move3D(moveX, moveZ, camYaw);
    }

    // 2. 3D AI update
    if (window.matchEngine3D && window.matchEngine3D.p2Current && window.fighterAI3D) {
      window.fighterAI3D.update(dt, window.matchEngine3D.p2Current, window.matchEngine3D.p1Current);
    }

    // 3. 3D Match Engine update
    if (window.matchEngine3D) {
      window.matchEngine3D.update(dt);
    }

    // 4. 3D Camera Controller update (1st Person / 3rd Person / Top-Down)
    if (this.cameraController) {
      if (window.matchEngine3D.p1Current && window.matchEngine3D.p1Current.model) {
        this.cameraController.target = window.matchEngine3D.p1Current.model.group;
      }
      if (window.matchEngine3D.p2Current && window.matchEngine3D.p2Current.model) {
        this.cameraController.opponent = window.matchEngine3D.p2Current.model.group;
      }
      this.cameraController.update(dt);
    }

    // 5. 3D WebGL Scene Render
    if (this.sceneManager) {
      this.sceneManager.render();
    }

    // 6. Update 3D HUD
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
      if (p1Name) p1Name.textContent = p1.charData.name;
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
