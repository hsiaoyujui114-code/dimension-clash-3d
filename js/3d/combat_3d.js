/**
 * 跨次元大亂鬥 (Dimension Clash Online) - 3D 戰鬥與全向移動引擎
 * (3D Omnidirectional Movement, Aerial Physics, 3D Hitbox & KOF Match System)
 */

class Fighter3D {
  constructor(charData, scene, level = 1, equippedGear = [], isPlayer = true) {
    this.charData = charData;
    this.scene = scene;
    this.level = Math.max(1, Math.min(100, level));
    this.equippedGear = equippedGear || [];
    this.isPlayer = isPlayer;

    // 3D Position & Velocity
    this.x = isPlayer ? -15 : 15;
    this.y = 0;
    this.z = isPlayer ? 5 : -5;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.rotationY = isPlayer ? Math.PI * 0.5 : -Math.PI * 0.5;

    this.isGrounded = true;
    this.jumpCount = 0;
    this.maxJumps = 2; // Supports double jump

    // Calculate base + level + gear stats
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
    this.spawnShieldTimer = 2.0;
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
    this.baseSpeed = (this.charData.speed || 6.5) * 1.8 * (1 + speedMod);
  }

  update(dt, opponent) {
    // Cooldown reductions
    if (this.skill1Cd > 0) this.skill1Cd = Math.max(0, this.skill1Cd - dt);
    if (this.skill2Cd > 0) this.skill2Cd = Math.max(0, this.skill2Cd - dt);
    if (this.ultCd > 0) this.ultCd = Math.max(0, this.ultCd - dt);
    if (this.invulnerableTimer > 0) this.invulnerableTimer = Math.max(0, this.invulnerableTimer - dt);
    if (this.spawnShieldTimer > 0) this.spawnShieldTimer = Math.max(0, this.spawnShieldTimer - dt);

    // Guard meter recovery
    if (this.state !== "guard" && this.guardMeter < this.maxGuardMeter) {
      this.guardMeter = Math.min(this.maxGuardMeter, this.guardMeter + dt * 15);
    }

    // State timers
    if (this.stateTimer > 0) {
      this.stateTimer -= dt;
      if (this.stateTimer <= 0) {
        if (this.state === "hit" || this.state === "dizzy" || this.state.startsWith("attack") || this.state.startsWith("skill") || this.state === "dodge") {
          this.state = "idle";
        }
      }
    }

    // Heavy charge
    if (this.isCharging) {
      this.chargeTime += dt;
      this.vx = 0;
      this.vz = 0;
      if (this.chargeTime >= 0.8) {
        this.releaseHeavyCharge(opponent);
      }
    }

    // 3D Physics (Friction, Gravity, Jumping)
    this.vx *= 0.82;
    this.vz *= 0.82;

    this.x += this.vx * dt;
    this.z += this.vz * dt;

    if (!this.isGrounded) {
      this.vy -= 35 * dt; // Gravity
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

    // Arena boundary limits (Circle radius ~42)
    const distFromCenter = Math.sqrt(this.x * this.x + this.z * this.z);
    const maxRadius = 42;
    if (distFromCenter > maxRadius) {
      const ratio = maxRadius / distFromCenter;
      this.x *= ratio;
      this.z *= ratio;
      this.vx = 0;
      this.vz = 0;
    }

    // Auto rotate towards opponent in combat
    if (opponent && (this.state === "idle" || this.state.startsWith("attack") || this.state.startsWith("skill"))) {
      const dx = opponent.x - this.x;
      const dz = opponent.z - this.z;
      this.rotationY = Math.atan2(dx, dz);
    }

    this.updatePosition();

    // Update 3D animation
    const isMoving = Math.abs(this.vx) > 0.5 || Math.abs(this.vz) > 0.5;
    this.model.updateAnimation(dt, this.state, isMoving, this.baseSpeed, this.isCharging);
  }

  updatePosition() {
    if (this.model && this.model.group) {
      this.model.group.position.set(this.x, this.y, this.z);
      this.model.group.rotation.y = this.rotationY;
    }
  }

  // ─── 3D 四面八方全向移動指令 ───
  move3D(moveX, moveZ, cameraYaw = 0) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.state === "guard" || this.isCharging) return;

    // Apply movement relative to camera angle
    const sin = Math.sin(cameraYaw);
    const cos = Math.cos(cameraYaw);

    const worldMoveX = moveX * cos + moveZ * sin;
    const worldMoveZ = -moveX * sin + moveZ * cos;

