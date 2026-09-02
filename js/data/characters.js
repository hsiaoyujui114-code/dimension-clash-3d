/**
 * 跨次元大亂鬥 (Dimension Clash Online 3D)
 * 角色資料庫 (Characters Database) - 100 位跨次元頂級全明星陣容 (七龍珠 / 漫威 / 鋼彈 / 熱血動漫 / 3D 經典遊戲傳奇)
 */

const RARITY_TIERS = {
  1: { id: 1, name: "凡品 (白階)", color: "#94a3b8", bg: "#1e293b", border: "#cbd5e1", glow: "rgba(203, 213, 225, 0.4)", label: "凡品" },
  2: { id: 2, name: "優秀 (綠階)", color: "#22c55e", bg: "#064e3b", border: "#4ade80", glow: "rgba(74, 222, 128, 0.4)", label: "優秀" },
  3: { id: 3, name: "稀有 (藍階)", color: "#3b82f6", bg: "#172554", border: "#60a5fa", glow: "rgba(96, 165, 250, 0.4)", label: "稀有" },
  4: { id: 4, name: "特級 (紫階)", color: "#a855f7", bg: "#3b0764", border: "#c084fc", glow: "rgba(192, 132, 252, 0.4)", label: "特級" },
  5: { id: 5, name: "史詩 (粉階)", color: "#ec4899", bg: "#500724", border: "#f472b6", glow: "rgba(244, 114, 182, 0.4)", label: "史詩" },
  6: { id: 6, name: "傳奇 (金階)", color: "#eab308", bg: "#422006", border: "#fde047", glow: "rgba(253, 224, 71, 0.4)", label: "傳奇" },
  7: { id: 7, name: "神話 (紅階)", color: "#ef4444", bg: "#450a0a", border: "#f87171", glow: "rgba(248, 113, 113, 0.4)", label: "神話" },
  8: { id: 8, name: "幻界 (彩階)", color: "#06b6d4", bg: "#083344", border: "#38bdf8", glow: "rgba(56, 189, 248, 0.6)", label: "幻界" },
  9: { id: 9, name: "★ 創世/概念級", color: "#f43f5e", bg: "#4c0519", border: "#fb7185", glow: "rgba(251, 113, 133, 0.8)", label: "創世" }
};

