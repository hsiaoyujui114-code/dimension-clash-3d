/**
 * 跨次元大亂鬥 (Dimension Clash Online) - 3D 智能格鬥 AI 決策引擎
 * 支援三大難度分級：簡單 (Easy)、中等 (Medium)、困難 (Hard / Expert)
 */

class FighterAI3D {
  constructor(difficulty = "medium") {
    this.setDifficulty(difficulty);
    this.thinkTimer = 0;
    this.circleAngle = Math.random() * Math.PI * 2;
  }

  setDifficulty(diff = "medium") {
    this.difficulty = diff;
    if (diff === "easy") {
      this.decisionInterval = 0.28; // 反應較慢
      this.aggression = 0.35;
      this.breakGuardChance = 0.15;
      this.skillChance = 0.20;
      this.ultChance = 0.30;
      this.burstChance = 0.10;
      this.dodgeChance = 0.10;
      this.flyTactics = false;
    } else if (diff === "hard") {
      this.decisionInterval = 0.05; // 幀級極速反應
      this.aggression = 0.90;
      this.breakGuardChance = 0.85;
      this.skillChance = 0.75;
      this.ultChance = 0.90;
      this.burstChance = 0.85;
      this.dodgeChance = 0.40;
      this.flyTactics = true;
    } else {
      // "medium" / default
      this.decisionInterval = 0.12; // 標準平衡反應
      this.aggression = 0.70;
      this.breakGuardChance = 0.45;
      this.skillChance = 0.45;
      this.ultChance = 0.60;
      this.burstChance = 0.60;
      this.dodgeChance = 0.25;
      this.flyTactics = false;
    }
  }

  update(dt, aiFighter, playerFighter) {
    if (!aiFighter || !playerFighter || aiFighter.state === "ko" || playerFighter.state === "ko") return;

    this.thinkTimer += dt;
    if (this.thinkTimer < this.decisionInterval) return;
    this.thinkTimer = 0;

    const dx = playerFighter.x - aiFighter.x;
    const dz = playerFighter.z - aiFighter.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    // 1. 困難難度專屬：飛行角色主動制空起飛
    if (this.flyTactics && aiFighter.canFly && !aiFighter.isFlying && Math.random() < 0.3) {
      aiFighter.toggleFlight();
    }

    // 2. 爆發脫身決策 (受擊時)
    if ((aiFighter.state === "hit" || aiFighter.state === "dizzy") && aiFighter.rage >= 50) {
      if (Math.random() < this.burstChance) {
        aiFighter.useBurst(playerFighter);
        return;
      }
    }

    if (aiFighter.state === "hit" || aiFighter.state === "dizzy" || aiFighter.isCharging) return;

    // 3. 終極奧義決策
    if (aiFighter.rage >= 100 && aiFighter.ultCd === 0 && dist < 22) {
      if (Math.random() < this.ultChance) {
        aiFighter.useUlt(playerFighter);
        return;
      }
    }

    // 4. 破防與摔技決策 (當玩家格擋時)
    if (playerFighter.state === "guard" && dist < 5.5) {
      if (Math.random() < this.breakGuardChance) {
        if (Math.random() < 0.5) {
          aiFighter.grab(playerFighter);
          return;
        } else {
          aiFighter.startHeavyCharge();
          setTimeout(() => {
            if (aiFighter && aiFighter.isCharging) {
              aiFighter.releaseHeavyCharge(playerFighter);
            }
          }, this.difficulty === "hard" ? 600 : 800);
          return;
        }
      }
    }

    // 5. 戰術小招決策
    if (aiFighter.skill1Cd === 0 && dist < 16.0 && Math.random() < this.skillChance) {
      aiFighter.useSkill1(playerFighter);
      return;
    }
    if (aiFighter.skill2Cd === 0 && dist < 10.0 && Math.random() < this.skillChance) {
      aiFighter.useSkill2(playerFighter);
      return;
    }

    // 6. 近距離貼身戰鬥 (Dist < 4.5)
    if (dist < 4.5) {
      const rand = Math.random();
      if (rand < this.aggression) {
        aiFighter.lightAttack(playerFighter);
      } else if (rand < this.aggression + 0.2) {
        aiFighter.guard(true);
        setTimeout(() => aiFighter.guard(false), this.difficulty === "hard" ? 250 : 400);
      } else if (rand < this.aggression + 0.2 + this.dodgeChance) {
        aiFighter.dodge();
      }
    }
    // 7. 中距離走位 (4.5 <= Dist < 18.0)
    else if (dist >= 4.5 && dist < 18.0) {
      this.circleAngle += (Math.random() - 0.5) * (this.difficulty === "hard" ? 0.8 : 0.4);
      const flankDist = this.difficulty === "hard" ? 2.5 : 4.0;
      const targetX = playerFighter.x + Math.sin(this.circleAngle) * flankDist;
      const targetZ = playerFighter.z + Math.cos(this.circleAngle) * flankDist;

      const toTargetX = targetX - aiFighter.x;
      const toTargetZ = targetZ - aiFighter.z;
      const len = Math.sqrt(toTargetX * toTargetX + toTargetZ * toTargetZ) || 1;

      aiFighter.move3D(toTargetX / len, toTargetZ / len, 0);

      if (Math.random() < (this.difficulty === "hard" ? 0.12 : 0.05) && aiFighter.isGrounded) {
        aiFighter.jump();
      }
    }
    // 8. 遠距離快速逼近 (Dist >= 18.0)
    else {
      const len = dist || 1;
      aiFighter.move3D(dx / len, dz / len, 0);
    }
  }
}

if (typeof window !== "undefined") {
  window.FighterAI3D = FighterAI3D;
  window.fighterAI3D = new FighterAI3D("medium");
}
