/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * 帳號存檔、Google 登入、每日簽到獎勵與嚴格成就驗證系統
 * (Save System, Google Login, Daily Rewards & Strict Genesis Achievement Verifier)
 */

const STORAGE_KEY = "DIMENSION_CLASH_ONLINE_SAVE_V3";

class SaveSystem {
  constructor() {
    this.user = {
      isLoggedIn: true,
      uid: "PLAYER_" + Math.floor(100000 + Math.random() * 900000),
      nickname: "次元戰神",
      email: "player@gmail.com",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=DimensionGamer",
      gold: 1500, // 初始贈送 1500 金幣
      trophies: 1000,
      pvpWins: 0,
      pvpLosses: 0,
      totalDamage: 0,
      bossRushMaxFloor: 0, // 通關魔王塔最高層數
      bossRushNoDeathCleared: false, // 是否一命無傷通關魔王塔
      psychoCrystals: 0, // 感應骨架結晶 (獨角獸材料)
      has1v5Sweep: false, // 是否達成 5v5 單人 1 穿 5 紀錄
      unlockedCharacters: ["goku_kid", "cap_america", "gm_rgm79"], // 免費新手三劍客
      selectedTeam: ["goku_kid", "cap_america", "gm_rgm79"], // 預設 3 隻上場角色
      characterLevels: {
        goku_kid: 25,
        cap_america: 20,
        gm_rgm79: 15
      },
      characterMastery: {
        goku_kid: 10,
        cap_america: 5
      },
      equippedGear: {
        goku_kid: ["gravity_wristband", "senzu_pouch", "potara_earring_single", "saiyan_spirit_chip"],
        cap_america: [null, "vibranium_weave", null, "jarvis_tactical_os"],
        gm_rgm79: ["minovsky_reactor", "twin_beam_cannon_pack", null, null]
      },
      dailyReward: {
        lastClaimDate: "",
        streakDay: 1,
        claimedToday: false
      }
    };

    this.load();
    this.checkDailyRewardStatus();
  }

