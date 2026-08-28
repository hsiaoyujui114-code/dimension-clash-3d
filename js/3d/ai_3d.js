/**
 * 跨次元大亂鬥 (Dimension Clash Online) - 3D 智能格鬥 AI 決策引擎
 * (3D Combat AI Decision Engine with 360-degree Navigation)
 */

class FighterAI3D {
  constructor(difficulty = "medium") {
    this.difficulty = difficulty;
    this.thinkTimer = 0;
    this.decisionInterval = 0.12;
    this.circleAngle = Math.random() * Math.PI * 2;
  }

  update(dt, aiFighter, playerFighter) {
    if (!aiFighter || !playerFighter || aiFighter.state === "ko" || playerFighter.state === "ko") return;

    this.thinkTimer += dt;
    if (this.thinkTimer < this.decisionInterval) return;
    this.thinkTimer = 0;

    const dx = playerFighter.x - aiFighter.x;
    const dz = playerFighter.z - aiFighter.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    // Burst decision: if getting hit or dizzy and rage >= 50%
    if ((aiFighter.state === "hit" || aiFighter.state === "dizzy") && aiFighter.rage >= 50) {
      if (Math.random() < 0.7) {
        aiFighter.useBurst(playerFighter);
        return;
      }
    }

    if (aiFighter.state === "hit" || aiFighter.state === "dizzy" || aiFighter.isCharging) return;

    // Ultimate decision in 3D
    if (aiFighter.rage >= 100 && aiFighter.ultCd === 0 && dist < 20) {
      if (Math.random() < 0.6) {
        aiFighter.useUlt(playerFighter);
        return;
      }
    }

    // Reaction to player's guard: Break Guard or Grab!
    if (playerFighter.state === "guard" && dist < 5.0) {
      if (Math.random() < 0.5) {
        aiFighter.grab(playerFighter);
        return;
      } else {
        aiFighter.startHeavyCharge();
        setTimeout(() => {
          if (aiFighter && aiFighter.isCharging) {
            aiFighter.releaseHeavyCharge(playerFighter);
          }
        }, 800);
        return;
      }
    }

    // Skills decision
    if (aiFighter.skill1Cd === 0 && dist < 16.0 && Math.random() < 0.45) {
      aiFighter.useSkill1(playerFighter);
      return;
    }
    if (aiFighter.skill2Cd === 0 && dist < 10.0 && Math.random() < 0.45) {
      aiFighter.useSkill2(playerFighter);
      return;
    }

    // Close Range Combat
    if (dist < 4.5) {
      if (Math.random() < 0.75) {
        aiFighter.lightAttack(playerFighter);
      } else if (Math.random() < 0.25) {
        aiFighter.guard(true);
        setTimeout(() => aiFighter.guard(false), 400);
      } else {
        aiFighter.dodge();
      }
    }
    // Mid Range (4.5 to 18 units): 360-degree approach & circling flank
    else if (dist >= 4.5 && dist < 18.0) {
      this.circleAngle += (Math.random() - 0.5) * 0.5;
      const targetX = playerFighter.x + Math.sin(this.circleAngle) * 3.5;
      const targetZ = playerFighter.z + Math.cos(this.circleAngle) * 3.5;

      const toTargetX = targetX - aiFighter.x;
      const toTargetZ = targetZ - aiFighter.z;
      const len = Math.sqrt(toTargetX * toTargetX + toTargetZ * toTargetZ) || 1;

      aiFighter.move3D(toTargetX / len, toTargetZ / len, 0);

      if (Math.random() < 0.08 && aiFighter.isGrounded) {
        aiFighter.jump();
      }
    }
    // Far Range (> 18 units): Move directly in
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
