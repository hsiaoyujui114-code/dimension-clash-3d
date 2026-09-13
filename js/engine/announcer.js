/**
 * 《CyberStriker: Quantum Arena》
 * 戰鬥播報語音與華麗打擊文字引擎 (Announcer Voice & Combat Banners)
 * 整合 Web Speech API 語音合成、程序化衝擊音律與 60 FPS 畫布動態彈出橫幅
 */

import { soundEngine } from './audio.js';

export class AnnouncerEngine {
  constructor() {
    this.speechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;
    this.voice = null;
    this.activeBanners = [];
    this.roundIntro = null; // { phase: 'round', text: 'ROUND 1', timer: 45, maxTimer: 45, onDone: fn }
    this.superCutIn = null; // { charName: '', moveName: '', color: '', timer: 40, maxTimer: 40 }

    if (this.speechAvailable) {
      this._initVoice();
    }
  }

  _initVoice() {
    try {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // 優先挑選英氣俐落的英文或中英文語音
        this.voice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Alex')))
          || voices.find(v => v.lang.startsWith('en'))
          || voices[0];
      };
      updateVoices();
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    } catch (e) {
      // 靜默降級，不影響測試
    }
  }

  /**
   * 語音播報核心 (非同步零阻塞)
   */
  speak(text, { pitch = 1.05, rate = 1.1, volume = 0.9 } = {}) {
    if (!this.speechAvailable || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel(); // 取消未播完的堆疊
      const utter = new SpeechSynthesisUtterance(text);
      if (this.voice) utter.voice = this.voice;
      utter.pitch = pitch;
      utter.rate = rate;
      utter.volume = volume;
      utter.lang = 'en-US';
      window.speechSynthesis.speak(utter);
    } catch (e) {
      // 容錯降級
    }
  }

  // ─── 標誌性格鬥語音觸發 ───

  startRoundIntro(round = 1, onFightStart = null) {
    this.roundIntro = {
      phase: 'round',
      text: `ROUND ${round}`,
      timer: 45,
      maxTimer: 45,
      roundNumber: round,
      onFightStart
    };
    this.speak(`Round ${round}`, { pitch: 1.0, rate: 1.0 });
    soundEngine.playUI('countdown');
  }

  announceCounterHit() {
    this.triggerBanner({
      type: 'counter',
      text: 'COUNTER HIT!',
      subText: '★ 截擊破招 ★',
      color: '#ff3366',
      duration: 36
    });
    this.speak('Counter!', { pitch: 1.25, rate: 1.3 });
    soundEngine.playHit('heavy');
  }

  announceBurst() {
    this.triggerBanner({
      type: 'burst',
      text: 'BURST REVERSAL!',
      subText: '★ 量子逆轉脫身 ★',
      color: '#ffd700',
      duration: 40
    });
    this.speak('Burst!', { pitch: 1.15, rate: 1.2 });
    soundEngine.playHit('burst');
  }

  announceCombo(hits) {
    if (hits < 3) return;
    let label = 'GREAT COMBO!';
    let sub = '連續打擊';
    let voiceText = 'Great!';
    let col = '#00f3ff';

    if (hits >= 7) {
      label = '★ QUANTUM ULTRA! ★';
      sub = '神乎其技 終極連段';
      voiceText = 'Quantum Ultra!';
      col = '#ffd700';
    } else if (hits >= 5) {
      label = '★ MARVELOUS! ★';
      sub = '華麗破防 連環壓制';
      voiceText = 'Marvelous!';
      col = '#ff007f';
    }

    this.triggerBanner({
      type: 'combo',
      text: `${hits} HITS! ${label}`,
      subText: sub,
      color: col,
      duration: 38
    });
    this.speak(voiceText, { pitch: 1.2, rate: 1.25 });
  }

  announceSuper(charName, moveName, themeColor = '#00f3ff') {
    this.superCutIn = {
      charName,
      moveName,
      color: themeColor,
      timer: 42,
      maxTimer: 42
    };
    this.speak('Super Move!', { pitch: 1.1, rate: 1.15 });
    soundEngine.playHit('super');
  }

  announceKO() {
    this.triggerBanner({
      type: 'ko',
      text: 'K. O. !',
      subText: '★ 決定性擊倒 ★',
      color: '#ff0055',
      duration: 70
    });
    this.speak('K. O.!', { pitch: 0.9, rate: 0.95 });
    soundEngine.playHit('ko');
  }

  announceVictory(winnerName) {
    this.speak('Winner!', { pitch: 1.1, rate: 1.05 });
  }

  // ─── 橫幅堆疊管理 ───
  triggerBanner(banner) {
    this.activeBanners.push({
      ...banner,
      timer: banner.duration || 35,
      maxTimer: banner.duration || 35
    });
  }

  update() {
    // 1. 開場倒數推進
    if (this.roundIntro) {
      this.roundIntro.timer--;
      if (this.roundIntro.timer <= 0) {
        if (this.roundIntro.phase === 'round') {
          this.roundIntro.phase = 'fight';
          this.roundIntro.text = 'FIGHT !';
          this.roundIntro.timer = 40;
          this.roundIntro.maxTimer = 40;
          this.speak('Fight!', { pitch: 1.2, rate: 1.15 });
          soundEngine.playUI('fight');
          if (this.roundIntro.onFightStart) {
            this.roundIntro.onFightStart();
          }
        } else {
          this.roundIntro = null;
        }
      }
    }

    // 2. 超必殺特寫特徵更新
    if (this.superCutIn) {
      this.superCutIn.timer--;
      if (this.superCutIn.timer <= 0) {
        this.superCutIn = null;
      }
    }

    // 3. 一般動態橫幅更新
    for (let i = this.activeBanners.length - 1; i >= 0; i--) {
      const b = this.activeBanners[i];
      b.timer--;
      if (b.timer <= 0) {
        this.activeBanners.splice(i, 1);
      }
    }
  }

  // ─── 畫布渲染橫幅 (Draw on Canvas) ───
  draw(ctx, w, h) {
    // 1. 開場「ROUND 1」與「FIGHT!」震撼全屏橫幅
    if (this.roundIntro) {
      this._drawRoundIntro(ctx, w, h, this.roundIntro);
    }

    // 2. 超必殺「SUPER MOVE」人物大特寫黑幕與光條
    if (this.superCutIn) {
      this._drawSuperCutIn(ctx, w, h, this.superCutIn);
    }

    // 3. 即時戰鬥橫幅 (Counter Hit, Burst, High Combo, K.O.)
    this._drawActiveBanners(ctx, w, h);
  }

  _drawRoundIntro(ctx, w, h, intro) {
    const progress = 1 - (intro.timer / intro.maxTimer);
    let scale = 1;
    let alpha = 1;

    if (progress < 0.2) {
      scale = 1.8 - progress * 4; // 縮放彈入
      alpha = progress * 5;
    } else if (progress > 0.8) {
      alpha = (1 - progress) * 5; // 淡出
      scale = 1 + (progress - 0.8) * 1.2;
    }

    ctx.save();
    ctx.translate(w / 2, h * 0.38);
    ctx.scale(scale, scale);
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const isFight = intro.phase === 'fight';
    const mainColor = isFight ? '#ff007f' : '#00f3ff';
    const glowColor = isFight ? '#ffd700' : '#00f3ff';

    // 背景賽博橫向光束
    const beamW = Math.min(w * 0.9, 680);
    const grad = ctx.createLinearGradient(-beamW / 2, 0, beamW / 2, 0);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.5, 'rgba(5, 8, 22, 0.88)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(-beamW / 2, -45, beamW, 90);

    // 上下高能光條
    ctx.fillStyle = glowColor;
    ctx.fillRect(-beamW * 0.4, -45, beamW * 0.8, 2.5);
    ctx.fillRect(-beamW * 0.4, 43, beamW * 0.8, 2.5);

    // 主文字
    ctx.font = '900 68px "Orbitron", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = mainColor;
    ctx.shadowBlur = 32;
    ctx.fillText(intro.text, 0, 0);

    // 內層霓虹發光描邊
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 3;
    ctx.strokeText(intro.text, 0, 0);

    ctx.restore();
  }

  _drawSuperCutIn(ctx, w, h, cutIn) {
    const progress = 1 - (cutIn.timer / cutIn.maxTimer);
    ctx.save();

    // 1. 全螢幕時空凍結深色暗幕 (Super Freeze Dark Screen)
    ctx.fillStyle = 'rgba(2, 4, 12, 0.75)';
    ctx.fillRect(0, 0, w, h);

    // 2. 破空高速斜角光帶 (Dynamic Slanted Cut-in Banner)
    const midY = h * 0.42;
    const bannerH = 120;
    ctx.fillStyle = 'rgba(11, 17, 32, 0.95)';
    ctx.beginPath();
    ctx.moveTo(0, midY - bannerH / 2 - 20);
    ctx.lineTo(w, midY - bannerH / 2 + 20);
    ctx.lineTo(w, midY + bannerH / 2 + 20);
    ctx.lineTo(0, midY + bannerH / 2 - 20);
    ctx.closePath();
    ctx.fill();

    // 上下發光邊界
    ctx.strokeStyle = cutIn.color || '#00f3ff';
    ctx.lineWidth = 4;
    ctx.shadowColor = cutIn.color || '#00f3ff';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.moveTo(0, midY - bannerH / 2 - 20);
    ctx.lineTo(w, midY - bannerH / 2 + 20);
    ctx.moveTo(0, midY + bannerH / 2 - 20);
    ctx.lineTo(w, midY + bannerH / 2 + 20);
    ctx.stroke();

    // 3. 角色名稱與必殺絕招名稱
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 必殺絕技標題
    ctx.font = '900 22px "Orbitron", sans-serif';
    ctx.fillStyle = '#ffd700';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 14;
    ctx.fillText(`⚡ CLIMAX SUPER MOVE • 終極奧義 ⚡`, w / 2, midY - 24);

    // 角色與招式名
    ctx.font = '900 42px "Noto Sans TC", "Orbitron", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = cutIn.color || '#00f3ff';
    ctx.shadowBlur = 28;
    ctx.fillText(`${cutIn.charName}：${cutIn.moveName}`, w / 2, midY + 18);

    ctx.restore();
  }

  _drawActiveBanners(ctx, w, h) {
    if (this.activeBanners.length === 0) return;

    this.activeBanners.forEach((b, idx) => {
      const progress = 1 - (b.timer / b.maxTimer);
      const alpha = progress < 0.15 ? progress / 0.15 : (progress > 0.8 ? (1 - progress) / 0.2 : 1);
      const scale = progress < 0.15 ? 0.7 + (progress / 0.15) * 0.3 : 1;
      const posY = Math.max(120, h * 0.26) + idx * 56;

      ctx.save();
      ctx.translate(w / 2, posY);
      ctx.scale(scale, scale);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 橫幅膠囊底座
      const bw = Math.min(w * 0.75, 420);
      const bh = 42;
      ctx.fillStyle = 'rgba(11, 17, 32, 0.88)';
      ctx.strokeStyle = b.color || '#00f3ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = b.color || '#00f3ff';
      ctx.shadowBlur = 18;

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 8);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
        ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
      }

      // 主文字
      ctx.font = '900 20px "Orbitron", sans-serif';
      ctx.fillStyle = b.color || '#ffffff';
      ctx.shadowColor = b.color || '#00f3ff';
      ctx.shadowBlur = 12;
      ctx.fillText(b.text, 0, -3);

      // 副文字
      if (b.subText) {
        ctx.font = 'bold 10px "Noto Sans TC", sans-serif';
        ctx.fillStyle = '#cbd5e1';
        ctx.shadowBlur = 0;
        ctx.fillText(b.subText, 0, 13);
      }

      ctx.restore();
    });
  }
}

export const announcerEngine = new AnnouncerEngine();
