/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * 帳號存檔、Google 登入模擬與雲端資料管理 (Account & Cloud Save System)
 */

const STORAGE_KEY = "DIMENSION_CLASH_ONLINE_SAVE_V1";

class SaveSystem {
  constructor() {
    this.user = {
      isLoggedIn: true,
      uid: "PLAYER_" + Math.floor(100000 + Math.random() * 900000),
      nickname: "次元格鬥家",
      email: "dimension.fighter@gmail.com",
      gold: 1500, // Starter bonus
      trophies: 1000,
      pvpWins: 0,
      pvpLosses: 0,
      totalDamage: 0,
      bossRushFloor: 1,
      psychoCrystals: 0,
      unlockedCharacters: ["goku_kid", "cap_america", "gm_rgm79"], // Free starters
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
      inventoryGear: [
        "gravity_wristband", "senzu_pouch", "potara_earring_single", "saiyan_spirit_chip",
        "vibranium_weave", "jarvis_tactical_os", "minovsky_reactor", "twin_beam_cannon_pack",
        "gn_drive_original", "super_dragoon_pack", "ifield_generator", "zero_system_chip"
      ],
      completedAchievements: ["ach_login"],
      claimedAchievements: []
    };

    this.load();
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

  loginWithGoogle(nickname = "超次元之王") {
    this.user.isLoggedIn = true;
    this.user.nickname = nickname;
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

    // Upgrade cost scaling formula
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

  exportSaveJson() {
    return JSON.stringify(this.user, null, 2);
  }

  importSaveJson(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      this.user = Object.assign(this.user, parsed);
      this.save();
      return true;
    } catch (e) {
      return false;
    }
  }

  resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

if (typeof window !== "undefined") {
  window.saveSystem = new SaveSystem();
}
