/**
 * 《CyberStriker: Quantum Arena》
 * 核心格鬥與戰鬥物理引擎 (Deterministic 60 FPS Combat Engine)
 * 攻防三段體系 + 量子逆轉爆發 (Burst) + 10 大技能幀數判定
 * 完全符合 GAME_PROJECT_PLAN.md 第二章與第四章規格
 */

import { SKILLS } from '../data/skills.js';
import { getSkinAttackMeta, getSkinSuperMeta } from '../data/skins.js';
import { soundEngine } from './audio.js';
import { announcerEngine } from './announcer.js';

export class CombatEngine {
  constructor() {
    this.arenaWidth = 1000;
    this.floorY = 380;
    // 瑪利歐風格高低懸浮空中戰鬥平台 (Airborne Floating Platforms)
    this.platforms = [];
    this.updatePlatforms(this.arenaWidth, this.floorY);
    this.p1 = null;
    this.p2 = null;
    this.projectiles = [];
    this.shockwaves = [];
    this.floatingTexts = [];
    this.hitSparks = [];
    this.hitStop = 0;
    this.superFreeze = 0;
    this.slowMoTimer = 0;
    this.screenShake = { x: 0, y: 0, intensity: 0 };
    this.roundTime = 99;
    this.timerAcc = 0;
    this.isOver = false;
    this.winner = null;
    this.isTraining = false;

    // 訓練營專屬狀態
    this.trainingSettings = {
      dummyStance: 'stand', // 'stand', 'crouch', 'jump'
      dummyGuard: 'none',   // 'none', 'stand_guard', 'crouch_guard', 'after_first_hit'
      dummyReversal: false, // 甦醒第一幀升龍
      instantCd: false      // 技能即時無冷卻
    };

    // 震動回饋開關
    this.enableHaptics = true;
  }

  triggerScreenShake(intensity = 4) {
    this.screenShake.intensity = Math.max(this.screenShake.intensity, intensity);
  }

  updatePlatforms(arenaWidth = this.arenaWidth, floorY = this.floorY) {
    this.arenaWidth = arenaWidth;
    this.floorY = floorY;
    const w = Math.min(260, Math.max(180, Math.round(arenaWidth * 0.22)));
    const leftX = Math.round(arenaWidth * 0.14);
    const rightX = Math.round(arenaWidth * 0.86 - w);
    const centerX = Math.round((arenaWidth - w) / 2);
    const lowerY = Math.round(floorY - 145);
    const upperY = Math.round(floorY - 265);

    this.platforms = [
      { id: 'plat_left', x: leftX, y: lowerY, width: w, height: 18, color: '#00f3ff' },
      { id: 'plat_right', x: rightX, y: lowerY, width: w, height: 18, color: '#ff007f' },
      { id: 'plat_center', x: centerX, y: upperY, width: w, height: 18, color: '#ffd700' }
    ];
  }

  initMatch(p1Data, p2Data, isTraining = false, trainingOpts = {}) {
    this.isTraining = isTraining;
    this.isOver = false;
    this.winner = null;
    this.roundTime = 99;
    this.timerAcc = 0;
    this.projectiles = [];
    this.shockwaves = [];
    this.floatingTexts = [];
    this.hitSparks = [];
    this.hitStop = 0;
    this.superFreeze = 0;
    this.slowMoTimer = 0;
    this.screenShake = { x: 0, y: 0, intensity: 0 };

    if (isTraining && trainingOpts) {
      this.trainingSettings = { ...this.trainingSettings, ...trainingOpts };
    }

    // 玩家 P1 位於左側 25%，對手 P2 位於右側 75% (全場景比例自適應)
    const p1StartX = Math.max(160, Math.round(this.arenaWidth * 0.25));
    const p2StartX = Math.min(this.arenaWidth - 160, Math.round(this.arenaWidth * 0.75));
    this.p1 = this._createFighter(1, p1StartX, p1Data);
    this.p2 = this._createFighter(2, p2StartX, p2Data);
    this.p1.facing = 1;
    this.p2.facing = -1;
  }

  _createFighter(id, x, data) {
    const skillList = (data.loadout && data.loadout.length === 3)
      ? data.loadout.map(sid => SKILLS.find(s => s.id === sid) || SKILLS[0])
      : [SKILLS[0], SKILLS[1], SKILLS[8]];

    return {
      id,
      name: data.name || (id === 1 ? 'Player 1' : 'Player 2'),
      skin: data.skin,
      x,
      y: this.floorY,
      vx: 0,
      vy: 0,
      facing: id === 1 ? 1 : -1,
      isGrounded: true,
      currentPlatform: null,
      maxHp: 1000,
      hp: 1000,
      state: 'idle', // idle, walk_fwd, walk_back, jump, crouch, high_guard, low_guard, light_punch, heavy_kick, ranged_attack, skill, hit_stun, knockdown, wakeup, super_move
      stateTime: 0,
      stateDuration: 0,
      currentAction: null,
      isGuarding: false,
      guardStance: 'high', // 'high' 或 'low'
      invincibleTimer: 0,
      rangedCooldown: 0,

      // 終極必殺量表 (Super Gauge - 滿 1000 或殘血逆境覺醒時可發動奧義)
      superMeter: 300,
      superMax: 1000,
      usedCrisisSuper: false,

      // 量子逆轉爆發 (Burst)
      burstMeter: 500, // 滿 500 點可施展
      burstMax: 500,
      burstAvailable: true,
      frostTimer: 0, // 冰凍減速計時器

      // 3 大自選技能
      skills: skillList,
      cooldowns: [0, 0, 0],

      // 連段統計
      comboCount: 0,
      comboDamage: 0,
      comboResetTimer: 0,
      frameAdvantage: 0 // 幀數優劣勢 (+有利 / -不利)
    };
  }

  /**
   * 60 FPS 物理推進核心
   */
  update(inputsP1, inputsP2) {
    if (this.isOver) {
      // 戰鬥結束時：持續推進勝者慶祝勝利姿態動畫與浮動文字
      if (this.p1) this.p1.stateTime++;
      if (this.p2) this.p2.stateTime++;
      this._updateFloatingTexts();
      return;
    }

    // 0. 終極必殺時空凍結 (Super Freeze - 全屏暗幕人物特寫暫停物理推進)
    if (this.superFreeze > 0) {
      this.superFreeze--;
      announcerEngine.update();
      this._updateFloatingTexts();
      return;
    }

    // 0. 終結慢動作特寫 (Dramatic K.O. Slow-Motion - 0.33x 震撼特寫)
    if (this.slowMoTimer > 0) {
      this.slowMoTimer--;
      if (this.slowMoTimer % 3 !== 0) {
        this._updateHitSparks();
        this._updateFloatingTexts();
        this._updateShockwaves();
        announcerEngine.update();
        return;
      }
    }

    // 推進戰鬥播報語音與動態文字
    announcerEngine.update();

    // 1. 訓練營專屬維護 (即時無冷卻與木樁血量自動回滿)
    if (this.isTraining) {
      if (this.trainingSettings.instantCd) {
        this.p1.cooldowns = [0, 0, 0];
        this.p2.cooldowns = [0, 0, 0];
      }
      if (this.p2.hp <= 150 || (this.p2.hp < this.p2.maxHp && this.p2.comboCount === 0 && this.p2.state === 'idle')) {
        this.p2.hp = Math.min(this.p2.maxHp, this.p2.hp + 12);
      }
      if (this.p1.hp <= 100) {
        this.p1.hp = this.p1.maxHp;
      }
    }

    // 2. 計時器更新 (訓練營無限時間)
    if (!this.isTraining) {
      this.timerAcc++;
      if (this.timerAcc >= 60) {
        this.timerAcc = 0;
        this.roundTime--;
        if (this.roundTime <= 0) {
          this.roundTime = 0;
          this._handleTimeOver();
        }
      }
    }

    // 3. 畫面震動衰減與打擊火花更新
    if (this.screenShake.intensity > 0.15) {
      this.screenShake.x = (Math.random() - 0.5) * this.screenShake.intensity * 2.2;
      this.screenShake.y = (Math.random() - 0.5) * this.screenShake.intensity * 2.2;
      this.screenShake.intensity *= 0.82;
    } else {
      this.screenShake.x = 0;
      this.screenShake.y = 0;
      this.screenShake.intensity = 0;
    }

    this._updateHitSparks();

    // 命中頓幀 (Hit Stop)：打擊爆裂瞬間凍結數幀，呈現格鬥遊戲扎實厚重的打擊感
    if (this.hitStop > 0) {
      this.hitStop--;
      return;
    }

    // 4. 處理雙方冷卻與輸入
    this._updateFighter(this.p1, this.p2, inputsP1);
    this._updateFighter(this.p2, this.p1, inputsP2);

    // 5. 更新飛行道具與衝擊波
    this._updateProjectiles();
    this._updateShockwaves();
    this._updateFloatingTexts();

    // 5. 兩人間距與面向校正
    this._resolvePositions();

    // 6. 勝負判定與觸發勝利姿態
    if (!this.isTraining && !this.isOver) {
      if (this.p1.hp <= 0 && this.p2.hp <= 0) {
        this.isOver = true;
        this.winner = 0; // 平局
        this.slowMoTimer = 45;
        this.hitStop = 18;
        this.triggerScreenShake(16);
        announcerEngine.announceKO();
        this._triggerMatchEndStates();
      } else if (this.p1.hp <= 0) {
        this.isOver = true;
        this.winner = 2;
        this.slowMoTimer = 45;
        this.hitStop = 18;
        this.triggerScreenShake(16);
        announcerEngine.announceKO();
        this._triggerMatchEndStates();
      } else if (this.p2.hp <= 0) {
        this.isOver = true;
        this.winner = 1;
        this.slowMoTimer = 45;
        this.hitStop = 18;
        this.triggerScreenShake(16);
        announcerEngine.announceKO();
        this._triggerMatchEndStates();
      }
    }
  }