const CHARACTERS_DATA = [
  // ==========================================
  // ── 1. 七龍珠宇宙 (Dragon Ball Universe) ──
  // ==========================================
  {
    id: "goku_kid",
    name: "少年孫悟空",
    title: "冒險之始",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 1,
    cost: 0,
    unlockCondition: "登入 Google 帳號自動贈送",
    isFree: true,
    role: "近戰體術",
    weaponType: "power_pole",
    canFly: false,
    baseHp: 1000,
    baseAtk: 100,
    baseDef: 50,
    speed: 6.5,
    themeColor: "#f97316",
    auraColor: "rgba(249, 115, 22, 0.6)",
    attackConfig: {
      light: { name: "如意棒連打", desc: "如意棒三段快速突刺" },
      heavy: { name: "伸長橫掃", desc: "蓄力橫掃千軍破防" },
      grab: { name: "筋斗雲背摔", desc: "抓住對手藉筋斗雲下砸" },
      flight: { name: "筋斗雲浮空", desc: "召喚金色筋斗雲飛行" }
    },
    skills: {
      skill1: { name: "伸縮如意棒", cd: 3, damage: 180, type: "melee_pierce", desc: "揮舞如意棒向前方直線伸長突刺，遠程破招。" },
      skill2: { name: "殘像拳", cd: 6, damage: 120, type: "teleport_strike", desc: "化身殘影瞬移至對手身後發動迴旋踢。" },
      ult: { name: "基礎龜派氣功", cd: 20, damage: 650, type: "beam", desc: "雙手蓄積湛藍氣功波轟擊全場。" }
    }
  },
  {
    id: "krillin",
    name: "克林",
    title: "最強地球人",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 2,
    cost: 800,
    unlockCondition: "消耗 800 金幣招募",
    isFree: false,
    role: "遠程牽制",
    weaponType: "none",
    canFly: true,
    baseHp: 1100,
    baseAtk: 115,
    baseDef: 55,
    speed: 6.8,
    themeColor: "#eab308",
    auraColor: "rgba(234, 179, 8, 0.6)",
    attackConfig: {
      light: { name: "鶴龜體術", desc: "靈巧三段連打" },
      heavy: { name: "氣圓斬突擊", desc: "蓄力光刃重劈破防" },
      grab: { name: "近身過肩摔", desc: "抓起對手重摔" },
      flight: { name: "舞空術", desc: "調動氣息升空飛行" }
    },
    skills: {
      skill1: { name: "氣圓斬", cd: 4, damage: 240, type: "saw_blade", desc: "投擲鋒利金色旋轉光鋸，無視 40% 防禦。" },
      skill2: { name: "太陽拳", cd: 8, damage: 60, type: "flash_stun", desc: "爆發強光致盲對手 1.5 秒。" },
      ult: { name: "散彈氣功波", cd: 20, damage: 780, type: "multishot", desc: "升空發射追蹤氣彈轟炸全場。" }
    }
  },
  {
    id: "yamcha",
    name: "飲茶",
    title: "沙漠大盜",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 2,
    cost: 800,
    unlockCondition: "消耗 800 金幣招募",
    isFree: false,
    role: "高速連擊",
    weaponType: "none",
    canFly: true,
    baseHp: 1050,
    baseAtk: 120,
    baseDef: 50,
    speed: 7.2,
    themeColor: "#ea580c",
    auraColor: "rgba(234, 88, 12, 0.6)",
    attackConfig: {
      light: { name: "狼牙拳法", desc: "狂野四段連擊爪擊" },
      heavy: { name: "野狼衝撞", desc: "蓄力狼魂衝刺破防" },
      grab: { name: "風刃投擲", desc: "近身擒拿拋投" },
      flight: { name: "舞空術", desc: "升空浮空飛行" }
    },
    skills: {
      skill1: { name: "狼牙風風拳", cd: 4.5, damage: 260, type: "rapid_strikes", desc: "疾風狼影快速爪擊連打。" },
      skill2: { name: "操氣彈", cd: 7, damage: 210, type: "homing_orb", desc: "手動操控氣彈軌道精準追擊。" },
      ult: { name: "真·狼牙風風拳", cd: 20, damage: 800, type: "rush_combo", desc: "狂暴狼魂全方位極限打擊。" }
    }
  },
  {
    id: "tien_shinhan",
    name: "天津飯",
    title: "三目鶴仙流宗師",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 3,
    cost: 1500,
    unlockCondition: "消耗 1,500 金幣招募",
    isFree: false,
    role: "破防爆發",
    weaponType: "none",
    canFly: true,
    baseHp: 1250,
    baseAtk: 135,
    baseDef: 65,
    speed: 6.6,
    themeColor: "#16a34a",
    auraColor: "rgba(22, 163, 74, 0.6)",
    attackConfig: {
      light: { name: "四妖拳法", desc: "多臂幻影連擊" },
      heavy: { name: "排球拳重扣", desc: "蓄力將對手砸入地面" },
      grab: { name: "三目擒拿", desc: "三目鎖定過肩重摔" },
      flight: { name: "舞空術", desc: "升空懸浮飛行" }
    },
    skills: {
      skill1: { name: "氣功砲", cd: 5, damage: 320, type: "blast_box", desc: "雙手結方印轟出方形震撼光波。" },
      skill2: { name: "四妖拳突襲", cd: 8, damage: 250, type: "multi_arm", desc: "背部長出雙臂高速壓制對手。" },
      ult: { name: "新·氣功砲", cd: 20, damage: 980, type: "rapid_blasts", desc: "凌空連續狂轟金色氣功砲！" }
    }
  },
  {
    id: "piccolo",
    name: "比克大魔王 (神比克)",
    title: "那美克星智勇大師",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 4,
    cost: 2500,
    unlockCondition: "消耗 2,500 金幣招募",
    isFree: false,
    role: "伸展牽制",
    weaponType: "none",
    canFly: true,
    baseHp: 1400,
    baseAtk: 150,
    baseDef: 75,
    speed: 6.7,
    themeColor: "#22c55e",
    auraColor: "rgba(34, 197, 94, 0.6)",
    attackConfig: {
      light: { name: "那美克體術", desc: "剛柔並濟三段打擊" },
      heavy: { name: "手臂伸長抓擊", desc: "手臂伸長十米破防抓取" },
      grab: { name: "念力摔投", desc: "念力將對手拋向半空" },
      flight: { name: "舞空術", desc: "升空懸浮飛行" }
    },
    skills: {
      skill1: { name: "魔貫光殺砲", cd: 6, damage: 380, type: "spiral_pierce", desc: "指尖螺旋金色光束，強力穿透。" },
      skill2: { name: "激烈光彈", cd: 8.5, damage: 300, type: "chest_blast", desc: "胸前聚集高密度氣團向前爆轟。" },
      ult: { name: "魔空包圍彈", cd: 20, damage: 1100, type: "surround_blast", desc: "無數氣彈懸空包圍對手同時引爆！" }
    }
  },
  {
    id: "vegeta_base",
    name: "達爾 (賽亞人王子)",
    title: "驕傲的血統",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 4,
    cost: 3000,
    unlockCondition: "消耗 3,000 金幣招募",
    isFree: false,
    role: "狂暴壓制",
    weaponType: "none",
    canFly: true,
    baseHp: 1380,
    baseAtk: 160,
    baseDef: 70,
    speed: 7.2,
    themeColor: "#3b82f6",
    auraColor: "rgba(59, 130, 246, 0.7)",
    attackConfig: {
      light: { name: "王室狂攻", desc: "剛猛凌厲四段體術" },
      heavy: { name: "戰鬥重擊", desc: "蓄力肘擊破防" },
      grab: { name: "踢碎下巴", desc: "近身抱摔凌空踢飛" },
      flight: { name: "舞空術", desc: "全向懸浮飛行" }
    },
    skills: {
      skill1: { name: "連續氣彈波", cd: 5, damage: 330, type: "bullet_barrage", desc: "雙手狂射十發追蹤氣功彈。" },
      skill2: { name: "大爆炸攻擊", cd: 9, damage: 390, type: "sphere_burst", desc: "單手掌心轟出巨大金黃球形爆破。" },
      ult: { name: "最終閃光 (Final Flash)", cd: 20, damage: 1250, type: "gigantic_beam", desc: "雙手展開蓄滿金光，撕裂大地巨型光束！" }
    }
  },
  {
    id: "goku_ssj1",
    name: "超級賽亞人 孫悟空",
    title: "傳說金髮戰士",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 5,
    cost: 4500,
    unlockCondition: "消耗 4,500 金幣招募",
    isFree: false,
    role: "全面均衡",
    weaponType: "none",
    canFly: true,
    baseHp: 1550,
    baseAtk: 175,
    baseDef: 80,
    speed: 7.5,
    themeColor: "#facc15",
    auraColor: "rgba(250, 204, 21, 0.8)",
    attackConfig: {
      light: { name: "超賽連打", desc: "金色氣場纏繞四段猛擊" },
      heavy: { name: "瞬身重拳", desc: "瞬間移動破防重拳" },
      grab: { name: "龍爪擒拿", desc: "抓起對手倒栽蔥重砸" },
      flight: { name: "高速舞空術", desc: "金光氣焰超速飛行" }
    },
    skills: {
      skill1: { name: "瞬移龜派氣功", cd: 6, damage: 420, type: "teleport_beam", desc: "貼臉瞬移零距離轟出龜派氣功。" },
      skill2: { name: "龍槌擊", cd: 8, damage: 340, type: "dive_smash", desc: "凌空重拳俯衝砸地震飛對手。" },
      ult: { name: "憤怒龜派氣功", cd: 20, damage: 1350, type: "golden_beam", desc: "狂怒金光爆發，全螢幕金色氣功巨浪！" }
    }
  },
  {
    id: "future_trunks_sword",
    name: "未來特南克斯 (手持勇者之劍)",
    title: "絕望未來的救世主",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 5,
    cost: 5000,
    unlockCondition: "消耗 5,000 金幣招募",
    isFree: false,
    role: "劍術突進",
    weaponType: "katana_sword",
    canFly: true,
    baseHp: 1500,
    baseAtk: 180,
    baseDef: 75,
    speed: 7.8,
    themeColor: "#818cf8",
    auraColor: "rgba(129, 140, 248, 0.75)",
    attackConfig: {
      light: { name: "勇者劍舞", desc: "雙手大劍快速四段斬擊" },
      heavy: { name: "次元居合斬", desc: "蓄力光刃縱斬破防" },
      grab: { name: "劍柄重擊摔投", desc: "劍柄頂擊接過肩重摔" },
      flight: { name: "舞空術", desc: "背負巨劍凌空飛行" }
    },
    skills: {
      skill1: { name: "燃燒突擊 (Burning Attack)", cd: 5.5, damage: 390, type: "fast_orb", desc: "花式手印轟出巨大熾熱火球。" },
      skill2: { name: "閃光劍伏擊", cd: 8, damage: 430, type: "sword_rush", desc: "金色劍光將對手劈成碎片。" },
      ult: { name: "魔封劍·魔貫斬", cd: 20, damage: 1400, type: "cross_slash", desc: "灌注全次元希望之光的極限雙十字斬！" }
    }
  },
  {
    id: "gohan_beast",
    name: "孫悟飯 (野獸型態 Beast)",
    title: "深紅魔瞳覺醒",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 7,
    cost: 12000,
    unlockCondition: "消耗 12,000 金幣招募",
    isFree: false,
    role: "極限爆發",
    weaponType: "none",
    canFly: true,
    baseHp: 1850,
    baseAtk: 225,
    baseDef: 95,
    speed: 8.2,
    themeColor: "#f43f5e",
    auraColor: "rgba(244, 63, 94, 0.9)",
    attackConfig: {
      light: { name: "野獸狂暴爪擊", desc: "銀白銀光殘影體術" },
      heavy: { name: "魔神重拳", desc: "純力量破空霸體重拳破防" },
      grab: { name: "魔閃投摔", desc: "單手鎖喉凌空貫地" },
      flight: { name: "真·舞空術", desc: "狂暴血紅雷電纏身飛行" }
    },
    skills: {
      skill1: { name: "魔閃光·極", cd: 5, damage: 520, type: "heavy_laser", desc: "額頭雙手轟出刺目金紅魔光柱。" },
      skill2: { name: "野獸瞬身直拳", cd: 7.5, damage: 490, type: "piercing_strike", desc: "超越光速直拳貫穿對手防線。" },
      ult: { name: "魔貫光殺砲 (野獸版)", cd: 20, damage: 1850, type: "apocalypse_beam", desc: "深紅血電環繞銀光，滅世螺旋光柱轟穿蒼穹！" }
    }
  },
  {
    id: "orange_piccolo",
    name: "橙色短笛 (神龍極限化身)",
    title: "巨神那美克傲世",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 6,
    cost: 8500,
    unlockCondition: "消耗 8,500 金幣招募",
    isFree: false,
    role: "重裝霸體",
    weaponType: "none",
    canFly: true,
    baseHp: 2100,
    baseAtk: 195,
    baseDef: 110,
    speed: 6.4,
    themeColor: "#ea580c",
    auraColor: "rgba(234, 88, 12, 0.8)",
    attackConfig: {
      light: { name: "橙色重拳", desc: "巨大鐵拳重轟三段" },
      heavy: { name: "地裂巨掌", desc: "單手碎地霸體破防" },
      grab: { name: "巨力擒摔", desc: "雙手抓起對手砸向山壁" },
      flight: { name: "舞空術", desc: "橙金氣焰懸浮飛行" }
    },
    skills: {
      skill1: { name: "巨神魔電爆", cd: 6, damage: 450, type: "ground_quake", desc: "掌心雷光引發大地震波。" },
      skill2: { name: "金剛不壞之軀", cd: 9, damage: 200, type: "iron_body", desc: "全抗性提升 50% 霸體 4 秒。" },
      ult: { name: "大魔王激震巨神拳", cd: 20, damage: 1550, type: "colossal_punch", desc: "巨大化金剛之拳，泰山壓頂碎裂擂台！" }
    }
  },
  {
    id: "goku_ssj4",
    name: "超級賽亞人4 孫悟空",
    title: "究極猿化戰士",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 7,
    cost: 14000,
    unlockCondition: "消耗 14,000 金幣招募",
    isFree: false,
    role: "狂暴近戰",
    weaponType: "none",
    canFly: true,
    baseHp: 1900,
    baseAtk: 230,
    baseDef: 90,
    speed: 8.0,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.85)",
    attackConfig: {
      light: { name: "十倍猿神連打", desc: "赤紅獸性四段猛攻" },
      heavy: { name: "龍拳前兆", desc: "金紅爆氣蓄力破防" },
      grab: { name: "神猿撕扯", desc: "神尾掃腿接近身重拋" },
      flight: { name: "赤紅舞空術", desc: "紅黑神焰超速飛行" }
    },
    skills: {
      skill1: { name: "10倍龜派氣功", cd: 5.5, damage: 560, type: "crimson_beam", desc: "雙手凝結赤紅血色巨型能量波。" },
      skill2: { name: "瞬影隕石重踏", cd: 8, damage: 480, type: "meteor_smash", desc: "瞬移至頭頂雙腳將對手踏入深淵。" },
      ult: { name: "真·龍拳爆發 (Dragon Fist)", cd: 20, damage: 1900, type: "golden_dragon", desc: "黃金神龍穿透胸膛，天地俱滅一擊必殺！" }
    }
  },
  {
    id: "vegeta_ultra_ego",
    name: "自我極意 達爾 (我慢極意)",
    title: "破壞神之怒",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 8,
    cost: 20000,
    unlockCondition: "消耗 20,000 金幣招募",
    isFree: false,
    role: "越戰越勇",
    weaponType: "none",
    canFly: true,
    baseHp: 2050,
    baseAtk: 245,
    baseDef: 85,
    speed: 8.1,
    themeColor: "#9333ea",
    auraColor: "rgba(147, 51, 234, 0.9)",
    attackConfig: {
      light: { name: "破壞鬥氣連擊", desc: "紫焰纏繞瘋狂重拳" },
      heavy: { name: "破壞碎天擊", desc: "無視受擊霸體破防重擊" },
      grab: { name: "破壞滅頂摔", desc: "單手掐喉灌地紫炎爆破" },
      flight: { name: "破壞神焰飛行", desc: "紫色破壞神焰凌空懸浮" }
    },
    skills: {
      skill1: { name: "破壞之球 (Hakai Sphere)", cd: 5, damage: 580, type: "destruction_orb", desc: "單手凝聚深紫破壞能量球湮滅一切。" },
      skill2: { name: "越傷越強 (Battle Instinct)", cd: 10, damage: 300, type: "buff_damage", desc: "受傷轉化為攻擊力，攻擊提升 30%。" },
      ult: { name: "滅絕破壞神閃光", cd: 20, damage: 2000, type: "hakai_cataclysm", desc: "全屏破壞神紫炎降臨，物質與靈魂全面湮滅！" }
    }
  },
  {
    id: "vegito_blue",
    name: "達洛特 (超級賽亞人藍)",
    title: "耳環合體最強戰神",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 8,
    cost: 22000,
    unlockCondition: "消耗 22,000 金幣招募",
    isFree: false,
    role: "靈劍壓制",
    weaponType: "spirit_sword",
    canFly: true,
    baseHp: 2000,
    baseAtk: 250,
    baseDef: 95,
    speed: 8.5,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.9)",
    attackConfig: {
      light: { name: "湛藍靈劍踢", desc: "雙手插兜無影連環踢" },
      heavy: { name: "靈魂光劍突刺", desc: "金黃靈魂光劍刺穿破防" },
      grab: { name: "無影腳踩踏", desc: "踏在對手身上凌空轟擊" },
      flight: { name: "神之氣息飛行", desc: "神之藍焰全向超光速飛行" }
    },
    skills: {
      skill1: { name: "靈魂光劍 (Spirit Sword)", cd: 5.5, damage: 600, type: "energy_blade", desc: "手掌延伸出十米光劍橫斬挑空！" },
      skill2: { name: "大爆炸連環彈", cd: 8, damage: 520, type: "spread_burst", desc: "五發大爆炸光球全方位覆蓋戰場。" },
      ult: { name: "最終龜派氣功 (Final Kamehameha)", cd: 20, damage: 2150, type: "dual_god_beam", desc: "融合達爾與悟空雙奧義，滅星神柱粉碎一切！" }
    }
  },
  {
    id: "gogeta_ssj4",
    name: "悟吉塔 (超級賽亞人4)",
    title: "融合之究極至尊",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 8,
    cost: 24000,
    unlockCondition: "消耗 24,000 金幣招募",
    isFree: false,
    role: "全能主宰",
    weaponType: "none",
    canFly: true,
    baseHp: 2100,
    baseAtk: 260,
    baseDef: 100,
    speed: 8.6,
    themeColor: "#ef4444",
    auraColor: "rgba(239, 68, 68, 0.95)",
    attackConfig: {
      light: { name: "炫目殘影體術", desc: "瞬息百拳極速連招" },
      heavy: { name: "彩虹霸體重劈", desc: "單手下劈震撼大地破防" },
      grab: { name: "戲謔神擊", desc: "手指彈射將對手彈飛萬米" },
      flight: { name: "至尊赤光舞空術", desc: "彩虹光環與赤紅毛皮流光飛行" }
    },
    skills: {
      skill1: { name: "大爆炸龜派氣功 100倍", cd: 6, damage: 640, type: "supreme_kame", desc: "雙手向前噴射百倍璀璨狂暴光柱。" },
      skill2: { name: "彩虹星屑閃耀", cd: 8.5, damage: 550, type: "stardust_breaker", desc: "七彩星屑淨化邪惡，防禦完全無效。" },
      ult: { name: "究極 100倍 Big Bang Kamehameha", cd: 20, damage: 2300, type: "universe_eraser", desc: "震碎維度的終極巨浪，宇宙無可匹敵！" }
    }
  },
  {
    id: "golden_frieza",
    name: "黃金弗利沙",
    title: "宇宙帝王復仇之姿",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 6,
    cost: 9000,
    unlockCondition: "消耗 9,000 金幣招募",
    isFree: false,
    role: "遠程刺客",
    weaponType: "none",
    canFly: true,
    baseHp: 1650,
    baseAtk: 210,
    baseDef: 85,
    speed: 8.0,
    themeColor: "#facc15",
    auraColor: "rgba(250, 204, 21, 0.9)",
    attackConfig: {
      light: { name: "帝王殘影擊", desc: "金色流光四段凌厲指刺" },
      heavy: { name: "黃金帝王重踢", desc: "尾巴與戰靴雙重破防" },
      grab: { name: "神尾絞殺", desc: "尾巴勒住咽喉重摔" },
      flight: { name: "黃金光幕飛行", desc: "金色神光環繞超光速飛行" }
    },
    skills: {
      skill1: { name: "死亡光束 (Death Beam)", cd: 4, damage: 440, type: "instant_pierce", desc: "指尖瞬發血紅激光，零前搖穿刺！" },
      skill2: { name: "大地裂斬", cd: 7.5, damage: 410, type: "ground_slicer", desc: "金黃能量光刃切裂大地引發地底噴發。" },
      ult: { name: "黃金死亡彈 (Golden Death Ball)", cd: 20, damage: 1650, type: "planet_buster", desc: "召喚毀滅星球的巨大黃金火球轟擊大地！" }
    }
  },
  {
    id: "goku_black_rose",
    name: "黑悟空 (超級賽亞人桃紅)",
    title: "神之正義肅清者",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 7,
    cost: 16000,
    unlockCondition: "消耗 16,000 金幣招募",
    isFree: false,
    role: "氣刃死神",
    weaponType: "ki_scythe",
    canFly: true,
    baseHp: 1800,
    baseAtk: 235,
    baseDef: 90,
    speed: 8.1,
    themeColor: "#ec4899",
    auraColor: "rgba(236, 72, 153, 0.9)",
    attackConfig: {
      light: { name: "神裂氣刃斬", desc: "右手桃紅手刀三段削斬" },
      heavy: { name: "神之狂怒重刺", desc: "氣刃伸長破防突刺" },
      grab: { name: "神之制裁拘禁", desc: "單手掐住對手引爆氣刺" },
      flight: { name: "桃紅神焰飛行", desc: "暗紫與粉紅交織神焰飛行" }
    },
    skills: {
      skill1: { name: "神裂光彈波", cd: 5, damage: 510, type: "rose_orbs", desc: "發射數道粉紅氣針穿刺爆炸。" },
      skill2: { name: "神之死神鐮刀 (Ki Scythe)", cd: 8, damage: 540, type: "scythe_cleave", desc: "具現化桃紅巨型神之鐮刀，劈開時空次元裂縫！" },
      ult: { name: "神之審判·千刃神罰", cd: 20, damage: 1950, type: "dimension_rift", desc: "時空裂縫湧出無數分身狂斬，終結人類神罰！" }
    }
  },
  {
    id: "broly_dbs_lssj",
    name: "布羅利 (傳說超級賽亞人 full power)",
    title: "狂暴綠焰魔神",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 8,
    cost: 21000,
    unlockCondition: "消耗 21,000 金幣招募",
    isFree: false,
    role: "霸體狂戰",
    weaponType: "none",
    canFly: true,
    baseHp: 2400,
    baseAtk: 255,
    baseDef: 105,
    speed: 7.6,
    themeColor: "#22c55e",
    auraColor: "rgba(34, 197, 94, 0.95)",
    attackConfig: {
      light: { name: "狂暴巨拳", desc: "綠焰包裹無可抵擋重拳" },
      heavy: { name: "巨神野蠻衝撞", desc: "全身綠焰霸體橫衝直撞破防" },
      grab: { name: "臉部拖行重砸", desc: "按住對手臉部在岩壁瘋狂拖行" },
      flight: { name: "暴怒咆哮飛行", desc: "龐大巨軀綠光沖天霸道飛行" }
    },
    skills: {
      skill1: { name: "狂暴巨彈 (Eraser Cannon)", cd: 5.5, damage: 600, type: "giant_green_orb", desc: "胸口與掌心同時噴發滅絕綠色巨彈。" },
      skill2: { name: "狂怒巨口咆哮", cd: 9, damage: 520, type: "mouth_cannon", desc: "張口轟出綠色能量巨柱震撼天地。" },
      ult: { name: "巨神狂暴綠焰大爆炸", cd: 20, damage: 2200, type: "apocalyptic_nova", desc: "全場化為綠色能量核爆海洋，寸草不生！" }
    }
  },
  {
    id: "hit_assassin",
    name: "希特 (Hit)",
    title: "第6宇宙無影殺手",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 7,
    cost: 17000,
    unlockCondition: "消耗 17,000 金幣招募",
    isFree: false,
    role: "刺客時間",
    weaponType: "none",
    canFly: true,
    baseHp: 1700,
    baseAtk: 240,
    baseDef: 80,
    speed: 8.8,
    themeColor: "#8b5cf6",
    auraColor: "rgba(139, 92, 246, 0.85)",
    attackConfig: {
      light: { name: "無影點穴拳", desc: "手插口袋零前搖刺拳" },
      heavy: { name: "寸勁震心", desc: "蓄力寸勁精準擊碎格擋" },
      grab: { name: "閃時鎖喉", desc: "暫停時間瞬移至背後重摔" },
      flight: { name: "無聲無息飛行", desc: "紫光包裹幽靈般懸浮飛行" }
    },
    skills: {
      skill1: { name: "閃時功 (Time Skip 0.5s)", cd: 5, damage: 480, type: "time_freeze", desc: "凍結時間 0.5 秒穿透至對手身後打擊！" },
      skill2: { name: "穿透波動拳", cd: 8, damage: 510, type: "invisible_shock", desc: "跨越空間障礙發射無視距離隱形氣勁。" },
      ult: { name: "時間牢獄·致命一刺", cd: 20, damage: 2050, type: "time_cage", desc: "將對手困於時間牢籠中，百拳齊發致命心臟穿透！" }
    }
  },

  // ==========================================
  // ── 2. 漫威宇宙 (Marvel Universe) ──
  // ==========================================
  {
    id: "cap_america",
    name: "美國隊長",
    title: "復仇者精神領袖",
    series: "marvel",
    seriesName: "漫威",
    rarity: 1,
    cost: 0,
    unlockCondition: "登入 Google 帳號自動贈送",
    isFree: true,
    role: "防禦反擊",
    weaponType: "shield",
    canFly: false,
    baseHp: 1150,
    baseAtk: 95,
    baseDef: 70,
    speed: 6.2,
    themeColor: "#3b82f6",
    auraColor: "rgba(59, 130, 246, 0.6)",
    attackConfig: {
      light: { name: "振金盾牌連擊", desc: "盾擊與直拳三段連打" },
      heavy: { name: "振金破防猛砸", desc: "雙手舉盾蓄力重砸破防" },
      grab: { name: "盾牌過肩摔", desc: "盾牌鎖住手臂過肩摔" },
      flight: { name: "陸戰推進", desc: "地面急速衝刺" }
    },
    skills: {
      skill1: { name: "振金盾牌投擲", cd: 3.5, damage: 170, type: "projectile_bounce", desc: "擲出圓盾折射反彈攻擊。" },
      skill2: { name: "舉盾前衝飛踢", cd: 6, damage: 210, type: "dash_tackle", desc: "頂盾霸體衝撞凌空飛踢。" },
      ult: { name: "自由正義之怒", cd: 20, damage: 680, type: "shield_barrage", desc: "盾牌極速連擊引發振金音波衝擊！" }
    }
  },
  {
    id: "spiderman_classic",
    name: "蜘蛛人 (彼得·帕克)",
    title: "友好鄰居守護者",
    series: "marvel",
    seriesName: "漫威",
    rarity: 2,
    cost: 900,
    unlockCondition: "消耗 900 金幣招募",
    isFree: false,
    role: "敏捷牽制",
    weaponType: "web_shooters",
    canFly: true,
    baseHp: 1100,
    baseAtk: 118,
    baseDef: 55,
    speed: 8.0,
    themeColor: "#ef4444",
    auraColor: "rgba(239, 68, 68, 0.6)",
    attackConfig: {
      light: { name: "雜技蛛拳", desc: "空中翻滾靈活四段打擊" },
      heavy: { name: "蛛絲流星錘", desc: "蛛絲拉扯重物破防" },
      grab: { name: "蛛網倒掛重摔", desc: "蛛絲黏住雙腳倒掛摔投" },
      flight: { name: "蛛絲擺盪 (Web Swing)", desc: "空中蛛絲飛蕩懸浮" }
    },
    skills: {
      skill1: { name: "蛛網束縛", cd: 4, damage: 190, type: "web_trap", desc: "射出高黏度蛛網定身對手 1.2 秒。" },
      skill2: { name: "蛛絲彈射飛踢", cd: 7, damage: 260, type: "web_slingshot", desc: "蛛絲蓄能彈射超高速雙腳飛踢。" },
      ult: { name: "全方位蛛網風暴", cd: 20, damage: 850, type: "web_cataclysm", desc: "全場編織巨大蛛網，狂暴拉扯連環重砸！" }
    }
  },
  {
    id: "ironman_mark85",
    name: "鋼鐵人 (Mark 85 奈米戰甲)",
    title: "終局之戰終極科技",
    series: "marvel",
    seriesName: "漫威",
    rarity: 7,
    cost: 15000,
    unlockCondition: "消耗 15,000 金幣招募",
    isFree: false,
    role: "全能軍火",
    weaponType: "nano_cannons",
    canFly: true,
    baseHp: 1800,
    baseAtk: 235,
    baseDef: 95,
    speed: 8.2,
    themeColor: "#e11d48",
    auraColor: "rgba(225, 29, 72, 0.9)",
    attackConfig: {
      light: { name: "掌心雷射連發", desc: "雙掌脈衝雷射四段轟擊" },
      heavy: { name: "奈米能量重錘", desc: "雙手化為奈米巨錘破防" },
      grab: { name: "推進器零距貫頂", desc: "掌心壓面零距離噴射" },
      flight: { name: "弧形反應堆超音速飛行", desc: "背部奈米翼與腳底光焰飛行" }
    },
    skills: {
      skill1: { name: "背部奈米浮游加農", cd: 5, damage: 520, type: "nano_lasers", desc: "背部展開 6 門能量光砲聚焦轟炸。" },
      skill2: { name: "奈米光刃旋風", cd: 7.5, damage: 480, type: "energy_blade_spin", desc: "雙手凝聚熾紅能量光刃旋轉切裂。" },
      ult: { name: "胸口單一光束極限過載 (Unibeam Overload)", cd: 20, damage: 2000, type: "chest_laser", desc: "全反應堆能量注入胸口，直徑 5 米巨型藍白光柱毀滅全場！" }
    }
  },
  {
    id: "thor_stormbreaker",
    name: "雷神索爾 (風暴破壞者 + 雷神之鎚)",
    title: "阿斯嘉九界天雷之神",
    series: "marvel",
    seriesName: "漫威",
    rarity: 8,
    cost: 21000,
    unlockCondition: "消耗 21,000 金幣招募",
    isFree: false,
    role: "神雷重擊",
    weaponType: "dual_axes_hammers",
    canFly: true,
    baseHp: 2200,
    baseAtk: 250,
    baseDef: 100,
    speed: 7.8,
    themeColor: "#38bdf8",
    auraColor: "rgba(56, 189, 248, 0.95)",
    attackConfig: {
      light: { name: "雙持雷神連擊", desc: "左手妙爾尼爾右手風暴破壞者四段斬擊" },
      heavy: { name: "神斧重劈破防", desc: "雷霆狂暴跳劈擊碎護甲" },
      grab: { name: "雷電重砸", desc: "單手舉起召喚天雷灌頂" },
      flight: { name: "旋風戰斧飛行", desc: "旋轉風暴戰斧呼嘯凌空" }
    },
    skills: {
      skill1: { name: "彩虹橋傳送召喚 (Bifrost)", cd: 6, damage: 580, type: "lightning_column", desc: "引導彩虹橋光柱轟擊地面並造成巨幅麻痺。" },
      skill2: { name: "神鎚召喚天雷風暴", cd: 8.5, damage: 540, type: "aoe_storm", desc: "雙手引雷全場狂暴閃電交織。" },
      ult: { name: "滅世風暴破壞斬 (Bring Me Thanos!)", cd: 20, damage: 2250, type: "stormbreaker_leap", desc: "騰空百米引動九界雷霆，神斧墜地碎滅一切！" }
    }
  },
  {
    id: "wolverine_logan",
    name: "金鋼狼 (羅根)",
    title: "不死鋼爪狂戰士",
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    cost: 9500,
    unlockCondition: "消耗 9,500 金幣招募",
    isFree: false,
    role: "嗜血撕裂",
    weaponType: "adamantium_claws",
    canFly: false,
    baseHp: 1950,
    baseAtk: 215,
    baseDef: 85,
    speed: 7.6,
    themeColor: "#eab308",
    auraColor: "rgba(234, 179, 8, 0.8)",
    attackConfig: {
      light: { name: "亞德曼爪舞", desc: "雙手合金鋼爪四段交叉撕裂" },
      heavy: { name: "旋風雙爪突刺", desc: "蓄力霸體旋風破防" },
      grab: { name: "鎖骨擒摔", desc: "鋼爪刺入鎖骨重摔" },
      flight: { name: "狂暴奔行", desc: "貼地疾速奔馳" }
    },
    skills: {
      skill1: { name: "野性狂撲", cd: 4.5, damage: 430, type: "claw_rush", desc: "向前飛撲雙爪將對手釘在地面。" },
      skill2: { name: "自癒因子活化", cd: 11, damage: 0, type: "instant_heal", desc: "瞬間回復 25% 最大生命並解除所有負面狀態。" },
      ult: { name: "狂戰士之怒 (Berserker Barrage)", cd: 20, damage: 1750, type: "claw_carnage", desc: "進入血紅狂化狀態，千百道鋼爪刀光將對手徹底切碎！" }
    }
  },
  {
    id: "deadpool_dual_sword",
    name: "死侍 (韋德·威爾森)",
    title: "打破第四面牆的嘴砲王",
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    cost: 10000,
    unlockCondition: "消耗 10,000 金幣招募",
    isFree: false,
    role: "武士刀雙槍",
    weaponType: "dual_katanas_guns",
    canFly: false,
    baseHp: 1900,
    baseAtk: 210,
    baseDef: 80,
    speed: 7.8,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.8)",
    attackConfig: {
      light: { name: "雙刀亂切", desc: "雙武士刀快速削斬" },
      heavy: { name: "雙烏茲掃射破防", desc: "雙槍近距離齊射擊破防禦" },
      grab: { name: "手榴彈塞褲襠", desc: "塞入手榴彈接倒栽蔥" },
      flight: { name: "瘋狂滑步", desc: "滑稽而極速的翻滾突進" }
    },
    skills: {
      skill1: { name: "雙槍芭蕾舞", cd: 5, damage: 450, type: "gun_dance", desc: "邊跳芭蕾邊全方位掃射子彈雨。" },
      skill2: { name: "自我修復吃玉米捲", cd: 9, damage: 100, type: "taco_heal", desc: "吃玉米捲回復 20% 生命值並發射火箭筒。" },
      ult: { name: "第四面牆血腥嘉年華", cd: 20, damage: 1800, type: "fourth_wall_chaos", desc: "拔出遊戲血條狂砸對手，雙刀雙槍瘋狂終結！" }
    }
  },
  {
    id: "scarlet_witch_chaos",
    name: "緋紅女巫 (汪達·馬克希莫夫)",
    title: "渾沌魔法至尊主宰",
    series: "marvel",
    seriesName: "漫威",
    rarity: 8,
    cost: 23000,
    unlockCondition: "消耗 23,000 金幣招募",
    isFree: false,
    role: "渾沌念力",
    weaponType: "chaos_magic",
    canFly: true,
    baseHp: 1850,
    baseAtk: 265,
    baseDef: 85,
    speed: 8.0,
    themeColor: "#b91c1c",
    auraColor: "rgba(185, 28, 28, 0.95)",
    attackConfig: {
      light: { name: "渾沌血印彈", desc: "深紅魔法球三段轟炸" },
      heavy: { name: "心靈念力重壓", desc: "深紅魔力下壓破防" },
      grab: { name: "心靈撕裂懸浮", desc: "念力隔空掐起對手折骨" },
      flight: { name: "渾沌魔力懸浮", desc: "深紅魔法氣場優雅凌空飛行" }
    },
    skills: {
      skill1: { name: "渾沌現實扭曲", cd: 5, damage: 620, type: "reality_warp", desc: "扭曲局部空間，造成無法防禦的深紅爆破。" },
      skill2: { name: "心靈控制反噬", cd: 8.5, damage: 560, type: "mind_crush", desc: "直接引爆對手心靈，造成眩暈並大幅減速。" },
      ult: { name: "No More Limits (渾沌湮滅牢籠)", cd: 20, damage: 2350, type: "chaos_cataclysm", desc: "深紅魔力籠罩整個維度，將目標分子級生生撕碎！" }
    }
  },
  {
    id: "doctor_strange_supreme",
    name: "奇異博士 (至尊法師)",
    title: "秘術大師掌控時間",
    series: "marvel",
    seriesName: "漫威",
    rarity: 7,
    cost: 16500,
    unlockCondition: "消耗 16,500 金幣招募",
    isFree: false,
    role: "秘術控場",
    weaponType: "magic_mandala",
    canFly: true,
    baseHp: 1750,
    baseAtk: 240,
    baseDef: 90,
    speed: 7.9,
    themeColor: "#f59e0b",
    auraColor: "rgba(245, 158, 11, 0.9)",
    attackConfig: {
      light: { name: "拉格加多爾之環", desc: "橙金魔法陣手刀三段削斬" },
      heavy: { name: "塞拉芬之盾突擊", desc: "巨大橙金魔盾向前破防重推" },
      grab: { name: "賽托拉克紅帶束縛", desc: "紅帶捆綁對手甩向高空" },
      flight: { name: "懸浮斗篷飛行 (Cloak of Levitation)", desc: "紅色斗篷凌空全向飛行" }
    },
    skills: {
      skill1: { name: "瓦圖姆魔風", cd: 5, damage: 510, type: "magic_whirlwind", desc: "召喚金黃秘術龍捲將對手吹飛至空中。" },
      skill2: { name: "伊孔之像千手分身", cd: 8, damage: 550, type: "clone_magic", desc: "分化出數十位法師分身齊射魔能法索。" },
      ult: { name: "鏡像維度碎裂封印 (Mirror Dimension)", cd: 20, damage: 1980, type: "mirror_shatter", desc: "將戰場拖入鏡像維度，折疊碎裂萬千玻璃鏡面重創！" }
    }
  },
  {
    id: "worldbreaker_hulk",
    name: "浩克 (世界破壞者 Worldbreaker)",
    title: "無限憤怒巨神",
    series: "marvel",
    seriesName: "漫威",
    rarity: 8,
    cost: 21500,
    unlockCondition: "消耗 21,500 金幣招募",
    isFree: false,
    role: "巨神肉盾",
    weaponType: "none",
    canFly: false,
    baseHp: 2600,
    baseAtk: 260,
    baseDef: 110,
    speed: 7.2,
    themeColor: "#16a34a",
    auraColor: "rgba(22, 163, 74, 0.95)",
    attackConfig: {
      light: { name: "浩克重拳", desc: "伽瑪巨拳四段重砸" },
      heavy: { name: "碎裂大陸拍擊", desc: "雙手合十拍擊引發劇烈震波破防" },
      grab: { name: "洛基式輪流猛砸", desc: "抓住雙腿在地面左右狂砸十次" },
      flight: { name: "超巨躍進 (Super Leap)", desc: "躍起數十米空中俯衝" }
    },
    skills: {
      skill1: { name: "伽瑪拍擊衝擊波 (Thunderclap)", cd: 5, damage: 590, type: "concussive_blast", desc: "雙手合掌打出扇形超音速伽瑪衝擊波。" },
      skill2: { name: "大地地殼掀翻", cd: 8.5, damage: 530, type: "earth_flip", desc: "掀起整塊擂台岩石砸向對手。" },
      ult: { name: "世界破壞者狂怒踐踏 (Worldbreaker Stomp)", cd: 20, damage: 2200, type: "continental_quake", desc: "全體內伽瑪射線爆發，一腳將整座大陸板塊踩成齏粉！" }
    }
  },
  {
    id: "venom_symbiote",
    name: "猛毒 (共生體暴虐之牙)",
    title: "致命守護者",
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    cost: 9800,
    unlockCondition: "消耗 9,800 金幣招募",
    isFree: false,
    role: "觸手撕咬",
    weaponType: "symbiote_tendrils",
    canFly: true,
    baseHp: 2000,
    baseAtk: 215,
    baseDef: 90,
    speed: 7.5,
    themeColor: "#0f172a",
    auraColor: "rgba(15, 23, 42, 0.9)",
    attackConfig: {
      light: { name: "共生爪擊", desc: "漆黑巨爪四段連咬" },
      heavy: { name: "觸手地刺破防", desc: "背部伸出六根利刃黑刺破防" },
      grab: { name: "巨口生吞撕咬", desc: "張開血盆大口撕咬重摔" },
      flight: { name: "共生體滑行", desc: "黑色觸手黏著彈射飛行" }
    },
    skills: {
      skill1: { name: "黑棘狂刺風暴", cd: 5, damage: 470, type: "black_spikes", desc: "全身體表伸出數百根黑色硬化長刺。" },
      skill2: { name: "共生體觸手捕食", cd: 8, damage: 490, type: "tendril_grab", desc: "遠程觸手將對手拽至面前狠狠狂啃。" },
      ult: { name: "「我們是猛毒」嗜血狂宴", cd: 20, damage: 1780, type: "symbiote_feast", desc: "巨大化漆黑共生體吞噬整座戰場，瘋狂狂暴撕碎！" }
    }
  },
  {
    id: "ghost_rider_hellfire",
    name: "惡靈戰警 (強尼·布雷茲)",
    title: "地獄之火復仇之靈",
    series: "marvel",
    seriesName: "漫威",
    rarity: 7,
    cost: 16000,
    unlockCondition: "消耗 16,000 金幣招募",
    isFree: false,
    role: "地獄火鎖鏈",
    weaponType: "hellfire_chain",
    canFly: true,
    baseHp: 1850,
    baseAtk: 240,
    baseDef: 90,
    speed: 7.9,
    themeColor: "#ea580c",
    auraColor: "rgba(234, 88, 12, 0.95)",
    attackConfig: {
      light: { name: "地獄火鎖鏈揮擊", desc: "燃燒火鏈四段鞭打" },
      heavy: { name: "火鏈巨斧重劈", desc: "火鏈化為烈焰巨刃破防" },
      grab: { name: "鎖鏈纏頸地獄拽摔", desc: "火鏈勒住頸部過肩甩砸" },
      flight: { name: "地獄火摩托飛行", desc: "烈焰重型機車踏空狂飆" }
    },
    skills: {
      skill1: { name: "地獄火柱噴發", cd: 5, damage: 520, type: "hellfire_pillar", desc: "腳下召喚沖天而起的硫磺地獄火。" },
      skill2: { name: "地獄鎖鏈旋風", cd: 8, damage: 510, type: "flame_chain_spin", desc: "高速揮舞鎖鏈形成旋轉烈焰防禦圈。" },
      ult: { name: "審判之眼 (Penance Stare)", cd: 20, damage: 2020, type: "soul_burn", desc: "直視靈魂罪孽，地獄之火焚盡肉體與靈魂萬劫不復！" }
    }
  },
  {
    id: "black_panther_vibranium",
    name: "黑豹 (帝查拉)",
    title: "瓦干達振金守護神",
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    cost: 9200,
    unlockCondition: "消耗 9,200 金幣招募",
    isFree: false,
    role: "動能反釋",
    weaponType: "vibranium_claws",
    canFly: false,
    baseHp: 1800,
    baseAtk: 215,
    baseDef: 95,
    speed: 8.3,
    themeColor: "#8b5cf6",
    auraColor: "rgba(139, 92, 246, 0.8)",
    attackConfig: {
      light: { name: "豹爪連擊", desc: "振金利爪四段疾速撕裂" },
      heavy: { name: "動能蓄力飛踢", desc: "紫光動能爆發破防飛踢" },
      grab: { name: "黑豹抱摔", desc: "靈巧翻身將對手摔入地面" },
      flight: { name: "瓦干達疾影", desc: "地面極速無聲潛行" }
    },
    skills: {
      skill1: { name: "振金飛鏢連擲", cd: 4, damage: 410, type: "vibranium_daggers", desc: "發射數枚穿甲振金能量飛鏢。" },
      skill2: { name: "動能吸收護甲", cd: 8, damage: 320, type: "kinetic_burst", desc: "吸收受到的傷害並轉化為紫色衝擊波震開四周。" },
      ult: { name: "瓦干達萬歲·黑豹之魂", cd: 20, damage: 1720, type: "panther_god_strike", desc: "召喚黑豹神巴斯特巨影，動能全開撕碎一切強敵！" }
    }
  },
  {
    id: "shang_chi_ten_rings",
    name: "尚氣 (十環傳奇)",
    title: "十環功夫大師",
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    cost: 9500,
    unlockCondition: "消耗 9,500 金幣招募",
    isFree: false,
    role: "十環氣功",
    weaponType: "ten_rings",
    canFly: true,
    baseHp: 1750,
    baseAtk: 220,
    baseDef: 85,
    speed: 8.1,
    themeColor: "#f59e0b",
    auraColor: "rgba(245, 158, 11, 0.85)",
    attackConfig: {
      light: { name: "十環拳法", desc: "金環環繞四段剛勁體術" },
      heavy: { name: "十環重槌", desc: "十環合一直線轟擊破防" },
      grab: { name: "十環鎖腕拋摔", desc: "十環套住四肢凌空重甩" },
      flight: { name: "十環踏步凌空", desc: "腳踏金色十環空中漫步" }
    },
    skills: {
      skill1: { name: "十環穿梭飛彈", cd: 4.5, damage: 460, type: "rings_projectile", desc: "十枚金環如流星雨般高速迴旋貫穿。" },
      skill2: { name: "大羅氣功旋風", cd: 7.5, damage: 490, type: "dragon_breath", desc: "引導神龍神息形成太極防禦風暴。" },
      ult: { name: "神龍降世·十環破滅拳", cd: 20, damage: 1760, type: "dragon_ten_rings", desc: "十環化為千米金色巨龍咆哮貫穿全場！" }
    }
  },

  // ==========================================
  // ── 3. 機動戰士鋼彈宇宙 (Gundam Universe) ──
  // ==========================================
  {
    id: "gm_rgm79",
    name: "吉姆 (RGM-79)",
    title: "聯邦主力量產機",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 1,
    cost: 0,
    unlockCondition: "登入 Google 帳號自動贈送",
    isFree: true,
    role: "射擊支援",
    weaponType: "beam_spray_gun",
    canFly: true,
    baseHp: 1050,
    baseAtk: 95,
    baseDef: 60,
    speed: 6.2,
    themeColor: "#06b6d4",
    auraColor: "rgba(6, 182, 212, 0.6)",
    attackConfig: {
      light: { name: "光束噴槍三連射", desc: "基礎光束三段射擊" },
      heavy: { name: "光束軍刀重劈", desc: "拔刀下劈破防" },
      grab: { name: "近身盾擊頂撞", desc: "舉盾頂開過肩摔" },
      flight: { name: "背包推進器升空", desc: "標準推進器懸浮飛行" }
    },
    skills: {
      skill1: { name: "光束噴槍散射", cd: 3.5, damage: 160, type: "spray_beam", desc: "近距離散射光束。" },
      skill2: { name: "頭部火神砲掃射", cd: 6, damage: 180, type: "vulcan_rapid", desc: "頭部 60mm 機砲高速壓制。" },
      ult: { name: "全武裝聯邦齊射", cd: 20, damage: 620, type: "barrage_missile", desc: "超視距火箭筒與光束齊射！" }
    }
  },
  {
    id: "rx78_2",
    name: "初代鋼彈 (RX-78-2)",
    title: "白色基地聯邦惡魔",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 4,
    cost: 3200,
    unlockCondition: "消耗 3,200 金幣招募",
    isFree: false,
    role: "光束近戰",
    weaponType: "beam_saber_rifle",
    canFly: true,
    baseHp: 1450,
    baseAtk: 160,
    baseDef: 75,
    speed: 7.0,
    themeColor: "#38bdf8",
    auraColor: "rgba(56, 189, 248, 0.7)",
    attackConfig: {
      light: { name: "光束步槍三連射", desc: "精準光束步槍射擊" },
      heavy: { name: "光束軍刀縱斬", desc: "雙手持軍刀下劈破防" },
      grab: { name: "超絕火箭筒近距離轟擊", desc: "零距離火箭筒轟擊重摔" },
      flight: { name: "高出力噴射飛行", desc: "雙背包全向推進" }
    },
    skills: {
      skill1: { name: "鋼彈流星錘 (Gundam Hammer)", cd: 5, damage: 360, type: "chain_flail", desc: "投擲帶刺超重鐵球擊飛對手。" },
      skill2: { name: "雙持光束軍刀突刺", cd: 7.5, damage: 380, type: "dual_saber_dash", desc: "拔出雙軍刀極速突進穿刺。" },
      ult: { name: "最後一擊 (Last Shooting)", cd: 20, damage: 1200, type: "vertical_beam", desc: "單臂擎天朝上方轟出摧毀要塞的貫通巨光！" }
    }
  },
  {
    id: "strike_freedom",
    name: "攻擊自由鋼彈 (ZGMF-X20A)",
    title: "超級龍騎兵天空之翼",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 23000,
    unlockCondition: "消耗 23,000 金幣招募",
    isFree: false,
    role: "全域光束",
    weaponType: "dragoons_dual_rifles",
    canFly: true,
    baseHp: 2000,
    baseAtk: 260,
    baseDef: 95,
    speed: 8.8,
    themeColor: "#facc15",
    auraColor: "rgba(250, 204, 21, 0.95)",
    attackConfig: {
      light: { name: "高能量光束雙槍連射", desc: "雙天狼座光束步槍四段速射" },
      heavy: { name: "天鏡光束劍破防", desc: "腰間雙刀合一雙頭刃橫掃破防" },
      grab: { name: "腹部超相軌道砲近轟", desc: "烈火相移砲零距離轟擊" },
      flight: { name: "光之翼全開 (Wings of Light)", desc: "黃金骨架光之翼超高速懸浮作戰" }
    },
    skills: {
      skill1: { name: "8枚超級龍騎兵全方位齊射", cd: 5.5, damage: 620, type: "dragoons_beam", desc: "展開 8 枚龍騎兵浮游砲 360 度鎖定交叉射擊！" },
      skill2: { name: "雙槍組合長射程步槍", cd: 8, damage: 560, type: "sniper_beam", desc: "雙槍前後組合轟出超貫通金色光束。" },
      ult: { name: "全彈發射·全領域鎖定 (Full Burst Mode)", cd: 20, damage: 2280, type: "multi_lock_burst", desc: "龍騎兵、腰砲、雙槍、腹砲全功率齊射，星河毀滅巨響！" }
    }
  },
  {
    id: "nu_gundam_fin_funnel",
    name: "Nu 鋼彈 (阿姆羅·雷)",
    title: "阿克西斯精神感應奇蹟",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 22500,
    unlockCondition: "消耗 22,500 金幣招募",
    isFree: false,
    role: "感應浮游砲",
    weaponType: "fin_funnels",
    canFly: true,
    baseHp: 2050,
    baseAtk: 255,
    baseDef: 100,
    speed: 8.4,
    themeColor: "#38bdf8",
    auraColor: "rgba(56, 189, 248, 0.95)",
    attackConfig: {
      light: { name: "專用光束步槍射擊", desc: "四段高出力光束連打" },
      heavy: { name: "定製光束軍刀重劈", desc: "背部弧形光束軍刀破防" },
      grab: { name: "新人類精神重拳", desc: "連擊後將對手砸入擂台" },
      flight: { name: "精神感應推進", desc: "翼狀感應砲流光懸浮飛行" }
    },
    skills: {
      skill1: { name: "翼狀感應砲 (Fin Funnel)", cd: 5, damage: 600, type: "funnel_lasers", desc: "6 枚翼狀感應砲飛出全角度追擊射擊。" },
      skill2: { name: "金字塔感應防禦力場", cd: 9, damage: 200, type: "pyramid_barrier", desc: "展開無敵金字塔光之壁，抵擋一切遠程攻擊 4 秒。" },
      ult: { name: "新人類奇蹟·阿克西斯衝擊", cd: 20, damage: 2200, type: "psychoframe_miracle", desc: "精神感應骨架爆發翠綠神光，創造超越物理法則的奇蹟光芒！" }
    }
  },
  {
    id: "sazabi_char",
    name: "沙薩比 (夏亞·阿茲納布爾)",
    title: "新吉翁總帥紅色彗星",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 22500,
    unlockCondition: "消耗 22,500 金幣招募",
    isFree: false,
    role: "重型浮游",
    weaponType: "funnels_beam_axe",
    canFly: true,
    baseHp: 2200,
    baseAtk: 255,
    baseDef: 100,
    speed: 8.3,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.95)",
    attackConfig: {
      light: { name: "光束散彈步槍射擊", desc: "大威力光束散彈四段連射" },
      heavy: { name: "大型光束戰斧重劈", desc: "翠綠大型戰斧蓄力破防" },
      grab: { name: "腹部米加粒子砲零距離轟殺", desc: "抓住胸口零距大砲轟飛" },
      flight: { name: "三倍速推進飛行", desc: "紅色巨軀三倍速狂暴突進" }
    },
    skills: {
      skill1: { name: "6門圓錐浮游砲 (Funnels)", cd: 5, damage: 590, type: "funnels_barrage", desc: "背部 6 門浮游砲彈出全方位轟炸。" },
      skill2: { name: "腹部大型米加粒子砲", cd: 8, damage: 560, type: "mega_particle", desc: "腹部發射直徑 3 米深紅粒子巨束。" },
      ult: { name: "總帥之肅清·紅色彗星審判", cd: 20, damage: 2220, type: "char_judgment", desc: "浮游砲與巨型光束戰斧全力齊射，徹底肅清重力束縛之魂！" }
    }
  },
  {
    id: "barbatos_lupus_rex",
    name: "天狼王型獵魔鋼彈 (ASW-G-08)",
    title: "鐵華團惡魔之王",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 21500,
    unlockCondition: "消耗 21,500 金幣招募",
    isFree: false,
    role: "野獸狂戰",
    weaponType: "giant_mace_tail",
    canFly: true,
    baseHp: 2300,
    baseAtk: 260,
    baseDef: 95,
    speed: 8.5,
    themeColor: "#475569",
    auraColor: "rgba(239, 68, 68, 0.9)",
    attackConfig: {
      light: { name: "超硬質金屬利爪連擊", desc: "野獸巨爪狂暴撕裂四段" },
      heavy: { name: "超大型錘矛重砸", desc: "萬噸重錘粉碎一切防禦" },
      grab: { name: "尾刃貫穿重摔", desc: "尾部刃狀纜線刺穿甩地" },
      flight: { name: "阿賴耶識極限飛行", desc: "血紅眼芒與狂暴姿態獵殺" }
    },
    skills: {
      skill1: { name: "尾部刃狀電纜穿刺 (Tail Blade)", cd: 4.5, damage: 560, type: "tail_pierce", desc: "背後尾刃如毒蛇般超高速穿透對手心臟。" },
      skill2: { name: "超大型錘矛瘋狂連砸", cd: 8, damage: 580, type: "mace_smash", desc: "揮舞超重巨錘連續砸擊大地碎石飛濺。" },
      ult: { name: "阿賴耶識限制解除 (Alaya-Vijnana Unleashed)", cd: 20, damage: 2260, type: "rex_carnage", desc: "雙眼爆發赤紅光焰，巨爪狂撕錘矛暴砸，極致暴力美學！" }
    }
  },
  {
    id: "wing_zero_ew",
    name: "飛翼零式 EW (天使羽翼)",
    title: "白色天使純白之翼",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 23500,
    unlockCondition: "消耗 23,500 金幣招募",
    isFree: false,
    role: "雙管光束",
    weaponType: "twin_buster_rifle",
    canFly: true,
    baseHp: 1950,
    baseAtk: 265,
    baseDef: 90,
    speed: 8.7,
    themeColor: "#38bdf8",
    auraColor: "rgba(56, 189, 248, 0.95)",
    attackConfig: {
      light: { name: "光束步槍雙槍射擊", desc: "天使四羽展開四段光束射擊" },
      heavy: { name: "光束軍刀雙重迴旋斬", desc: "翠綠軍刀蓄力破防" },
      grab: { name: "羽翼包裹近距離旋轉射擊", desc: "羽翼護體零距離雙槍轟碎" },
      flight: { name: "天使四翼飛行", desc: "掉落純白羽毛優雅全向翱翔" }
    },
    skills: {
      skill1: { name: "旋轉破壞步槍 (Rolling Buster)", cd: 5.5, damage: 620, type: "360_laser", desc: "雙手持槍 360 度旋轉橫掃全場。" },
      skill2: { name: "ZERO 系統預判衝刺", cd: 8.5, damage: 490, type: "zero_dodge", desc: "預判一切彈道，0.8 秒無敵高速突刺。" },
      ult: { name: "雙管破壞步槍最大出力 (Twin Buster Max Output)", cd: 20, damage: 2320, type: "twin_buster_cannon", desc: "雙槍合一，黃金粒子巨洪貫穿宇宙殖民地！" }
    }
  },
  {
    id: "gundam_exia",
    name: "能天使鋼彈 (剎那·F·塞耶)",
    title: "我就是鋼彈！近身格鬥專家",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 7,
    cost: 16000,
    unlockCondition: "消耗 16,000 金幣招募",
    isFree: false,
    role: "七劍狂斬",
    weaponType: "gn_sword",
    canFly: true,
    baseHp: 1800,
    baseAtk: 240,
    baseDef: 85,
    speed: 8.6,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.9)",
    attackConfig: {
      light: { name: "GN 實體劍連斬", desc: "GN 巨劍四段實體削砍" },
      heavy: { name: "GN 突刺破防", desc: "劍刃展開極速突刺破防" },
      grab: { name: "GN 光束軍刀鎖投", desc: "雙刀刺入倒摔對手" },
      flight: { name: "GN 粒子噴射飛行", desc: "散發翠綠 GN 粒子高速飛行" }
    },
    skills: {
      skill1: { name: "GN 投刃飛刀", cd: 4.5, damage: 480, type: "gn_blades", desc: "投擲左右兩柄 GN 實體長短刀。" },
      skill2: { name: "GN 劍步突進", cd: 7.5, damage: 520, type: "gn_dash", desc: "翠綠流光瞬移突進，挑飛對手。" },
      ult: { name: "Trans-AM 系統極限開啟", cd: 20, damage: 2050, type: "trans_am_combo", desc: "機體全身赤紅三倍速爆發，七劍狂舞終結！" }
    }
  },
  {
    id: "god_gundam",
    name: "神威鋼彈 (多蒙·卡修)",
    title: "殖民星格鬥大賽霸主",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 22000,
    unlockCondition: "消耗 22,000 金幣招募",
    isFree: false,
    role: "熱血格鬥",
    weaponType: "none",
    canFly: true,
    baseHp: 2100,
    baseAtk: 255,
    baseDef: 95,
    speed: 8.5,
    themeColor: "#ef4444",
    auraColor: "rgba(239, 68, 68, 0.95)",
    attackConfig: {
      light: { name: "流派東方不敗拳法", desc: "剛猛烈火四段打擊" },
      heavy: { name: "爆熱重踏破防", desc: "氣焰爆發一腳破防" },
      grab: { name: "熱血背摔", desc: "抓起對手烈焰灌地" },
      flight: { name: "超高級霸王飛行", desc: "背部日輪光環展開飛行" }
    },
    skills: {
      skill1: { name: "超級霸王電影彈", cd: 5, damage: 590, type: "tornado_bullet", desc: "化身旋轉烈焰鑽頭貫穿戰場。" },
      skill2: { name: "爆熱神威掌 (God Finger)", cd: 8, damage: 620, type: "god_finger", desc: "「這隻手在閃耀著金光！」單手抓碎對手面部！" },
      ult: { name: "石破天驚拳 (Sekiha Tenkyoken)", cd: 20, damage: 2250, type: "giant_ki_punch", desc: "凝聚終極陰陽烈焰，巨大的紅心之王氣功巨掌覆滅天地！" }
    }
  },

  // ==========================================
  // ── 4. 熱血動漫宇宙 (Legendary Anime) ──
  // ==========================================
  {
    id: "naruto_sage_mode",
    name: "漩渦鳴人 (九尾仙人模式)",
    title: "木葉第七代火影",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 7,
    cost: 16500,
    unlockCondition: "消耗 16,500 金幣招募",
    isFree: false,
    role: "螺旋影分身",
    weaponType: "kunai",
    canFly: true,
    baseHp: 1900,
    baseAtk: 235,
    baseDef: 90,
    speed: 8.3,
    themeColor: "#f97316",
    auraColor: "rgba(249, 115, 22, 0.9)",
    attackConfig: {
      light: { name: "影分身體術連打", desc: "多位分身四段連環飛踢" },
      heavy: { name: "大玉螺旋丸重砸", desc: "巨型螺旋丸蓄力破防" },
      grab: { name: "蛙組手過肩摔", desc: "自然能量仙人重摔" },
      flight: { name: "九尾查克拉懸浮", desc: "金色九尾查克拉衣飛行" }
    },
    skills: {
      skill1: { name: "風遁·螺旋手裏劍", cd: 5.5, damage: 570, type: "wind_shuriken", desc: "投擲狂暴旋轉的風遁巨輪，引發微觀級風暴撕裂！" },
      skill2: { name: "多重影分身突擊", cd: 8, damage: 520, type: "shadow_clones", desc: "召喚 8 名分身全方位圍毆壓制。" },
      ult: { name: "尾獸玉·六道螺旋丸", cd: 20, damage: 2100, type: "tailed_beast_bomb", desc: "巨大黑金九尾真身咆哮，尾獸玉滅世大爆炸！" }
    }
  },
  {
    id: "sasuke_rinnegan",
    name: "宇智波佐助 (六道輪迴眼)",
    title: "復仇與救贖的宇智波末裔",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 7,
    cost: 17000,
    unlockCondition: "消耗 17,000 金幣招募",
    isFree: false,
    role: "雷遁劍聖",
    weaponType: "kusanagi_sword",
    canFly: true,
    baseHp: 1850,
    baseAtk: 245,
    baseDef: 85,
    speed: 8.7,
    themeColor: "#6366f1",
    auraColor: "rgba(99, 102, 241, 0.9)",
    attackConfig: {
      light: { name: "草薙劍千鳥刃", desc: "雷光附魔四段斬擊" },
      heavy: { name: "天手力居合斬", desc: "輪迴眼置換空間破防" },
      grab: { name: "寫輪眼幻術摔投", desc: "幻術定身重摔" },
      flight: { name: "須佐能乎之翼飛行", desc: "紫色骷髏神翼全速翱翔" }
    },
    skills: {
      skill1: { name: "千鳥 (Chidori)", cd: 4.5, damage: 550, type: "lightning_dash", desc: "雷切瞬身直刺，雷鳴千鳥撕碎一切。" },
      skill2: { name: "天照 (Amaterasu)", cd: 8, damage: 540, type: "black_flame", desc: "永不熄滅的黑炎直接在對手身上燃燒。" },
      ult: { name: "因陀羅之矢 (Indra's Arrow)", cd: 20, damage: 2150, type: "susanoo_arrow", desc: "完全體須佐能乎拉滿雷神之弓，毀天滅地神箭！" }
    }
  },
  {
    id: "luffy_gear5",
    name: "魯夫 (五檔·太陽神尼卡)",
    title: "解放的戰鼓·自由之神",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 8,
    cost: 23000,
    unlockCondition: "消耗 23,000 金幣招募",
    isFree: false,
    role: "橡膠卡通",
    weaponType: "none",
    canFly: true,
    baseHp: 2200,
    baseAtk: 260,
    baseDef: 95,
    speed: 8.5,
    themeColor: "#f8fafc",
    auraColor: "rgba(248, 250, 252, 0.95)",
    attackConfig: {
      light: { name: "尼卡歡樂連打", desc: "橡膠手臂大笑四段打擊" },
      heavy: { name: "卡通巨大重踩", desc: "巨大化腳掌踏碎地面破防" },
      grab: { name: "抓起地面跳繩", desc: "把對手當跳繩甩動重砸" },
      flight: { name: "白雲踏空飛行", desc: "渾身純白雲朵空中奔跑" }
    },
    skills: {
      skill1: { name: "橡膠巨人 (Gigant)", cd: 5, damage: 600, type: "giant_body", desc: "化身百米泰坦巨神，大腳踩踏全場。" },
      skill2: { name: "抓取雷電 (Lightning Grab)", cd: 8, damage: 560, type: "grab_lightning", desc: "直接從天空抓下真雷當標槍投擲！" },
      ult: { name: "霸王色·猿神槍 (Bajrang Gun)", cd: 20, damage: 2300, type: "island_sized_fist", desc: "島嶼般巨大的霸王色巨拳，將島嶼連同對手轟入地底！" }
    }
  },
  {
    id: "zoro_three_swords",
    name: "羅羅亞·索隆 (閻魔九刀流)",
    title: "世界第一大劍豪的野心",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 7,
    cost: 16500,
    unlockCondition: "消耗 16,500 金幣招募",
    isFree: false,
    role: "三刀流劍豪",
    weaponType: "three_swords",
    canFly: false,
    baseHp: 1950,
    baseAtk: 245,
    baseDef: 90,
    speed: 7.9,
    themeColor: "#16a34a",
    auraColor: "rgba(22, 163, 74, 0.9)",
    attackConfig: {
      light: { name: "三刀流百八煩惱鳳", desc: "三刀齊舞四段風壓劍氣" },
      heavy: { name: "鬼斬破防", desc: "交錯衝刺三刀破防" },
      grab: { name: "龍捲風拋摔", desc: "三刀旋風將對手捲入高空" },
      flight: { name: "劍氣踏步", desc: "凌空踏斬" }
    },
    skills: {
      skill1: { name: "千八十煩惱鳳", cd: 5, damage: 550, type: "giant_flying_slash", desc: "三把名刀揮出切裂山峰的巨大飛翔斬擊。" },
      skill2: { name: "黑繩·大龍捲", cd: 8, damage: 530, type: "sword_tornado", desc: "霸王色纏繞黑色龍捲風持續吞噬對手。" },
      ult: { name: "九刀流·阿修羅·拔劍·死·亡者之戲", cd: 20, damage: 2150, type: "ashura_nine_swords", desc: "鬼氣九刀化身，霸王色霸氣纏繞一刀定生死！" }
    }
  },
  {
    id: "ichigo_bankai",
    name: "黑崎一護 (天鎖斬月·虛化)",
    title: "代理死神超越者",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 7,
    cost: 17000,
    unlockCondition: "消耗 17,000 金幣招募",
    isFree: false,
    role: "死神斬月",
    weaponType: "tensa_zangetsu",
    canFly: true,
    baseHp: 1850,
    baseAtk: 250,
    baseDef: 85,
    speed: 8.8,
    themeColor: "#0f172a",
    auraColor: "rgba(220, 38, 38, 0.9)",
    attackConfig: {
      light: { name: "天鎖斬月速斬", desc: "黑紅刀光四段極速削砍" },
      heavy: { name: "黑月牙重劈", desc: "黑紅氣浪下劈破防" },
      grab: { name: "虛化鎖頸貫摔", desc: "虛化巨爪掐住摔地" },
      flight: { name: "瞬步飛行", desc: "黑紅靈壓全速瞬步" }
    },
    skills: {
      skill1: { name: "月牙天衝 (Getsuga Tensho)", cd: 4.5, damage: 560, type: "crescent_slash", desc: "揮出十米長漆黑月牙刀芒。" },
      skill2: { name: "月牙十字衝", cd: 8, damage: 540, type: "cross_getsuga", desc: "雙刀交錯轟出巨型十字黑紅衝擊。" },
      ult: { name: "最後的月牙天衝·無月 (Mugetsu)", cd: 20, damage: 2200, type: "mugetsu_abyss", desc: "化身黑髮漆黑死神，一刀劃出寂滅天地的無盡黑幕！" }
    }
  },
  {
    id: "saitama_opm",
    name: "埼玉 (一拳超人)",
    title: "興趣使然的英雄",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 9,
    cost: 30000,
    unlockCondition: "天梯達到 3000 獎盃或完成無傷 100 連勝",
    isFree: false,
    isNonPurchasable: true,
    role: "一擊必殺",
    weaponType: "none",
    canFly: false,
    baseHp: 3000,
    baseAtk: 350,
    baseDef: 150,
    speed: 9.0,
    themeColor: "#facc15",
    auraColor: "rgba(250, 204, 21, 1.0)",
    attackConfig: {
      light: { name: "普通連續拳", desc: "漫不經心殘影百拳" },
      heavy: { name: "普通重拳", desc: "拳風碎地破防" },
      grab: { name: "單手提起扔飛", desc: "抓起對手扔出地球" },
      flight: { name: "認真反覆橫跳", desc: "地面超高速跳躍" }
    },
    skills: {
      skill1: { name: "連續普通拳", cd: 4, damage: 800, type: "normal_punches", desc: "無數殘影拳風打擊。" },
      skill2: { name: "認真掀桌", cd: 7, damage: 900, type: "serious_table_flip", desc: "雙手將整塊地殼掀翻至宇宙大氣層。" },
      ult: { name: "認真系列·認真一拳 (Serious Punch)", cd: 20, damage: 3500, type: "serious_punch", desc: "揮出認真一拳，拳風劈開半個地球與大氣層！" }
    }
  },
  {
    id: "gojo_satoru",
    name: "五條悟 (現代最強咒術師)",
    title: "天上天下唯我獨尊",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 8,
    cost: 25000,
    unlockCondition: "消耗 25,000 金幣招募",
    isFree: false,
    role: "無下限術式",
    weaponType: "none",
    canFly: true,
    baseHp: 2100,
    baseAtk: 270,
    baseDef: 120,
    speed: 8.6,
    themeColor: "#38bdf8",
    auraColor: "rgba(56, 189, 248, 0.95)",
    attackConfig: {
      light: { name: "無下限體術", desc: "優雅手插口袋四段重擊" },
      heavy: { name: "術式順轉「蒼」引力破防", desc: "引力吸附蓄力重拳破防" },
      grab: { name: "空間置換摔投", desc: "瞬間置換空間重摔" },
      flight: { name: "無下限凌空漫步", desc: "空中無視重力行走" }
    },
    skills: {
      skill1: { name: "術式反轉「赫」 (Red)", cd: 5, damage: 640, type: "red_repulsion", desc: "指尖發射血紅排斥爆轟。" },
      skill2: { name: "術式順轉「蒼」 (Blue)", cd: 8, damage: 600, type: "blue_attraction", desc: "製造超強黑洞引力球碾碎目標。" },
      ult: { name: "虛式「茈」 (Hollow Purple)", cd: 20, damage: 2400, type: "hollow_purple", desc: "「蒼」與「赫」碰撞融合，抹殺路徑上一切質量的神罰紫光！" }
    }
  },
  {
    id: "sukuna_king",
    name: "兩面宿儺 (詛咒之王)",
    title: "天上天下唯我獨尊之魔",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 8,
    cost: 25000,
    unlockCondition: "消耗 25,000 金幣招募",
    isFree: false,
    role: "無形斬擊",
    weaponType: "none",
    canFly: true,
    baseHp: 2200,
    baseAtk: 275,
    baseDef: 100,
    speed: 8.5,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.95)",
    attackConfig: {
      light: { name: "無形「解」連斬", desc: "手指劃出四道無形風刃" },
      heavy: { name: "「捌」接觸斬破防", desc: "手掌接觸瞬間依防禦力調整破防斬" },
      grab: { name: "單手掐頸貫穿", desc: "直接掐住脖頸震碎" },
      flight: { name: "咒力凌空飛行", desc: "暗紅咒力纏身狂暴飛行" }
    },
    skills: {
      skill1: { name: "蜘蛛之絲·解 (Cleave Web)", cd: 5, damage: 630, type: "web_slashes", desc: "全場地面密布無形斬擊網絡切碎目標。" },
      skill2: { name: "神火「開」 (Furnace)", cd: 8.5, damage: 680, type: "fire_arrow", desc: "拉開火焰神弓，轟出核爆級火之矢！" },
      ult: { name: "領域展開·伏魔御廚子 (Malevolent Shrine)", cd: 20, damage: 2450, type: "domain_shrine", desc: "召喚魔殿，半徑 200 米範圍內無休止狂風暴雨斬擊成灰！" }
    }
  },
  {
    id: "tanjiro_sun_breathing",
    name: "竈門炭治郎 (日之呼吸·火之神神樂)",
    title: "日之呼吸繼承者",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 6,
    cost: 9500,
    unlockCondition: "消耗 9,500 金幣招募",
    isFree: false,
    role: "日輪刀斬",
    weaponType: "nichirin_sword",
    canFly: false,
    baseHp: 1800,
    baseAtk: 220,
    baseDef: 85,
    speed: 8.0,
    themeColor: "#ef4444",
    auraColor: "rgba(239, 68, 68, 0.85)",
    attackConfig: {
      light: { name: "水之呼吸·水面斬擊", desc: "水流日輪刀三段斬" },
      heavy: { name: "火之神神樂·圓舞破防", desc: "赤紅烈焰大車輪重斬破防" },
      grab: { name: "鐵頭功重擊", desc: "究極鐵頭撞暈對手摔投" },
      flight: { name: "全集中·常中奔馳", desc: "極速日輪步法" }
    },
    skills: {
      skill1: { name: "火之神神樂·碧羅天", cd: 4.5, damage: 490, type: "sun_circle", desc: "劃出渾圓日輪烈焰護體斬擊。" },
      skill2: { name: "火之神神樂·烈日紅鏡", cd: 7.5, damage: 510, type: "twin_sun_blades", desc: "左右兩道烈焰深紅斬擊交叉突進。" },
      ult: { name: "日之呼吸·第十三型連環舞", cd: 20, damage: 1800, type: "sun_breathing_13th", desc: "十二種劍型如太陽般生生不息連環狂斬，斬滅鬼王！" }
    }
  },
  {
    id: "levi_ackerman",
    name: "里維·阿卡曼",
    title: "人類最強士兵 (巨人天災)",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 6,
    cost: 9800,
    unlockCondition: "消耗 9,800 金幣招募",
    isFree: false,
    role: "雙刀高速",
    weaponType: "dual_odm_blades",
    canFly: true,
    baseHp: 1700,
    baseAtk: 235,
    baseDef: 75,
    speed: 9.2,
    themeColor: "#10b981",
    auraColor: "rgba(16, 185, 129, 0.85)",
    attackConfig: {
      light: { name: "雙超硬質刃極速連切", desc: "四段超高速刀刃削斬" },
      heavy: { name: "陀螺旋風斬破防", desc: "高速旋轉成刀輪破防" },
      grab: { name: "錨鉤射擊踢擊", desc: "錨鉤刺入飛踢摔投" },
      flight: { name: "立體機動裝置高速飛行 (ODM Gear)", desc: "瓦斯噴射立體空中狂飆" }
    },
    skills: {
      skill1: { name: "雷槍爆破 (Thunder Spear)", cd: 5, damage: 520, type: "thunder_spear", desc: "發射雷槍穿透裝甲引發劇烈爆炸。" },
      skill2: { name: "阿卡曼極限螺旋切", cd: 7, damage: 540, type: "odm_spin", desc: "空中如陀螺般極速旋轉削肉千刀。" },
      ult: { name: "人類最強的一擊·削肉風暴", cd: 20, damage: 1880, type: "levi_storm", desc: "化身綠色死神流光，在目標周身斬出上千道殘影血光！" }
    }
  },

  // ==========================================
  // ── 5. 3D 經典遊戲傳奇宇宙 (Gaming Legends) ──
  // ==========================================
  {
    id: "cloud_strife",
    name: "克勞德·史特萊夫 (Cloud Strife)",
    title: "神羅 1st 級神劍使",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 7,
    cost: 16800,
    unlockCondition: "消耗 16,800 金幣招募",
    isFree: false,
    role: "大劍霸體",
    weaponType: "buster_sword",
    canFly: false,
    baseHp: 1950,
    baseAtk: 245,
    baseDef: 90,
    speed: 7.8,
    themeColor: "#38bdf8",
    auraColor: "rgba(56, 189, 248, 0.9)",
    attackConfig: {
      light: { name: "破壞劍四段連斬", desc: "雙手巨劍剛猛削斬" },
      heavy: { name: "勇猛模式破防重劈", desc: "蓄力雙重大劍下砸破防" },
      grab: { name: "劍柄頂擊挑空", desc: "重劍挑飛空中重摔" },
      flight: { name: "魔晶石狂奔", desc: "地面魔晄流光突進" }
    },
    skills: {
      skill1: { name: "凶斬 (Cross-Slash)", cd: 5, damage: 560, type: "kanji_slash", desc: "巨劍在空中劃出赤紅「凶」字三連斬！" },
      skill2: { name: "破晄擊 (Blade Beam)", cd: 8, damage: 510, type: "magic_wave", desc: "揮劍甩出貼地奔馳的蒼藍魔晄劍氣浪。" },
      ult: { name: "超究武神霸斬 (Omnislash)", cd: 20, damage: 2200, type: "omnislash", desc: "化身千道金光殘影，十五段極速武神連斬一擊必殺！" }
    }
  },
  {
    id: "sephiroth_angel",
    name: "賽菲羅斯 (片翼天使)",
    title: "神羅傳說最強戰士",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 8,
    cost: 24500,
    unlockCondition: "消耗 24,500 金幣招募",
    isFree: false,
    role: "長刀劍神",
    weaponType: "masamune_sword",
    canFly: true,
    baseHp: 2050,
    baseAtk: 270,
    baseDef: 95,
    speed: 8.7,
    themeColor: "#94a3b8",
    auraColor: "rgba(148, 163, 184, 0.95)",
    attackConfig: {
      light: { name: "正宗長刀居合", desc: "2.5 米長刀神速四段斬" },
      heavy: { name: "獄門刺擊破防", desc: "凌空倒持正宗長刀下刺破防" },
      grab: { name: "黑翼暗黑擒摔", desc: "單手鎖喉黑翼重振" },
      flight: { name: "片翼翱翔 (One-Winged Angel)", desc: "單邊黑色巨大翅膀優雅飛行" }
    },
    skills: {
      skill1: { name: "八刀一閃 (Octaslash)", cd: 5.5, damage: 640, type: "eight_slashes", desc: "瞬身向前揮出八道撕裂空間的銀白刀芒！" },
      skill2: { name: "暗黑絕望黑球 (Shadow Flare)", cd: 8.5, damage: 580, type: "shadow_orbs", desc: "召喚四枚黑色暗物質火球自動追蹤引爆。" },
      ult: { name: "超新星殞落 (Supernova)", cd: 20, damage: 2400, type: "supernova_cataclysm", desc: "召喚宇宙超新星隕石撞穿太陽系，引發終極宇宙毀滅！" }
    }
  },
  {
    id: "dante_dmc",
    name: "但丁 (Dante·惡魔獵人)",
    title: "傳奇魔劍士斯巴達之子",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 7,
    cost: 17500,
    unlockCondition: "消耗 17,500 金幣招募",
    isFree: false,
    role: "風格切換",
    weaponType: "rebellion_sword_guns",
    canFly: true,
    baseHp: 1900,
    baseAtk: 245,
    baseDef: 90,
    speed: 8.4,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.9)",
    attackConfig: {
      light: { name: "叛逆之劍連斬", desc: "大劍與黑白雙槍四段流暢切換" },
      heavy: { name: "百萬刺擊破防 (Million Stab)", desc: "大劍極速狂刺破防" },
      grab: { name: "槍手風格倒掛射擊", desc: "踩在對手身上滑行雙槍連射" },
      flight: { name: "真魔人魔翼飛行 (Sin Devil Trigger)", desc: "魔人黑紅雙翼凌空霸氣飛行" }
    },
    skills: {
      skill1: { name: "挑空迴旋斬 (High Time & Stinger)", cd: 4.5, damage: 530, type: "stinger_dash", desc: "化身赤紅刺針突刺挑空對手。" },
      skill2: { name: "黑檀木與白象牙瘋狂掃射", cd: 7.5, damage: 510, type: "ebony_ivory_rain", desc: "雙槍狂暴連射打出 SSS 級評價雨。" },
      ult: { name: "真魔人次元審判 (Sin Devil Judgment)", cd: 20, damage: 2180, type: "sin_devil_cataclysm", desc: "化身終極魔人，雙手合劍撕裂全屏次元魔界風暴！" }
    }
  },
  {
    id: "vergil_dmc",
    name: "維吉爾 (Vergil·魔劍士)",
    title: "尋求極致力量之神",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 8,
    cost: 23500,
    unlockCondition: "消耗 23,500 金幣招募",
    isFree: false,
    role: "閻魔刀神速",
    weaponType: "yamato_katana",
    canFly: true,
    baseHp: 1950,
    baseAtk: 265,
    baseDef: 90,
    speed: 8.9,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.95)",
    attackConfig: {
      light: { name: "閻魔刀居合疾斬", desc: "瞬息拔刀四段藍色刀光" },
      heavy: { name: "疾走居合破防", desc: "超光速穿身拔刀破防" },
      grab: { name: "幻影劍刺擊摔投", desc: "幻影劍釘住對手反身摔投" },
      flight: { name: "瞬移踏步 (Trick Dodge)", desc: "藍色幻影空間瞬移" }
    },
    skills: {
      skill1: { name: "次元斬 (Judgement Cut)", cd: 4, damage: 580, type: "spatial_slice", desc: "拔刀瞬間在遠處引發球形次元空間粉碎。" },
      skill2: { name: "圓陣幻影劍 (Spiral Swords)", cd: 7.5, damage: 550, type: "sword_shield", desc: "召喚 8 柄藍光幻影劍環繞周身攻防一體。" },
      ult: { name: "次元斬·絕 (Judgement Cut End)", cd: 20, damage: 2350, type: "world_slice_end", desc: "「I need more power!」緩慢收刀，全螢幕時空徹底碎裂！" }
    }
  },
  {
    id: "kratos_god_of_war",
    name: "克雷多斯 (Kratos·戰神)",
    title: "奧林帕斯與九界屠神者",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 8,
    cost: 24000,
    unlockCondition: "消耗 24,000 金幣招募",
    isFree: false,
    role: "屠神狂戰",
    weaponType: "blades_of_chaos_axe",
    canFly: false,
    baseHp: 2350,
    baseAtk: 270,
    baseDef: 105,
    speed: 7.7,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.95)",
    attackConfig: {
      light: { name: "渾沌雙刃烈焰舞", desc: "鎖鏈雙刃狂暴烈焰四段揮擊" },
      heavy: { name: "利維坦之斧重劈破防", desc: "極寒冰斧蓄力重劈碎裂防禦" },
      grab: { name: "戰神殘暴撕扯", desc: "手撕神明般按地瘋狂連砸" },
      flight: { name: "斯巴達狂奔", desc: "赤紅怒焰霸體衝刺" }
    },
    skills: {
      skill1: { name: "利維坦之斧冰霜投擲", cd: 4.5, damage: 590, type: "frost_axe_throw", desc: "擲出冰霜戰斧凍結目標，隨後心念召回二度重傷！" },
      skill2: { name: "渾沌旋風旋轉撕裂", cd: 8, damage: 610, type: "chaos_blades_spin", desc: "雙刃鎖鏈旋轉成 360 度烈焰絞肉風暴。" },
      ult: { name: "斯巴達之怒·諸神黃昏滅絕 (Spartan Rage)", cd: 20, damage: 2380, type: "spartan_rage", desc: "血紅怒火沖天，雙手赤拳生撕山嶽，屠盡神明！" }
    }
  },
  {
    id: "master_chief",
    name: "士官長 (Master Chief 117)",
    title: "斯巴達二期傳奇英雄",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 7,
    cost: 16500,
    unlockCondition: "消耗 16,500 金幣招募",
    isFree: false,
    role: "光劍射擊",
    weaponType: "energy_sword_rifle",
    canFly: true,
    baseHp: 2000,
    baseAtk: 235,
    baseDef: 100,
    speed: 7.9,
    themeColor: "#15803d",
    auraColor: "rgba(21, 128, 61, 0.85)",
    attackConfig: {
      light: { name: "MA40 突擊步槍射擊", desc: "精準點射四段光束" },
      heavy: { name: "星盟能量光劍重斬", desc: "雙刃藍光劍蓄力破防" },
      grab: { name: "斯巴達近身背摔", desc: "裝甲擒拿重摔" },
      flight: { name: "推進噴射背包", desc: "斯巴達推進器空中懸浮" }
    },
    skills: {
      skill1: { name: "星盟能量光劍突刺", cd: 4.5, damage: 540, type: "energy_sword_dash", desc: "能量劍藍芒一閃穿透護盾。" },
      skill2: { name: "M41 雙管火箭筒齊射", cd: 8, damage: 560, type: "rocket_launcher", desc: "兩枚重型火箭彈覆蓋轟炸。" },
      ult: { name: "軌道空降軌道加農炮 (Orbital Strike)", cd: 20, damage: 2050, type: "orbital_cannon", desc: "引導 UNSC 戰艦軌道 MAC 電磁巨炮轟平戰場！" }
    }
  },
  {
    id: "doom_slayer",
    name: "毀滅戰士 (DOOM Slayer)",
    title: "地獄惡魔之永恆夢魘",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 8,
    cost: 23000,
    unlockCondition: "消耗 23,000 金幣招募",
    isFree: false,
    role: "屠魔重裝",
    weaponType: "crucible_shotgun",
    canFly: false,
    baseHp: 2250,
    baseAtk: 265,
    baseDef: 105,
    speed: 8.0,
    themeColor: "#166534",
    auraColor: "rgba(22, 101, 52, 0.95)",
    attackConfig: {
      light: { name: "超級霰彈槍雙發", desc: "近距離狂暴噴射" },
      heavy: { name: "阿古斯光劍 (Crucible) 斬", desc: "熾紅光劍下劈破防" },
      grab: { name: "壯烈殺戮 (Glory Kill)", desc: "殘暴手撕惡魔摔投" },
      flight: { name: "雙重衝刺", desc: "地面超高速噴射突進" }
    },
    skills: {
      skill1: { name: "肉鉤霰彈槍飛索", cd: 4.5, damage: 570, type: "meathook_shotgun", desc: "肉鉤拉近對手貼臉雙管重噴！" },
      skill2: { name: "BFG 9000 綠色能量球", cd: 9, damage: 680, type: "bfg_ball", desc: "發射巨大綠色阿爾法能量球釋放閃電觸手。" },
      ult: { name: "熾紅神劍·滅絕裁決 (The Crucible Sever)", cd: 20, damage: 2300, type: "crucible_judgment", desc: "手持熾紅阿古斯巨刃，將魔王與維度一刀兩斷！" }
    }
  },
  {
    id: "link_hero",
    name: "林克 (薩爾達傳說·曠野之勇者)",
    title: "退魔之劍傳說勇者",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 7,
    cost: 16000,
    unlockCondition: "消耗 16,000 金幣招募",
    isFree: false,
    role: "大師劍技",
    weaponType: "master_sword_shield",
    canFly: true,
    baseHp: 1850,
    baseAtk: 240,
    baseDef: 90,
    speed: 8.2,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.85)",
    attackConfig: {
      light: { name: "大師之劍四段連斬", desc: "聖光藍刃流暢四段斬" },
      heavy: { name: "迴旋斬破防 (Spin Attack)", desc: "蓄力 360 度聖光旋風破防" },
      grab: { name: "海利亞盾反摔投", desc: "精準盾反擊暈對手摔投" },
      flight: { name: "滑翔傘懸浮 (Paraglider)", desc: "利用上升氣流空中滑翔" }
    },
    skills: {
      skill1: { name: "林克時間·極限精準閃避", cd: 5, damage: 520, type: "flurry_rush", desc: "完美閃避觸發林克時間，連續七刀狂斬！" },
      skill2: { name: "古代兵裝神弓五連射", cd: 7.5, damage: 500, type: "ancient_arrows", desc: "躍入空中射出五發古代爆破箭。" },
      ult: { name: "封印神力·真·大師之劍破魔斬", cd: 20, damage: 2050, type: "master_sword_beam", desc: "大師之劍金色聖光直衝天際，徹底驅散一切災厄！" }
    }
  },

  // ==========================================
  // ── 6. 創世/概念級神級挑戰 (Genesis Tier) ──
  // ==========================================
  {
    id: "thanos_gauntlet",
    name: "滅霸 (無限手套完全體)",
    title: "宇宙秩序終結者",
    series: "marvel",
    seriesName: "漫威",
    rarity: 9,
    cost: 99999,
    unlockCondition: "達成成就【天梯大師段位 (2000 獎盃)】解鎖",
    isFree: false,
    isNonPurchasable: true,
    role: "無限寶石",
    weaponType: "infinity_gauntlet",
    canFly: true,
    baseHp: 2800,
    baseAtk: 320,
    baseDef: 140,
    speed: 8.0,
    themeColor: "#a855f7",
    auraColor: "rgba(168, 85, 247, 1.0)",
    attackConfig: {
      light: { name: "力量寶石紫光拳", desc: "六寶石流光重拳連打" },
      heavy: { name: "空間撕裂破防", desc: "引力扭曲蓄力破防" },
      grab: { name: "現實扭曲重摔", desc: "將對手變為泡泡摔碎" },
      flight: { name: "空間寶石懸浮", desc: "空間傳送門空中漫步" }
    },
    skills: {
      skill1: { name: "力量寶石碎星重轟", cd: 5, damage: 750, type: "power_stone_beam", desc: "紫光爆發撕碎一切防禦護盾。" },
      skill2: { name: "時間倒轉與空間囚籠", cd: 8, damage: 700, type: "time_space_cage", desc: "暫停時間並鎖定對手。" },
      ult: { name: "★ 宇宙天命·毀滅響指 (The Snap)", cd: 20, damage: 3200, type: "infinity_snap", desc: "金光閃耀清脆響指，直接抹除全場 50% 最大生命與萬千星河！" }
    }
  },
  {
    id: "goku_ultra_instinct",
    name: "孫悟空 (自在極意功·真)",
    title: "神之領域純粹極致",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 9,
    cost: 99999,
    unlockCondition: "達成成就【天梯 150 勝登頂傳奇宗師】解鎖",
    isFree: false,
    isNonPurchasable: true,
    role: "神之閃避",
    weaponType: "none",
    canFly: true,
    baseHp: 2700,
    baseAtk: 330,
    baseDef: 130,
    speed: 9.5,
    themeColor: "#e2e8f0",
    auraColor: "rgba(226, 232, 240, 1.0)",
    attackConfig: {
      light: { name: "神之體術自動反擊", desc: "肉體本能超光速四段重擊" },
      heavy: { name: "自在極意碎天拳", desc: "銀白神光直拳破防" },
      grab: { name: "本能閃避過肩摔", desc: "避開攻擊順勢重摔" },
      flight: { name: "神之銀輝飛行", desc: "銀白神熱氣焰超光速飛行" }
    },
    skills: {
      skill1: { name: "本能絕對閃避 (Auto-Evade)", cd: 6, damage: 680, type: "auto_dodge", desc: "2 秒內 100% 閃避所有近戰與飛行道具！" },
      skill2: { name: "神之氣功波連環爆", cd: 8, damage: 720, type: "god_kame_barrage", desc: "銀白神光四面八方轟擊。" },
      ult: { name: "★ 神之領域·銀白神龍龜派氣功", cd: 20, damage: 3300, type: "ultra_instinct_kame", desc: "凝聚神之極意銀白神芒，貫穿多元宇宙一切維度！" }
    }
  },
  {
    id: "unicorn_perfectibility",
    name: "全武裝獨角獸 (光之結晶神化型態)",
    title: "扭轉時空因果之奇蹟",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 9,
    cost: 99999,
    unlockCondition: "達成成就【單人先鋒 1 穿 5 完封大滿貫】解鎖",
    isFree: false,
    isNonPurchasable: true,
    role: "因果律奇蹟",
    weaponType: "psycho_crystals",
    canFly: true,
    baseHp: 2900,
    baseAtk: 315,
    baseDef: 145,
    speed: 9.0,
    themeColor: "#22c55e",
    auraColor: "rgba(34, 197, 94, 1.0)",
    attackConfig: {
      light: { name: "結晶神手揮擊", desc: "綠色感應結晶四段重斬" },
      heavy: { name: "感應力場破防", desc: "揮動綠色結晶大翅破防" },
      grab: { name: "時間倒轉拘束", desc: "分解目標武器並重摔" },
      flight: { name: "光之結晶光翼翱翔", desc: "綠色神之結晶光之羽翼" }
    },
    skills: {
      skill1: { name: "精神感應力場·武器分解波", cd: 5, damage: 700, type: "psycho_disarm", desc: "揮手釋放綠色衝擊波，使目標 2 秒內無法攻擊！" },
      skill2: { name: "全武裝 DE 浮游護盾衝撞", cd: 8, damage: 740, type: "de_shield_ram", desc: "兩枚光之結晶護盾超音速撞穿敵陣。" },
      ult: { name: "★ 暖光之奇蹟·時空倒轉 (Miracle of Warm Light)", cd: 20, damage: 3250, type: "time_reversal_beam", desc: "結晶巨翅伸展，翠綠暖光籠罩戰場，倒轉時間抹除一切攻擊！" }
    }
  },
  {
    id: "jiren_full_power",
    name: "吉連 (灰色吉連·燃魂全開)",
    title: "絕對力量超越破壞神",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 9,
    cost: 99999,
    unlockCondition: "達成成就【通關 3D 魔王塔第 10 層】解鎖",
    isFree: false,
    isNonPurchasable: true,
    role: "絕對力量",
    weaponType: "none",
    canFly: true,
    baseHp: 3100,
    baseAtk: 340,
    baseDef: 150,
    speed: 8.8,
    themeColor: "#ef4444",
    auraColor: "rgba(239, 68, 68, 1.0)",
    attackConfig: {
      light: { name: "目力神速拳", desc: "單靠眼神與拳風轟出四段打擊" },
      heavy: { name: "熱炎霸體重拳破防", desc: "熾紅神焰覆蓋直拳破防" },
      grab: { name: "單掌壓制拋摔", desc: "單掌抓住對手頭顱爆摔" },
      flight: { name: "熾炎神威飛行", desc: "紅熱氣焰撕裂空氣飛行" }
    },
    skills: {
      skill1: { name: "能量磁場護體 (Power Wall)", cd: 5, damage: 720, type: "fiery_barrier", desc: "爆發紅熱氣場反彈一切攻擊。" },
      skill2: { name: "目力氣勁連發 (Glance Cannon)", cd: 7.5, damage: 760, type: "gaze_cannons", desc: "雙目閃耀紅芒，瞬發無數道破壞力場。" },
      ult: { name: "★ 絕對力量·巨炎滅絕熱彈", cd: 20, damage: 3400, type: "heat_magnetron", desc: "單手托起太陽般巨大的紅熱核心，無情砸碎一切反抗者！" }
    }
  },
  {
    id: "beerus_god_of_destruction",
    name: "比魯斯 (第7宇宙破壞神)",
    title: "星宿毀滅至高神明",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 9,
    cost: 99999,
    unlockCondition: "達成成就【全角色平均等級達到 Lv.50】解鎖",
    isFree: false,
    isNonPurchasable: true,
    role: "破壞神力",
    weaponType: "none",
    canFly: true,
    baseHp: 2850,
    baseAtk: 335,
    baseDef: 135,
    speed: 9.0,
    themeColor: "#8b5cf6",
    auraColor: "rgba(139, 92, 246, 1.0)",
    attackConfig: {
      light: { name: "破壞神指戳", desc: "單指輕點四段穿透打擊" },
      heavy: { name: "神之哈欠破防", desc: "打哈欠引發紫色震波破防" },
      grab: { name: "尾巴戲耍重摔", desc: "尾巴甩動砸向地面" },
      flight: { name: "破壞神漫步", desc: "紫色神光空中優雅懸浮" }
    },
    skills: {
      skill1: { name: "毀滅之球 (Sphere of Destruction)", cd: 5, damage: 740, type: "sun_sphere", desc: "指尖召喚微型太陽重轟目標。" },
      skill2: { name: "破壞神掌力場", cd: 8, damage: 710, type: "hakai_palm", desc: "掌心爆發純粹破壞神力。" },
      ult: { name: "★ 真·破壞 (HAKAI)", cd: 20, damage: 3350, type: "hakai_obliterate", desc: "「破壞。」單手輕念，對手瞬間化為紫金粒子徹底消散！" }
    }
  },
  // ── 7. 七龍珠經典補全 ──
  {
    id: "vegeta_blue",
    name: "達爾 (超級賽亞人藍)",
    title: "超越神境界的純粹孤傲",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 7,
    cost: 15500,
    unlockCondition: "消耗 15,500 金幣招募",
    isFree: false,
    role: "神速突擊",
    weaponType: "none",
    canFly: true,
    baseHp: 1850,
    baseAtk: 240,
    baseDef: 90,
    speed: 8.3,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.9)",
    attackConfig: {
      light: { name: "神之重拳", desc: "藍焰四段神速連拳" },
      heavy: { name: "伽瑪爆發重擊", desc: "藍光爆裂破防" },
      grab: { name: "傲氣鎖頸摔", desc: "單手鎖喉爆發藍光" },
      flight: { name: "神藍舞空術", desc: "湛藍神氣高速飛行" }
    },
    skills: {
      skill1: { name: "伽瑪爆發閃光", cd: 5, damage: 540, type: "blue_burst", desc: "雙手向前爆發巨型藍色衝擊波。" },
      skill2: { name: "神之連續氣彈", cd: 7.5, damage: 500, type: "blue_bullets", desc: "狂射二十發湛藍能量彈。" },
      ult: { name: "最終閃光·真藍極限", cd: 20, damage: 2100, type: "final_flash_blue", desc: "湛藍神焰沖天，撕裂天幕的終極閃光！" }
    }
  },
  {
    id: "gotenks_ssj3",
    name: "悟天克斯 (超級賽亞人3)",
    title: "正義死神搞怪合體",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 6,
    cost: 9500,
    unlockCondition: "消耗 9,500 金幣招募",
    isFree: false,
    role: "幽靈轟炸",
    weaponType: "none",
    canFly: true,
    baseHp: 1750,
    baseAtk: 225,
    baseDef: 80,
    speed: 8.4,
    themeColor: "#facc15",
    auraColor: "rgba(250, 204, 21, 0.9)",
    attackConfig: {
      light: { name: "搞怪連打", desc: "花式搞怪四段拳" },
      heavy: { name: "超級排球重扣破防", desc: "將對手當排球打擊破防" },
      grab: { name: "金黃甜甜圈捆摔", desc: "甜甜圈束縛重摔" },
      flight: { name: "金髮舞空術", desc: "超長金髮懸浮飛行" }
    },
    skills: {
      skill1: { name: "超級幽靈神風拳 (Kamikaze Attack)", cd: 5.5, damage: 530, type: "ghost_bombs", desc: "召喚 4 隻會自爆的可愛幽靈衝向對手！" },
      skill2: { name: "連續連環甜甜圈", cd: 8, damage: 480, type: "donut_trap", desc: "金色能量圈禁錮並引發擠壓爆破。" },
      ult: { name: "激突狂爆排球大絕招", cd: 20, damage: 1850, type: "volleyball_smash", desc: "把對手搓成排球，狂暴扣殺砸入地心！" }
    }
  },
  {
    id: "cell_perfect",
    name: "賽魯 (完全體)",
    title: "終極完美生物",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 6,
    cost: 9800,
    unlockCondition: "消耗 9,800 金幣招募",
    isFree: false,
    role: "全武技複製",
    weaponType: "none",
    canFly: true,
    baseHp: 1850,
    baseAtk: 220,
    baseDef: 90,
    speed: 8.0,
    themeColor: "#16a34a",
    auraColor: "rgba(22, 163, 74, 0.85)",
    attackConfig: {
      light: { name: "完美體術", desc: "融合眾家武學四段連擊" },
      heavy: { name: "完美重拳破防", desc: "金黃氣焰直拳破防" },
      grab: { name: "吸收尾刺甩摔", desc: "尾針刺擊過肩重摔" },
      flight: { name: "昆蟲翼膜飛行", desc: "背部甲翅超速飛行" }
    },
    skills: {
      skill1: { name: "完美射線 (Perfect Beam)", cd: 4.5, damage: 490, type: "death_beam", desc: "指尖瞬發金黃毀滅死光。" },
      skill2: { name: "小賽魯召喚群擊", cd: 8.5, damage: 520, type: "cell_jr_swarm", desc: "生出兩隻小賽魯發動左右夾擊。" },
      ult: { name: "太陽系消滅龜派氣功", cd: 20, damage: 1900, type: "solar_kamehameha", desc: "金色電弧環繞，足以毀滅太陽系的巨型龜派氣功！" }
    }
  },
  {
    id: "kid_buu",
    name: "魔人普烏 (純粹惡)",
    title: "無秩序太古破壞神",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 7,
    cost: 16000,
    unlockCondition: "消耗 16,000 金幣招募",
    isFree: false,
    role: "橡膠怪胎",
    weaponType: "none",
    canFly: true,
    baseHp: 2100,
    baseAtk: 240,
    baseDef: 95,
    speed: 8.6,
    themeColor: "#f472b6",
    auraColor: "rgba(244, 114, 182, 0.9)",
    attackConfig: {
      light: { name: "怪異肉體狂打", desc: "手臂伸長怪笑四段拳" },
      heavy: { name: "頭部觸角伸縮重抽破防", desc: "頭頂觸鬚橫掃破防" },
      grab: { name: "肉團包裹吞噬", desc: "化身粉紅史萊姆包裹摔砸" },
      flight: { name: "怪異翻滾飛行", desc: "粉紅魔光懸空狂奔" }
    },
    skills: {
      skill1: { name: "變形光線 (Candy Beam)", cd: 5, damage: 510, type: "candy_ray", desc: "頭部觸角發射光線將對手變成巧克力咬碎！" },
      skill2: { name: "狂暴捶胸衝擊波", cd: 8, damage: 530, type: "shout_wave", desc: "捶胸狂嚎引發全屏粉紅衝擊波。" },
      ult: { name: "星球毀滅滅絕彈 (Vanishing Ball)", cd: 20, damage: 2050, type: "planet_vanish", desc: "單手托起巨大深粉色滅世火球，直接蒸發星球！" }
    }
  },
  {
    id: "android_17_super",
    name: "人造人17號 (力量大會MVP)",
    title: "無限能源荒野守護者",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 7,
    cost: 15500,
    unlockCondition: "消耗 15,500 金幣招募",
    isFree: false,
    role: "綠色防護罩",
    weaponType: "none",
    canFly: true,
    baseHp: 1900,
    baseAtk: 235,
    baseDef: 105,
    speed: 8.5,
    themeColor: "#10b981",
    auraColor: "rgba(16, 185, 129, 0.9)",
    attackConfig: {
      light: { name: "無休止連擊", desc: "無限體力疾風四段打擊" },
      heavy: { name: "防護罩衝撞破防", desc: "頂著綠色圓形護盾撞飛破防" },
      grab: { name: "單臂鎖扣爆摔", desc: "近身鎖喉灌地" },
      flight: { name: "無限能源飛行", desc: "翠綠氣場極速懸浮" }
    },
    skills: {
      skill1: { name: "人造人能量防護罩 (Android Barrier)", cd: 5, damage: 450, type: "barrier_slam", desc: "展開無敵綠色球形護盾反彈一切衝擊。" },
      skill2: { name: "閃光衝擊射線", cd: 7.5, damage: 510, type: "green_beam", desc: "雙手向前激射高密度綠光粒子束。" },
      ult: { name: "自爆佯攻·極限超電磁爆轟", cd: 20, damage: 2000, type: "mvp_explosion", desc: "護盾全開極速突進，在零距離引發無限能源超核爆！" }
    }
  },
  {
    id: "bardock",
    name: "巴達克 (孤傲的抵抗者)",
    title: "孫悟空之父·戰士之魂",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 6,
    cost: 9200,
    unlockCondition: "消耗 9,200 金幣招募",
    isFree: false,
    role: "熱血野蠻",
    weaponType: "none",
    canFly: true,
    baseHp: 1850,
    baseAtk: 225,
    baseDef: 85,
    speed: 7.9,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.85)",
    attackConfig: {
      light: { name: "血性重拳", desc: "染血頭巾四段剛猛直拳" },
      heavy: { name: "狂怒肘擊破防", desc: "霸體肘擊破防" },
      grab: { name: "過肩霸摔", desc: "野蠻將對手砸入碎石" },
      flight: { name: "赤紅舞空術", desc: "赤焰飛空" }
    },
    skills: {
      skill1: { name: "最終烈焰彈 (Final Spirit Cannon)", cd: 4.5, damage: 510, type: "spirit_cannon", desc: "單手凝聚深藍熾烈能量巨球。" },
      skill2: { name: "暴動突刺", cd: 7.5, damage: 490, type: "rebellion_dash", desc: "帶有霸體的瘋狂直線突進重拳。" },
      ult: { name: "改變未來的最後一擊", cd: 20, damage: 1820, type: "future_cannon", desc: "傾注全賽亞人命運與不甘，轟穿帝王宇宙船！" }
    }
  },

  // ── 8. 漫威英雄與反派補全 ──
  {
    id: "magneto_master",
    name: "萬磁王 (埃里克·蘭謝爾)",
    title: "變種人磁力主宰",
    series: "marvel",
    seriesName: "漫威",
    rarity: 7,
    cost: 16800,
    unlockCondition: "消耗 16,800 金幣招募",
    isFree: false,
    role: "金屬風暴",
    weaponType: "magnetic_metal",
    canFly: true,
    baseHp: 1800,
    baseAtk: 245,
    baseDef: 95,
    speed: 8.0,
    themeColor: "#9333ea",
    auraColor: "rgba(147, 51, 234, 0.9)",
    attackConfig: {
      light: { name: "金屬碎片四連射", desc: "引導磁力金屬尖刺射擊" },
      heavy: { name: "巨大鐵塊砸擊破防", desc: "磁力巨石下壓破防" },
      grab: { name: "磁力隔空倒吊摔", desc: "磁力操控血液鐵質摔投" },
      flight: { name: "磁場懸浮 (Magnetic Flight)", desc: "紫紅磁力光罩全向懸空" }
    },
    skills: {
      skill1: { name: "電磁脈衝爆破 (EMP Shock)", cd: 5, damage: 540, type: "emp_blast", desc: "全屏引爆電磁波，消除一切護盾並麻痺。" },
      skill2: { name: "磁力壓縮金屬球", cd: 8, damage: 560, type: "metal_sphere_crush", desc: "將周圍金屬吸附為巨大球體碾壓對手。" },
      ult: { name: "地球磁極反轉·金屬風暴天災", cd: 20, damage: 2150, type: "magnetic_tempest", desc: "引導地核磁力，萬噸金屬海嘯自天際狂嘯墜落！" }
    }
  },
  {
    id: "loki_scepter",
    name: "洛基 (惡作劇之神)",
    title: "阿斯嘉九界幻術詭王",
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    cost: 9600,
    unlockCondition: "消耗 9,600 金幣招募",
    isFree: false,
    role: "幻影背刺",
    weaponType: "scepter_daggers",
    canFly: true,
    baseHp: 1750,
    baseAtk: 220,
    baseDef: 80,
    speed: 8.2,
    themeColor: "#16a34a",
    auraColor: "rgba(22, 163, 74, 0.85)",
    attackConfig: {
      light: { name: "雙匕首刺擊", desc: "翡翠匕首四段削割" },
      heavy: { name: "心靈權杖光束破防", desc: "藍寶石光束直線破防" },
      grab: { name: "分身背摔", desc: "幻影出現在背後刺擊摔投" },
      flight: { name: "綠光幻術懸浮", desc: "綠色魔能空中漫步" }
    },
    skills: {
      skill1: { name: "幻影分身替身", cd: 4.5, damage: 460, type: "illusion_dodge", desc: "留下分身吸引火力，真身瞬移至對手背後背刺！" },
      skill2: { name: "心靈權杖精神射線", cd: 7.5, damage: 490, type: "mind_laser", desc: "射出心靈控制能量射線造成混亂。" },
      ult: { name: "惡作劇之神·千影匕首狂宴", cd: 20, damage: 1850, type: "loki_illusions", desc: "全場召喚數十個洛基幻影，同時投擲毒匕首狂舞終結！" }
    }
  },
  {
    id: "miles_morales",
    name: "邁爾斯·摩拉斯 (蜘蛛人·新宇宙)",
    title: "生化毒刺電流英雄",
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    cost: 9800,
    unlockCondition: "消耗 9,800 金幣招募",
    isFree: false,
    role: "毒刺電流",
    weaponType: "venom_blast",
    canFly: true,
    baseHp: 1750,
    baseAtk: 230,
    baseDef: 80,
    speed: 8.7,
    themeColor: "#facc15",
    auraColor: "rgba(250, 204, 21, 0.9)",
    attackConfig: {
      light: { name: "塗鴉風格蛛拳", desc: "黃金電火花四段連打" },
      heavy: { name: "生化毒刺重拳破防", desc: "雙手爆發金黃電弧破防" },
      grab: { name: "隱身蛛絲摔砸", desc: "隱身狀態下蛛絲拉扯摔投" },
      flight: { name: "新宇宙蛛絲擺盪", desc: "空中極限塗鴉擺盪" }
    },
    skills: {
      skill1: { name: "生化毒刺衝擊 (Venom Strike)", cd: 4.5, damage: 510, type: "bio_electric_punch", desc: "掌心爆發金黃電流擊飛對手並麻痺 1.5 秒。" },
      skill2: { name: "光學迷彩隱形 (Camouflage)", cd: 8, damage: 420, type: "invisibility_dash", desc: "進入 3 秒完全隱身狀態並提升 40% 爆擊率。" },
      ult: { name: "百萬伏特生化毒刺大核爆 (Mega Venom Blast)", cd: 20, damage: 1900, type: "electric_nova", desc: "體內儲蓄的所有生物電狂暴釋放，全場金黃雷霆海嘯！" }
    }
  },
  {
    id: "captain_marvel_binary",
    name: "驚奇隊長 (卡蘿·丹佛斯)",
    title: "雙星形態宇宙巡航者",
    series: "marvel",
    seriesName: "漫威",
    rarity: 8,
    cost: 22000,
    unlockCondition: "消耗 22,000 金幣招募",
    isFree: false,
    role: "雙星光子",
    weaponType: "none",
    canFly: true,
    baseHp: 2150,
    baseAtk: 260,
    baseDef: 100,
    speed: 9.0,
    themeColor: "#f59e0b",
    auraColor: "rgba(245, 158, 11, 0.95)",
    attackConfig: {
      light: { name: "光子重拳連打", desc: "金色宇宙能量四段光速打擊" },
      heavy: { name: "雙星衝撞破防", desc: "全身體表金焰爆發破防" },
      grab: { name: "宇宙擒摔", desc: "抓起對手凌空穿透雲層摔砸" },
      flight: { name: "雙星光速超音速飛行", desc: "金紅能量流光極速翱翔" }
    },
    skills: {
      skill1: { name: "光子能量連環射線", cd: 5, damage: 580, type: "photon_lasers", desc: "雙掌連續轟出高熱光子加農砲。" },
      skill2: { name: "能量吸收全充能", cd: 8.5, damage: 520, type: "energy_absorb", desc: "吸收周圍攻擊轉化為全身護盾與怒氣。" },
      ult: { name: "超新星雙星貫日衝擊 (Binary Supernova)", cd: 20, damage: 2250, type: "binary_ram", desc: "化身金色人形彗星，以光速貫穿整座星際艦隊與戰場！" }
    }
  },

  // ── 9. 鋼彈宇宙傳奇神機補全 ──
  {
    id: "oo_qant",
    name: "00 Qan[T] 量子型 00",
    title: "引導人類變革之先驅",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 24000,
    unlockCondition: "消耗 24,000 金幣招募",
    isFree: false,
    role: "量子瞬移",
    weaponType: "gn_sword_bits",
    canFly: true,
    baseHp: 2050,
    baseAtk: 265,
    baseDef: 95,
    speed: 9.1,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.95)",
    attackConfig: {
      light: { name: "GN 巨劍 V 連斬", desc: "翠綠 GN 刃四段極速削砍" },
      heavy: { name: "GN 劍型感應刃破防", desc: "6 枚浮游刃組合破防" },
      grab: { name: "量子置換重摔", desc: "量子化穿透對手背後重摔" },
      flight: { name: "純種變革者量子飛行", desc: "雙爐同步翠綠 GN 粒子光翼" }
    },
    skills: {
      skill1: { name: "6枚 GN 劍型感應砲 (Sword Bits)", cd: 5, damage: 620, type: "sword_bits_rush", desc: "6 枚劍刃圍繞對手形成切割劍陣。" },
      skill2: { name: "量子化瞬間移動 (Quantum Teleport)", cd: 7.5, damage: 560, type: "quantum_warp", desc: "機體粒子化消失，瞬移至對手身後發動巨劍重劈！" },
      ult: { name: "GN 破壞巨劍·量子爆發全開 (Quantum Burst Max)", cd: 20, damage: 2350, type: "quantum_buster_sword", desc: "組合直徑百米長光之巨劍，一刀切開 ELS 巨型母星！" }
    }
  },
  {
    id: "banshee_norn",
    name: "報喪女妖·命運女神 (RX-0 Norn)",
    title: "黑色金鬃狂怒獅王",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 22800,
    unlockCondition: "消耗 22,800 金幣招募",
    isFree: false,
    role: "黃金獅鬃",
    weaponType: "armed_armor_de_xc",
    canFly: true,
    baseHp: 2150,
    baseAtk: 260,
    baseDef: 100,
    speed: 8.6,
    themeColor: "#f59e0b",
    auraColor: "rgba(245, 158, 11, 0.95)",
    attackConfig: {
      light: { name: "光束麥格農連射", desc: "重型光束麥格農四段轟擊" },
      heavy: { name: "武裝裝甲 DE 突刺破防", desc: "金色巨盾前端光束劍破防" },
      grab: { name: "武裝裝甲 VN 震動爪捕食", desc: "超振動金屬爪捏碎摔投" },
      flight: { name: "金色獅鬃推進飛行", desc: "背部武裝裝甲 XC 展開金翼" }
    },
    skills: {
      skill1: { name: "迴旋轉輪發射器 (Revolving Launcher)", cd: 5, damage: 590, type: "launcher_burst", desc: "步槍下掛榴彈與感應彈連續齊射。" },
      skill2: { name: "武裝裝甲 DE 浮游盾衝撞", cd: 8, damage: 580, type: "shield_ram_gold", desc: "巨大金色盾牌以音速撞擊對手。" },
      ult: { name: "NT-D 破壞者模式·黑色金獅咆哮", cd: 20, damage: 2260, type: "banshee_roar", desc: "精神感應骨架爆發刺目金芒，狂暴爪擊與重砲將敵機徹底撕裂！" }
    }
  },
  {
    id: "master_gundam",
    name: "天王鋼彈 (東方不敗·亞洲尊者)",
    title: "流派東方不敗王者之風",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 23000,
    unlockCondition: "消耗 23,000 金幣招募",
    isFree: false,
    role: "暗黑宗師",
    weaponType: "none",
    canFly: true,
    baseHp: 2200,
    baseAtk: 265,
    baseDef: 100,
    speed: 8.7,
    themeColor: "#9333ea",
    auraColor: "rgba(147, 51, 234, 0.95)",
    attackConfig: {
      light: { name: "十二王方牌連擊", desc: "紫色暗黑拳氣四段重打" },
      heavy: { name: "暗黑碎地破防", desc: "一腳踏碎擂台破防" },
      grab: { name: "尊者長巾纏繞重摔", desc: "金色腰帶纏繞甩飛" },
      flight: { name: "尊者披風飛行", desc: "背部黑色斗篷展開翼膜飛行" }
    },
    skills: {
      skill1: { name: "十二王方牌大車輪", cd: 5, damage: 610, type: "shadow_clones_gundam", desc: "召喚數十個小型尊者分身全方位轟擊。" },
      skill2: { name: "暗黑掌 (Darkness Finger)", cd: 8, damage: 640, type: "darkness_finger", desc: "深紫暗黑氣功掌，吸取生命並重創對手！" },
      ult: { name: "石破天驚拳·暗黑宗師極限版", cd: 20, damage: 2320, type: "dark_sekiha", desc: "「血染東方一片紅！」紫色魔王巨掌粉碎乾坤！" }
    }
  },
  {
    id: "aerial_rebuild",
    name: "風靈鋼彈·改修型 (XVX-016RN)",
    title: "水星魔女帕梅特刻痕最高階",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 23000,
    unlockCondition: "消耗 23,000 金幣招募",
    isFree: false,
    role: "GUND 浮游刃",
    weaponType: "gund_bits",
    canFly: true,
    baseHp: 2000,
    baseAtk: 260,
    baseDef: 95,
    speed: 8.8,
    themeColor: "#38bdf8",
    auraColor: "rgba(56, 189, 248, 0.95)",
    attackConfig: {
      light: { name: "光束步槍四連射", desc: "高出力光束連打" },
      heavy: { name: "11枚 GUND-BIT 組合重刃破防", desc: "盾刃合體巨劍破防" },
      grab: { name: "浮游盾刃圍剿擒摔", desc: "浮游刃鎖死對手重摔" },
      flight: { name: "水星之魔女飛行", desc: "藍色刻痕發光背翼飛行" }
    },
    skills: {
      skill1: { name: "11枚 GUND-BIT 全方位射擊", cd: 5, damage: 600, type: "gund_bits_lasers", desc: "11 枚浮游子機 360 度鎖定連續射擊！" },
      skill2: { name: "大型光束步槍加農 (GUND-Arm Cannon)", cd: 8, damage: 590, type: "mega_gund_beam", desc: "浮游刃裝載在步槍上轟出巨型藍白光束柱。" },
      ult: { name: "帕梅特刻痕 Score 8·寂靜零號共鳴", cd: 20, damage: 2300, type: "permet_score_eight", desc: "藍白數據風暴籠罩全場，強制停滯並分解所有敵方武裝！" }
    }
  },

  // ── 10. 動漫與 3D 遊戲傳奇補全 ──
  {
    id: "garp_fist",
    name: "蒙其·D·卡普 (鐵拳卡普)",
    title: "海軍本部傳奇中將英雄",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 8,
    cost: 24000,
    unlockCondition: "消耗 24,000 金幣招募",
    isFree: false,
    role: "霸王色鐵拳",
    weaponType: "none",
    canFly: false,
    baseHp: 2350,
    baseAtk: 275,
    baseDef: 105,
    speed: 8.2,
    themeColor: "#3b82f6",
    auraColor: "rgba(59, 130, 246, 0.95)",
    attackConfig: {
      light: { name: "骨拳連打", desc: "純肉體霸王色四段鐵拳" },
      heavy: { name: "拳骨隕石破防", desc: "徒手投擲千噸鐵球破防" },
      grab: { name: "抓起頭顱連環砸地", desc: "按住對手腦袋狂暴砸地" },
      flight: { name: "海軍六式·月步", desc: "踏空奔馳" }
    },
    skills: {
      skill1: { name: "拳骨衝突 (Galaxy Impact)", cd: 5.5, damage: 650, type: "galaxy_impact", desc: "凌空一拳，黑雷纏繞摧毀整座城鎮的巨大霸王色衝擊！" },
      skill2: { name: "海軍特大拳骨鐵球", cd: 8, damage: 590, type: "giant_cannonball", desc: "徒手擲出如山般巨大的黑色巨鐵球。" },
      ult: { name: "海底落下·銀河分裂鐵拳 (Galaxy Divide)", cd: 20, damage: 2380, type: "galaxy_divide", desc: "霸王色黑雷貫通雲霄，自九天之上一拳將整座島嶼一分為二！" }
    }
  },
  {
    id: "madara_six_paths",
    name: "宇智波斑 (六道仙人模式)",
    title: "戰國修羅神之化身",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 8,
    cost: 25000,
    unlockCondition: "消耗 25,000 金幣招募",
    isFree: false,
    role: "六道求道玉",
    weaponType: "six_paths_staff",
    canFly: true,
    baseHp: 2250,
    baseAtk: 280,
    baseDef: 110,
    speed: 8.7,
    themeColor: "#818cf8",
    auraColor: "rgba(129, 140, 248, 0.95)",
    attackConfig: {
      light: { name: "求道玉黑刃刺擊", desc: "求道玉化為黑刺四段連斬" },
      heavy: { name: "輪墓分身重擊破防", desc: "輪墓隱形分身破防重拳" },
      grab: { name: "萬象天引擒摔", desc: "引力吸過來直接貫地" },
      flight: { name: "六道仙人懸浮飛行", desc: "身披白袍背負求道玉懸空" }
    },
    skills: {
      skill1: { name: "仙法·嵐遁光牙", cd: 4.5, damage: 620, type: "light_fang", desc: "口中吐出光速紫色雷電光刃切裂一切！" },
      skill2: { name: "求道玉黑球防護陣", cd: 8, damage: 600, type: "truth_seeking_orbs", desc: "黑球形成護罩並射出湮滅光針。" },
      ult: { name: "天礙震星 (Tengai Shinsei·雙重天降隕石)", cd: 20, damage: 2450, type: "meteor_cataclysm", desc: "「這就是神的力量。」召喚兩顆直徑萬米的滅世巨大隕石墜落！" }
    }
  },
  // ── 11. 經典宇宙 20 位英雄極限補全 (達成 100 滿編陣容) ──
  {
    id: "goten_kid",
    name: "孫悟天 (少年)",
    title: "天真爛漫的小超賽",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 3,
    cost: 1800,
    unlockCondition: "消耗 1,800 金幣招募",
    isFree: false,
    role: "靈動小拳",
    weaponType: "none",
    canFly: true,
    baseHp: 1200,
    baseAtk: 135,
    baseDef: 60,
    speed: 7.2,
    themeColor: "#f97316",
    auraColor: "rgba(249, 115, 22, 0.7)",
    attackConfig: {
      light: { name: "童真快拳", desc: "靈巧三段連擊" },
      heavy: { name: "小超賽重擊", desc: "金髮爆發破防" },
      grab: { name: "抱腿摔投", desc: "抱住小腿重摔" },
      flight: { name: "舞空術", desc: "活潑懸空飛行" }
    },
    skills: {
      skill1: { name: "連續氣彈波", cd: 4, damage: 280, type: "rapid_shots", desc: "發射數發金色氣彈。" },
      skill2: { name: "衝撞頭槌", cd: 7, damage: 310, type: "headbutt", desc: "金色氣焰包裹頭槌撞飛對手。" },
      ult: { name: "全力龜派氣功", cd: 20, damage: 1100, type: "kame_kid", desc: "雙手蓄滿氣功波向前轟射！" }
    }
  },
  {
    id: "trunks_kid",
    name: "特南克斯 (少年)",
    title: "膠囊公司小少爺",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 3,
    cost: 1800,
    unlockCondition: "消耗 1,800 金幣招募",
    isFree: false,
    role: "天才劍術",
    weaponType: "sword",
    canFly: true,
    baseHp: 1200,
    baseAtk: 140,
    baseDef: 60,
    speed: 7.3,
    themeColor: "#818cf8",
    auraColor: "rgba(129, 140, 248, 0.7)",
    attackConfig: {
      light: { name: "短劍連削", desc: "短劍四段快速揮砍" },
      heavy: { name: "勇者突擊破防", desc: "短劍橫掃破防" },
      grab: { name: "近身摔投", desc: "迴旋踢摔倒對手" },
      flight: { name: "舞空術", desc: "空中靈活飛行" }
    },
    skills: {
      skill1: { name: "閃光重砲 (Flash Buster)", cd: 4.5, damage: 300, type: "flash_shot", desc: "單手射出黃金閃光彈。" },
      skill2: { name: "勇者短劍突刺", cd: 7, damage: 320, type: "sword_dash", desc: "手持短劍向前極速突刺。" },
      ult: { name: "勝利終結閃光", cd: 20, damage: 1120, type: "victory_cannon", desc: "金髮超賽全力轟出巨大終結光束！" }
    }
  },
  {
    id: "janemba_sword",
    name: "邪念波 (羅剎之劍)",
    title: "地獄邪念具現魔神",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 7,
    cost: 16500,
    unlockCondition: "消耗 16,500 金幣招募",
    isFree: false,
    role: "次元魔劍",
    weaponType: "rakshasa_sword",
    canFly: true,
    baseHp: 1900,
    baseAtk: 245,
    baseDef: 90,
    speed: 8.6,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.9)",
    attackConfig: {
      light: { name: "羅剎紅刃連斬", desc: "血紅次元長劍削斬" },
      heavy: { name: "次元方塊重劈破防", desc: "空間分解碎塊重劈破防" },
      grab: { name: "空間傳送貫胸", desc: "右手穿透空間抓起重摔" },
      flight: { name: "分解傳送飛行", desc: "身體化為空間方塊瞬移飛行" }
    },
    skills: {
      skill1: { name: "空間折疊次元斬 (Dimensional Slash)", cd: 4.5, damage: 560, type: "space_cut", desc: "隔空揮劍，在對手身旁直接切出深紅血光！" },
      skill2: { name: "羅剎空間反彈門", cd: 8, damage: 510, type: "portal_reflect", desc: "開啟傳送門吸收攻擊並反彈回對手身上。" },
      ult: { name: "地獄邪念·千刃血月審判", cd: 20, damage: 2150, type: "hell_blood_moon", desc: "天空化為血月，無數次元紅刃將戰場切成碎塊！" }
    }
  },
  {
    id: "whis_angel",
    name: "維斯 (天使神使)",
    title: "第7宇宙破壞神導師",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 9,
    cost: 99999,
    unlockCondition: "達成成就【天梯 200 勝】解鎖",
    isFree: false,
    isNonPurchasable: true,
    role: "天使極致",
    weaponType: "angel_staff",
    canFly: true,
    baseHp: 3000,
    baseAtk: 340,
    baseDef: 145,
    speed: 9.8,
    themeColor: "#38bdf8",
    auraColor: "rgba(56, 189, 248, 1.0)",
    attackConfig: {
      light: { name: "神杖輕點", desc: "天使神杖四段優雅點擊" },
      heavy: { name: "時間微調破防", desc: "神杖頓地引發神光破防" },
      grab: { name: "天使身法戲耍", desc: "避開攻擊手指輕彈摔飛" },
      flight: { name: "天使光輪飛行", desc: "頸部光環神速懸浮" }
    },
    skills: {
      skill1: { name: "天使絕對防禦身法", cd: 6, damage: 690, type: "angel_evade", desc: "2.5 秒內不受任何攻擊傷害並自動反擊。" },
      skill2: { name: "時間倒轉 3 秒 (Time Rewind)", cd: 10, damage: 720, type: "time_rewind", desc: "重置自身血量至 3 秒前並造成範圍神光爆破！" },
      ult: { name: "★ 天使之裁決·全宇宙法則淨化", cd: 20, damage: 3400, type: "angelic_purification", desc: "神杖高舉，億萬道純白聖光降臨，淨化多元宇宙一切混沌！" }
    }
  },
  {
    id: "green_goblin",
    name: "綠惡魔 (諾曼·奧斯朋)",
    title: "奧斯朋邪惡天災",
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    cost: 9400,
    unlockCondition: "消耗 9,400 金幣招募",
    isFree: false,
    role: "滑翔炸彈",
    weaponType: "pumpkin_bombs_glider",
    canFly: true,
    baseHp: 1800,
    baseAtk: 225,
    baseDef: 85,
    speed: 8.5,
    themeColor: "#22c55e",
    auraColor: "rgba(34, 197, 94, 0.85)",
    attackConfig: {
      light: { name: "惡魔刺刀連擊", desc: "滑翔翼刀刃四段削切" },
      heavy: { name: "南瓜炸彈重擲破防", desc: "燃燒南瓜巨彈破防" },
      grab: { name: "滑翔翼勾摔", desc: "滑翔翼勾住對手空中重摔" },
      flight: { name: "綠惡魔滑翔翼飛行 (Goblin Glider)", desc: "腳踏綠色蝙蝠滑翔翼空中高速俯衝" }
    },
    skills: {
      skill1: { name: "南瓜飛彈狂轟 (Pumpkin Bombs)", cd: 4.5, damage: 490, type: "bomb_cluster", desc: "投擲三枚爆裂南瓜炸彈引發連環爆炸。" },
      skill2: { name: "惡魔毒氣狂笑", cd: 7.5, damage: 460, type: "toxic_gas", desc: "釋放綠色神經毒氣降低對手 30% 防禦。" },
      ult: { name: "滑翔翼極速穿刺·南瓜地獄大核爆", cd: 20, damage: 1850, type: "glider_carpet_bomb", desc: "滑翔翼超音速穿刺對手，隨後投下巨型南瓜核彈化為火海！" }
    }
  },
  {
    id: "spiderman_2099",
    name: "蜘蛛人 2099 (米格爾·奧哈拉)",
    title: "未來賽博紐約守護者",
    series: "marvel",
    seriesName: "漫威",
    rarity: 7,
    cost: 16500,
    unlockCondition: "消耗 16,500 金幣招募",
    isFree: false,
    role: "光學毒爪",
    weaponType: "optical_claws_cape",
    canFly: true,
    baseHp: 1850,
    baseAtk: 245,
    baseDef: 90,
    speed: 8.8,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.9)",
    attackConfig: {
      light: { name: "未來光學爪擊", desc: "赤紅雷射爪四段撕裂" },
      heavy: { name: "重力尖刺重踢破防", desc: "前臂利爪蓄力破防" },
      grab: { name: "光網抱摔", desc: "光學蛛網纏繞重摔" },
      flight: { name: "反重力披風滑翔", desc: "背部紅色雷射蛛網披風滑翔" }
    },
    skills: {
      skill1: { name: "雷射蛛網穿刺", cd: 4.5, damage: 520, type: "laser_webs", desc: "射出帶有高壓能量的硬化光學蛛網。" },
      skill2: { name: "賽博毒牙突刺", cd: 7.5, damage: 540, type: "fang_bite", desc: "超音速俯衝毒牙撕咬，造成持續流血傷害。" },
      ult: { name: "2099 維度撕裂·未來正義終結", cd: 20, damage: 2080, type: "future_2099_strike", desc: "全身雷射戰衣全功率超載，以超光速在戰場交織出毀滅紅網！" }
    }
  },
  {
    id: "hawkeye_archer",
    name: "鷹眼 (克林特·巴頓)",
    title: "百步穿楊神射手",
    series: "marvel",
    seriesName: "漫威",
    rarity: 5,
    cost: 4800,
    unlockCondition: "消耗 4,800 金幣招募",
    isFree: false,
    role: "精準神射",
    weaponType: "compound_bow",
    canFly: false,
    baseHp: 1550,
    baseAtk: 185,
    baseDef: 75,
    speed: 7.6,
    themeColor: "#8b5cf6",
    auraColor: "rgba(139, 92, 246, 0.75)",
    attackConfig: {
      light: { name: "複合弓四連射", desc: "精準合金箭矢速射" },
      heavy: { name: "高爆箭矢破防", desc: "重裝穿甲箭破防" },
      grab: { name: "弓弦勒頸摔", desc: "弓弦鎖喉過肩摔" },
      flight: { name: "戰術翻滾", desc: "地面靈巧翻滾" }
    },
    skills: {
      skill1: { name: "高爆箭矢群射", cd: 4.5, damage: 410, type: "explosive_arrows", desc: "發射三枚炸彈箭引發連續爆破。" },
      skill2: { name: "電擊網箭束縛", cd: 7.5, damage: 380, type: "shock_arrow", desc: "射出高壓電擊箭麻痺對手 1.2 秒。" },
      ult: { name: "百發百中·天降箭雨風暴", cd: 20, damage: 1500, type: "arrow_storm", desc: "朝天拉滿神弓，萬千特種高科技箭矢覆蓋全場！" }
    }
  },
  {
    id: "carnage_symbiote",
    name: "屠殺 (克萊圖斯·卡薩迪)",
    title: "血紅共生體殺戮魔狂",
    series: "marvel",
    seriesName: "漫威",
    rarity: 7,
    cost: 16500,
    unlockCondition: "消耗 16,500 金幣招募",
    isFree: false,
    role: "血刃殺戮",
    weaponType: "blood_blades_tendrils",
    canFly: true,
    baseHp: 1850,
    baseAtk: 250,
    baseDef: 85,
    speed: 8.8,
    themeColor: "#ef4444",
    auraColor: "rgba(239, 68, 68, 0.95)",
    attackConfig: {
      light: { name: "血色利斧連剁", desc: "雙手化為深紅巨斧四段狂砍" },
      heavy: { name: "血紅尖刺地獄破防", desc: "背部爆發血色利刃破防" },
      grab: { name: "血網撕扯重摔", desc: "血紅觸手將對手四肢扯碎摔砸" },
      flight: { name: "血腥觸手彈射", desc: "血絲拉扯空中狂飆" }
    },
    skills: {
      skill1: { name: "千刃血刺齊射", cd: 4.5, damage: 540, type: "crimson_daggers", desc: "全身體表射出數十枚血紅飛刀。" },
      skill2: { name: "雙手血鐮迴旋斬", cd: 7.5, damage: 560, type: "scythe_spin_red", desc: "化身旋轉血色鐮刀割裂戰場。" },
      ult: { name: "「讓這世界血流成河」終極殺戮狂潮", cd: 20, damage: 2120, type: "carnage_abyss", desc: "戰場化為血紅共生體地獄，無數巨型血刃自地面狂暴貫穿！" }
    }
  },
  {
    id: "silver_surfer",
    name: "銀色衝浪手 (諾林·萊德)",
    title: "宇宙秘能純銀先驅",
    series: "marvel",
    seriesName: "漫威",
    rarity: 8,
    cost: 23500,
    unlockCondition: "消耗 23,500 金幣招募",
    isFree: false,
    role: "宇宙秘能",
    weaponType: "cosmic_surfboard",
    canFly: true,
    baseHp: 2100,
    baseAtk: 265,
    baseDef: 100,
    speed: 9.2,
    themeColor: "#cbd5e1",
    auraColor: "rgba(203, 213, 225, 0.95)",
    attackConfig: {
      light: { name: "秘能銀光連擊", desc: "銀白宇宙能量四段打擊" },
      heavy: { name: "衝浪板重砸破防", desc: "純銀滑板蓄力拍擊破防" },
      grab: { name: "宇宙分子分解摔", desc: "單手觸碰分子級重摔" },
      flight: { name: "銀色衝浪板光速穿梭", desc: "腳踏純銀滑板超光速全向翺翔" }
    },
    skills: {
      skill1: { name: "宇宙秘能衝擊 (Power Cosmic)", cd: 5, damage: 610, type: "cosmic_beam", desc: "雙手向前激射純白宇宙能量巨束。" },
      skill2: { name: "超光速滑板穿刺", cd: 7.5, damage: 580, type: "surfboard_ram", desc: "以超光速踩著滑板貫穿對手防線。" },
      ult: { name: "黑洞引力坍縮·宇宙奇異點", cd: 20, damage: 2300, type: "black_hole_cosmic", desc: "召喚微型黑洞吞噬戰場，引發超光速奇異點大爆炸！" }
    }
  },
  {
    id: "destiny_gundam",
    name: "命運鋼彈 (ZGMF-X42S)",
    title: "光之翼巨劍全武裝戰神",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 23000,
    unlockCondition: "消耗 23,000 金幣招募",
    isFree: false,
    role: "光翼斬艦",
    weaponType: "arondight_anti_ship_sword",
    canFly: true,
    baseHp: 2100,
    baseAtk: 265,
    baseDef: 95,
    speed: 8.9,
    themeColor: "#ef4444",
    auraColor: "rgba(239, 68, 68, 0.95)",
    attackConfig: {
      light: { name: "高能量光束步槍射擊", desc: "四段光束速射" },
      heavy: { name: "亞隆戴特斬艦刀重劈破防", desc: "巨大實體光束斬艦刀破防" },
      grab: { name: "掌中槍「帕爾瑪」零距轟殺", desc: "掌心光束砲按臉轟擊" },
      flight: { name: "殘影光之翼全速飛行", desc: "紅色光之翼留下無數殘影" }
    },
    skills: {
      skill1: { name: "掌中槍·帕爾瑪掌底炮", cd: 4.5, damage: 590, type: "palm_cannon", desc: "掌心爆發蒼藍高出力光束貼臉炸飛！" },
      skill2: { name: "高能量長射程光束加農", cd: 8, damage: 580, type: "long_range_cannon", desc: "背部摺疊大砲展開轟出貫穿光柱。" },
      ult: { name: "光之翼殘影·亞隆戴特斬艦一刀兩斷", cd: 20, damage: 2320, type: "destiny_wings_slash", desc: "光之翼全開帶出漫天殘影，巨型斬艦刀將戰場一切目標一刀劈碎！" }
    }
  },
  {
    id: "tallgeese_3",
    name: "托爾吉斯 III (OZ-00MS2B)",
    title: "米加加農砲雷霆騎士",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 7,
    cost: 16500,
    unlockCondition: "消耗 16,500 金幣招募",
    isFree: false,
    role: "巨砲電鞭",
    weaponType: "mega_cannon_heat_rod",
    canFly: true,
    baseHp: 1900,
    baseAtk: 245,
    baseDef: 90,
    speed: 8.6,
    themeColor: "#38bdf8",
    auraColor: "rgba(56, 189, 248, 0.9)",
    attackConfig: {
      light: { name: "光束軍刀快速削斬", desc: "騎士長劍四段突刺" },
      heavy: { name: "大型電熱鞭橫掃破防", desc: "高熱合金鞭橫掃破防" },
      grab: { name: "電熱鞭纏繞甩飛", desc: "高熱鞭鎖死對手過肩摔" },
      flight: { name: "超絕噴射器加速", desc: "背部大型推進器狂暴加速" }
    },
    skills: {
      skill1: { name: "高熱電熱鞭抽擊 (Heat Rod)", cd: 4.5, damage: 520, type: "heat_whip", desc: "抽動熾熱電鞭擊暈並引發高溫灼燒。" },
      skill2: { name: "大型米加加農砲展開射擊", cd: 8, damage: 560, type: "mega_cannon_tallgeese", desc: "加農砲前部展開轟出巨型光束。" },
      ult: { name: "大型米加加農砲最大出力·一擊滅要塞", cd: 20, damage: 2100, type: "fortress_destroyer", desc: "全出力光束砲全力過載，撕碎整座宇宙要塞級光柱轟殺！" }
    }
  },
  {
    id: "eren_titan",
    name: "艾連·葉卡 (始祖進擊之巨人)",
    title: "為了自由踏平世界的驅逐者",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 8,
    cost: 23500,
    unlockCondition: "消耗 23,500 金幣招募",
    isFree: false,
    role: "硬質化巨神",
    weaponType: "none",
    canFly: false,
    baseHp: 2400,
    baseAtk: 270,
    baseDef: 105,
    speed: 7.8,
    themeColor: "#15803d",
    auraColor: "rgba(21, 128, 61, 0.95)",
    attackConfig: {
      light: { name: "進擊巨拳連擊", desc: "綠色眼芒狂暴重拳四段" },
      heavy: { name: "硬質化金剛拳破防", desc: "水晶硬質化巨拳破防" },
      grab: { name: "巨力撕扯砸地", desc: "抓起對手雙腿猛摔" },
      flight: { name: "地鳴咆哮衝刺", desc: "地面震動狂暴狂奔" }
    },
    skills: {
      skill1: { name: "戰錘巨人硬質化地刺", cd: 5, damage: 600, type: "warhammer_spikes", desc: "地面瞬生數十根巨型水晶地刺貫穿空中目標！" },
      skill2: { name: "進擊咆哮霸體", cd: 8, damage: 540, type: "titan_roar", desc: "震天戰吼震暈周圍目標並獲得 50% 減傷霸體。" },
      ult: { name: "「驅逐這世界上所有敵人」終極地鳴天災 (The Rumbling)", cd: 20, damage: 2350, type: "the_rumbling", desc: "千萬超大型巨人降臨踏平大陸，地鳴滅世天崩地裂！" }
    }
  },
  {
    id: "sora_keyblade",
    name: "索拉 (王國之心·鍵刃大師)",
    title: "光之心靈守護勇者",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 7,
    cost: 16500,
    unlockCondition: "消耗 16,500 金幣招募",
    isFree: false,
    role: "鍵刃魔法",
    weaponType: "keyblade",
    canFly: true,
    baseHp: 1850,
    baseAtk: 240,
    baseDef: 85,
    speed: 8.4,
    themeColor: "#facc15",
    auraColor: "rgba(250, 204, 21, 0.9)",
    attackConfig: {
      light: { name: "鍵刃連斬", desc: "金黃鍵刃四段流暢削砍" },
      heavy: { name: "光之螺旋破防", desc: "鍵刃旋轉聖光破防" },
      grab: { name: "重力魔法摔投", desc: "重力球吸附重摔" },
      flight: { name: "滑空浮空 (Glide)", desc: "光之心靈空中滑翔" }
    },
    skills: {
      skill1: { name: "爆炎與雷霆魔法連鎖 (Firaga & Thundaga)", cd: 4.5, damage: 530, type: "magic_chain", desc: "連續轟出追蹤火球與天降雷霆。" },
      skill2: { name: "音速衝擊突進 (Sonic Blade)", cd: 7.5, damage: 520, type: "sonic_dash", desc: "化身金色光芒連續五次穿刺對手。" },
      ult: { name: "聖光封印·終極王國之心之光", cd: 20, damage: 2100, type: "kingdom_hearts_light", desc: "鍵刃開啟王國之心大門，無盡璀璨光芒驅散一切黑暗！" }
    }
  },
  {
    id: "zero_megaman",
    name: "傑洛 (洛克人 X·特級獵人)",
    title: "紅色疾風 Z-Saber 傳奇",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 7,
    cost: 16800,
    unlockCondition: "消耗 16,800 金幣招募",
    isFree: false,
    role: "光劍三連",
    weaponType: "z_saber_buster",
    canFly: true,
    baseHp: 1850,
    baseAtk: 245,
    baseDef: 85,
    speed: 8.8,
    themeColor: "#ef4444",
    auraColor: "rgba(239, 68, 68, 0.9)",
    attackConfig: {
      light: { name: "Z-Saber 三連斬", desc: "經典綠色光劍四段帥氣削斬" },
      heavy: { name: "空圓斬跳劈破防", desc: "空中 360 度光刃破防" },
      grab: { name: "Z-Buster 零距重砲摔", desc: "掌心重砲轟飛重摔" },
      flight: { name: "空中衝刺二段跳", desc: "紅色裝甲空中極速衝刺" }
    },
    skills: {
      skill1: { name: "滅閃光 (Messenkou)", cd: 5, damage: 550, type: "ground_lasers", desc: "單拳重砸地面，射出數道垂直沖天光柱！" },
      skill2: { name: "龍炎刃 (Ryuuenren)", cd: 7.5, damage: 530, type: "flame_uppercut", desc: "烈焰光劍昇龍斬挑飛對手。" },
      ult: { name: "真·幻夢零 (Genmu Zero)", cd: 20, damage: 2150, type: "genmu_zero_slice", desc: "雙手揮出覆蓋全螢幕的超巨大翠綠半月形極限劍氣！" }
    }
  },
  {
    id: "ace_fire_fist",
    name: "波特卡斯·D·艾斯 (火拳)",
    title: "白鬍子海賊團二番隊隊長",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 7,
    cost: 16000,
    unlockCondition: "消耗 16,000 金幣招募",
    isFree: false,
    role: "烈火自然系",
    weaponType: "none",
    canFly: true,
    baseHp: 1800,
    baseAtk: 240,
    baseDef: 85,
    speed: 8.5,
    themeColor: "#f97316",
    auraColor: "rgba(249, 115, 22, 0.9)",
    attackConfig: {
      light: { name: "火槍連射", desc: "指尖火彈四段速射" },
      heavy: { name: "火拳直擊破防", desc: "熾熱巨炎重拳破防" },
      grab: { name: "炎戒重摔", desc: "烈焰鎖死過肩摔" },
      flight: { name: "火焰推進飛行", desc: "雙腳噴發烈火空中翺翔" }
    },
    skills: {
      skill1: { name: "火拳 (Fire Fist)", cd: 4.5, damage: 550, type: "giant_fire_punch", desc: "揮出直徑 10 米巨大火焰之拳吞噬一切！" },
      skill2: { name: "螢火·火達磨", cd: 7.5, damage: 510, type: "green_fireflies", desc: "釋放無數綠色螢火光點包圍對手同時爆燃！" },
      ult: { name: "大炎戒·炎帝 (Great Flame Commandment)", cd: 20, damage: 2100, type: "giant_sun_nova", desc: "頭頂凝聚太陽般巨大的終極烈焰火球，湮滅全場！" }
    }
  },
  {
    id: "killua_godspeed",
    name: "奇犽·揍敵客 (神速模式)",
    title: "揍敵客殺手神童",
    series: "anime",
    seriesName: "熱血動漫",
    rarity: 7,
    cost: 16500,
    unlockCondition: "消耗 16,500 金幣招募",
    isFree: false,
    role: "電光石火",
    weaponType: "assassin_yoyos",
    canFly: true,
    baseHp: 1750,
    baseAtk: 245,
    baseDef: 80,
    speed: 9.3,
    themeColor: "#38bdf8",
    auraColor: "rgba(56, 189, 248, 0.95)",
    attackConfig: {
      light: { name: "暗殺利爪四連切", desc: "雙手變形為合金刀爪" },
      heavy: { name: "千噸重悠悠球破防", desc: "特殊合金悠悠球重擊破防" },
      grab: { name: "雷電肢曲背摔", desc: "無聲步瞬移至背後重摔" },
      flight: { name: "電光石火踏空", desc: "銀藍電芒全速穿梭" }
    },
    skills: {
      skill1: { name: "落雷 (Thunderbolt)", cd: 4.5, damage: 530, type: "lightning_strike", desc: "自空中召喚一道神速雷霆劈向對手。" },
      skill2: { name: "神速·疾風迅雷 (Godspeed Counter)", cd: 7.5, damage: 560, type: "counter_dash", desc: "反射神經完全自動化，閃避並以雷速連環穿心！" },
      ult: { name: "神速極限·雷掌心臟摘除", cd: 20, damage: 2150, type: "assassin_heart_rip", desc: "銀藍電光撕裂大氣，超光速閃過瞬間摘除敵方防禦核心！" }
    }
  },
  {
    id: "nier_2b",
    name: "2B (寄葉二號 B 型)",
    title: "人類榮光誓死捍衛者",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 7,
    cost: 16800,
    unlockCondition: "消耗 16,800 金幣招募",
    isFree: false,
    role: "雙劍浮游砲",
    weaponType: "dual_katana_pod",
    canFly: true,
    baseHp: 1800,
    baseAtk: 245,
    baseDef: 85,
    speed: 8.7,
    themeColor: "#f8fafc",
    auraColor: "rgba(248, 250, 252, 0.9)",
    attackConfig: {
      light: { name: "白之契約雙刀舞", desc: "懸浮雙長刀四段華麗削砍" },
      heavy: { name: "百獸之王劍破防", desc: "重劍蓄力跳劈破防" },
      grab: { name: "輔助機抓取旋轉摔", desc: "輔助機吊起對手旋轉摔砸" },
      flight: { name: "輔助機滑翔 (Pod Glide)", desc: "雙手抓握輔助機空中滑翔" }
    },
    skills: {
      skill1: { name: "輔助機雷射加農 (Pod Laser)", cd: 4.5, damage: 520, type: "pod_laser", desc: "輔助機 Pod 042 發射高能持續穿透雷射。" },
      skill2: { name: "懸浮幻影雙刀風暴", cd: 7.5, damage: 550, type: "dual_sword_spin", desc: "雙刀圍繞自身高速旋轉成防禦絞肉圈。" },
      ult: { name: "自爆協議·義體超載極限連擊", cd: 20, damage: 2120, type: "self_destruct_burst", desc: "脫下裙裝黑盒反應堆全開，雙刀化為漫天銀芒華麗終結！" }
    }
  },
  {
    id: "shadow_templar",
    name: "澤拉圖 (暗影聖堂武士·星靈)",
    title: "奈拉齊姆虛空幽能導師",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 8,
    cost: 23500,
    unlockCondition: "消耗 23,500 金幣招募",
    isFree: false,
    role: "隱形光刃",
    weaponType: "warp_blade",
    canFly: true,
    baseHp: 1950,
    baseAtk: 270,
    baseDef: 90,
    speed: 9.0,
    themeColor: "#10b981",
    auraColor: "rgba(16, 185, 129, 0.95)",
    attackConfig: {
      light: { name: "虛空幽能光刃削斬", desc: "翠綠曲光戰刃四段極速削砍" },
      heavy: { name: "幽能瞬影重劈破防", desc: "穿梭虛空破防重刺" },
      grab: { name: "暗影鎖喉重摔", desc: "虛空擒拿重摔" },
      flight: { name: "虛空穿梭閃爍 (Blink)", desc: "綠色幽能空間折躍飛行" }
    },
    skills: {
      skill1: { name: "虛空禁錮 (Void Prison)", cd: 6, damage: 450, type: "void_prison", desc: "製造綠色時間力場，完全停止力場內目標 2.5 秒！" },
      skill2: { name: "幽能短距折躍突刺 (Blink Strike)", cd: 5, damage: 580, type: "blink_pierce", desc: "折躍至目標身後，曲光戰刃無情背刺！" },
      ult: { name: "奈拉齊姆之榮光·虛空風暴狂舞", cd: 20, damage: 2350, type: "void_tempest", desc: "虛空幽能撕裂物質界，化身綠色死神光刃狂潮斬碎一切異端！" }
    }
  },
  {
    id: "tarnished_elden",
    name: "褪色者 (艾爾登之王)",
    title: "交界地命定之死主宰",
    series: "gaming",
    seriesName: "遊戲傳奇",
    rarity: 8,
    cost: 23500,
    unlockCondition: "消耗 23,500 金幣招募",
    isFree: false,
    role: "月光法術",
    weaponType: "moonlight_greatsword",
    canFly: false,
    baseHp: 2050,
    baseAtk: 260,
    baseDef: 95,
    speed: 8.1,
    themeColor: "#38bdf8",
    auraColor: "rgba(56, 189, 248, 0.95)",
    attackConfig: {
      light: { name: "暗月大劍四段削斬", desc: "冰藍月光附魔大劍削斬" },
      heavy: { name: "月光波蓄力重劈破防", desc: "揮出巨型冰藍月牙劍氣破防" },
      grab: { name: "處決背刺", desc: "大劍穿胸致命處決重摔" },
      flight: { name: "獵犬步伐 (Bloodhound's Step)", desc: "無敵隱形穿梭滑步" }
    },
    skills: {
      skill1: { name: "彗星亞茲勒 (Comet Azur)", cd: 6, damage: 680, type: "blue_laser_beam", desc: "噴射毀滅一切的超巨型湛藍星空雷射柱！" },
      skill2: { name: "命定之死·黑劍劍舞", cd: 8, damage: 610, type: "destined_death", desc: "揮動黑紅命定之死，扣除目標最大生命值。" },
      ult: { name: "菈妮的暗月·艾爾登之王降臨", cd: 20, damage: 2300, type: "ranni_dark_moon", desc: "天空升起巨大的冰冷暗月，滿月墜地冰封碎裂整個宇宙！" }
    }
  },
  {
    id: "cell_max",
    name: "賽魯 Max (Cell Max)",
    title: "紅綠狂暴失控終極生化神",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 8,
    cost: 24500,
    unlockCondition: "消耗 24,500 金幣招募",
    isFree: false,
    role: "巨神泰坦",
    weaponType: "none",
    canFly: true,
    baseHp: 2500,
    baseAtk: 275,
    baseDef: 110,
    speed: 7.8,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.95)",
    attackConfig: {
      light: { name: "紅綠巨拳連擊", desc: "百噸巨拳四段重砸" },
      heavy: { name: "巨角重撞破防", desc: "頭部巨角俯衝破防" },
      grab: { name: "巨尾橫掃碾碎", desc: "尾部巨棒橫掃砸地" },
      flight: { name: "巨翅轟鳴飛行", desc: "巨大雙翼掀起狂風飛行" }
    },
    skills: {
      skill1: { name: "滅世災厄射線 (Disaster Ray)", cd: 5, damage: 620, type: "cell_max_lasers", desc: "全身各處發射數十道狂暴血紅雷射。" },
      skill2: { name: "巨尾狂暴橫掃", cd: 8, damage: 590, type: "tail_sweep_max", desc: "巨尾 360 度橫掃將所有人震入空中。" },
      ult: { name: "狂暴核爆天災 (Cataclysmic Explosive Wave)", cd: 20, damage: 2350, type: "cell_max_nova", desc: "頭頂聚集毀滅性巨大紅黑能量球，砸向地面引發全場核爆！" }
    }
  },
  {
    id: "kang_conqueror",
    name: "征服者·康 (時間盡頭主宰)",
    title: "多元宇宙時間線征服者",
    series: "marvel",
    seriesName: "漫威",
    rarity: 9,
    cost: 99999,
    unlockCondition: "達成成就【累計造成 500 萬點戰鬥傷害】解鎖",
    isFree: false,
    isNonPurchasable: true,
    role: "時間科技",
    weaponType: "time_chair_cannons",
    canFly: true,
    baseHp: 2950,
    baseAtk: 325,
    baseDef: 140,
    speed: 8.8,
    themeColor: "#10b981",
    auraColor: "rgba(16, 185, 129, 1.0)",
    attackConfig: {
      light: { name: "時間力場射線", desc: "雙手藍綠科技光束四段射擊" },
      heavy: { name: "重力反轉破防", desc: "反轉局部重力破防" },
      grab: { name: "時間流放重摔", desc: "短暫傳送對手至過去重摔" },
      flight: { name: "時間王座懸浮", desc: "藍綠時間力場凌空飛行" }
    },
    skills: {
      skill1: { name: "時間停滯光環", cd: 5.5, damage: 710, type: "time_stasis", desc: "將目標鎖定在靜止時間流中 2 秒。" },
      skill2: { name: "多元時間線變體齊射", cd: 8, damage: 750, type: "variant_barrage", desc: "召喚 4 位康變體從不同維度同時發動毀滅光束！" },
      ult: { name: "★ 時間線抹除·終極時間盡頭", cd: 20, damage: 3300, type: "timeline_erasure", desc: "剪斷對手所在的時間分支，徹底從整個宇宙歷史中抹去！" }
    }
  }
];

if (typeof window !== "undefined") {
  window.RARITY_TIERS = RARITY_TIERS;
  window.CHARACTERS_DATA = CHARACTERS_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { RARITY_TIERS, CHARACTERS_DATA };
}


