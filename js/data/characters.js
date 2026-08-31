/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * 角色資料庫 (Characters Database) - 45+ 位跨次元完整陣容
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
  // ── 1. 凡品 (白階) ──
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
    role: "近戰平衡",
    baseHp: 1000,
    baseAtk: 100,
    baseDef: 50,
    speed: 6.5,
    themeColor: "#f97316",
    auraColor: "rgba(249, 115, 22, 0.6)",
    avatarType: "goku_kid",
    skills: {
      skill1: {
        name: "伸縮如意棒",
        cd: 3,
        damage: 180,
        type: "melee_pierce",
        desc: "揮舞如意棒向前方直線伸長突刺，具備遠程破招與擊退效果。"
      },
      skill2: {
        name: "殘像拳",
        cd: 6,
        damage: 120,
        type: "teleport_strike",
        desc: "化身殘影瞬移至對手身後發動體術迴旋踢，造成 0.5 秒僵直。"
      },
      ult: {
        name: "基礎龜派氣功",
        cd: 35,
        rageCost: 100,
        damage: 650,
        type: "beam",
        desc: "雙手蓄積湛藍氣功波轟擊全場，造成多段穿透巨額傷害。"
      }
    },
    gadget: { name: "金斗雲突襲", desc: "主動召喚金斗雲衝撞擊飛對手，每場可用 2 次。" },
    starPower1: { name: "賽亞人之尾", desc: "受到致命傷害時有 20% 機率保留 1 點生命值。" },
    starPower2: { name: "飽腹鬥志", desc: "連擊數超過 10 時，攻擊力提升 15%。" },
    hypercharge: { name: "天地貫穿之怒", desc: "大招龜派氣功範圍擴大 50%，擊中附帶擊飛牆撞效果。" },
    godAuraTitle: "初源之拳"
  },
  {
    id: "cap_america",
    name: "美國隊長",
    title: "復仇者領袖",
    series: "marvel",
    seriesName: "漫威",
    rarity: 1,
    cost: 0,
    unlockCondition: "登入 Google 帳號自動贈送",
    isFree: true,
    role: "防禦反擊",
    baseHp: 1150,
    baseAtk: 90,
    baseDef: 70,
    speed: 6.0,
    themeColor: "#3b82f6",
    auraColor: "rgba(59, 130, 246, 0.6)",
    avatarType: "cap_america",
    skills: {
      skill1: {
        name: "振金盾牌投擲",
        cd: 3.5,
        damage: 160,
        type: "projectile_bounce",
        desc: "擲出振金圓盾，在命中目標後折射返回，二段打擊並眩暈 0.4 秒。"
      },
      skill2: {
        name: "飛踢衝撞",
        cd: 5,
        damage: 200,
        type: "dash_tackle",
        desc: "舉盾前衝並接凌空飛踢，帶有短暫霸體，強制擊退對手。"
      },
      ult: {
        name: "自由正義連擊",
        cd: 35,
        rageCost: 100,
        damage: 620,
        type: "barrage",
        desc: "振金盾牌連打後全力重砸地面引發震波，造成全屏高額打擊。"
      }
    },
    gadget: { name: "振金防禦力場", desc: "產生 3 秒無敵護盾，吸收所有正面攻擊。" },
    starPower1: { name: "我可以打一整天", desc: "生命值低於 30% 時，防禦力提升 35%。" },
    starPower2: { name: "戰術指揮", desc: "隊友援護冷卻時間縮短 3 秒。" },
    hypercharge: { name: "終極雷神之鎚舉起", desc: "大招額外附加雷電震撼波，傷害增加 30%。" },
    godAuraTitle: "不屈守護者"
  },
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
    role: "量產射擊",
    baseHp: 1050,
    baseAtk: 95,
    baseDef: 55,
    speed: 6.2,
    themeColor: "#ef4444",
    auraColor: "rgba(239, 68, 68, 0.5)",
    avatarType: "gm_rgm79",
    skills: {
      skill1: {
        name: "光束噴槍射擊",
        cd: 2.5,
        damage: 150,
        type: "beam_shot",
        desc: "拔槍快速點射 2 發粒子光束，牽制中距離對手。"
      },
      skill2: {
        name: "盾牌衝撞",
        cd: 5.5,
        damage: 190,
        type: "dash_slam",
        desc: "推進器加速舉盾撞向目標，打斷對手起手動作。"
      },
      ult: {
        name: "火箭筒齊射",
        cd: 35,
        rageCost: 100,
        damage: 600,
        type: "artillery",
        desc: "換裝 380mm 超級火箭筒連續轟擊地面引發連環大爆炸。"
      }
    },
    gadget: { name: "緊急散熱噴射", desc: "消除自身所有異常狀態並向後滑行 5 米。" },
    starPower1: { name: "量產奇蹟", desc: "陣亡後下一位登場的隊友獲得 15% 怒氣獎勵。" },
    starPower2: { name: "精準校準", desc: "遠程射擊暴擊率增加 15%。" },
    hypercharge: { name: "全武裝支援連射", desc: "大招召喚 2 架友方吉姆進行交叉覆蓋轟炸。" },
    godAuraTitle: "聯邦基石"
  },

  // ── 2. 優秀 (綠階) ──
  {
    id: "spiderman_classic",
    name: "基礎蜘蛛人",
    title: "友好鄰居",
    series: "marvel",
    seriesName: "漫威",
    rarity: 2,
    cost: 2800,
    unlockCondition: "商店招募 (2,800 金幣)",
    role: "敏捷刺客",
    baseHp: 1020,
    baseAtk: 110,
    baseDef: 45,
    speed: 7.2,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.6)",
    avatarType: "spiderman",
    skills: {
      skill1: {
        name: "蛛絲牽引飛踢",
        cd: 3,
        damage: 190,
        type: "grapple_kick",
        desc: "射出蛛絲拉向對手並施展雙腳飛踢，快速拉近身位。"
      },
      skill2: {
        name: "蛛網束縛",
        cd: 6,
        damage: 130,
        type: "web_trap",
        desc: "發射高密度蛛網彈將目標纏繞定身 1.2 秒。"
      },
      ult: {
        name: "終極蛛網牢籠",
        cd: 38,
        rageCost: 100,
        damage: 680,
        type: "web_storm",
        desc: "在全場織造巨大蛛網將敵方拉入中心進行 360 度迴旋重砸。"
      }
    },
    gadget: { name: "蛛網感應地雷", desc: "在地面埋設 2 顆蛛網地雷，踩中即爆並定身。" },
    starPower1: { name: "蜘蛛感應", desc: "受擊時有 15% 機率自動觸發翻滾閃避。" },
    starPower2: { name: "敏捷空戰", desc: "在空中發動的攻擊傷害提升 20%。" },
    hypercharge: { name: "鋼鐵蜘蛛爪連擊", desc: "背後伸出 4 支鋼鐵蛛爪，大招連擊數增加 100%。" },
    godAuraTitle: "紐約之光"
  },
  {
    id: "krillin",
    name: "克林 (小林)",
    title: "最強地球人",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 2,
    cost: 2800,
    unlockCondition: "商店招募 (2,800 金幣)",
    role: "牽制爆發",
    baseHp: 1000,
    baseAtk: 115,
    baseDef: 50,
    speed: 6.6,
    themeColor: "#ea580c",
    auraColor: "rgba(234, 88, 12, 0.6)",
    avatarType: "krillin",
    skills: {
      skill1: {
        name: "太陽拳",
        cd: 4,
        damage: 80,
        type: "blind_flash",
        desc: "雙手置於前額綻放刺眼強光，致盲並中斷敵方動作 1.5 秒。"
      },
      skill2: {
        name: "氣圓斬",
        cd: 6.5,
        damage: 240,
        type: "cutting_disc",
        desc: "投擲高速旋轉的鋸齒光盤，無視防禦切割前進。"
      },
      ult: {
        name: "散射氣功波",
        cd: 36,
        rageCost: 100,
        damage: 700,
        type: "multi_ki",
        desc: "將氣功波引向高空後分裂成漫天光雨，大範圍地毯式轟炸。"
      }
    },
    gadget: { name: "仙豆補給包", desc: "立即恢復 30% 最大生命值，每場限用 2 次。" },
    starPower1: { name: "老練武道", desc: "閃避冷卻時間減少 25%。" },
    starPower2: { name: "百折不撓", desc: "瀕死狀態下氣功技能傷害提升 30%。" },
    hypercharge: { name: "多重氣圓斬狂嵐", desc: "大招同時發射 5 枚追蹤氣圓斬。" },
    godAuraTitle: "無畏武道家"
  },
  {
    id: "guncannon_rx77",
    name: "鋼加農 (RX-77)",
    title: "重裝中程火力支援",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 2,
    cost: 2800,
    unlockCondition: "商店招募 (2,800 金幣)",
    role: "重裝火砲",
    baseHp: 1200,
    baseAtk: 105,
    baseDef: 75,
    speed: 5.5,
    themeColor: "#b91c1c",
    auraColor: "rgba(185, 28, 28, 0.6)",
    avatarType: "guncannon",
    skills: {
      skill1: {
        name: "肩部雙聯加農砲",
        cd: 3.5,
        damage: 210,
        type: "cannon_blast",
        desc: "雙肩 240mm 低後座力砲齊射，附帶強力擊退效果。"
      },
      skill2: {
        name: "震地重擊",
        cd: 6,
        damage: 180,
        type: "ground_slam",
        desc: "屈膝雙拳重擊地面，震飛周圍接近的敵方單位。"
      },
      ult: {
        name: "240mm 密集轟炸",
        cd: 38,
        rageCost: 100,
        damage: 710,
        type: "heavy_barrage",
        desc: "半跪姿態全彈發射，連續打擊正前方整片戰場。"
      }
    },
    gadget: { name: "重裝推進護盾", desc: "受到正面攻擊減傷 70%，持續 4 秒。" },
    starPower1: { name: "厚重裝甲", desc: "常駐獲得 10% 物理傷害減免。" },
    starPower2: { name: "火力壓制", desc: "火砲命中後使目標減速 30%，持續 2 秒。" },
    hypercharge: { name: "超重型軌道轟炸", desc: "大招召喚天基動能砲追加終結轟擊。" },
    godAuraTitle: "重砲堡壘"
  },
  {
    id: "hawkeye",
    name: "鷹眼 (克林特)",
    title: "神箭百步穿楊",
    series: "marvel",
    seriesName: "漫威",
    rarity: 2,
    cost: 2800,
    unlockCondition: "商店招募 (2,800 金幣)",
    role: "遠程射手",
    baseHp: 980,
    baseAtk: 125,
    baseDef: 40,
    speed: 6.8,
    themeColor: "#7c3aed",
    auraColor: "rgba(124, 58, 237, 0.6)",
    avatarType: "hawkeye",
    skills: {
      skill1: {
        name: "爆破箭矢",
        cd: 3,
        damage: 200,
        type: "arrow_explode",
        desc: "射出一支高爆箭，命中或觸地後產生烈焰爆炸。"
      },
      skill2: {
        name: "電擊網箭",
        cd: 5.5,
        damage: 150,
        type: "arrow_electric",
        desc: "展開高壓電流網，使範圍內敵人麻痺 1 秒。"
      },
      ult: {
        name: "萬箭齊發終極射擊",
        cd: 36,
        rageCost: 100,
        damage: 730,
        type: "arrow_storm",
        desc: "連續高速拉弓向天空射出特殊箭囊，傾瀉箭雨覆蓋戰場。"
      }
    },
    gadget: { name: "煙霧彈撤退", desc: "扔下煙霧彈獲得 2 秒完全隱身與移速提升。" },
    starPower1: { name: "百發百中", desc: "箭矢暴擊傷害提升 40%。" },
    starPower2: { name: "弱點鎖定", desc: "距離對手越遠，造成的傷害越高 (最高 +25%)。" },
    hypercharge: { name: "皮姆粒子縮小箭", desc: "大招箭雨附帶縮小射線，削弱敵方 50% 防禦。" },
    godAuraTitle: "絕影箭聖"
  },
  {
    id: "yajirobe",
    name: "亞奇洛貝",
    title: "居合拔刀客",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 2,
    cost: 2800,
    unlockCondition: "商店招募 (2,800 金幣)",
    role: "拔刀突襲",
    baseHp: 1100,
    baseAtk: 115,
    baseDef: 55,
    speed: 6.0,
    themeColor: "#ca8a04",
    auraColor: "rgba(202, 138, 4, 0.6)",
    avatarType: "yajirobe",
    skills: {
      skill1: {
        name: "拔刀居合斬",
        cd: 3.2,
        damage: 220,
        type: "sword_dash",
        desc: "收刀蓄勢後瞬間拔刀閃斬，前衝破開前方一切阻礙。"
      },
      skill2: {
        name: "仙豆啃咬",
        cd: 12,
        damage: 0,
        type: "heal",
        desc: "掏出一粒仙豆咀嚼，瞬間回復 200 點生命值。"
      },
      ult: {
        name: "斷尾重劈",
        cd: 38,
        rageCost: 100,
        damage: 750,
        type: "sword_slam",
        desc: "高高躍起對準對手弱點施展全力量一刀兩斷的致命重劈。"
      }
    },
    gadget: { name: "緊急烤肉補給", desc: "吃下大塊烤肉，10 秒內每秒回復 30 點生命。" },
    starPower1: { name: "偷襲專精", desc: "背擊對手時傷害提高 30%。" },
    starPower2: { name: "關鍵一擊", desc: "生命低於 20% 時拔刀居合斬必定暴擊。" },
    hypercharge: { name: "神聖武士狂斬", desc: "大招釋放劍氣裂地波，傷害提升 25%。" },
    godAuraTitle: "隱世狂刀"
  },

  // ── 3. 稀有 (藍階) ──
  {
    id: "rx78_2",
    name: "初鋼 RX-78-2",
    title: "聯邦白色惡魔",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 3,
    cost: 6800,
    unlockCondition: "商店招募 (6,800 金幣)",
    role: "攻防兼備",
    baseHp: 1180,
    baseAtk: 130,
    baseDef: 65,
    speed: 6.5,
    themeColor: "#2563eb",
    auraColor: "rgba(37, 99, 235, 0.6)",
    avatarType: "rx78",
    skills: {
      skill1: {
        name: "光束步槍點射",
        cd: 3,
        damage: 230,
        type: "beam_rifle",
        desc: "使用專用光束步槍精準射擊 2 發高能光束。"
      },
      skill2: {
        name: "盾牌格擋衝撞",
        cd: 5.5,
        damage: 220,
        type: "shield_bash",
        desc: "舉盾格擋抵消正面攻擊並全力衝撞，將敵方挑飛。"
      },
      ult: {
        name: "超級火箭筒轟炸",
        cd: 38,
        rageCost: 100,
        damage: 820,
        type: "bazooka_barrage",
        desc: "雙手持超級火箭筒連續射出高爆彈頭，最後拔出光束軍刀飛斬收尾。"
      }
    },
    gadget: { name: "核心戰機支援", desc: "召喚核心戰機進行一次空中俯衝掃射。" },
    starPower1: { name: "學習型電腦", desc: "連續命中目標 4 次後，後續技能傷害提升 15%。" },
    starPower2: { name: "月神鈦合金裝甲", desc: "受到的暴擊傷害降低 40%。" },
    hypercharge: { name: "最後之射擊 (Last Shooting)", desc: "大招轉化為仰天單臂光束最大出力射擊，穿透全屏。" },
    godAuraTitle: "初代傳說"
  },
  {
    id: "char_zaku2",
    name: "夏亞專用紅薩克",
    title: "赤色彗星",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 3,
    cost: 6800,
    unlockCondition: "商店招募 (6,800 金幣)",
    role: "高速近戰",
    baseHp: 1100,
    baseAtk: 140,
    baseDef: 55,
    speed: 8.0,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.7)",
    avatarType: "char_zaku",
    skills: {
      skill1: {
        name: "熱能斧三連斬",
        cd: 3,
        damage: 240,
        type: "axe_slash",
        desc: "抽出赤熱熱能斧發動極速三連斬，最後一擊附帶破甲。"
      },
      skill2: {
        name: "薩克機槍掃射",
        cd: 5,
        damage: 210,
        type: "mg_sweep",
        desc: "持 120mm 薩克機槍呈扇形掃射，形成彈幕壓制。"
      },
      ult: {
        name: "三倍速赤色彗星踢",
        cd: 36,
        rageCost: 100,
        damage: 850,
        type: "comet_kick",
        desc: "推進器全開以三倍速殘影逼近，施展震碎機體的終極凌空飛踢。"
      }
    },
    gadget: { name: "三倍速推進爆發", desc: "5 秒內移動速度與攻速提升 40%。" },
    starPower1: { name: "赤色彗星之名", desc: "每次衝刺後的第一次攻擊必定暴擊。" },
    starPower2: { name: "新人類預感", desc: "閃避成功後立即刷新小招 1 的冷卻時間。" },
    hypercharge: { name: "隕石推進重踢", desc: "大招附帶隕石燃燒特效，衝擊範圍擴大 60%。" },
    godAuraTitle: "赤色彗星"
  },
  {
    id: "hulk",
    name: "綠巨人浩克",
    title: "不滅憤怒巨獸",
    series: "marvel",
    seriesName: "漫威",
    rarity: 3,
    cost: 6800,
    unlockCondition: "商店招募 (6,800 金幣)",
    role: "重裝力量",
    baseHp: 1400,
    baseAtk: 135,
    baseDef: 80,
    speed: 5.4,
    themeColor: "#16a34a",
    auraColor: "rgba(22, 163, 74, 0.7)",
    avatarType: "hulk",
    skills: {
      skill1: {
        name: "撼地衝擊波",
        cd: 3.5,
        damage: 250,
        type: "ground_quake",
        desc: "雙手合十怒擊地面，產生向前裂開的巨大岩石衝擊波。"
      },
      skill2: {
        name: "狂暴飛撲抓取",
        cd: 6,
        damage: 230,
        type: "leap_grab",
        desc: "騰空躍起撲向對手，抓住後直接將其面朝下砸進地板。"
      },
      ult: {
        name: "浩克重砸 (HULK SMASH!)",
        cd: 40,
        rageCost: 100,
        damage: 880,
        type: "hulk_smash",
        desc: "抓起對手進行左右連續 4 次來回猛砸，最後一記跳躍重碾震撼全場。"
      }
    },
    gadget: { name: "無盡怒火咆哮", desc: "震退全場敵方並使自身怒氣值直接增加 40%。" },
    starPower1: { name: "越憤怒越強大", desc: "生命值每降低 10%，攻擊力提升 5%。" },
    starPower2: { name: "伽馬自癒因子", desc: "每秒自動回復 1% 最大生命值。" },
    hypercharge: { name: "世界破壞者形態", desc: "大招附帶綠色伽馬核爆，傷害提升 30% 並灼燒地面。" },
    godAuraTitle: "怒火泰坦"
  },
  {
    id: "yamcha",
    name: "飲茶 (亞姆)",
    title: "荒漠狂狼",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 3,
    cost: 6800,
    unlockCondition: "商店招募 (6,800 金幣)",
    role: "敏捷連打",
    baseHp: 1050,
    baseAtk: 125,
    baseDef: 50,
    speed: 7.0,
    themeColor: "#d97706",
    auraColor: "rgba(217, 119, 6, 0.6)",
    avatarType: "yamcha",
    skills: {
      skill1: {
        name: "狼牙風風拳",
        cd: 3,
        damage: 230,
        type: "wolf_combo",
        desc: "化身狂狼撲擊，發動高速爪擊爪影連環撕裂打擊。"
      },
      skill2: {
        name: "操氣彈",
        cd: 5.5,
        damage: 210,
        type: "control_ki",
        desc: "凝聚操氣彈並隨意念追蹤轉向，連續穿透打擊對手。"
      },
      ult: {
        name: "真·狼牙烈風拳",
        cd: 36,
        rageCost: 100,
        damage: 800,
        type: "wolf_tempest",
        desc: "凝聚巨型狂狼幻影，展開狂風暴雨般的極限體術終結。"
      }
    },
    gadget: { name: "替身自爆假人", desc: "在原地留下替身假人引爆，自身後撤。" },
    starPower1: { name: "孤狼之志", desc: "隊伍中其他隊友陣亡時，自身攻擊力 +20%。" },
    starPower2: { name: "狼性直覺", desc: "暴擊率提升 15%。" },
    hypercharge: { name: "狂暴狼魂覺醒", desc: "大招附帶群狼幻影撕咬，連段數翻倍。" },
    godAuraTitle: "荒野狼王"
  },
  {
    id: "winter_soldier",
    name: "冬兵 (酷寒戰士)",
    title: "機械臂殺手",
    series: "marvel",
    seriesName: "漫威",
    rarity: 3,
    cost: 6800,
    unlockCondition: "商店招募 (6,800 金幣)",
    role: "戰術近戰",
    baseHp: 1120,
    baseAtk: 135,
    baseDef: 60,
    speed: 6.6,
    themeColor: "#475569",
    auraColor: "rgba(71, 85, 105, 0.7)",
    avatarType: "winter_soldier",
    skills: {
      skill1: {
        name: "機械臂重拳",
        cd: 3,
        damage: 240,
        type: "cyber_punch",
        desc: "左手金屬手臂全力揮出一記重拳，具備單次破霸體效果。"
      },
      skill2: {
        name: "突擊步槍連射",
        cd: 5,
        damage: 220,
        type: "rifle_burst",
        desc: "拔出戰術突擊步槍進行精準點射壓制。"
      },
      ult: {
        name: "震爆彈破防襲擊",
        cd: 36,
        rageCost: 100,
        damage: 830,
        type: "stun_assault",
        desc: "投擲多枚震爆閃光彈致盲敵方，隨後金屬手臂連續狂轟終結。"
      }
    },
    gadget: { name: "戰術微型地雷", desc: "埋設高爆地雷，敵人踏入引發連鎖破甲爆炸。" },
    starPower1: { name: "金屬臂格擋", desc: "格擋時減傷效果提升至 95%。" },
    starPower2: { name: "冷酷刺客", desc: "對硬直狀態下的對手造成的傷害提升 25%。" },
    hypercharge: { name: "汎合金手臂超載", desc: "大招機械臂釋放電磁脈衝波，造成額外眩暈。" },
    godAuraTitle: "酷寒戰魂"
  },

  // ── 4. 特級 (紫階) ──
  {
    id: "ironman_mk50",
    name: "鋼鐵人 Mark 50",
    title: "奈米血邊裝甲",
    series: "marvel",
    seriesName: "漫威",
    rarity: 4,
    cost: 18000,
    unlockCondition: "商店招募 (18,000 金幣)",
    role: "飛行射擊",
    baseHp: 1150,
    baseAtk: 150,
    baseDef: 60,
    speed: 7.2,
    themeColor: "#ea580c",
    auraColor: "rgba(234, 88, 12, 0.7)",
    avatarType: "ironman",
    skills: {
      skill1: {
        name: "奈米能量掌心雷",
        cd: 2.8,
        damage: 260,
        type: "repulsor_blast",
        desc: "手部奈米粒子凝聚，發射極速高能脈衝光炮。"
      },
      skill2: {
        name: "追蹤微型飛彈",
        cd: 5.5,
        damage: 240,
        type: "micro_missiles",
        desc: "背部展開 6 枚追蹤微型導彈，鎖定敵方追擊轟炸。"
      },
      ult: {
        name: "單束單向衝擊胸砲 (Unibeam)",
        cd: 40,
        rageCost: 100,
        damage: 960,
        type: "unibeam",
        desc: "胸口方舟反應爐過載全開，發射毀天滅地的超粗光束巨砲。"
      }
    },
    gadget: { name: "奈米能量護盾", desc: "展開大型奈米護盾反彈所有投射物攻擊。" },
    starPower1: { name: "AI 戰術輔助 Friday", desc: "每 8 秒自動識別並標記敵方破綻，下一擊必定暴擊。" },
    starPower2: { name: "空中懸浮推進", desc: "可在空中自由推進滑行，空中攻擊傷害 +25%。" },
    hypercharge: { name: "奈米重型加農砲矩陣", desc: "大招胸砲附帶背部 4 門浮空加農砲同步開火。" },
    godAuraTitle: "鋼鐵之心"
  },
  {
    id: "piccolo",
    name: "比克 (魔童)",
    title: "娜美克星大魔王",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 4,
    cost: 18000,
    unlockCondition: "商店招募 (18,000 金幣)",
    role: "中程破防",
    baseHp: 1220,
    baseAtk: 145,
    baseDef: 65,
    speed: 6.6,
    themeColor: "#15803d",
    auraColor: "rgba(21, 128, 61, 0.7)",
    avatarType: "piccolo",
    skills: {
      skill1: {
        name: "伸長手臂擒拿",
        cd: 3.5,
        damage: 240,
        type: "elastic_grab",
        desc: "伸長橡膠般的手臂跨半屏抓取對手並拉回身前重擊。"
      },
      skill2: {
        name: "激烈光彈",
        cd: 6,
        damage: 260,
        type: "hellzone_grenade",
        desc: "在敵方周圍布下懸浮氣彈，隨後一齊收攏爆破。"
      },
      ult: {
        name: "魔貫光殺砲",
        cd: 38,
        rageCost: 100,
        damage: 980,
        type: "makankosappo",
        desc: "兩指凝聚螺旋光芒貫穿全屏，具備無視 50% 防禦的極致穿透力。"
      }
    },
    gadget: { name: "脫去重型披風", desc: "脫下負重披風，移速與攻擊速度永久提升 20%。" },
    starPower1: { name: "超速再生", desc: "瀕死時瞬間回復 25% 生命值 (每場戰鬥限 1 次)。" },
    starPower2: { name: "娜美克智慧", desc: "戰術小招冷卻時間縮短 15%。" },
    hypercharge: { name: "橙色比克神力覺醒", desc: "大招化身巨大化體型，魔貫光殺砲化為核爆級光柱。" },
    godAuraTitle: "魔界智尊"
  },
  {
    id: "wing_gundam_zero",
    name: "飛翼鋼彈 Zero",
    title: "天使之翼破壞者",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 4,
    cost: 18000,
    unlockCondition: "商店招募 (18,000 金幣)",
    role: "浮空轟炸",
    baseHp: 1160,
    baseAtk: 155,
    baseDef: 60,
    speed: 7.4,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.7)",
    avatarType: "wing_zero",
    skills: {
      skill1: {
        name: "旋轉光束軍刀",
        cd: 3,
        damage: 260,
        type: "saber_spin",
        desc: "光束軍刀高速迴旋突進，將沿途敵人挑至浮空。"
      },
      skill2: {
        name: "機關加農砲",
        cd: 5,
        damage: 230,
        type: "gatling_burst",
        desc: "胸部雙聯裝機關加農砲極速開火掃射。"
      },
      ult: {
        name: "雙重破壞步槍迴旋射擊",
        cd: 42,
        rageCost: 100,
        damage: 1000,
        type: "twin_buster_spin",
        desc: "展開羽翼懸空，雙重破壞步槍合體進行 360 度毀滅光束迴旋掃射。"
      }
    },
    gadget: { name: "羽翼護盾包覆", desc: "4 片白羽機翼閉合，3 秒內免疫一切傷害。" },
    starPower1: { name: "ZERO 系統預測", desc: "對手施展技能前 0.5 秒發出紅光預警，自身暴擊 +20%。" },
    starPower2: { name: "天使滑翔", desc: "空中可進行無限次滑翔與衝刺。" },
    hypercharge: { name: "滾動破壞全彈齊射", desc: "大招附帶全方位羽毛光刃粒子，掃蕩整個螢幕。" },
    godAuraTitle: "光羽神判"
  },
  {
    id: "future_trunks",
    name: "特南克斯 (未來)",
    title: "末世救世劍客",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 4,
    cost: 18000,
    unlockCondition: "商店招募 (18,000 金幣)",
    role: "劍技突進",
    baseHp: 1140,
    baseAtk: 160,
    baseDef: 55,
    speed: 7.1,
    themeColor: "#8b5cf6",
    auraColor: "rgba(139, 92, 246, 0.7)",
    avatarType: "trunks",
    skills: {
      skill1: {
        name: "閃光刺擊",
        cd: 2.8,
        damage: 250,
        type: "sword_thrust",
        desc: "背後拔出寶劍化作金光突刺，極速穿透前方敵人。"
      },
      skill2: {
        name: "燃燒攻擊 (Burning Attack)",
        cd: 5.5,
        damage: 270,
        type: "burning_attack",
        desc: "雙手結出繁複印法，發射金色高熱氣功彈爆破。"
      },
      ult: {
        name: "終結斬擊烈焰破",
        cd: 38,
        rageCost: 100,
        damage: 990,
        type: "shining_slash",
        desc: "將弗利沙分屍的傳奇劍法！數十道劍光斬碎目標後氣功將其粉碎。"
      }
    },
    gadget: { name: "時光機回溯", desc: "瞬間回到 3 秒前的位置並恢復期間損失的 50% 生命。" },
    starPower1: { name: "希望之劍意", desc: "連擊每次命中使自身攻擊力提升 3% (最多疊加 10 層)。" },
    starPower2: { name: "超賽怒火", desc: "怒氣累積速度提升 25%。" },
    hypercharge: { name: "元氣之劍 (Sword of Hope)", desc: "大招匯聚全人類希望光芒，化作巨型光之巨劍劈裂天地。" },
    godAuraTitle: "希望之刃"
  },
  {
    id: "black_panther",
    name: "黑豹 (帝查拉)",
    title: "瓦甘達守護之王",
    series: "marvel",
    seriesName: "漫威",
    rarity: 4,
    cost: 18000,
    unlockCondition: "商店招募 (18,000 金幣)",
    role: "敏捷突擊",
    baseHp: 1180,
    baseAtk: 155,
    baseDef: 65,
    speed: 7.5,
    themeColor: "#7e22ce",
    auraColor: "rgba(126, 34, 206, 0.7)",
    avatarType: "black_panther",
    skills: {
      skill1: {
        name: "汎合金利爪連擊",
        cd: 3,
        damage: 260,
        type: "claw_strike",
        desc: "雙爪泛著紫光極速連撕 4 次，附加撕裂流血效果。"
      },
      skill2: {
        name: "能量反衝護盾",
        cd: 5.5,
        damage: 200,
        type: "kinetic_shield",
        desc: "吸收當前攻擊的動能並化作紫色衝擊波彈開身邊敵人。"
      },
      ult: {
        name: "瓦甘達之躍突襲",
        cd: 38,
        rageCost: 100,
        damage: 970,
        type: "wakanda_leap",
        desc: "全身釋放充能動能狂暴震盪，伴隨黑豹幻影高速俯衝絕殺。"
      }
    },
    gadget: { name: "心型草藥激活", desc: "10 秒內移速提升 50% 且普攻無法被格擋。" },
    starPower1: { name: "動能吸收轉化", desc: "受到傷害的 20% 自動轉化為自身怒氣值。" },
    starPower2: { name: "豹影匿蹤", desc: "翻滾閃避期間獲得完全隱形與 0.5 秒無敵。" },
    hypercharge: { name: "瓦甘達萬歲 (Wakanda Forever)", desc: "大招引爆超強紫色動能脈衝，全圖衝擊波擊飛對手。" },
    godAuraTitle: "瓦甘達黑豹"
  },
  {
    id: "barbatos_lupus",
    name: "獵魔鋼彈 Lupus",
    title: "鐵華團狂狼",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 4,
    cost: 18000,
    unlockCondition: "商店招募 (18,000 金幣)",
    role: "霸體重擊",
    baseHp: 1250,
    baseAtk: 165,
    baseDef: 70,
    speed: 6.5,
    themeColor: "#0f766e",
    auraColor: "rgba(15, 118, 110, 0.7)",
    avatarType: "barbatos",
    skills: {
      skill1: {
        name: "巨大太刀橫掃",
        cd: 3,
        damage: 280,
        type: "blade_sweep",
        desc: "手持對艦太刀猛力橫劈，自帶單次強霸體並擊退敵人。"
      },
      skill2: {
        name: "200mm 腕砲",
        cd: 5,
        damage: 230,
        type: "wrist_cannon",
        desc: "雙腕火砲速射，壓制中距離企圖拉扯的敵人。"
      },
      ult: {
        name: "狂暴阿賴耶識重錘連打",
        cd: 40,
        rageCost: 100,
        damage: 1020,
        type: "mace_crush",
        desc: "阿賴耶識限制器解除，雙眼綻放紅光，手持超大型鎚矛發動野獸般瘋狂連砸！"
      }
    },
    gadget: { name: "阿賴耶識超頻注射", desc: "以自身 10% 生命為代價，攻擊力提升 40%，持續 8 秒。" },
    starPower1: { name: "奈米積層裝甲", desc: "常駐免疫光束武器 30% 傷害。" },
    starPower2: { name: "惡魔之眼", desc: "攻擊命中處於霸體狀態的對手造成雙倍傷害。" },
    hypercharge: { name: "狼王帝王狂暴形態", desc: "大招附帶尾刃利刃撕裂，造成全場貫穿震裂。" },
    godAuraTitle: "厄祭狂狼"
  },

  // ── 5. 史詩 (粉階) ──
  {
    id: "thor",
    name: "雷神索爾",
    title: "阿斯嘉雷霆之神",
    series: "marvel",
    seriesName: "漫威",
    rarity: 5,
    cost: 38000,
    unlockCondition: "商店招募 (38,000 金幣)",
    role: "範圍雷電",
    baseHp: 1300,
    baseAtk: 175,
    baseDef: 70,
    speed: 6.4,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.8)",
    avatarType: "thor",
    skills: {
      skill1: {
        name: "雷神之鎚飛擲",
        cd: 3.2,
        damage: 290,
        type: "hammer_throw",
        desc: "擲出雷神之鎚妙爾尼爾穿透前方目標，並召喚其旋轉飛回。"
      },
      skill2: {
        name: "雷霆旋風",
        cd: 5.5,
        damage: 310,
        type: "lightning_spin",
        desc: "高速揮舞戰鎚引導雷暴，將周圍敵方捲入暴風中擊飛。"
      },
      ult: {
        name: "萬雷降臨神力召喚",
        cd: 42,
        rageCost: 100,
        damage: 1150,
        type: "god_thunder",
        desc: "雙眼綻放白金神雷，從天空召喚九道粗大天雷狂轟全圖，撕裂一切！"
      }
    },
    gadget: { name: "彩虹橋傳送衝擊", desc: "召喚彩虹橋從天而降砸擊目標區域並造成眩暈。" },
    starPower1: { name: "雷霆之神本源", desc: "所有雷電技能命中使對手陷入感電狀態 (每秒扣血 40 點)。" },
    starPower2: { name: "神之體魄", desc: "免疫眩暈與冰凍等所有硬控效果。" },
    hypercharge: { name: "風暴毀滅者召喚 (Stormbreaker)", desc: "大招同時揮舞風暴戰斧，召喚巨大雷霆龍捲風。" },
    godAuraTitle: "奧丁之子"
  },
  {
    id: "vegeta",
    name: "貝吉塔 (達爾)",
    title: "賽亞人高傲王子",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 5,
    cost: 38000,
    unlockCondition: "商店招募 (38,000 金幣)",
    role: "高速爆發",
    baseHp: 1200,
    baseAtk: 185,
    baseDef: 60,
    speed: 7.2,
    themeColor: "#2563eb",
    auraColor: "rgba(37, 99, 235, 0.8)",
    avatarType: "vegeta",
    skills: {
      skill1: {
        name: "連續氣功彈 (王子戰法)",
        cd: 3,
        damage: 300,
        type: "rapid_ki",
        desc: "雙手瘋狂發射密集的黃色氣彈雨，進行全方位狂轟爛炸。"
      },
      skill2: {
        name: "大爆炸攻擊 (Big Bang Attack)",
        cd: 6,
        damage: 340,
        type: "big_bang",
        desc: "單手手掌向前凝聚高密度能量球，轟出巨大爆炸光團。"
      },
      ult: {
        name: "最終閃光砲 (Final Flash)",
        cd: 42,
        rageCost: 100,
        damage: 1180,
        type: "final_flash",
        desc: "雙臂張開蓄滿全身金色氣焰，怒吼轟出遮天蔽日的毀滅黃金閃光柱！"
      }
    },
    gadget: { name: "賽亞人自尊爆發", desc: "強制打斷當前被控狀態並瞬間提升 50 點怒氣。" },
    starPower1: { name: "王族高傲", desc: "對血量高於自身的目標傷害提高 25%！" },
    starPower2: { name: "極速狂攻", desc: "普攻連擊速度提升 25%。" },
    hypercharge: { name: "深藍魔神閃光 (SSGSS Evolved)", desc: "大招變身超藍進化，最終閃光砲寬度與傷害擴大 50%。" },
    godAuraTitle: "賽亞戰皇"
  },
  {
    id: "exia_gundam",
    name: "能天使鋼彈 Exia",
    title: "天人七劍驅逐者",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 5,
    cost: 38000,
    unlockCondition: "商店招募 (38,000 金幣)",
    role: "極速連斬",
    baseHp: 1150,
    baseAtk: 190,
    baseDef: 55,
    speed: 8.2,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.8)",
    avatarType: "exia",
    skills: {
      skill1: {
        name: "GN 光束匕首投擲",
        cd: 2.5,
        damage: 260,
        type: "dagger_throw",
        desc: "極速投擲 2 枚高溫 GN 光束短匕首，造成減速。"
      },
      skill2: {
        name: "GN 實體劍突刺",
        cd: 5,
        damage: 320,
        type: "sword_pierce",
        desc: "展開巨大 GN 實體巨劍極速突刺，瞬間穿過對手防線。"
      },
      ult: {
        name: "Trans-AM 七劍連斬",
        cd: 40,
        rageCost: 100,
        damage: 1160,
        type: "transam_slash",
        desc: "Trans-AM 系統全面啟動！機體通體化作赤紅殘影，施展七劍極速連環絕殺！"
      }
    },
    gadget: { name: "GN 粒子干擾散佈", desc: "散佈高濃度 GN 粒子，5 秒內敵方無法使用任何技能。" },
    starPower1: { name: "七劍宗師", desc: "每次暴擊縮短所有技能冷卻時間 1 秒。" },
    starPower2: { name: "GN 粒子殘影", desc: "疾跑時獲得 20% 幾率完全迴避判定。" },
    hypercharge: { name: "Trans-AM 爆發超載模式", desc: "大招期間獲得完全無敵，連斬次數增加至 14 連擊。" },
    godAuraTitle: "天人斬神"
  },
  {
    id: "scarlet_witch",
    name: "緋紅女巫 (汪達)",
    title: "混沌魔法至尊",
    series: "marvel",
    seriesName: "漫威",
    rarity: 5,
    cost: 38000,
    unlockCondition: "商店招募 (38,000 金幣)",
    role: "控場法師",
    baseHp: 1100,
    baseAtk: 195,
    baseDef: 50,
    speed: 6.6,
    themeColor: "#e11d48",
    auraColor: "rgba(225, 29, 72, 0.8)",
    avatarType: "scarlet_witch",
    skills: {
      skill1: {
        name: "混沌能量球",
        cd: 3,
        damage: 280,
        type: "chaos_orb",
        desc: "投擲深紅混沌能量球，命中後向外擴散造成二次引爆。"
      },
      skill2: {
        name: "念力重壓摔擲",
        cd: 6,
        damage: 330,
        type: "telekinesis_slam",
        desc: "雙手浮空抓取目標懸至半空，隨後狠狠摜砸至地面。"
      },
      ult: {
        name: "現實扭曲全屏震盪",
        cd: 44,
        rageCost: 100,
        damage: 1200,
        type: "reality_warp",
        desc: "雙瞳泛起深紅混沌狂焰，撕裂現實維度，將全圖敵人壓制在維度重力中絞殺！"
      }
    },
    gadget: { name: "心靈操控混亂", desc: "使對手在 3 秒內移動方向顛倒，且無法施放技能。" },
    starPower1: { name: "混沌護盾", desc: "每施放一次技能獲得自身最大生命 10% 的混沌護盾。" },
    starPower2: { name: "現實篡改", desc: "普通攻擊有 20% 機率直接將對手擊退並造成破防。" },
    hypercharge: { name: "黑暗神書暴走", desc: "大招附帶全螢幕混沌黑紅閃電，造成額外 35% 毀滅傷害。" },
    godAuraTitle: "混沌女皇"
  },
  {
    id: "frieza_final",
    name: "弗利沙 (最終形態)",
    title: "宇宙帝王",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 5,
    cost: 38000,
    unlockCondition: "商店招募 (38,000 金幣)",
    role: "殘酷牽制",
    baseHp: 1220,
    baseAtk: 180,
    baseDef: 65,
    speed: 7.5,
    themeColor: "#9333ea",
    auraColor: "rgba(147, 51, 234, 0.8)",
    avatarType: "frieza",
    skills: {
      skill1: {
        name: "死亡指束 (瞬發)",
        cd: 2.2,
        damage: 250,
        type: "death_beam",
        desc: "食指射出極速瞬發的紫紅射線，穿透力極強，起手極快。"
      },
      skill2: {
        name: "念力巨石投砸",
        cd: 5.5,
        damage: 320,
        type: "telekinesis_rock",
        desc: "意念拔起巨型地表岩石，砸向對手引發範圍爆炸。"
      },
      ult: {
        name: "這顆星球就由我來毀滅彈",
        cd: 44,
        rageCost: 100,
        damage: 1220,
        type: "death_ball",
        desc: "單指凝聚遮天蔽日的黑色超級死滅彈砸向地面，引爆整顆星球的毀滅核光！"
      }
    },
    gadget: { name: "殘酷假死護盾", desc: "受致命傷害時進入 2 秒無敵狀態並反彈所有近戰傷害。" },
    starPower1: { name: "宇宙帝王之威", desc: "普攻命中使目標防禦力降低 5% (可疊加 5 層)。" },
    starPower2: { name: "極度自負", desc: "自身血量高於 80% 時，暴擊傷害提高 50%。" },
    hypercharge: { name: "黃金弗利沙變身 (Golden Frieza)", desc: "大招化身耀眼黃金形態，死滅彈轉為金光核融爆。" },
    godAuraTitle: "帝皇威壓"
  },
  {
    id: "god_gundam",
    name: "神威鋼彈",
    title: "爆熱神指格鬥王",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 5,
    cost: 38000,
    unlockCondition: "商店招募 (38,000 金幣)",
    role: "格鬥霸體",
    baseHp: 1280,
    baseAtk: 195,
    baseDef: 70,
    speed: 7.0,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.8)",
    avatarType: "god_gundam",
    skills: {
      skill1: {
        name: "神威烈火掌",
        cd: 3,
        damage: 290,
        type: "flame_palm",
        desc: "右手燃起高溫烈火突進衝掌，附加灼燒與擊飛。"
      },
      skill2: {
        name: "機關金剛拳",
        cd: 5,
        damage: 340,
        type: "machinegun_punch",
        desc: "展開背部翼板，施展每秒百拳的狂暴近身拳幕轟擊。"
      },
      ult: {
        name: "爆熱神威掌·石破天驚拳",
        cd: 42,
        rageCost: 100,
        damage: 1250,
        type: "sekiha_tenkyoken",
        desc: "背後展開超級光之日輪！雙手蓄滿熾熱愛心神力，怒吼轟出終極石破天驚拳！"
      }
    },
    gadget: { name: "超級明鏡止水", desc: "瞬間解除所有負面狀態，5 秒內常駐完全霸體。" },
    starPower1: { name: "流派東方不敗", desc: "近身格鬥傷害提升 25%，破防值提升 50%。" },
    starPower2: { name: "燃燒之心", desc: "生命值越低，蓄力攻擊蓄力時間越短 (最多縮短 70%)。" },
    hypercharge: { name: "真·石破LOVE天驚拳", desc: "大招召喚巨型金色巨人合力轟出，傷害提升 30%。" },
    godAuraTitle: "拳神尊者"
  },

  // ── 6. 傳奇 (金階) ──
  {
    id: "ssj3_goku",
    name: "超賽 3 孫悟空",
    title: "超越極限金髮戰神",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 6,
    cost: 78000,
    unlockCondition: "商店招募 (78,000 金幣)",
    role: "狂暴體術",
    baseHp: 1350,
    baseAtk: 220,
    baseDef: 70,
    speed: 7.8,
    themeColor: "#eab308",
    auraColor: "rgba(234, 179, 8, 0.85)",
    avatarType: "ssj3_goku",
    skills: {
      skill1: {
        name: "瞬間移動升龍拳",
        cd: 3,
        damage: 340,
        type: "instant_uppercut",
        desc: "瞬移至目標正下方施展驚天升龍拳，強制浮空對手。"
      },
      skill2: {
        name: "界王拳全開連打",
        cd: 5.5,
        damage: 400,
        type: "kaioken_rush",
        desc: "紅金氣焰交織，以肉眼難辨的速度發動 20 連擊體術重轟。"
      },
      ult: {
        name: "超級龍拳爆發 (天地貫穿)",
        cd: 45,
        rageCost: 100,
        damage: 1450,
        type: "dragon_fist",
        desc: "金龍狂嘯！悟空化身貫穿星辰的金色巨龍，全圖狂暴貫穿粉碎對手！"
      }
    },
    gadget: { name: "瞬間移動閃避", desc: "立即瞬移至對手正後方並獲得 1 秒無敵。" },
    starPower1: { name: "賽亞狂潮", desc: "連擊超過 15 次後，暴擊率提升至 100%，持續 3 秒。" },
    starPower2: { name: "神之氣息共鳴", desc: "技能命中時有 20% 機率直接返還 30 點怒氣。" },
    hypercharge: { name: "超賽 4 猿神覺醒", desc: "大招召喚狂暴紅猿與金龍合流，傷害增加 40%。" },
    godAuraTitle: "真·賽亞神武"
  },
  {
    id: "strike_freedom",
    name: "攻擊自由鋼彈",
    title: "金色骨架天罰之翼",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 6,
    cost: 78000,
    unlockCondition: "商店招募 (78,000 金幣)",
    role: "全方位射擊",
    baseHp: 1300,
    baseAtk: 230,
    baseDef: 75,
    speed: 8.0,
    themeColor: "#3b82f6",
    auraColor: "rgba(59, 130, 246, 0.85)",
    avatarType: "strike_freedom",
    skills: {
      skill1: {
        name: "光束軍刀雙刀流",
        cd: 3,
        damage: 350,
        type: "dual_saber",
        desc: "雙手持高能光束軍刀發動極速十字交叉斬。"
      },
      skill2: {
        name: "高能磁軌砲",
        cd: 5.5,
        damage: 410,
        type: "railgun_burst",
        desc: "腰部展開「旗魚 3」磁軌砲發射高貫穿超音速實體彈幕。"
      },
      ult: {
        name: "超級龍騎兵全發射 (全屏鎖定)",
        cd: 46,
        rageCost: 100,
        damage: 1500,
        type: "dragoon_full_burst",
        desc: "展開 8 枚超級龍騎兵浮游砲，配合腹部相轉移加農砲進行全方位無死角鎖定齊射！"
      }
    },
    gadget: { name: "光之盾陣列展開", desc: "產生覆蓋全身的立體光之盾，5 秒內反射所有遠程攻擊。" },
    starPower1: { name: "新人類五彩大砲", desc: "遠程技能每次命中多個目標時，冷卻時間縮短 2 秒。" },
    starPower2: { name: "SEED 爆種核心", desc: "血量低於 30% 時強制進入爆種狀態，攻速移速 +35%。" },
    hypercharge: { name: "全武裝極限流星裝備", desc: "大招召喚大型流星支援裝備轟出戰艦級光束！" },
    godAuraTitle: "自由之翼"
  },
  {
    id: "hulkbuster",
    name: "反浩克裝甲",
    title: "軌道衛星空投重裝",
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    cost: 78000,
    unlockCondition: "商店招募 (78,000 金幣)",
    role: "巨型重甲",
    baseHp: 1600,
    baseAtk: 215,
    baseDef: 95,
    speed: 5.2,
    themeColor: "#b91c1c",
    auraColor: "rgba(185, 28, 28, 0.85)",
    avatarType: "hulkbuster",
    skills: {
      skill1: {
        name: "液壓火箭重拳",
        cd: 3.2,
        damage: 360,
        type: "rocket_punch",
        desc: "重型液壓活塞噴射打出一記巨拳，直接將對手打飛至版邊。"
      },
      skill2: {
        name: "牽制修復力場",
        cd: 6.5,
        damage: 280,
        type: "repair_field",
        desc: "釋放電磁牽制力場限制對手，並召喚配件快速修復自身 250 點生命。"
      },
      ult: {
        name: "軌道衛星空投重裝連擊",
        cd: 46,
        rageCost: 100,
        damage: 1480,
        type: "veronica_drop",
        desc: "呼叫維羅妮卡天基衛星空投巨大裝甲模組連續砸擊地面，最後釋放超重型充能衝擊！"
      }
    },
    gadget: { name: "裝甲零件緊急替換", desc: "瞬間更換損壞肢體，立即清除硬直並恢復 20% 生命值。" },
    starPower1: { name: "泰坦裝甲厚度", desc: "免疫所有非破防技能的擊飛與打斷硬直。" },
    starPower2: { name: "液壓重擊破防", desc: "普通攻擊破防判定增加 100%。" },
    hypercharge: { name: "全功率方舟力場引爆", desc: "大招釋放方舟核心超臨界核爆，覆蓋整個畫面。" },
    godAuraTitle: "重裝守護神"
  },
  {
    id: "dr_strange",
    name: "奇異博士",
    title: "至尊魔法師",
    series: "marvel",
    seriesName: "漫威",
    rarity: 6,
    cost: 78000,
    unlockCondition: "商店招募 (78,000 金幣)",
    role: "空間干擾",
    baseHp: 1200,
    baseAtk: 235,
    baseDef: 60,
    speed: 6.8,
    themeColor: "#ea580c",
    auraColor: "rgba(234, 88, 12, 0.85)",
    avatarType: "dr_strange",
    skills: {
      skill1: {
        name: "賽托拉克的紅帶 (捆綁)",
        cd: 3.5,
        damage: 320,
        type: "magic_bind",
        desc: "召喚深紅魔法鎖鏈纏繞對手，使其定身 1.5 秒並持續受損。"
      },
      skill2: {
        name: "鏡像傳送門",
        cd: 5.5,
        damage: 300,
        type: "portal_strike",
        desc: "劃開金色傳送門，將敵方投射物或人直接轉移至空中砸下。"
      },
      ult: {
        name: "千手阿戈摩托之眼幻術",
        cd: 45,
        rageCost: 100,
        damage: 1520,
        type: "vishanti_strike",
        desc: "身後分化千手魔法法相，召喚鏡像維度碎裂空間，對目標進行多維度毀滅切割！"
      }
    },
    gadget: { name: "阿戈摩托之眼時間回溯", desc: "使對手動作時間減慢 80%，持續 3 秒。" },
    starPower1: { name: "魔導法陣結界", desc: "在場上留下魔法光陣，站於其上隊友技能 CD 縮短 20%。" },
    starPower2: { name: "維山帝神佑", desc: "受致命傷時化為蝴蝶幻影散開並滿血復活 (每場 1 次)。" },
    hypercharge: { name: "多元宇宙維度崩塌", desc: "大招轉化為多元維度摺疊，造成全屏純粹真實傷害。" },
    godAuraTitle: "至尊法聖"
  },
  {
    id: "cell_perfect",
    name: "沙魯 (完全體)",
    title: "完美生物終極兵器",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 6,
    cost: 78000,
    unlockCondition: "商店招募 (78,000 金幣)",
    role: "萬能拷貝",
    baseHp: 1320,
    baseAtk: 225,
    baseDef: 70,
    speed: 7.4,
    themeColor: "#16a34a",
    auraColor: "rgba(22, 163, 74, 0.85)",
    avatarType: "cell",
    skills: {
      skill1: {
        name: "龜派氣功 (拷貝)",
        cd: 3,
        damage: 350,
        type: "copied_kame",
        desc: "雙手蓄力轟出湛藍巨型氣功波，帶有強烈擊退與高傷害。"
      },
      skill2: {
        name: "瞬間移動魔貫光殺砲",
        cd: 5.5,
        damage: 420,
        type: "tp_beam",
        desc: "兩指點額瞬間移動至目標背後，近距離轟出魔貫光殺砲。"
      },
      ult: {
        name: "完美結界自爆釋放",
        cd: 46,
        rageCost: 100,
        damage: 1530,
        type: "perfect_barrier",
        desc: "展開耀眼金黃完美結界，將對手震至中心，隨後釋放足以摧毀太陽系的究極金光大爆發！"
      }
    },
    gadget: { name: "小沙魯分裂召喚", desc: "召喚 1 隻小沙魯自動追擊騷擾對手。" },
    starPower1: { name: "賽亞人瀕死突破", desc: "每從瀕死狀態（<20%血）恢復一次，攻擊力永久提升 20%。" },
    starPower2: { name: "短笛細胞超再生", desc: "受到傷害後 3 秒內緩慢回復該次傷害 30% 生命值。" },
    hypercharge: { name: "閃電沙魯超完美覺醒", desc: "周身環繞金色閃電，大招自爆傷害提升 35% 且無死角。" },
    godAuraTitle: "完美終結者"
  },
  {
    id: "oo_raiser",
    name: "00 強化模組 (00-R)",
    title: "雙爐同調量子變革",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 6,
    cost: 78000,
    unlockCondition: "商店招募 (78,000 金幣)",
    role: "粒子同調",
    baseHp: 1280,
    baseAtk: 240,
    baseDef: 65,
    speed: 8.5,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.85)",
    avatarType: "oo_raiser",
    skills: {
      skill1: {
        name: "GN 微型飛彈",
        cd: 2.8,
        damage: 330,
        type: "gn_missiles",
        desc: "O-Raiser 背包射出 8 枚高機動 GN 導彈追尾襲擊。"
      },
      skill2: {
        name: "雙重刃旋風",
        cd: 5,
        damage: 420,
        type: "twin_saber_spin",
        desc: "GN 巨劍 III 高速迴旋斬擊，形成青綠色粒子切割風暴。"
      },
      ult: {
        name: "Trans-AM Raiser 巨型光束巨劍 (Raiser Sword)",
        cd: 46,
        rageCost: 100,
        damage: 1550,
        type: "raiser_sword",
        desc: "Twin Drive 系統產能突破極限！伸長出長達數萬公里的超巨型光束巨劍縱向力劈！"
      }
    },
    gadget: { name: "量子化空間位移", desc: "化身純粹粒子消散，3 秒內完全無敵且可穿透對手。" },
    starPower1: { name: "雙爐拓撲缺陷同調", desc: "技能冷卻速度整體提升 20%。" },
    starPower2: { name: "純種變革者共感", desc: "自動看穿對手動作，格擋不會消耗任何格擋條。" },
    hypercharge: { name: "全刃式七劍極限粒子解放", desc: "大招巨劍化作七重天刃光柱，橫掃全圖。" },
    godAuraTitle: "量子之神"
  },

  // ── 7. 神話 (紅階) ──
  {
    id: "gogeta_blue",
    name: "超藍 悟吉塔",
    title: "神之領域究極合體",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 7,
    cost: 150000,
    unlockCondition: "商店招募 (150,000 金幣)",
    role: "神之氣息",
    baseHp: 1450,
    baseAtk: 260,
    baseDef: 75,
    speed: 8.5,
    themeColor: "#06b6d4",
    auraColor: "rgba(6, 182, 212, 0.9)",
    avatarType: "gogeta",
    skills: {
      skill1: {
        name: "神聖狂風踢",
        cd: 3,
        damage: 420,
        type: "holy_kick",
        desc: "神聖藍氣纏繞腿部施展殘影四連迴旋踢，空中壓制極強。"
      },
      skill2: {
        name: "懲罰者破壞球 (Punisher Drive)",
        cd: 5.2,
        damage: 480,
        type: "punisher_drive",
        desc: "極速閃爍穿梭於對手周身，留下十數道湛藍爆裂能量球。"
      },
      ult: {
        name: "靈魂破壞者 (Stardust Breaker)",
        cd: 48,
        rageCost: 100,
        damage: 1850,
        type: "stardust_breaker",
        desc: "手中凝聚七彩星塵光球拋向對手，在目標體內引爆淨化一切邪惡的彩虹核爆！"
      }
    },
    gadget: { name: "神之氣息震懾", desc: "震碎全屏投射物並使對手陷入 1.5 秒絕望僵直。" },
    starPower1: { name: "融合術完美體", desc: "常駐獲得 15% 傷害減免與 20% 全屬性提升。" },
    starPower2: { name: "神境威壓", desc: "怒氣累積速度提升 35%。" },
    hypercharge: { name: "終極龜派氣功全開", desc: "大招後追加全屏超藍終極龜派氣功，傷害暴增 40%。" },
    godAuraTitle: "究極合體神"
  },
  {
    id: "kshatriya",
    name: "剎帝利 (大青椒)",
    title: "四翼複合大型浮游機",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 7,
    cost: 150000,
    unlockCondition: "商店招募 (150,000 金幣)",
    role: "浮游砲陣列",
    baseHp: 1550,
    baseAtk: 250,
    baseDef: 90,
    speed: 6.2,
    themeColor: "#15803d",
    auraColor: "rgba(21, 128, 61, 0.9)",
    avatarType: "kshatriya",
    skills: {
      skill1: {
        name: "四片複合防禦翼展開",
        cd: 3.5,
        damage: 400,
        type: "wing_slam",
        desc: "四片大型複合翼向前閉合夾擊，具備反彈遠程攻擊與高額擊飛。"
      },
      skill2: {
        name: "飛彈齊射",
        cd: 5.5,
        damage: 460,
        type: "pod_missiles",
        desc: "翼部內藏多聯裝飛彈全數噴射，形成覆蓋半屏的爆炸火網。"
      },
      ult: {
        name: "24 枚浮游砲全域十字交火",
        cd: 48,
        rageCost: 100,
        damage: 1800,
        type: "funnel_storm",
        desc: "釋放 24 枚感應浮游砲布滿整個戰場，以超高頻率進行無死角十字光束光網絞殺！"
      }
    },
    gadget: { name: "I-Field 能量力場全開", desc: "5 秒內吸收所有光束傷害並轉化為自身生命值。" },
    starPower1: { name: "重裝四翼抗性", desc: "受到任何正面攻擊時減傷 40%。" },
    starPower2: { name: "感應兵器精通", desc: "浮游砲攻擊有 25% 機率造成對手麻痺 0.5 秒。" },
    hypercharge: { name: "超級光束加農砲超載", desc: "胸部四門高能米加粒子砲同步轟擊，貫穿全場。" },
    godAuraTitle: "森羅青椒"
  },
  {
    id: "loki_god_of_stories",
    name: "時間之神 洛基",
    title: "故事之神·時間盡頭",
    series: "marvel",
    seriesName: "漫威",
    rarity: 7,
    cost: 150000,
    unlockCondition: "商店招募 (150,000 金幣)",
    role: "幻象分身",
    baseHp: 1380,
    baseAtk: 265,
    baseDef: 70,
    speed: 7.6,
    themeColor: "#16a34a",
    auraColor: "rgba(22, 163, 74, 0.9)",
    avatarType: "loki",
    skills: {
      skill1: {
        name: "幻影分身替身術",
        cd: 3.2,
        damage: 390,
        type: "illusion_tp",
        desc: "在原地留下幻影並瞬移至敵後，幻影爆炸造成眩暈與傷害。"
      },
      skill2: {
        name: "時間絲線纏繞",
        cd: 5.5,
        damage: 450,
        type: "time_threads",
        desc: "雙手拉扯綠色時間光線束縛對手，強制暫停其技能 CD 4 秒。"
      },
      ult: {
        name: "時間盡頭·命運編織",
        cd: 48,
        rageCost: 100,
        damage: 1880,
        type: "time_tree",
        desc: "手握億萬條世界線走上時間王座！綠色時間神力貫穿寰宇，將對手打回時間荒原毀滅！"
      }
    },
    gadget: { name: "時間倒流結界", desc: "將自身生命值重置回 5 秒前的最高狀態。" },
    starPower1: { name: "惡作劇神格", desc: "閃避成功時在原地自動召喚 1 個攻擊敵人的幻影。" },
    starPower2: { name: "光陰之主", desc: "對手處於受控狀態時，自身對其造成的傷害增加 35%。" },
    hypercharge: { name: "世界樹王座冠冕", desc: "大招時間樹光輝閃耀，直接封印敵方援護技 15 秒。" },
    godAuraTitle: "時間神王"
  },
  {
    id: "kid_buu",
    name: "魔人普烏 (純粹)",
    title: "宇宙毀滅原初魔物",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 7,
    cost: 150000,
    unlockCondition: "商店招募 (150,000 金幣)",
    role: "不死再生",
    baseHp: 1500,
    baseAtk: 255,
    baseDef: 80,
    speed: 8.0,
    themeColor: "#ec4899",
    auraColor: "rgba(236, 72, 153, 0.9)",
    avatarType: "kid_buu",
    skills: {
      skill1: {
        name: "變形糖果光線",
        cd: 4,
        damage: 380,
        type: "candy_beam",
        desc: "頭頂觸角射出粉紅光線，將對手變成巧克力糖果 2 秒（無法攻擊與移動）。"
      },
      skill2: {
        name: "狂暴肉彈戰車",
        cd: 5.5,
        damage: 460,
        type: "rolling_smash",
        desc: "蜷縮成粉紅巨球在地面與牆壁高速彈射反覆碾壓敵人。"
      },
      ult: {
        name: "超級特大毀滅彈 (Planet Burst)",
        cd: 48,
        rageCost: 100,
        damage: 1900,
        type: "planet_burst",
        desc: "高舉雙手凝聚出直徑數十米的暗粉紅毀滅死星，大笑著砸向地面摧毀整片次元！"
      }
    },
    gadget: { name: "無限肉身分裂", desc: "受到致命傷時化身為無數肉塊，在戰場角落滿血重生 (每場 1 次)。" },
    starPower1: { name: "原初魔人體質", desc: "每秒自動回復 2% 最大生命值，且免疫所有負面減速。" },
    starPower2: { name: "瘋狂狂亂打擊", desc: "普通攻擊每次命中造成 10% 額外真實傷害。" },
    hypercharge: { name: "魔化粉紅蒸氣暴走", desc: "大招釋放前噴射全屏毀滅蒸氣，造成多段穿透擊退。" },
    godAuraTitle: "原初魔尊"
  },
  {
    id: "crossbone_x1_fc",
    name: "海盜鋼彈 X1 全覆式",
    title: "骷髏狂刀海盜戰神",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 7,
    cost: 150000,
    unlockCondition: "商店招募 (150,000 金幣)",
    role: "斬擊刺客",
    baseHp: 1350,
    baseAtk: 275,
    baseDef: 70,
    speed: 8.6,
    themeColor: "#475569",
    auraColor: "rgba(71, 85, 105, 0.9)",
    avatarType: "crossbone",
    skills: {
      skill1: {
        name: "雀屏碎擊弩",
        cd: 3,
        damage: 420,
        type: "peacock_smasher",
        desc: "手持扇形雀屏碎擊弩射出 9 道散射高能光束。"
      },
      skill2: {
        name: "骷髏粒子砲",
        cd: 5,
        damage: 490,
        type: "skull_blaster",
        desc: "肩部骷髏核心推進器展開，釋放超高溫米加粒子衝擊。"
      },
      ult: {
        name: "螺旋鋼鞭村正狂刀",
        cd: 46,
        rageCost: 100,
        damage: 1890,
        type: "murasama_slashes",
        desc: "村正狂刀 14 把光束刃全開！以狂暴骷髏斬擊風暴將對手切成無數光刃碎片！"
      }
    },
    gadget: { name: "全覆式裝甲脫卸", desc: "爆散外層重裝甲，移速瞬間提升 60% 且下次攻擊必定暴擊。" },
    starPower1: { name: "海盜狂熱刃", desc: "斬擊武器暴擊傷害提升 50%。" },
    starPower2: { name: "熱能烙鐵短刀", desc: "抓技與近身技能可強制摧毀對手 25% 防禦裝甲。" },
    hypercharge: { name: "生化電腦極限解放", desc: "大招附帶金色骷髏氣浪，最後一擊產生核爆級光束切斷。" },
    godAuraTitle: "骷髏劍王"
  },

  // ── 8. 幻界 (彩階) ──
  {
    id: "vegito_blue",
    name: "超藍·貝吉特",
    title: "波特拉耳環神之無敵",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 8,
    cost: 360000,
    unlockCondition: "商店招募 (360,000 金幣)",
    role: "絕對無敵",
    baseHp: 1600,
    baseAtk: 310,
    baseDef: 85,
    speed: 8.8,
    themeColor: "#0284c7",
    auraColor: "rgba(2, 132, 199, 0.95)",
    avatarType: "vegito",
    skills: {
      skill1: {
        name: "終極巨劍刺擊 (Spirit Sword)",
        cd: 3,
        damage: 520,
        type: "spirit_sword",
        desc: "單手凝聚出數十米長金色氣劍橫空刺穿對手並將其狠狠摔砸！"
      },
      skill2: {
        name: "擴散指束彈",
        cd: 5,
        damage: 580,
        type: "scatter_finger_beams",
        desc: "雙手五指齊張，射出十道藍白交叉雷光射線穿透全場。"
      },
      ult: {
        name: "最終龜派氣功 (Final Kamehameha)",
        cd: 50,
        rageCost: 100,
        damage: 2300,
        type: "final_kamehameha",
        desc: "最終閃光砲與龜派氣功的終極融合！雙臂拉開釋放毀滅宇宙的藍金混色巨神光柱！"
      }
    },
    gadget: { name: "這就是貝吉特的力量！", desc: "3 秒內免疫所有攻擊並使下次技能傷害翻倍。" },
    starPower1: { name: "無可匹敵的傲慢", desc: "每次攻擊命中時扣除目標 10 點怒氣。" },
    starPower2: { name: "耳環永恆力量", desc: "怒氣達到 100% 時，所有技能傷害額外提升 30%。" },
    hypercharge: { name: "神之絕對次元裂解砲", desc: "大招附帶神域時空震盪，撕碎螢幕所有敵對單位。" },
    godAuraTitle: "寰宇無敵至尊"
  },
  {
    id: "destiny_spec2",
    name: "命運鋼彈 (Spec II)",
    title: "赤紅光翼全武裝極速",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 8,
    cost: 360000,
    unlockCondition: "商店招募 (360,000 金幣)",
    role: "全武裝高速",
    baseHp: 1550,
    baseAtk: 320,
    baseDef: 80,
    speed: 9.0,
    themeColor: "#dc2626",
    auraColor: "rgba(220, 38, 38, 0.95)",
    avatarType: "destiny",
    skills: {
      skill1: {
        name: "光之翼極速突進",
        cd: 2.8,
        damage: 510,
        type: "wings_dash",
        desc: "背部展開幻影光之翼以超光速殘影穿梭突進，造成多重斬擊。"
      },
      skill2: {
        name: "掌中槍衝擊波 (Palma Fiocina)",
        cd: 5,
        damage: 590,
        type: "palma_fiocina",
        desc: "掌心直接按住目標面門，零距離引爆高能光束掌中槍！"
      },
      ult: {
        name: "亞隆戴特巨劍全開斬",
        cd: 48,
        rageCost: 100,
        damage: 2250,
        type: "arondight_combo",
        desc: "拔出超長對艦刀「亞隆戴特」，配合光之翼分身展開全螢幕十字幻影極限狂斬！"
      }
    },
    gadget: { name: "幻影分身狂嵐", desc: "召喚 3 具實體殘影分身同步施展普攻 5 秒。" },
    starPower1: { name: "殘影光之翼", desc: "移動與疾跑時常駐獲得 30% 迴避率。" },
    starPower2: { name: "復仇意志", desc: "隊友每陣亡一人，自身暴擊率 +15%，攻擊力 +15%。" },
    hypercharge: { name: "宙斯裝備衛星加農砲", desc: "大招呼叫天基宙斯導彈裝備轟出巨大軌道爆破！" },
    godAuraTitle: "命運主宰"
  },
  {
    id: "strange_supreme",
    name: "黑化奇異博士",
    title: "吞噬萬物黑化至尊",
    series: "marvel",
    seriesName: "漫威",
    rarity: 8,
    cost: 360000,
    unlockCondition: "商店招募 (360,000 金幣)",
    role: "異界吞噬",
    baseHp: 1520,
    baseAtk: 330,
    baseDef: 75,
    speed: 7.8,
    themeColor: "#581c87",
    auraColor: "rgba(88, 28, 135, 0.95)",
    avatarType: "strange_supreme",
    skills: {
      skill1: {
        name: "召喚遠古觸手",
        cd: 3,
        damage: 530,
        type: "ancient_tentacles",
        desc: "從虛空撕裂維度裂縫，召喚數十條紫黑遠古觸手瘋狂抽打抓取對手。"
      },
      skill2: {
        name: "吞噬能量護盾",
        cd: 5.5,
        damage: 480,
        type: "absorb_shield",
        desc: "張開暗黑吞噬之口，將對手施放的所有投射物與技能能量吞噬並轉化為自身攻擊力。"
      },
      ult: {
        name: "絕對時間點崩塌大術",
        cd: 50,
        rageCost: 100,
        damage: 2350,
        type: "time_collapse",
        desc: "強行逆轉不可改變的絕對時間點！暗黑神力撕裂整個宇宙，黑洞吞噬所有維度生靈！"
      }
    },
    gadget: { name: "吞噬魔獸巨力", desc: "立即吞噬一隻異界魔獸，使自身生命上限提升 30% 並回滿血。" },
    starPower1: { name: "千魔同體", desc: "每次施放技能後使下一擊技能傷害提升 25% (可疊加 3 層)。" },
    starPower2: { name: "因果逆轉", desc: "受到大於自身 20% 生命的單次傷害時，將該傷害 50% 反彈給攻擊者。" },
    hypercharge: { name: "巨型九頭蛇魔神降臨", desc: "大招召喚遮天蔽日的異次元魔神法相合擊，威力提升 35%。" },
    godAuraTitle: "滅世魔尊"
  },
  {
    id: "broly_legendary",
    name: "傳奇超賽 布羅利",
    title: "無限暴走綠焰巨獸",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 8,
    cost: 360000,
    unlockCondition: "商店招募 (360,000 金幣)",
    role: "狂暴巨獸",
    baseHp: 1800,
    baseAtk: 340,
    baseDef: 85,
    speed: 7.2,
    themeColor: "#22c55e",
    auraColor: "rgba(34, 197, 94, 0.95)",
    avatarType: "broly",
    skills: {
      skill1: {
        name: "巨型爆發衝擊 (Gigantic Charge)",
        cd: 3.2,
        damage: 550,
        type: "broly_charge",
        desc: "全身包裹狂暴綠色氣焰向前蠻橫狂衝，自帶極強霸體碾碎沿途一切阻礙！"
      },
      skill2: {
        name: "碎面拖行砸地 (Eraser Cannon)",
        cd: 5.5,
        damage: 610,
        type: "face_slam",
        desc: "大手直接抓住對手的臉龐在地面狂暴拖行數十米後凌空重摔爆破！"
      },
      ult: {
        name: "巨型毀滅巨星 (全圖洗地)",
        cd: 52,
        rageCost: 100,
        damage: 2450,
        type: "gigantic_meteor",
        desc: "仰天怒吼釋放無盡綠色氣焰！手中凝聚一顆填滿整個畫面的巨型綠色滅世光球洗地毀滅！"
      }
    },
    gadget: { name: "狂暴綠焰震天咆哮", desc: "震碎周圍一切屏障，5 秒內受到的所有傷害降低 70%。" },
    starPower1: { name: "傳奇賽亞人之血", desc: "戰鬥時間每過 1 秒，自身攻擊力永久 +1% (無上限)。" },
    starPower2: { name: "無限體力", desc: "受擊時怒氣獲取量翻倍。" },
    hypercharge: { name: "超越極限全功率狂暴", desc: "身形再度膨脹，大招滅世光球傷害提升 40% 並造成持續火海。" },
    godAuraTitle: "傳奇戰神"
  },

  // ── ★ 9. 創世/概念級 (GENESIS) ──
  {
    id: "thanos_gauntlet",
    name: "滅霸 (六石無限手套)",
    title: "天命毀滅主宰",
    series: "marvel",
    seriesName: "漫威",
    rarity: 9,
    cost: "不可購買",
    unlockCondition: "[極限挑戰] PVE 極限難度「無限之戰」一命無陣亡單人通關解鎖",
    isNonPurchasable: true,
    role: "全能破壞神",
    baseHp: 2000,
    baseAtk: 400,
    baseDef: 100,
    speed: 7.5,
    themeColor: "#8b5cf6",
    auraColor: "rgba(139, 92, 246, 1)",
    avatarType: "thanos",
    skills: {
      skill1: {
        name: "時間寶石回溯自癒",
        cd: 4,
        damage: 600,
        type: "time_rewind",
        desc: "綠色時間寶石光芒綻放，瞬間重創對手並倒流自身時間回復 300 點生命值。"
      },
      skill2: {
        name: "力量寶石滅世震波",
        cd: 6,
        damage: 750,
        type: "power_surge",
        desc: "紫光一閃，拳頭砸向地面釋放行星級破壞震波，直接震碎敵方所有格擋。"
      },
      ult: {
        name: "無限響指 (直接扣除 50% 全體血量)",
        cd: 60,
        rageCost: 100,
        damage: 3200,
        type: "snap_wipe",
        desc: "六顆無限寶石同時綻放耀眼光芒！滅霸輕輕打出一個響指——直接湮滅敵方當前 50% 生命值並引發全屏宇宙塵埃湮滅！"
      }
    },
    gadget: { name: "空間寶石虛空傳送", desc: "劃破空間將對手強制放逐至虛空 2 秒。" },
    starPower1: { name: "我是天命 (I Am Inevitable)", desc: "生命值低於 20% 時免疫死亡 3 秒，並直接回滿怒氣。" },
    starPower2: { name: "靈魂寶石審判", desc: "普通攻擊命中時吸收目標 10% 造成傷害轉化為生命值。" },
    hypercharge: { name: "宇宙之心概念抹除", desc: "響指附加靈魂抹除，直接斬殺生命低於 25% 的敵方角色。" },
    godAuraTitle: "天命神帝"
  },
  {
    id: "goku_ultra_instinct",
    name: "自在極意功 (極) 悟空",
    title: "神之極致銀瞳戰神",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 9,
    cost: "不可購買",
    unlockCondition: "[天梯登頂] PVP 天梯達到「傳奇宗師」段位 或 累計 150 場勝利解鎖",
    isNonPurchasable: true,
    role: "神之極致",
    baseHp: 1900,
    baseAtk: 420,
    baseDef: 90,
    speed: 9.8,
    themeColor: "#cbd5e1",
    auraColor: "rgba(203, 213, 225, 1)",
    avatarType: "goku_ui",
    skills: {
      skill1: {
        name: "自動閃避真空拳",
        cd: 3,
        damage: 650,
        type: "ui_counter",
        desc: "身軀完全交由本能引導，自動閃避敵方正面攻擊並以神速真空拳反打貫穿！"
      },
      skill2: {
        name: "神速反擊衝擊波",
        cd: 5,
        damage: 780,
        type: "ui_blast",
        desc: "身形化作銀白流光突進，近身瞬間釋放銀白神之衝擊波震飛對手。"
      },
      ult: {
        name: "神之領域氣息爆發 (銀白神拳)",
        cd: 55,
        rageCost: 100,
        damage: 3300,
        type: "ui_supreme_burst",
        desc: "周身升騰起銀白神之熱度氣焰！化身神之領域，瞬移在全屏發動數千拳銀光打擊，最後以神之一拳終結一切！"
      }
    },
    gadget: { name: "自在極意本能覺醒", desc: "5 秒內完全自動迴避所有普通攻擊與飛行道具。" },
    starPower1: { name: "極之本能", desc: "常駐 35% 閃避率，閃避後 1 秒內必定打出 200% 暴擊。" },
    starPower2: { name: "神之御意", desc: "不受任何硬直、擊倒與擊飛效果影響。" },
    hypercharge: { name: "巨大化氣息神像顯現", desc: "大招身後凝聚萬丈神之氣息法相，一拳轟碎天地。" },
    godAuraTitle: "極意神主"
  },
  {
    id: "unicorn_crystal",
    name: "獨角獸鋼彈 (神化結晶)",
    title: "扭曲時間感應骨架神話",
    series: "gundam",
    seriesName: "鋼彈",
    rarity: 9,
    cost: "不可購買",
    unlockCondition: "[每週收集] 累計收集 15 顆「感應骨架結晶」(每週 Boss 隨機掉落)",
    isNonPurchasable: true,
    role: "概念級機體",
    baseHp: 1950,
    baseAtk: 410,
    baseDef: 95,
    speed: 9.2,
    themeColor: "#10b981",
    auraColor: "rgba(16, 185, 129, 1)",
    avatarType: "unicorn_crystal",
    skills: {
      skill1: {
        name: "感應力場全彈吸收",
        cd: 3.5,
        damage: 620,
        type: "psycho_absorb",
        desc: "翠綠色感應力場展開，瞬間吞噬前方所有彈幕並化為光粒子反彈回去。"
      },
      skill2: {
        name: "波動粒子手刀",
        cd: 5.2,
        damage: 760,
        type: "psycho_chop",
        desc: "右手化作結晶神刃揮下手刀，直接將空間切開一道感應裂縫。"
      },
      ult: {
        name: "扭曲時間之光束重組 (時間倒流神跡)",
        cd: 55,
        rageCost: 100,
        damage: 3250,
        type: "time_reversal_beam",
        desc: "揮手展現時間倒流奇蹟！將對手機體分解倒退至出廠零件狀態，造成概念級空間崩壞！"
      }
    },
    gadget: { name: "神化結晶防護壁", desc: "周身生長出巨大綠色結晶刺，免疫一切傷害持續 4 秒。" },
    starPower1: { name: "新人類終極神髓", desc: "所有攻擊附帶 20% 概念真實傷害，無視敵方一切防禦力。" },
    starPower2: { name: "時光同調反應", desc: "每次受到傷害有 25% 機率使對手技能 CD 增加 2 秒。" },
    hypercharge: { name: "超越次元的暖光", desc: "大招釋放覆蓋宇宙的溫暖彩虹光輝，敵方全員攻擊力削弱 50%。" },
    godAuraTitle: "神化獨角獸"
  },
  {
    id: "jiren_full_power",
    name: "吉連 (全力量暴走)",
    title: "絕對正義無敵之壁",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 9,
    cost: "不可購買",
    unlockCondition: "[神級成就] 在 5v5 模式中達成「單人 1 穿 5 不換人」全勝戰績解鎖",
    isNonPurchasable: true,
    role: "絕對之壁",
    baseHp: 2200,
    baseAtk: 430,
    baseDef: 110,
    speed: 7.8,
    themeColor: "#ef4444",
    auraColor: "rgba(239, 68, 68, 1)",
    avatarType: "jiren",
    skills: {
      skill1: {
        name: "意念凝視破防衝擊",
        cd: 3,
        damage: 680,
        type: "glare_strike",
        desc: "僅憑雙眼神念凝視，便在空氣中引發無形破空衝擊，強制擊碎一切格擋！"
      },
      skill2: {
        name: "熾熱磁氣能量風暴",
        cd: 5,
        damage: 820,
        type: "magnetron_storm",
        desc: "全身燃起赤紅熾熱如太陽般的狂暴氣焰，雙拳轟出無數狂熱拳壓。"
      },
      ult: {
        name: "超絕毀滅力量大碰撞 (Overheat Magnetron)",
        cd: 55,
        rageCost: 100,
        damage: 3400,
        type: "jiren_overheat",
        desc: "將全身肌肉與力量催生至超絕極限！單手托起一顆超巨型赤紅微型太陽砸向目標，毀滅整片戰場！"
      }
    },
    gadget: { name: "不可撼動之壁", desc: "進入 6 秒絕對霸體狀態，期間防禦力提升 100%。" },
    starPower1: { name: "常駐全身霸體", desc: "普通攻擊與小招無法打斷吉連的任何出招動作。" },
    starPower2: { name: "力量即是正義", desc: "攻擊力額外獲得當前剩餘防禦力 50% 的加成。" },
    hypercharge: { name: "超越破壞神的熱量", desc: "大招赤紅太陽膨脹一倍，全圖地面持續燃燒熾熱熔岩。" },
    godAuraTitle: "絕對無敵壁"
  },
  {
    id: "beerus",
    name: "破壞神 比魯斯",
    title: "第七宇宙毀滅之神",
    series: "dragonball",
    seriesName: "七龍珠",
    rarity: 9,
    cost: "不可購買",
    unlockCondition: "[挑戰極限] 單人無傷通關「魔王 Rush 挑戰」第 10 層解鎖",
    isNonPurchasable: true,
    role: "神界處決者",
    baseHp: 1950,
    baseAtk: 440,
    baseDef: 95,
    speed: 8.8,
    themeColor: "#9333ea",
    auraColor: "rgba(147, 51, 234, 1)",
    avatarType: "beerus",
    skills: {
      skill1: {
        name: "彈指能量衝擊",
        cd: 2.8,
        damage: 660,
        type: "finger_flick",
        desc: "優雅地輕彈食指，轟出一道直徑數米的紫色破壞神風暴直接將對手擊飛。"
      },
      skill2: {
        name: "破壞神之怒氣場",
        cd: 5,
        damage: 800,
        type: "god_wrath",
        desc: "周身爆發深紫破壞神神力氣場，震碎周圍一切物質。"
      },
      ult: {
        name: "毀滅奧義「破壞 (Hakai)」",
        cd: 55,
        rageCost: 100,
        damage: 3500,
        type: "hakai_execution",
        desc: "單手手掌平伸，淡淡吐出「破壞（Hakai）」二字——目標全身被紫色神火吞噬，直接概念級灰飛煙滅！"
      }
    },
    gadget: { name: "美食渴望狂暴", desc: "享用美味布丁，瞬間回滿 50% 生命值並增加 50% 怒氣。" },
    starPower1: { name: "破壞神域威嚴", desc: "靠近比魯斯的敵方每秒受到 50 點破壞神力真實侵蝕傷害。" },
    starPower2: { name: "神性傲慢", desc: "暴擊率提升 25%，暴擊傷害提升 50%。" },
    hypercharge: { name: "超特大破壞神毀滅球", desc: "大招召喚巨型紫色破壞日輪，直接湮滅敵方場上所有護盾。" },
    godAuraTitle: "第七宇宙破壞神"
  },
  {
    id: "kang_quantum",
    name: "量子之神 征服者康",
    title: "多元宇宙時空統治者",
    series: "marvel",
    seriesName: "漫威",
    rarity: 9,
    cost: "不可購買",
    unlockCondition: "[累積成就] 累計在 PVP 造成 500 萬點總戰鬥傷害解鎖",
    isNonPurchasable: true,
    role: "時空統治者",
    baseHp: 1980,
    baseAtk: 425,
    baseDef: 95,
    speed: 8.0,
    themeColor: "#059669",
    auraColor: "rgba(5, 150, 105, 1)",
    avatarType: "kang",
    skills: {
      skill1: {
        name: "重力反轉力場",
        cd: 3,
        damage: 640,
        type: "gravity_flip",
        desc: "操縱量子重力將對手拋向高空並重重砸下，使其滯空 1.5 秒。"
      },
      skill2: {
        name: "召喚時空軍隊突襲",
        cd: 5.5,
        damage: 790,
        type: "quantum_army",
        desc: "打開 3 道時空門，召喚未來變體戰士手持量子武器集火掃射。"
      },
      ult: {
        name: "量子超空間湮滅光束",
        cd: 55,
        rageCost: 100,
        damage: 3350,
        type: "quantum_erasure",
        desc: "手中啟動時間要塞王座核心！釋放橫貫多元宇宙的藍綠量子光束矩陣，將對手從時間線上抹除！"
      }
    },
    gadget: { name: "多元變體替換", desc: "陣亡瞬間從平行宇宙拉來另一個滿血康繼續戰鬥 (每場 1 次)。" },
    starPower1: { name: "時空支配者", desc: "每擊敗一個敵方單位，自身全屬性提升 15% (可疊加)。" },
    starPower2: { name: "量子裝甲矩陣", desc: "受到的所有傷害減少 25%。" },
    hypercharge: { name: "征服者無盡帝國艦隊", desc: "大招呼叫時空戰艦從次元裂縫轟出軌道量子天火。" },
    godAuraTitle: "多元征服者"
  }
];

