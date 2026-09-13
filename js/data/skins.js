/**
 * 《CyberStriker: Quantum Arena》
 * 15 大外觀造型與專屬打擊視覺特效 (VFX) 映射表
 * 
 * 核心原則：所有外觀的物理受擊盒 (Hurtbox) 與判定盒 (Hitbox) 精確至像素級 100% 相同，
 * 僅造型塗裝、光影色彩與招式專屬 VFX 特效分離獨立渲染。
 */

export const SKINS = [
  // ── 3 套初始預設外觀 ──
  {
    id: 'skin_cyber_warrior',
    name: '賽博武者',
    title: '全息前線尖兵',
    category: 'default',
    series: '經典先鋒',
    price: 0,
    isDefault: true,
    themeColor: '#00f3ff',
    secondaryColor: '#ffffff',
    glowColor: 'rgba(0, 243, 255, 0.6)',
    accentColor: '#38bdf8',
    armorColor: '#0f172a',
    visorColor: '#00f3ff',
    coreColor: '#00f3ff',
    desc: '標準配置型全息武裝，流暢的人體工學幾何外裝，搭載第 4 代量子光子反應爐。',
    vfx: {
      punchTrail: '青藍色全息數位刀光、全息光方塊',
      sk1: '青藍色等離子電漿球，附帶藍色電流拖尾',
      sk2: '拔地而起之青色旋轉電弧光柱',
      guardShield: '全息立方體幾何防禦陣',
      hitEffect: '藍色晶片火花'
    },
    creator: 'Official Core'
  },
  {
    id: 'skin_neon_shadow',
    name: '霓虹暗影刺客',
    title: '暗影匿蹤駭客',
    category: 'default',
    series: '暗夜霓虹',
    price: 0,
    isDefault: true,
    themeColor: '#ff007f',
    secondaryColor: '#c084fc',
    glowColor: 'rgba(255, 0, 127, 0.6)',
    accentColor: '#e879f9',
    armorColor: '#180d24',
    visorColor: '#ff007f',
    coreColor: '#ff007f',
    desc: '專為夜間潛入設計的暗影外裝，武器搭載洋紅超頻高頻光刃與櫻花煙霧匿蹤塗層。',
    vfx: {
      punchTrail: '洋紅能量光刃切痕、暗影殘像',
      sk1: '洋紅櫻花狀光子螺旋彈，拖曳暗影煙霧',
      sk2: '紫色昇空暗影旋風，伴隨櫻花粒子',
      guardShield: '暗影煙幕幾何護盾',
      hitEffect: '粉紫光芒斬痕'
    },
    creator: 'Official Core'
  },
  {
    id: 'skin_pulse_enforcer',
    name: '脈衝重裝執法官',
    title: '極限警備重裝',
    category: 'default',
    series: '重裝防禦',
    price: 0,
    isDefault: true,
    themeColor: '#ffd700',
    secondaryColor: '#f59e0b',
    glowColor: 'rgba(255, 215, 0, 0.6)',
    accentColor: '#fbbf24',
    armorColor: '#1c1917',
    visorColor: '#ffd700',
    coreColor: '#ffd700',
    desc: '特種治安裝甲，厚重金屬陶瓷裝甲板與超導重力發電機，出拳附帶電閃雷鳴。',
    vfx: {
      punchTrail: '金色金屬重拳氣浪、金黃爆裂電磁',
      sk1: '金黃色重音爆震波彈，帶有重力波圈',
      sk2: '金色電閃雷鳴巨拳，震碎地面裂痕',
      guardShield: '金色菱形厚甲護盾',
      hitEffect: '金黃色雷電炸裂'
    },
    creator: 'Official Core'
  },

  // ── 商城熱門角色 (依價格梯度排列，豐富多元風格) ──
  {
    id: 'skin_cosmic_ronin',
    name: '星穹量子浪人',
    title: '星際流浪居合劍客',
    category: 'shop',
    series: '東方機武',
    price: 1800,
    isDefault: false,
    themeColor: '#818cf8',
    secondaryColor: '#c084fc',
    glowColor: 'rgba(129, 140, 248, 0.6)',
    accentColor: '#a5b4fc',
    armorColor: '#1e1b4b',
    visorColor: '#818cf8',
    coreColor: '#c084fc',
    desc: '漫遊星雲的無主武士，佩戴摺疊電漿太刀，出招如流星雨般絢麗流暢。',
    vfx: {
      punchTrail: '靛藍星塵刀弧、星芒殘跡',
      sk1: '紫藍色彗星核心彈，拖曳星塵星環',
      sk2: '破空沖天之星雲漩渦斬',
      guardShield: '星環八卦護體陣',
      hitEffect: '璀璨星屑迸發'
    },
    creator: 'Community Workshop (PR #19)'
  },
  {
    id: 'skin_volt_ranger',
    name: '雷霆神速遊俠',
    title: '超音速電磁先鋒',
    category: 'shop',
    series: '元素超載',
    price: 2000,
    isDefault: false,
    themeColor: '#facc15',
    secondaryColor: '#fde047',
    glowColor: 'rgba(250, 204, 21, 0.6)',
    accentColor: '#eab308',
    armorColor: '#1a1702',
    visorColor: '#facc15',
    coreColor: '#fde047',
    desc: '安裝超高壓特斯拉線圈的極速刺客，周身永遠環繞著滋滋作響的百萬伏特高壓電弧。',
    vfx: {
      punchTrail: '金黃連鎖閃電霹靂光痕',
      sk1: '高頻旋轉特斯拉球型閃電',
      sk2: '引雷沖天之暴風雷柱',
      guardShield: '百萬伏特電磁感應罩',
      hitEffect: '高壓電火花炸裂'
    },
    creator: 'Community Workshop (PR #24)'
  },
  {
    id: 'skin_abyssal_ghost',
    name: '深淵幽靈特工',
    title: '黑水深海匿蹤刺客',
    category: 'shop',
    series: '特勤諜影',
    price: 2200,
    isDefault: false,
    themeColor: '#06b6d4',
    secondaryColor: '#22d3ee',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    accentColor: '#67e8f9',
    armorColor: '#082f49',
    visorColor: '#06b6d4',
    coreColor: '#06b6d4',
    desc: '配備全像折射迷彩與水冷反應堆的幽靈特務，在黑暗中宛如深海掠食者般致命。',
    vfx: {
      punchTrail: '青碧色水波漣漪光軌',
      sk1: '高壓水流等離子穿甲彈',
      sk2: '旋轉升騰之深海漩渦噴射流',
      guardShield: '超流體折射幾何力場',
      hitEffect: '水藍色聲納脈衝環'
    },
    creator: 'Community Workshop (PR #31)'
  },
  {
    id: 'skin_dark_hacker',
    name: '暗黑駭客',
    title: '二進制深網幻影',
    category: 'shop',
    series: '矩陣代碼',
    price: 2500,
    isDefault: false,
    themeColor: '#00ff66',
    secondaryColor: '#34d399',
    glowColor: 'rgba(0, 255, 102, 0.6)',
    accentColor: '#10b981',
    armorColor: '#052e16',
    visorColor: '#00ff66',
    coreColor: '#00ff66',
    desc: '深網漫遊者的神秘黑客裝，全身湧動著 0 與 1 的二進制綠色代碼流，斬擊破壞現實。',
    vfx: {
      punchTrail: '綠色 0 與 1 二進制代碼流揮砍',
      sk1: '綠色終端字符代碼光束球',
      sk2: '垂直升騰之綠色數據矩陣光牆',
      guardShield: '綠色掃描線代碼力場',
      hitEffect: '綠色像素數據光塵'
    },
    creator: 'Community Workshop (PR #42)'
  },
  {
    id: 'skin_nano_cyborg',
    name: '奈米生化戰警',
    title: '生化液態金屬改造人',
    category: 'shop',
    series: '生化科技',
    price: 2600,
    isDefault: false,
    themeColor: '#84cc16',
    secondaryColor: '#a3e635',
    glowColor: 'rgba(132, 204, 22, 0.6)',
    accentColor: '#65a30d',
    armorColor: '#142005',
    visorColor: '#84cc16',
    coreColor: '#bef264',
    desc: '四肢由十億級奈米機械群構成，出拳時液態金屬能隨心所欲變形為尖刺與巨刃。',
    vfx: {
      punchTrail: '毒綠液態金屬變形刺刃光痕',
      sk1: '密集蜂群奈米機械團',
      sk2: '液態金屬巨矛沖天穿刺',
      guardShield: '六角奈米自我修復盾',
      hitEffect: '蜂巢晶格金屬碎屑'
    },
    creator: 'Community Workshop (PR #48)'
  },
  {
    id: 'skin_crimson_tyrant',
    name: '赤紅暴君重機甲',
    title: '熔岩超載重裝狂戰士',
    category: 'shop',
    series: '重裝防禦',
    price: 2800,
    isDefault: false,
    themeColor: '#ef4444',
    secondaryColor: '#f97316',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    accentColor: '#dc2626',
    armorColor: '#2b0707',
    visorColor: '#ef4444',
    coreColor: '#f97316',
    desc: '重型近戰攻城機甲，搭載熔岩過熱動力爐，每一次重拳揮動皆伴隨濃煙與高溫熔渣。',
    vfx: {
      punchTrail: '熾紅熔岩過熱重拳光痕、火星四濺',
      sk1: '高溫燃燒熔岩巨球，帶黑煙尾跡',
      sk2: '火山噴發般地裂火柱升騰',
      guardShield: '尖刺重裝生鐵熾炎盾',
      hitEffect: '赤紅高熱火花碎裂'
    },
    creator: 'Community Workshop (PR #53)'
  },
  {
    id: 'skin_cryo_maiden',
    name: '極寒超導武姬',
    title: '絕對零度冰晶守衛',
    category: 'shop',
    series: '元素超載',
    price: 3000,
    isDefault: false,
    themeColor: '#38bdf8',
    secondaryColor: '#e0f2fe',
    glowColor: 'rgba(56, 189, 248, 0.6)',
    accentColor: '#7dd3fc',
    armorColor: '#08253a',
    visorColor: '#38bdf8',
    coreColor: '#bae6fd',
    desc: '搭載超導低溫冷凍技術的戰鬥人形，周身籠罩著極致的冰藍寒霜與鑽石冰晶塵埃。',
    vfx: {
      punchTrail: '雪白冰稜切面、冰霜光霧',
      sk1: '旋轉極寒冰魄水晶彈',
      sk2: '拔地而起之參天冰刺巨塔',
      guardShield: '鑽石稜鏡冰壁防禦',
      hitEffect: '冰晶碎裂晶瑩雪花'
    },
    creator: 'Community Workshop (PR #59)'
  },
  {
    id: 'skin_void_devourer',
    name: '虛空吞噬者',
    title: '反物質黑洞奇點行者',
    category: 'shop',
    series: '未來機神',
    price: 3200,
    isDefault: false,
    themeColor: '#9333ea',
    secondaryColor: '#a855f7',
    glowColor: 'rgba(147, 51, 234, 0.6)',
    accentColor: '#7e22ce',
    armorColor: '#0a0212',
    visorColor: '#c084fc',
    coreColor: '#9333ea',
    desc: '由暗物質能量凝聚而成的異次元獵手，核心如同微型黑洞，能吞噬周遭的光線與空間。',
    vfx: {
      punchTrail: '深紫黑洞重力波切痕',
      sk1: '旋轉的反物質坍縮黑洞球',
      sk2: '虛空撕裂維度裂隙光柱',
      guardShield: '事件視界引力偏折盾',
      hitEffect: '維度破碎暗影裂紋'
    },
    creator: 'Community Workshop (PR #65)'
  },
  {
    id: 'skin_solar_valkyrie',
    name: '太陽女武神',
    title: '恆星烈焰戰神',
    category: 'event',
    series: '終極典藏',
    price: 3500,
    isDefault: false,
    themeColor: '#ff4500',
    secondaryColor: '#fbbf24',
    glowColor: 'rgba(255, 69, 0, 0.6)',
    accentColor: '#f97316',
    armorColor: '#270802',
    visorColor: '#ff4500',
    coreColor: '#ff4500',
    desc: '首季「賽博頂尖決賽盛典」限定外觀。萃取太陽耀斑能量打造，羽翼光軌宛如鳳凰展翅。',
    vfx: {
      punchTrail: '金紅熾烈高熱羽翼光軌',
      sk1: '旋轉的太陽耀斑火球，帶有火星拖尾',
      sk2: '鳳凰展翅般之沖天烈焰火柱',
      guardShield: '金紅光芒羽翼格擋',
      hitEffect: '熾熱火星迸發'
    },
    creator: 'Season 1 Grand Master'
  },
  {
    id: 'skin_cyber_diva',
    name: '賽博歌姬音律',
    title: '全息電子音樂虛擬偶像',
    category: 'shop',
    series: '暗夜霓虹',
    price: 3800,
    isDefault: false,
    themeColor: '#14b8a6',
    secondaryColor: '#f43f5e',
    glowColor: 'rgba(20, 184, 166, 0.6)',
    accentColor: '#2dd4bf',
    armorColor: '#042f2e',
    visorColor: '#14b8a6',
    coreColor: '#f43f5e',
    desc: '將電子音樂等化器轉化為武裝的全息歌姬，揮拳帶有音律符號，戰鬥宛如盛大演唱會。',
    vfx: {
      punchTrail: '青綠/桃紅雙色動態等化器音波波形',
      sk1: '全息八分音符與高音譜號音爆球',
      sk2: '七彩霓虹舞台聚光燈音律光柱',
      guardShield: '動感聲波頻譜幾何防護屏',
      hitEffect: '跳躍的音符與炫彩粒子'
    },
    creator: 'Community Workshop (PR #77)'
  },
  {
    id: 'skin_archangel_judicator',
    name: '曜白裁決聖使',
    title: '光子聖律終極執行者',
    category: 'shop',
    series: '未來機神',
    price: 4000,
    isDefault: false,
    themeColor: '#f8fafc',
    secondaryColor: '#38bdf8',
    glowColor: 'rgba(248, 250, 252, 0.7)',
    accentColor: '#93c5fd',
    armorColor: '#1e293b',
    visorColor: '#38bdf8',
    coreColor: '#f8fafc',
    desc: '通體採用純白奈米陶瓷與白金裝甲的高潔武裝，背後展露六道純光子構成的審判光翼。',
    vfx: {
      punchTrail: '神聖曜白光羽光弧、聖光粒子',
      sk1: '純淨光子神聖長矛射線',
      sk2: '六翼展翅拔地而起之天堂聖光柱',
      guardShield: '大教堂彩繪玻璃光芒神聖力場',
      hitEffect: '金色聖羽與純白光環'
    },
    creator: 'Community Workshop (PR #88)'
  },
  {
    id: 'skin_omega_emperor',
    name: '黃金終極機神',
    title: '量子帝國始祖機皇',
    category: 'shop',
    series: '終極典藏',
    price: 5000,
    isDefault: false,
    themeColor: '#eab308',
    secondaryColor: '#ffffff',
    glowColor: 'rgba(234, 179, 8, 0.7)',
    accentColor: '#ca8a04',
    armorColor: '#1e1601',
    visorColor: '#ffffff',
    coreColor: '#eab308',
    desc: '古代超文明遺留的終極皇帝機甲，通體由不滅的量子真金鑄造，尊貴威嚴凌駕眾生。',
    vfx: {
      punchTrail: '帝王真金輝煌日冕斬、神威金光',
      sk1: '超新星爆發帝王金輪核爆彈',
      sk2: '萬丈金光貫穿天地的至尊帝皇柱',
      guardShield: '九五至尊真金龍紋結界',
      hitEffect: '帝皇龍鱗金光炸裂'
    },
    creator: 'Legendary Artisan (PR #99)'
  },

  // ── 漫威宇宙正宗經典系列 (Marvel Universe) ──
  {
    id: 'skin_iron_man',
    name: '鋼鐵人・馬克85',
    title: '納米高科技復仇者',
    category: 'shop',
    series: '漫威宇宙',
    price: 2800,
    isDefault: false,
    themeColor: '#c1121f',
    secondaryColor: '#fbbf24',
    glowColor: 'rgba(56, 189, 248, 0.8)',
    accentColor: '#fbbf24',
    armorColor: '#7f1d1d',
    visorColor: '#38bdf8',
    coreColor: '#38bdf8',
    desc: '真實還原漫威《復仇者聯盟》終局之戰馬克85裝甲。胸口搭載高能弧形方舟反應爐，雙手掌心配備等離子脈衝砲。',
    vfx: {
      punchTrail: '金紅納米光刃、掌心脈衝光流',
      sk1: '高能方舟離子聚能砲，耀眼蔚藍電流',
      sk2: '推進背翼全開沖天升龍噴射',
      guardShield: '六角形微晶納米力場盾',
      hitEffect: '蔚藍脈衝等離子火花'
    },
    creator: 'Marvel Studios Tribute'
  },
  {
    id: 'skin_spiderman',
    name: '蜘蛛人・經典紅藍',
    title: '好鄰居紐約英雄',
    category: 'shop',
    series: '漫威宇宙',
    price: 2500,
    isDefault: false,
    themeColor: '#dc2626',
    secondaryColor: '#2563eb',
    glowColor: 'rgba(220, 38, 38, 0.65)',
    accentColor: '#1d4ed8',
    armorColor: '#991b1b',
    visorColor: '#ffffff',
    coreColor: '#dc2626',
    desc: '真實還原彼得帕克經典紅藍蛛網戰衣！面部具備標誌性大白蛛眼與粗黑眼框，胸口印有標誌性黑蜘蛛圖騰。',
    vfx: {
      punchTrail: '蛛絲軌跡、動感紅藍光影',
      sk1: '高速高黏度量子蛛絲彈，帶蛛網拖尾',
      sk2: '吐絲借力沖天迴旋空翻踢',
      guardShield: '全方位多層幾何蛛網防護屏',
      hitEffect: '白色蛛絲與紅色感應閃電'
    },
    creator: 'Marvel Studios Tribute'
  },
  {
    id: 'skin_captain_america',
    name: '美國隊長・羅傑斯',
    title: '傳奇復仇者隊長',
    category: 'shop',
    series: '漫威宇宙',
    price: 2600,
    isDefault: false,
    themeColor: '#1d4ed8',
    secondaryColor: '#ef4444',
    glowColor: 'rgba(29, 78, 216, 0.65)',
    accentColor: '#ffffff',
    armorColor: '#1e3a8a',
    visorColor: '#ffffff',
    coreColor: '#ffffff',
    desc: '真實還原史蒂夫羅傑斯深藍星條戰服！頭戴象徵隊長之白色A字頭盔，背負不朽的圓形汎合金星盾。',
    vfx: {
      punchTrail: '星盾破空殘影、紅白藍三色英勇衝擊',
      sk1: '迴旋飛擲高速旋轉的汎合金星盾',
      sk2: '擎盾沖天重錘破防猛擊',
      guardShield: '巨大汎合金銀星迴旋格擋壁',
      hitEffect: '金屬巨響與銀色火花'
    },
    creator: 'Marvel Studios Tribute'
  },
  {
    id: 'skin_thor',
    name: '雷神索爾・奧丁之子',
    title: '阿斯嘉雷霆戰神',
    category: 'shop',
    series: '漫威宇宙',
    price: 3000,
    isDefault: false,
    themeColor: '#38bdf8',
    secondaryColor: '#ef4444',
    glowColor: 'rgba(56, 189, 248, 0.85)',
    accentColor: '#e2e8f0',
    armorColor: '#0f172a',
    visorColor: '#38bdf8',
    coreColor: '#38bdf8',
    desc: '真實還原阿斯嘉雷神尊容！身披飛舞的鮮紅戰袍披風，黑色鱗甲胸前鑲嵌六顆白銀神盾圓盤，雙目綻放萬鈞雷霆。',
    vfx: {
      punchTrail: '雷神之錘暴風電弧、耀藍破空光跡',
      sk1: '聚集九界雷霆之落雷雷球',
      sk2: '召喚雷霆狂暴沖天的引雷之擊',
      guardShield: '阿斯嘉彩虹橋符文雷光結界',
      hitEffect: '萬丈蔚藍落雷炸裂'
    },
    creator: 'Marvel Studios Tribute'
  },
  {
    id: 'skin_thanos',
    name: '薩諾斯・無限手套',
    title: '宇宙天命掌控者',
    category: 'shop',
    series: '漫威宇宙',
    price: 3800,
    isDefault: false,
    themeColor: '#ffd700',
    secondaryColor: '#a855f7',
    glowColor: 'rgba(255, 215, 0, 0.8)',
    accentColor: '#fbbf24',
    armorColor: '#3b0764',
    visorColor: '#ffd700',
    coreColor: '#ffd700',
    desc: '真實還原泰坦霸王薩諾斯！左手配戴完整鑲嵌六顆無限原石（力量/空間/現實/靈魂/時間/心靈）的耀眼黃金無限手套！',
    vfx: {
      punchTrail: '六色原石璀璨光暈、泰坦巨力裂痕',
      sk1: '空間與力量原石融合之紫黑坍縮引力球',
      sk2: '無限拳套指天震撼擂台之宇宙衝擊柱',
      guardShield: '時間與現實原石之彩虹偏折結界',
      hitEffect: '六原石彩光星雲碎裂'
    },
    creator: 'Marvel Studios Tribute'
  },
  {
    id: 'skin_hawkeye',
    name: '鷹眼・克林特巴頓',
    title: '復仇者傳奇神箭手',
    category: 'shop',
    series: '漫威宇宙',
    price: 2500,
    isDefault: false,
    attackStyle: 'bow',
    themeColor: '#8b5cf6',
    secondaryColor: '#1e1b4b',
    glowColor: 'rgba(139, 92, 246, 0.75)',
    accentColor: '#a78bfa',
    armorColor: '#180d24',
    visorColor: '#c084fc',
    coreColor: '#8b5cf6',
    desc: '真實還原復仇者聯盟神箭手！身穿暗紫黑戰術射手服，背負高科技箭筒，手持精密複合反曲弓，百步穿楊一箭封喉。',
    vfx: {
      punchTrail: '紫電破空箭影、拉弓流光軌跡',
      sk1: '貫穿全場之高能光子爆破箭',
      sk2: '凌空翻騰引箭向天落雨射擊',
      guardShield: '戰術反曲複合弓格擋護壁',
      hitEffect: '銳利箭簇破空紫芒'
    },
    creator: 'Marvel Studios Tribute'
  },

  // ── 七龍珠超正宗傳奇系列 (Dragon Ball Super) ──
  {
    id: 'skin_goku_ssj',
    name: '孫悟空・超級賽亞人',
    title: '宇宙傳奇超級賽亞人',
    category: 'shop',
    series: '七龍珠超',
    price: 2800,
    isDefault: false,
    themeColor: '#fde047',
    secondaryColor: '#ea580c',
    glowColor: 'rgba(253, 224, 71, 0.85)',
    accentColor: '#2563eb',
    armorColor: '#c2410c',
    visorColor: '#06b6d4',
    coreColor: '#fde047',
    desc: '真實還原鳥山明筆下傳奇超賽！怒髮衝冠的金色尖刺刺蝟頭、碧藍雙眸，身著經典龜仙流橙色道服與深藍腰帶！',
    vfx: {
      punchTrail: '金黃燃燒氣焰、超賽爆氣音爆',
      sk1: '正宗藍白相間「龜派氣功波」光彈',
      sk2: '金光沖天龍拳咆哮升龍擊',
      guardShield: '全方位燃燒的金色賽亞人氣焰爆發罩',
      hitEffect: '超賽金黃氣芒震波'
    },
    creator: 'Dragon Ball Tribute'
  },
  {
    id: 'skin_vegeta_ssj',
    name: '貝吉塔・賽亞人王子',
    title: '驕傲的賽亞人王子',
    category: 'shop',
    series: '七龍珠超',
    price: 2800,
    isDefault: false,
    themeColor: '#3b82f6',
    secondaryColor: '#fde047',
    glowColor: 'rgba(59, 130, 246, 0.8)',
    accentColor: '#ffffff',
    armorColor: '#1e3a8a',
    visorColor: '#06b6d4',
    coreColor: '#fde047',
    desc: '真實還原貝吉塔王子！直立沖天之火焰金色賽亞長髮，身穿經典白底黃肩條紋戰鬥服、深藍連體服與白手套！',
    vfx: {
      punchTrail: '湛藍與金黃交織的爆裂氣流',
      sk1: '極限金色「最終閃光」連續光子彈',
      sk2: '王者傲氣沖天之大霹靂暴風踢',
      guardShield: '皇家賽亞人藍金雙環氣障壁',
      hitEffect: '金色電弧與深藍火花'
    },
    creator: 'Dragon Ball Tribute'
  },
  {
    id: 'skin_trunks_future',
    name: '未來特南克斯',
    title: '希望之劍守護者',
    category: 'shop',
    series: '七龍珠超',
    price: 2600,
    isDefault: false,
    themeColor: '#a855f7',
    secondaryColor: '#fde047',
    glowColor: 'rgba(168, 85, 247, 0.75)',
    accentColor: '#e2e8f0',
    armorColor: '#312e81',
    visorColor: '#06b6d4',
    coreColor: '#a855f7',
    desc: '真實還原未來少年特南克斯！身穿膠囊公司深藍立領短夾克，斜挎皮帶背負勇者之劍，隨風飄動俐落紫髮！',
    vfx: {
      punchTrail: '閃耀勇者聖劍刀光、金色劍氣',
      sk1: '超音速閃耀斬擊劍氣波',
      sk2: '魔閃光引爆沖天的破邪飛天拔劍',
      guardShield: '交叉雙臂高速氣圓防禦屏',
      hitEffect: '紫色劍痕與金黃劍氣迸射'
    },
    creator: 'Dragon Ball Tribute'
  },
  {
    id: 'skin_piccolo',
    name: '比克大魔王',
    title: '那美克星智勇戰神',
    category: 'shop',
    series: '七龍珠超',
    price: 2500,
    isDefault: false,
    themeColor: '#22c55e',
    secondaryColor: '#a855f7',
    glowColor: 'rgba(34, 197, 94, 0.75)',
    accentColor: '#f43f5e',
    armorColor: '#581c87',
    visorColor: '#22c55e',
    coreColor: '#22c55e',
    desc: '真實還原那美克星大魔王！綠色皮膚、粉紅手臂肌肉條紋，頭戴白色頭巾，身披寬大厚重的白色長披肩與紫色道服！',
    vfx: {
      punchTrail: '那美克星手臂延伸綠色氣刃、殘影',
      sk1: '指尖凝聚之雙螺旋「魔貫光殺砲」',
      sk2: '狂暴升龍裂地爆裂魔波',
      guardShield: '那美克星神秘精神力場屏',
      hitEffect: '黃綠電光魔氣四射'
    },
    creator: 'Dragon Ball Tribute'
  },
  {
    id: 'skin_golden_frieza',
    name: '黃金弗利沙',
    title: '宇宙帝王終極形態',
    category: 'shop',
    series: '七龍珠超',
    price: 3600,
    isDefault: false,
    themeColor: '#ffd700',
    secondaryColor: '#9333ea',
    glowColor: 'rgba(255, 215, 0, 0.85)',
    accentColor: '#ef4444',
    armorColor: '#4c1d95',
    visorColor: '#ef4444',
    coreColor: '#ffd700',
    desc: '真實還原弗利沙終極黃金進化！身軀覆蓋著高貴奢華的金屬真金生物甲，頭頂與胸口閃耀紫水晶寶石，猩紅雙眼蔑視一切！',
    vfx: {
      punchTrail: '黃金死亡氣芒、深紫帝皇光焰',
      sk1: '極速破空之猩紅「死亡光線」指槍',
      sk2: '黃金帝皇超級超新星毀滅柱',
      guardShield: '黃金死亡圓球環形絕對防禦球',
      hitEffect: '猩紅金芒死亡爆裂'
    },
    creator: 'Dragon Ball Tribute'
  }
];

