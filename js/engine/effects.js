/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * 戰鬥特效、粒子系統與震屏引擎 (Combat Visual Effects, Particle System & Screen Shake)
 */

class EffectsEngine {
  constructor() {
    this.particles = [];
    this.floatingTexts = [];
    this.projectiles = [];
    this.beams = [];
    this.shakeDuration = 0;
    this.shakeIntensity = 0;
    this.freezeFrames = 0;
    this.cutin = null; // { text, charName, subTitle, color, timer, maxTime }
  }

  update(dt = 1 / 60) {
    if (this.freezeFrames > 0) {
      this.freezeFrames--;
      return;
    }

    // Screen shake update
    if (this.shakeDuration > 0) {
      this.shakeDuration -= dt;
      if (this.shakeDuration <= 0) {
        this.shakeIntensity = 0;
      }
    }

    // Cutin update
    if (this.cutin) {
      this.cutin.timer -= dt;
      if (this.cutin.timer <= 0) {
        this.cutin = null;
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity || 0;
      p.life -= dt;
      p.size = Math.max(0, p.size + (p.growth || 0));
      p.alpha = Math.max(0, p.life / p.maxLife);
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update floating texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const t = this.floatingTexts[i];
      t.x += t.vx;
      t.y += t.vy;
      t.life -= dt;
      t.alpha = Math.max(0, t.life / t.maxLife);
      if (t.life <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }

    // Update projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      proj.x += proj.vx * dt * 60;
      proj.y += proj.vy * dt * 60;
      proj.life -= dt;

      // Spawn trail particle
      if (Math.random() > 0.3) {
        this.addParticle({
          x: proj.x + (Math.random() - 0.5) * 8,
          y: proj.y + (Math.random() - 0.5) * 8,
          vx: -proj.vx * 0.15 + (Math.random() - 0.5) * 2,
          vy: -proj.vy * 0.15 + (Math.random() - 0.5) * 2,
          size: proj.size * 0.6,
          color: proj.color,
          maxLife: 0.25,
          glow: true
        });
      }

      if (proj.life <= 0 || proj.destroyed) {
        this.createExplosion(proj.x, proj.y, proj.color, 12, 1.2);
        this.projectiles.splice(i, 1);
      }
    }

    // Update Beams
    for (let i = this.beams.length - 1; i >= 0; i--) {
      const b = this.beams[i];
      b.life -= dt;
      if (b.life <= 0) {
        this.beams.splice(i, 1);
      }
    }
  }

  shake(intensity = 8, duration = 0.2) {
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
    this.shakeDuration = Math.max(this.shakeDuration, duration);
  }

  freeze(frames = 4) {
    this.freezeFrames = frames;
  }

  triggerCutin(charName, ultName, color = "#f59e0b", duration = 1.2) {
    this.cutin = {
      charName,
      ultName,
      color,
      timer: duration,
      maxTime: duration
    };
    if (window.soundEngine) {
      window.soundEngine.playUltCutin();
    }
    this.shake(12, 0.4);
  }

  addParticle(options) {
    this.particles.push({
      x: options.x,
      y: options.y,
      vx: options.vx || (Math.random() - 0.5) * 6,
      vy: options.vy || (Math.random() - 0.5) * 6,
      gravity: options.gravity || 0,
      size: options.size || 4,
      growth: options.growth || -0.05,
      color: options.color || "#facc15",
      maxLife: options.maxLife || 0.4,
      life: options.maxLife || 0.4,
      alpha: 1,
      shape: options.shape || "circle",
      glow: options.glow || false
    });
  }

  createHitSpark(x, y, color = "#fde047", count = 12, isHeavy = false) {
    const sparkCount = isHeavy ? count * 2 : count;
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = isHeavy ? 4 + Math.random() * 8 : 2 + Math.random() * 5;
      this.addParticle({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.15,
        size: isHeavy ? 5 : 3,
        growth: -0.1,
        color,
        maxLife: isHeavy ? 0.35 : 0.2,
        shape: "star",
        glow: true
      });
    }

    // Ring shockwave
    this.addParticle({
      x,
      y,
      vx: 0,
      vy: 0,
      size: 6,
      growth: isHeavy ? 3.5 : 2.0,
      color,
      maxLife: 0.18,
      shape: "ring",
      glow: true
    });
  }

