/**
 * 《CyberStriker: Quantum Arena》
 * 程序化合成音效引擎 (Web Audio API Synthesizer)
 * 零外部音訊檔案相依，無載入延遲，完美支援打擊反饋與賽博龐克合成背景音律。
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.bgmGain = null;
    this.isMuted = false;
    this.sfxVolume = 0.8;
    this.bgmVolume = 0.4;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.stepIndex = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);
    } catch (e) {
      console.warn('Web Audio not supported or failed to initialize:', e);
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 1.0, this.ctx.currentTime);
    }
  }

  setSfxVolume(vol) {
    this.sfxVolume = Math.max(0, Math.min(1, vol));
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
    }
  }

  setBgmVolume(vol) {
    this.bgmVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
  }

  // ─── 程序化打擊音效 ───
  playHit(type = 'punch') {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    switch (type) {
      case 'punch': {
        // 刺拳輕快打擊聲
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, t);
        osc.frequency.exponentialRampToValueAtTime(70, t + 0.08);

        gain.gain.setValueAtTime(0.7, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

        // 加上一小段高頻噪聲模擬破風擊打
        this._playNoise(t, 0.04, 800, 0.4);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.08);
        break;
      }

      case 'kick': {
        // 重踢下沉重低音爆
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.exponentialRampToValueAtTime(35, t + 0.16);

        gain.gain.setValueAtTime(1.0, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.16);

        this._playNoise(t, 0.07, 500, 0.6);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.16);
        break;
      }

      case 'guard': {
        // 金屬幾何力場彈開清脆鏘聲
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1240, t);
        osc1.frequency.exponentialRampToValueAtTime(880, t + 0.12);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1860, t);
        osc2.frequency.exponentialRampToValueAtTime(1100, t + 0.12);

        gain.gain.setValueAtTime(0.8, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.sfxGain);

        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + 0.14);
        osc2.stop(t + 0.14);
        break;
      }

      case 'shield_up': {
        // 召喚量子力場防護罩展開音效 (柔和科技共振開罩)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, t);
        osc.frequency.exponentialRampToValueAtTime(760, t + 0.11);
        gain.gain.setValueAtTime(0.45, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.11);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.11);
        break;
      }

      case 'burst': {
        // 量子逆轉爆發衝擊力場 (震波轟鳴)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(30, t + 0.45);

        gain.gain.setValueAtTime(1.0, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

        this._playNoise(t, 0.35, 1200, 0.8);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.45);
        break;
      }

      case 'laser':
      case 'projectile': {
        // 高速飛行電漿脈衝發射聲
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.exponentialRampToValueAtTime(120, t + 0.18);

        gain.gain.setValueAtTime(0.6, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.18);
        break;
      }

      case 'bow_shot': {
        // 神弓拉滿撒弦與破空箭鳴 (Bowstring Twang & Arrow Whistle)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.exponentialRampToValueAtTime(210, t + 0.09);

        gain.gain.setValueAtTime(0.75, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);

        this._playNoise(t + 0.02, 0.11, 2400, 0.45); // 破空呼嘯

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.09);
        break;
      }

      case 'gun_shot': {
        // 戰術槍械開火爆能聲與機械撞針 (Blaster Gunshot & Recoil)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1050, t);
        osc.frequency.exponentialRampToValueAtTime(140, t + 0.08);

        gain.gain.setValueAtTime(0.85, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

        this._playNoise(t, 0.05, 1600, 0.65); // 槍口槍焰衝擊

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.08);
        break;
      }

      case 'shield_hit': {
        // 汎合金圓盾破陣金屬沉重敲擊 (Vibranium Shield Clank)
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(920, t);
        osc1.frequency.exponentialRampToValueAtTime(540, t + 0.16);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(1480, t);
        osc2.frequency.exponentialRampToValueAtTime(720, t + 0.16);

        gain.gain.setValueAtTime(0.85, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

        this._playNoise(t, 0.06, 800, 0.5);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.sfxGain);

        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + 0.18);
        osc2.stop(t + 0.18);
        break;
      }

      case 'thunder': {
        // 阿斯嘉天雷轟頂暴鳴 (Thunder & Lightning Crack)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, t);
        osc.frequency.exponentialRampToValueAtTime(32, t + 0.35);

        gain.gain.setValueAtTime(0.95, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

        this._playNoise(t, 0.28, 900, 0.75); // 滾滾雷聲

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.35);
        break;
      }

      case 'sword_slash': {
        // 勇者利刃超音速撕裂空氣 (Blade Slice Whoosh)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(820, t);
        osc.frequency.exponentialRampToValueAtTime(320, t + 0.1);

        gain.gain.setValueAtTime(0.7, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

        this._playNoise(t, 0.12, 2800, 0.55); // 劍鋒破風

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.1);
        break;
      }

      case 'web_thwip': {
        // 蜘蛛人經典雙發氣動吐絲聲 (Pneumatic Web Thwip)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(960, t);
        osc.frequency.exponentialRampToValueAtTime(360, t + 0.06);

        gain.gain.setValueAtTime(0.7, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.07);

        this._playNoise(t, 0.05, 3200, 0.5);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.07);
        break;
      }

      case 'ki_blast': {
        // 七龍珠正宗氣功波聚能轟擊 (Dragon Ball Ki Blast Surge)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, t);
        osc.frequency.linearRampToValueAtTime(740, t + 0.06);
        osc.frequency.exponentialRampToValueAtTime(90, t + 0.22);

        gain.gain.setValueAtTime(0.85, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);

        this._playNoise(t, 0.15, 1100, 0.6);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.22);
        break;
      }

      case 'anti_air':
      case 'dp': {
        // 升龍昇空氣浪與撕裂聲
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(160, t);
        osc.frequency.exponentialRampToValueAtTime(650, t + 0.22);

        gain.gain.setValueAtTime(0.7, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);

        this._playNoise(t, 0.2, 1400, 0.5);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.22);
        break;
      }

      case 'slide': {
        // 下段滑鏟摩擦聲
        this._playNoise(t, 0.22, 600, 0.6);
        break;
      }

      case 'teleport': {
        // 虛空折躍斬瞬移穿透聲
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.1);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.2);

        gain.gain.setValueAtTime(0.6, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.2);
        break;
      }

      case 'parry_trigger': {
        // 架招成功反打音
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, t);
        osc.frequency.exponentialRampToValueAtTime(2200, t + 0.08);

        gain.gain.setValueAtTime(0.8, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.2);
        break;
      }

      case 'slam': {
        // 磁暴重摔地面震撼轟響
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, t);
        osc.frequency.exponentialRampToValueAtTime(25, t + 0.35);

        gain.gain.setValueAtTime(1.0, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

        this._playNoise(t, 0.25, 400, 0.8);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.35);
        break;
      }

      case 'beam': {
        // 終極離子巨砲咆哮
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, t);
        osc.frequency.linearRampToValueAtTime(320, t + 0.4);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.7);

        gain.gain.setValueAtTime(0.9, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.7);

        this._playNoise(t, 0.6, 2000, 0.7);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.7);
        break;
      }

      case 'knockdown': {
        // 倒地重重跌落聲
        this._playNoise(t, 0.15, 300, 0.7);
        break;
      }

      case 'counter': {
        // 破招打康高音破脆金屬轟鳴 (Counter Hit)
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(1750, t);
        osc1.frequency.exponentialRampToValueAtTime(520, t + 0.18);
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(880, t);
        osc2.frequency.exponentialRampToValueAtTime(120, t + 0.22);
        gain.gain.setValueAtTime(0.95, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);
        this._playNoise(t, 0.12, 1600, 0.8);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.sfxGain);
        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + 0.22);
        osc2.stop(t + 0.22);
        break;
      }

      case 'whiff_punch': {
        // 刺拳揮空破風聲
        this._playNoise(t, 0.05, 1400, 0.25);
        break;
      }

      case 'whiff_kick': {
        // 重踢破空風切聲
        this._playNoise(t, 0.08, 600, 0.35);
        break;
      }

      case 'sweep': {
        // 掃堂腿地面風旋與摩擦聲
        this._playNoise(t, 0.14, 500, 0.55);
        break;
      }

      case 'missile_launch': {
        // 微型導彈呼嘯發射
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(1600, t + 0.18);
        gain.gain.setValueAtTime(0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
        this._playNoise(t, 0.12, 1200, 0.35);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.18);
        break;
      }

      case 'laser_bounce': {
        // 稜鏡反彈音
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, t);
        osc.frequency.exponentialRampToValueAtTime(800, t + 0.08);
        gain.gain.setValueAtTime(0.6, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.08);
        break;
      }

      case 'orbital_beam': {
        // 天頂衛星軌道打擊
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, t);
        osc.frequency.exponentialRampToValueAtTime(30, t + 0.6);
        gain.gain.setValueAtTime(1.0, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
        this._playNoise(t, 0.5, 600, 0.85);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.6);
        break;
      }

      case 'bomb_drop': {
        // 炸彈下墜與爆響
        this._playNoise(t, 0.3, 350, 0.8);
        break;
      }

      case 'super': {
        // 超必殺爆發充能與天地轟鳴巨響
        const freqs = [130.81, 196.00, 261.63, 392.00, 523.25];
        freqs.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq * 0.7, t);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.35);
          gain.gain.setValueAtTime(0.35, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t + idx * 0.04);
          osc.stop(t + 0.9);
        });
        this._playNoise(t, 0.45, 1200, 0.6);
        break;
      }

      case 'ko': {
        // K.O. 勝利號角與長音
        const chords = [220, 277.18, 329.63, 440];
        chords.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.4, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 1.2);
        });
        break;
      }
    }
  }

  // ─── 介面音效 ───
  playUI(type = 'click') {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, t);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.04);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.06);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.06);
    } else if (type === 'equip') {
      // 裝備成功雙音
      const notes = [523.25, 783.99];
      notes.forEach((f, idx) => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(f, t + idx * 0.07);
        g.gain.setValueAtTime(0.25, t + idx * 0.07);
        g.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.12);
        o.connect(g);
        g.connect(this.sfxGain);
        o.start(t + idx * 0.07);
        o.stop(t + idx * 0.07 + 0.12);
      });
    } else if (type === 'countdown') {
      // 倒數嗶聲
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.1);
    } else if (type === 'fight') {
      // 開戰高音嗶聲
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(920, t);
      osc.frequency.exponentialRampToValueAtTime(1400, t + 0.25);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.25);
    }
  }

  // 噪聲發生器輔助
  _playNoise(t, duration, cutoff = 1000, volume = 0.5) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(t);
    noise.stop(t + duration);
  }

  // ─── 賽博龐克合成背景旋律 (Procedural Cyberpunk Synth BGM) ───
  startBgm() {
    if (this.bgmPlaying) return;
    this.ensureContext();
    if (!this.ctx) return;

    this.bgmPlaying = true;
    const bassScale = [65.41, 73.42, 82.41, 98.00, 110.00, 130.81]; // C2, D2, E2, G2, A2, C3
    const leadScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

    const tempo = 128; // BPM
    const stepInterval = (60 / tempo) / 2 * 1000; // 16分音符間隔

    this.bgmTimer = setInterval(() => {
      if (!this.bgmPlaying || this.isMuted) return;
      const t = this.ctx.currentTime;
      this.stepIndex++;

      // 貝斯琶音 (每2拍切換)
      if (this.stepIndex % 2 === 0) {
        const bassFreq = bassScale[(Math.floor(this.stepIndex / 4) + (this.stepIndex % 4)) % bassScale.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(bassFreq, t);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, t);
        filter.frequency.exponentialRampToValueAtTime(100, t + 0.15);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.bgmGain);

        osc.start(t);
        osc.stop(t + 0.15);
      }

      // 踩鈸節奏 (每步隨機或交替)
      if (this.stepIndex % 2 === 1) {
        this._playNoise(t, 0.03, 5000, 0.05);
      }

      // 科技感高頻琶音旋律 (偶爾點綴)
      if (this.stepIndex % 8 === 4 || this.stepIndex % 8 === 7) {
        const leadFreq = leadScale[(this.stepIndex * 3) % leadScale.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(leadFreq, t);

        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(t);
        osc.stop(t + 0.18);
      }
    }, stepInterval);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

export const soundEngine = new SoundEngine();