// ─── 為 45 位角色注入差異化招式設定與飛行能力 (Character Action Profiles & Flight Mode) ───
const FLIGHT_ENABLED_HEROES = [
  "ironman_mk50", "hulkbuster", "thor", "scarlet_witch", "dr_strange", "dr_strange_supreme",
  "loki_god", "thanos_gauntlet", "kang",
  "rx78_2", "char_zaku2", "wing_zero", "barbatos_lupus", "exia", "god_gundam",
  "strike_freedom", "oo_raiser", "kshatriya", "crossbone_x1", "destiny_specii", "unicorn_crystal",
  "piccolo", "trunks_future", "vegeta", "frieza_final", "ssj3_goku", "cell_perfect",
  "gogeta_blue", "kid_buu", "vegito_blue", "broly_lssj", "thanos_gauntlet",
  "goku_ultra_instinct", "jiren_fullpower", "beerus_god"
];

CHARACTERS_DATA.forEach(c => {
  c.canFly = FLIGHT_ENABLED_HEROES.includes(c.id);

  let lightName = "普通拳腳連擊";
  let heavyName = "蓄力破防重擊";
  let grabName = "近身抓技摔投";
  let flightName = c.canFly ? (c.series === "gundam" ? "推進器升空飛行" : (c.series === "dragonball" ? "舞空術飛行" : "懸浮噴射飛行")) : null;

  if (c.series === "gundam") {
    lightName = "光束軍刀連續斬擊";
    heavyName = "光束步槍高能破防";
    grabName = "盾牌擒抱撞摔";
  } else if (c.series === "dragonball") {
    lightName = "龜派體術連續打擊";
    heavyName = "氣合爆發破防";
    grabName = "瞬間移動重摔";
  } else if (c.id === "cap_america") {
    lightName = "振金盾牌格鬥連擊";
    heavyName = "盾牌迴旋投擲破防";
    grabName = "特工擒拿抱摔";
  } else if (c.id === "spiderman_classic") {
    lightName = "蛛絲體術連續打擊";
    heavyName = "高壓蛛網纏繞破防";
    grabName = "蛛絲風車甩投";
  } else if (c.id === "hulk" || c.id === "hulkbuster") {
    lightName = "泰坦重拳連續轟擊";
    heavyName = "浩克砸地衝擊破防";
    grabName = "狂暴抓摔狂砸 (Smash)";
  } else if (c.id === "ironman_mk50") {
    lightName = "掌心脈衝雷射連擊";
    heavyName = "胸口單束光砲破防";
    grabName = "推進器火箭擒摔";
  } else if (c.id === "thor") {
    lightName = "妙爾尼爾雷霆重擊";
    heavyName = "召喚九界天雷破防";
    grabName = "雷神之握重摔";
  } else if (c.id === "thanos_gauntlet") {
    lightName = "無限手套泰坦連續拳";
    heavyName = "力量寶石紫光破防";
    grabName = "空間重力粉碎摔";
  }

  c.attackConfig = {
    light: { name: lightName, icon: "fa-hand-fist", key: "J" },
    heavy: { name: heavyName, icon: "fa-hammer", key: "K" },
    grab: { name: grabName, icon: "fa-hand", key: "O" },
    skill1: { name: c.skills.skill1.name, icon: "fa-bolt", key: "U", cd: c.skills.skill1.cd },
    skill2: { name: c.skills.skill2.name, icon: "fa-meteor", key: "I", cd: c.skills.skill2.cd },
    ult: { name: c.skills.ult.name, icon: "fa-dragon", key: "L", cd: c.skills.ult.cd },
    flight: c.canFly ? { name: flightName, icon: "fa-plane-departure", key: "F" } : null
  };
});

if (typeof window !== "undefined") {
  window.RARITY_TIERS = RARITY_TIERS;
  window.CHARACTERS_DATA = CHARACTERS_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { RARITY_TIERS, CHARACTERS_DATA };
}