    this.vx = worldMoveX * this.baseSpeed;
    this.vz = worldMoveZ * this.baseSpeed;

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
    if (active && this.isGrounded && this.guardMeter > 10) {
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
    this.invulnerableTimer = 0.3; // 0.3s i-frame

    const forwardX = Math.sin(this.rotationY);
    const forwardZ = Math.cos(this.rotationY);
    this.vx = forwardX * this.baseSpeed * 2.6;
    this.vz = forwardZ * this.baseSpeed * 2.6;

    if (window.soundEngine) window.soundEngine.playDodge();
  }

  lightAttack(opponent) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || this.isCharging) return;

    this.state = "attack_1";
    this.stateTimer = 0.28;

    // Small forward lunge in 3D
    const fwdX = Math.sin(this.rotationY);
    const fwdZ = Math.cos(this.rotationY);
    this.vx = fwdX * 8;
    this.vz = fwdZ * 8;

    if (window.soundEngine) window.soundEngine.playHit("light");

    if (opponent) {
      const dist = this.getDist3D(opponent);
      if (dist < 4.5) {
        opponent.takeDamage(Math.round(this.atk * 0.5), this, false, false);
        this.gainRage(8);
      }
    }
  }

  startHeavyCharge() {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || !this.isGrounded) return;
    this.isCharging = true;
    this.chargeTime = 0;
    this.state = "heavy_charge";
  }

  releaseHeavyCharge(opponent) {
    if (!this.isCharging) return;
    this.isCharging = false;
    const isFull = this.chargeTime >= 0.7;
    this.state = "heavy_release";
    this.stateTimer = 0.4;

    const fwdX = Math.sin(this.rotationY);
    const fwdZ = Math.cos(this.rotationY);
    this.vx = fwdX * (isFull ? 18 : 10);
    this.vz = fwdZ * (isFull ? 18 : 10);

    if (window.soundEngine) window.soundEngine.playHit("heavy");

    if (opponent) {
      const dist = this.getDist3D(opponent);
      if (dist < 5.5) {
        opponent.takeDamage(Math.round(this.atk * (isFull ? 1.5 : 0.9)), this, isFull, true);
        this.gainRage(18);
      }
    }
  }

  grab(opponent) {
    if (this.state === "hit" || this.state === "dizzy" || this.state === "ko" || !this.isGrounded) return;
    this.state = "grab";
    this.stateTimer = 0.45;

    if (opponent) {
      const dist = this.getDist3D(opponent);
      if (dist < 4.0) {
        // Unblockable 3D Grab Slam
        opponent.takeDamage(Math.round(this.atk * 0.95), this, true, true);
        opponent.vy = 12;
        const fwdX = Math.sin(this.rotationY);
        const fwdZ = Math.cos(this.rotationY);
        opponent.vx = fwdX * 20;
        opponent.vz = fwdZ * 20;
        if (window.soundEngine) window.soundEngine.playHit("heavy");
      }
    }
  }

  useSkill1(opponent) {
    if (this.skill1Cd > 0 || this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    const skill = this.charData.skills.skill1;
    this.skill1Cd = skill.cd;
    this.state = "skill1";
    this.stateTimer = 0.4;

    if (window.soundEngine) window.soundEngine.playKiBlast();

    if (opponent) {
      const dist = this.getDist3D(opponent);
      if (dist < 18.0) {
        opponent.takeDamage(Math.round(this.atk * 0.9), this, false, false);
        this.gainRage(12);
      }
    }
  }

  useSkill2(opponent) {
    if (this.skill2Cd > 0 || this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    const skill = this.charData.skills.skill2;
    this.skill2Cd = skill.cd;
    this.state = "skill2";
    this.stateTimer = 0.5;

    if (window.soundEngine) window.soundEngine.playHit("heavy");

    if (opponent) {
      const dist = this.getDist3D(opponent);
      if (dist < 12.0) {
        opponent.takeDamage(Math.round(this.atk * 1.2), this, false, true);
        opponent.vy = 14;
        this.gainRage(15);
      }
    }
  }

  useUlt(opponent) {
    if (this.rage < 100 || this.ultCd > 0 || this.state === "hit" || this.state === "dizzy" || this.state === "ko") return;
    const ult = this.charData.skills.ult;
    this.rage = 0;
    this.ultCd = ult.cd;
    this.state = "ult";
    this.stateTimer = 1.2;
    this.invulnerableTimer = 1.2;

    if (window.effectsEngine) {
      window.effectsEngine.triggerCutin(this.charData.name, ult.name, this.charData.themeColor, 1.2);
    }

    if (opponent) {
      setTimeout(() => {
        if (opponent && opponent.hp > 0) {
          opponent.takeDamage(Math.round(this.atk * 3.2), this, true, true);
        }
      }, 500);
    }
  }

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
      if (dist < 12.0) {
        const fwdX = opponent.x - this.x;
        const fwdZ = opponent.z - this.z;
        const len = Math.sqrt(fwdX * fwdX + fwdZ * fwdZ) || 1;
        opponent.vx = (fwdX / len) * 22;
        opponent.vz = (fwdZ / len) * 22;
        opponent.vy = 8;
        opponent.takeDamage(Math.round(this.atk * 0.3), this, true, false);
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
    this.roundTransitionTimer = 0;
    this.mode = "kof";
    this.isRanked = false;
    this.assistCooldown = 0;
    this.onMatchEnd = null;
  }

  init(scene) {
    this.scene = scene;
  }

  startMatch(p1RosterData, p2RosterData, mode = "kof", isRanked = false) {
    if (this.p1Current) this.p1Current.destroy();
    if (this.p2Current) this.p2Current.destroy();

    this.mode = mode;
    this.isRanked = isRanked;
    this.p1Index = 0;
    this.p2Index = 0;
    this.team1Roster = p1RosterData;
    this.team2Roster = p2RosterData;

    this.spawnFighters();
    this.matchState = "fighting";
    this.assistCooldown = 0;

    if (window.soundEngine) {
      window.soundEngine.startBgm();
    }
  }

  spawnFighters() {
    const p1Data = this.team1Roster[this.p1Index];
    const p2Data = this.team2Roster[this.p2Index];

    this.p1Current = new Fighter3D(p1Data, this.scene, this.isRanked ? 100 : (p1Data.userLevel || 1), p1Data.equippedGear, true);
    this.p2Current = new Fighter3D(p2Data, this.scene, this.isRanked ? 100 : (p2Data.rarity * 10), [], false);
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
    if (this.matchState === "standby") return;

    if (this.assistCooldown > 0) {
      this.assistCooldown = Math.max(0, this.assistCooldown - dt);
    }

    if (this.p1Current && this.p2Current && this.matchState === "fighting") {
      this.p1Current.update(dt, this.p2Current);
      this.p2Current.update(dt, this.p1Current);

      if (this.p1Current.hp <= 0) {
        this.matchState = "p2_win_round";
        this.roundTransitionTimer = 3.0;
      } else if (this.p2Current.hp <= 0) {
        this.matchState = "p1_win_round";
        this.roundTransitionTimer = 3.0;
      }
    }

    // Round transition handling (KOF Relay 勝者留場)
    if (this.matchState === "p1_win_round" || this.matchState === "p2_win_round") {
      this.roundTransitionTimer -= dt;

      if (this.roundTransitionTimer <= 0) {
        if (this.matchState === "p1_win_round") {
          this.p2Index++;
          if (this.p2Index < this.team2Roster.length) {
            if (this.p2Current) this.p2Current.destroy();
            const nextP2Data = this.team2Roster[this.p2Index];
            this.p2Current = new Fighter3D(nextP2Data, this.scene, this.isRanked ? 100 : (nextP2Data.rarity * 10), [], false);
            this.p1Current.invulnerableTimer = 2.0;
            this.matchState = "fighting";
          } else {
            this.finishMatch(true);
          }
        } else if (this.matchState === "p2_win_round") {
          this.p1Index++;
          if (this.p1Index < this.team1Roster.length) {
            if (this.p1Current) this.p1Current.destroy();
            const nextP1Data = this.team1Roster[this.p1Index];
            this.p1Current = new Fighter3D(nextP1Data, this.scene, this.isRanked ? 100 : (nextP1Data.userLevel || 1), nextP1Data.equippedGear, true);
            this.p2Current.invulnerableTimer = 2.0;
            this.matchState = "fighting";
          } else {
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

    const isSweep = this.p1Index === 0 && this.team2Roster.length >= 3;
    let rewardGold = isPlayerWinner ? (this.mode === "boss_rush" ? 1500 : 800) : 200;
    if (isSweep) rewardGold *= 2;

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
  window.Fighter3D = Fighter3D;
  window.MatchEngine3D = MatchEngine3D;
  window.matchEngine3D = new MatchEngine3D();
}