  createExplosion(x, y, color = "#f97316", count = 20, scale = 1.0) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (2 + Math.random() * 7) * scale;
      this.addParticle({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.1,
        size: (4 + Math.random() * 6) * scale,
        growth: -0.15,
        color,
        maxLife: 0.45,
        glow: true
      });
    }

    // Blast wave
    this.addParticle({
      x,
      y,
      vx: 0,
      vy: 0,
      size: 10 * scale,
      growth: 6 * scale,
      color: "#ffffff",
      maxLife: 0.2,
      shape: "ring",
      glow: true
    });
  }

  createSlashWave(x, y, direction, color = "#38bdf8", scale = 1.0) {
    this.addParticle({
      x,
      y,
      vx: direction * 5,
      vy: -0.5,
      size: 15 * scale,
      growth: 1.5,
      color,
      maxLife: 0.25,
      shape: "crescent",
      glow: true
    });
  }

  addFloatingText(text, x, y, color = "#f87171", isCrit = false) {
    this.floatingTexts.push({
      text,
      x: x + (Math.random() - 0.5) * 20,
      y: y - 10,
      vx: (Math.random() - 0.5) * 1.5,
      vy: isCrit ? -3.5 : -2.2,
      color,
      isCrit,
      maxLife: isCrit ? 0.9 : 0.65,
      life: isCrit ? 0.9 : 0.65,
      alpha: 1,
      scale: isCrit ? 1.4 : 1.0
    });
  }

  spawnProjectile(options) {
    this.projectiles.push({
      owner: options.owner,
      x: options.x,
      y: options.y,
      vx: options.vx,
      vy: options.vy || 0,
      width: options.width || 20,
      height: options.height || 20,
      size: options.size || 12,
      damage: options.damage || 100,
      color: options.color || "#38bdf8",
      type: options.type || "ki_blast",
      life: options.life || 2.5,
      penetrate: options.penetrate || false,
      destroyed: false
    });
  }

  spawnBeam(options) {
    this.beams.push({
      owner: options.owner,
      startX: options.startX,
      startY: options.startY,
      endX: options.endX,
      width: options.width || 40,
      color: options.color || "#06b6d4",
      innerColor: options.innerColor || "#ffffff",
      damage: options.damage || 300,
      life: options.life || 0.4,
      maxLife: options.life || 0.4
    });
  }

  render(ctx, cameraX = 0, cameraY = 0) {
    ctx.save();

    // Render Beams
    for (const b of this.beams) {
      const alpha = Math.min(1, b.life / (b.maxLife * 0.3));
      const beamY = b.startY - cameraY;
      const startX = b.startX - cameraX;
      const endX = b.endX - cameraX;
      const width = b.width * (b.life / b.maxLife);

      // Outer glow
      ctx.beginPath();
      ctx.moveTo(startX, beamY);
      ctx.lineTo(endX, beamY);
      ctx.lineWidth = width * 1.8;
      ctx.strokeStyle = b.color;
      ctx.globalAlpha = alpha * 0.4;
      ctx.lineCap = "round";
      ctx.stroke();

      // Main beam
      ctx.beginPath();
      ctx.moveTo(startX, beamY);
      ctx.lineTo(endX, beamY);
      ctx.lineWidth = width;
      ctx.strokeStyle = b.color;
      ctx.globalAlpha = alpha * 0.8;
      ctx.stroke();

      // Inner white hot core
      ctx.beginPath();
      ctx.moveTo(startX, beamY);
      ctx.lineTo(endX, beamY);
      ctx.lineWidth = width * 0.4;
      ctx.strokeStyle = b.innerColor;
      ctx.globalAlpha = alpha;
      ctx.stroke();
    }

    // Render Projectiles
    for (const p of this.projectiles) {
      const px = p.x - cameraX;
      const py = p.y - cameraY;

      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.shadowBlur = 15;
      ctx.shadowColor = p.color;

      if (p.type === "arrow") {
        ctx.fillStyle = p.color;
        ctx.fillRect(px - 15, py - 2, 30, 4);
      } else if (p.type === "disc") {
        // Cutting disc (Krilin Kienzan)
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.fill();
      } else {
        // Ki blast / Energy ball
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
      ctx.restore();
    }

    // Render Particles
    for (const p of this.particles) {
      const px = p.x - cameraX;
      const py = p.y - cameraY;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      if (p.glow) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
      }

      if (p.shape === "ring") {
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = p.color;
        ctx.stroke();
      } else if (p.shape === "star") {
        ctx.fillStyle = p.color;
        ctx.fillRect(px - p.size / 2, py - p.size / 2, p.size, p.size);
      } else if (p.shape === "crescent") {
        ctx.beginPath();
        ctx.arc(px, py, p.size, -Math.PI / 2, Math.PI / 2, false);
        ctx.lineWidth = 6;
        ctx.strokeStyle = p.color;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.restore();
    }

    // Render Floating Text
    for (const t of this.floatingTexts) {
      const tx = t.x - cameraX;
      const ty = t.y - cameraY;

      ctx.save();
      ctx.globalAlpha = t.alpha;
      ctx.font = t.isCrit ? "bold 20px 'Plus Jakarta Sans', sans-serif" : "bold 15px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#000";

      // Text stroke
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 3;
      ctx.strokeText(t.text, tx, ty);

      ctx.fillStyle = t.color;
      ctx.fillText(t.text, tx, ty);
      ctx.restore();
    }

    ctx.restore();
  }

  renderCutin(ctx, canvasWidth, canvasHeight) {
    if (!this.cutin) return;
    const c = this.cutin;
    const progress = 1 - c.timer / c.maxTime; // 0 to 1

    ctx.save();
    // Dim background
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const bannerH = 140;
    const bannerY = canvasHeight / 2 - bannerH / 2;

    // Dynamic Slash Banner
    ctx.fillStyle = "rgba(15, 23, 42, 0.95)";
    ctx.beginPath();
    ctx.moveTo(0, bannerY - 20);
    ctx.lineTo(canvasWidth, bannerY);
    ctx.lineTo(canvasWidth, bannerY + bannerH);
    ctx.lineTo(0, bannerY + bannerH - 20);
    ctx.closePath();
    ctx.fill();

    // Top & Bottom glowing borders
    ctx.lineWidth = 4;
    ctx.strokeStyle = c.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = c.color;
    ctx.stroke();

    // Speed lines
    ctx.fillStyle = c.color;
    ctx.globalAlpha = 0.25;
    for (let i = 0; i < 15; i++) {
      const lx = (Date.now() * 0.8 + i * 80) % canvasWidth;
      ctx.fillRect(lx, bannerY - 10, 40, bannerH);
    }

    // Text presentation
    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 15;
    ctx.shadowColor = c.color;

    // Character Name
    ctx.font = "900 24px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(c.charName.toUpperCase(), canvasWidth / 2, bannerY + 45);

    // Ultimate Name
    ctx.font = "900 36px 'Noto Sans TC', sans-serif";
    ctx.fillStyle = c.color;
    ctx.fillText(`【 ${c.ultName} 】`, canvasWidth / 2, bannerY + 95);

    ctx.restore();
  }
}

if (typeof window !== "undefined") {
  window.effectsEngine = new EffectsEngine();
}
