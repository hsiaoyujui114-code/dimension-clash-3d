/**
 * 跨次元大亂鬥 (Dimension Clash Online) - 3D 戰鬥、飛行模式、全向位移與嚴格賽制系統
 * (3D Combat Engine with Flight Mode [F], Magnetic Hit Homing & Strict Match Outcome Tracking)
 */

class Fighter3D {
  constructor(charData, scene, level = 1, equippedGear = [], isPlayer = true) {
    this.charData = charData;
    this.scene = scene;
    this.level = Math.max(1, Math.min(100, level));
    this.equippedGear = equippedGear || [];
    this.isPlayer = isPlayer;

    // 3D Position & Velocity
    this.x = isPlayer ? -14 : 14;
    this.y = 0;
    this.z = isPlayer ? 4 : -4;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.rotationY = isPlayer ? Math.PI * 0.5 : -Math.PI * 0.5;

    // ── 飛行模式 (Flight & Hover Mechanics) ──
    this.canFly = !!charData.canFly;
    this.isFlying = false;
    this.flightTargetY = 6.0; // 飛行浮空高度

    this.isGrounded = true;
    this.jumpCount = 0;
    this.maxJumps = 2;

    this.calcStats();

    // Health & Combat state
    this.hp = this.maxHp;
    this.rage = 20;
    this.maxRage = 100;
    this.guardMeter = 100;
    this.maxGuardMeter = 100;

    this.state = "idle";
    this.stateTimer = 0;
    this.invulnerableTimer = 0;
    this.spawnShieldTimer = 2.0; // 2s spawn protection
    this.isCharging = false;
    this.chargeTime = 0;

    // Cooldowns
    this.skill1Cd = 0;
    this.skill2Cd = 0;
    this.ultCd = 0;
    this.gadgetUses = 2;

    // 3D Visual Mesh
    this.model = new Character3DModel(charData, scene, isPlayer);
    this.updatePosition();
  }

  calcStats() {
    const levelMultiplier = 1 + (this.level - 1) * 0.02;
    let bonusHp = 0;
    let bonusAtk = 0;
    let bonusDef = 0;
    let speedMod = 0;

    for (const gear of this.equippedGear) {
      if (!gear) continue;
      bonusHp += gear.bonusHp || 0;
      bonusAtk += gear.bonusAtk || 0;
      bonusDef += gear.bonusDef || 0;
      if (gear.speedBonus) speedMod += gear.speedBonus;
      if (gear.speedDebuff) speedMod += gear.speedDebuff;
    }

    this.maxHp = Math.round(this.charData.baseHp * levelMultiplier + bonusHp);
    this.atk = Math.round(this.charData.baseAtk * levelMultiplier + bonusAtk);
    this.def = Math.round(this.charData.baseDef + bonusDef);
    this.baseSpeed = (this.charData.speed || 6.5) * 2.2 * (1 + speedMod);
  }