  _triggerMatchEndStates() {
    const targetX = this.winner === 1 ? this.p2.x : (this.winner === 2 ? this.p1.x : (this.p1.x + this.p2.x) / 2);
    const targetY = this.winner === 1 ? this.p2.y - 60 : (this.winner === 2 ? this.p1.y - 60 : 350);
    this.shockwaves.push({
      x: targetX,
      y: targetY,
      radius: 10,
      maxRadius: 420,
      color: '#ffd700',
      duration: 50,
      lineWidth: 8,
      isKO: true
    });

    if (this.winner === 1) {
      this.p1.state = 'victory';
      this.p1.stateTime = 0;
      this.p1.vx = 0;
      this.p1.vy = 0;
      if (this.p2.state !== 'knockdown') {
        this.p2.state = 'defeat';
        this.p2.stateTime = 0;
        this.p2.vx = 0;
      }
      this.floatingTexts.push({
        text: 'VICTORY!',
        x: this.p1.x,
        y: this.p1.y - 145,
        color: '#ffd700',
        life: 180
      });
    } else if (this.winner === 2) {
      this.p2.state = 'victory';
      this.p2.stateTime = 0;
      this.p2.vx = 0;
      this.p2.vy = 0;
      if (this.p1.state !== 'knockdown') {
        this.p1.state = 'defeat';
        this.p1.stateTime = 0;
        this.p1.vx = 0;
      }
      this.floatingTexts.push({
        text: 'VICTORY!',
        x: this.p2.x,
        y: this.p2.y - 145,
        color: '#ff007f',
        life: 180
      });
    }
  }

  _updateFighter(char, opp, input) {
    char.stateTime++;
    if (char.invincibleTimer > 0) char.invincibleTimer--;

    // 冷卻倒數 (秒數轉幀數)
    for (let i = 0; i < char.cooldowns.length; i++) {
      if (char.cooldowns[i] > 0) {
        char.cooldowns[i] = Math.max(0, char.cooldowns[i] - 1 / 60);
      }
    }
    if (char.rangedCooldown > 0) char.rangedCooldown--;
    if (char.frostTimer > 0) char.frostTimer--;

    // 連段重置計時
    if (char.comboResetTimer > 0) {
      char.comboResetTimer--;
      if (char.comboResetTimer <= 0) {
        char.comboCount = 0;
        char.comboDamage = 0;
      }
    }

    // 平台下跳判定 (在平台上按住下 + 跳躍或下鍵可穿透跳下)
    const moveY = input ? (input.y || 0) : 0;
    if (char.isGrounded && char.currentPlatform && moveY > 0.55) {
      char.isGrounded = false;
      char.y += 6;
      char.vy = 2;
      char.currentPlatform = null;
    }

    const prevY = char.y;

    // 重力與空中運動物理 (爽快回彈，起跳下落節奏敏捷扎實)
    if (!char.isGrounded) {
      char.vy += 0.66; // 敏捷自然重力
      // 空中水平操縱轉向 (Air Control)
      if (input && Math.abs(input.x || 0) > 0.1) {
        char.vx += (input.x || 0) * 0.55;
        char.vx = Math.max(-5.0, Math.min(5.0, char.vx));
      }
      char.x += char.vx;
      char.y += char.vy;

      // 1. 懸浮空中平台著陸檢測 (下落時 vy >= 0)
      let landedOnPlatform = false;
      if (char.vy >= 0) {
        for (const plat of this.platforms) {
          const inX = char.x >= plat.x - 12 && char.x <= plat.x + plat.width + 12;
          if (inX && prevY <= plat.y + 4 && char.y >= plat.y) {
            char.y = plat.y;
            char.vy = 0;
            char.vx *= 0.6;
            char.isGrounded = true;
            char.currentPlatform = plat;
            char.facing = char.x < opp.x ? 1 : -1;
            if (char.state === 'jump') {
              char.state = 'idle';
              char.stateTime = 0;
              char.currentAction = null;
            }
            landedOnPlatform = true;
            break;
          }
        }
      }

      // 2. 地面著陸檢測
      if (!landedOnPlatform && char.y >= this.floorY) {
        char.y = this.floorY;
        char.vy = 0;
        char.vx = 0;
        char.isGrounded = true;
        char.currentPlatform = null;
        char.facing = char.x < opp.x ? 1 : -1; // 落地確保面向對手
        if (char.state === 'jump') {
          char.state = 'idle';
          char.stateTime = 0;
          char.currentAction = null;
        }
      }
    } else {
      // 在地面或平台上：
      if (char.currentPlatform) {
        const plat = char.currentPlatform;
        // 走出平台邊緣，進入下落
        if (char.x < plat.x - 16 || char.x > plat.x + plat.width + 16) {
          char.isGrounded = false;
          char.currentPlatform = null;
        }
      }
      char.x += char.vx;
      char.vx *= 0.75; // 地面摩擦力快速剎車
    }

    // 邊界限制
    char.x = Math.max(50, Math.min(this.arenaWidth - 50, char.x));

    // ─── 檢查量子逆轉爆發 (Quantum Burst) ───
    // 在受擊硬直 (hit_stun) 中可消耗能量進行緊急脫身
    const tryBurst = input && (input.burst || (input.punch && input.kick));
    if (tryBurst && char.state === 'hit_stun' && char.burstMeter >= char.burstMax && char.burstAvailable) {
      this._executeBurst(char, opp);
      return;
    }

    // 狀態機處理
    switch (char.state) {
      case 'idle':
      case 'walk_fwd':
      case 'walk_back':
      case 'crouch':
      case 'high_guard':
      case 'low_guard':
        this._handleNormalInputs(char, opp, input);
        break;

      case 'jump':
        // 空中自動朝向對手（若無正在出招）
        if (!char.currentAction) {
          char.facing = char.x < opp.x ? 1 : -1;
        }

        // 1. 在空中發動技能 (Air Skill Trigger!)
        if (input) {
          if (input.skill1 && char.cooldowns[0] <= 0) {
            this._executeSkill(char, opp, 0);
            break;
          }
          if (input.skill2 && char.cooldowns[1] <= 0) {
            this._executeSkill(char, opp, 1);
            break;
          }
          if (input.skill3 && char.cooldowns[2] <= 0) {
            this._executeSkill(char, opp, 2);
            break;
          }
        }

        // 2. 空中攻擊打擊判定與出招 (Air Punch, Kick)
        if (char.currentAction) {
          this._updateAttackAction(char, opp);
        } else if (input && (input.punch || input.kick)) {
          char.facing = char.x < opp.x ? 1 : -1;
          this._executeAirAttack(char, opp, input.kick ? 'kick' : 'punch');
        }
        break;

      case 'light_punch':
      case 'heavy_kick':
      case 'crouch_punch':
      case 'crouch_kick':
      case 'ranged_attack':
      case 'skill':
        this._updateAttackAction(char, opp);
        break;

      case 'super_move':
        this._updateSuperAction(char, opp);
        break;

      case 'hit_stun':
        if (char.stateTime >= char.stateDuration) {
          char.state = 'idle';
          char.stateTime = 0;
          char.currentAction = null;
        }
        break;

      case 'knockdown':
        if (char.stateTime >= 40) { // 平躺 40 幀
          char.state = 'wakeup';
          char.stateTime = 0;
          char.invincibleTimer = 15; // 起身無敵 15 幀
          soundEngine.playHit('slide');
        }
        break;

      case 'wakeup':
        if (char.stateTime >= 15) {
          char.state = 'idle';
          char.stateTime = 0;
          char.currentAction = null;
        }
        break;
    }
  }