// ─── 角色專屬攻擊風格與武器動作映射 (Character-Specific Attack Styles) ───
export function getSkinAttackStyle(skin) {
  if (!skin) return 'brawler';
  if (skin.attackStyle) return skin.attackStyle;
  const map = {
    skin_hawkeye: 'bow',
    skin_cryo_maiden: 'bow',
    skin_volt_ranger: 'bow',
    skin_dark_hacker: 'gun',
    skin_abyssal_ghost: 'gun',
    skin_nano_cyborg: 'gun',
    skin_iron_man: 'repulsor',
    skin_spiderman: 'web_shot',
    skin_captain_america: 'shield',
    skin_thor: 'hammer',
    skin_thanos: 'infinity_strike',
    skin_goku_ssj: 'kamehameha',
    skin_vegeta_ssj: 'final_flash',
    skin_trunks_future: 'sword',
    skin_cosmic_ronin: 'sword',
    skin_piccolo: 'namek_arm',
    skin_golden_frieza: 'death_beam',
    skin_pulse_enforcer: 'baton',
    skin_neon_shadow: 'kunai',
    skin_solar_valkyrie: 'spear'
  };
  return map[skin.id] || 'brawler';
}

export function getSkinAttackMeta(skin, attackType = 'light_punch') {
  const style = getSkinAttackStyle(skin);
  const isKick = attackType === 'heavy_kick' || attackType === 'crouch_kick';

  const metas = {
    bow: {
      lightName: '複合神弓・急速箭矢',
      heavyName: '高能光子・重箭穿甲射擊',
      crouchName: '下伏獵手・貼地滑箭',
      sweepName: '下伏獵手・貼地箭勁掃堂',
      sound: 'bow_shot',
      vfxType: 'bow_arrow'
    },
    gun: {
      lightName: '量子手槍・急速射擊',
      heavyName: '戰術爆能・過熱連射',
      crouchName: '下蹲滑行・低位速射',
      sweepName: '戰術滑鏟・低位掃射',
      sound: 'gun_shot',
      vfxType: 'gun_bullet'
    },
    repulsor: {
      lightName: '掌心等離子脈衝砲',
      heavyName: '全功率納米推進重擊',
      crouchName: '低空納米微彈射擊',
      sweepName: '低空等離子微爆掃堂',
      sound: 'laser',
      vfxType: 'repulsor_blast'
    },
    shield: {
      lightName: '汎合金星盾・破陣撞擊',
      heavyName: '傳奇星盾・迴旋飛擲',
      crouchName: '下盤盾面・橫掃崩敵',
      sweepName: '下盤盾面・橫掃崩敵',
      sound: 'shield_hit',
      vfxType: 'shield_strike'
    },
    hammer: {
      lightName: '雷神之鎚・天雷轟擊',
      heavyName: '阿斯嘉狂雷・落雷重劈',
      crouchName: '地裂雷暴・貼地錘擊',
      sweepName: '地裂雷暴・貼地錘擊',
      sound: 'thunder',
      vfxType: 'thor_lightning'
    },
    infinity_strike: {
      lightName: '無限手套・原石天命巨拳',
      heavyName: '六原石爆發・泰坦毀滅',
      crouchName: '力量原石・地動山搖',
      sweepName: '力量原石・貼地震擊',
      sound: 'burst',
      vfxType: 'infinity_vfx'
    },
    web_shot: {
      lightName: '靈動蛛絲・急速腕射',
      heavyName: '蛛絲擺盪・迴旋爆破踢',
      crouchName: '貼地蛛絲・絆倒牽引',
      sweepName: '貼地蛛絲・絆倒牽引',
      sound: 'web_thwip',
      vfxType: 'web_stream'
    },
    kamehameha: {
      lightName: '超賽龜派氣功・掌心爆發',
      heavyName: '瞬影金光・龍拳破空踢',
      crouchName: '氣焰突進・下段掃堂',
      sweepName: '氣焰突進・下段掃堂',
      sound: 'ki_blast',
      vfxType: 'kamehameha_vfx'
    },
    final_flash: {
      lightName: '賽亞傲氣・大霹靂閃光',
      heavyName: '王者傲慢・最終閃光戰斧踢',
      crouchName: '下段氣勁・貼地破防',
      sweepName: '下段氣勁・貼地破防',
      sound: 'ki_blast',
      vfxType: 'final_flash_vfx'
    },
    sword: {
      lightName: '勇者之劍・破空居合斬',
      heavyName: '閃耀聖劍・次元雙重切',
      crouchName: '地走劍氣・貼地迴旋',
      sweepName: '地走劍氣・貼地拔刀斬',
      sound: 'sword_slash',
      vfxType: 'sword_slash_vfx'
    },
    namek_arm: {
      lightName: '那美克星・伸長魔臂破空刺',
      heavyName: '魔貫光殺砲・破邪衝擊',
      crouchName: '魔臂掃堂・低位橫掃',
      sweepName: '魔臂掃堂・低位橫掃',
      sound: 'punch',
      vfxType: 'namek_arm_vfx'
    },
    death_beam: {
      lightName: '帝皇死亡光線・指尖貫穿',
      heavyName: '黃金帝皇・超新星狂暴踢',
      crouchName: '猩紅射線・貼地刺擊',
      sweepName: '猩紅射線・貼地橫掃',
      sound: 'laser',
      vfxType: 'death_beam_vfx'
    },
    baton: {
      lightName: '脈衝防暴電擊・鎮壓直刺',
      heavyName: '高壓重力・重裝撼地擊',
      crouchName: '下身掃堂・防暴絆摔',
      sweepName: '下身掃堂・防暴絆摔',
      sound: 'punch',
      vfxType: 'punch'
    },
    kunai: {
      lightName: '暗影苦無・瞬影雙刺',
      heavyName: '疾風暗刃・騰空迴旋踢',
      crouchName: '地影無痕・下段暗襲',
      sweepName: '地影無痕・下段暗襲',
      sound: 'sword_slash',
      vfxType: 'punch'
    },
    brawler: {
      lightName: '刺拳打擊',
      heavyName: '重力猛踢',
      crouchName: '下蹲刺拳',
      sweepName: '下蹲掃堂腿',
      sound: isKick ? 'kick' : 'punch',
      vfxType: isKick ? 'kick' : 'punch'
    }
  };

  const meta = metas[style] || metas.brawler;
  let name = meta.lightName;
  if (attackType === 'heavy_kick') name = meta.heavyName;
  else if (attackType === 'crouch_punch') name = meta.crouchName;
  else if (attackType === 'crouch_kick') name = meta.sweepName || '下蹲掃堂腿';

  return {
    style,
    name,
    sound: meta.sound,
    vfxType: meta.vfxType
  };
}

