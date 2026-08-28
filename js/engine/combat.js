/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * 核心戰鬥、KOF 輪替賽制、援護與爆發系統引擎 (Core Combat & KOF Relay Engine)
 */

class Fighter {
  constructor(charData, level = 1, equippedGear = [], isPlayer = true) {
    this.charData = charData;
    this.level = Math.max(1, Math.min(100, level));
    this.equippedGear = equippedGear || [];
    this.isPlayer = isPlayer;

    // Physical dimensions & position
    this.width = 54;
    this.height = 80;
    this.x = isPlayer ? 350 : 1050;
    this.y = 460;
    this.vx = 0;
    this.vy = 0;
    this.facing = isPlayer ? 1 : -1;
    this.isGrounded = true;
    this.jumpCount = 0;
    this.maxJumps = 2; // Supports double jump

    // Calculate base + level + gear stats
    this.calcStats();

    // Combat State
    this.hp = this.maxHp;
    this.rage = 20; // Initial starter rage
    this.maxRage = 100;
    this.guardMeter = 100;
    this.maxGuardMeter = 100;

    this.state = "idle"; // idle, walk, run, jump, fall, guard, dodge, attack_1..4, heavy_charge, heavy_release, grab, skill1, skill2, ult, burst, hit, dizzy, down, ko
    this.stateTimer = 0;
    this.attackTimer = 0;
    this.hitstunTimer = 0;
    this.invulnerableTimer = 0;
    this.spawnShieldTimer = 2.0; // 2s spawn invulnerability
    this.chargeTime = 0;
    this.isCharging = false;

    // Skill cooldowns (in seconds)
    this.skill1Cd = 0;
    this.skill2Cd = 0;
    this.ultCd = 0;
    this.gadgetUses = 2; // 2 uses per match

    // Combos & Tracking
    this.comboHitCount = 0;
    this.comboDamageSum = 0;
    this.comboResetTimer = 0;

    // Equipment & Passive flags
    this.ntdTriggered = false;
    this.senzuUsed = false;
    this.nanoRepairActive = false;
    this.nanoRepairTimer = 0;
    this.zeroSystemAlert = false;
  }

  calcStats() {
    // Level scaling: +2% per level (Lv100 is 300% of Lv1)
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
    this.baseSpeed = this.charData.speed * (1 + speedMod);
  }

  setState(newState, duration = 0) {
    this.state = newState;
    this.stateTimer = duration;
  }