  _handleNormalInputs(char, opp, input) {
    if (!input) {
      char.state = 'idle';
      char.isGuarding = false;
      return;
    }

    // 面向自動校正 (在地面可動時)
    if (char.isGrounded) {
      char.facing = char.x < opp.x ? 1 : -1;
    }

    // 0. 角色專屬終極必殺大絕招 (Level 3 Super Move - 滿能量或逆境覺醒按 [P] 或 [SUPER])
    if (input.superMove && (char.superMeter >= char.superMax || (char.hp <= 350 && !char.usedCrisisSuper))) {
      this._executeSuperMove(char, opp);
      return;
    }

    // 1. 技能觸發 (優先級最高)
    if (input.skill1 && char.cooldowns[0] <= 0) {
      this._executeSkill(char, opp, 0);
      return;
    }
    if (input.skill2 && char.cooldowns[1] <= 0) {
      this._executeSkill(char, opp, 1);
      return;
    }
    if (input.skill3 && char.cooldowns[2] <= 0) {
      this._executeSkill(char, opp, 2);
      return;
    }

    const moveX = input.x || 0;
    const moveY = input.y || 0;
    const isCrouching = (moveY > 0.35 || char.state === 'crouch') && char.isGrounded;

    // 2. 基礎近戰攻擊 (細節三段判定：站立直拳/重踢、下蹲刺拳/下段掃堂腿)
    if (input.punch) {
      if (isCrouching) {
        this._executeCrouchPunch(char, opp);
      } else {
        this._executeLightPunch(char, opp);
      }
      return;
    }
    if (input.kick) {
      if (isCrouching) {
        this._executeCrouchKick(char, opp);
      } else {
        this._executeHeavyKick(char, opp);
      }
      return;
    }

    // 3. 專屬按鍵主動召喚量子防護罩 (Dedicated Guard Key: L / Shift / 觸控盾牌)
    // 只有在按下防禦鍵時才會召喚防護罩；單純向後走位後退絕不觸發防護罩
    if (input.guard && char.isGrounded) {
      const wasGuarding = char.isGuarding;
      char.isGuarding = true;
      if (moveY > 0.4) {
        char.state = 'low_guard';
        char.guardStance = 'low';
      } else {
        char.state = 'high_guard';
        char.guardStance = 'high';
      }
      if (!wasGuarding) {
        soundEngine.playHit('shield_up');
      }
      return;
    }

    // 4. 起跳 (爽快敏捷起跳弧度，手感扎實有力)
    if (moveY < -0.35 && char.isGrounded) {
      char.isGrounded = false;
      char.currentPlatform = null;
      char.vy = -13.6; // 敏捷爽快起跳
      char.vx = moveX * 4.6; // 流暢前跳/後跳位移
      char.state = 'jump';
      char.stateTime = 0;
      char.isGuarding = false;
      soundEngine.playHit('dp');
      return;
    }

    // 5. 下蹲 (無防禦按鍵時為純下蹲，不召喚防護罩)
    if (moveY > 0.35 && char.isGrounded) {
      char.state = 'crouch';
      char.isGuarding = false;
      return;
    }

    // 6. 橫向移動 (快節奏敏捷走位，流暢跟手)
    if (Math.abs(moveX) > 0.15) {
      const speedMod = (char.frostTimer && char.frostTimer > 0) ? 0.55 : 1.0;
      const isMovingFwd = (char.facing === 1 && moveX > 0) || (char.facing === -1 && moveX < 0);
      if (isMovingFwd) {
        char.x += char.facing * 5.0 * speedMod; // 快速敏捷前進
        char.state = 'walk_fwd';
        char.isGuarding = false;
      } else {
        // 後撤走位：純粹向後退走位，不召喚防護罩 (由專屬防護罩按鍵召喚)
        char.x -= char.facing * 3.6 * speedMod; // 敏捷後撤拉開
        char.state = 'walk_back';
        char.isGuarding = false;
      }
      return;
    }

    // 無方向操作，恢復待機
    char.state = 'idle';
    char.isGuarding = false;
  }

  // ─── 量子逆轉爆發系統 (Quantum Burst) ───
  _executeBurst(char, opp) {
    char.burstMeter = 0;
    char.burstAvailable = false; // 每回合限用 1 次
    char.state = 'idle';
    char.stateTime = 0;
    char.invincibleTimer = 10; // 前 10 幀全身無敵

    soundEngine.playHit('burst');
    announcerEngine.announceBurst();
    this._triggerHaptic(80);

    // 爆發直徑 300 像素金色環形氣浪
    this.shockwaves.push({
      x: char.x,
      y: char.y - 70,
      radius: 10,
      maxRadius: 150,
      color: '#ffd700',
      duration: 20
    });

    // 將近身對手推開至 3 個身位 (約 240px)，打斷其連招
    const dist = Math.abs(char.x - opp.x);
    if (dist < 260) {
      opp.vx = char.facing * 18;
      opp.state = 'hit_stun';
      opp.stateTime = 0;
      opp.stateDuration = 20; // 造成對手短暫 20 幀推擠硬直
      opp.hp = Math.max(1, opp.hp - 40); // 造成 40 點微量衝擊反傷
      this.floatingTexts.push({
        text: 'QUANTUM BURST!',
        x: char.x,
        y: char.y - 120,
        color: '#ffd700',
        life: 45
      });
    }
  }

  // ─── 角色專屬終極必殺大絕招 (Cinematic Super Moves - 26 外觀各自專屬奧義) ───
  _executeSuperMove(char, opp) {
    char.superMeter = 0;
    if (char.hp <= 350) char.usedCrisisSuper = true;

    const meta = getSkinSuperMeta(char.skin);
    this.superFreeze = 42; // 時空凍結 42 幀 (全屏暗幕與人物特寫)
    char.invincibleTimer = 55;
    char.state = 'super_move';
    char.stateTime = 0;
    char.stateDuration = meta.duration || 65;
    char.vx = 0;

    this.triggerScreenShake(14);
    soundEngine.playHit('super');
    this._triggerHaptic(90);
    announcerEngine.announceSuper(char.skin.name, meta.name, char.skin.themeColor);

    char.currentAction = {
      id: 'SUPER',
      type: 'super_move',
      name: meta.name,
      meta,
      hitChecked: false,
      hitsDone: 0,
      totalHits: 10,
      damagePerHit: 22, // 10 hits * 22 = 220 點傷害，對稱公平
      color: meta.color,
      coreColor: meta.coreColor,
      beamWidth: meta.beamWidth
    };
  }

  _updateSuperAction(char, opp) {
    const action = char.currentAction;
    if (!action) return;

    const t = char.stateTime;

    // 在第 22 幀蓄力完成瞬間生成終極大招全屏衝擊波實體
    if (t === 22) {
      this.triggerScreenShake(10);
      soundEngine.playHit('heavy');
      this.shockwaves.push({
        ownerId: char.id,
        x: char.x + char.facing * (this.arenaWidth / 2),
        y: char.y - 74,
        width: this.arenaWidth,
        height: action.beamWidth || 80,
        isSuperBeam: true,
        beamType: action.meta.type,
        color: action.color,
        coreColor: action.coreColor,
        facing: char.facing,
        duration: 34
      });
    }

    // 第 22~50 幀多段連擊 (Multi-Hit 10 次判定)
    if (t >= 22 && t <= 50 && (t % 3 === 0) && action.hitsDone < action.totalHits) {
      action.hitsDone++;
      const isInFront = (char.facing === 1 && opp.x >= char.x - 20) || (char.facing === -1 && opp.x <= char.x + 20);
      const isVerticalInRange = Math.abs(char.y - opp.y) <= 150;

      if (isInFront && isVerticalInRange && opp.invincibleTimer <= 0) {
        opp.hp = Math.max(0, opp.hp - action.damagePerHit);
        opp.state = 'hit_stun';
        opp.stateTime = 0;
        opp.stateDuration = 20;
        opp.vx = char.facing * 3.5;

        // 打擊火花與震屏
        this.triggerScreenShake(4.5);
        this.hitStop = Math.max(this.hitStop, 2);
        this._triggerHaptic(30);

        const sparkX = opp.x;
        const sparkY = opp.y - 70;
        this.hitSparks.push({
          type: 'super_hit',
          x: sparkX,
          y: sparkY,
          color: action.color,
          coreRadius: 25,
          life: 16,
          maxLife: 16,
          rays: Array.from({ length: 6 }, (_, i) => ({
            angle: (Math.PI * 2 / 6) * i,
            len: 26
          }))
        });

        char.comboCount++;
        char.comboDamage += action.damagePerHit;
        char.comboResetTimer = 50;

        this.floatingTexts.push({
          text: `ULTRA -${action.damagePerHit}`,
          x: opp.x,
          y: opp.y - 95 - (action.hitsDone % 3) * 16,
          color: action.color,
          life: 25
        });

        // 致命一擊檢查
        if (opp.hp <= 0 && !this.isOver && !this.isTraining) {
          this.isOver = true;
          this.winner = char.id;
          this.slowMoTimer = 45;
          this.hitStop = 18;
          this.triggerScreenShake(16);
          announcerEngine.announceKO();
          this._triggerMatchEndStates();
        }
      }
    }

    if (t >= char.stateDuration) {
      char.state = char.isGrounded ? 'idle' : 'jump';
      char.stateTime = 0;
      char.currentAction = null;
    }
  }

  // ─── 普攻打擊體系 (站立、下蹲、空中全細節三段判定) ───
  _executeLightPunch(char, opp) {
    char.isGuarding = false;
    char.state = 'light_punch';
    char.stateTime = 0;
    char.stateDuration = 16; // 16 幀快節奏敏捷直拳
    const meta = getSkinAttackMeta(char.skin, 'light_punch');
    char.currentAction = {
      name: meta.name || '刺拳打擊',
      startup: 4,
      active: 5,
      recovery: 7,
      damage: 80,
      guardType: 'all',
      hitChecked: false,
      style: meta.style,
      vfxType: meta.vfxType
    };
    soundEngine.playHit(meta.sound || 'whiff_punch');
  }

  _executeHeavyKick(char, opp) {
    char.isGuarding = false;
    char.state = 'heavy_kick';
    char.stateTime = 0;
    char.stateDuration = 20; // 20 幀迅猛重踢
    const meta = getSkinAttackMeta(char.skin, 'heavy_kick');
    char.currentAction = {
      name: meta.name || '重力猛踢',
      startup: 6,
      active: 6,
      recovery: 8,
      damage: 145,
      guardType: 'all',
      hitChecked: false,
      style: meta.style,
      vfxType: meta.vfxType
    };
    soundEngine.playHit(meta.sound || 'whiff_kick');
  }