/**
 * 取得外觀專屬終極必殺技 (Level 3 Super Move Metadata)
 * 26 款外觀均具備 100% 獨特必殺奧義視覺，傷害值 220 點精確對稱公平
 */
export function getSkinSuperMeta(skin) {
  const id = skin ? skin.id : 'skin_cyber_warrior';

  const supers = {
    // ── 科技與未來原創系列 (15款) ──
    skin_cyber_warrior: {
      name: '量子超弦湮滅刃',
      title: '量子先鋒・超高頻全息弦刃風暴',
      type: 'beam',
      color: '#00f3ff',
      coreColor: '#ffffff',
      beamWidth: 75,
      sound: 'super'
    },
    skin_neon_shadow: {
      name: '暗影櫻落瞬獄殺',
      title: '暗夜霓虹・八方櫻花次元斬',
      type: 'slash',
      color: '#ff007f',
      coreColor: '#c084fc',
      beamWidth: 70,
      sound: 'super'
    },
    skin_pulse_enforcer: {
      name: '脈衝超載審判陣',
      title: '脈衝執法官・超高壓電磁拘束牢籠',
      type: 'shockwave',
      color: '#3b82f6',
      coreColor: '#60a5fa',
      beamWidth: 75,
      sound: 'super'
    },
    skin_cosmic_ronin: {
      name: '星辰居合百花斬',
      title: '星際浪人・銀河星軌居合奧義',
      type: 'slash',
      color: '#a855f7',
      coreColor: '#f43f5e',
      beamWidth: 75,
      sound: 'super'
    },
    skin_volt_ranger: {
      name: '超導雷電狙殺矢',
      title: '超導巡警・萬伏特磁暴連鎖箭幕',
      type: 'lightning',
      color: '#facc15',
      coreColor: '#ffffff',
      beamWidth: 75,
      sound: 'super'
    },
    skin_abyssal_ghost: {
      name: '深淵死域暗影波',
      title: '深淵幽靈・幽冥暗影波長爆散',
      type: 'shockwave',
      color: '#6366f1',
      coreColor: '#818cf8',
      beamWidth: 70,
      sound: 'super'
    },
    skin_dark_hacker: {
      name: '矩陣崩潰代碼流',
      title: '暗黑黑客・零日漏洞終端強制關閉',
      type: 'beam',
      color: '#00ff66',
      coreColor: '#34d399',
      beamWidth: 75,
      sound: 'super'
    },
    skin_nano_cyborg: {
      name: '十億奈米百刃天葬',
      title: '奈米生化戰警・液態金屬暴風穿刺',
      type: 'slash',
      color: '#84cc16',
      coreColor: '#bef264',
      beamWidth: 75,
      sound: 'super'
    },
    skin_crimson_tyrant: {
      name: '地核熔岩超載重轟',
      title: '赤紅暴君・萬度火山地裂巨轟',
      type: 'sphere',
      color: '#ef4444',
      coreColor: '#f97316',
      beamWidth: 85,
      sound: 'super'
    },
    skin_cryo_maiden: {
      name: '絕對零度冰河封神',
      title: '極寒超導武姬・萬丈鑽石冰魄巨刺',
      type: 'beam',
      color: '#38bdf8',
      coreColor: '#bae6fd',
      beamWidth: 80,
      sound: 'super'
    },
    skin_void_devourer: {
      name: '暗物質奇點吞噬',
      title: '虛空吞噬者・事件視界引力坍縮黑洞',
      type: 'sphere',
      color: '#9333ea',
      coreColor: '#c084fc',
      beamWidth: 90,
      sound: 'super'
    },
    skin_solar_valkyrie: {
      name: '熾陽耀斑鳳凰天昇',
      title: '太陽女武神・萬丈恆星聖火烈焰裁決',
      type: 'beam',
      color: '#ff4500',
      coreColor: '#fbbf24',
      beamWidth: 90,
      sound: 'super'
    },
    skin_cyber_diva: {
      name: '狂熱等化器全息暴風',
      title: '賽博歌姬・音浪共振七彩極光音爆',
      type: 'shockwave',
      color: '#14b8a6',
      coreColor: '#f43f5e',
      beamWidth: 80,
      sound: 'super'
    },
    skin_archangel_judicator: {
      name: '天國聖裁・六翼光子聖律',
      title: '曜白裁決聖使・至純光子審判長矛',
      type: 'beam',
      color: '#f8fafc',
      coreColor: '#38bdf8',
      beamWidth: 88,
      sound: 'super'
    },
    skin_omega_emperor: {
      name: '始祖機皇・宇宙金輪核爆',
      title: '黃金終極機神・九五至尊滅世神威金芒',
      type: 'sphere',
      color: '#eab308',
      coreColor: '#ffffff',
      beamWidth: 95,
      sound: 'super'
    },

    // ── 漫威宇宙經典系列 (6款) ──
    skin_iron_man: {
      name: '質子巨砲 UNIBEAM',
      title: '鋼鐵人・馬克85胸口方舟巨型等離子雷射',
      type: 'beam',
      color: '#00f3ff',
      coreColor: '#ef4444',
      beamWidth: 85,
      sound: 'super'
    },
    skin_spiderman: {
      name: '狂暴蛛網巨摔 WEB CYCLONE',
      title: '蜘蛛人・彼得帕克全屏蛛網狂暴大迴旋',
      type: 'cyclone',
      color: '#ffffff',
      coreColor: '#ef4444',
      beamWidth: 65,
      sound: 'super'
    },
    skin_captain_america: {
      name: '汎合金星芒英勇衝擊',
      title: '美國隊長・自由之盾超音速音爆衝擊',
      type: 'charge',
      color: '#38bdf8',
      coreColor: '#ef4444',
      beamWidth: 70,
      sound: 'super'
    },
    skin_thor: {
      name: '雷神天罰・九界神雷',
      title: '雷神索爾・妙爾尼爾天崩地裂狂雷引',
      type: 'lightning',
      color: '#38bdf8',
      coreColor: '#ffffff',
      beamWidth: 90,
      sound: 'super'
    },
    skin_thanos: {
      name: '無限手套・六寶石宇宙射線',
      title: '薩諾斯・六大無限原石宇宙終焉射線',
      type: 'infinity',
      color: '#ffd700',
      coreColor: '#a855f7',
      beamWidth: 90,
      sound: 'super'
    },
    skin_hawkeye: {
      name: '量子神箭・多重爆破獵殺',
      title: '鷹眼・百步穿楊全屏光子暴風箭陣',
      type: 'beam',
      color: '#8b5cf6',
      coreColor: '#c084fc',
      beamWidth: 75,
      sound: 'super'
    },

    // ── 七龍珠超傳奇系列 (5款) ──
    skin_goku_ssj: {
      name: '超・龜派氣功波',
      title: '孫悟空・超越極限金黃狂暴巨浪龜派氣功',
      type: 'beam',
      color: '#00bfff',
      coreColor: '#fde047',
      beamWidth: 90,
      sound: 'super'
    },
    skin_vegeta_ssj: {
      name: '終極閃光 FINAL FLASH',
      title: '貝吉塔・賽亞人王子全屏黃金爆裂閃光',
      type: 'beam',
      color: '#facc15',
      coreColor: '#ffffff',
      beamWidth: 90,
      sound: 'super'
    },
    skin_trunks_future: {
      name: '燃燒之斬 BURNING SLASH',
      title: '未來特南克斯・希望勇者之劍十字破空斬',
      type: 'slash',
      color: '#a855f7',
      coreColor: '#fde047',
      beamWidth: 75,
      sound: 'super'
    },
    skin_piccolo: {
      name: '魔貫光殺砲',
      title: '比克大魔王・雙螺旋超穿透螺旋光殺砲',
      type: 'spiral',
      color: '#84cc16',
      coreColor: '#f43f5e',
      beamWidth: 70,
      sound: 'super'
    },
    skin_golden_frieza: {
      name: '超新星毀滅彈 DEATH BALL',
      title: '黃金弗利沙・帝皇猩紅巨型毀滅黑彈',
      type: 'sphere',
      color: '#ffd700',
      coreColor: '#ef4444',
      beamWidth: 95,
      sound: 'super'
    },

    // 兼容舊別名
    skin_ironman: {
      name: '質子巨砲 UNIBEAM',
      title: '鋼鐵人・馬克85胸口方舟巨型等離子雷射',
      type: 'beam',
      color: '#00f3ff',
      coreColor: '#ef4444',
      beamWidth: 85,
      sound: 'super'
    },
    skin_captain: {
      name: '汎合金星芒英勇衝擊',
      title: '美國隊長・自由之盾超音速音爆衝擊',
      type: 'charge',
      color: '#38bdf8',
      coreColor: '#ef4444',
      beamWidth: 70,
      sound: 'super'
    },
    skin_goku: {
      name: '超・龜派氣功波',
      title: '孫悟空・超越極限金黃狂暴巨浪龜派氣功',
      type: 'beam',
      color: '#00bfff',
      coreColor: '#fde047',
      beamWidth: 90,
      sound: 'super'
    },
    skin_vegeta: {
      name: '終極閃光 FINAL FLASH',
      title: '貝吉塔・賽亞人王子全屏黃金爆裂閃光',
      type: 'beam',
      color: '#facc15',
      coreColor: '#ffffff',
      beamWidth: 90,
      sound: 'super'
    },
    skin_trunks: {
      name: '燃燒之斬 BURNING SLASH',
      title: '未來特南克斯・希望勇者之劍十字破空斬',
      type: 'slash',
      color: '#a855f7',
      coreColor: '#fde047',
      beamWidth: 75,
      sound: 'super'
    },
    skin_frieza: {
      name: '超新星毀滅彈 DEATH BALL',
      title: '黃金弗利沙・帝皇猩紅巨型毀滅黑彈',
      type: 'sphere',
      color: '#ffd700',
      coreColor: '#ef4444',
      beamWidth: 95,
      sound: 'super'
    }
  };

  const selected = supers[id] || {
    name: '量子超能粒子巨砲',
    title: '量子矩陣・高頻粒子貫通暴擊',
    type: 'beam',
    color: skin && skin.themeColor ? skin.themeColor : '#00f3ff',
    coreColor: '#ffffff',
    beamWidth: 75,
    sound: 'super'
  };

  return {
    ...selected,
    damage: 220,
    startup: 16,
    duration: 65
  };
}