  update(dt, opponent, match) {
    // Cooldown ticks
    if (this.skill1Cd > 0) this.skill1Cd = Math.max(0, this.skill1Cd - dt);
    if (this.skill2Cd > 0) this.skill2Cd = Math.max(0, this.skill2Cd - dt);
    if (this.ultCd > 0) this.ultCd = Math.max(0, this.ultCd - dt);
    if (this.invulnerableTimer > 0) this.invulnerableTimer = Math.max(0, this.invulnerableTimer - dt);
    if (this.spawnShieldTimer > 0) this.spawnShieldTimer = Math.max(0, this.spawnShieldTimer - dt);

    // Guard meter recovery
    if (this.state !== "guard" && this.guardMeter < this.maxGuardMeter) {
      this.guardMeter = Math.min(this.maxGuardMeter, this.guardMeter + dt * 15);
    }

    // Passive & Gear: NT-D Trigger (under 40% HP)
    const hasNtd = this.equippedGear.some(g => g && g.id === "ntd_system_chip");
    if (hasNtd && !this.ntdTriggered && this.hp < this.maxHp * 0.4) {
      this.ntdTriggered = true;
      this.atk = Math.round(this.atk * 1.35);
      this.skill1Cd = 0;
      this.skill2Cd = 0;
      if (window.effectsEngine) {
        window.effectsEngine.addFloatingText("NT-D DESTROY MODE!", this.x, this.y - 60, "#ef4444", true);
        window.effectsEngine.createExplosion(this.x, this.y - 40, "#ef4444", 25, 1.5);
      }
    }

    // Passive & Gear: Nano Repair Injector (under 30% HP)
    const hasNanoRepair = this.equippedGear.some(g => g && g.id === "nano_repair_injector");
    if (hasNanoRepair && this.hp < this.maxHp * 0.3 && !this.nanoRepairActive && this.nanoRepairTimer === 0) {
      this.nanoRepairActive = true;
      this.nanoRepairTimer = 5;
    }
    if (this.nanoRepairActive && this.nanoRepairTimer > 0) {
      this.nanoRepairTimer -= dt;
      const healAmt = Math.round(this.maxHp * 0.03 * dt);
      this.hp = Math.min(this.maxHp, this.hp + healAmt);
      if (this.nanoRepairTimer <= 0) {
        this.nanoRepairActive = false;
      }
    }

    // Passive & Gear: ZERO System Warning Indicator
    const hasZero = this.equippedGear.some(g => g && g.id === "zero_system_chip") || this.charData.id === "wing_gundam_zero";
    if (hasZero && opponent && opponent.state === "ult") {
      this.zeroSystemAlert = true;
    } else {
      this.zeroSystemAlert = false;
    }

    // State timers
    if (this.stateTimer > 0) {
      this.stateTimer -= dt;
      if (this.stateTimer <= 0) {
        if (this.state === "hit" || this.state === "dizzy" || this.state.startsWith("attack") || this.state.startsWith("skill") || this.state === "dodge") {
          this.setState("idle");
        }
      }
    }

    // Charging heavy attack
    if (this.isCharging) {
      this.chargeTime += dt;
      this.vx = 0;
      if (this.chargeTime >= 0.8) {
        // Auto release fully charged break attack
        this.releaseHeavyCharge(opponent);
      }
    }

    // Auto facing when idle or walking
    if (opponent && (this.state === "idle" || this.state === "walk")) {
      this.facing = opponent.x > this.x ? 1 : -1;
    }

    // Physics integration
    if (window.physicsEngine) {
      window.physicsEngine.updateFighter(this, dt);
    }
  }