  _executeCrouchPunch(char, opp) {
    char.isGuarding = false;
    char.state = 'crouch_punch';
    char.stateTime = 0;
    char.stateDuration = 15; // 15 幀下蹲刺拳
    const meta = getSkinAttackMeta(char.skin, 'crouch_punch');
    char.currentAction = {
      name: meta.name || '下蹲刺拳',
      startup: 4,
      active: 4,
      recovery: 7,
      damage: 85,
      guardType: 'all',
      hitChecked: false,
      style: meta.style,
      vfxType: meta.vfxType
    };
    soundEngine.playHit(meta.sound || 'whiff_punch');
  }

  _executeCrouchKick(char, opp) {
    char.isGuarding = false;
    char.state = 'crouch_kick';
    char.stateTime = 0;
    char.stateDuration = 20; // 20 幀低位掃堂腿
    const meta = getSkinAttackMeta(char.skin, 'crouch_kick');
    char.currentAction = {
      name: meta.name || '下蹲掃堂腿',
      startup: 6,
      active: 6,
      recovery: 8,
      damage: 135,
      guardType: 'crouch_only', // 下段判定：站防無效，必須蹲防！
      knockdown: true, // 命中掃翻倒地！
      hitChecked: false,
      style: meta.style,
      vfxType: meta.vfxType
    };
    soundEngine.playHit('sweep');
    soundEngine.playHit(meta.sound || 'whiff_kick');
  }

  _executeAirAttack(char, opp, type) {
    char.isGuarding = false;
    char.state = 'jump';
    char.stateTime = 0;
    char.stateDuration = 16; // 16 幀空中打擊
    char.currentAction = {
      name: type === 'kick' ? '躍空重飛踢' : '跳躍刺拳',
      startup: 4,
      active: 6,
      recovery: 6,
      damage: type === 'kick' ? 155 : 90,
      guardType: 'stand_only', // 空中打擊視為中段，不可蹲防！
      knockdown: type === 'kick', // 空中重飛踢擊倒對手
      hitChecked: false
    };
    soundEngine.playHit(type === 'kick' ? 'whiff_kick' : 'whiff_punch');
  }

  // ─── 遠程攻擊：全域多元光子武裝體系 (直射/下段爬行波/重砲/防空高射/躍空俯衝/垂直爆彈) ───
  _executeRangedAttack(char, opp) {
    char.isGuarding = false;
    char.state = 'ranged_attack';
    char.stateTime = 0;
    char.stateDuration = 18;
    char.rangedCooldown = 24;
    char.currentAction = {
      name: '量子直射光彈',
      startup: 4,
      active: 5,
      recovery: 9,
      damage: 110,
      guardType: 'all',
      isRanged: true,
      hitChecked: true
    };
    soundEngine.playHit('projectile');

    this.projectiles.push({
      ownerId: char.id,
      type: 'normal',
      name: '量子直射光彈',
      x: char.x + char.facing * 42,
      y: char.y - 74,
      vx: char.facing * 8.8, // 敏捷流暢飛行
      vy: 0,
      radius: 9,
      damage: 110,
      guardType: 'all',
      skin: char.skin,
      life: 110
    });
  }

  _executeCrouchRangedAttack(char, opp) {
    char.isGuarding = false;
    char.state = 'crouch_punch';
    char.stateTime = 0;
    char.stateDuration = 18;
    char.rangedCooldown = 24;
    char.currentAction = {
      name: '地裂爬行震波',
      startup: 4,
      active: 5,
      recovery: 9,
      damage: 135,
      guardType: 'crouch_only', // 下段判定！站立防禦無效，必須蹲防或翻越！
      knockdown: true,
      isRanged: true,
      hitChecked: true
    };
    soundEngine.playHit('sweep');

    this.projectiles.push({
      ownerId: char.id,
      type: 'ground_wave',
      name: '地裂爬行震波',
      x: char.x + char.facing * 36,
      y: this.floorY - 14,
      vx: char.facing * 7.0,
      vy: 0,
      radius: 13,
      damage: 135,
      guardType: 'crouch_only',
      knockdown: true,
      skin: char.skin,
      life: 120
    });
  }

  _executeHeavyRangedAttack(char, opp) {
    char.isGuarding = false;
    char.state = 'ranged_attack';
    char.stateTime = 0;
    char.stateDuration = 20;
    char.rangedCooldown = 28;
    char.currentAction = {
      name: '超載穿透重砲',
      startup: 6,
      active: 6,
      recovery: 8,
      damage: 160,
      guardType: 'all',
      knockdown: true, // 命中直接擊倒！
      isRanged: true,
      hitChecked: true
    };
    soundEngine.playHit('beam');
    this.triggerScreenShake(3);

    this.projectiles.push({
      ownerId: char.id,
      type: 'heavy',
      name: '超載穿透重砲',
      x: char.x + char.facing * 46,
      y: char.y - 74,
      vx: char.facing * 10.5,
      vy: 0,
      radius: 16,
      damage: 160,
      guardType: 'all',
      knockdown: true,
      skin: char.skin,
      life: 100
    });
  }

  _executeAntiAirRangedAttack(char, opp) {
    char.isGuarding = false;
    char.state = 'ranged_attack';
    char.stateTime = 0;
    char.stateDuration = 18;
    char.rangedCooldown = 24;
    char.currentAction = {
      name: '對空高射離子彈',
      startup: 4,
      active: 5,
      recovery: 9,
      damage: 120,
      guardType: 'all',
      isRanged: true,
      hitChecked: true
    };
    soundEngine.playHit('projectile');

    this.projectiles.push({
      ownerId: char.id,
      type: 'anti_air',
      name: '對空高射離子彈',
      x: char.x + char.facing * 40,
      y: char.y - 88,
      vx: char.facing * 7.0,
      vy: -7.5,
      radius: 10,
      damage: 120,
      guardType: 'all',
      skin: char.skin,
      life: 110
    });
  }

  _executeAirRangedAttack(char, opp) {
    char.isGuarding = false;
    char.state = 'jump';
    char.stateTime = 0;
    char.stateDuration = 16;
    char.rangedCooldown = 22;
    char.currentAction = {
      name: '躍空俯衝光彈',
      startup: 4,
      active: 6,
      recovery: 6,
      damage: 115,
      guardType: 'all',
      isRanged: true,
      hitChecked: true
    };
    soundEngine.playHit('projectile');

    this.projectiles.push({
      ownerId: char.id,
      type: 'air_dive',
      name: '躍空俯衝光彈',
      x: char.x + char.facing * 42,
      y: char.y - 50,
      vx: char.facing * 8.0,
      vy: 2.0,
      radius: 9,
      damage: 115,
      guardType: 'all',
      skin: char.skin,
      life: 110
    });
  }

  _executeAirBombAttack(char, opp) {
    char.isGuarding = false;
    char.state = 'jump';
    char.stateTime = 0;
    char.stateDuration = 18;
    char.rangedCooldown = 24;
    char.currentAction = {
      name: '空對地離子爆彈',
      startup: 4,
      active: 6,
      recovery: 8,
      damage: 145,
      guardType: 'stand_only', // 中段落雷判定，不可蹲防！
      knockdown: true,
      isRanged: true,
      hitChecked: true
    };
    soundEngine.playHit('projectile');

    this.projectiles.push({
      ownerId: char.id,
      type: 'bomb',
      name: '空對地離子爆彈',
      x: char.x + char.facing * 25,
      y: char.y - 30,
      vx: char.facing * 3.5,
      vy: 7.0,
      radius: 12,
      damage: 145,
      guardType: 'stand_only',
      knockdown: true,
      skin: char.skin,
      life: 100
    });
  }

