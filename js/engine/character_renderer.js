/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * 2D 角色與機體動態渲染系統 (Dynamic Character & Mecha 2D Canvas Renderer)
 * 支援 45+ 位角色的獨特特徵、光環、武器、姿勢、形態變身與神力特效
 */

class CharacterRenderer {
  constructor() {
    this.animTime = 0;
  }

  update(dt = 1 / 60) {
    this.animTime += dt;
  }

  renderCharacter(ctx, fighter, cameraX = 0, cameraY = 0) {
    const x = fighter.x - cameraX;
    const y = fighter.y - cameraY;
    const dir = fighter.facing; // 1 = right, -1 = left
    const char = fighter.charData;
    const state = fighter.state;
    const level = fighter.level || 1;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(dir, 1);

    // ─── 1. 地面陰影與 Lv.100 極境神力光環 (God Aura) ───
    this.renderShadowAndAura(ctx, fighter, char, level);

    // ─── 2. 登場護盾 / 無敵狀態渲染 ───
    if (fighter.invulnerableTimer > 0 || fighter.spawnShieldTimer > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, -fighter.height * 0.5, fighter.height * 0.65, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#38bdf8";
      ctx.stroke();
      ctx.restore();
    }

    // ─── 3. 蓄力霸體金光 / 殘影 ───
    if (fighter.isCharging) {
      ctx.save();
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#eab308";
      ctx.strokeStyle = "rgba(234, 179, 8, 0.6)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, -fighter.height * 0.5, fighter.height * 0.55 + Math.sin(this.animTime * 15) * 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // ─── 4. 角色本體渲染 (依系列與 ID 分流) ───
    if (char.series === "gundam") {
      this.renderGundam(ctx, fighter, char);
    } else if (char.series === "dragonball") {
      this.renderDragonBall(ctx, fighter, char);
    } else {
      this.renderMarvel(ctx, fighter, char);
    }

    // ─── 5. 防禦護盾特效 ───
    if (state === "guard") {
      this.renderGuardEffect(ctx, fighter);
    }

    // ─── 6. ZERO 系統預警標記 (Warning System) ───
    if (fighter.zeroSystemAlert) {
      ctx.save();
      ctx.fillStyle = "#ef4444";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#ef4444";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("⚠️ 預判警報!", 0, -fighter.height - 25);
      ctx.restore();
    }

    ctx.restore();
  }

  renderShadowAndAura(ctx, fighter, char, level) {
    ctx.save();
    // Ground oval shadow
    ctx.beginPath();
    ctx.ellipse(0, 0, fighter.width * 0.6, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fill();

    // Lv. 100 God Aura (極境神力光環)
    if (level >= 100 || char.rarity === 9) {
      const pulse = Math.sin(this.animTime * 6) * 6;
      ctx.beginPath();
      ctx.ellipse(0, 0, fighter.width * 0.8 + pulse, 14 + pulse * 0.3, 0, 0, Math.PI * 2);
      ctx.strokeStyle = char.rarity === 9 ? "rgba(251, 113, 133, 0.9)" : "rgba(234, 179, 8, 0.9)";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 18;
      ctx.shadowColor = char.rarity === 9 ? "#fb7185" : "#facc15";
      ctx.stroke();

      // Rising god particles
      for (let i = 0; i < 3; i++) {
        const offset = ((this.animTime * 80 + i * 40) % fighter.height);
        const px = Math.sin(this.animTime * 8 + i) * 20;
        ctx.fillStyle = char.rarity === 9 ? "rgba(251, 113, 133, 0.7)" : "rgba(250, 204, 21, 0.7)";
        ctx.beginPath();
        ctx.arc(px, -offset, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  renderGuardEffect(ctx, fighter) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(20, -fighter.height * 0.5, fighter.height * 0.5, -Math.PI * 0.4, Math.PI * 0.4);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
    ctx.lineWidth = 6;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#38bdf8";
    ctx.stroke();

    // Hexagon pattern shield
    ctx.fillStyle = "rgba(56, 189, 248, 0.2)";
    ctx.fill();
    ctx.restore();
  }

  // ─── 鋼彈機體渲染器 (Gundam Mecha Renderer) ───
  renderGundam(ctx, fighter, char) {
    const h = fighter.height;
    const w = fighter.width;
    const t = this.animTime;
    const isAttacking = fighter.state.startsWith("attack") || fighter.state.startsWith("skill") || fighter.state === "ult";
    const attackFrame = isAttacking ? Math.sin(fighter.attackTimer * 20) : 0;

    ctx.save();

    // Backpack & Thrusters / Wings
    ctx.save();
    if (char.id.includes("wing") || char.id.includes("strike_freedom") || char.id.includes("destiny")) {
      // Glowing Wings
      ctx.beginPath();
      ctx.moveTo(-15, -h * 0.6);
      ctx.lineTo(-45 - Math.sin(t * 3) * 5, -h * 0.95);
      ctx.lineTo(-20, -h * 0.4);
      ctx.closePath();
      ctx.fillStyle = char.id.includes("destiny") ? "rgba(239, 68, 68, 0.8)" : "rgba(56, 189, 248, 0.8)";
      ctx.shadowBlur = 15;
      ctx.shadowColor = ctx.fillStyle;
      ctx.fill();
    } else if (char.id === "kshatriya") {
      // 4 Binder Wings
      ctx.fillStyle = "#15803d";
      ctx.fillRect(-35, -h * 0.85, 20, 50);
      ctx.fillRect(15, -h * 0.85, 20, 50);
    }
    ctx.restore();

    // Legs
    const legOffset = fighter.state === "run" ? Math.sin(t * 15) * 12 : 0;
    ctx.fillStyle = "#334155";
    ctx.fillRect(-14, -28 + legOffset, 10, 28);
    ctx.fillRect(4, -28 - legOffset, 10, 28);

    // Feet
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(-16, -6 + legOffset, 14, 6);
    ctx.fillRect(4, -6 - legOffset, 14, 6);

    // Torso / Cockpit
    ctx.fillStyle = char.themeColor;
    ctx.fillRect(-15, -h * 0.65, 30, h * 0.35);

    // Chest vents & Cockpit hatch
    ctx.fillStyle = "#facc15";
    ctx.fillRect(-10, -h * 0.6, 6, 6);
    ctx.fillRect(4, -h * 0.6, 6, 6);
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(-5, -h * 0.48, 10, 10);

    // Shoulders
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-22, -h * 0.72, 12, 14);
    ctx.fillRect(10, -h * 0.72, 12, 14);

    // Gundam Head & V-Fin
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(-10, -h * 0.9, 20, 18);

    // V-Fin Antennas (Golden / White)
    ctx.beginPath();
    ctx.moveTo(0, -h * 0.9);
    ctx.lineTo(-18, -h * 1.05);
    ctx.lineTo(-2, -h * 0.92);
    ctx.lineTo(0, -h * 0.95);
    ctx.lineTo(2, -h * 0.92);
    ctx.lineTo(18, -h * 1.05);
    ctx.closePath();
    ctx.fillStyle = char.id === "char_zaku2" ? "#dc2626" : "#facc15";
    ctx.fill();

    // Eyes (Green / Red monoeye)
    if (char.id === "char_zaku2") {
      ctx.fillStyle = "#ec4899";
      ctx.beginPath();
      ctx.arc(3, -h * 0.83, 3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = char.id === "unicorn_crystal" ? "#10b981" : "#22c55e";
      ctx.fillRect(0, -h * 0.84, 8, 3);
    }

    // Weapons / Arms
    if (isAttacking) {
      // Beam Saber / Beam Rifle Slash
      ctx.save();
      ctx.translate(15, -h * 0.55);
      ctx.rotate(attackFrame * 1.5);
      ctx.fillStyle = "#f43f5e";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#f43f5e";
      ctx.fillRect(0, -4, 45, 8); // Beam Blade
      ctx.restore();
    } else {
      // Holding weapon resting
      ctx.fillStyle = "#475569";
      ctx.fillRect(10, -h * 0.55, 16, 8);
    }

    // Unicorn Psycho-Frame glow
    if (char.id === "unicorn_crystal") {
      ctx.strokeStyle = "rgba(16, 185, 129, 0.9)";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#10b981";
      ctx.strokeRect(-12, -h * 0.63, 24, h * 0.3);
    }

    ctx.restore();
  }

  // ─── 七龍珠角色渲染器 (Dragon Ball Fighter Renderer) ───
  renderDragonBall(ctx, fighter, char) {
    const h = fighter.height;
    const t = this.animTime;
    const isAttacking = fighter.state.startsWith("attack") || fighter.state.startsWith("skill") || fighter.state === "ult";
    const attackFrame = isAttacking ? Math.sin(fighter.attackTimer * 20) : 0;

    ctx.save();

    // Saiyan / Ki Aura
    if (fighter.rage >= 50 || char.rarity >= 6 || fighter.isCharging) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(-25, 0);
      ctx.quadraticCurveTo(-35 - Math.sin(t * 10) * 8, -h * 0.5, 0, -h * 1.15 - Math.cos(t * 12) * 10);
      ctx.quadraticCurveTo(35 + Math.sin(t * 10) * 8, -h * 0.5, 25, 0);
      ctx.closePath();
      ctx.fillStyle = char.auraColor;
      ctx.shadowBlur = 20;
      ctx.shadowColor = char.themeColor;
      ctx.fill();
      ctx.restore();
    }

    // Legs / Pants
    const legOffset = fighter.state === "run" ? Math.sin(t * 15) * 10 : 0;
    ctx.fillStyle = char.id === "vegeta" ? "#1e3a8a" : (char.id === "piccolo" ? "#581c87" : "#ea580c");
    if (char.id === "frieza_final" || char.id === "kid_buu") {
      ctx.fillStyle = char.id === "kid_buu" ? "#f472b6" : "#f1f5f9";
    }
    ctx.fillRect(-12, -26 + legOffset, 9, 26);
    ctx.fillRect(3, -26 - legOffset, 9, 26);

    // Boots
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(-14, -6 + legOffset, 12, 6);
    ctx.fillRect(3, -6 - legOffset, 12, 6);

    // Torso / Gi
    ctx.fillStyle = char.id === "vegeta" ? "#1e3a8a" : (char.id === "piccolo" ? "#581c87" : "#ea580c");
    if (char.id === "frieza_final") ctx.fillStyle = "#f8fafc";
    if (char.id === "kid_buu") ctx.fillStyle = "#f472b6";
    if (char.id === "broly_legendary") ctx.fillStyle = "#166534";
    ctx.fillRect(-14, -h * 0.65, 28, h * 0.35);

    // Chest & Shirt Undervest
    if (char.id.includes("goku") || char.id === "krillin" || char.id === "yamcha") {
      ctx.fillStyle = "#1d4ed8"; // Blue inner shirt
      ctx.fillRect(-6, -h * 0.65, 12, 10);
      ctx.fillStyle = "#1d4ed8"; // Blue belt
      ctx.fillRect(-15, -h * 0.35, 30, 6);
    } else if (char.id === "vegeta") {
      // Saiyan Armor Chestplate
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(-12, -h * 0.65, 24, 18);
      ctx.fillStyle = "#ca8a04";
      ctx.fillRect(-8, -h * 0.62, 16, 6);
    }

    // Head / Face
    ctx.fillStyle = char.id === "piccolo" ? "#22c55e" : (char.id === "kid_buu" ? "#f472b6" : "#fed7aa");
    ctx.beginPath();
    ctx.arc(0, -h * 0.78, 12, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = char.id === "goku_ultra_instinct" ? "#e2e8f0" : "#0f172a";
    ctx.fillRect(3, -h * 0.8, 4, 3);

    // Distinctive Hair / Antennae / Crown
    if (char.id === "goku_kid") {
      // Spiky black hair
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.moveTo(-12, -h * 0.82);
      ctx.lineTo(-20, -h * 0.95);
      ctx.lineTo(-8, -h * 0.92);
      ctx.lineTo(0, -h * 1.02);
      ctx.lineTo(8, -h * 0.92);
      ctx.lineTo(18, -h * 0.95);
      ctx.lineTo(12, -h * 0.82);
      ctx.closePath();
      ctx.fill();
    } else if (char.id === "ssj3_goku") {
      // Golden Long SSJ3 Hair
      ctx.fillStyle = "#facc15";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#facc15";
      ctx.beginPath();
      ctx.moveTo(-15, -h * 0.7);
      ctx.lineTo(-30, -h * 0.4);
      ctx.lineTo(-25, -h * 0.85);
      ctx.lineTo(-15, -h * 1.08);
      ctx.lineTo(0, -h * 1.15);
      ctx.lineTo(15, -h * 1.05);
      ctx.lineTo(25, -h * 0.85);
      ctx.lineTo(15, -h * 0.7);
      ctx.closePath();
      ctx.fill();
    } else if (char.id === "goku_ultra_instinct") {
      // Silver UI Hair
      ctx.fillStyle = "#e2e8f0";
      ctx.shadowBlur = 18;
      ctx.shadowColor = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(-14, -h * 0.82);
      ctx.lineTo(-22, -h * 1.02);
      ctx.lineTo(-8, -h * 0.95);
      ctx.lineTo(0, -h * 1.08);
      ctx.lineTo(10, -h * 0.95);
      ctx.lineTo(20, -h * 1.02);
      ctx.lineTo(14, -h * 0.82);
      ctx.closePath();
      ctx.fill();
    } else if (char.id === "piccolo") {
      // Piccolo Antennae & Turban / Ears
      ctx.fillStyle = "#15803d";
      ctx.fillRect(-2, -h * 0.92, 2, 8);
      ctx.fillRect(4, -h * 0.92, 2, 8);
    } else if (char.id === "frieza_final") {
      // Frieza Purple Head Gem & Tail
      ctx.fillStyle = "#9333ea";
      ctx.beginPath();
      ctx.arc(0, -h * 0.84, 5, 0, Math.PI * 2);
      ctx.fill();
      // Tail
      ctx.strokeStyle = "#f8fafc";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-10, -h * 0.35);
      ctx.quadraticCurveTo(-28, -h * 0.3, -25, -h * 0.55 + Math.sin(t * 5) * 5);
      ctx.stroke();
    } else if (char.id === "broly_legendary") {
      // Massive Green Super Saiyan Hair
      ctx.fillStyle = "#22c55e";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#22c55e";
      ctx.beginPath();
      ctx.moveTo(-20, -h * 0.8);
      ctx.lineTo(-35, -h * 1.1);
      ctx.lineTo(-12, -h * 1.0);
      ctx.lineTo(0, -h * 1.25);
      ctx.lineTo(15, -h * 1.0);
      ctx.lineTo(35, -h * 1.1);
      ctx.lineTo(20, -h * 0.8);
      ctx.closePath();
      ctx.fill();
    }

    // Arms & Attack Poses
    if (isAttacking) {
      ctx.save();
      ctx.translate(10, -h * 0.55);
      ctx.rotate(attackFrame);
      ctx.fillStyle = char.id === "piccolo" ? "#22c55e" : "#fed7aa";
      ctx.fillRect(0, -5, 26, 10); // Thrusting fist
      // Fist Energy Spark
      ctx.fillStyle = char.themeColor;
      ctx.beginPath();
      ctx.arc(28, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else {
      ctx.fillStyle = char.id === "piccolo" ? "#22c55e" : "#fed7aa";
      ctx.fillRect(8, -h * 0.55, 10, 16);
    }

    ctx.restore();
  }

  // ─── 漫威英雄渲染器 (Marvel Superhero Renderer) ───
  renderMarvel(ctx, fighter, char) {
    const h = fighter.height;
    const t = this.animTime;
    const isAttacking = fighter.state.startsWith("attack") || fighter.state.startsWith("skill") || fighter.state === "ult";
    const attackFrame = isAttacking ? Math.sin(fighter.attackTimer * 20) : 0;

    ctx.save();

    // Legs
    const legOffset = fighter.state === "run" ? Math.sin(t * 15) * 10 : 0;
    ctx.fillStyle = char.id === "spiderman_classic" ? "#1e40af" : (char.id === "ironman_mk50" ? "#b91c1c" : "#334155");
    if (char.id === "hulk") ctx.fillStyle = "#6b21a8"; // Purple shorts
    ctx.fillRect(-12, -26 + legOffset, 10, 26);
    ctx.fillRect(3, -26 - legOffset, 10, 26);

    // Boots
    ctx.fillStyle = char.id === "cap_america" ? "#dc2626" : (char.id === "ironman_mk50" ? "#ca8a04" : "#0f172a");
    ctx.fillRect(-14, -6 + legOffset, 12, 6);
    ctx.fillRect(3, -6 - legOffset, 12, 6);

    // Torso / Armor / Suit
    ctx.fillStyle = char.themeColor;
    if (char.id === "hulk") ctx.fillStyle = "#16a34a"; // Green muscular torso
    ctx.fillRect(-14, -h * 0.65, 28, h * 0.35);

    // Specific Superhero Features
    if (char.id === "cap_america") {
      // Star on chest
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-4, -h * 0.58, 8, 8);
      // Vibranium Shield on Arm
      ctx.save();
      ctx.translate(14, -h * 0.48);
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#dc2626";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#f8fafc";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#2563eb";
      ctx.fill();
      ctx.restore();
    } else if (char.id === "ironman_mk50") {
      // Glowing Arc Reactor
      ctx.fillStyle = "#38bdf8";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#38bdf8";
      ctx.beginPath();
      ctx.arc(0, -h * 0.52, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (char.id === "thor") {
      // Red Cape
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(-18, -h * 0.65, 8, 35);
      // Mjolnir Hammer
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(12, -h * 0.45, 14, 10);
      ctx.fillStyle = "#78350f";
      ctx.fillRect(17, -h * 0.35, 4, 12);
    } else if (char.id === "thanos_gauntlet") {
      // Infinity Gauntlet Golden Arm + 6 Stones
      ctx.save();
      ctx.translate(14, -h * 0.5);
      ctx.fillStyle = "#eab308";
      ctx.fillRect(0, -8, 22, 16);
      // Glowing Infinity Stones
      const stoneColors = ["#8b5cf6", "#3b82f6", "#ef4444", "#eab308", "#10b981", "#ec4899"];
      stoneColors.forEach((color, idx) => {
        ctx.fillStyle = color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = color;
        ctx.fillRect(16, -6 + idx * 3, 3, 3);
      });
      ctx.restore();
    } else if (char.id === "dr_strange" || char.id === "strange_supreme") {
      // Cloak of Levitation High Collar
      ctx.fillStyle = char.id === "strange_supreme" ? "#581c87" : "#dc2626";
      ctx.beginPath();
      ctx.moveTo(-18, -h * 0.68);
      ctx.lineTo(-24, -h * 0.85);
      ctx.lineTo(-14, -h * 0.72);
      ctx.closePath();
      ctx.fill();
    }

    // Head / Mask / Helmet
    ctx.fillStyle = char.id === "ironman_mk50" ? "#ca8a04" : (char.id === "hulk" ? "#16a34a" : (char.id === "thanos_gauntlet" ? "#a855f7" : "#fed7aa"));
    if (char.id === "spiderman_classic") ctx.fillStyle = "#dc2626";
    if (char.id === "black_panther") ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(0, -h * 0.78, 12, 0, Math.PI * 2);
    ctx.fill();

    // Eyes / Mask Visor
    if (char.id === "spiderman_classic") {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(4, -h * 0.78, 5, 3, 0.2, 0, Math.PI * 2);
      ctx.fill();
    } else if (char.id === "ironman_mk50") {
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(2, -h * 0.8, 6, 2);
    } else {
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(3, -h * 0.8, 4, 3);
    }

    // Arms & Attack Action
    if (isAttacking) {
      ctx.save();
      ctx.translate(10, -h * 0.55);
      ctx.rotate(attackFrame);
      ctx.fillStyle = char.themeColor;
      ctx.fillRect(0, -5, 24, 10);
      ctx.restore();
    }

    ctx.restore();
  }
}

if (typeof window !== "undefined") {
  window.characterRenderer = new CharacterRenderer();
}