  // ── [F] 飛行模式切換 (Toggle Flight / Hover) ──
  toggleFlight() {
    if (!this.canFly || this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    this.isFlying = !this.isFlying;

    if (this.isFlying) {
      this.isGrounded = false;
      this.vy = 0;
      if (window.soundEngine) window.soundEngine.playDodge();
    } else {
      this.vy = -5; // 降落
    }
  }

  update(dt, opponent) {
    if (this.skill1Cd > 0) this.skill1Cd = Math.max(0, this.skill1Cd - dt);
    if (this.skill2Cd > 0) this.skill2Cd = Math.max(0, this.skill2Cd - dt);
    if (this.ultCd > 0) this.ultCd = Math.max(0, this.ultCd - dt);
    if (this.invulnerableTimer > 0) this.invulnerableTimer = Math.max(0, this.invulnerableTimer - dt);
    if (this.spawnShieldTimer > 0) this.spawnShieldTimer = Math.max(0, this.spawnShieldTimer - dt);

    if (this.state !== "guard" && this.guardMeter < this.maxGuardMeter) {
      this.guardMeter = Math.min(this.maxGuardMeter, this.guardMeter + dt * 15);
    }

    if (this.stateTimer > 0) {
      this.stateTimer -= dt;
      if (this.stateTimer <= 0) {
        if (this.state === "hit" || this.state === "dizzy" || this.state.startsWith("attack") || this.state.startsWith("skill") || this.state === "dodge") {
          this.state = "idle";
        }
      }
    }

    if (this.isCharging) {
      this.chargeTime += dt;
      this.vx = 0;
      this.vz = 0;
      if (this.chargeTime >= 0.8) {
        this.releaseHeavyCharge(opponent);
      }
    }

    // ── 3D 物理與重力 / 飛行浮空運算 ──
    this.vx *= 0.82;
    this.vz *= 0.82;
    this.x += this.vx * dt;
    this.z += this.vz * dt;

    if (this.isFlying) {
      // 飛行模式：平滑升空並懸浮在空中
      this.y += (this.flightTargetY - this.y) * 8.0 * dt;
      this.vy = 0;
      this.isGrounded = false;
    } else {
      // 地面重力
      if (!this.isGrounded) {
        this.vy -= 38 * dt;
        this.y += this.vy * dt;

        if (this.y <= 0) {
          this.y = 0;
          this.vy = 0;
          this.isGrounded = true;
          this.jumpCount = 0;
          if (this.state === "jump" || this.state === "fall") {
            this.state = "idle";
          }
        }
      } else {
        this.y = 0;
      }
    }

    // Arena boundary limits
    const distFromCenter = Math.sqrt(this.x * this.x + this.z * this.z);
    const maxRadius = 42;
    if (distFromCenter > maxRadius) {
      const ratio = maxRadius / distFromCenter;
      this.x *= ratio;
      this.z *= ratio;
      this.vx = 0;
      this.vz = 0;
    }

    // Auto-face opponent
    if (opponent && (this.state === "idle" || this.state.startsWith("attack") || this.state.startsWith("skill"))) {
      const dx = opponent.x - this.x;
      const dz = opponent.z - this.z;
      this.rotationY = Math.atan2(dx, dz);
    }

    this.updatePosition();

    const isMoving = Math.abs(this.vx) > 0.5 || Math.abs(this.vz) > 0.5;
    this.model.updateAnimation(dt, this.state, isMoving, this.baseSpeed, this.isCharging, this.isFlying);
  }

  updatePosition() {
    if (this.model && this.model.group) {
      this.model.group.position.set(this.x, this.y, this.z);
      this.model.group.rotation.y = this.rotationY;
    }
  }

  // ─── 3D 四面八方全向走位 ───
  move3D(moveX, moveZ, cameraYaw = 0) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.state === "guard" || this.isCharging) return;

    const sin = Math.sin(cameraYaw);
    const cos = Math.cos(cameraYaw);

    const worldMoveX = moveX * cos + moveZ * sin;
    const worldMoveZ = -moveX * sin + moveZ * cos;

    const speedMultiplier = this.isFlying ? 1.35 : 1.0;
    this.vx = worldMoveX * this.baseSpeed * speedMultiplier;
    this.vz = worldMoveZ * this.baseSpeed * speedMultiplier;