  // ─── 10 大核心技能執行 ───
  _executeSkill(char, opp, slotIdx) {
    const skill = char.skills[slotIdx];
    if (!skill) return;

    char.isGuarding = false;
    // 設定冷卻
    char.cooldowns[slotIdx] = skill.cd;
    char.state = 'skill';
    char.stateTime = 0;
    char.stateDuration = skill.startup + skill.active + skill.recovery;
    char.currentAction = {
      ...skill,
      hitChecked: false
    };

    // 招式前搖特效與音效
    switch (skill.id) {
      case 'SK-01': // 能量脈衝彈
        soundEngine.playHit('laser');
        break;

      case 'SK-02': // 升龍衝天擊
        char.invincibleTimer = skill.invincibleFrames || 4;
        char.isGrounded = false;
        char.vy = -13.0; // 爽快拔地升空
        char.vx = char.facing * 3.2;
        soundEngine.playHit('dp');
        break;

      case 'SK-03': // 音速滑踢
        char.vx = char.facing * 12.0; // 貼地迅猛滑踢
        soundEngine.playHit('slide');
        break;

      case 'SK-04': // 躍空震地砸
        char.isGrounded = false;
        char.vy = -10.5;
        char.vx = char.facing * 4.8;
        soundEngine.playHit('dp');
        break;

      case 'SK-05': // 幻影反擊壁 (架招)
        soundEngine.playHit('guard');
        break;

      case 'SK-06': // 虛空折躍斬 (瞬移穿透)
        soundEngine.playHit('teleport');
        break;

      case 'SK-07': // 百裂連擊衝
        char.vx = char.facing * 7.2; // 敏捷突進
        soundEngine.playHit('punch');
        break;

      case 'SK-08': // 磁暴重摔投 (霸體)
        char.invincibleTimer = 8;
        soundEngine.playHit('punch');
        break;

      case 'SK-09': // 奈米震波罩
        soundEngine.playHit('burst');
        break;

      case 'SK-10': // 超載終結砲
        soundEngine.playHit('beam');
        break;

      case 'SK-11': // 追蹤微型飛彈群
        soundEngine.playHit('missile_launch');
        break;

      case 'SK-12': // 折射稜鏡激光
        soundEngine.playHit('laser_bounce');
        break;

      case 'SK-13': // 天頂軌道打擊
        soundEngine.playHit('laser');
        break;

      case 'SK-14': // 虛空引力黑洞球
        soundEngine.playHit('burst');
        break;

      case 'SK-15': // 高斯狙擊穿甲重槍
        soundEngine.playHit('laser');
        this.triggerScreenShake(4.5);
        break;

      case 'SK-16': // 擴散式電漿霰彈槍
        soundEngine.playHit('laser');
        this.triggerScreenShake(3.5);
        break;

      case 'SK-17': // 脈衝電磁浮游砲
        soundEngine.playHit('burst');
        break;

      case 'SK-18': // 極凍冰霜穿透箭
        soundEngine.playHit('laser');
        break;

      case 'SK-19': // 灼熱燃燒榴彈槍
        soundEngine.playHit('bomb_drop');
        break;

      case 'SK-20': // 迴旋雷霆光刃鏢
        soundEngine.playHit('dp');
        break;
    }
  }

  _updateAttackAction(char, opp) {
    const action = char.currentAction;
    if (!action) return;

    const t = char.stateTime;
    const hitStart = action.startup;
    const hitEnd = action.startup + action.active;

    // 虛空折躍斬：瞬移判定
    if (action.id === 'SK-06' && t === action.startup) {
      char.x = opp.x + (opp.facing * -50); // 瞬移至對手正背後
      char.facing = char.x < opp.x ? 1 : -1;
    }

    // 招式命中幀檢查
    if (t >= hitStart && t <= hitEnd && !action.hitChecked) {
      this._checkHitbox(char, opp, action);
    }

    // 動作結束，恢復正常（若仍在空中則無縫切回跳躍姿態，可連續在空中出招或下落）
    if (t >= char.stateDuration) {
      char.state = char.isGrounded ? 'idle' : 'jump';
      char.stateTime = 0;
      char.currentAction = null;
    }
  }

  // ─── 判定盒 (Hitbox / Hurtbox) 檢定與攻防三段三擇 ───
  _checkHitbox(char, opp, action) {
    if (opp.invincibleTimer > 0) return;

    // 飛行道具單獨生成實體
    if (action.id === 'SK-01') {
      action.hitChecked = true;
      this.projectiles.push({
        ownerId: char.id,
        x: char.x + char.facing * 40,
        y: char.y - 74,
        vx: char.facing * 12,
        damage: action.damage,
        skin: char.skin,
        life: 70
      });
      return;
    }

    // 追蹤微型飛彈群 (SK-11)
    if (action.id === 'SK-11') {
      action.hitChecked = true;
      soundEngine.playHit('missile_launch');
      for (let m = 0; m < 3; m++) {
        this.projectiles.push({
          ownerId: char.id,
          type: 'homing',
          name: '追蹤微型飛彈',
          x: char.x + char.facing * (32 + m * 10),
          y: char.y - 65 - m * 14,
          vx: char.facing * (9 + m * 1.5),
          vy: (m - 1) * 2.8,
          radius: 8,
          damage: 70,
          guardType: 'all',
          skin: char.skin,
          life: 95
        });
      }
      return;
    }

    // 折射稜鏡激光 (SK-12)
    if (action.id === 'SK-12') {
      action.hitChecked = true;
      this.projectiles.push({
        ownerId: char.id,
        type: 'bouncing',
        name: '折射稜鏡激光',
        x: char.x + char.facing * 44,
        y: char.y - 68,
        vx: char.facing * 16,
        vy: 5.5,
        bouncesLeft: 3,
        radius: 11,
        damage: action.damage,
        guardType: 'all',
        skin: char.skin,
        life: 85
      });
      return;
    }

    // 天頂軌道打擊 (SK-13)
    if (action.id === 'SK-13') {
      action.hitChecked = true;
      const targetX = Math.max(50, Math.min(this.arenaWidth - 50, opp.x));
      this.shockwaves.push({
        x: targetX,
        y: this.floorY - 6,
        radius: 6,
        maxRadius: 45,
        color: '#ffd700',
        duration: 16
      });
      setTimeout(() => {
        soundEngine.playHit('orbital_beam');
        this.triggerScreenShake(7);
        this.shockwaves.push({
          x: targetX,
          y: this.floorY / 2,
          width: 55,
          height: this.floorY + 80,
          isBeam: true,
          color: '#ffd700',
          duration: 16
        });
        if (Math.abs(opp.x - targetX) < 48 && opp.invincibleTimer <= 0) {
          this._applyHit(char, opp, {
            name: '天頂軌道打擊',
            damage: action.damage,
            guardType: 'stand_only',
            knockdown: true
          });
        }
      }, 180);
      return;
    }

    // 虛空引力黑洞球 (SK-14)
    if (action.id === 'SK-14') {
      action.hitChecked = true;
      this.projectiles.push({
        ownerId: char.id,
        type: 'vortex',
        name: '虛空引力黑洞球',
        x: char.x + char.facing * 40,
        y: char.y - 70,
        vx: char.facing * 4.5,
        vy: 0,
        radius: 26,
        damage: 48,
        tickCooldown: 0,
        guardType: 'all',
        skin: char.skin,
        life: 110
      });
      return;
    }

    // 高斯狙擊穿甲重槍 (SK-15)
    if (action.id === 'SK-15') {
      action.hitChecked = true;
      soundEngine.playHit('laser');
      this.triggerScreenShake(4.5);
      this.projectiles.push({
        ownerId: char.id,
        type: 'sniper',
        name: '高斯狙擊穿甲彈',
        x: char.x + char.facing * 44,
        y: char.y - 72,
        vx: char.facing * 34,
        vy: 0,
        radius: 13,
        damage: action.damage,
        guardType: 'all',
        knockdown: true,
        skin: char.skin,
        life: 45
      });
      return;
    }

    // 擴散式電漿霰彈槍 (SK-16)
    if (action.id === 'SK-16') {
      action.hitChecked = true;
      soundEngine.playHit('laser');
      this.triggerScreenShake(3.5);
      const angles = [-0.22, -0.11, 0, 0.11, 0.22];
      for (let ang of angles) {
        this.projectiles.push({
          ownerId: char.id,
          type: 'shotgun',
          name: '電漿霰彈',
          x: char.x + char.facing * 42,
          y: char.y - 70,
          vx: Math.cos(ang) * 15 * char.facing,
          vy: Math.sin(ang) * 15,
          radius: 7,
          damage: 50,
          guardType: 'all',
          skin: char.skin,
          life: 40
        });
      }
      return;
    }

    // 脈衝電磁浮游砲 (SK-17)
    if (action.id === 'SK-17') {
      action.hitChecked = true;
      soundEngine.playHit('burst');
      this.projectiles.push({
        ownerId: char.id,
        type: 'funnel',
        name: '電磁浮游僚機-Alpha',
        droneIndex: 0,
        offsetX: -char.facing * 28,
        offsetY: -105,
        fireTimer: 16,
        shotsLeft: 3,
        x: char.x - char.facing * 28,
        y: char.y - 105,
        radius: 10,
        skin: char.skin,
        life: 140
      });
      this.projectiles.push({
        ownerId: char.id,
        type: 'funnel',
        name: '電磁浮游僚機-Beta',
        droneIndex: 1,
        offsetX: -char.facing * 44,
        offsetY: -75,
        fireTimer: 28,
        shotsLeft: 3,
        x: char.x - char.facing * 44,
        y: char.y - 75,
        radius: 10,
        skin: char.skin,
        life: 140
      });
      return;
    }

    // 極凍冰霜穿透箭 (SK-18)
    if (action.id === 'SK-18') {
      action.hitChecked = true;
      soundEngine.playHit('laser');
      this.projectiles.push({
        ownerId: char.id,
        type: 'cryo_arrow',
        name: '極凍冰霜穿透箭',
        x: char.x + char.facing * 42,
        y: char.y - 72,
        vx: char.facing * 18,
        vy: 0,
        radius: 10,
        damage: action.damage,
        guardType: 'all',
        skin: char.skin,
        life: 70
      });
      return;
    }

    // 灼熱燃燒榴彈槍 (SK-19)
    if (action.id === 'SK-19') {
      action.hitChecked = true;
      soundEngine.playHit('bomb_drop');
      this.projectiles.push({
        ownerId: char.id,
        type: 'grenade',
        name: '燃燒榴彈',
        x: char.x + char.facing * 40,
        y: char.y - 72,
        vx: char.facing * 10.5,
        vy: -8.5,
        radius: 9,
        damage: action.damage,
        guardType: 'all',
        skin: char.skin,
        life: 80
      });
      return;
    }

    // 迴旋雷霆光刃鏢 (SK-20)
    if (action.id === 'SK-20') {
      action.hitChecked = true;
      soundEngine.playHit('dp');
      this.projectiles.push({
        ownerId: char.id,
        type: 'boomerang',
        name: '迴旋雷霆光刃鏢',
        ownerChar: char,
        x: char.x + char.facing * 40,
        y: char.y - 70,
        vx: char.facing * 14,
        vy: 0,
        outwardFrames: 32,
        returnTarget: char,
        hasHitForward: false,
        hasHitReturn: false,
        radius: 14,
        damage: 115,
        guardType: 'all',
        skin: char.skin,
        life: 85
      });
      return;
    }

    // 奈米震波罩 (SK-09)：全方位圓形判定
    if (action.id === 'SK-09') {
      action.hitChecked = true;
      this.shockwaves.push({
        x: char.x,
        y: char.y - 70,
        radius: 10,
        maxRadius: 180,
        color: char.skin.themeColor,
        duration: 14
      });
      const dist = Math.abs(char.x - opp.x);
      if (dist < 190) {
        this._applyHit(char, opp, action);
      }
      return;
    }

    // 超載終結砲 (SK-10)：全螢幕巨光束
    if (action.id === 'SK-10') {
      action.hitChecked = true;
      this.shockwaves.push({
        x: char.x + char.facing * 500,
        y: char.y - 74,
        width: 1000,
        height: 50,
        isBeam: true,
        color: char.skin.themeColor,
        duration: 16
      });
      // 判定對手是否在前方
      const isInFront = (char.facing === 1 && opp.x > char.x) || (char.facing === -1 && opp.x < char.x);
      if (isInFront && opp.y >= this.floorY - 120) {
        this._applyHit(char, opp, action);
      }
      return;
    }

    // 常規近戰範圍判定 (擴大垂直 Y 軸判定，使空中跳躍與平台對戰順暢命中)
    const hitReach = action.id === 'SK-03' ? 130 : (action.id === 'SK-08' ? 100 : 90);
    const inRange = Math.abs(char.x - opp.x) <= hitReach && Math.abs(char.y - opp.y) <= 125;
    const isFacingOpp = (char.facing === 1 && opp.x >= char.x - 20) || (char.facing === -1 && opp.x <= char.x + 20);

    if (inRange && isFacingOpp) {
      action.hitChecked = true;

      // 幻影反擊壁 (SK-05) 檢驗：若對手正處於反擊姿態，且非投技，對手架招成功反打！
      if (opp.currentAction && opp.currentAction.id === 'SK-05' && action.guardType !== 'unblockable') {
        this._triggerParryCounter(opp, char);
        return;
      }

      this._applyHit(char, opp, action);
    }
  }

