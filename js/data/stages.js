/**
 * 《CyberStriker: Quantum Arena》
 * 戰鬥場景定義庫 (Multi-Themed Battle Stages)
 * 包含 4 大主題標誌性擂台：賽博量子空間、天下第一武道會、斯塔克大樓天台、那美克星
 * 全場景公平對稱，高低空中戰鬥平台完全一致，視覺體驗極致沉浸
 */

export const STAGES = [
  {
    id: 'stage_cyber_matrix',
    name: '賽博量子空間',
    subtitle: 'Cyber Matrix / Quantum Void',
    series: 'cyber',
    icon: 'fa-solid fa-microchip',
    themeColor: '#00f3ff',
    secondaryColor: '#ff007f',
    description: '深邃量子矩陣虛空，全息立體網格擂台與旋轉 3D 霓虹多面體。',
    skyColors: ['#040714', '#0a1026', '#101a38'],
    gridColor: 'rgba(0, 243, 255, 0.2)',
    groundColor: '#0c142b',
    glowColor: '#00f3ff',
    musicStyle: 'cyber'
  },
  {
    id: 'stage_tenkaichi',
    name: '天下第一武道會',
    subtitle: 'World Martial Arts Tournament Ring',
    series: 'dragonball',
    icon: 'fa-solid fa-dragon',
    themeColor: '#eab308',
    secondaryColor: '#ef4444',
    description: '七龍珠傳奇武道擂台，晴空白雲、遠方青山與飄揚的「武」字錦旗。',
    skyColors: ['#1e40af', '#38bdf8', '#bae6fd'],
    gridColor: 'rgba(234, 179, 8, 0.25)',
    groundColor: '#ca8a04',
    glowColor: '#ffd700',
    musicStyle: 'martial'
  },
  {
    id: 'stage_stark_tower',
    name: '斯塔克大樓天台',
    subtitle: 'Stark Tower Rooftop / NYC Skyline',
    series: 'marvel',
    icon: 'fa-solid fa-building',
    themeColor: '#f43f5e',
    secondaryColor: '#38bdf8',
    description: '漫威紐約午夜天際線，復仇者 A 標誌停機坪、細雨靡霏與遠方雷霆閃電。',
    skyColors: ['#050814', '#0f172a', '#1e293b'],
    gridColor: 'rgba(244, 63, 94, 0.2)',
    groundColor: '#1e293b',
    glowColor: '#38bdf8',
    musicStyle: 'heroic'
  },
  {
    id: 'stage_namek',
    name: '那美克星',
    subtitle: 'Planet Namek / Green Sky & Alien Sea',
    series: 'dragonball',
    icon: 'fa-solid fa-globe',
    themeColor: '#10b981',
    secondaryColor: '#06b6d4',
    description: '七龍珠異星聖地，青檸綠色天空、雙子外星明月、亞奇薩神木與青碧海洋。',
    skyColors: ['#365314', '#65a30d', '#a3e635'],
    gridColor: 'rgba(16, 185, 129, 0.25)',
    groundColor: '#064e3b',
    glowColor: '#34d399',
    musicStyle: 'alien'
  }
];

export function getStageById(id) {
  return STAGES.find(s => s.id === id) || STAGES[0];
}

export function getRandomStage() {
  const idx = Math.floor(Math.random() * STAGES.length);
  return STAGES[idx];
}
