/**
 * 《CyberStriker: Quantum Arena》
 * 《荒野亂鬥》(Brawl Stars) 傳奇英雄極致高畫質細膩渲染引擎
 * 專為 6 位代表性英雄打造 100% 標誌性視覺美學：
 *
 * 1. 雪莉・散彈獵手 (Shelly):
 *    紫色立體蓬鬆捲髮、鮮黃牛仔領巾、深藍戰術背心、大口徑金屬雙管散彈槍、牛仔皮帶與星形扣
 * 2. 柯爾特・雙槍神警 (Colt):
 *    鮮紅流線飛機頭、白襯衫藍警長背心、金色六角警星徽章、雙持雕花銀白左輪手槍、自信神采
 * 3. 斯派克・傳奇仙人掌 (Spike):
 *    圓潤可愛翠綠仙人掌、頭頂盛開粉紅小花、深紫刺繡精緻短背心、萌系大黑圓眼與微笑、刺球手雷
 * 4. 普里莫・摔角霸王 (El Primo):
 *    藍金相間傳奇摔角手面具、健碩英雄胸肌體格、金色冠軍巨星重型金腰帶、火焰重拳護腕
 * 5. 黑鴉・暗影劇毒刺客 (Crow):
 *    黑色朋克機車皮夾克、銳利金黃鷹喙與血紅雙眼、背部黑色羽翼、雙持淬毒翡翠飛刀
 * 6. 里昂・變色龍神隱客 (Leon):
 *    鮮綠色變色龍連帽衛衣、巨大變色龍雙鈕扣眼、嘴角咬著紅白螺旋棒棒糖、旋轉四刃手裏劍
 */

export class BrawlSkinsRenderer {
  constructor() {
    this.brawlSkinIds = new Set([
      'skin_brawl_shelly',
      'skin_brawl_colt',
      'skin_brawl_spike',
      'skin_brawl_el_primo',
      'skin_brawl_crow',
      'skin_brawl_leon'
    ]);
  }

  isBrawl(skin) {
    return skin && skin.id && this.brawlSkinIds.has(skin.id);
  }

  _safeLinearGrad(ctx, x0, y0, x1, y1, stops, fallbackColor) {
    if (ctx && typeof ctx.createLinearGradient === 'function') {
      try {
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        if (g && typeof g.addColorStop === 'function') {
          for (const stop of stops) {
            g.addColorStop(stop[0], stop[1]);
          }
          return g;
        }
      } catch (e) {}
    }
    return fallbackColor;
  }

  _safeRadialGrad(ctx, x0, y0, r0, x1, y1, r1, stops, fallbackColor) {
    if (ctx && typeof ctx.createRadialGradient === 'function') {
      try {
        const g = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        if (g && typeof g.addColorStop === 'function') {
          for (const stop of stops) {
            g.addColorStop(stop[0], stop[1]);
          }
          return g;
        }
      } catch (e) {}
    }
    return fallbackColor;
  }

  // ─── 輔助繪圖工具 ───