  // ─── 傷害計算與攻防三段三擇 ───
  _applyHit(char, opp, action) {
    let damage = action.damage || 50;
    let isBlocked = false;

    // 攻防三段核心規則：
    // 1. 指令摔 (unblockable)：不可防禦！
    if (action.guardType === 'unblockable') {
      isBlocked = false;
    }
    // 2. 中段破防 (stand_only)：蹲防強制破除！
    else if (action.guardType === 'stand_only') {
      if (opp.isGuarding && opp.guardStance === 'high') {
        isBlocked = true;
      } else {
        isBlocked = false; // 蹲防被破
      }
    }
    // 3. 下段突進 (crouch_only)：站防強制破除！
    else if (action.guardType === 'crouch_only') {
      if (opp.isGuarding && opp.guardStance === 'low') {
        isBlocked = true;
      } else {
        isBlocked = false; // 站防被破
      }
    }
    // 4. 常規攻擊 (all)：站防/蹲防皆可防
    else if (opp.isGuarding) {
      isBlocked = true;
    }

    // 破招判定 (Counter Hit)：若對手正處於出招前搖或判定中被打中
    const isCounter = !isBlocked && opp.currentAction && !opp.currentAction.hitChecked;
    if (isCounter) {
      damage = Math.round(damage * 1.25);
      announcerEngine.announceCounterHit();
    }

    // 連段傷害遞減修正 (Combo Scaling)
    if (char.comboCount > 0) {
      const comboScale = Math.max(0.55, 1.0 - char.comboCount * 0.08);
      damage = Math.max(12, Math.round(damage * comboScale));
    }

    // 格擋減傷機制：防護罩只能減少攻擊傷害，不能擋下所有傷害！
    if (isBlocked) {
      // 50% 傷害穿透防護罩，實質扣除血量
      damage = Math.max(12, Math.round(damage * 0.5));
      opp.hp = Math.max(0, opp.hp - damage);
      soundEngine.playHit('guard');
      this._triggerHaptic(25);

      // 受擊格擋擊退
      opp.vx = char.facing * 2.6;
      char.frameAdvantage = -4;

      // 格擋頓幀與輕微震屏
      this.hitStop = Math.max(this.hitStop, 2);
      this.triggerScreenShake(2);

      // 格擋量子火花特效
      const sparkX = (char.x + opp.x) / 2;
      const sparkY = opp.y - 70;
      this.hitSparks.push({
        type: 'shield_block',
        x: sparkX,
        y: sparkY,
        facing: char.facing,
        color: '#38bdf8',
        coreRadius: 16,
        life: 14,
        maxLife: 14,
        particles: Array.from({ length: 10 }, () => ({
          x: sparkX,
          y: sparkY,
          vx: (Math.random() - 0.5) * 8 - char.facing * 2,
          vy: (Math.random() - 0.5) * 8,
          life: 12,
          maxLife: 12,
          size: Math.random() * 3 + 2,
          color: Math.random() > 0.3 ? '#38bdf8' : '#e0f2fe'
        }))
      });

      this.floatingTexts.push({
        text: `SHIELD -${damage}`,
        x: opp.x,
        y: opp.y - 80,
        color: '#38bdf8',
        life: 32
      });
      return;
    }

    // 命中打擊！
    opp.hp = Math.max(0, opp.hp - damage);

    // 充能雙方之終極必殺計量槽 (Super Gauge) 與受擊方的量子爆發計量槽
    char.superMeter = Math.min(char.superMax, (char.superMeter || 0) + 45);
    opp.superMeter = Math.min(opp.superMax, (opp.superMeter || 0) + 60);
    opp.burstMeter = Math.min(opp.burstMax, opp.burstMeter + Math.round(damage * 0.9));

    // 連段累加與播報
    char.comboCount++;
    char.comboDamage += damage;
    char.comboResetTimer = 45; // 45 幀內再次命中算連段
    char.frameAdvantage = isCounter ? 7 : 4;   // 破招享有超長有利幀 (+7f)

    if (char.comboCount === 3 || char.comboCount === 5 || char.comboCount === 7 || char.comboCount === 10) {
      announcerEngine.announceCombo(char.comboCount);
    }

    // 命中頓幀 (Hit Stop) 與震屏 (Screen Shake)
    this.hitStop = Math.max(this.hitStop, isCounter ? 6 : (damage >= 80 ? 4 : 2));
    this.triggerScreenShake(isCounter ? 6.5 : (damage >= 80 ? 5 : 3));

    // 音效與觸覺震動
    if (action.knockdown || damage >= 150) {
      soundEngine.playHit('slam');
      this._triggerHaptic(80);
    } else if (isCounter) {
      soundEngine.playHit('counter');
      this._triggerHaptic(60);
    } else {
      soundEngine.playHit(action.name.includes('踢') ? 'kick' : 'punch');
      this._triggerHaptic(action.damage > 80 ? 50 : 20);
    }

    // 擊退與硬直 / 擊倒受身 / 空中浮空 (Air Juggle)
    if (action.knockdown) {
      opp.state = 'knockdown';
      opp.stateTime = 0;
      opp.vx = char.facing * 7.0; // 爽快擊倒擊退
      opp.vy = -4.5;
      opp.isGrounded = false;
    } else if (!opp.isGrounded) {
      // 空中受擊浮空 (Air Juggle)
      opp.state = 'hit_stun';
      opp.stateTime = 0;
      opp.stateDuration = 18;
      opp.vy = -4.0;
      opp.vx = char.facing * 3.0;
    } else {
      opp.state = 'hit_stun';
      opp.stateTime = 0;
      opp.stateDuration = isCounter ? 18 : 14;
      opp.vx = char.facing * 3.6; // 敏捷擊退
    }

    // 浮動提示文字
    if (isCounter) {
      this.floatingTexts.push({
        text: `★ COUNTER! -${damage}`,
        x: opp.x,
        y: opp.y - 110,
        color: '#ffd700',
        life: 45
      });
    } else {
      this.floatingTexts.push({
        text: `HIT! -${damage}`,
        x: opp.x,
        y: opp.y - 90,
        color: '#ff007f',
        life: 35
      });
    }

    if (!opp.isGrounded && !action.knockdown && char.comboCount >= 2) {
      this.floatingTexts.push({
        text: 'AIR JUGGLE!',
        x: opp.x,
        y: opp.y - 130,
        color: '#00f3ff',
        life: 35
      });
    }

    // 打擊爆裂火花特效 (Hit Sparks)
    const contactX = (char.x + opp.x) / 2 + (char.facing * 10);
    const contactY = opp.y - (action.name.includes('下蹲') ? 35 : (action.name.includes('踢') ? 65 : 75));
    const sparkColor = isCounter ? '#ffd700' : (damage >= 80 ? '#ff007f' : '#ff9900');
    const rayCount = damage >= 80 ? 8 : 5;

    this.hitSparks.push({
      type: isCounter ? 'counter_hit' : (damage >= 80 ? 'heavy_hit' : 'light_hit'),
      x: contactX,
      y: contactY,
      facing: char.facing,
      color: sparkColor,
      coreRadius: damage >= 80 ? 28 : 18,
      life: 18,
      maxLife: 18,
      rays: Array.from({ length: rayCount }, (_, i) => ({
        angle: (Math.PI * 2 / rayCount) * i + (Math.random() - 0.5) * 0.4,
        len: Math.random() * 25 + 20,
        width: Math.random() * 2 + 2
      })),
      particles: Array.from({ length: damage >= 80 ? 14 : 8 }, () => ({
        x: contactX,
        y: contactY,
        vx: (Math.random() - 0.5) * 12 + char.facing * 3,
        vy: (Math.random() - 0.5) * 12 - 2,
        life: Math.floor(Math.random() * 8 + 10),
        maxLife: 18,
        size: Math.random() * 3.5 + 2,
        color: isCounter ? '#ffd700' : (Math.random() > 0.4 ? '#ff007f' : '#ffff00')
      }))
    });
  }

