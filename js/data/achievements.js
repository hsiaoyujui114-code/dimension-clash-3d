/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * 成就系統與 10 層次元裂縫魔王塔 (Achievements & Boss Rush Tower Database)
 */

const BOSS_RUSH_FLOORS = [
  {
    floor: 1,
    name: "第 1 層：冒險初陣",
    bosses: ["goku_kid", "cap_america"],
    level: 15,
    rewardGold: 500,
    affix: "【新手試煉】魔王攻擊力與生命值標準",
    dialogue: "「跨次元戰場開啟！先來熱熱身吧！」"
  },
  {
    floor: 2,
    name: "第 2 層：聯邦量產突擊",
    bosses: ["gm_rgm79", "guncannon_rx77", "spiderman_classic"],
    level: 25,
    rewardGold: 800,
    affix: "【火力壓制】敵方遠程投射物傷害 +20%",
    dialogue: "「量產型機體的大軍，可別小看聯邦的火力！」"
  },
  {
    floor: 3,
    name: "第 3 層：復仇者集結",
    bosses: ["hawkeye", "winter_soldier", "black_panther"],
    level: 35,
    rewardGold: 1200,
    unlockHero: "thor",
    affix: "【戰術突擊】敵方暴擊率提升 15%",
    dialogue: "「瓦甘達的利爪與超級士兵的狂攻，你能支撐多久？」"
  },
  {
    floor: 4,
    name: "第 4 層：赤色彗星與白色惡魔",
    bosses: ["rx78_2", "char_zaku2", "barbatos_lupus"],
    level: 45,
    rewardGold: 2000,
    unlockHero: "dr_strange",
    affix: "【三倍速引擎】敵方移動速度與攻擊速度 +25%",
    dialogue: "「見識一下超越極限的三倍速吧！」"
  },
  {
    floor: 5,
    name: "第 5 層：宇宙帝王之殘酷",
    bosses: ["frieza_final", "piccolo", "god_gundam"],
    level: 55,
    rewardGold: 3000,
    unlockHero: "kshatriya",
    affix: "【帝王威壓】玩家怒氣獲取速度 -20%",
    dialogue: "「這顆星球的命運，就由我弗利沙大王來終結！」"
  },
  {
    floor: 6,
    name: "第 6 層：混沌與爆熱",
    bosses: ["scarlet_witch", "exia_gundam", "vegeta"],
    level: 65,
    rewardGold: 4500,
    affix: "【混沌扭曲】戰場每 10 秒引發一次隨機能量爆破",
    dialogue: "「現實已被篡改，七劍與賽亞王子的狂怒將吞噬你！」"
  },
  {
    floor: 7,
    name: "第 7 層：超越極限傳奇陣列",
    bosses: ["ssj3_goku", "strike_freedom", "dr_strange"],
    level: 75,
    rewardGold: 6000,
    affix: "【龍騎兵領域】敵方常駐 2 枚浮游砲協同射擊",
    dialogue: "「金色長髮的龍拳與金色骨架的自由之翼！」"
  },
  {
    floor: 8,
    name: "第 8 層：原初魔神浩劫",
    bosses: ["kid_buu", "kshatriya", "oo_raiser"],
    level: 85,
    rewardGold: 8500,
    unlockHero: "kid_buu",
    affix: "【不死魔驅】敵方每秒自動回復 1.5% 生命值",
    dialogue: "「瘋狂狂笑的純粹普烏，毀滅才是唯一的音符！」"
  },
  {
    floor: 9,
    name: "第 9 層：幻界神戰極限",
    bosses: ["vegito_blue", "destiny_spec2", "broly_legendary"],
    level: 95,
    rewardGold: 12000,
    affix: "【傳奇暴走】敵方受到攻擊時怒氣獲取翻倍，大招釋放頻率大幅提升",
    dialogue: "「這就是波特拉耳環與狂暴綠焰的究極力量！」"
  },
  {
    floor: 10,
    name: "★ 第 10 層：創世神魔終局決戰",
    bosses: ["thanos_gauntlet", "beerus", "goku_ultra_instinct"],
    level: 100,
    rewardGold: 30000,
    unlockHero: "beerus",
    affix: "【概念神域】敵方常駐全身霸體，傷害提升 30%，受傷減免 30%",
    dialogue: "「凡人，你竟敢挑戰全知全能的創世神祇？接受毀滅的審判吧！」"
  }
];

