/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * 智能格鬥 AI 決策引擎 (Combat AI Decision Engine)
 */

class FighterAI {
  constructor(difficulty = "medium") {
    this.difficulty = difficulty; // easy, medium, hard, boss, dummy
    this.thinkTimer = 0;
    this.decisionInterval = difficulty === "hard" || difficulty === "boss" ? 0.08 : 0.16;
  }

  update(dt, aiFighter, playerFighter) {
    if (!aiFighter || !playerFighter || aiFighter.state === "ko" || playerFighter.state === "ko") return;
    if (this.difficulty === "dummy") return;

    this.thinkTimer += dt;
    if (this.thinkTimer < this.decisionInterval) return;
    this.thinkTimer = 0;

    const dx = playerFighter.x - aiFighter.x;
    const dist = Math.abs(dx);
    const dir = dx > 0 ? 1 : -1;

    // Burst decision: if getting hit or dizzy and rage >= 50%
    if ((aiFighter.state === "hit" || aiFighter.state === "dizzy") && aiFighter.rage >= 50) {
      if (Math.random() < (this.difficulty === "boss" ? 0.8 : 0.4)) {
        aiFighter.useBurst(playerFighter);
        return;
      }
    }

    if (aiFighter.state === "hit" || aiFighter.state === "dizzy" || aiFighter.isCharging) return;

    // Ultimate decision
    if (aiFighter.rage >= 100 && aiFighter.ultCd === 0) {
      if (dist < 400 && Math.random() < 0.6) {
        aiFighter.useUlt(playerFighter);
        return;
      }
    }

    // Reaction to player's guard: Break Guard or Grab!
    if (playerFighter.state === "guard" && dist < 120) {
      if (Math.random() < 0.5) {
        aiFighter.grab(playerFighter);
        return;
      } else if (Math.random() < 0.4) {
        aiFighter.startHeavyCharge();
        setTimeout(() => {
          if (aiFighter && aiFighter.isCharging) {
            aiFighter.releaseHeavyCharge(playerFighter);
          }
        }, 800);
        return;
      }
    }

    // Skill 1 & 2 decisions
    if (aiFighter.skill1Cd === 0 && dist < 350 && Math.random() < 0.4) {
      aiFighter.facing = dir;
      aiFighter.useSkill1(playerFighter);
      return;
    }
    if (aiFighter.skill2Cd === 0 && dist < 220 && Math.random() < 0.4) {
      aiFighter.facing = dir;
      aiFighter.useSkill2(playerFighter);
      return;
    }

    // Close Range Combat
    if (dist < 75) {
      // Light combo attack
      if (Math.random() < 0.7) {
        aiFighter.facing = dir;
        aiFighter.lightAttack(playerFighter);
      } else if (Math.random() < 0.3) {
        aiFighter.guard(true);
        setTimeout(() => aiFighter.guard(false), 400);
      } else if (Math.random() < 0.2) {
        aiFighter.dodge();
      }
    }
    // Mid to Far Range Combat: Move in, Dash, or Jump
    else if (dist >= 75 && dist < 300) {
      if (Math.random() < 0.15 && (this.difficulty === "hard" || this.difficulty === "boss")) {
        aiFighter.dash(dir);
      } else if (Math.random() < 0.1 && aiFighter.isGrounded) {
        aiFighter.jump();
      } else {
        aiFighter.move(dir);
      }
    } else {
      // Very far: Dash closer
      if (Math.random() < 0.35) {
        aiFighter.dash(dir);
      } else {
        aiFighter.move(dir);
      }
    }
  }
}

if (typeof window !== "undefined") {
  window.FighterAI = FighterAI;
  window.fighterAI = new FighterAI("medium");
}