  load() {
    try {
      const dataStr = localStorage.getItem(STORAGE_KEY);
      if (dataStr) {
        const parsed = JSON.parse(dataStr);
        this.user = Object.assign(this.user, parsed);
      }
    } catch (e) {
      console.warn("Failed to load save from localStorage", e);
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }

  checkDailyRewardStatus() {
    const todayStr = new Date().toISOString().slice(0, 10);
    if (this.user.dailyReward.lastClaimDate !== todayStr) {
      this.user.dailyReward.claimedToday = false;
    }
  }

  loginWithGoogle(email = "player@gmail.com", nickname = "超次元戰神", avatar = "https://api.dicebear.com/7.x/bottts/svg?seed=DimensionGamer") {
    this.user.isLoggedIn = true;
    this.user.email = email;
    this.user.nickname = nickname;
    this.user.avatar = avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=" + encodeURIComponent(nickname);
    this.user.lastSyncedAt = new Date().toISOString();
    this.save();
  }

  setAvatar(avatarUrl) {
    this.user.avatar = avatarUrl;
    this.save();
  }

  addPsychoCrystals(amount = 1) {
    this.user.psychoCrystals = (this.user.psychoCrystals || 0) + amount;
    this.save();
  }

  logout() {
    this.user.isLoggedIn = false;
    this.save();
  }

  claimDailyReward() {
    const todayStr = new Date().toISOString().slice(0, 10);
    if (this.user.dailyReward.claimedToday && this.user.dailyReward.lastClaimDate === todayStr) {
      return { success: false, reason: "今日每日獎勵已領取，明天再來領取吧！" };
    }

    const rewardsTable = [
      { day: 1, gold: 500, desc: "500 金幣 + 仙豆補給包" },
      { day: 2, gold: 1000, desc: "1,000 金幣 + 綠階召募券" },
      { day: 3, gold: 1500, desc: "1,500 金幣 + 振金編織內襯" },
      { day: 4, gold: 2000, desc: "2,000 金幣 + 初鋼改裝零件" },
      { day: 5, gold: 3000, desc: "3,000 金幣 + 2顆感應骨架結晶" },
      { day: 6, gold: 4000, desc: "4,000 金幣 + 特南克斯解鎖碎片" },
      { day: 7, gold: 10000, desc: "10,000 金幣 + 史詩英雄自選箱！" }
    ];

    const currentDay = this.user.dailyReward.streakDay;
    const reward = rewardsTable[(currentDay - 1) % rewardsTable.length];

    this.user.gold += reward.gold;
    if (currentDay === 5) this.user.psychoCrystals += 2;

    this.user.dailyReward.claimedToday = true;
    this.user.dailyReward.lastClaimDate = todayStr;
    this.user.dailyReward.streakDay = (currentDay % 7) + 1;
    this.save();

    return { success: true, reward, nextStreakDay: this.user.dailyReward.streakDay };
  }

  // ─── 嚴格創世級成就解鎖檢查 (Strict Genesis Achievement Verifier) ───
  getGenesisProgress(charId) {
    const u = this.user;
    switch (charId) {
      case "thanos_gauntlet":
        const thanosAchieved = u.bossRushMaxFloor >= 10 && u.bossRushNoDeathCleared;
        return {
          achieved: thanosAchieved,
          desc: "PVE 極限「無限之戰」一命單人無傷通關 10 層魔王塔",
          progressText: `魔王塔進度：${u.bossRushMaxFloor} / 10 層 ${u.bossRushNoDeathCleared ? '(一命達成)' : '(尚未一命通關)'}`,
          percent: thanosAchieved ? 100 : Math.min(90, u.bossRushMaxFloor * 9)
        };

      case "goku_ultra_instinct":
        const uiAchieved = u.pvpWins >= 150 && u.trophies >= 2500;
        return {
          achieved: uiAchieved,
          desc: "PVP 天梯達到宗師段位 (2,500 獎盃) 且累計 150 勝場",
          progressText: `勝場：${u.pvpWins} / 150 勝 ｜ 獎盃：${u.trophies} / 2500 盃`,
          percent: Math.min(100, Math.round(((u.pvpWins / 150) * 0.5 + (u.trophies / 2500) * 0.5) * 100))
        };

      case "unicorn_crystal":
        const unicornAchieved = u.psychoCrystals >= 15;
        return {
          achieved: unicornAchieved,
          desc: "收集 15 顆感應骨架結晶 (通關魔王塔高層掉落)",
          progressText: `結晶收集：${u.psychoCrystals} / 15 顆`,
          percent: Math.min(100, Math.round((u.psychoCrystals / 15) * 100))
        };

      case "jiren_fullpower":
        const jirenAchieved = u.has1v5Sweep === true;
        return {
          achieved: jirenAchieved,
          desc: "5v5 模式中首發先鋒達成「1 穿 5 不換人」全勝完封",
          progressText: u.has1v5Sweep ? "已達成 1 穿 5 紀錄" : "尚未達成 1 穿 5 (0 / 1)",
          percent: u.has1v5Sweep ? 100 : 0
        };

      case "beerus_god":
        const beerusAchieved = u.bossRushMaxFloor >= 10;
        return {
          achieved: beerusAchieved,
          desc: "通關次元魔王塔全部 10 層挑戰",
          progressText: `魔王塔挑戰：${Math.min(10, u.bossRushMaxFloor)} / 10 層`,
          percent: Math.min(100, u.bossRushMaxFloor * 10)
        };

      case "kang":
        const kangAchieved = u.totalDamage >= 5000000;
        return {
          achieved: kangAchieved,
          desc: "PVP / 戰鬥累計造成 5,000,000 點總戰鬥傷害",
          progressText: `累計傷害：${u.totalDamage.toLocaleString()} / 5,000,000 點`,
          percent: Math.min(100, Math.round((u.totalDamage / 5000000) * 100))
        };

      default:
        return { achieved: false, desc: "未知條件", progressText: "0 / 0", percent: 0 };
    }
  }

  tryStrictGenesisUnlock(charId) {
    if (this.user.unlockedCharacters.includes(charId)) {
      return { success: false, reason: "該角色已經解鎖！" };
    }

    const check = this.getGenesisProgress(charId);
    if (!check.achieved) {
      return {
        success: false,
        reason: `❌ 尚未達成解鎖條件！\n\n【目標】：${check.desc}\n【目前進度】：${check.progressText} (${check.percent}%)\n\n請先在戰鬥中完成真實目標後再來領取！`
      };
    }

    this.unlockCharacter(charId);
    return { success: true, charId };
  }

  getAchievementProgress(ach) {
    const u = this.user;
    let current = 0;
    if (ach.type === "pvp_wins" || ach.type === "wins") current = u.pvpWins || 0;
    else if (ach.type === "total_damage") current = u.totalDamage || 0;
    else if (ach.type === "rank_trophies") current = u.trophies || 0;
    else if (ach.type === "boss_floor") current = u.bossRushMaxFloor || 0;
    else if (ach.type === "combo") current = u.maxCombo || 0;
    else current = 0;

    const achieved = current >= ach.target;
    const claimed = (u.achievementsClaimed || []).includes(ach.id);
    const percent = Math.min(100, Math.round((current / (ach.target || 1)) * 100));

    return { current, target: ach.target, achieved, claimed, percent };
  }

  claimAchievement(achId) {
    if (!this.user.achievementsClaimed) this.user.achievementsClaimed = [];
    if (this.user.achievementsClaimed.includes(achId)) {
      return { success: false, reason: "該成就獎勵已領取過！" };
    }

    const ach = window.ACHIEVEMENTS_DATA ? window.ACHIEVEMENTS_DATA.find(a => a.id === achId) : null;
    if (!ach) return { success: false, reason: "找不到該成就" };

    const prog = this.getAchievementProgress(ach);
    if (!prog.achieved) {
      return { success: false, reason: `尚未達成目標進度 (${prog.current} / ${prog.target})` };
    }

    this.user.achievementsClaimed.push(achId);
    this.addGold(ach.rewardGold || 1000);
    if (ach.unlockedHero) {
      this.unlockCharacter(ach.unlockedHero);
    }
    this.save();
    return { success: true, rewardGold: ach.rewardGold, unlockedHero: ach.unlockedHero };
  }

  setTeam(teamArray) {
    this.user.selectedTeam = teamArray.slice(0, 5);
    this.save();
  }

  addGold(amount) {
    this.user.gold += amount;
    this.save();
  }

  spendGold(amount) {
    if (this.user.gold >= amount) {
      this.user.gold -= amount;
      this.save();
      return true;
    }
    return false;
  }

  unlockCharacter(charId) {
    if (!this.user.unlockedCharacters.includes(charId)) {
      this.user.unlockedCharacters.push(charId);
      if (!this.user.characterLevels[charId]) {
        this.user.characterLevels[charId] = 1;
      }
      this.save();
      return true;
    }
    return false;
  }

  upgradeCharacter(charId) {
    const currentLvl = this.user.characterLevels[charId] || 1;
    if (currentLvl >= 100) return { success: false, reason: "已達最高等級 Lv.100" };

    const cost = Math.round(100 * Math.pow(currentLvl, 1.35));
    if (this.spendGold(cost)) {
      this.user.characterLevels[charId] = currentLvl + 1;
      this.save();
      return { success: true, newLevel: currentLvl + 1, cost };
    }
    return { success: false, reason: `金幣不足 (需要 ${cost} 金幣)` };
  }

  equipItem(charId, slotIndex, gearId) {
    if (!this.user.equippedGear[charId]) {
      this.user.equippedGear[charId] = [null, null, null, null];
    }
    this.user.equippedGear[charId][slotIndex - 1] = gearId;
    this.save();
  }

  unequipItem(charId, slotIndex) {
    if (this.user.equippedGear[charId]) {
      this.user.equippedGear[charId][slotIndex - 1] = null;
      this.save();
    }
  }

  recordMatchResult(isWin, damageDealt = 0, isPvp = true, isBossRush = false, floorNumber = 0, isSweep1v5 = false) {
    if (isPvp) {
      if (isWin) {
        this.user.pvpWins++;
        this.user.trophies += 30;
      } else {
        this.user.pvpLosses++;
        this.user.trophies = Math.max(0, this.user.trophies - 15);
      }
    }

    if (isBossRush && isWin && floorNumber > 0) {
      this.user.bossRushMaxFloor = Math.max(this.user.bossRushMaxFloor, floorNumber);
      this.user.psychoCrystals += 1; // 魔王塔掉落結晶
      if (floorNumber === 10) {
        this.user.bossRushNoDeathCleared = true;
      }
    }

    if (isSweep1v5) {
      this.user.has1v5Sweep = true;
    }

    this.user.totalDamage += damageDealt;
    this.save();
  }
}

if (typeof window !== "undefined") {
  window.saveSystem = new SaveSystem();
}
