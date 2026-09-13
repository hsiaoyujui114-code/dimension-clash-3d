/**
 * 《CyberStriker: Quantum Arena》
 * 多主題戰鬥場景渲染引擎 (Multi-Themed Stage Renderer)
 * 負責 4 大經典戰鬥場景的高效畫布渲染與動態環境氛圍 (60 FPS Procedural Canvas)
 */

export class StageRenderer {
  constructor() {
    this.timeTick = 0;
    this.rainParticles = [];
    this.matrixGlyphs = [];
    this.clouds = [];
    this.lightningTimer = 0;
    this.lightningFlash = 0;

    this._initRain();
    this._initMatrixGlyphs();
    this._initClouds();
  }

  _initRain() {
    this.rainParticles = [];
    for (let i = 0; i < 90; i++) {
      this.rainParticles.push({
        x: Math.random() * 2000,
        y: Math.random() * 1000,
        speed: 12 + Math.random() * 8,
        length: 14 + Math.random() * 10
      });
    }
  }

  _initMatrixGlyphs() {
    this.matrixGlyphs = [];
    for (let i = 0; i < 40; i++) {
      this.matrixGlyphs.push({
        x: Math.random() * 2000,
        y: Math.random() * 800,
        speed: 2 + Math.random() * 4,
        size: 10 + Math.random() * 6,
        char: String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
      });
    }
  }

  _initClouds() {
    this.clouds = [
      { x: 100, y: 70, scale: 1.1, speed: 0.18 },
      { x: 450, y: 110, scale: 0.8, speed: 0.12 },
      { x: 800, y: 60, scale: 1.3, speed: 0.22 },
      { x: 1250, y: 95, scale: 0.9, speed: 0.15 }
    ];
  }

  /**
   * 繪製場景背景與環境
   */
  drawStage(ctx, stage, w, h, floorY) {
    this.timeTick++;
    if (!stage) return;

    switch (stage.id) {
      case 'stage_tenkaichi':
        this._drawTenkaichiStage(ctx, w, h, floorY);
        break;
      case 'stage_stark_tower':
        this._drawStarkTowerStage(ctx, w, h, floorY);
        break;
      case 'stage_namek':
        this._drawNamekStage(ctx, w, h, floorY);
        break;
      case 'stage_cyber_matrix':
      default:
        this._drawCyberMatrixStage(ctx, w, h, floorY);
        break;
    }
  }

  // ─── 1. 賽博量子空間 (Cyber Matrix) ───
  _drawCyberMatrixStage(ctx, w, h, floorY) {
    // 天空背景漸層
    const grad = ctx.createLinearGradient(0, 0, 0, floorY);
    grad.addColorStop(0, '#040714');
    grad.addColorStop(0.6, '#0a1026');
    grad.addColorStop(1, '#0e1738');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, floorY);

