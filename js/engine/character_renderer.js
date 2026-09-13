/**
 * 《CyberStriker: Quantum Arena》
 * 2D 人體骨骼程序化渲染引擎 (Articulated Skeletal Renderer)
 * 8 大肢體關節部件 + 12 種戰鬥武打姿態 + 5 套專屬外觀 VFX 色彩分離
 * 完全符合 GAME_PROJECT_PLAN.md 第 2.3 與 3.1 節
 */

import { specialSkinsRenderer } from './special_skins_renderer.js';
import { scifiSkinsRenderer } from './scifi_skins_renderer.js';
import { getSkinAttackStyle } from '../data/skins.js';

export class CharacterRenderer {
  constructor() {
    // 8 大骨骼標準尺寸規格 (像素級精確，全外觀判定盒 100% 對稱)
    this.boneSpec = {
      headRadius: 18,
      visorWidth: 16,
      visorHeight: 6,
      torsoWidth: 32,
      torsoHeight: 46,
      coreRadius: 7,
      pelvisWidth: 26,
      pelvisHeight: 14,
      upperArmLength: 24,
      upperArmWidth: 10,
      forearmLength: 26,
      forearmWidth: 12,
      thighLength: 30,
      thighWidth: 13,
      shinLength: 32,
      shinWidth: 12,
      footLength: 18,
      footHeight: 9
    };
  }

  // ─── 核心繪製入口 ───
  draw(ctx, char) {
    if (!char) return;
    const skin = char.skin;
    const state = char.state;
    const t = char.stateTime || 0;

    ctx.save();
    ctx.translate(char.x, char.y);
    ctx.scale(char.facing, 1);

    // 受傷或無敵半透明閃爍
    if (char.invincibleTimer && char.invincibleTimer > 0 && Math.floor(char.invincibleTimer / 2) % 2 === 1) {
      ctx.globalAlpha = 0.5;
    }

    // 計算 12 種姿態骨骼角度
    const pose = this.calculatePose(state, t, char);

    // 0. 專屬特殊角色與科幻戰將氣場光環
    specialSkinsRenderer.drawAura(ctx, char, skin, t);
    scifiSkinsRenderer.drawAura(ctx, char, skin, t);

    // 1. 繪製後層肢體 (背側手臂、背側腿)
    this.drawLimb(ctx, pose.backLeg, skin, 'backLeg');
    this.drawArm(ctx, pose.backArm, skin, 'backArm');

    // 2. 繪製軀幹、骨盆與量子反應爐
    this.drawTorso(ctx, pose.torso, skin, t);

    // 3. 繪製頭部與全息目鏡
    this.drawHead(ctx, pose.head, skin);

    // 4. 繪製前層肢體 (前側腿、前側手臂)
    this.drawLimb(ctx, pose.frontLeg, skin, 'frontLeg');
    this.drawArm(ctx, pose.frontArm, skin, 'frontArm');

    // 5. 繪製防禦幾何力場護盾 (若正在格擋)
    if (char.isGuarding) {
      this.drawGuardShield(ctx, char.guardStance || 'high', skin, t);
    }

    // 6. 繪製專屬 VFX (出拳光軌、重踢光弧、粒子殘影)
    if (pose.vfx) {
      this.drawAttackVFX(ctx, pose.vfx, skin);
    }

    ctx.restore();
  }