  _drawStar(ctx, cx, cy, spikes, outerR, innerR, fillStyle, strokeStyle = null, lineWidth = 1) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerR;
      y = cy + Math.sin(rot) * outerR;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerR;
      y = cy + Math.sin(rot) * innerR;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerR);
    ctx.closePath();

    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
    ctx.restore();
  }

  _drawEyes(ctx, x, y, size = 6, pupilColor = '#1e1b4b', highlightColor = '#ffffff', isWinking = false) {
    ctx.save();
    if (isWinking) {
      // 眨眼
      ctx.strokeStyle = pupilColor;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(x, y + 1, size * 0.9, Math.PI * 0.1, Math.PI * 0.9);
      ctx.stroke();
    } else {
      // 靈動大眼睛
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(x, y, size, size * 1.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 瞳孔
      ctx.fillStyle = pupilColor;
      ctx.beginPath();
      ctx.ellipse(x + 1, y, size * 0.65, size * 0.85, 0, 0, Math.PI * 2);
      ctx.fill();

      // 水靈高光 (雙層白點)
      ctx.fillStyle = highlightColor;
      ctx.beginPath();
      ctx.arc(x, y - size * 0.4, size * 0.35, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + size * 0.4, y + size * 0.3, size * 0.18, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // ─── 1. 特殊氣場與光環 (Special Brawl Aura) ───
  drawAura(ctx, char, skin, t) {
    if (!this.isBrawl(skin)) return;
    const id = skin.id;

    ctx.save();

    switch (id) {
      case 'skin_brawl_shelly': {
        // 雪莉：散彈火星與旋轉金色獵手氣流
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 15;
        for (let i = 0; i < 4; i++) {
          const ang = (t * 0.08 + i * (Math.PI / 2)) % (Math.PI * 2);
          const r = 28 + Math.sin(t * 0.1 + i) * 6;
          const px = Math.cos(ang) * r;
          const py = -45 + Math.sin(ang) * 14;

          ctx.fillStyle = i % 2 === 0 ? '#facc15' : '#a855f7';
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }

      case 'skin_brawl_colt': {
        // 柯爾特：飄揚的警徽六角金星與疾速銀白彈道光痕
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 16;
        for (let i = 0; i < 3; i++) {
          const prog = (t * 0.04 + i * 0.33) % 1;
          const px = -25 + prog * 50;
          const py = -10 - prog * 70;
          const alpha = Math.sin(prog * Math.PI);
          ctx.globalAlpha = alpha;
          this._drawStar(ctx, px, py, 6, 4.5, 2.2, '#ffd700');
        }
        break;
      }

      case 'skin_brawl_spike': {
        // 斯派克：飄揚的粉紅花瓣與綠色仙人掌萌系氣泡
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 18;
        for (let i = 0; i < 4; i++) {
          const prog = (t * 0.035 + i * 0.25) % 1;
          const px = Math.sin(t * 0.06 + i * 1.5) * 26;
          const py = -15 - prog * 65;
          ctx.globalAlpha = Math.sin(prog * Math.PI) * 0.85;
          ctx.fillStyle = i % 2 === 0 ? '#f472b6' : '#4ade80';
          ctx.beginPath();
          ctx.ellipse(px, py, 3.5, 5, Math.sin(t * 0.1 + i), 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }

      case 'skin_brawl_el_primo': {
        // 普里莫：摔角霸王周身升騰的金色星光與熱血火星
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 20;
        for (let i = 0; i < 5; i++) {
          const prog = (t * 0.05 + i * 0.2) % 1;
          const px = Math.sin(t * 0.1 + i * 2) * (24 - prog * 8);
          const py = -prog * 85;
          ctx.globalAlpha = (1 - prog) * 0.9;
          this._drawStar(ctx, px, py, 5, 4.5, 2.2, '#fbbf24', '#f59e0b', 0.8);
        }
        break;
      }

      case 'skin_brawl_crow': {
        // 黑鴉：劇毒翡翠暗影霧氣與盤旋的烏鴉羽毛
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 18;
        for (let i = 0; i < 4; i++) {
          const prog = (t * 0.045 + i * 0.25) % 1;
          const px = Math.cos(t * 0.08 + i * 2) * 25;
          const py = -35 + Math.sin(t * 0.08 + i * 2) * 20;
          ctx.globalAlpha = Math.sin(prog * Math.PI) * 0.8;
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(px, py, 3 + prog * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }

      case 'skin_brawl_leon': {
        // 里昂：變色龍七彩全息光紋與糖果光圈
        ctx.shadowColor = '#2dd4bf';
        ctx.shadowBlur = 16;
        for (let i = 0; i < 3; i++) {
          const r = 18 + ((t * 1.5 + i * 20) % 45);
          const alpha = Math.max(0, 1 - r / 50);
          ctx.globalAlpha = alpha * 0.6;
          ctx.strokeStyle = i % 2 === 0 ? '#10b981' : '#f43f5e';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(0, -45, r, r * 0.45, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;
      }
    }

    ctx.restore();
  }

  // ─── 2. 角色精緻頭部 (Expressive HD Heads) ───
  drawHead(ctx, head, skin) {
    if (!this.isBrawl(skin)) return false;
    const id = skin.id;

    ctx.save();
    ctx.translate(head.x, head.y);
    ctx.rotate(head.angle);

    switch (id) {
      // ══════════════════════════════════════════════════
      // 1. 雪莉・散彈獵手 (Shelly)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_shelly': {
        // (A) 後層立體紫色蓬鬆大捲髮 (Volumetric Purple Curls)
        const hairGrad = this._safeLinearGrad(
          ctx,
          -16,
          -18,
          16,
          16,
          [
            [0, '#a855f7'],
            [0.5, '#7e22ce'],
            [1, '#581c87']
          ],
          '#7e22ce'
        );

        ctx.fillStyle = hairGrad;
        ctx.beginPath();
        ctx.arc(-10, -5, 12, 0, Math.PI * 2);
        ctx.arc(-14, 4, 9, 0, Math.PI * 2);
        ctx.arc(-8, -12, 10, 0, Math.PI * 2);
        ctx.arc(4, -14, 11, 0, Math.PI * 2);
        ctx.fill();

        // (B) 細膩溫潤膚色面龐
        const skinGrad = this._safeLinearGrad(
          ctx,
          0,
          -10,
          0,
          14,
          [
            [0, '#fed7aa'],
            [1, '#fdba74']
          ],
          '#fed7aa'
        );

        ctx.fillStyle = skinGrad;
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-10, 2);
        ctx.quadraticCurveTo(-11, -8, -3, -12);
        ctx.quadraticCurveTo(8, -12, 12, -4);
        ctx.quadraticCurveTo(14, 6, 8, 13);
        ctx.quadraticCurveTo(0, 16, -6, 13);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // (C) 前層前額飄逸紫髮劉海
        ctx.fillStyle = '#9333ea';
        ctx.beginPath();
        ctx.moveTo(-6, -12);
        ctx.quadraticCurveTo(2, -8, 6, -3);
        ctx.quadraticCurveTo(3, -5, 0, -6);
        ctx.quadraticCurveTo(-4, -5, -6, -10);
        ctx.closePath();
        ctx.fill();

        // (D) 俏皮大眼睛
        this._drawEyes(ctx, 4, 0, 5, '#581c87', '#ffffff');

        // (E) 招牌鮮黃色牛仔領巾 (Iconic Yellow Bandana)
        const scarfGrad = this._safeLinearGrad(
          ctx,
          -8,
          8,
          12,
          18,
          [
            [0, '#fde047'],
            [1, '#ca8a04']
          ],
          '#fde047'
        );

        ctx.fillStyle = scarfGrad;
        ctx.strokeStyle = '#a16207';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-8, 9);
        ctx.quadraticCurveTo(0, 11, 10, 8);
        ctx.lineTo(12, 13);
        ctx.lineTo(2, 20); // 領巾尖角下擺
        ctx.lineTo(-7, 14);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 領巾褶皺與小結
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(3, 14, 2.5, 0, Math.PI * 2);
        ctx.fill();

        break;
      }

      // ══════════════════════════════════════════════════
      // 2. 柯爾特・雙槍神警 (Colt)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_colt': {
        // (A) 高聳流線鮮紅飛機頭 (Signature Bright Red Pompadour)
        const pompadourGrad = this._safeLinearGrad(
          ctx,
          0,
          -26,
          8,
          0,
          [
            [0, '#f87171'],
            [0.4, '#ef4444'],
            [1, '#b91c1c']
          ],
          '#ef4444'
        );

        ctx.fillStyle = pompadourGrad;
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-11, -5);
        ctx.quadraticCurveTo(-14, -18, -4, -22);
        ctx.quadraticCurveTo(6, -26, 14, -18);
        ctx.quadraticCurveTo(18, -10, 13, -3);
        ctx.quadraticCurveTo(8, -8, 2, -10);
        ctx.quadraticCurveTo(-4, -10, -10, -5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 飛機頭立體高光線
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(-2, -20);
        ctx.quadraticCurveTo(5, -22, 11, -16);
        ctx.stroke();

        // (B) 神采奕奕的面部輪廓
        ctx.fillStyle = '#fed7aa';
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-9, -2);
        ctx.lineTo(8, -4);
        ctx.lineTo(13, 2);
        ctx.lineTo(10, 11);
        ctx.lineTo(2, 16); // 俊朗英挺下巴
        ctx.lineTo(-7, 12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 兩側紅髮鬢角
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(-10, -3, 3, 7);

        // (C) 自信水靈藍色大眼睛
        this._drawEyes(ctx, 4, 3, 4.5, '#0284c7', '#ffffff');

        // (D) 自信迷人露齒微笑
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(5, 11, 4, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();

        // 閃耀白牙
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(4, 10, 3, 2);

        break;
      }

      // ══════════════════════════════════════════════════
      // 3. 斯派克・傳奇仙人掌 (Spike)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_spike': {
        // (A) 圓滾滾翠綠仙人掌頭部 (Chubby Cute Cactus Dome)
        const cactusGrad = this._safeRadialGrad(
          ctx,
          -3,
          -4,
          2,
          0,
          0,
          16,
          [
            [0, '#86efac'],
            [0.6, '#22c55e'],
            [1, '#15803d']
          ],
          '#22c55e'
        );

        ctx.fillStyle = cactusGrad;
        ctx.strokeStyle = '#14532d';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // (B) 仙人掌表面萌趣黑色短刺
        ctx.fillStyle = '#0f172a';
        const spikes = [
          { x: -14, y: -4, r: -0.4 },
          { x: -12, y: 7, r: 0.3 },
          { x: 13, y: -5, r: 0.5 },
          { x: 12, y: 6, r: -0.3 },
          { x: -7, y: -13, r: -0.2 }
        ];
        spikes.forEach(s => {
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(s.r);
          ctx.beginPath();
          ctx.moveTo(-1.5, 0);
          ctx.lineTo(0, -4.5);
          ctx.lineTo(1.5, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });

        // (C) 標誌性呆萌純黑大眼與黑嘴巴
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(-4, 0, 3.8, 0, Math.PI * 2);
        ctx.arc(5, 0, 3.8, 0, Math.PI * 2);
        ctx.fill();

        // 倒三角小黑嘴
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(3, 8);
        ctx.lineTo(-3, 8);
        ctx.closePath();
        ctx.fill();

        // (D) 頭頂盛開的五瓣粉紅仙人掌花 (Pink Blossom Flower)
        ctx.save();
        ctx.translate(0, -15);
        ctx.fillStyle = '#ec4899';
        for (let p = 0; p < 5; p++) {
          const pAng = (p * Math.PI * 2) / 5;
          ctx.beginPath();
          ctx.arc(Math.cos(pAng) * 5, Math.sin(pAng) * 5, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        // 花蕊金色小圓球
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        break;
      }

      // ══════════════════════════════════════════════════
      // 4. 普里莫・摔角霸王 (El Primo)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_el_primo': {
        // (A) 皇家湛藍墨西哥摔角面具 (Royal Blue Luchador Mask)
        const maskGrad = this._safeLinearGrad(
          ctx,
          -14,
          -14,
          14,
          14,
          [
            [0, '#3b82f6'],
            [0.5, '#2563eb'],
            [1, '#1d4ed8']
          ],
          '#2563eb'
        );

        ctx.fillStyle = maskGrad;
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(-11, 4);
        ctx.quadraticCurveTo(-15, -6, -11, -14);
        ctx.quadraticCurveTo(0, -18, 11, -14);
        ctx.quadraticCurveTo(15, -6, 12, 5);
        ctx.lineTo(9, 13);
        ctx.lineTo(-8, 13);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // (B) 額頭閃耀金色摔角十字星徽
        this._drawStar(ctx, 0, -9, 4, 5.5, 2.4, '#ffd700', '#b45309', 1);

        // (C) 雙眼周圍華麗金色眼罩金邊 (Golden Luchador Eye Trim)
        ctx.fillStyle = '#ffd700';
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(-4, -1, 5, 3.5, -0.2, 0, Math.PI * 2);
        ctx.ellipse(5, -1, 5, 3.5, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 犀利純白鬥志目光
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-3, -1, 2.2, 0, Math.PI * 2);
        ctx.arc(4, -1, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // (D) 面具下方露出的剛毅嘴部與下巴 (Tanned Determined Jaw)
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(-5, 7);
        ctx.lineTo(6, 7);
        ctx.lineTo(4, 15);
        ctx.lineTo(-3, 15);
        ctx.closePath();
        ctx.fill();

        // 堅毅嘴角線
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-2, 10);
        ctx.lineTo(4, 10);
        ctx.stroke();

        break;
      }

      // ══════════════════════════════════════════════════
      // 5. 黑鴉・暗影劇毒刺客 (Crow)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_crow': {
        // (A) 漆黑渡鴉頭顱與朋克羽冠 (Black Raven Punk Crest)
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        // 銳利向上翹起的朋克羽毛
        ctx.moveTo(-7, -2);
        ctx.lineTo(-14, -10);
        ctx.lineTo(-8, -12);
        ctx.lineTo(-12, -20);
        ctx.lineTo(-3, -16);
        ctx.lineTo(2, -22);
        ctx.lineTo(6, -14);
        ctx.lineTo(12, -6);
        ctx.lineTo(6, 8);
        ctx.lineTo(-4, 7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // (B) 銳利鋒芒的金黃色金屬彎喙 (Golden Curved Beak)
        const beakGrad = this._safeLinearGrad(
          ctx,
          4,
          -4,
          18,
          5,
          [
            [0, '#fde047'],
            [0.6, '#eab308'],
            [1, '#ca8a04']
          ],
          '#eab308'
        );

        ctx.fillStyle = beakGrad;
        ctx.strokeStyle = '#854d0e';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(5, -4);
        ctx.quadraticCurveTo(14, -4, 19, 3); // 勾喙前尖
        ctx.quadraticCurveTo(12, 6, 4, 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 喙上鼻孔細節
        ctx.fillStyle = '#713f12';
        ctx.beginPath();
        ctx.arc(8, -1, 1, 0, Math.PI * 2);
        ctx.fill();

        // (C) 犀利猩紅渡鴉眼 (Crimson Predator Eye)
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.ellipse(2, -3, 4, 3, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // 金黃外圈與細長黑瞳
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(2.5, -3, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#020617';
        ctx.beginPath();
        ctx.ellipse(3, -3, 1, 2, 0.1, 0, Math.PI * 2);
        ctx.fill();

        break;
      }

      // ══════════════════════════════════════════════════
      // 6. 里昂・變色龍神隱客 (Leon)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_leon': {
        // (A) 鮮綠變色龍連帽衛衣 (Vibrant Chameleon Hoodie)
        const hoodGrad = this._safeLinearGrad(
          ctx,
          -14,
          -14,
          14,
          14,
          [
            [0, '#34d399'],
            [0.5, '#10b981'],
            [1, '#059669']
          ],
          '#10b981'
        );

        ctx.fillStyle = hoodGrad;
        ctx.strokeStyle = '#065f46';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(-11, 4);
        ctx.quadraticCurveTo(-15, -6, -10, -14);
        ctx.quadraticCurveTo(0, -17, 10, -14);
        ctx.quadraticCurveTo(15, -6, 12, 4);
        ctx.lineTo(8, 14);
        ctx.lineTo(-7, 14);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // (B) 衛衣兜帽頂部的一對巨大變色龍鈕扣雙眼 (Big Chameleon Eyes)
        // 左眼
        ctx.fillStyle = '#facc15';
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(-5, -14, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#020617';
        ctx.beginPath();
        ctx.ellipse(-5, -14, 1.6, 3.8, 0.1, 0, Math.PI * 2);
        ctx.fill();

        // 右眼
        ctx.fillStyle = '#facc15';
        ctx.strokeStyle = '#ca8a04';
        ctx.beginPath();
        ctx.arc(5, -14, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#020617';
        ctx.beginPath();
        ctx.ellipse(5, -14, 1.6, 3.8, -0.1, 0, Math.PI * 2);
        ctx.fill();

        // (C) 兜帽陰影下的俏皮少年下半臉
        ctx.fillStyle = '#064e3b';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#fed7aa';
        ctx.beginPath();
        ctx.moveTo(-5, 4);
        ctx.lineTo(6, 4);
        ctx.lineTo(3, 12);
        ctx.lineTo(-3, 12);
        ctx.closePath();
        ctx.fill();

        // 俏皮嘴角笑意
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(1, 7, 3, 0.1 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();

        // (D) 招牌紅白螺旋棒棒糖棍 (Lollipop Stick & Candy)
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(3, 8);
        ctx.lineTo(12, 11);
        ctx.stroke();

        // 圓形糖果本體
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(13, 12, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // 白色螺旋糖紋
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(13, 12, 2, 0, Math.PI * 1.5);
        ctx.stroke();

        break;
      }
    }

    ctx.restore();
    return true;
  }

  // ─── 3. 角色服裝與軀幹 (Detailed Outfits & Torsos) ───
  drawTorso(ctx, torso, skin, t) {
    if (!this.isBrawl(skin)) return false;
    const id = skin.id;

    ctx.save();
    ctx.translate(torso.x, torso.y);
    ctx.rotate(torso.angle);

    switch (id) {
      // ══════════════════════════════════════════════════
      // 1. 雪莉・散彈獵手 (Shelly)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_shelly': {
        // (A) 戰術深藍背心與白色內搭 (Tactical Denim Vest)
        ctx.fillStyle = '#1e3a8a';
        ctx.strokeStyle = '#172554';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(-14, -18, 28, 32, 6);
        ctx.fill();
        ctx.stroke();

        // 領口內搭白色背心
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(-7, -18);
        ctx.lineTo(7, -18);
        ctx.lineTo(0, -9);
        ctx.closePath();
        ctx.fill();

        // (B) 散彈槍彈帶 (Shotgun Shells Bandolier Across Chest)
        ctx.fillStyle = '#78350f';
        ctx.fillRect(-12, -4, 24, 6);

        // 4 顆紅金散彈槍子彈
        for (let s = 0; s < 4; s++) {
          const sx = -9 + s * 6;
          // 紅色塑膠外殼
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(sx, -6, 4, 8);
          // 金色黃銅底座
          ctx.fillStyle = '#fbbf24';
          ctx.fillRect(sx, 0, 4, 3);
        }

        // (C) 棕色皮革牛仔腰帶與大圓金扣 (Western Belt & Buckle)
        ctx.fillStyle = '#451a03';
        ctx.fillRect(-15, 14, 30, 8);

        // 金色大圓扣
        ctx.fillStyle = '#fbbf24';
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, 18, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        break;
      }

      // ══════════════════════════════════════════════════
      // 2. 柯爾特・雙槍神警 (Colt)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_colt': {
        // (A) 白襯衫底座
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(-12, -18, 24, 30);

        // 黑色警官領帶
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(-2, -16);
        ctx.lineTo(2, -16);
        ctx.lineTo(3, -4);
        ctx.lineTo(0, -1);
        ctx.lineTo(-3, -4);
        ctx.closePath();
        ctx.fill();

        // (B) 寶藍色警長西裝背心 (Royal Blue Sheriff Vest)
        ctx.fillStyle = '#1d4ed8';
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 1.8;
        // 左背心片
        ctx.beginPath();
        ctx.moveTo(-13, -18);
        ctx.lineTo(-4, -18);
        ctx.lineTo(-2, 14);
        ctx.lineTo(-13, 14);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // 右背心片
        ctx.beginPath();
        ctx.moveTo(13, -18);
        ctx.lineTo(4, -18);
        ctx.lineTo(2, 14);
        ctx.lineTo(13, 14);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // (C) 胸前六角金色警星胸章 (Sheriff Star Badge)
        this._drawStar(ctx, -7, -8, 6, 4.2, 2.2, '#ffd700', '#b45309', 0.8);

        // (D) 雙槍槍套皮帶與金色星形皮帶扣
        ctx.fillStyle = '#78350f';
        ctx.fillRect(-15, 14, 30, 8);
        this._drawStar(ctx, 0, 18, 5, 5.5, 2.6, '#ffd700', '#b45309', 1);

        break;
      }

      // ══════════════════════════════════════════════════
      // 3. 斯派克・傳奇仙人掌 (Spike)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_spike': {
        // (A) 仙人掌翠綠圓胖身體 (Plump Cactus Body)
        const cBodyGrad = this._safeLinearGrad(
          ctx,
          0,
          -18,
          0,
          18,
          [
            [0, '#22c55e'],
            [1, '#15803d']
          ],
          '#22c55e'
        );

        ctx.fillStyle = cBodyGrad;
        ctx.strokeStyle = '#14532d';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(-15, -18, 30, 34, 10);
        ctx.fill();
        ctx.stroke();

        // (B) 仙人掌表面尖刺
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(-12, -4);
        ctx.lineTo(-15, -6);
        ctx.lineTo(-12, -8);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(12, 2);
        ctx.lineTo(15, 0);
        ctx.lineTo(12, -2);
        ctx.fill();

        // (C) 深紫色精緻刺繡背心 (Embroidered Purple Vest)
        ctx.fillStyle = '#7e22ce';
        ctx.strokeStyle = '#fbbf24'; // 金色滾邊
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.roundRect(-13, -12, 26, 22, 6);
        ctx.fill();
        ctx.stroke();

        // 背心白色鈕扣
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, -4, 2, 0, Math.PI * 2);
        ctx.arc(0, 3, 2, 0, Math.PI * 2);
        ctx.fill();

        break;
      }

      // ══════════════════════════════════════════════════
      // 4. 普里莫・摔角霸王 (El Primo)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_el_primo': {
        // (A) 健碩古銅英雄胸肌與腹肌 (Muscular Tanned Torso)
        const skinGrad = this._safeLinearGrad(
          ctx,
          0,
          -18,
          0,
          14,
          [
            [0, '#f59e0b'],
            [1, '#d97706']
          ],
          '#f59e0b'
        );

        ctx.fillStyle = skinGrad;
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.roundRect(-16, -18, 32, 32, 6);
        ctx.fill();
        ctx.stroke();

        // 胸肌線條
        ctx.strokeStyle = 'rgba(120, 53, 15, 0.4)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(-11, -8);
        ctx.quadraticCurveTo(-5, -4, 0, -8);
        ctx.quadraticCurveTo(5, -4, 11, -8);
        ctx.stroke();

        // 腹肌分塊
        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(0, 12);
        ctx.moveTo(-6, 2);
        ctx.lineTo(6, 2);
        ctx.moveTo(-5, 8);
        ctx.lineTo(5, 8);
        ctx.stroke();

        // (B) 摔角冠軍金色超重腰帶 (Championship Gold Belt)
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(-17, 12, 34, 10);

        // 巨型金色冠軍獎牌
        const beltGrad = this._safeLinearGrad(
          ctx,
          -10,
          10,
          10,
          22,
          [
            [0, '#fde047'],
            [0.5, '#eab308'],
            [1, '#ca8a04']
          ],
          '#eab308'
        );

        ctx.fillStyle = beltGrad;
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(-9, 11, 18, 12, 3);
        ctx.fill();
        ctx.stroke();

        // 獎牌中央紅寶石與冠軍星
        this._drawStar(ctx, 0, 17, 5, 4.5, 2.2, '#ef4444', '#ffd700', 0.8);

        break;
      }

      // ══════════════════════════════════════════════════
      // 5. 黑鴉・暗影劇毒刺客 (Crow)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_crow': {
        // (A) 黑色機車皮革風衣 (Biker Leather Jacket)
        const leatherGrad = this._safeLinearGrad(
          ctx,
          0,
          -18,
          0,
          18,
          [
            [0, '#1e293b'],
            [1, '#020617']
          ],
          '#1e293b'
        );

        ctx.fillStyle = leatherGrad;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(-14, -18, 28, 34, 6);
        ctx.fill();
        ctx.stroke();

        // 立領大翻領
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(-14, -18);
        ctx.lineTo(-4, -10);
        ctx.lineTo(-12, -4);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(14, -18);
        ctx.lineTo(4, -10);
        ctx.lineTo(12, -4);
        ctx.closePath();
        ctx.fill();

        // 銀色金屬拉鍊與骷髏標誌
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(0, 15);
        ctx.stroke();

        // 白色骷髏符號
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(-6, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // (B) 黑色腰帶與鉚釘
        ctx.fillStyle = '#020617';
        ctx.fillRect(-15, 14, 30, 8);
        ctx.fillStyle = '#cbd5e1';
        for (let i = 0; i < 4; i++) {
          ctx.fillRect(-10 + i * 7, 16, 3, 3);
        }

        break;
      }

      // ══════════════════════════════════════════════════
      // 6. 里昂・變色龍神隱客 (Leon)
      // ══════════════════════════════════════════════════
      case 'skin_brawl_leon': {
        // (A) 鮮綠色變色龍連帽拉鍊衛衣 (Chameleon Hoodie)
        const hoodieGrad = this._safeLinearGrad(
          ctx,
          0,
          -18,
          0,
          18,
          [
            [0, '#10b981'],
            [1, '#047857']
          ],
          '#10b981'
        );

        ctx.fillStyle = hoodieGrad;
        ctx.strokeStyle = '#065f46';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(-14, -18, 28, 32, 6);
        ctx.fill();
        ctx.stroke();

        // 胸前黃色亮眼拉鍊線 (Yellow Zipper)
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -16);
        ctx.lineTo(0, 14);
        ctx.stroke();

        // 衛衣前方暖手大口袋 (Kangaroo Pocket)
        ctx.fillStyle = '#059669';
        ctx.strokeStyle = '#047857';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-10, 4);
        ctx.lineTo(10, 4);
        ctx.lineTo(12, 13);
        ctx.lineTo(-12, 13);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // (B) 休閒深藍運動短褲頭 (Blue Shorts Waistband)
        ctx.fillStyle = '#1d4ed8';
        ctx.fillRect(-14, 14, 28, 8);

        break;
      }
    }

    ctx.restore();
    return true;
  }

  // ─── 4. 角色手臂與武器道具 (Arms & Signature Weapons) ───
  drawArm(ctx, arm, skin, layer) {
    if (!this.isBrawl(skin)) return false;
    const id = skin.id;
    const isBack = layer === 'backArm';

    ctx.save();
    ctx.translate(arm.shoulderX, arm.shoulderY);
    ctx.rotate(arm.upperAngle);

    // 依角色風格定義手臂外觀色彩
    let sleeveColor = '#1e3a8a';
    let skinColor = '#fed7aa';

    if (id === 'skin_brawl_shelly') {
      sleeveColor = isBack ? '#172554' : '#1e3a8a';
      skinColor = '#fed7aa';
    } else if (id === 'skin_brawl_colt') {
      sleeveColor = '#f8fafc'; // 白襯衫捲袖
      skinColor = '#fed7aa';
    } else if (id === 'skin_brawl_spike') {
      sleeveColor = '#22c55e'; // 仙人掌本體
      skinColor = '#15803d';
    } else if (id === 'skin_brawl_el_primo') {
      sleeveColor = isBack ? '#d97706' : '#f59e0b'; // 健碩裸臂
      skinColor = '#f59e0b';
    } else if (id === 'skin_brawl_crow') {
      sleeveColor = isBack ? '#020617' : '#1e293b'; // 黑色皮夾克
      skinColor = '#0f172a';
    } else if (id === 'skin_brawl_leon') {
      sleeveColor = isBack ? '#047857' : '#10b981'; // 綠衛衣長袖
      skinColor = '#fed7aa';
    }

    // 1. 上臂
    ctx.fillStyle = sleeveColor;
    ctx.strokeStyle = isBack ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.roundRect(-4, 0, 8, 22, 4);
    ctx.fill();
    ctx.stroke();

    // 2. 前臂
    ctx.translate(0, 20);
    ctx.rotate(arm.foreAngle);

    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.roundRect(-4.5, 0, 9, 20, 4);
    ctx.fill();
    ctx.stroke();

    // 手腕護腕/手套
    if (id === 'skin_brawl_shelly') {
      ctx.fillStyle = '#78350f'; // 棕色皮革戰術手套
      ctx.fillRect(-5, 12, 10, 8);
    } else if (id === 'skin_brawl_colt') {
      ctx.fillStyle = '#475569'; // 深灰神槍手半指手套
      ctx.fillRect(-5, 12, 10, 8);
    } else if (id === 'skin_brawl_el_primo') {
      // 藍金摔角護腕
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(-5.5, 8, 11, 12);
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(-5.5, 12, 11, 4);
    } else if (id === 'skin_brawl_crow') {
      // 朋克銀鉚釘皮手套
      ctx.fillStyle = '#020617';
      ctx.fillRect(-5, 12, 10, 8);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-3, 14, 2, 2);
      ctx.fillRect(1, 14, 2, 2);
    }

    // 3. 前手手持專屬招牌武器道具 (僅在前臂渲染)
    if (!isBack) {
      this._drawBrawlWeapon(ctx, id, arm);
    }

    ctx.restore();
    return true;
  }

  // 繪製荒野亂鬥標誌性招牌武器
  _drawBrawlWeapon(ctx, id, arm) {
    ctx.save();
    ctx.translate(0, 18);

    switch (id) {
      case 'skin_brawl_shelly': {
        // 雪莉：經典大口徑雙管霰彈槍 (Double-Barrel Shotgun)
        // 槍托與木質握把
        ctx.fillStyle = '#92400e';
        ctx.beginPath();
        ctx.moveTo(-4, -2);
        ctx.lineTo(-12, 10);
        ctx.lineTo(-7, 12);
        ctx.lineTo(-2, 3);
        ctx.closePath();
        ctx.fill();

        // 金屬機匣
        ctx.fillStyle = '#334155';
        ctx.fillRect(-3, -4, 10, 8);

        // 粗獷雙金屬散彈槍管 (Twin Metal Barrels)
        const barrelGrad = this._safeLinearGrad(
          ctx,
          6,
          -5,
          24,
          -1,
          [
            [0, '#64748b'],
            [0.5, '#cbd5e1'],
            [1, '#475569']
          ],
          '#64748b'
        );

        ctx.fillStyle = barrelGrad;
        ctx.fillRect(6, -5, 20, 4);
        ctx.fillRect(6, -1, 20, 4);

        // 槍口金屬準星
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(23, -7, 3, 2);
        break;
      }

      case 'skin_brawl_colt': {
        // 柯爾特：雙持白銀精緻左輪手槍 (Dual Silver Revolvers)
        ctx.fillStyle = '#f1f5f9';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;

        // 槍管
        ctx.fillRect(2, -4, 18, 5);
        // 轉輪輪巢
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.ellipse(4, -1.5, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 象牙白手柄
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.lineTo(-6, 9);
        ctx.lineTo(-2, 10);
        ctx.lineTo(2, 2);
        ctx.closePath();
        ctx.fill();

        // 警星握把裝飾
        this._drawStar(ctx, -3, 5, 5, 1.8, 0.8, '#ffd700');
        break;
      }

      case 'skin_brawl_spike': {
        // 斯派克：手持圓滾滾尖刺仙人掌手雷 (Spiky Cactus Bomb)
        ctx.fillStyle = '#22c55e';
        ctx.strokeStyle = '#14532d';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(8, 2, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 仙人掌尖刺
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(15, 1, 3, 2);
        ctx.fillRect(8, 9, 2, 3);
        ctx.fillRect(8, -5, 2, 3);

        // 引信與火花
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(8, -4);
        ctx.quadraticCurveTo(12, -8, 14, -6);
        ctx.stroke();
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(14, -6, 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'skin_brawl_crow': {
        // 黑鴉：劇毒翡翠飛刀 (Toxic Emerald Dagger)
        const bladeGrad = this._safeLinearGrad(
          ctx,
          0,
          -3,
          18,
          0,
          [
            [0, '#10b981'],
            [0.6, '#34d399'],
            [1, '#a7f3d0']
          ],
          '#10b981'
        );

        ctx.fillStyle = bladeGrad;
        ctx.beginPath();
        ctx.moveTo(2, -3);
        ctx.lineTo(20, 0);
        ctx.lineTo(2, 3);
        ctx.closePath();
        ctx.fill();

        // 毒液滴落微粒
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(22, 1, 1.5, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'skin_brawl_leon': {
        // 里昂：四刃飛旋手裏劍 (Quad Shuriken)
        ctx.save();
        ctx.translate(6, 2);
        const rot = (Date.now() / 80) % (Math.PI * 2);
        ctx.rotate(rot);

        this._drawStar(ctx, 0, 0, 4, 8, 3, '#38bdf8', '#0284c7', 1.2);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        break;
      }
    }

    ctx.restore();
  }

  // ─── 5. 角色腿部與戰靴 (Legs & Stylish Footwear) ───
  drawLimb(ctx, leg, skin, layer) {
    if (!this.isBrawl(skin)) return false;
    const id = skin.id;
    const isBack = layer === 'backLeg';

    ctx.save();
    ctx.translate(leg.hipX, leg.hipY);
    ctx.rotate(leg.thighAngle);

    // 依外觀定義褲色與鞋色
    let pantsColor = '#1d4ed8';
    let bootColor = '#78350f';

    if (id === 'skin_brawl_shelly') {
      pantsColor = isBack ? '#1e3a8a' : '#2563eb'; // 牛仔藍褲
      bootColor = '#451a03'; // 棕黑牛仔靴
    } else if (id === 'skin_brawl_colt') {
      pantsColor = isBack ? '#0f172a' : '#1e293b'; // 深灰修身西裝褲
      bootColor = '#78350f'; // 棕色靴附銀馬刺
    } else if (id === 'skin_brawl_spike') {
      pantsColor = '#16a34a'; // 翠綠短腿
      bootColor = '#78350f';
    } else if (id === 'skin_brawl_el_primo') {
      pantsColor = isBack ? '#1d4ed8' : '#2563eb'; // 皇家藍摔角緊身褲
      bootColor = '#ffd700'; // 金色摔角長靴
    } else if (id === 'skin_brawl_crow') {
      pantsColor = isBack ? '#020617' : '#0f172a'; // 黑色緊身皮褲
      bootColor = '#dc2626'; // 紅鞋帶戰靴
    } else if (id === 'skin_brawl_leon') {
      pantsColor = isBack ? '#1e40af' : '#2563eb'; // 藍色短褲
      bootColor = '#fed7aa'; // 赤足敏捷戰士
    }

    // 1. 大腿
    ctx.fillStyle = pantsColor;
    ctx.strokeStyle = isBack ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.roundRect(-6, 0, 12, 28, 4);
    ctx.fill();
    ctx.stroke();

    // 2. 小腿與戰靴
    ctx.translate(0, 26);
    ctx.rotate(leg.shinAngle);

    ctx.fillStyle = pantsColor;
    ctx.beginPath();
    ctx.roundRect(-5, 0, 10, 28, 4);
    ctx.fill();
    ctx.stroke();

    // 3. 靴子與腳掌
    ctx.translate(0, 26);
    ctx.rotate(leg.footAngle || 0);

    ctx.fillStyle = bootColor;
    ctx.beginPath();
    ctx.roundRect(-5, 0, 18, 10, 4);
    ctx.fill();
    ctx.stroke();

    // 柯爾特靴後銀馬刺
    if (id === 'skin_brawl_colt') {
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-8, 3, 4, 3);
    }

    ctx.restore();
    return true;
  }

  // ─── 6. 專屬幾何防禦盾 (Stylized Guard Shields) ───
  drawGuardShield(ctx, stance, skin, t) {
    if (!this.isBrawl(skin)) return false;
    const id = skin.id;

    ctx.save();
    const sy = stance === 'low' ? 15 : -35;
    ctx.translate(28, sy);

    switch (id) {
      case 'skin_brawl_shelly': {
        // 金黃警星防禦盾壁
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 24;
        ctx.strokeStyle = '#facc15';
        ctx.fillStyle = 'rgba(250, 204, 21, 0.25)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 36, -Math.PI * 0.45, Math.PI * 0.45);
        ctx.lineTo(-10, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        this._drawStar(ctx, 12, 0, 5, 10, 5, '#fbbf24');
        break;
      }

      case 'skin_brawl_colt': {
        // 雙左輪全息封鎖星環
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 22;
        ctx.strokeStyle = '#38bdf8';
        ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(10, 0, 28, 40, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        this._drawStar(ctx, 10, 0, 6, 12, 6, '#ffd700');
        break;
      }

      case 'skin_brawl_spike': {
        // 旋轉巨大仙人掌花防禦力場
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 26;
        ctx.strokeStyle = '#22c55e';
        ctx.fillStyle = 'rgba(34, 197, 94, 0.28)';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(12, 0, 38, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // 旋轉粉紅花心
        ctx.fillStyle = '#ec4899';
        for (let f = 0; f < 5; f++) {
          const fa = (t * 0.1 + f * Math.PI * 0.4);
          ctx.beginPath();
          ctx.arc(12 + Math.cos(fa) * 14, Math.sin(fa) * 14, 6, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }

      case 'skin_brawl_el_primo': {
        // 摔角霸王金光冠軍金鐘罩
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 30;
        ctx.strokeStyle = '#fbbf24';
        ctx.fillStyle = 'rgba(251, 191, 36, 0.3)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(10, 0, 42, -Math.PI * 0.5, Math.PI * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        this._drawStar(ctx, 10, 0, 8, 14, 7, '#ffd700');
        break;
      }

      case 'skin_brawl_crow': {
        // 劇毒羽翼暗夜護壁
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 25;
        ctx.strokeStyle = '#10b981';
        ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(10, 0, 24, 42, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
      }

      case 'skin_brawl_leon': {
        // 變色龍全息光學隱身屏障
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 24;
        ctx.strokeStyle = '#34d399';
        ctx.fillStyle = 'rgba(52, 211, 153, 0.25)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(0, -38, 26, 76, 12);
        ctx.fill();
        ctx.stroke();
        break;
      }
    }

    ctx.restore();
    return true;
  }

  // ─── 7. 專屬打擊攻擊特效 (VFX) ───
  drawAttackVFX(ctx, vfx, skin) {
    if (!this.isBrawl(skin)) return false;
    const id = skin.id;

    ctx.save();
    switch (id) {
      case 'skin_brawl_shelly': {
        // 散彈槍轟擊扇形火花與煙霧 (Shotgun Pellets & Blast Smoke)
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#fde047';
        for (let i = 0; i < 7; i++) {
          const ang = -0.35 + (i / 6) * 0.7;
          const dist = 32 + Math.random() * 25;
          ctx.beginPath();
          ctx.arc(Math.cos(ang) * dist + 15, Math.sin(ang) * dist - 30, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        // 槍口金色火光
        ctx.fillStyle = 'rgba(250, 204, 21, 0.85)';
        ctx.beginPath();
        ctx.ellipse(32, -32, 16, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      case 'skin_brawl_colt': {
        // 雙槍疾速穿透金光子彈軌跡 (Bullet Trails)
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(25, -34, 24, 3);
        ctx.fillRect(32, -26, 26, 3);
        // 子彈金芒火花
        ctx.fillStyle = '#ffd700';
        this._drawStar(ctx, 52, -32, 5, 5, 2, '#ffd700');
        break;
      }

      case 'skin_brawl_spike': {
        // 仙人掌尖刺爆發彈射 (Needle Burst)
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#15803d';
        for (let n = 0; n < 6; n++) {
          const ang = (n * Math.PI) / 3;
          ctx.save();
          ctx.translate(35 + Math.cos(ang) * 16, -28 + Math.sin(ang) * 16);
          ctx.rotate(ang);
          ctx.fillRect(-1.5, 0, 3, 8);
          ctx.restore();
        }
        break;
      }

      case 'skin_brawl_el_primo': {
        // 摔角流星火焰重拳 (Meteor Fist Flame)
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 28;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(38, -30, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(42, -30, 11, 0, Math.PI * 2);
        ctx.fill();
        this._drawStar(ctx, 42, -30, 5, 8, 4, '#ffffff');
        break;
      }

      case 'skin_brawl_crow': {
        // 淬毒綠芒飛刀破空 (Toxic Green Dagger Trails)
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 22;
        ctx.fillStyle = '#34d399';
        for (let d = 0; d < 3; d++) {
          const dy = -40 + d * 10;
          ctx.beginPath();
          ctx.moveTo(25, dy);
          ctx.lineTo(48, dy);
          ctx.lineTo(25, dy + 3);
          ctx.closePath();
          ctx.fill();
        }
        break;
      }

      case 'skin_brawl_leon': {
        // 旋轉四刃飛鏢破空幻影 (Shuriken Illusion)
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 20;
        this._drawStar(ctx, 42, -30, 4, 12, 4, '#00f3ff');
        this._drawStar(ctx, 32, -34, 4, 8, 3, 'rgba(0, 243, 255, 0.45)');
        break;
      }
    }
    ctx.restore();
    return true;
  }
}

export const brawlSkinsRenderer = new BrawlSkinsRenderer();
