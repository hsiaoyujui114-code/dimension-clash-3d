/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * 2D 物理、受擊框判定與碰撞引擎 (Combat Physics & Hitbox Detection)
 */

class PhysicsEngine {
  constructor() {
    this.gravity = 0.55;
    this.groundY = 460;
    this.friction = 0.84;
    this.arenaWidth = 1400;
  }

  updateFighter(fighter, dt = 1 / 60) {
    // Apply horizontal friction
    fighter.vx *= this.friction;
    if (Math.abs(fighter.vx) < 0.05) fighter.vx = 0;

    // Apply horizontal velocity
    fighter.x += fighter.vx;

    // Apply gravity & vertical velocity
    if (!fighter.isGrounded) {
      fighter.vy += this.gravity;
      fighter.y += fighter.vy;

      if (fighter.y >= this.groundY) {
        fighter.y = this.groundY;
        fighter.vy = 0;
        fighter.isGrounded = true;
        fighter.jumpCount = 0;
        if (fighter.state === "fall" || fighter.state === "jump") {
          fighter.setState("idle");
        }
      }
    } else {
      fighter.y = this.groundY;
    }

    // Arena boundary limits
    const halfW = fighter.width / 2;
    if (fighter.x < halfW + 40) {
      fighter.x = halfW + 40;
      fighter.vx = 0;
    } else if (fighter.x > this.arenaWidth - halfW - 40) {
      fighter.x = this.arenaWidth - halfW - 40;
      fighter.vx = 0;
    }
  }

  getHurtbox(fighter) {
    return {
      x: fighter.x - fighter.width / 2,
      y: fighter.y - fighter.height,
      width: fighter.width,
      height: fighter.height
    };
  }

  getHitbox(fighter, attackType = "light") {
    const dir = fighter.facing;
    let reach = 55;
    let height = 40;
    let yOffset = fighter.height * 0.6;

    if (attackType === "heavy") {
      reach = 75;
      height = 55;
    } else if (attackType === "grab") {
      reach = 45;
      height = 45;
      yOffset = fighter.height * 0.5;
    } else if (attackType === "skill1") {
      reach = 95;
      height = 50;
    } else if (attackType === "skill2") {
      reach = 110;
      height = 60;
    } else if (attackType === "ult") {
      reach = 220;
      height = 120;
      yOffset = fighter.height * 0.8;
    }

    return {
      x: dir === 1 ? fighter.x : fighter.x - reach,
      y: fighter.y - yOffset,
      width: reach,
      height: height
    };
  }

  checkAABB(box1, box2) {
    return (
      box1.x < box2.x + box2.width &&
      box1.x + box1.width > box2.x &&
      box1.y < box2.y + box2.height &&
      box1.y + box1.height > box2.y
    );
  }
}

if (typeof window !== "undefined") {
  window.physicsEngine = new PhysicsEngine();
}