  // ─── 行動指令方法 ───
  move(dir) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.state === "guard" || this.isCharging) return;
    this.vx = dir * this.baseSpeed;
    this.facing = dir;
    if (this.isGrounded && this.state !== "attack_1" && this.state !== "attack_2" && this.state !== "attack_3") {
      this.setState("walk");
    }
  }

  dash(dir) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.state === "guard" || this.isCharging) return;
    this.vx = dir * this.baseSpeed * 2.2;
    this.facing = dir;
    this.setState("run", 0.35);
    if (window.soundEngine) window.soundEngine.playDodge();
    if (window.effectsEngine) {
      window.effectsEngine.createSlashWave(this.x, this.y - 30, dir, this.charData.themeColor, 0.8);
    }
  }

  jump() {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.isCharging) return;
    if (this.isGrounded) {
      this.vy = -14;
      this.isGrounded = false;
      this.jumpCount = 1;
      this.setState("jump");
    } else if (this.jumpCount < this.maxJumps) {
      // Double jump
      this.vy = -12;
      this.jumpCount++;
      this.setState("jump");
      if (window.effectsEngine) {
        window.effectsEngine.addParticle({
          x: this.x,
          y: this.y - 10,
          size: 8,
          growth: 1.5,
          color: "#38bdf8",
          maxLife: 0.2,
          shape: "ring"
        });
      }
    }
  }

  guard(active) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.isCharging) return;
    if (active && this.isGrounded && this.guardMeter > 10) {
      this.setState("guard");
      this.vx = 0;
    } else if (!active && this.state === "guard") {
      this.setState("idle");
    }
  }

  dodge() {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.state === "dodge") return;
    this.setState("dodge", 0.35);
    this.invulnerableTimer = 0.3; // 0.3s i-frame
    this.vx = this.facing * this.baseSpeed * 2.5;
    if (window.soundEngine) window.soundEngine.playDodge();
    if (window.effectsEngine) {
      window.effectsEngine.addParticle({
        x: this.x,
        y: this.y - 40,
        size: 15,
        growth: 2,
        color: this.charData.themeColor,
        maxLife: 0.2,
        shape: "ring"
      });
    }
  }

  lightAttack(opponent) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.isCharging) return;

    if (!this.isGrounded) {
      // Aerial Attack
      this.airAttack(opponent);
      return;
    }

    // 3 to 4 stage combo
    let attackStage = 1;
    if (this.state === "attack_1") attackStage = 2;
    else if (this.state === "attack_2") attackStage = 3;
    else if (this.state === "attack_3") attackStage = 4;

    this.setState(`attack_${attackStage}`, 0.28);
    this.attackTimer = 0.28;
    this.vx = this.facing * 3.5; // Slight forward lunge

    if (window.soundEngine) window.soundEngine.playHit("light");

    // Hitbox check
    if (opponent) {
      const hitbox = window.physicsEngine.getHitbox(this, "light");
      const hurtbox = window.physicsEngine.getHurtbox(opponent);

      if (window.physicsEngine.checkAABB(hitbox, hurtbox)) {
        const damage = Math.round((this.atk * 0.45) * (1 + attackStage * 0.15));
        opponent.takeDamage(damage, this, false, false);
        this.gainRage(8);
      }
    }
  }

  startHeavyCharge() {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || !this.isGrounded) return;
    this.isCharging = true;
    this.chargeTime = 0;
    this.setState("heavy_charge");
  }

  releaseHeavyCharge(opponent) {
    if (!this.isCharging) return;
    this.isCharging = false;
    const isFullCharge = this.chargeTime >= 0.7;
    this.setState("heavy_release", 0.4);
    this.vx = this.facing * (isFullCharge ? 9 : 5);

    if (window.soundEngine) window.soundEngine.playHit("heavy");
    if (window.effectsEngine) {
      window.effectsEngine.createSlashWave(this.x + this.facing * 30, this.y - 40, this.facing, "#f59e0b", isFullCharge ? 1.8 : 1.2);
    }

    if (opponent) {
      const hitbox = window.physicsEngine.getHitbox(this, "heavy");
      const hurtbox = window.physicsEngine.getHurtbox(opponent);

      if (window.physicsEngine.checkAABB(hitbox, hurtbox)) {
        const damage = Math.round(this.atk * (isFullCharge ? 1.4 : 0.85));
        opponent.takeDamage(damage, this, isFullCharge, true);
        this.gainRage(18);
      }
    }
  }

  airAttack(opponent) {
    this.setState("air_attack", 0.35);
    this.vy = 8; // Downward slam dive
    this.vx = this.facing * 5;

    if (window.soundEngine) window.soundEngine.playHit("slash");

    if (opponent) {
      const hitbox = window.physicsEngine.getHitbox(this, "light");
      const hurtbox = window.physicsEngine.getHurtbox(opponent);
      if (window.physicsEngine.checkAABB(hitbox, hurtbox)) {
        const damage = Math.round(this.atk * 0.7);
        opponent.takeDamage(damage, this, false, false);
        this.gainRage(10);
      }
    }
  }

  grab(opponent) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || !this.isGrounded) return;
    this.setState("grab", 0.45);
    this.vx = this.facing * 4;

    if (opponent) {
      const hitbox = window.physicsEngine.getHitbox(this, "grab");
      const hurtbox = window.physicsEngine.getHurtbox(opponent);

      if (window.physicsEngine.checkAABB(hitbox, hurtbox)) {
        // Unblockable Grab Slam!
        const damage = Math.round(this.atk * 0.95);
        opponent.takeDamage(damage, this, true, true, true);
        opponent.vx = this.facing * 14;
        opponent.vy = -8;
        if (window.soundEngine) window.soundEngine.playHit("heavy");
        if (window.effectsEngine) {
          window.effectsEngine.createExplosion(opponent.x, opponent.y - 30, "#a855f7", 20, 1.2);
          window.effectsEngine.addFloatingText("GRAB SLAM!", opponent.x, opponent.y - 60, "#a855f7", true);
        }
      }
    }
  }

  useSkill1(opponent) {
    if (this.skill1Cd > 0 || this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    const skill = this.charData.skills.skill1;
    this.skill1Cd = skill.cd;
    this.setState("skill1", 0.4);
    this.vx = this.facing * 7;

    if (window.soundEngine) window.soundEngine.playKiBlast();
    if (window.effectsEngine) {
      if (skill.type.includes("beam") || skill.type.includes("rifle")) {
        window.effectsEngine.spawnBeam({
          owner: this,
          startX: this.x + this.facing * 30,
          startY: this.y - 45,
          endX: this.x + this.facing * 450,
          color: this.charData.themeColor,
          damage: Math.round(this.atk * 0.9)
        });
      } else {
        window.effectsEngine.spawnProjectile({
          owner: this,
          x: this.x + this.facing * 30,
          y: this.y - 45,
          vx: this.facing * 12,
          color: this.charData.themeColor,
          damage: Math.round(this.atk * 0.85)
        });
      }
    }

    if (opponent) {
      const hitbox = window.physicsEngine.getHitbox(this, "skill1");
      const hurtbox = window.physicsEngine.getHurtbox(opponent);
      if (window.physicsEngine.checkAABB(hitbox, hurtbox)) {
        const damage = Math.round(this.atk * 0.9);
        opponent.takeDamage(damage, this, false, false);
        this.gainRage(12);
      }
    }
  }

  useSkill2(opponent) {
    if (this.skill2Cd > 0 || this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    const skill = this.charData.skills.skill2;
    this.skill2Cd = skill.cd;
    this.setState("skill2", 0.5);
    this.vx = this.facing * 5;

    if (window.soundEngine) window.soundEngine.playHit("heavy");
    if (window.effectsEngine) {
      window.effectsEngine.createExplosion(this.x + this.facing * 60, this.y - 40, this.charData.themeColor, 18, 1.4);
    }

    if (opponent) {
      const hitbox = window.physicsEngine.getHitbox(this, "skill2");
      const hurtbox = window.physicsEngine.getHurtbox(opponent);
      if (window.physicsEngine.checkAABB(hitbox, hurtbox)) {
        const damage = Math.round(this.atk * 1.15);
        opponent.takeDamage(damage, this, false, true);
        opponent.vy = -10; // Launch
        this.gainRage(15);
      }
    }
  }

  useUlt(opponent) {
    if (this.rage < 100 || this.ultCd > 0 || this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    const ult = this.charData.skills.ult;
    this.rage = 0;
    this.ultCd = ult.cd;
    this.setState("ult", 1.2);
    this.invulnerableTimer = 1.2;

    // Trigger full screen cutin presentation
    if (window.effectsEngine) {
      window.effectsEngine.triggerCutin(this.charData.name, ult.name, this.charData.themeColor, 1.2);
      window.effectsEngine.spawnBeam({
        startX: 0,
        startY: this.y - 45,
        endX: 1400,
        width: 80,
        color: this.charData.themeColor,
        innerColor: "#ffffff",
        life: 1.0,
        damage: Math.round(this.atk * 3.0)
      });
    }

    if (opponent) {
      const damage = Math.round(this.atk * 3.2);
      setTimeout(() => {
        if (opponent && opponent.hp > 0) {
          opponent.takeDamage(damage, this, true, true);
          if (window.effectsEngine) {
            window.effectsEngine.createExplosion(opponent.x, opponent.y - 40, this.charData.themeColor, 35, 2.5);
            window.effectsEngine.shake(18, 0.5);
          }
        }
      }, 500);
    }
  }

  useBurst(opponent) {
    if (this.rage < 50 || this.state === "ko") return;
    this.rage -= 50;
    this.setState("burst", 0.4);
    this.invulnerableTimer = 0.8;
    this.vx = 0;
    this.vy = 0;

    if (window.soundEngine) window.soundEngine.playBurst();
    if (window.effectsEngine) {
      window.effectsEngine.addParticle({
        x: this.x,
        y: this.y - 40,
        size: 20,
        growth: 8,
        color: "#facc15",
        maxLife: 0.35,
        shape: "ring",
        glow: true
      });
      window.effectsEngine.addFloatingText("BURST BREAK!", this.x, this.y - 60, "#facc15", true);
      window.effectsEngine.shake(12, 0.3);
    }

    if (opponent) {
      const dist = Math.abs(this.x - opponent.x);
      if (dist < 180) {
        opponent.vx = (opponent.x > this.x ? 1 : -1) * 16;
        opponent.vy = -6;
        opponent.setState("dizzy", 1.0);
        opponent.takeDamage(Math.round(this.atk * 0.3), this, true, false);
      }
    }
  }

  useGadget() {
    if (this.gadgetUses <= 0 || this.level < 20 || this.state === "ko") return;
    this.gadgetUses--;

    const healAmt = Math.round(this.maxHp * 0.35);
    this.hp = Math.min(this.maxHp, this.hp + healAmt);
    if (window.effectsEngine) {
      window.effectsEngine.addFloatingText(`+${healAmt} HP (GADGET)`, this.x, this.y - 50, "#22c55e", true);
      window.effectsEngine.createExplosion(this.x, this.y - 30, "#22c55e", 15, 1.0);
    }
    if (window.soundEngine) window.soundEngine.playLevelUp();
  }

  takeDamage(amount, attacker, isGuardBreak = false, isHeavy = false, isGrab = false) {
    if (this.invulnerableTimer > 0 || this.spawnShieldTimer > 0 || this.state === "ko") return;

    let finalDamage = amount;

    // Guard defense (80% damage reduction)
    if (this.state === "guard" && !isGuardBreak && !isGrab) {
      finalDamage = Math.round(amount * 0.2);
      this.guardMeter -= 25;
      if (window.soundEngine) window.soundEngine.playGuard();

      if (this.guardMeter <= 0) {
        // Guard Break!
        this.guardMeter = 0;
        this.setState("dizzy", 1.5);
        if (window.soundEngine) window.soundEngine.playHit("guard_break");
        if (window.effectsEngine) {
          window.effectsEngine.addFloatingText("GUARD BROKEN!", this.x, this.y - 60, "#a855f7", true);
          window.effectsEngine.createHitSpark(this.x, this.y - 40, "#a855f7", 20, true);
        }
      }
    } else {
      // Normal or heavy hit
      this.setState(isHeavy ? "dizzy" : "hit", isHeavy ? 0.45 : 0.22);
      this.vx = (attacker ? attacker.facing : -1) * (isHeavy ? 7 : 3);
      if (window.soundEngine) window.soundEngine.playHit(isHeavy ? "heavy" : "light");
      if (window.effectsEngine) {
        window.effectsEngine.createHitSpark(this.x, this.y - 40, isHeavy ? "#ef4444" : "#facc15", 14, isHeavy);
      }
    }

    // Apply Damage
    this.hp -= finalDamage;
    this.gainRage(Math.round(finalDamage * 0.12));

    // Floating damage text
    if (window.effectsEngine) {
      window.effectsEngine.addFloatingText(`-${finalDamage}`, this.x, this.y - 40, isHeavy ? "#ef4444" : "#fbbf24", isHeavy);
      window.effectsEngine.shake(isHeavy ? 10 : 4, isHeavy ? 0.2 : 0.1);
    }

    // Passive & Gear: Senzu Bean Emergency Revival Check
    const hasSenzu = this.equippedGear.some(g => g && g.id === "senzu_pouch");
    if (this.hp <= 0 && hasSenzu && !this.senzuUsed) {
      this.senzuUsed = true;
      this.hp = Math.round(this.maxHp * 0.2);
      this.invulnerableTimer = 1.5;
      if (window.effectsEngine) {
        window.effectsEngine.addFloatingText("仙豆保命復活!", this.x, this.y - 60, "#10b981", true);
        window.effectsEngine.createExplosion(this.x, this.y - 40, "#10b981", 30, 2.0);
      }
      if (window.soundEngine) window.soundEngine.playVictory();
      return;
    }

    // KO Check
    if (this.hp <= 0) {
      this.hp = 0;
      this.setState("ko");
      if (window.soundEngine) window.soundEngine.playKO();
      if (window.effectsEngine) {
        window.effectsEngine.createExplosion(this.x, this.y - 40, "#ef4444", 30, 2.0);
        window.effectsEngine.addFloatingText("K.O.!", this.x, this.y - 70, "#ef4444", true);
        window.effectsEngine.freeze(15);
      }
    }
  }

  gainRage(amt) {
    this.rage = Math.min(this.maxRage, this.rage + amt);
  }
}

// ─── KOF 輪替淘汰賽與對戰管理器 ───
class MatchEngine {
  constructor() {
    this.team1Roster = []; // Player team queue
    this.team2Roster = []; // CPU / Opponent team queue
    this.p1Current = null; // Active fighter 1
    this.p2Current = null; // Active fighter 2
    this.p1Index = 0;
    this.p2Index = 0;
    this.matchState = "standby"; // standby, fighting, p1_win_round, p2_win_round, match_over
    this.roundTransitionTimer = 0;
    this.mode = "kof"; // kof, ranked, boss_rush, practice
    this.isRanked = false; // When true, standardized to Lv100
    this.assistCooldown = 0;
    this.assistActiveFighter = null;
    this.assistTimer = 0;
    this.p1Streak = 0; // Tracks 1-vs-many streak
    this.totalDamageDealt = 0;
    this.onMatchEnd = null;
    this.cameraX = 0;
    this.cameraY = 0;
  }

  startMatch(p1Roster, p2Roster, mode = "kof", isRanked = false) {
    this.mode = mode;
    this.isRanked = isRanked;
    this.team1Roster = p1Roster.map(char => new Fighter(char, isRanked ? 100 : (char.userLevel || 1), char.equippedGear || [], true));
    this.team2Roster = p2Roster.map(char => new Fighter(char, isRanked ? 100 : (char.userLevel || 1), char.equippedGear || [], false));
    this.p1Index = 0;
    this.p2Index = 0;
    this.p1Current = this.team1Roster[0];
    this.p2Current = this.team2Roster[0];
    this.p1Current.x = 350;
    this.p2Current.x = 1050;
    this.p1Current.facing = 1;
    this.p2Current.facing = -1;
    this.matchState = "fighting";
    this.roundTransitionTimer = 0;
    this.assistCooldown = 0;
    this.p1Streak = 0;
    this.totalDamageDealt = 0;

    if (window.soundEngine) {
      window.soundEngine.startBgm();
    }
  }

  callAssist() {
    if (this.assistCooldown > 0 || this.assistActiveFighter || this.matchState !== "fighting") return;
    const nextFighterData = this.team1Roster[this.p1Index + 1];
    if (!nextFighterData || nextFighterData.hp <= 0) return;

    this.assistCooldown = 20; // 20s CD
    this.assistActiveFighter = nextFighterData;
    this.assistActiveFighter.x = this.p1Current.x - this.p1Current.facing * 60;
    this.assistActiveFighter.y = this.p1Current.y;
    this.assistActiveFighter.facing = this.p1Current.facing;
    this.assistTimer = 1.0;

    if (window.effectsEngine) {
      window.effectsEngine.addFloatingText(`ASSIST: ${this.assistActiveFighter.charData.name}!`, this.assistActiveFighter.x, this.assistActiveFighter.y - 60, "#38bdf8", true);
      window.effectsEngine.createSlashWave(this.assistActiveFighter.x, this.assistActiveFighter.y - 30, this.assistActiveFighter.facing, "#38bdf8", 1.5);
    }
    if (window.soundEngine) window.soundEngine.playHit("heavy");

    // Assist striker attacks opponent
    if (this.p2Current) {
      const damage = Math.round(this.assistActiveFighter.atk * 1.1);
      this.p2Current.takeDamage(damage, this.assistActiveFighter, false, true);
    }
  }

  update(dt) {
    if (this.matchState === "standby") return;

    if (this.assistCooldown > 0) {
      this.assistCooldown = Math.max(0, this.assistCooldown - dt);
    }

    if (this.assistTimer > 0) {
      this.assistTimer -= dt;
      if (this.assistTimer <= 0) {
        this.assistActiveFighter = null;
      }
    }

    // Camera follow center between active fighters
    if (this.p1Current && this.p2Current) {
      const midX = (this.p1Current.x + this.p2Current.x) / 2;
      const targetCamX = midX - 450; // Viewport center
      this.cameraX += (targetCamX - this.cameraX) * 0.08;
      this.cameraX = Math.max(0, Math.min(500, this.cameraX));
    }

    // Update active fighters
    if (this.p1Current && this.p2Current && this.matchState === "fighting") {
      this.p1Current.update(dt, this.p2Current, this);
      this.p2Current.update(dt, this.p1Current, this);

      // Check KO
      if (this.p1Current.hp <= 0) {
        this.matchState = "p2_win_round";
        this.roundTransitionTimer = 3.0; // 3s countdown before next spawn
      } else if (this.p2Current.hp <= 0) {
        this.matchState = "p1_win_round";
        this.p1Streak++;
        this.roundTransitionTimer = 3.0;
      }
    }

    // Round transition handling (KOF Relay 勝者留場)
    if (this.matchState === "p1_win_round" || this.matchState === "p2_win_round") {
      this.roundTransitionTimer -= dt;

      if (this.roundTransitionTimer <= 0) {
        if (this.matchState === "p1_win_round") {
          // P2 next fighter
          this.p2Index++;
          if (this.p2Index < this.team2Roster.length) {
            this.p2Current = this.team2Roster[this.p2Index];
            this.p2Current.x = 1050;
            this.p2Current.facing = -1;
            this.p2Current.spawnShieldTimer = 2.0; // 2s spawn protection
            // Winner stays with retained HP & rage + 2s invulnerability
            this.p1Current.invulnerableTimer = 2.0;
            this.matchState = "fighting";
          } else {
            // Team 1 wins match!
            this.finishMatch(true);
          }
        } else if (this.matchState === "p2_win_round") {
          // P1 next fighter
          this.p1Index++;
          if (this.p1Index < this.team1Roster.length) {
            this.p1Current = this.team1Roster[this.p1Index];
            this.p1Current.x = 350;
            this.p1Current.facing = 1;
            this.p1Current.spawnShieldTimer = 2.0;
            this.p2Current.invulnerableTimer = 2.0;
            this.matchState = "fighting";
          } else {
            // Team 2 wins match!
            this.finishMatch(false);
          }
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

    // Calculate rewards
    const isSweep = this.p1Index === 0 && this.team2Roster.length >= 3;
    let rewardGold = isPlayerWinner ? (this.mode === "boss_rush" ? 1500 : 800) : 200;
    if (isSweep) rewardGold *= 2; // Double reward for 1v3 or 1v5 sweep!

    if (this.onMatchEnd) {
      this.onMatchEnd({
        winner: isPlayerWinner ? "player" : "opponent",
        isSweep,
        gold: rewardGold,
        p1DefeatedCount: this.p2Index,
        p2DefeatedCount: this.p1Index
      });
    }
  }
}

if (typeof window !== "undefined") {
  window.Fighter = Fighter;
  window.MatchEngine = MatchEngine;
  window.matchEngine = new MatchEngine();
}