const ACHIEVEMENTS_DATA = [
  {
    id: "ach_login",
    title: "初臨次元",
    desc: "成功登入遊戲並建立跨次元檔案",
    rewardGold: 1000,
    target: 1,
    type: "login",
    unlockedHero: null
  },
  {
    id: "ach_first_win",
    title: "首戰告捷",
    desc: "在戰鬥模式中贏得第 1 場勝利",
    rewardGold: 500,
    target: 1,
    type: "wins",
    unlockedHero: null
  },
  {
    id: "ach_pvp_15",
    title: "百戰先鋒",
    desc: "累計贏得 15 場對戰勝利 (解鎖 貝吉塔 購買權)",
    rewardGold: 2000,
    target: 15,
    type: "wins",
    unlockedHero: "vegeta"
  },
  {
    id: "ach_combo_40",
    title: "行雲流水",
    desc: "在單場戰鬥中達成 40 連擊 (解鎖 能天使鋼彈 購買權)",
    rewardGold: 2500,
    target: 40,
    type: "combo",
    unlockedHero: "exia_gundam"
  },
  {
    id: "ach_pvp_25",
    title: "爆熱格鬥家",
    desc: "累計贏得 25 場對戰勝利 (解鎖 神威鋼彈 購買權)",
    rewardGold: 3000,
    target: 25,
    type: "wins",
    unlockedHero: "god_gundam"
  },
  {
    id: "ach_combo_60",
    title: "量子共感",
    desc: "在單場戰鬥中達成 60 連擊 (解鎖 00 強化模組 購買權)",
    rewardGold: 4000,
    target: 60,
    type: "combo",
    unlockedHero: "oo_raiser"
  },
  {
    id: "ach_pvp_50",
    title: "時間掌控者",
    desc: "累計贏得 50 場對戰勝利 (解鎖 時間之神 洛基 購買權)",
    rewardGold: 5000,
    target: 50,
    type: "wins",
    unlockedHero: "loki_god_of_stories"
  },
  {
    id: "ach_combo_80",
    title: "狂刃斬絕",
    desc: "在單場戰鬥中達成 80 連擊 (解鎖 海盜鋼彈 X1 購買權)",
    rewardGold: 6000,
    target: 80,
    type: "combo",
    unlockedHero: "crossbone_x1_fc"
  },
  {
    id: "ach_damage_2m",
    title: "傳奇暴虐狂怒",
    desc: "戰鬥累計造成 2,000,000 點傷害 (解鎖 傳奇超賽 布羅利 購買權)",
    rewardGold: 10000,
    target: 2000000,
    type: "total_damage",
    unlockedHero: "broly_legendary"
  },
  {
    id: "ach_rank_master",
    title: "多元宇宙大師",
    desc: "天梯積分達到 2000 點（大師段位，解鎖 黑化奇異博士 購買權）",
    rewardGold: 15000,
    target: 2000,
    type: "rank_trophies",
    unlockedHero: "strange_supreme"
  },
  // ── ★ 創世級挑戰成就 ★ ──
  {
    id: "ach_genesis_thanos",
    title: "【創世】天命之握",
    desc: "[極限挑戰] 通關魔王塔極限「無限之戰」一命無陣亡單人通關",
    rewardGold: 50000,
    target: 1,
    type: "thanos_trial",
    unlockedHero: "thanos_gauntlet",
    isGenesis: true
  },
  {
    id: "ach_genesis_ui_goku",
    title: "【創世】神之御技",
    desc: "[天梯登頂] 天梯達到「傳奇宗師」段位或累計 150 場勝利",
    rewardGold: 50000,
    target: 150,
    type: "wins",
    unlockedHero: "goku_ultra_instinct",
    isGenesis: true
  },
  {
    id: "ach_genesis_unicorn",
    title: "【創世】時間倒流神跡",
    desc: "[每週收集] 累計收集 15 顆「感應骨架結晶」",
    rewardGold: 50000,
    target: 15,
    type: "psycho_crystals",
    unlockedHero: "unicorn_crystal",
    isGenesis: true
  },
  {
    id: "ach_genesis_jiren",
    title: "【創世】絕對無可撼動",
    desc: "[神級成就] 在 5v5 模式中達成「單人 1 穿 5 不換人」全勝戰績",
    rewardGold: 50000,
    target: 1,
    type: "sweep_5",
    unlockedHero: "jiren_full_power",
    isGenesis: true
  },
  {
    id: "ach_genesis_beerus",
    title: "【創世】第七宇宙之毀滅",
    desc: "[挑戰極限] 單人無傷通關「魔王 Rush 挑戰」第 10 層",
    rewardGold: 50000,
    target: 1,
    type: "beerus_nodamage",
    unlockedHero: "beerus",
    isGenesis: true
  },
  {
    id: "ach_genesis_kang",
    title: "【創世】多元時空征服",
    desc: "[累積成就] 累計在 PVP 造成 5,000,000 點總戰鬥傷害",
    rewardGold: 50000,
    target: 5000000,
    type: "total_damage",
    unlockedHero: "kang_quantum",
    isGenesis: true
  }
];

if (typeof window !== "undefined") {
  window.BOSS_RUSH_FLOORS = BOSS_RUSH_FLOORS;
  window.ACHIEVEMENTS_DATA = ACHIEVEMENTS_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { BOSS_RUSH_FLOORS, ACHIEVEMENTS_DATA };
}