  _triggerParryCounter(parryChar, attacker) {
    parryChar.currentAction.hitChecked = true;
    soundEngine.playHit('parry_trigger');
    this._triggerHaptic(60);
    this.hitStop = 6;
    this.triggerScreenShake(5);

    // 架招成功，反彈擊暈對手並給予反擊傷害
    attacker.state = 'hit_stun';
    attacker.stateTime = 0;
    attacker.stateDuration = 35; // 擊暈 35 幀
    attacker.hp = Math.max(0, attacker.hp - 190);

    // 架招翡翠爆裂火花
    this.hitSparks.push({
      type: 'parry',
      x: (parryChar.x + attacker.x) / 2,
      y: parryChar.y - 70,
      facing: parryChar.facing,
      color: '#00ff66',
      coreRadius: 30,
      life: 20,
      maxLife: 20,
      rays: Array.from({ length: 10 }, (_, i) => ({
        angle: (Math.PI * 2 / 10) * i,
        len: 35,
        width: 3
      })),
      particles: Array.from({ length: 16 }, () => ({
        x: (parryChar.x + attacker.x) / 2,
        y: parryChar.y - 70,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14,
        life: 16,
        maxLife: 16,
        size: 3.5,
        color: '#00ff88'
      }))
    });

    this.floatingTexts.push({
      text: 'PARRY COUNTER! -190',
      x: parryChar.x,
      y: parryChar.y - 110,
      color: '#00ff66',
      life: 45
    });
  }

  _checkPlatformHit(p) {
    if (!this.platforms) return false;
    for (const plat of this.platforms) {
      if (p.x >= plat.x && p.x <= plat.x + plat.width && Math.abs(p.y - plat.y) < 14) {
        return true;
      }
    }
    return false;
  }