    // 背景全息虛擬網格
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let y = 30; y < floorY; y += 35) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 數位雨粒子代碼流 (Digital Rain)
    ctx.fillStyle = 'rgba(0, 243, 255, 0.35)';
    ctx.font = '11px monospace';
    this.matrixGlyphs.forEach(g => {
      g.y += g.speed;
      if (g.y > floorY) {
        g.y = -20;
        g.x = Math.random() * w;
      }
      ctx.fillText(g.char, g.x, g.y);
    });

    // 懸浮 3D 全息多面體 (Wireframe Neon Polyhedrons)
    this._drawHoloCube(ctx, w * 0.15, 120, 36, this.timeTick * 0.015, '#00f3ff');
    this._drawHoloCube(ctx, w * 0.85, 140, 42, -this.timeTick * 0.012, '#ff007f');

    // 擂台地面
    ctx.fillStyle = '#0a0e1e';
    ctx.fillRect(0, floorY, w, h - floorY);

    // 透視透光格線
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.22)';
    ctx.lineWidth = 1.5;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, floorY);
      ctx.lineTo(x + (x - w / 2) * 0.3, h);
      ctx.stroke();
    }
    // 橫向透視線
    for (let gy = floorY + 12; gy < h; gy += 24) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }

    // 地表亮藍色邊緣能量條
    ctx.fillStyle = 'rgba(0, 243, 255, 0.85)';
    ctx.fillRect(0, floorY - 2, w, 3);
  }

  _drawHoloCube(ctx, cx, cy, size, angle, color) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.lineWidth = 1.8;

    // 外正方形
    ctx.strokeRect(-size / 2, -size / 2, size, size);
    // 內縮透視菱形
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.65);
    ctx.lineTo(size * 0.65, 0);
    ctx.lineTo(0, size * 0.65);
    ctx.lineTo(-size * 0.65, 0);
    ctx.closePath();
    ctx.stroke();

    // 核心能量光點
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // ─── 2. 天下第一武道會 (Tenkaichi Budokai) ───
  _drawTenkaichiStage(ctx, w, h, floorY) {
    // 湛藍動漫天空
    const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
    skyGrad.addColorStop(0, '#1d4ed8');
    skyGrad.addColorStop(0.45, '#38bdf8');
    skyGrad.addColorStop(1, '#bae6fd');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, floorY);

    // 遠方青山
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.moveTo(0, floorY);
    ctx.lineTo(0, floorY - 140);
    ctx.quadraticCurveTo(w * 0.25, floorY - 220, w * 0.5, floorY - 150);
    ctx.quadraticCurveTo(w * 0.75, floorY - 250, w, floorY - 130);
    ctx.lineTo(w, floorY);
    ctx.closePath();
    ctx.fill();

    // 翠綠近山
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(0, floorY);
    ctx.lineTo(0, floorY - 80);
    ctx.quadraticCurveTo(w * 0.35, floorY - 160, w * 0.65, floorY - 90);
    ctx.quadraticCurveTo(w * 0.85, floorY - 140, w, floorY - 70);
    ctx.lineTo(w, floorY);
    ctx.closePath();
    ctx.fill();

    // 動漫白雲
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    this.clouds.forEach(c => {
      c.x += c.speed;
      if (c.x > w + 150) c.x = -150;
      this._drawCloud(ctx, c.x, c.y, c.scale);
    });

    // 背景中央：武道館屋頂 (Pagoda Pavilion)
    const pw = 220;
    const px = w / 2 - pw / 2;
    const py = floorY - 110;
    ctx.fillStyle = '#b91c1c'; // 朱紅屋頂
    ctx.beginPath();
    ctx.moveTo(px - 20, py + 35);
    ctx.lineTo(w / 2, py);
    ctx.lineTo(px + pw + 20, py + 35);
    ctx.lineTo(px + pw, py + 45);
    ctx.lineTo(px, py + 45);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 屋脊金龍珠寶塔頂
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(w / 2, py - 4, 8, 0, Math.PI * 2);
    ctx.fill();

    // 兩側飄揚的「武」字旗幟
    this._drawTenkaichiBanner(ctx, w * 0.18, floorY - 160, '武');
    this._drawTenkaichiBanner(ctx, w * 0.82, floorY - 160, '武');

    // 擂台石磚地面 (Yellow Stone Bricks)
    ctx.fillStyle = '#d97706';
    ctx.fillRect(0, floorY, w, h - floorY);

    // 石磚鋪面格線
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1.5;
    for (let x = 0; x < w; x += 55) {
      ctx.beginPath();
      ctx.moveTo(x, floorY);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let gy = floorY + 16; gy < h; gy += 20) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }

    // 經典武道會白色石欄界線 (White Boundary Tile Ring)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, floorY - 4, w, 5);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    for (let bx = 0; bx < w; bx += 40) {
      ctx.strokeRect(bx, floorY - 4, 40, 5);
    }
  }

  _drawCloud(ctx, cx, cy, scale) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.arc(22, -6, 20, 0, Math.PI * 2);
    ctx.arc(42, 2, 18, 0, Math.PI * 2);
    ctx.arc(-18, 4, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  _drawTenkaichiBanner(ctx, bx, by, text) {
    ctx.save();
    // 旗桿
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx, by + 160);
    ctx.stroke();

    // 旗幟布面微風微動
    const wave = Math.sin(this.timeTick * 0.08) * 6;
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.quadraticCurveTo(bx + 35, by + wave, bx + 55, by + 10);
    ctx.lineTo(bx + 55, by + 85 + wave);
    ctx.quadraticCurveTo(bx + 25, by + 75, bx, by + 80);
    ctx.closePath();
    ctx.fill();

    // 旗幟文字「武」
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 26px "Noto Sans TC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, bx + 28, by + 50);

    ctx.restore();
  }

  // ─── 3. 斯塔克大樓天台 (Stark Tower Rooftop) ───
  _drawStarkTowerStage(ctx, w, h, floorY) {
    // 午夜暴風雨天際線
    const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
    skyGrad.addColorStop(0, '#020617');
    skyGrad.addColorStop(0.6, '#0f172a');
    skyGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, floorY);

    // 隨機遠方雷電閃光 (Lightning Flash)
    this.lightningTimer++;
    if (this.lightningTimer > 280 && Math.random() < 0.04) {
      this.lightningFlash = 4;
      this.lightningTimer = 0;
    }
    if (this.lightningFlash > 0) {
      this.lightningFlash--;
      ctx.fillStyle = `rgba(224, 242, 254, ${this.lightningFlash * 0.18})`;
      ctx.fillRect(0, 0, w, floorY);
    }

    // 曼哈頓摩天大樓剪影與燈光
    this._drawSkyline(ctx, w, floorY);

    // 降雨粒子 (Rain Streaks)
    ctx.strokeStyle = 'rgba(186, 230, 253, 0.4)';
    ctx.lineWidth = 1.2;
    this.rainParticles.forEach(p => {
      p.x -= 2.5; // 風向微斜
      p.y += p.speed;
      if (p.y > floorY) {
        p.y = -20;
        p.x = Math.random() * (w + 200);
      }
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - 4, p.y + p.length);
      ctx.stroke();
    });

    // 斯塔克大樓停機坪地面
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, floorY, w, h - floorY);

    // 中央巨型復仇者「A」標誌 (Avengers Arc Light Logo)
    const logoX = w / 2;
    const logoY = floorY + 60;
    ctx.save();
    ctx.translate(logoX, logoY);
    ctx.scale(1, 0.45); // 俯視透視感
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 5;
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(0, 0, 65, 0, Math.PI * 2);
    ctx.stroke();

    // 經典 A 字箭頭
    ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
    ctx.font = '900 80px "Rajdhani", "Orbitron", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', 0, 0);
    ctx.restore();

    // 天台金屬護欄與高科技紅色警示指示燈
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, floorY - 5, w, 6);
    for (let lx = 30; lx < w; lx += 90) {
      const glow = Math.sin(this.timeTick * 0.1 + lx) > 0;
      ctx.fillStyle = glow ? '#ef4444' : '#7f1d1d';
      ctx.beginPath();
      ctx.arc(lx, floorY - 3, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _drawSkyline(ctx, w, floorY) {
    const buildings = [
      { x: 30, w: 85, h: 220 },
      { x: 130, w: 65, h: 180 },
      { x: 210, w: 110, h: 260 },
      { x: 340, w: 75, h: 190 },
      { x: w * 0.45, w: 130, h: 310 }, // 帝國大廈風
      { x: w * 0.62, w: 90, h: 240 },
      { x: w * 0.74, w: 80, h: 170 },
      { x: w * 0.84, w: 120, h: 270 }
    ];

    buildings.forEach(b => {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(b.x, floorY - b.h, b.w, b.h);

      // 辦公室窗光
      ctx.fillStyle = 'rgba(253, 224, 71, 0.5)';
      for (let wy = floorY - b.h + 18; wy < floorY - 20; wy += 22) {
        for (let wx = b.x + 10; wx < b.x + b.w - 10; wx += 14) {
          if ((wx + wy) % 5 !== 0) {
            ctx.fillRect(wx, wy, 6, 8);
          }
        }
      }
    });
  }

  // ─── 4. 那美克星 (Planet Namek) ───
  _drawNamekStage(ctx, w, h, floorY) {
    // 經典青檸綠異星天空
    const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
    skyGrad.addColorStop(0, '#365314');
    skyGrad.addColorStop(0.5, '#65a30d');
    skyGrad.addColorStop(1, '#bef264');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, floorY);

    // 雙子外星明月 (Two Suns / Moons)
    // 1號大金陽
    ctx.fillStyle = 'rgba(254, 240, 138, 0.85)';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(w * 0.22, 100, 38, 0, Math.PI * 2);
    ctx.fill();

    // 2號小青月
    ctx.fillStyle = 'rgba(167, 243, 208, 0.8)';
    ctx.shadowColor = '#34d399';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(w * 0.32, 65, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 遠方青碧海洋 (Turquoise Ocean Horizon)
    ctx.fillStyle = '#0f766e';
    ctx.fillRect(0, floorY - 90, w, 90);

    // 那美克星奇異梯狀斷崖高原 (Namekian Tiered Cliffs)
    ctx.fillStyle = '#0d9488';
    ctx.beginPath();
    ctx.moveTo(0, floorY);
    ctx.lineTo(0, floorY - 130);
    ctx.lineTo(w * 0.28, floorY - 130);
    ctx.lineTo(w * 0.32, floorY - 70);
    ctx.lineTo(w * 0.65, floorY - 70);
    ctx.lineTo(w * 0.72, floorY - 150);
    ctx.lineTo(w, floorY - 150);
    ctx.lineTo(w, floorY);
    ctx.closePath();
    ctx.fill();

    // 標誌性亞奇薩神木 (Ajisa Trees - 球狀藍綠色樹冠)
    this._drawAjisaTree(ctx, w * 0.12, floorY, 110);
    this._drawAjisaTree(ctx, w * 0.88, floorY, 125);
    this._drawAjisaTree(ctx, w * 0.94, floorY, 95);

    // 擂台青碧苔蘚石地
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, floorY, w, h - floorY);

    // 異星微光晶石裂痕
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
    ctx.lineWidth = 2;
    for (let rx = 20; rx < w; rx += 70) {
      ctx.beginPath();
      ctx.moveTo(rx, floorY);
      ctx.lineTo(rx + 25, floorY + 30);
      ctx.lineTo(rx + 15, h);
      ctx.stroke();
    }

    // 地表苔原螢光線
    ctx.fillStyle = 'rgba(52, 211, 153, 0.9)';
    ctx.fillRect(0, floorY - 3, w, 4);
  }

  _drawAjisaTree(ctx, tx, floorY, height) {
    ctx.save();
    // 細長深褐色樹幹
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(tx, floorY);
    ctx.lineTo(tx, floorY - height);
    ctx.stroke();

    // 球狀青綠色球型樹冠 (Spherical Foliage)
    ctx.fillStyle = '#14b8a6';
    ctx.shadowColor = '#2dd4bf';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(tx, floorY - height, 26, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#5eead4';
    ctx.beginPath();
    ctx.arc(tx - 6, floorY - height - 8, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * 繪製與場景匹配的主題空中浮空平台
   */
  drawPlatforms(ctx, platforms, stage) {
    if (!platforms || platforms.length === 0) return;
    const stageId = stage ? stage.id : 'stage_cyber_matrix';

    platforms.forEach(p => {
      ctx.save();
      if (stageId === 'stage_tenkaichi') {
        // 武道會：古代懸浮漢白玉雕花石階
        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 2.5;
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(p.x, p.y, p.width, p.height, 6);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.fillRect(p.x, p.y, p.width, p.height);
          ctx.strokeRect(p.x, p.y, p.width, p.height);
        }
        // 金色祥雲紋飾
        ctx.fillStyle = '#eab308';
        ctx.fillRect(p.x + 8, p.y + p.height - 4, p.width - 16, 2);
      } else if (stageId === 'stage_stark_tower') {
        // 斯塔克大樓：工業高強度合金鋼架與藍色警示燈
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.fillRect(p.x, p.y, p.width, p.height);
        ctx.strokeRect(p.x, p.y, p.width, p.height);
        // 側翼亮藍色光條
        ctx.fillStyle = '#00f3ff';
        ctx.fillRect(p.x + 4, p.y + 2, p.width - 8, 3);
      } else if (stageId === 'stage_namek') {
        // 那美克星：懸浮翠綠異星晶石岩塊
        ctx.fillStyle = '#0f766e';
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 10;
        ctx.fillRect(p.x, p.y, p.width, p.height);
        ctx.strokeRect(p.x, p.y, p.width, p.height);
        // 晶核綠芒
        ctx.fillStyle = '#6ee7b7';
        ctx.fillRect(p.x + 6, p.y + 3, p.width - 12, 3);
      } else {
        // 賽博量子空間：預設全息霓虹能量跳台
        ctx.fillStyle = 'rgba(11, 17, 32, 0.9)';
        ctx.strokeStyle = p.color || '#00f3ff';
        ctx.lineWidth = 2;
        ctx.shadowColor = p.color || '#00f3ff';
        ctx.shadowBlur = 12;
        ctx.fillRect(p.x, p.y, p.width, p.height);
        ctx.strokeRect(p.x, p.y, p.width, p.height);
        ctx.fillStyle = p.color || '#00f3ff';
        ctx.fillRect(p.x, p.y, p.width, 3);
      }
      ctx.restore();
    });
  }
}

export const stageRenderer = new StageRenderer();
