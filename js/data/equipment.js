/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * 裝備與機體改裝配件資料庫 (Equipment & Modular Attachments Database)
 * 涵蓋鋼彈專屬改裝、漫威裝甲配件、龍珠修行裝備及通用模組
 */

const EQUIPMENT_SLOTS = {
  1: { id: 1, name: "動力核心 (Power Core)", icon: "⚡", desc: "提供能量循環、技能冷卻、霸體與破防強化" },
  2: { id: 2, name: "武裝背包 (Backpack Unit)", icon: "🎒", desc: "強化追加打擊、額外火砲或疾跑滑翔機動" },
  3: { id: 3, name: "防禦裝甲 (Armor & Defense)", icon: "🛡️", desc: "減免光束/氣功/物理傷害或轉化怒氣" },
  4: { id: 4, name: "戰術晶片 (Tactical OS Chip)", icon: "💾", desc: "解鎖危險預警、瀕死爆發與連擊破甲等特殊戰術機制" }
};

const EQUIPMENT_DATA = [
  // ─── 插槽 1：動力核心 (Power Core) ───
  {
    id: "gn_drive_original",
    name: "原裝 GN 爐 (GN Drive)",
    slot: 1,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 5,
    icon: "🟢",
    applicableTo: ["exia_gundam", "oo_raiser", "gm_rgm79", "rx78_2", "wing_gundam_zero", "strike_freedom", "destiny_spec2", "unicorn_crystal", "god_gundam", "crossbone_x1_fc", "kshatriya", "guncannon_rx77", "char_zaku2", "barbatos_lupus"],
    bonusHp: 150,
    bonusAtk: 25,
    cooldownReduction: 0.15,
    dodgeBonus: 0.10,
    perkName: "太陽爐粒子同調",
    perkDesc: "技能冷卻加快 15%，移動時留下粒子殘影增加 10% 閃避率（適用鋼彈機體）。",
    price: 3000
  },
  {
    id: "minovsky_reactor",
    name: "米諾夫斯基熱核反應爐",
    slot: 1,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 4,
    icon: "🔵",
    applicableTo: ["rx78_2", "wing_gundam_zero", "gm_rgm79", "guncannon_rx77", "char_zaku2", "strike_freedom", "destiny_spec2"],
    bonusHp: 200,
    bonusAtk: 30,
    beamDamageBonus: 0.15,
    maxRageBonus: 20,
    perkName: "熱核粒子高出力",
    perkDesc: "能量上限 +20%，遠程光束招式傷害 +15%（適用：初鋼、飛翼 Zero 等）。",
    price: 2200
  },
  {
    id: "ahab_reactor_twin",
    name: "雙重亞哈反應爐 (Ahab)",
    slot: 1,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 4,
    icon: "🟣",
    applicableTo: ["barbatos_lupus", "god_gundam", "crossbone_x1_fc"],
    bonusHp: 300,
    bonusAtk: 35,
    armorPierce: 0.15,
    hasPassiveArmor: true,
    perkName: "高重力亞哈波",
    perkDesc: "獲得常駐微型霸體，近戰物理攻擊附加 15% 破防傷害（適用：獵魔鋼彈等）。",
    price: 2500
  },
  {
    id: "tesseract_battery",
    name: "宇宙魔方能量電池",
    slot: 1,
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    icon: "💎",
    applicableTo: "all",
    bonusHp: 250,
    bonusAtk: 40,
    ultRageCostReduction: 0.20,
    perkName: "空間無限能源",
    perkDesc: "奧義大招所需怒氣降低 20% (由 100 降至 80)。",
    price: 4500
  },
  {
    id: "gravity_wristband",
    name: "超重力界王負重手環",
    slot: 1,
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 3,
    icon: "🥋",
    applicableTo: "all",
    bonusHp: 100,
    bonusAtk: 20,
    expGoldBonus: 0.30,
    speedDebuff: -0.05,
    perkName: "極限重力修行",
    perkDesc: "在 PVE/PVP 中獲得的經驗值與金幣 +30%，但角色移動速度 -5%。",
    price: 1500
  },

  // ─── 插槽 2：武裝背包 (Backpack Unit) ───
  {
    id: "super_dragoon_pack",
    name: "超級龍騎兵浮游系統",
    slot: 2,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 6,
    icon: "🪶",
    applicableTo: ["strike_freedom", "kshatriya", "unicorn_crystal"],
    bonusHp: 200,
    bonusAtk: 50,
    perkName: "浮游砲追尾連射",
    perkDesc: "普攻最後一段追加 2 枚浮游砲追擊射擊，造成額外光束傷害（適用：攻擊自由等）。",
    price: 5000
  },
  {
    id: "twin_beam_cannon_pack",
    name: "雙聯裝光束加農砲背包",
    slot: 2,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 3,
    icon: "🚀",
    applicableTo: ["rx78_2", "gm_rgm79", "guncannon_rx77"],
    bonusHp: 180,
    bonusAtk: 35,
    perkName: "中程火砲壓制",
    perkDesc: "普攻與連段中追加擊退與灼燒效果（適用：初鋼、吉姆）。",
    price: 1800
  },
  {
    id: "wings_of_light_pack",
    name: "光之翼推進背包",
    slot: 2,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 6,
    icon: "🪽",
    applicableTo: ["destiny_spec2", "wing_gundam_zero", "strike_freedom", "oo_raiser"],
    bonusHp: 220,
    bonusAtk: 45,
    speedBonus: 0.30,
    perkName: "極速光之翼",
    perkDesc: "疾跑速度 +30%，空中二段跳後可進行 3 秒自由滑翔（適用：命運、飛翼 Zero 等）。",
    price: 4800
  },
  {
    id: "senzu_pouch",
    name: "特製仙豆腰包",
    slot: 2,
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 6,
    icon: "🫘",
    applicableTo: "all",
    bonusHp: 300,
    bonusDef: 30,
    perkName: "卡林神塔仙豆保命",
    perkDesc: "每場戰鬥瀕死時自動觸發一次鎖血 1 點生命並無敵 1.5 秒且瞬間回復 20% 生命！",
    price: 5500
  },
  {
    id: "nano_repair_injector",
    name: "奈米修復注入器",
    slot: 2,
    series: "marvel",
    seriesName: "漫威",
    rarity: 5,
    icon: "💉",
    applicableTo: "all",
    bonusHp: 350,
    bonusDef: 20,
    perkName: "奈米緊急再生",
    perkDesc: "血量低於 30% 時，每秒自動回復 3% 最大生命值（持續 5 秒）。",
    price: 3800
  },

  // ─── 插槽 3：防禦裝甲 (Armor & Defense) ───
  {
    id: "ifield_generator",
    name: "I-Field 能量防護發生器",
    slot: 3,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 5,
    icon: "🌐",
    applicableTo: ["kshatriya", "unicorn_crystal", "rx78_2", "strike_freedom"],
    bonusHp: 400,
    bonusDef: 40,
    perkName: "光束偏折力場",
    perkDesc: "受到遠程光束/氣功攻擊時，吸收 40% 傷害並轉化為自身怒氣（適用：剎帝利、獨角獸等）。",
    price: 4000
  },
  {
    id: "phase_shift_armor",
    name: "相轉移裝甲 (PS Armor)",
    slot: 3,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 5,
    icon: "🛡️",
    applicableTo: ["strike_freedom", "destiny_spec2", "rx78_2"],
    bonusHp: 450,
    bonusDef: 45,
    perkName: "相轉移減震",
    perkDesc: "免疫輕普攻硬直，對實體物理斬擊減傷 25%（適用：攻擊自由、命運鋼彈）。",
    price: 4200
  },
  {
    id: "nanolaminate_armor",
    name: "奈米積層裝甲 (Nanolaminate)",
    slot: 3,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 5,
    icon: "🧱",
    applicableTo: ["barbatos_lupus", "god_gundam"],
    bonusHp: 500,
    bonusDef: 50,
    perkName: "高分子塗層偏折",
    perkDesc: "受到光束與氣功攻擊時傷害減少 50% 並產生偏折折射（適用：獵魔鋼彈等）。",
    price: 4200
  },
  {
    id: "vibranium_weave",
    name: "振金編織內襯",
    slot: 3,
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    icon: "🖤",
    applicableTo: "all",
    bonusHp: 400,
    bonusDef: 60,
    critDamageReduction: 0.50,
    perkName: "瓦甘達振金抗震",
    perkDesc: "受暴擊傷害降低 50%，受擊硬直時間減少 30%。",
    price: 4800
  },
  {
    id: "potara_earring_single",
    name: "波特拉耳環 (單耳)",
    slot: 3,
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 6,
    icon: "🟢",
    applicableTo: "all",
    bonusHp: 300,
    bonusAtk: 45,
    perkName: "界王神合體共鳴",
    perkDesc: "與同作品隊友同隊時，雙方攻擊力額外 +10%，怒氣獲取速度 +15%。",
    price: 5200
  },

  // ─── 插槽 4：戰術晶片 (Tactical OS Chip) ───
  {
    id: "zero_system_chip",
    name: "ZERO 系統 (Zero System)",
    slot: 4,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 7,
    icon: "👁️",
    applicableTo: ["wing_gundam_zero", "rx78_2", "strike_freedom", "destiny_spec2", "exia_gundam", "oo_raiser", "unicorn_crystal"],
    bonusAtk: 60,
    critRateBonus: 0.20,
    perkName: "未來預判演算",
    perkDesc: "預判對手動作：對手發動大招前 0.5 秒發出紅光警示，自身暴擊率 +20%（適用：飛翼 Zero 等）。",
    price: 8000
  },
  {
    id: "ntd_system_chip",
    name: "NT-D 破壞者系統",
    slot: 4,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 7,
    icon: "🔴",
    applicableTo: ["unicorn_crystal", "rx78_2", "kshatriya", "barbatos_lupus"],
    bonusAtk: 65,
    bonusHp: 200,
    perkName: "Destroy 暴走模式",
    perkDesc: "生命值低於 40% 時自動觸發，攻擊力 +35%，小招冷卻立即歸零一次（適用：獨角獸等）。",
    price: 8500
  },
  {
    id: "alayas_vijnana_chip",
    name: "阿賴耶識系統",
    slot: 4,
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 6,
    icon: "⚡",
    applicableTo: ["barbatos_lupus", "char_zaku2", "god_gundam"],
    bonusAtk: 55,
    attackSpeedBonus: 0.20,
    perkName: "神經直接連結",
    perkDesc: "攻擊速度 +20%，連續命中 5 次後使目標進入 1.5 秒破甲脆弱狀態（適用：獵魔等）。",
    price: 6000
  },
  {
    id: "jarvis_tactical_os",
    name: "J.A.R.V.I.S. 戰術管家晶片",
    slot: 4,
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    icon: "🖥️",
    applicableTo: "all",
    bonusAtk: 45,
    bonusDef: 35,
    perkName: "全息戰場弱點掃描",
    perkDesc: "自動標記對手格擋薄弱期，蓄力破防攻擊蓄力時間縮短 40%。",
    price: 5800
  },
  {
    id: "saiyan_spirit_chip",
    name: "賽亞戰鬥晶片 (S-Cells)",
    slot: 4,
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 6,
    icon: "🔥",
    applicableTo: "all",
    bonusAtk: 50,
    bonusHp: 250,
    perkName: "S 細胞怒氣爆發",
    perkDesc: "被敵方浮空或倒地受擊時，怒氣獲取量提升 50%，極限爆發 (Burst) 消耗怒氣降低至 35%。",
    price: 6200
  }
];

if (typeof window !== "undefined") {
  window.EQUIPMENT_SLOTS = EQUIPMENT_SLOTS;
  window.EQUIPMENT_DATA = EQUIPMENT_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { EQUIPMENT_SLOTS, EQUIPMENT_DATA };
}