  _updateProjectiles() {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      const target = p.ownerId === 1 ? this.p2 : this.p1;
      const owner = p.ownerId === 1 ? this.p1 : this.p2;

      // 1. 特殊彈道物理運算
      if (p.type === 'homing' && target) {
        // 導引微飛彈弧形轉彎追蹤
        const targetY = target.y - 48;
        const dx = target.x - p.x;
        const dy = targetY - p.y;
        p.vx += Math.sign(dx) * 0.48;
        p.vy += Math.sign(dy) * 0.42;
        p.vx = Math.max(-14, Math.min(14, p.vx));
        p.vy = Math.max(-9, Math.min(9, p.vy));
      } else if (p.type === 'bouncing') {
        // 幾何稜鏡反彈
        if ((p.x <= 35 && p.vx < 0) || (p.x >= this.arenaWidth - 35 && p.vx > 0)) {
          if ((p.bouncesLeft || 0) > 0) {
            p.bouncesLeft--;
            p.vx = -p.vx;
            soundEngine.playHit('laser_bounce');
            this.triggerScreenShake(2);
          }
        }
        if (p.y >= this.floorY - 8 && p.vy > 0) {
          if ((p.bouncesLeft || 0) > 0) {
            p.bouncesLeft--;
            p.vy = -Math.abs(p.vy) * 0.88;
            soundEngine.playHit('laser_bounce');
            this.triggerScreenShake(2);
          }
        }
      } else if (p.type === 'ground_wave') {
        // 地裂爬行波貼地滑行
        p.y = this.floorY - 14;
      } else if (p.type === 'vortex' && target) {
        // 虛空引力黑洞：將對手緩慢吸引向球心
        const dist = Math.abs(p.x - target.x);
        if (dist < 220) {
          target.vx += Math.sign(p.x - target.x) * 1.6;
        }
      } else if (p.type === 'funnel') {
        // 脈衝浮游砲無人機懸浮跟隨與自動開火
        if (owner) {
          const targetX = owner.x - owner.facing * 25 + (p.droneIndex === 0 ? -16 : 16);
          const targetY = owner.y + (p.offsetY || -70) + Math.sin((p.life || 0) * 0.12) * 6;
          p.x += (targetX - p.x) * 0.22;
          p.y += (targetY - p.y) * 0.22;
          p.fireTimer = (p.fireTimer || 18) - 1;
          if (p.fireTimer <= 0 && (p.shotsLeft || 0) > 0) {
            p.shotsLeft--;
            p.fireTimer = 34;
            soundEngine.playHit('laser');
            this.triggerScreenShake(2);
            this.projectiles.push({
              ownerId: p.ownerId,
              type: 'funnel_laser',
              name: '浮游砲聚焦脈衝光',
              x: p.x + owner.facing * 18,
              y: p.y,
              vx: owner.facing * 20,
              vy: 0,
              radius: 6,
              damage: 75,
              guardType: 'all',
              skin: p.skin,
              life: 38
            });
          }
        }
      } else if (p.type === 'grenade') {
        p.vy = (p.vy || 0) + 0.46; // 拋物線重力
      } else if (p.type === 'boomerang') {
        p.outwardFrames = (p.outwardFrames !== undefined ? p.outwardFrames : 30) - 1;
        if (p.outwardFrames > 0) {
          p.vx *= 0.93;
        } else if (owner) {
          const dx = owner.x - p.x;
          const dy = (owner.y - 50) - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 32 && p.outwardFrames < -10) {
            // 折返回到主人手中回收
            this.projectiles.splice(i, 1);
            continue;
          }
          p.vx += Math.sign(dx) * 1.6;
          p.vy = (p.vy || 0) + Math.sign(dy) * 0.9;
          p.vx = Math.max(-18, Math.min(18, p.vx));
          p.vy = Math.max(-11, Math.min(11, p.vy));
        }
      } else if (p.type === 'napalm_pool') {
        p.tickCooldown = (p.tickCooldown || 15) - 1;
        if (p.tickCooldown <= 0) {
          p.tickCooldown = 16;
          if (target && Math.abs(target.x - p.x) < (p.radius || 48) && Math.abs(target.y - p.y) < 35 && target.invincibleTimer <= 0) {
            this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
              name: '燃燒火海灼傷',
              damage: p.damage || 38,
              guardType: 'low',
              chipRatio: 0.5
            });
          }
        }
      }

      // 位置推進 (浮游砲與地火池維持自適應座標)
      if (p.type !== 'funnel' && p.type !== 'napalm_pool') {
        p.x += p.vx;
        if (p.vy) p.y += p.vy;
      }
      p.life--;

      // 2. 榴彈或空對地爆彈觸地 / 觸平台引爆判定
      if (p.type === 'grenade' && (p.y >= this.floorY - 6 || (p.vy > 0 && this._checkPlatformHit(p)))) {
        soundEngine.playHit('bomb_drop');
        this.triggerScreenShake(5);
        this.shockwaves.push({
          x: p.x,
          y: p.y,
          radius: 12,
          maxRadius: 75,
          color: '#ff4500',
          duration: 18
        });
        // 落地引爆為燃燒火海池
        this.projectiles.push({
          ownerId: p.ownerId,
          type: 'napalm_pool',
          name: '燃燒火海',
          x: p.x,
          y: p.y,
          vx: 0,
          vy: 0,
          radius: 52,
          damage: 38,
          guardType: 'low',
          skin: p.skin,
          life: 150,
          tickCooldown: 10
        });
        if (target && Math.abs(p.x - target.x) < 55 && Math.abs(p.y - target.y) < 60 && target.invincibleTimer <= 0) {
          this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
            name: '燃燒榴彈直擊',
            damage: p.damage,
            guardType: 'stand_only',
            knockdown: true
          });
        }
        this.projectiles.splice(i, 1);
        continue;
      }

      if (p.type === 'bomb' && (p.y >= this.floorY - 10 || (p.vy > 0 && this._checkPlatformHit(p)))) {
        soundEngine.playHit('bomb_drop');
        this.triggerScreenShake(5);
        this.shockwaves.push({
          x: p.x,
          y: p.y,
          radius: 8,
          maxRadius: 68,
          color: p.skin && p.skin.themeColor ? p.skin.themeColor : '#ff007f',
          duration: 16
        });
        if (target && Math.abs(p.x - target.x) < 70 && Math.abs(p.y - target.y) < 75 && target.invincibleTimer <= 0) {
          this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
            name: p.name || '空對地離子爆彈',
            damage: p.damage,
            guardType: p.guardType || 'stand_only',
            knockdown: true
          });
        }
        this.projectiles.splice(i, 1);
        continue;
      }

      // 浮游砲與地火池不受一般撞擊立即銷毀，只在壽命結束時移除
      if (p.type === 'funnel' || p.type === 'napalm_pool') {
        if (p.life <= 0) {
          this.projectiles.splice(i, 1);
        }
        continue;
      }

      // 3. 檢查碰撞命中對手
      const dist = Math.abs(p.x - target.x);
      const dy = Math.abs(p.y - (target.y - 45));
      const hitRadius = p.type === 'vortex' ? 42 : (p.type === 'heavy' ? 38 : (p.type === 'sniper' ? 42 : 34));
      const hitHeight = p.type === 'ground_wave' ? 42 : 64;

      if (dist < hitRadius && dy < hitHeight && target && target.invincibleTimer <= 0) {
        if (p.type === 'vortex') {
          // 引力黑洞多段判定
          p.tickCooldown = (p.tickCooldown || 0) - 1;
          if (p.tickCooldown <= 0) {
            p.tickCooldown = 12;
            this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
              name: p.name || '虛空引力黑洞球',
              damage: p.damage,
              guardType: p.guardType || 'all',
              chipRatio: 0.5
            });
          }
        } else if (p.type === 'boomerang') {
          if (p.outwardFrames > 0 && !p.hasHitForward) {
            p.hasHitForward = true;
            soundEngine.playHit('laser');
            this.triggerScreenShake(3);
            this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
              name: '迴旋雷霆光刃鏢 (前向)',
              damage: p.damage,
              guardType: 'all',
              chipRatio: 0.5
            });
            p.outwardFrames = 0; // 命中後即刻準備折返
          } else if (p.outwardFrames <= 0 && !p.hasHitReturn) {
            p.hasHitReturn = true;
            soundEngine.playHit('laser');
            this.triggerScreenShake(3);
            this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
              name: '迴旋雷霆光刃鏢 (折返背擊)',
              damage: p.damage,
              guardType: 'all',
              chipRatio: 0.5
            });
          }
        } else if (p.type === 'cryo_arrow') {
          target.frostTimer = 130;
          this.floatingTexts.push({
            text: '❄️ 極凍減速 45%',
            x: target.x,
            y: target.y - 85,
            color: '#00e5ff',
            life: 45
          });
          soundEngine.playHit('laser_bounce');
          this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
            name: p.name || '極凍冰霜穿透箭',
            damage: p.damage,
            guardType: 'all',
            chipRatio: 0.5
          });
          this.projectiles.splice(i, 1);
          continue;
        } else if (p.type === 'sniper') {
          this.triggerScreenShake(7);
          soundEngine.playHit('heavy_punch');
          this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
            name: p.name || '高斯狙擊穿甲重槍',
            damage: p.damage,
            guardType: 'all',
            chipRatio: 0.6,
            knockdown: true
          });
          p.pierce = (p.pierce || 1) - 1;
          if (p.pierce <= 0) {
            this.projectiles.splice(i, 1);
            continue;
          }
        } else {
          this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
            name: p.name || '量子遠程光彈',
            damage: p.damage,
            guardType: p.guardType || 'all',
            chipRatio: 0.5,
            knockdown: !!p.knockdown
          });
          this.projectiles.splice(i, 1);
          continue;
        }
      }

      // 4. 超出邊界或生命耗盡
      if (p.life <= 0 || p.x < 15 || p.x > this.arenaWidth - 15 || p.y > this.floorY + 35 || p.y < -120) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  _updateShockwaves() {
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const s = this.shockwaves[i];
      s.duration--;
      if (s.radius !== undefined) {
        s.radius += (s.maxRadius - s.radius) * 0.2;
      }
      if (s.duration <= 0) {
        this.shockwaves.splice(i, 1);
      }
    }
  }

  _updateHitSparks() {
    for (let i = this.hitSparks.length - 1; i >= 0; i--) {
      const s = this.hitSparks[i];
      s.life--;
      if (s.particles) {
        for (let p of s.particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.90;
          p.vy *= 0.90;
          p.life--;
        }
      }
      if (s.life <= 0) {
        this.hitSparks.splice(i, 1);
      }
    }
  }

  _updateFloatingTexts() {
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const t = this.floatingTexts[i];
      t.y -= 0.8;
      t.life--;
      if (t.life <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
  }

  _resolvePositions() {
    const p1 = this.p1;
    const p2 = this.p2;
    if (!p1 || !p2) return;

    // 1. 技能穿身或倒地/起身豁免 (Pass-through exemptions)
    // 音速滑踢 (SK-03) 貼地疾衝、折躍斬 (SK-05) 瞬移，或任一方處於倒地 (knockdown)、起身 (wakeup) 狀態時，完全豁免阻擋，允許自由穿身換邊
    const isP1Passing = (p1.state === 'skill' && p1.currentAction && (p1.currentAction.id === 'SK-03' || p1.currentAction.id === 'SK-05'));
    const isP2Passing = (p2.state === 'skill' && p2.currentAction && (p2.currentAction.id === 'SK-03' || p2.currentAction.id === 'SK-05'));
    const isP1Down = (p1.state === 'knockdown' || p1.state === 'wakeup');
    const isP2Down = (p2.state === 'knockdown' || p2.state === 'wakeup');

    if (isP1Passing || isP2Passing || isP1Down || isP2Down) {
      p1.x = Math.max(50, Math.min(this.arenaWidth - 50, p1.x));
      p2.x = Math.max(50, Math.min(this.arenaWidth - 50, p2.x));
      return;
    }

    // 2. 空中越頂跳躍檢測 (Jump Over / Cross-up)
    const dy = Math.abs(p1.y - p2.y);
    const p1Air = !p1.isGrounded;
    const p2Air = !p2.isGrounded;

    // 若有角色在空中且高度差超過 35px，代表處於越頂身位，完全不阻擋 X 軸移動，順暢越過對手頭頂換邊
    if ((p1Air || p2Air) && dy > 35) {
      p1.x = Math.max(50, Math.min(this.arenaWidth - 50, p1.x));
      p2.x = Math.max(50, Math.min(this.arenaWidth - 50, p2.x));
      return;
    }

    // 3. 空中近身交錯保護 (保持水平動量順勢越過，絕不硬阻彈回)
    if (p1Air || p2Air) {
      const dx = p2.x - p1.x;
      if (Math.abs(dx) < 40) {
        if (p1Air && Math.abs(p1.vx) > 0.5) {
          p1.x += Math.sign(p1.vx) * 2.5;
        } else if (p2Air && Math.abs(p2.vx) > 0.5) {
          p2.x += Math.sign(p2.vx) * 2.5;
        }
      }
      p1.x = Math.max(50, Math.min(this.arenaWidth - 50, p1.x));
      p2.x = Math.max(50, Math.min(this.arenaWidth - 50, p2.x));
      return;
    }

    // 4. 地面近身接觸與主動推擠換邊 (Ground Soft Collision & Slip-Through)
    const minDistance = 44;
    const dx = p2.x - p1.x;
    const dist = Math.abs(dx);

    if (dist < minDistance) {
      const p1Pushing = (p1.state === 'walk_fwd');
      const p2Pushing = (p2.state === 'walk_fwd');

      if (p1Pushing && !p2Pushing) {
        // P1 主動向前走推擠：P1 順暢前推滑過對手身側換邊
        p1.x += p1.facing * 2.2;
        p2.x -= p1.facing * 0.7;
      } else if (p2Pushing && !p1Pushing) {
        // P2 主動向前走推擠：P2 順暢前推滑過對手身側換邊
        p2.x += p2.facing * 2.2;
        p1.x -= p2.facing * 0.7;
      } else if (p1Pushing && p2Pushing) {
        // 雙方同時前推：順勢交錯互換身位
        p1.x += p1.facing * 1.6;
        p2.x += p2.facing * 1.6;
      } else {
        // 雙方均未主動推擠（待機/格擋/受擊）：維持正常站位軟隔離，防止重疊
        const push = (minDistance - dist) / 2;
        if (dx >= 0) {
          p1.x -= push;
          p2.x += push;
        } else {
          p1.x += push;
          p2.x -= push;
        }
      }
    }

    // 5. 邊界最終平滑限制 (完全開放至擂台邊緣，防止任何卡頓抽搐)
    p1.x = Math.max(45, Math.min(this.arenaWidth - 45, p1.x));
    p2.x = Math.max(45, Math.min(this.arenaWidth - 45, p2.x));
  }

  _handleTimeOver() {
    this.isOver = true;
    if (this.p1.hp > this.p2.hp) this.winner = 1;
    else if (this.p2.hp > this.p1.hp) this.winner = 2;
    else this.winner = 0;
    soundEngine.playHit('ko');
    this._triggerMatchEndStates();
  }

  _triggerHaptic(durationMs) {
    if (this.enableHaptics && typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(durationMs);
      } catch (e) {
        // Silent catch for browsers restricting vibration without user gesture
      }
    }
  }
}

export const combatEngine = new CombatEngine();
