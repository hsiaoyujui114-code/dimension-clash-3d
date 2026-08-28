/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * 帳號存檔、Google 登入與每日簽到獎勵系統 (Save System & Daily Rewards)
 */

const STORAGE_KEY = "DIMENSION_CLASH_ONLINE_SAVE_V2";

class SaveSystem {
  constructor() {
    this.user = {
      isLoggedIn: false, // 初始需登入 Google
      uid: "PLAYER_" + Math.floor(100000 + Math.random() * 900000),
      nickname: "次元格鬥家",
      email: "player@gmail.com",
      avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
      gold: 1500, // 初始登入贈送 1500 金幣
      trophies: 1000,
      pvpWins: 0,
      pvpLosses: 0,
      totalDamage: 0,
      bossRushFloor: 1,
      psychoCrystals: 0,
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

  loginWithGoogle(email = "player@gmail.com", nickname = "超次元戰神") {
    this.user.isLoggedIn = true;
    this.user.email = email;
    this.user.nickname = nickname;
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
      { day: 2, gold: 1000, desc: "1,000 金幣 + 綠階抽卡券" },
      { day: 3, gold: 1500, desc: "1,500 金幣 + 振金編織內襯" },
      { day: 4, gold: 2000, desc: "2,000 金幣 + 初鋼改裝零件" },
      { day: 5, gold: 3000, desc: "3,000 金幣 + 感應骨架結晶" },
      { day: 6, gold: 4000, desc: "4,000 金幣 + 特南克斯解鎖碎片" },
      { day: 7, gold: 10000, desc: "10,000 金幣 + 史詩英雄自選箱！" }
    ];

    const currentDay = this.user.dailyReward.streakDay;
    const reward = rewardsTable[(currentDay - 1) % rewardsTable.length];

    this.user.gold += reward.gold;
    this.user.dailyReward.claimedToday = true;
    this.user.dailyReward.lastClaimDate = todayStr;
    this.user.dailyReward.streakDay = (currentDay % 7) + 1;
    this.save();

    return { success: true, reward, nextStreakDay: this.user.dailyReward.streakDay };
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

  recordMatchResult(isWin, damageDealt = 0, isPvp = true) {
    if (isPvp) {
      if (isWin) {
        this.user.pvpWins++;
        this.user.trophies += 30;
      } else {
        this.user.pvpLosses++;
        this.user.trophies = Math.max(0, this.user.trophies - 15);
      }
    }
    this.user.totalDamage += damageDealt;
    this.save();
  }
}

if (typeof window !== "undefined") {
  window.saveSystem = new SaveSystem();
}