    if (Math.abs(moveX) > 0.1 || Math.abs(moveZ) > 0.1) {
      this.rotationY = Math.atan2(worldMoveX, worldMoveZ);
      if (this.isGrounded && !this.state.startsWith("attack")) {
        this.state = "run";
      }
    } else if (this.isGrounded && this.state === "run") {
      this.state = "idle";
    }
  }

  jump() {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.isCharging) return;
    if (this.isFlying) {
      this.isFlying = false; // 飛行中跳躍鍵可切換降落
      return;
    }
    if (this.isGrounded) {
      this.vy = 18;
      this.isGrounded = false;
      this.jumpCount = 1;
      this.state = "jump";
    } else if (this.jumpCount < this.maxJumps) {
      this.vy = 16;
      this.jumpCount++;
      this.state = "jump";
    }
  }

  guard(active) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.isCharging) return;
    if (active && this.guardMeter > 10) {
      this.state = "guard";
      this.vx = 0;
      this.vz = 0;
    } else if (!active && this.state === "guard") {
      this.state = "idle";
    }
  }

  dodge() {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.state === "dodge") return;
    this.state = "dodge";
    this.stateTimer = 0.35;
    this.invulnerableTimer = 0.3;

    const forwardX = Math.sin(this.rotationY);
    const forwardZ = Math.cos(this.rotationY);
    this.vx = forwardX * this.baseSpeed * 2.8;
    this.vz = forwardZ * this.baseSpeed * 2.8;

    if (window.soundEngine) window.soundEngine.playDodge();
  }

  // ─── [J] 普通攻擊 (磁性貼身突進) ───
  lightAttack(opponent) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.isCharging) return;

    this.state = "attack_1";
    this.stateTimer = 0.3;

    if (opponent) {
      const dx = opponent.x - this.x;
      const dz = opponent.z - this.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      this.rotationY = Math.atan2(dx, dz);

      if (dist < 14.0 && !this.isFlying) {
        const stepDist = Math.min(dist * 0.45, 6.5);
        this.vx = (dx / (dist || 1)) * stepDist * 4.0;
        this.vz = (dz / (dist || 1)) * stepDist * 4.0;
      }
    }

    if (window.soundEngine) window.soundEngine.playHit("light");

    if (opponent) {
      const dist = this.getDist3D(opponent);
      if (dist <= (this.isFlying ? 12.0 : 8.5)) {
        opponent.takeDamage(Math.round(this.atk * 0.55), this, false, false);
        this.gainRage(10);
      }
    }
  }

  // ─── [K] 蓄力破防重擊 ───
  startHeavyCharge() {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    this.isCharging = true;
    this.chargeTime = 0;
    this.state = "heavy_charge";
  }

  releaseHeavyCharge(opponent) {
    if (!this.isCharging) return;
    this.isCharging = false;
    const isFull = this.chargeTime >= 0.6;
    this.state = "heavy_release";
    this.stateTimer = 0.4;

    if (opponent) {
      const dx = opponent.x - this.x;
      const dz = opponent.z - this.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      this.rotationY = Math.atan2(dx, dz);
      this.vx = (dx / (dist || 1)) * (isFull ? 22 : 14);
      this.vz = (dz / (dist || 1)) * (isFull ? 22 : 14);
    }

    if (window.soundEngine) window.soundEngine.playHit("heavy");

    if (opponent) {
      const dist = this.getDist3D(opponent);
      if (dist <= 11.5) {
        opponent.takeDamage(Math.round(this.atk * (isFull ? 1.6 : 1.0)), this, isFull, true);
        this.gainRage(20);
      }
    }
  }

  // ─── [O] 近身抓技摔投 ───
  grab(opponent) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    this.state = "grab";
    this.stateTimer = 0.45;

    if (opponent) {
      const dx = opponent.x - this.x;
      const dz = opponent.z - this.z;
      this.rotationY = Math.atan2(dx, dz);
      const dist = this.getDist3D(opponent);

      if (dist <= 7.0) {
        opponent.takeDamage(Math.round(this.atk * 1.1), this, true, true);
        opponent.vy = 14;
        const fwdX = Math.sin(this.rotationY);
        const fwdZ = Math.cos(this.rotationY);
        opponent.vx = fwdX * 24;
        opponent.vz = fwdZ * 24;
        if (window.soundEngine) window.soundEngine.playHit("heavy");
      }
    }
  }

  // ─── [U] 戰術小招 1 ───
  useSkill1(opponent) {
    if (this.skill1Cd > 0 || this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    const skill = this.charData.skills.skill1;
    this.skill1Cd = skill.cd;
    this.state = "skill1";
    this.stateTimer = 0.4;

    if (opponent) {
      this.rotationY = Math.atan2(opponent.x - this.x, opponent.z - this.z);
    }
    if (window.soundEngine) window.soundEngine.playKiBlast();

    if (opponent) {
      const dist = this.getDist3D(opponent);
      if (dist <= 28.0) {
        opponent.takeDamage(Math.round(this.atk * 0.95), this, false, false);
        this.gainRage(14);
      }
    }
  }

  // ─── [I] 戰術小招 2 ───
  useSkill2(opponent) {
    if (this.skill2Cd > 0 || this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    const skill = this.charData.skills.skill2;
    this.skill2Cd = skill.cd;
    this.state = "skill2";
    this.stateTimer = 0.5;

    if (opponent) {
      this.rotationY = Math.atan2(opponent.x - this.x, opponent.z - this.z);
    }
    if (window.soundEngine) window.soundEngine.playHit("heavy");

    if (opponent) {
      const dist = this.getDist3D(opponent);
      if (dist <= 18.0) {
        opponent.takeDamage(Math.round(this.atk * 1.3), this, false, true);
        opponent.vy = 15;
        this.gainRage(18);
      }
    }
  }

  // ─── [L] 終極奧義大招 ───
  useUlt(opponent) {
    if (this.rage < 100 || this.ultCd > 0 || this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    const ult = this.charData.skills.ult;
    this.rage = 0;
    this.ultCd = ult.cd;
    this.state = "ult";
    this.stateTimer = 1.4;
    this.invulnerableTimer = 1.4;

    if (window.effectsEngine) {
      window.effectsEngine.triggerCutin(this.charData.name, ult.name, this.charData.themeColor, 1.4);
    }

    if (opponent) {
      setTimeout(() => {
        if (opponent && opponent.hp > 0) {
          opponent.takeDamage(Math.round(this.atk * 3.5), this, true, true);
        }
      }, 500);
    }
  }

  // ─── [B] 極限爆發脫身 ───
  useBurst(opponent) {
    if (this.rage < 50 || this.state === "ko") return;
    this.rage -= 50;
    this.state = "burst";
    this.stateTimer = 0.4;
    this.invulnerableTimer = 0.8;
    this.vx = 0;
    this.vz = 0;

    if (window.soundEngine) window.soundEngine.playBurst();

    if (opponent) {
      const dist = this.getDist3D(opponent);
      if (dist <= 16.0) {
        const fwdX = opponent.x - this.x;
        const fwdZ = opponent.z - this.z;
        const len = Math.sqrt(fwdX * fwdX + fwdZ * fwdZ) || 1;
        opponent.vx = (fwdX / len) * 26;
        opponent.vz = (fwdZ / len) * 26;
        opponent.vy = 10;
        opponent.takeDamage(Math.round(this.atk * 0.35), this, true, false);
      }
    }
  }

  takeDamage(amount, attacker, isGuardBreak = false, isHeavy = false) {
    if (this.invulnerableTimer > 0 || this.spawnShieldTimer > 0 || this.state === "ko") return;

    let finalDamage = amount;

    if (this.state === "guard" && !isGuardBreak) {
      finalDamage = Math.round(amount * 0.2);
      this.guardMeter -= 25;
      if (window.soundEngine) window.soundEngine.playGuard();
      if (this.guardMeter <= 0) {
        this.guardMeter = 0;
        this.state = "dizzy";
        this.stateTimer = 1.5;
        if (window.soundEngine) window.soundEngine.playHit("guard_break");
      }
    } else {
      this.state = isHeavy ? "dizzy" : "hit";
      this.stateTimer = isHeavy ? 0.45 : 0.22;
      if (window.soundEngine) window.soundEngine.playHit(isHeavy ? "heavy" : "light");
    }

    this.hp -= finalDamage;
    this.gainRage(Math.round(finalDamage * 0.12));

    if (this.hp <= 0) {
      this.hp = 0;
      this.state = "ko";
      if (window.soundEngine) window.soundEngine.playKO();
    }
  }

  gainRage(amt) {
    this.rage = Math.min(this.maxRage, this.rage + amt);
  }

  getDist3D(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    const dz = other.z - this.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  destroy() {
    if (this.model) this.model.destroy();
  }
}

// ── 3D KOF 式輪替賽制管理器 ──
class MatchEngine3D {
  constructor() {
    this.scene = null;
    this.team1Roster = [];
    this.team2Roster = [];
    this.p1Current = null;
    this.p2Current = null;
    this.p1Index = 0;
    this.p2Index = 0;

    this.matchState = "standby";
    this.mode = "kof";
    this.isRanked = false;
    this.currentBossFloor = 0;
    this.assistCooldown = 0;
    this.onMatchEnd = null;
  }

  init(scene) {
    this.scene = scene;
  }

  startMatch(p1RosterData, p2RosterData, mode = "kof", isRanked = false, bossFloor = 0) {
    if (this.p1Current) this.p1Current.destroy();
    if (this.p2Current) this.p2Current.destroy();

    this.mode = mode;
    this.isRanked = isRanked;
    this.currentBossFloor = bossFloor;
    this.p1Index = 0;
    this.p2Index = 0;
    this.team1Roster = p1RosterData;
    this.team2Roster = p2RosterData;

    this.spawnFighters();
    this.assistCooldown = 0;

    this.matchState = "pre_match";
    this.showPreMatchOverlay();

    if (window.soundEngine) {
      window.soundEngine.startBgm();
    }
  }

  spawnFighters() {
    const p1Data = this.team1Roster[this.p1Index];
    const p2Data = this.team2Roster[this.p2Index];

    this.p1Current = new Fighter3D(p1Data, this.scene, this.isRanked ? 100 : (p1Data.userLevel || 1), p1Data.equippedGear, true);
    this.p2Current = new Fighter3D(p2Data, this.scene, this.isRanked ? 100 : (p2Data.rarity * 10), [], false);

    // 每次角色更換時，動態更新右下角專屬按鍵介面
    if (window.app) {
      window.app.updateActionButtonsForFighter(p1Data);
    }
  }

  confirmStartMatch() {
    if (this.matchState === "pre_match") {
      this.matchState = "fighting";
      this.hideOverlay();
      if (window.soundEngine) window.soundEngine.playHit("heavy");
    } else if (this.matchState === "waiting_spawn_p1" || this.matchState === "waiting_spawn_p2") {
      this.confirmNextFighterSpawn();
    }
  }

  confirmNextFighterSpawn() {
    if (this.matchState === "waiting_spawn_p1") {
      this.p1Index++;
      if (this.p1Index < this.team1Roster.length) {
        if (this.p1Current) this.p1Current.destroy();
        const nextP1 = this.team1Roster[this.p1Index];
        this.p1Current = new Fighter3D(nextP1, this.scene, this.isRanked ? 100 : (nextP1.userLevel || 1), nextP1.equippedGear, true);
        this.p2Current.invulnerableTimer = 2.0;
        this.matchState = "fighting";
        this.hideOverlay();
        if (window.app) window.app.updateActionButtonsForFighter(nextP1);
      } else {
        this.finishMatch(false);
      }
    } else if (this.matchState === "waiting_spawn_p2") {
      this.p2Index++;
      if (this.p2Index < this.team2Roster.length) {
        if (this.p2Current) this.p2Current.destroy();
        const nextP2 = this.team2Roster[this.p2Index];
        this.p2Current = new Fighter3D(nextP2, this.scene, this.isRanked ? 100 : (nextP2.rarity * 10), [], false);
        this.p1Current.invulnerableTimer = 2.0;
        this.matchState = "fighting";
        this.hideOverlay();
      } else {
        this.finishMatch(true);
      }
    }
  }

  showPreMatchOverlay() {
    const overlay = document.getElementById("battleOverlay");
    if (!overlay) return;

    const p1 = this.team1Roster[this.p1Index];
    const canFly = !!p1.canFly;

    overlay.innerHTML = `
      <div class="battle-overlay-card">
        <h2 style="font-size: 24px; font-weight: 900; color: #facc15; margin-bottom: 12px;">⚔️ 3D 對決準備就緒</h2>
        <div style="font-size: 13px; color: #cbd5e1; line-height: 1.8; margin-bottom: 16px;">
          <b>🎮 首發英雄【${p1.name}】專屬指令：</b><br>
          • <b>[ W / A / S / D ]</b>：四面八方 360 度走位<br>
          • <b>[ Space ]</b>：3D 跳躍 ｜ <b>[ Shift ]</b>：翻滾閃避 ｜ <b>[ S ]</b>：防禦格擋<br>
          ${canFly ? '• <b style="color:#38bdf8;">[ F 鍵 ]</b>：<b>起飛升空 / 舞空術懸浮飛行 (可空中全向作戰)</b><br>' : ''}
          • <b>[ J ]</b>：${p1.attackConfig.light.name}<br>
          • <b>[ K ]</b>：${p1.attackConfig.heavy.name}<br>
          • <b>[ O ]</b>：${p1.attackConfig.grab.name}<br>
          • <b>[ U ]</b>：小招1【${p1.skills.skill1.name}】 ｜ <b>[ I ]</b>：小招2【${p1.skills.skill2.name}】<br>
          • <b>[ L ]</b>：奧義【${p1.skills.ult.name}】 ｜ <b>[ Q/E ]</b>：隊友援護 ｜ <b>[ B ]</b>：極限爆發
        </div>
        <button class="btn-primary" style="font-size: 18px; padding: 12px 32px; width: 100%; justify-content: center;" onclick="window.matchEngine3D.confirmStartMatch()">
          👉 按 [Enter] 鍵 開始戰鬥！
        </button>
      </div>
    `;
    overlay.style.display = "flex";
  }

  showNextFighterSpawnOverlay(isPlayerFighter, nextHeroName) {
    const overlay = document.getElementById("battleOverlay");
    if (!overlay) return;

    overlay.innerHTML = `
      <div class="battle-overlay-card">
        <h3 style="font-size: 22px; font-weight: 900; color: ${isPlayerFighter ? '#38bdf8' : '#ef4444'}; margin-bottom: 10px;">
          ${isPlayerFighter ? '⚠️ 角色倒下！準備派出下一位英雄' : '🔥 擊敗對手！迎戰下一位敵人'}
        </h3>
        <p style="font-size: 15px; color: #f8fafc; margin-bottom: 16px;">
          即將登場：<b style="color: #facc15;">【 ${nextHeroName} 】</b> (享有 2 秒登場無敵護盾)
        </p>
        <button class="btn-primary" style="font-size: 16px; padding: 10px 28px; width: 100%; justify-content: center;" onclick="window.matchEngine3D.confirmNextFighterSpawn()">
          👉 按 [Enter] 鍵 讓下一隻角色登場！
        </button>
      </div>
    `;
    overlay.style.display = "flex";
  }

  hideOverlay() {
    const overlay = document.getElementById("battleOverlay");
    if (overlay) overlay.style.display = "none";
  }

  callAssist() {
    if (this.assistCooldown > 0 || this.matchState !== "fighting") return;
    const nextFighter = this.team1Roster[this.p1Index + 1];
    if (!nextFighter) return;

    this.assistCooldown = 20;
    if (window.soundEngine) window.soundEngine.playHit("heavy");

    if (this.p2Current && this.p1Current) {
      this.p2Current.takeDamage(Math.round(this.p1Current.atk * 1.1), this.p1Current, false, true);
    }
  }

  update(dt) {
    if (this.matchState === "standby" || this.matchState === "pre_match" || this.matchState.startsWith("waiting")) return;

    if (this.assistCooldown > 0) {
      this.assistCooldown = Math.max(0, this.assistCooldown - dt);
    }

    if (this.p1Current && this.p2Current && this.matchState === "fighting") {
      this.p1Current.update(dt, this.p2Current);
      this.p2Current.update(dt, this.p1Current);

      if (this.p1Current.hp <= 0) {
        if (this.p1Index + 1 < this.team1Roster.length) {
          const nextName = this.team1Roster[this.p1Index + 1].name;
          this.matchState = "waiting_spawn_p1";
          this.showNextFighterSpawnOverlay(true, nextName);
        } else {
          this.finishMatch(false);
        }
      } else if (this.p2Current.hp <= 0) {
        if (this.p2Index + 1 < this.team2Roster.length) {
          const nextName = this.team2Roster[this.p2Index + 1].name;
          this.matchState = "waiting_spawn_p2";
          this.showNextFighterSpawnOverlay(false, nextName);
        } else {
          this.finishMatch(true);
        }
      }
    }
  }

  finishMatch(isPlayerWinner) {
    this.matchState = "match_over";
    if (window.soundEngine) {
      if (isPlayerWinner) window.soundEngine.playVictory();
      else window.soundEngine.playKO();
    }

    const isSweep = this.p1Index === 0 && this.team2Roster.length >= 3;
    const isSweep1v5 = isPlayerWinner && this.p1Index === 0 && this.team2Roster.length >= 5;

    let rewardGold = isPlayerWinner ? (this.mode === "boss_rush" ? 1500 : 800) : 200;
    if (isSweep) rewardGold *= 2;

    if (this.onMatchEnd) {
      this.onMatchEnd({
        winner: isPlayerWinner ? "player" : "opponent",
        isSweep,
        isSweep1v5,
        bossFloor: this.currentBossFloor,
        mode: this.mode,
        gold: rewardGold,
        p1DefeatedCount: this.p2Index,
        p2DefeatedCount: this.p1Index
      });
    }
  }
}

if (typeof window !== "undefined") {
  window.Fighter3D = Fighter3D;
  window.MatchEngine3D = MatchEngine3D;
  window.matchEngine3D = new MatchEngine3D();
}