  /**
   * 計算高度仿生、流暢真實的人類雙足行走步態 (Human Bipedal Walking Gait)
   * 具備完整人體運動學特性：
   * 1. 觸地腳跟著地 (Heel-Strike) -> 負重吸收 (Cushioning) -> 垂直支撐 (Mid-Stance) -> 前掌蹬地 (Push-Off)
   * 2. 擺動腿高提膝避障 (Knee Clearance) -> 鐘擺前伸迎向著地 (Terminal Extension)
   * 3. 骨盆與重心自然雙頻平滑起伏 (Pelvic Vertical Sinusoidal Bobbing)
   * 4. 軀幹微幅自然前傾與頭部視線平穩水平補償 (Gaze Stabilization)
   * 5. 雙臂與腿部對稱反向擺動，手肘自然屈伸 (Reciprocal Arm Swing)
   * 6. 腳踝與戰靴自然踩踏滾動 (Ankle Dorsiflexion & Plantarflexion)
   */
  _calculateHumanWalkPose(t, isBackward = false) {
    const speed = isBackward ? 0.068 : 0.078;
    const phase = t * speed * (isBackward ? -1 : 1);

    const normPhase = (p) => ((p % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    const getHumanLegJoints = (phi) => {
      const p = normPhase(phi);
      // 大腿前後擺動 (Forward-and-backward thigh swing)
      const thigh = -Math.cos(p) * 0.36 - 0.04;

      let shin = 0;
      let foot = 0;

      if (p < Math.PI) {
        // 支撐相 (Stance phase, 0 ~ PI)
        const sp = p / Math.PI;
        // 腳跟著地緩衝微屈 (Shock absorption)
        const shock = 0.12 * Math.sin(sp * Math.PI * 2) * (sp < 0.45 ? 1 : 0);
        // 蹬地前膝關節蓄力微曲 (Pre-swing push flexion)
        const push = 0.34 * Math.pow(Math.max(0, sp - 0.45) / 0.55, 2);
        shin = 0.06 + shock + push;

        // 腳踝滾動：腳跟著地 (-0.16) -> 踩平 (0.08) -> 蹬地前腳掌滾動 (-0.28)
        if (sp < 0.22) {
          foot = -0.16 + (sp / 0.22) * 0.24;
        } else if (sp < 0.58) {
          foot = 0.08 - ((sp - 0.22) / 0.36) * 0.12;
        } else {
          foot = -0.04 - ((sp - 0.58) / 0.42) * 0.26;
        }
      } else {
        // 擺動相 (Swing phase, PI ~ 2*PI)
        const swp = (p - Math.PI) / Math.PI;
        // 擺動中高提膝防拖地，隨後鐘擺前伸迎向著地
        shin = 0.38 + 0.38 * Math.sin(swp * Math.PI) - 0.30 * Math.pow(swp, 2);
        // 踝部放鬆微挑，避免踢蹭地面
        foot = -0.04 + 0.12 * Math.sin(swp * Math.PI);
      }

      // 膝關節永遠向後曲折 (0.04 ~ 1.05 rad，絕不向前反曲)
      shin = Math.max(0.04, Math.min(1.05, shin));
      return { thigh, shin, foot };
    };

    // 前腿與後腿 (反相 180 度)
    const frontL = getHumanLegJoints(phase);
    const backL = getHumanLegJoints(phase + Math.PI);

    // 骨盆/重心上下微幅平滑起伏：每個步態週期 2 次波峰 (單腿支撐最高，雙腿分立著地最低)
    const verticalBob = -Math.cos(phase * 2) * 2.8;

    // 軀幹自然微前傾 (~3度)，隨步伐節奏微微自然呼吸
    const torsoAngle = (isBackward ? -0.02 : 0.045) + Math.sin(phase * 2) * 0.012;
    // 頭部視線穩定補償 (保持雙眼與水平線平齊)
    const headAngle = -torsoAngle * 0.75;

    // 手臂反向自然交替擺動 (與同側腿相反，維持平衡)
    const armSwing = Math.cos(phase) * 0.34;
    const frontArmUpper = isBackward ? (-armSwing * 0.6 + 0.22) : (armSwing + 0.10);
    const backArmUpper = isBackward ? (armSwing * 0.6 + 0.22) : (-armSwing + 0.10);

    // 前臂手肘微曲自然隨動：向前擺時手肘屈度增加，向後擺時自然放鬆
    const frontArmFore = 0.45 + Math.max(0, frontArmUpper) * 0.32;
    const backArmFore = 0.45 + Math.max(0, backArmUpper) * 0.32;

    return {
      torso: { x: 0, y: -74 + verticalBob, angle: torsoAngle },
      head: { x: 0, y: -98 + verticalBob, angle: headAngle },
      frontLeg: { hipX: 6, hipY: -42 + verticalBob, thighAngle: frontL.thigh, shinAngle: frontL.shin, footAngle: frontL.foot },
      backLeg: { hipX: -6, hipY: -42 + verticalBob, thighAngle: backL.thigh, shinAngle: backL.shin, footAngle: backL.foot },
      frontArm: { shoulderX: 8, shoulderY: -86 + verticalBob, upperAngle: frontArmUpper, foreAngle: frontArmFore },
      backArm: { shoulderX: -8, shoulderY: -86 + verticalBob, upperAngle: backArmUpper, foreAngle: backArmFore },
      vfx: null
    };
  }

  /**
   * 計算 12 種武打姿態下的關節角度與位移
   */
  calculatePose(state, t, char) {
    const defaultPose = {
      torso: { x: 0, y: -74, angle: 0 },
      head: { x: 0, y: -98, angle: 0 },
      frontArm: { shoulderX: 8, shoulderY: -86, upperAngle: 0.5, foreAngle: 1.2 },
      backArm: { shoulderX: -8, shoulderY: -86, upperAngle: 0.3, foreAngle: 1.0 },
      frontLeg: { hipX: 6, hipY: -42, thighAngle: 0.2, shinAngle: 0.1 },
      backLeg: { hipX: -6, hipY: -42, thighAngle: -0.2, shinAngle: 0.1 },
      vfx: null
    };

    switch (state) {
      case 'idle': {
        // 自然呼吸起伏
        const breath = Math.sin(t * 0.08) * 3;
        defaultPose.torso.y = -74 + breath;
        defaultPose.head.y = -98 + breath;
        defaultPose.frontArm.upperAngle = 0.4 + Math.sin(t * 0.08) * 0.08;
        defaultPose.frontArm.foreAngle = 1.3 + Math.sin(t * 0.08) * 0.05;
        defaultPose.backArm.upperAngle = 0.2;
        defaultPose.backArm.foreAngle = 1.1;
        return defaultPose;
      }

      case 'walk_fwd': {
        // 真實人類向前行走步態
        return this._calculateHumanWalkPose(t, false);
      }

      case 'walk_back': {
        // 真實人類後退走位步態
        return this._calculateHumanWalkPose(t, true);
      }

      case 'jump':
      case 'jump_up': {
        // 空中姿態判斷：是否正在空中發動刺拳或飛踢？
        if (char && char.currentAction) {
          const actName = char.currentAction.name || '';
          if (actName.includes('踢')) {
            // 空中下墜俯衝飛踢 (Dive Kick)
            defaultPose.torso.y = -70;
            defaultPose.torso.angle = -0.45; // 身體後仰
            defaultPose.head.angle = 0.2;
            defaultPose.frontLeg.thighAngle = -1.25; // 破空前斜下飛踢
            defaultPose.frontLeg.shinAngle = 0.1;
            defaultPose.backLeg.thighAngle = 0.4;
            defaultPose.backLeg.shinAngle = 1.6;
            defaultPose.frontArm.upperAngle = 0.7;
            defaultPose.frontArm.foreAngle = 0.3;
            defaultPose.backArm.upperAngle = 0.9;
            defaultPose.backArm.foreAngle = 0.3;
            defaultPose.vfx = { type: 'dive_kick', x: 50, y: -45 };
            return defaultPose;
          } else if (actName.includes('拳')) {
            // 空中斜下刺拳 (Air Jab)
            defaultPose.torso.y = -78;
            defaultPose.torso.angle = 0.25; // 身體前傾俯衝
            defaultPose.frontArm.upperAngle = -0.35; // 向前下方出拳
            defaultPose.frontArm.foreAngle = 0.2;
            defaultPose.frontLeg.thighAngle = -0.9;
            defaultPose.frontLeg.shinAngle = 1.3;
            defaultPose.backLeg.thighAngle = -0.6;
            defaultPose.backLeg.shinAngle = 1.1;
            defaultPose.vfx = { type: 'punch', x: 48, y: -65 };
            return defaultPose;
          }
        }

        // 騰空躍起，膝部收斂
        defaultPose.torso.y = -82;
        defaultPose.head.y = -106;
        defaultPose.frontLeg.thighAngle = -0.8;
        defaultPose.frontLeg.shinAngle = 1.2;
        defaultPose.backLeg.thighAngle = -0.5;
        defaultPose.backLeg.shinAngle = 1.0;
        defaultPose.frontArm.upperAngle = -0.6;
        defaultPose.frontArm.foreAngle = 0.4;
        defaultPose.backArm.upperAngle = -0.8;
        defaultPose.backArm.foreAngle = 0.4;
        return defaultPose;
      }

      case 'crouch': {
        // 蹲姿壓低 30 像素，雙臂前臂向下護腹
        defaultPose.torso.y = -48;
        defaultPose.torso.angle = 0.25;
        defaultPose.head.y = -72;
        defaultPose.frontLeg.thighAngle = -1.4;
        defaultPose.frontLeg.shinAngle = 2.1;
        defaultPose.backLeg.thighAngle = -1.2;
        defaultPose.backLeg.shinAngle = 2.0;
        defaultPose.frontArm.upperAngle = 0.8;
        defaultPose.frontArm.foreAngle = 0.9;
        defaultPose.backArm.upperAngle = 0.6;
        defaultPose.backArm.foreAngle = 0.8;
        return defaultPose;
      }

      case 'crouch_punch': {
        const style = getSkinAttackStyle(char ? char.skin : null);
        const pProgress = Math.min(1, t / 15);
        const reach = Math.sin(pProgress * Math.PI);
        defaultPose.torso.y = -48;
        defaultPose.torso.angle = 0.35 * reach;
        defaultPose.head.y = -72;
        defaultPose.frontLeg.thighAngle = -1.4;
        defaultPose.frontLeg.shinAngle = 2.1;
        defaultPose.backLeg.thighAngle = -1.2;
        defaultPose.backLeg.shinAngle = 2.0;

        if (style === 'bow') {
          // 下蹲射箭姿態
          defaultPose.frontArm.upperAngle = 0.2 - reach * 0.4;
          defaultPose.frontArm.foreAngle = 0.05;
          defaultPose.frontArm.holdingWeapon = 'bow';
          defaultPose.frontArm.drawingArrow = reach > 0.2;
          defaultPose.backArm.upperAngle = 0.1;
          defaultPose.backArm.foreAngle = 1.2;
          if (reach > 0.25) {
            defaultPose.vfx = { type: 'bow_arrow', progress: reach, x: 50, y: -50 };
          }
          return defaultPose;
        } else if (style === 'gun') {
          // 下蹲戰術速射
          defaultPose.frontArm.upperAngle = 0.1 - reach * 0.3;
          defaultPose.frontArm.foreAngle = 0.05;
          defaultPose.frontArm.holdingWeapon = 'gun';
          defaultPose.backArm.upperAngle = 0.2;
          defaultPose.backArm.foreAngle = 0.3;
          if (reach > 0.25) {
            defaultPose.vfx = { type: 'gun_bullet', progress: reach, x: 52, y: -50 };
          }
          return defaultPose;
        } else if (style === 'sword') {
          // 下蹲貼地斬
          defaultPose.frontArm.upperAngle = -0.4 + reach * 1.1;
          defaultPose.frontArm.foreAngle = 0.1;
          defaultPose.frontArm.holdingWeapon = 'sword';
          defaultPose.backArm.upperAngle = 0.5;
          defaultPose.backArm.foreAngle = 0.9;
          if (reach > 0.25) {
            defaultPose.vfx = { type: 'sword_slash_vfx', progress: reach, x: 52, y: -50 };
          }
          return defaultPose;
        } else if (style === 'shield') {
          // 下段盾擊
          defaultPose.frontArm.upperAngle = 0.1 - reach * 0.5;
          defaultPose.frontArm.foreAngle = 0.3;
          defaultPose.frontArm.holdingWeapon = 'shield';
          defaultPose.backArm.upperAngle = 0.6;
          defaultPose.backArm.foreAngle = 0.8;
          if (reach > 0.25) {
            defaultPose.vfx = { type: 'shield_strike', progress: reach, x: 50, y: -50 };
          }
          return defaultPose;
        }

        // 預設下蹲刺拳
        defaultPose.frontArm.upperAngle = 0.3 - reach * 0.7; // 向前低位刺出
        defaultPose.frontArm.foreAngle = 1.2 - reach * 1.1;
        defaultPose.backArm.upperAngle = 0.7;
        defaultPose.backArm.foreAngle = 0.9;
        if (reach > 0.25) {
          defaultPose.vfx = { type: 'crouch_punch', progress: reach, x: 50, y: -50 };
        }
        return defaultPose;
      }

      case 'crouch_kick': {
        // 下蹲掃堂腿 (2HK / Sweep)：重心極致貼地，雙手撐地，單腿破空低位旋掃
        const sProgress = Math.min(1, t / 20);
        const sweepWave = Math.sin(sProgress * Math.PI);
        defaultPose.torso.y = -36;
        defaultPose.torso.angle = -0.38 * sweepWave;
        defaultPose.head.y = -60;
        defaultPose.frontLeg.thighAngle = -1.55; // 貼地直線掃出
        defaultPose.frontLeg.shinAngle = 0.05;
        defaultPose.backLeg.thighAngle = 0.5;
        defaultPose.backLeg.shinAngle = 1.8;
        defaultPose.frontArm.upperAngle = 1.1; // 撐地手
        defaultPose.frontArm.foreAngle = 0.2;
        defaultPose.backArm.upperAngle = 0.9;
        defaultPose.backArm.foreAngle = 0.4;
        if (sweepWave > 0.2) {
          defaultPose.vfx = { type: 'sweep', progress: sweepWave, x: 56, y: -12 };
        }
        return defaultPose;
      }

      case 'high_guard': {
        // 高段格擋，雙臂垂直上抬架在面部前
        defaultPose.frontArm.upperAngle = 1.2;
        defaultPose.frontArm.foreAngle = 1.8;
        defaultPose.backArm.upperAngle = 1.0;
        defaultPose.backArm.foreAngle = 1.6;
        return defaultPose;
      }

      case 'low_guard': {
        // 下段格擋，沉腰下蹲，雙前臂向斜下方壓制
        defaultPose.torso.y = -50;
        defaultPose.head.y = -74;
        defaultPose.frontLeg.thighAngle = -1.3;
        defaultPose.frontLeg.shinAngle = 2.0;
        defaultPose.frontArm.upperAngle = 0.5;
        defaultPose.frontArm.foreAngle = 0.4;
        defaultPose.backArm.upperAngle = 0.4;
        defaultPose.backArm.foreAngle = 0.4;
        return defaultPose;
      }

      case 'light_punch': {
        const style = getSkinAttackStyle(char ? char.skin : null);
        const pProgress = Math.min(1, t / 16);
        const reach = Math.sin(pProgress * Math.PI);

        if (style === 'bow') {
          // ══════════════════════════════════════════════════
          // 拉弓射擊姿態 (Bow Draw & Shoot Pose)
          // ══════════════════════════════════════════════════
          defaultPose.torso.angle = -0.12 * reach;
          defaultPose.frontArm.upperAngle = -0.25 - reach * 0.12;
          defaultPose.frontArm.foreAngle = 0.05;
          defaultPose.frontArm.holdingWeapon = 'bow';
          defaultPose.frontArm.drawingArrow = reach > 0.2;

          // 前半段拉滿弓弦至臉頰側後方，後半段鬆弦射出箭矢
          if (pProgress < 0.55) {
            const drawRatio = pProgress / 0.55;
            defaultPose.backArm.upperAngle = -0.55 * drawRatio;
            defaultPose.backArm.foreAngle = 1.55 * drawRatio;
            defaultPose.backArm.drawingArrow = true;
          } else {
            const releaseRatio = (pProgress - 0.55) / 0.45;
            defaultPose.backArm.upperAngle = -0.55 + releaseRatio * 0.85;
            defaultPose.backArm.foreAngle = 1.55 - releaseRatio * 0.95;
          }

          if (reach > 0.25) {
            defaultPose.vfx = { type: 'bow_arrow', progress: reach, x: 54, y: -74 };
          }
          return defaultPose;
        }

        if (style === 'gun') {
          // ══════════════════════════════════════════════════
          // 雙手戰術持槍瞄準急速射擊 (Tactical Gunfire Stance)
          // ══════════════════════════════════════════════════
          const recoil = Math.sin(pProgress * Math.PI);
          defaultPose.torso.angle = 0.08 * recoil;
          defaultPose.frontArm.upperAngle = -0.2 - recoil * 0.12; // 槍口微後坐力上揚
          defaultPose.frontArm.foreAngle = 0.05;
          defaultPose.frontArm.holdingWeapon = 'gun';
          defaultPose.backArm.upperAngle = -0.18 - recoil * 0.1;
          defaultPose.backArm.foreAngle = 0.18;

          if (reach > 0.2) {
            defaultPose.vfx = { type: 'gun_bullet', progress: reach, x: 56, y: -74 };
          }
          return defaultPose;
        }

        if (style === 'shield') {
          // ══════════════════════════════════════════════════
          // 汎合金圓盾破陣撞擊 (Shield Slam / Bash)
          // ══════════════════════════════════════════════════
          defaultPose.torso.angle = 0.22 * reach;
          defaultPose.frontArm.upperAngle = -0.15 - reach * 0.7;
          defaultPose.frontArm.foreAngle = 0.35;
          defaultPose.frontArm.holdingWeapon = 'shield';
          defaultPose.backArm.upperAngle = 0.5;
          defaultPose.backArm.foreAngle = 1.1;

          if (reach > 0.25) {
            defaultPose.vfx = { type: 'shield_strike', progress: reach, x: 52, y: -74 };
          }
          return defaultPose;
        }

        if (style === 'hammer') {
          // ══════════════════════════════════════════════════
          // 雷神之鎚天雷落劈 (Mjolnir Thunder Strike)
          // ══════════════════════════════════════════════════
          defaultPose.torso.angle = 0.18 * reach;
          defaultPose.frontArm.upperAngle = -1.15 + reach * 1.5;
          defaultPose.frontArm.foreAngle = 0.1;
          defaultPose.frontArm.holdingWeapon = 'hammer';
          defaultPose.backArm.upperAngle = 0.6;
          defaultPose.backArm.foreAngle = 1.2;

          if (reach > 0.25) {
            defaultPose.vfx = { type: 'thor_lightning', progress: reach, x: 52, y: -74 };
          }
          return defaultPose;
        }

        if (style === 'sword') {
          // ══════════════════════════════════════════════════
          // 勇者之劍次元拔刀斬 (Sword Slash)
          // ══════════════════════════════════════════════════
          defaultPose.torso.angle = 0.25 * reach;
          defaultPose.frontArm.upperAngle = -0.85 + reach * 1.45;
          defaultPose.frontArm.foreAngle = 0.1;
          defaultPose.frontArm.holdingWeapon = 'sword';
          defaultPose.backArm.upperAngle = 0.5;
          defaultPose.backArm.foreAngle = 1.0;

          if (reach > 0.25) {
            defaultPose.vfx = { type: 'sword_slash_vfx', progress: reach, x: 54, y: -76 };
          }
          return defaultPose;
        }

        if (style === 'repulsor') {
          // ══════════════════════════════════════════════════
          // 鋼鐵人掌心脈衝等離子砲 (Palm Repulsor Blast)
          // ══════════════════════════════════════════════════
          defaultPose.torso.angle = 0.14 * reach;
          defaultPose.frontArm.upperAngle = -0.22 - reach * 0.45;
          defaultPose.frontArm.foreAngle = -0.12;
          defaultPose.backArm.upperAngle = 0.5;
          defaultPose.backArm.foreAngle = 1.2;

          if (reach > 0.25) {
            defaultPose.vfx = { type: 'repulsor_blast', progress: reach, x: 52, y: -76 };
          }
          return defaultPose;
        }

        if (style === 'web_shot') {
          // ══════════════════════════════════════════════════
          // 蜘蛛人雙指手勢腕射蛛絲 (Web-Shooter Thwip)
          // ══════════════════════════════════════════════════
          defaultPose.torso.angle = 0.14 * reach;
          defaultPose.frontArm.upperAngle = -0.18 - reach * 0.45;
          defaultPose.frontArm.foreAngle = 0.05;
          defaultPose.backArm.upperAngle = 0.4;
          defaultPose.backArm.foreAngle = 1.2;

          if (reach > 0.25) {
            defaultPose.vfx = { type: 'web_stream', progress: reach, x: 50, y: -76 };
          }
          return defaultPose;
        }

        if (style === 'kamehameha') {
          // ══════════════════════════════════════════════════
          // 超賽龜派氣功合掌推擊 (Kamehameha Blast)
          // ══════════════════════════════════════════════════
          defaultPose.torso.angle = 0.2 * reach;
          defaultPose.frontArm.upperAngle = -0.15 - reach * 0.5;
          defaultPose.frontArm.foreAngle = 0.05;
          defaultPose.backArm.upperAngle = -0.1 - reach * 0.45;
          defaultPose.backArm.foreAngle = 0.1;

          if (reach > 0.25) {
            defaultPose.vfx = { type: 'kamehameha_vfx', progress: reach, x: 54, y: -74 };
          }
          return defaultPose;
        }

        if (style === 'final_flash') {
          // ══════════════════════════════════════════════════
          // 賽亞人王子大霹靂閃光 (Big Bang / Final Flash)
          // ══════════════════════════════════════════════════
          defaultPose.torso.angle = 0.18 * reach;
          defaultPose.frontArm.upperAngle = -0.2 - reach * 0.6;
          defaultPose.frontArm.foreAngle = 0.02;
          defaultPose.backArm.upperAngle = 0.6;
          defaultPose.backArm.foreAngle = 1.1;

          if (reach > 0.25) {
            defaultPose.vfx = { type: 'final_flash_vfx', progress: reach, x: 54, y: -74 };
          }
          return defaultPose;
        }

        if (style === 'death_beam') {
          // ══════════════════════════════════════════════════
          // 黃金弗利沙單指死亡光線 (Death Beam)
          // ══════════════════════════════════════════════════
          defaultPose.torso.angle = 0.1 * reach;
          defaultPose.frontArm.upperAngle = -0.2 - reach * 0.35;
          defaultPose.frontArm.foreAngle = 0.02;
          defaultPose.backArm.upperAngle = 0.4;
          defaultPose.backArm.foreAngle = 1.2;

          if (reach > 0.2) {
            defaultPose.vfx = { type: 'death_beam_vfx', progress: reach, x: 54, y: -75 };
          }
          return defaultPose;
        }

        if (style === 'namek_arm') {
          // ══════════════════════════════════════════════════
          // 比克那美克星魔臂伸縮突刺 (Namekian Elastic Arm)
          // ══════════════════════════════════════════════════
          defaultPose.torso.angle = 0.18 * reach;
          defaultPose.frontArm.upperAngle = -0.1 - reach * 0.5;
          defaultPose.frontArm.foreAngle = 0.02;
          defaultPose.backArm.upperAngle = 0.5;
          defaultPose.backArm.foreAngle = 1.2;

          if (reach > 0.25) {
            defaultPose.vfx = { type: 'namek_arm_vfx', progress: reach, x: 54, y: -76 };
          }
          return defaultPose;
        }

        if (style === 'infinity_strike') {
          // ══════════════════════════════════════════════════
          // 薩諾斯無限手套毀滅重拳 (Infinity Gauntlet Strike)
          // ══════════════════════════════════════════════════
          defaultPose.torso.angle = 0.22 * reach;
          defaultPose.frontArm.upperAngle = 0.1 - reach * 0.8;
          defaultPose.frontArm.foreAngle = 1.0 - reach * 0.9;
          defaultPose.backArm.upperAngle = 0.5;
          defaultPose.backArm.foreAngle = 1.3;

          if (reach > 0.25) {
            defaultPose.vfx = { type: 'infinity_vfx', progress: reach, x: 52, y: -74 };
          }
          return defaultPose;
        }

        // 預設格鬥刺拳 (Standard Brawler Jab)
        defaultPose.torso.angle = 0.15 * reach;
        defaultPose.frontArm.upperAngle = 0.2 - reach * 0.9;
        defaultPose.frontArm.foreAngle = 1.2 - reach * 1.1; // 伸直
        defaultPose.backArm.upperAngle = 0.6;
        defaultPose.backArm.foreAngle = 1.4;
        if (reach > 0.3) {
          defaultPose.vfx = { type: 'punch', progress: reach, x: 50, y: -78 };
        }
        return defaultPose;
      }

      case 'heavy_kick': {
        // 重力猛踢：踢擊腿大角度破空踢擊，上身反向後仰平衡
        const style = getSkinAttackStyle(char ? char.skin : null);
        const kProgress = Math.min(1, t / 20);
        const kickWave = Math.sin(kProgress * Math.PI);
        defaultPose.torso.angle = -0.3 * kickWave; // 上身反向後仰
        defaultPose.frontLeg.thighAngle = 0.2 - kickWave * 1.8; // 大角度踢出
        defaultPose.frontLeg.shinAngle = 0.1 - kickWave * 0.4;
        defaultPose.frontArm.upperAngle = -0.4;
        defaultPose.frontArm.foreAngle = 0.5;

        if (style === 'bow') {
          defaultPose.frontArm.holdingWeapon = 'bow';
        } else if (style === 'gun') {
          defaultPose.frontArm.holdingWeapon = 'gun';
        } else if (style === 'shield') {
          defaultPose.frontArm.holdingWeapon = 'shield';
        } else if (style === 'hammer') {
          defaultPose.frontArm.holdingWeapon = 'hammer';
        } else if (style === 'sword') {
          defaultPose.frontArm.holdingWeapon = 'sword';
        }

        if (kickWave > 0.4) {
          defaultPose.vfx = { type: 'kick', progress: kickWave, x: 54, y: -60 };
        }
        return defaultPose;
      }

      case 'ranged_attack': {
        // 遠程攻擊：支援平射、高仰角對空射擊與重砲蓄勢射擊
        const rProgress = Math.min(1, t / 18);
        const blastWave = Math.sin(rProgress * Math.PI);
        const isAntiAir = char && char.currentAction && char.currentAction.name.includes('對空');
        const isHeavy = char && char.currentAction && char.currentAction.name.includes('重砲');

        if (isAntiAir) {
          // 45度高仰角射擊姿態
          defaultPose.torso.angle = -0.18 * blastWave; // 身體後仰
          defaultPose.frontArm.upperAngle = -0.75 - blastWave * 0.22;
          defaultPose.frontArm.foreAngle = 0.05;
          defaultPose.backArm.upperAngle = 0.45;
          defaultPose.backArm.foreAngle = 0.85;
          if (blastWave > 0.2) {
            defaultPose.vfx = { type: 'plasma_muzzle', progress: blastWave, x: 42, y: -90 };
          }
        } else if (isHeavy) {
          // 重型重砲後坐力姿態
          defaultPose.torso.angle = 0.28 * blastWave;
          defaultPose.frontArm.upperAngle = -0.15 - blastWave * 0.35;
          defaultPose.frontArm.foreAngle = 0.02;
          defaultPose.backArm.upperAngle = -0.12 - blastWave * 0.3; // 雙手合抱重砲
          defaultPose.backArm.foreAngle = 0.1;
          if (blastWave > 0.2) {
            defaultPose.vfx = { type: 'plasma_muzzle', progress: blastWave, x: 54, y: -74 };
          }
        } else {
          // 平舉直射姿態
          defaultPose.torso.angle = 0.16 * blastWave;
          defaultPose.frontArm.upperAngle = -0.15 - blastWave * 0.2;
          defaultPose.frontArm.foreAngle = 0.05;
          defaultPose.backArm.upperAngle = 0.35;
          defaultPose.backArm.foreAngle = 0.85;
          if (blastWave > 0.2) {
            defaultPose.vfx = { type: 'plasma_muzzle', progress: blastWave, x: 48, y: -74 };
          }
        }
        return defaultPose;
      }

      case 'hit_stun': {
        // 受擊仰頭，目鏡閃爍，身形後仰滑行
        const hOffset = Math.sin(t * 0.4) * 4;
        defaultPose.torso.angle = -0.35;
        defaultPose.head.angle = -0.45;
        defaultPose.torso.x = -8 + hOffset;
        defaultPose.head.x = -12 + hOffset;
        defaultPose.frontArm.upperAngle = -0.8;
        defaultPose.frontArm.foreAngle = 0.4;
        defaultPose.backArm.upperAngle = -0.6;
        defaultPose.backArm.foreAngle = 0.5;
        defaultPose.vfx = { type: 'hit_sparks', x: 0, y: -74 };
        return defaultPose;
      }

      case 'knockdown': {
        // 倒地翻滾：旋轉橫飛、平躺
        defaultPose.torso.y = -16;
        defaultPose.torso.angle = -Math.PI / 2;
        defaultPose.head.y = -16;
        defaultPose.head.x = -32;
        defaultPose.head.angle = -Math.PI / 2;
        defaultPose.frontLeg.thighAngle = -Math.PI / 2;
        defaultPose.frontLeg.shinAngle = 0.2;
        defaultPose.backLeg.thighAngle = -Math.PI / 2;
        defaultPose.frontArm.upperAngle = -Math.PI / 2;
        defaultPose.frontArm.foreAngle = 0.2;
        return defaultPose;
      }

      case 'wakeup': {
        // 單手撐地彈起
        const wRatio = Math.min(1, t / 15);
        defaultPose.torso.y = -16 - wRatio * 58;
        defaultPose.head.y = -16 - wRatio * 82;
        defaultPose.torso.angle = -Math.PI / 2 * (1 - wRatio);
        defaultPose.head.angle = -Math.PI / 2 * (1 - wRatio);
        return defaultPose;
      }

      // 招式專屬姿態
      case 'SK-02': { // 升龍拳
        defaultPose.torso.angle = 0.1;
        defaultPose.frontArm.upperAngle = -2.2; // 垂直沖天
        defaultPose.frontArm.foreAngle = 0.1;
        defaultPose.frontLeg.thighAngle = -0.9;
        defaultPose.frontLeg.shinAngle = 1.4;
        defaultPose.vfx = { type: 'shoryuken', x: 12, y: -110 };
        return defaultPose;
      }

      case 'SK-03': { // 音速滑踢
        defaultPose.torso.y = -26;
        defaultPose.torso.angle = -0.5;
        defaultPose.head.y = -40;
        defaultPose.frontLeg.thighAngle = -1.5;
        defaultPose.frontLeg.shinAngle = 0.1;
        defaultPose.backLeg.thighAngle = 0.6;
        defaultPose.backLeg.shinAngle = 1.8;
        defaultPose.vfx = { type: 'slide_dust', x: 30, y: -5 };
        return defaultPose;
      }

      case 'victory': {
        // 勝利慶祝姿態：胸部反應爐耀眼高亮，單拳高舉指天，另一手叉腰，身姿挺拔自信，散發金色勝利光輝
        const vCycle = Math.sin(t * 0.08) * 2;
        defaultPose.torso.y = -76 + vCycle;
        defaultPose.head.y = -100 + vCycle;
        defaultPose.torso.angle = -0.06; // 昂首挺胸微後仰
        defaultPose.head.angle = -0.15; // 仰頭瞻望天空

        // 前手高高舉起指向天空 (勝利冠軍拳)
        defaultPose.frontArm.upperAngle = -2.3; // 垂直指天
        defaultPose.frontArm.foreAngle = 0.3;  // 前臂握拳
        
        // 後手叉腰
        defaultPose.backArm.upperAngle = 0.8;
        defaultPose.backArm.foreAngle = 1.9;   // 肘部向外手掌抵腰

        // 雙腿自信跨立穩如泰山
        defaultPose.frontLeg.thighAngle = 0.28;
        defaultPose.frontLeg.shinAngle = 0.08;
        defaultPose.backLeg.thighAngle = -0.28;
        defaultPose.backLeg.shinAngle = 0.08;

        defaultPose.vfx = {
          type: 'victory_aura',
          color: char.skin && char.skin.themeColor ? char.skin.themeColor : '#ffd700',
          x: 0,
          y: -74,
          time: t
        };
        return defaultPose;
      }

      case 'defeat': {
        // 戰敗單膝跪地垂頭姿態
        defaultPose.torso.y = -42;
        defaultPose.torso.angle = 0.35; // 前傾垂頭
        defaultPose.head.y = -62;
        defaultPose.head.angle = 0.55;  // 垂頭喪氣
        defaultPose.frontLeg.thighAngle = -1.4;
        defaultPose.frontLeg.shinAngle = 2.2;
        defaultPose.backLeg.thighAngle = -1.6;
        defaultPose.backLeg.shinAngle = 1.9;
        defaultPose.frontArm.upperAngle = 0.6;
        defaultPose.frontArm.foreAngle = 0.5; // 單手垂地
        defaultPose.backArm.upperAngle = 0.4;
        defaultPose.backArm.foreAngle = 0.4;
        return defaultPose;
      }

      case 'super_move': {
        // 超必殺奧義發動姿態：
        // 前半段 (0~22)：深蹲馬步蓄力、能量瘋狂匯聚於胸前與掌心
        // 後半段 (23~65)：全力向前轟出全屏巨型奧義光柱/斬芒，身軀堅若磐石向前震盪！
        const isCharging = t < 22;
        if (isCharging) {
          defaultPose.torso.y = -68;
          defaultPose.torso.angle = -0.15; // 身體後縮蓄力
          defaultPose.frontArm.upperAngle = 0.8;
          defaultPose.frontArm.foreAngle = 2.1; // 雙手向後收在腰際
          defaultPose.backArm.upperAngle = 0.7;
          defaultPose.backArm.foreAngle = 2.0;
          defaultPose.frontLeg.thighAngle = 0.35;
          defaultPose.frontLeg.shinAngle = 0.25;
          defaultPose.backLeg.thighAngle = -0.45;
          defaultPose.backLeg.shinAngle = 0.4;
          defaultPose.vfx = {
            type: 'super_charge',
            color: char.skin && char.skin.themeColor ? char.skin.themeColor : '#00f3ff',
            x: 0,
            y: -74,
            time: t
          };
        } else {
          defaultPose.torso.y = -72;
          defaultPose.torso.angle = 0.22; // 身體向前弓步怒轟
          defaultPose.frontArm.upperAngle = -0.15; // 雙手推向前方
          defaultPose.frontArm.foreAngle = 0.05;
          defaultPose.backArm.upperAngle = -0.22;
          defaultPose.backArm.foreAngle = 0.08;
          defaultPose.frontLeg.thighAngle = 0.55;
          defaultPose.frontLeg.shinAngle = 0.45;
          defaultPose.backLeg.thighAngle = -0.65;
          defaultPose.backLeg.shinAngle = 0.2;
          defaultPose.vfx = {
            type: 'super_blast',
            color: char.skin && char.skin.themeColor ? char.skin.themeColor : '#00f3ff',
            action: char.currentAction,
            x: 52,
            y: -74,
            time: t
          };
        }
        return defaultPose;
      }

      default:
        return defaultPose;
    }
  }

  // ─── 肢體繪製方法 ───

  drawTorso(ctx, torso, skin, t) {
    if (specialSkinsRenderer.drawTorso(ctx, torso, skin, t)) {
      return;
    }
    if (scifiSkinsRenderer.drawTorso(ctx, torso, skin, t)) {
      return;
    }

    ctx.save();
    ctx.translate(torso.x, torso.y);
    ctx.rotate(torso.angle);

    // 胸甲護板
    ctx.fillStyle = skin.armorColor || '#0f172a';
    ctx.strokeStyle = skin.themeColor || '#00f3ff';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(-16, -23);
    ctx.lineTo(16, -23);
    ctx.lineTo(12, 16);
    ctx.lineTo(-12, 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 骨盆/腰帶
    ctx.fillStyle = '#090d16';
    ctx.fillRect(-11, 16, 22, 12);
    ctx.strokeRect(-11, 16, 22, 12);

    // 中央量子反應爐核心 (自然脈衝微光)
    const pulse = 1 + Math.sin(t * 0.1) * 0.15;
    ctx.save();
    ctx.shadowColor = skin.themeColor;
    ctx.shadowBlur = 12 * pulse;
    ctx.fillStyle = skin.coreColor || skin.themeColor;
    ctx.beginPath();
    ctx.arc(0, -6, 6 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // 核心內核高亮白
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -6, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  _hexToRgb(hex) {
    if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return '0, 243, 255';
    let c = hex.substring(1);
    if (c.length === 3) {
      c = c.split('').map(x => x + x).join('');
    }
    const num = parseInt(c, 16);
    if (isNaN(num)) return '0, 243, 255';
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `${r}, ${g}, ${b}`;
  }

  /**
   * 繪製高科技賽博頭部與機械仿生雙眼 (High-Tech Cyber Head with Dual Optic Eyes & HUD)
   */
  drawHead(ctx, head, skin) {
    ctx.save();
    ctx.translate(head.x, head.y);
    ctx.rotate(head.angle);

    if (specialSkinsRenderer.drawHead(ctx, head, skin)) {
      ctx.restore();
      return;
    }
    if (scifiSkinsRenderer.drawHead(ctx, head, skin)) {
      ctx.restore();
      return;
    }

    const themeColor = skin.themeColor || '#00f3ff';
    const visorColor = skin.visorColor || themeColor;
    const accentColor = skin.accentColor || themeColor;
    const armorColor = skin.armorColor || '#0f172a';
    const t = Date.now() / 250;
    const rgbVisor = this._hexToRgb(visorColor);
    const rgbTheme = this._hexToRgb(themeColor);

    // ── 1. 高科技機甲頭盔外輪廓 (Mecha Helmet Chassis) ──
    ctx.fillStyle = armorColor;
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.8;

    ctx.beginPath();
    // 後腦勺圓弧至頭頂空氣動力導流脊
    ctx.moveTo(-12, 10);
    ctx.quadraticCurveTo(-18, 0, -15, -10);
    ctx.quadraticCurveTo(-10, -18, 2, -18);
    // 前額眉甲稜角延伸至面部
    ctx.lineTo(12, -12);
    ctx.lineTo(15, -4);
    // 下顎戰術面甲與導流線
    ctx.lineTo(13, 6);
    ctx.lineTo(6, 15);
    ctx.lineTo(-6, 14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // ── 2. 額頭戰術眉甲與全息電路刻線 (Forehead Crest & Circuit Trace) ──
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-6, -17);
    ctx.lineTo(6, -16);
    ctx.lineTo(11, -11);
    ctx.stroke();

    // 額頭中央量子光學處理晶片 (Quantum Optical Node)
    ctx.fillStyle = themeColor;
    ctx.beginPath();
    ctx.moveTo(3, -15);
    ctx.lineTo(6, -13);
    ctx.lineTo(3, -11);
    ctx.lineTo(0, -13);
    ctx.closePath();
    ctx.fill();

    // ── 3. 側邊戰術通訊耳部模組 (Comms Beacon & Neural Link) ──
    ctx.fillStyle = '#090d16';
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(-8, 1, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 耳機狀態微脈衝指示燈 (Status LED)
    const ledPulse = Math.sin(t * 1.5) * 0.3 + 0.7;
    ctx.fillStyle = visorColor;
    ctx.shadowColor = visorColor;
    ctx.shadowBlur = 6 * ledPulse;
    ctx.beginPath();
    ctx.arc(-8, 1, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 太陽穴接駁光纖導線 (Neural Fiber Line)
    ctx.strokeStyle = `rgba(${rgbTheme}, 0.65)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(0, -2);
    ctx.lineTo(3, -3);
    ctx.stroke();

    // ── 4. 戰術深黑眼眶基座 (Tactical Eye Socket Faceplate) ──
    ctx.fillStyle = 'rgba(2, 6, 18, 0.92)';
    ctx.strokeStyle = `rgba(${rgbTheme}, 0.4)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    // 銳利幾何眼眶
    ctx.moveTo(2, -7);
    ctx.lineTo(15, -4);
    ctx.lineTo(14, 3);
    ctx.lineTo(3, 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // ── 5. 高科技賽博機械仿生雙眼 (Dual Cyber-Optic Eyes with HUD) ──

    // (A) 後側立體眼角光學節點 (Far Eye Node) - 呈現 3/4 視角雙眼立體感
    ctx.save();
    ctx.shadowColor = visorColor;
    ctx.shadowBlur = 8;
    ctx.fillStyle = visorColor;
    ctx.beginPath();
    ctx.ellipse(3.2, -2, 2.2, 3.2, -0.2, 0, Math.PI * 2);
    ctx.fill();
    // 後眼瞳孔極光核
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(3.2, -2, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // (B) 前側主光學感測眼 (Main Cyber-Optic Eye) - 銳利科技戰神神韻
    ctx.save();
    ctx.shadowColor = visorColor;
    ctx.shadowBlur = 14;

    // 賽博眼白發光基底 (Glowing Cyber Sclera)
    ctx.fillStyle = `rgba(${rgbVisor}, 0.4)`;
    ctx.beginPath();
    ctx.moveTo(6, -4.5);
    ctx.lineTo(14, -3.2);
    ctx.lineTo(13, 2);
    ctx.lineTo(6.5, 1.5);
    ctx.closePath();
    ctx.fill();

    // 銳利高科技霓虹虹膜 (Angular Neon Iris)
    ctx.fillStyle = visorColor;
    ctx.beginPath();
    ctx.moveTo(7, -3.8);
    ctx.lineTo(13.2, -2.8);
    ctx.lineTo(12, 1.2);
    ctx.lineTo(7.5, 0.8);
    ctx.closePath();
    ctx.fill();

    // 數位光學聚焦瞳孔 (Digital Reticle Core)
    const pupilPulse = Math.sin(t * 2) * 0.3 + 1.2;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(10, -1, 1.8 * pupilPulse, 0, Math.PI * 2);
    ctx.fill();

    // 瞳孔十字瞄準準星 (Crosshair Targeting Reticle)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(10 - 3.5, -1);
    ctx.lineTo(10 + 3.5, -1);
    ctx.moveTo(10, -1 - 3.5);
    ctx.lineTo(10, -1 + 3.5);
    ctx.stroke();

    // 全息瞄準射線 (Holographic HUD Aiming Laser)
    const laserAlpha = Math.sin(t * 3) * 0.25 + 0.65;
    ctx.strokeStyle = `rgba(${rgbVisor}, ${laserAlpha})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(14, -2);
    ctx.lineTo(25, -2);
    ctx.stroke();

    // 激光微端戰術瞄準方括號 HUD [ ] (Targeting Bracket)
    ctx.beginPath();
    ctx.moveTo(22, -5);
    ctx.lineTo(25, -2);
    ctx.lineTo(22, 1);
    ctx.stroke();

    ctx.restore();

    // ── 6. 戰術下顎呼吸濾嘴與面甲刻線 (Jawline Filter & Cyberpanel Seams) ──
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(6, 6);
    ctx.lineTo(12, 5);
    ctx.moveTo(5, 9);
    ctx.lineTo(10, 8);
    ctx.stroke();

    // 呼吸排氣微格柵
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(8, 9, 3, 2);

    ctx.restore();
  }

  drawArm(ctx, arm, skin, layer) {
    if (specialSkinsRenderer.drawArm(ctx, arm, skin, layer)) {
      return;
    }

    ctx.save();
    ctx.translate(arm.shoulderX, arm.shoulderY);
    ctx.rotate(arm.upperAngle);

    const isBack = layer === 'backArm';
    const armorCol = isBack ? '#0a0f1d' : (skin.armorColor || '#0f172a');
    const strokeCol = isBack ? '#1e293b' : skin.themeColor;

    // 1. 上臂
    ctx.fillStyle = armorCol;
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-4, 0, 8, 22, 4);
    ctx.fill();
    ctx.stroke();

    // 2. 前臂與科技拳套
    ctx.translate(0, 20);
    ctx.rotate(arm.foreAngle);

    ctx.fillStyle = skin.accentColor || skin.themeColor;
    ctx.beginPath();
    ctx.roundRect(-5, 0, 10, 22, 4);
    ctx.fill();
    ctx.stroke();

    // 拳套關節金屬飾邊
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-3, 16, 6, 4);

    // 武器道具渲染 (非特殊外觀之武器道具如弓、槍、刀、盾、錘)
    if (!isBack && arm.holdingWeapon) {
      this._drawWeaponProp(ctx, arm.holdingWeapon, skin, arm);
    }

    ctx.restore();
  }

  _drawWeaponProp(ctx, weapon, skin, arm) {
    ctx.save();
    ctx.translate(0, 18);

    if (weapon === 'bow') {
      // 科技弓
      ctx.strokeStyle = skin.themeColor || '#a855f7';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(8, -14, 4, -26);
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(8, 14, 4, 26);
      ctx.stroke();

      // 弓弦
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (arm.drawingArrow) {
        ctx.moveTo(4, -26);
        ctx.lineTo(-12, 0);
        ctx.lineTo(4, 26);
      } else {
        ctx.moveTo(4, -26);
        ctx.lineTo(-1, 0);
        ctx.lineTo(4, 26);
      }
      ctx.stroke();

      // 能量箭矢
      if (arm.drawingArrow) {
        ctx.strokeStyle = skin.secondaryColor || '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-14, 0);
        ctx.lineTo(24, 0);
        ctx.stroke();
      }
    } else if (weapon === 'gun') {
      // 科技手槍/戰術爆能槍
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = skin.themeColor || '#38bdf8';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(-2, -4, 18, 7, 2);
      ctx.fill();
      ctx.stroke();
      // 握把
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-2, -2, 4, 12);
      // 激光瞄準線
      ctx.strokeStyle = skin.themeColor || '#ef4444';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(32, 0);
      ctx.stroke();
    } else if (weapon === 'sword') {
      // 科技光刃/太刀
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-2, 0, 4, 12); // 劍柄
      ctx.fillStyle = skin.themeColor || '#cbd5e1';
      ctx.fillRect(-7, -2, 14, 3); // 護手
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = skin.themeColor || '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-3, -2);
      ctx.lineTo(-2, -34);
      ctx.lineTo(0, -40);
      ctx.lineTo(2, -34);
      ctx.lineTo(3, -2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (weapon === 'shield') {
      // 科技能量盾
      ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.strokeStyle = skin.themeColor || '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (weapon === 'hammer') {
      // 科技戰錘
      ctx.fillStyle = '#334155';
      ctx.fillRect(-2, -2, 4, 16);
      ctx.fillStyle = '#e2e8f0';
      ctx.strokeStyle = skin.themeColor || '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(-8, -12, 16, 10, 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  drawLimb(ctx, leg, skin, layer) {
    if (specialSkinsRenderer.drawLimb(ctx, leg, skin, layer)) {
      return;
    }

    ctx.save();
    ctx.translate(leg.hipX, leg.hipY);
    ctx.rotate(leg.thighAngle);

    const isBack = layer === 'backLeg';
    const armorCol = isBack ? '#090d18' : (skin.armorColor || '#0f172a');
    const strokeCol = isBack ? '#1e293b' : skin.themeColor;

    // 1. 大腿護甲
    ctx.fillStyle = armorCol;
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-5, 0, 10, 26, 4);
    ctx.fill();
    ctx.stroke();

    // 2. 小腿護甲
    ctx.translate(0, 24);
    ctx.rotate(leg.shinAngle);

    ctx.fillStyle = armorCol;
    ctx.beginPath();
    ctx.roundRect(-5, 0, 10, 28, 4);
    ctx.fill();
    ctx.stroke();

    // 3. 戰靴與腳踝關節 (支援自然步態腳踝旋轉)
    ctx.translate(0, 24);
    if (leg.footAngle) {
      ctx.rotate(leg.footAngle);
    }
    ctx.fillStyle = skin.themeColor;
    ctx.fillRect(-4, 0, 15, 6);

    ctx.restore();
  }

  // ─── 防禦力場護盾渲染 ───
  drawGuardShield(ctx, stance, skin, t) {
    if (specialSkinsRenderer.drawGuardShield(ctx, stance, skin, t)) {
      return;
    }
    if (scifiSkinsRenderer.drawGuardShield(ctx, stance, skin, t)) {
      return;
    }

    ctx.save();
    const pulse = Math.sin(t * 0.2) * 0.1 + 0.9;
    ctx.shadowColor = skin.themeColor;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = skin.themeColor;
    ctx.fillStyle = skin.glowColor || 'rgba(0, 243, 255, 0.2)';
    ctx.lineWidth = 3;

    if (stance === 'low') {
      // 下段斜向下菱形幾何護盾
      ctx.beginPath();
      ctx.moveTo(10, -10);
      ctx.lineTo(44, -20);
      ctx.lineTo(36, -60);
      ctx.lineTo(6, -45);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      // 高段正前方六角蜂巢力場
      const shieldY = -74;
      ctx.beginPath();
      ctx.moveTo(24, shieldY - 45);
      ctx.lineTo(48, shieldY - 25);
      ctx.lineTo(48, shieldY + 25);
      ctx.lineTo(24, shieldY + 45);
      ctx.lineTo(14, shieldY + 20);
      ctx.lineTo(14, shieldY - 20);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 護盾網格線
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(24, shieldY - 45);
      ctx.lineTo(48, shieldY + 25);
      ctx.moveTo(48, shieldY - 25);
      ctx.lineTo(24, shieldY + 45);
      ctx.stroke();
    }

    ctx.restore();
  }

  // ─── 武打 VFX 渲染 (依外觀色彩分離映射) ───
  drawAttackVFX(ctx, vfx, skin) {
    if (specialSkinsRenderer.drawAttackVFX(ctx, vfx, skin)) {
      return;
    }

    ctx.save();
    ctx.shadowColor = skin.themeColor;
    ctx.shadowBlur = 16;
    ctx.fillStyle = skin.themeColor;

    if (vfx.type === 'punch') {
      // 刺拳能量刃弧光
      ctx.beginPath();
      ctx.arc(vfx.x, vfx.y, 18, -Math.PI / 4, Math.PI / 4);
      ctx.lineWidth = 4;
      ctx.strokeStyle = skin.secondaryColor || '#ffffff';
      ctx.stroke();

      // 外觀專屬粒子特效
      if (skin.id === 'skin_dark_hacker') {
        ctx.font = '10px monospace';
        ctx.fillStyle = '#00ff66';
        ctx.fillText('0101', vfx.x - 10, vfx.y - 12);
      } else if (skin.id === 'skin_solar_valkyrie') {
        ctx.fillStyle = '#ff4500';
        ctx.fillRect(vfx.x - 4, vfx.y - 4, 8, 8);
      } else if (skin.id === 'skin_cyber_diva') {
        ctx.font = '13px sans-serif';
        ctx.fillStyle = '#f43f5e';
        ctx.fillText('♪', vfx.x - 6, vfx.y - 10);
      } else if (skin.id === 'skin_cryo_maiden') {
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#bae6fd';
        ctx.fillText('❄', vfx.x - 6, vfx.y - 8);
      } else if (skin.id === 'skin_cosmic_ronin') {
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#c084fc';
        ctx.fillText('✦', vfx.x - 6, vfx.y - 10);
      } else if (skin.id === 'skin_archangel_judicator') {
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('✧', vfx.x - 6, vfx.y - 10);
      } else if (skin.id === 'skin_volt_ranger') {
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 10, vfx.y - 10);
        ctx.lineTo(vfx.x - 4, vfx.y - 2);
        ctx.lineTo(vfx.x - 8, vfx.y + 2);
        ctx.lineTo(vfx.x, vfx.y + 8);
        ctx.stroke();
      } else if (skin.id === 'skin_omega_emperor') {
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 12, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (vfx.type === 'kick') {
      // 重踢弧線掃光
      ctx.beginPath();
      ctx.arc(vfx.x - 10, vfx.y, 40, -Math.PI / 3, Math.PI / 6);
      ctx.lineWidth = 6;
      ctx.strokeStyle = skin.themeColor;
      ctx.stroke();

      // 重踢輔助雙色粒子
      if (skin.secondaryColor) {
        ctx.beginPath();
        ctx.arc(vfx.x - 10, vfx.y, 34, -Math.PI / 3, Math.PI / 6);
        ctx.lineWidth = 2;
        ctx.strokeStyle = skin.secondaryColor;
        ctx.stroke();
      }
    } else if (vfx.type === 'shoryuken') {
      // 昇龍衝天光柱
      ctx.fillStyle = skin.glowColor;
      ctx.fillRect(vfx.x - 15, vfx.y, 30, 90);
      ctx.strokeStyle = skin.themeColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(vfx.x - 15, vfx.y, 30, 90);
    } else if (vfx.type === 'plasma_muzzle') {
      // 遠程射擊聚能發射口光環與衝擊火花
      const rad = 10 + (vfx.progress || 0.5) * 14;
      ctx.beginPath();
      ctx.arc(vfx.x, vfx.y, rad, 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.strokeStyle = skin.secondaryColor || '#ffffff';
      ctx.stroke();
      ctx.fillStyle = skin.themeColor;
      ctx.beginPath();
      ctx.arc(vfx.x, vfx.y, rad * 0.45, 0, Math.PI * 2);
      ctx.fill();
    } else if (vfx.type === 'dive_kick') {
      // 躍空俯衝飛踢破空衝擊光弧
      ctx.beginPath();
      ctx.moveTo(vfx.x - 30, vfx.y - 25);
      ctx.lineTo(vfx.x + 12, vfx.y + 16);
      ctx.lineWidth = 6;
      ctx.strokeStyle = skin.themeColor;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(vfx.x - 18, vfx.y - 14);
      ctx.lineTo(vfx.x + 12, vfx.y + 16);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = skin.secondaryColor || '#ffffff';
      ctx.stroke();
    } else if (vfx.type === 'crouch_punch') {
      // 下蹲低位刺拳鋒芒弧光
      ctx.beginPath();
      ctx.arc(vfx.x, vfx.y, 16, -Math.PI / 4, Math.PI / 4);
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = skin.secondaryColor || '#ffffff';
      ctx.stroke();
    } else if (vfx.type === 'bow_arrow') {
      // 科技穿甲箭矢破空光軌與箭頭
      ctx.strokeStyle = skin.themeColor || '#a855f7';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(vfx.x - 26, vfx.y);
      ctx.lineTo(vfx.x + 8, vfx.y);
      ctx.stroke();

      // 尖銳箭鏃
      ctx.fillStyle = skin.secondaryColor || '#ffffff';
      ctx.beginPath();
      ctx.moveTo(vfx.x + 8, vfx.y - 3.5);
      ctx.lineTo(vfx.x + 16, vfx.y);
      ctx.lineTo(vfx.x + 8, vfx.y + 3.5);
      ctx.closePath();
      ctx.fill();

      // 箭尾羽
      ctx.fillStyle = skin.themeColor || '#a855f7';
      ctx.fillRect(vfx.x - 26, vfx.y - 2.5, 6, 1.5);
      ctx.fillRect(vfx.x - 26, vfx.y + 1, 6, 1.5);

      // 音速氣環
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(vfx.x - 6, vfx.y, 7, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();
    } else if (vfx.type === 'gun_bullet') {
      // 戰術槍火槍口閃焰與穿甲彈道
      ctx.fillStyle = '#ffedd5';
      ctx.beginPath();
      ctx.arc(vfx.x - 12, vfx.y, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = skin.secondaryColor || '#facc15';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(vfx.x - 12, vfx.y);
      ctx.lineTo(vfx.x + 16, vfx.y);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(vfx.x + 10, vfx.y - 1.5, 6, 3);
    } else if (vfx.type === 'sword_slash_vfx') {
      // 居合斬次元破空光弧
      ctx.strokeStyle = skin.secondaryColor || '#ffffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(vfx.x - 8, vfx.y, 28, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();

      ctx.strokeStyle = skin.themeColor || '#38bdf8';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(vfx.x - 8, vfx.y, 28, -Math.PI * 0.35, Math.PI * 0.35);
      ctx.stroke();
    } else if (vfx.type === 'shield_strike') {
      // 盾擊擴散衝擊波
      ctx.strokeStyle = skin.themeColor || '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(vfx.x, vfx.y, 22, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();
      ctx.fillStyle = skin.secondaryColor || '#ffffff';
      ctx.beginPath();
      ctx.arc(vfx.x + 6, vfx.y, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (vfx.type === 'thor_lightning') {
      // 雷電折線
      ctx.strokeStyle = skin.themeColor || '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(vfx.x - 12, vfx.y - 14);
      ctx.lineTo(vfx.x - 2, vfx.y - 2);
      ctx.lineTo(vfx.x - 6, vfx.y + 2);
      ctx.lineTo(vfx.x + 12, vfx.y + 14);
      ctx.stroke();
    } else if (vfx.type === 'repulsor_blast') {
      // 等離子束
      ctx.strokeStyle = skin.themeColor || '#38bdf8';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(vfx.x - 16, vfx.y);
      ctx.lineTo(vfx.x + 16, vfx.y);
      ctx.stroke();
    } else if (vfx.type === 'web_stream') {
      // 蛛絲
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(vfx.x - 24, vfx.y);
      ctx.lineTo(vfx.x + 12, vfx.y);
      ctx.stroke();
    } else if (vfx.type === 'kamehameha_vfx' || vfx.type === 'final_flash_vfx') {
      // 氣功波
      ctx.fillStyle = skin.themeColor || '#fde047';
      ctx.beginPath();
      ctx.arc(vfx.x, vfx.y, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(vfx.x, vfx.y, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (vfx.type === 'death_beam_vfx') {
      // 死亡射線
      ctx.strokeStyle = skin.themeColor || '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(vfx.x - 20, vfx.y);
      ctx.lineTo(vfx.x + 20, vfx.y);
      ctx.stroke();
    } else if (vfx.type === 'namek_arm_vfx') {
      // 伸長手臂衝擊
      ctx.strokeStyle = skin.themeColor || '#22c55e';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(vfx.x - 24, vfx.y);
      ctx.lineTo(vfx.x + 10, vfx.y);
      ctx.stroke();
    } else if (vfx.type === 'infinity_vfx') {
      // 原石衝擊
      ctx.fillStyle = skin.themeColor || '#facc15';
      ctx.beginPath();
      ctx.arc(vfx.x, vfx.y, 12, 0, Math.PI * 2);
      ctx.fill();
    } else if (vfx.type === 'sweep') {
      // 下蹲掃堂腿貼地旋風與擦地光軌
      ctx.beginPath();
      ctx.ellipse(vfx.x - 8, vfx.y, 45, 12, 0, -Math.PI / 6, Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = skin.themeColor;
      ctx.stroke();
      if (skin.secondaryColor) {
        ctx.beginPath();
        ctx.ellipse(vfx.x - 8, vfx.y, 36, 9, 0, -Math.PI / 6, Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = skin.secondaryColor;
        ctx.stroke();
      }
    } else if (vfx.type === 'hit_sparks') {
      // 受擊火花
      for (let i = 0; i < 4; i++) {
        const ang = (Math.PI * 2 / 4) * i;
        ctx.fillStyle = skin.themeColor;
        ctx.fillRect(Math.cos(ang) * 16, vfx.y + Math.sin(ang) * 16, 4, 4);
      }
    } else if (vfx.type === 'victory_aura') {
      // 冠軍勝利光環與指天星芒 (Victory Aura & Cosmic Star)
      const time = vfx.time || 0;
      const themeCol = skin.themeColor || '#ffd700';

      ctx.save();
      ctx.shadowColor = themeCol;
      ctx.shadowBlur = 18;

      // 1. 旋轉升騰勝利光環粒子
      for (let i = 0; i < 6; i++) {
        const angle = (time * 0.05 + i * (Math.PI / 3));
        const rad = 24 + Math.sin(time * 0.1 + i) * 6;
        const py = -30 - ((time * 2 + i * 18) % 85);
        ctx.fillStyle = i % 2 === 0 ? '#ffd700' : themeCol;
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * rad, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. 指天拳頭頂部耀眼冠軍星芒 (Victory Star)
      const starX = 4;
      const starY = -132;
      const pulse = 6 + Math.sin(time * 0.2) * 3;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(starX - pulse * 2, starY);
      ctx.lineTo(starX + pulse * 2, starY);
      ctx.moveTo(starX, starY - pulse * 2);
      ctx.lineTo(starX, starY + pulse * 2);
      ctx.stroke();

      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(starX, starY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    } else if (vfx.type === 'super_charge') {
      // 終極必殺蓄力匯聚能量光球與向內吸納之光芒粒子
      const time = vfx.time || 0;
      const themeCol = vfx.color || '#00f3ff';
      const rad = 14 + Math.sin(time * 0.3) * 4;

      ctx.save();
      ctx.shadowColor = themeCol;
      ctx.shadowBlur = 24;

      // 核心高溫光球
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(vfx.x - 4, vfx.y - 2, rad * 0.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = themeCol;
      ctx.beginPath();
      ctx.arc(vfx.x - 4, vfx.y - 2, rad, 0, Math.PI * 2);
      ctx.fill();

      // 向內匯聚的光弧
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        const ang = time * 0.15 + i * (Math.PI / 2);
        const dist = 28 - (time % 14);
        ctx.beginPath();
        ctx.moveTo(vfx.x - 4 + Math.cos(ang) * (dist + 8), vfx.y - 2 + Math.sin(ang) * (dist + 8));
        ctx.lineTo(vfx.x - 4 + Math.cos(ang) * dist, vfx.y - 2 + Math.sin(ang) * dist);
        ctx.stroke();
      }
      ctx.restore();
    } else if (vfx.type === 'super_blast') {
      // 終極必殺怒轟掌心槍口高溫等離子閃焰
      const time = vfx.time || 0;
      const themeCol = vfx.color || '#00f3ff';

      ctx.save();
      ctx.shadowColor = themeCol;
      ctx.shadowBlur = 32;

      // 爆裂核心衝擊光環
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(vfx.x, vfx.y, 24 + Math.sin(time * 0.4) * 6, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();

      ctx.fillStyle = themeCol;
      ctx.beginPath();
      ctx.arc(vfx.x + 8, vfx.y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(vfx.x + 8, vfx.y, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    ctx.restore();
  }

  /**
   * 繪製大廳外觀展示台專屬全息光圈底座
   */
  drawPedestal(ctx, cx, cy, radius, skin, t) {
    ctx.save();
    ctx.translate(cx, cy);

    // 旋轉全息六角外環
    ctx.save();
    ctx.rotate(t * 0.02);
    ctx.shadowColor = skin.themeColor;
    ctx.shadowBlur = 20;
    ctx.strokeStyle = skin.themeColor;
    ctx.lineWidth = 3;

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const ang = (Math.PI / 3) * i;
      const px = Math.cos(ang) * radius;
      const py = Math.sin(ang) * (radius * 0.35); // 橢圓透視
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // 內層發光光環
    ctx.save();
    ctx.rotate(-t * 0.03);
    ctx.strokeStyle = skin.secondaryColor || '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 0.75, radius * 0.28, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 向上升騰的全息微粒光芒
    ctx.fillStyle = skin.glowColor;
    for (let i = 0; i < 6; i++) {
      const partT = (t * 0.05 + i * 1.2) % 3;
      const py = -partT * 30;
      const px = (i - 2.5) * 18;
      const alpha = Math.max(0, 1 - partT / 3);
      ctx.fillStyle = skin.themeColor;
      ctx.globalAlpha = alpha;
      ctx.fillRect(px, py, 3, 3);
    }

    ctx.restore();
  }
}

export const characterRenderer = new CharacterRenderer();
