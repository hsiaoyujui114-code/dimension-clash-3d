(() => {
  // js/data/skills.js
  var SKILLS = [
    // ─── 核心飛行道具 & 遠程武器 (Ranged Weapons Arsenal) ───
    {
      id: "SK-01",
      name: "\u80FD\u91CF\u8108\u885D\u5F48",
      category: "ranged",
      type: "projectile",
      typeName: "\u76F4\u7DDA\u5C04\u64CA / \u9060\u7A0B\u6B66\u5668",
      cd: 0.8,
      // 快速冷卻：迅捷壓制
      damage: 185,
      startup: 5,
      active: 60,
      recovery: 6,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u638C\u5FC3\u805A\u80FD\u5C04\u51FA\u76F4\u7DDA\u9AD8\u901F\u6CE2\u5C0E\u5F48\uFF0C\u5177\u5099\u512A\u7570\u7684\u9060\u7A0B\u58D3\u5236\u8207\u903C\u8DF3\u80FD\u529B\u3002",
      counterGuide: "\u53EF\u7AD9\u7ACB\u683C\u64CB\u3001\u4E0B\u8E72\u683C\u64CB\uFF0C\u6216\u6293\u6E96\u8D77\u8DF3\u6642\u6A5F\u7FFB\u8D8A\u8EB2\u907F\u3002",
      icon: "fa-solid fa-bolt",
      color: "#00f3ff"
    },
    {
      id: "SK-10",
      name: "\u8D85\u8F09\u7D42\u7D50\u7832",
      category: "ranged",
      type: "ultimate_beam",
      typeName: "\u8CAB\u7A7F\u5DE8\u7832 / \u9060\u7A0B\u6B66\u5668",
      cd: 2.5,
      // 快速冷卻
      damage: 340,
      startup: 10,
      active: 16,
      recovery: 12,
      guardType: "all",
      chipRatio: 0.5,
      knockdown: true,
      description: "\u80F8\u90E8\u53CD\u61C9\u7210\u8D85\u8F09\u805A\u80FD\uFF0C\u5C04\u51FA\u8CAB\u7A7F\u5168\u87A2\u5E55\u4E4B\u96E2\u5B50\u5DE8\u7832\uFF0C\u5177\u5099\u6BC0\u6EC5\u7D1A\u6253\u64CA\u529B\u3002",
      counterGuide: "\u524D\u6416\u84C4\u80FD\u660E\u986F\uFF0C\u770B\u6E96\u5149\u8292\u53CA\u6642\u8D77\u8DF3\u8D8A\u904E\u6216\u4F7F\u7528\u6298\u8E8D\u65AC\u5947\u8972\u3002",
      icon: "fa-solid fa-sun",
      color: "#f97316"
    },
    {
      id: "SK-11",
      name: "\u8FFD\u8E64\u5FAE\u578B\u98DB\u5F48\u7FA4",
      category: "ranged",
      type: "homing_missiles",
      typeName: "\u5C0E\u5F15\u98DB\u5F48 / \u9060\u7A0B\u6B66\u5668",
      cd: 1.4,
      damage: 210,
      startup: 4,
      active: 70,
      recovery: 6,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u9023\u7E8C\u767C\u5C04 3 \u679A\u91CF\u5B50\u5C0E\u5F15\u5FAE\u578B\u98DB\u5F48\uFF0C\u5728\u7A7A\u4E2D\u5283\u51FA\u5F27\u7DDA\u81EA\u52D5\u8FFD\u8E64\u9396\u5B9A\u5C0D\u624B\uFF01",
      counterGuide: "\u5FAE\u5C0E\u5F48\u98DB\u884C\u8ECC\u8DE1\u53EF\u88AB\u8FD1\u8EAB\u653B\u64CA\u6253\u6D88\uFF0C\u6216\u5229\u7528\u8D77\u8DF3\u8207\u5E73\u53F0\u8D70\u4F4D\u8B93\u98DB\u5F48\u649E\u5730\u5F15\u7206\u3002",
      icon: "fa-solid fa-rocket",
      color: "#ec4899"
    },
    {
      id: "SK-12",
      name: "\u6298\u5C04\u7A1C\u93E1\u6FC0\u5149",
      category: "ranged",
      type: "bouncing_laser",
      typeName: "\u5F48\u5C04\u6FC0\u5149 / \u9060\u7A0B\u6B66\u5668",
      cd: 1.2,
      damage: 215,
      startup: 3,
      active: 75,
      recovery: 6,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u767C\u5C04\u8D85\u9AD8\u901F\u5E7E\u4F55\u7A1C\u93E1\u5149\u675F\uFF0C\u78B0\u89F8\u908A\u754C\u64C2\u53F0\u8207\u5730\u9762\u6642\u81EA\u52D5\u6298\u5C04\u53CD\u5F48\uFF01",
      counterGuide: "\u6CE8\u610F\u5149\u675F\u5F48\u5C04\u89D2\u5EA6\uFF0C\u5728\u53CD\u5F48\u8DEF\u5F91\u524D\u63D0\u524D\u958B\u555F\u9632\u8B77\u7F69\u6216\u8D77\u8DF3\u9A30\u7A7A\u3002",
      icon: "fa-solid fa-bolt-lightning",
      color: "#a855f7"
    },
    {
      id: "SK-13",
      name: "\u5929\u9802\u8ECC\u9053\u6253\u64CA",
      category: "ranged",
      type: "orbital_strike",
      typeName: "\u8ECC\u9053\u91CD\u7832 / \u9060\u7A0B\u6B66\u5668",
      cd: 2,
      damage: 255,
      startup: 8,
      active: 18,
      recovery: 8,
      guardType: "stand_only",
      // 天頂直擊中段判定，破蹲防！
      chipRatio: 0.5,
      knockdown: true,
      description: "\u547C\u53EB\u885B\u661F\u8ECC\u9053\u70AE\uFF0C\u9396\u5B9A\u5C0D\u624B\u5EA7\u6A19\u5F15\u5C0E\u5DE8\u578B\u96E2\u5B50\u5929\u96F7\u5782\u76F4\u8F5F\u64CA\uFF01\u4E0B\u8E72\u9632\u79A6\u7121\u6548\uFF01",
      counterGuide: "\u4E2D\u6BB5\u653B\u64CA\u4E0D\u53EF\u8E72\u9632\uFF01\u770B\u898B\u8173\u5E95\u51FA\u73FE\u9396\u5B9A\u7D05\u5708\u6642\u9700\u7AD9\u7ACB\u683C\u64CB\u6216\u8FC5\u901F\u5411\u524D\u7FFB\u6EFE\u96E2\u958B\u3002",
      icon: "fa-solid fa-satellite-dish",
      color: "#ffd700"
    },
    {
      id: "SK-14",
      name: "\u865B\u7A7A\u5F15\u529B\u9ED1\u6D1E\u7403",
      category: "ranged",
      type: "gravity_vortex",
      typeName: "\u9ED1\u6D1E\u529B\u5834 / \u9060\u7A0B\u6B66\u5668",
      cd: 2.2,
      damage: 200,
      startup: 5,
      active: 90,
      recovery: 8,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u5C04\u51FA\u7DE9\u6162\u63A8\u9032\u7684\u9ED1\u6D1E\u5F15\u529B\u7403\uFF0C\u5F37\u884C\u5C07\u9014\u7D93\u7684\u5C0D\u624B\u727D\u5F15\u5438\u5165\u4E26\u9020\u6210\u6301\u7E8C\u591A\u6BB5\u6253\u64CA\uFF01",
      counterGuide: "\u5F15\u529B\u7403\u79FB\u52D5\u7DE9\u6162\uFF0C\u4E0D\u53EF\u5728\u524D\u65B9\u5F8C\u9000\uFF0C\u61C9\u7ACB\u5373\u8D77\u8DF3\u7FFB\u8D8A\u6216\u65BD\u5C55\u77AC\u79FB\u7A7F\u8D8A\u3002",
      icon: "fa-solid fa-circle-notch",
      color: "#06b6d4"
    },
    {
      id: "SK-15",
      name: "\u9AD8\u65AF\u72D9\u64CA\u7A7F\u7532\u91CD\u69CD",
      category: "ranged",
      type: "sniper_railgun",
      typeName: "\u6975\u901F\u72D9\u64CA / \u9060\u7A0B\u6B66\u5668",
      cd: 1.1,
      damage: 245,
      startup: 3,
      active: 45,
      recovery: 7,
      guardType: "all",
      chipRatio: 0.5,
      knockdown: true,
      description: "\u9AD8\u7CBE\u6E96\u8D85\u97F3\u901F\u96FB\u78C1\u72D9\u64CA\u69CD\uFF01\u77AC\u767C\u5C04\u51FA\u7A7F\u7532\u96FB\u78C1\u5149\u675F\uFF0C\u5177\u5099\u6975\u81F4\u98DB\u884C\u901F\u5EA6\u8207\u91CD\u5EA6\u9707\u5C4F\u6253\u64CA\uFF01",
      counterGuide: "\u5B50\u5F48\u98DB\u884C\u901F\u5EA6\u6975\u5FEB\u96E3\u4EE5\u76EE\u62BC\uFF0C\u9700\u5728\u4E2D\u9060\u8DDD\u96E2\u4FDD\u6301\u9632\u5099\u59FF\u614B\u6216\u9032\u884C\u9AD8\u7A7A\u8D77\u8DF3\u727D\u5236\u3002",
      icon: "fa-solid fa-crosshairs",
      color: "#38bdf8"
    },
    {
      id: "SK-16",
      name: "\u64F4\u6563\u5F0F\u96FB\u6F3F\u9730\u5F48\u69CD",
      category: "ranged",
      type: "plasma_shotgun",
      typeName: "\u6247\u5F62\u9730\u5F48 / \u9060\u7A0B\u6B66\u5668",
      cd: 1.3,
      damage: 250,
      startup: 4,
      active: 50,
      recovery: 8,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u5411\u524D\u6247\u5F62\u9F4A\u5C04 5 \u679A\u9AD8\u80FD\u96FB\u6F3F\u9730\u5F48\uFF0C\u8FD1\u4E2D\u8DDD\u96E2\u8986\u84CB\u6574\u500B\u524D\u65B9\u7A7A\u9593\uFF0C\u5168\u5F48\u547D\u4E2D\u7206\u767C\u9A5A\u4EBA\uFF01",
      counterGuide: "\u8DDD\u96E2\u8D8A\u8FD1\u50B7\u5BB3\u8D8A\u9AD8\uFF0C\u62C9\u958B\u4E2D\u9060\u8DDD\u96E2\u5373\u53EF\u5229\u7528\u6563\u5F48\u7A7A\u9699\u8D77\u8DF3\u53CD\u5236\u3002",
      icon: "fa-solid fa-burst",
      color: "#f43f5e"
    },
    {
      id: "SK-17",
      name: "\u8108\u885D\u96FB\u78C1\u6D6E\u6E38\u7832",
      category: "ranged",
      type: "drone_funnel",
      typeName: "\u81EA\u52D5\u6D6E\u6E38 / \u9060\u7A0B\u6B66\u5668",
      cd: 1.8,
      damage: 225,
      startup: 3,
      active: 85,
      recovery: 6,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u53EC\u559A 2 \u67B6\u9AD8\u79D1\u6280\u6D6E\u6E38\u7121\u4EBA\u50DA\u6A5F\u74B0\u7E5E\u96A8\u884C\uFF0C\u81EA\u52D5\u5411\u5C0D\u624B\u767C\u5C04\u9023\u7E8C\u9AD8\u983B\u8108\u885D\u6FC0\u5149\uFF01",
      counterGuide: "\u6D6E\u6E38\u6A5F\u6301\u7E8C\u5C04\u64CA\uFF0C\u5207\u5FCC\u76F2\u76EE\u6436\u653B\uFF0C\u5229\u7528\u9632\u8B77\u7F69\u64CB\u4E0B\u524D\u6CE2\u6FC0\u5149\u5F8C\u8FC5\u901F\u8FD1\u8EAB\u58D3\u5236\u3002",
      icon: "fa-solid fa-satellite",
      color: "#10b981"
    },
    {
      id: "SK-18",
      name: "\u6975\u51CD\u51B0\u971C\u7A7F\u900F\u7BAD",
      category: "ranged",
      type: "cryo_arrow",
      typeName: "\u6E1B\u901F\u51B0\u7BAD / \u9060\u7A0B\u6B66\u5668",
      cd: 1.4,
      damage: 205,
      startup: 4,
      active: 65,
      recovery: 6,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u51DD\u805A\u7D55\u5C0D\u96F6\u5EA6\u6DB2\u6C2E\u51B0\u7BAD\u5C04\u51FA\uFF0C\u547D\u4E2D\u5C0D\u624B\u6642\u9644\u52A0\u300C\u5BD2\u971C\u6E1B\u901F\u300D\u72C0\u614B\uFF08\u79FB\u52D5\u901F\u5EA6\u964D\u4F4E 45%\uFF09\uFF01",
      counterGuide: "\u82E5\u88AB\u547D\u4E2D\u79FB\u52D5\u901F\u5EA6\u5C07\u5927\u5E45\u4E0B\u964D\uFF0C\u9700\u5229\u7528\u4E0B\u8E72\u9632\u79A6\u5316\u89E3\u6216\u8D77\u8DF3\u62C9\u958B\u8EAB\u4F4D\u7B49\u5F85\u5BD2\u971C\u892A\u53BB\u3002",
      icon: "fa-solid fa-snowflake",
      color: "#67e8f9"
    },
    {
      id: "SK-19",
      name: "\u707C\u71B1\u71C3\u71D2\u69B4\u5F48\u69CD",
      category: "ranged",
      type: "incendiary_grenade",
      typeName: "\u62CB\u7269\u69B4\u5F48 / \u9060\u7A0B\u6B66\u5668",
      cd: 1.6,
      damage: 220,
      startup: 5,
      active: 80,
      recovery: 8,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u62CB\u7269\u7DDA\u62CB\u5C04\u91CD\u578B\u71C3\u71D2\u69B4\u5F48\uFF0C\u89F8\u5730\u6216\u5E73\u53F0\u5F15\u7206\u751F\u6210\u4E00\u7247\u70C8\u7130\u706B\u6D77\uFF0C\u9020\u6210\u6301\u7E8C\u707C\u71D2\u50B7\u5BB3\uFF01",
      counterGuide: "\u71C3\u71D2\u706B\u6D77\u7559\u5B58\u65BC\u5730\u9762\u6578\u79D2\uFF0C\u4E0D\u53EF\u8E29\u5165\u706B\u6D77\uFF0C\u61C9\u8DF3\u4E0A\u6D6E\u7A7A\u5E73\u53F0\u6216\u8D8A\u904E\u706B\u5340\u4F5C\u6230\u3002",
      icon: "fa-solid fa-fire-flame-curved",
      color: "#ff5500"
    },
    {
      id: "SK-20",
      name: "\u8FF4\u65CB\u96F7\u9706\u5149\u5203\u93E2",
      category: "ranged",
      type: "boomerang_blade",
      typeName: "\u8FF4\u65CB\u98DB\u93E2 / \u9060\u7A0B\u6B66\u5668",
      cd: 1.2,
      damage: 230,
      startup: 3,
      active: 70,
      recovery: 6,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u64F2\u51FA\u9AD8\u983B\u65CB\u8F49\u4E4B\u96FB\u5149\u98DB\u5203\uFF0C\u5411\u524D\u7A7F\u900F\u6253\u64CA\u5F8C\u6298\u8FD4\u98DB\u56DE\uFF0C\u9020\u6210\u53BB\u7A0B\u8207\u56DE\u7A0B\u96D9\u91CD\u653B\u64CA\uFF01",
      counterGuide: "\u98DB\u93E2\u5177\u6709\u56DE\u65CB\u7279\u6027\uFF01\u64CB\u4E0B\u524D\u64CA\u5F8C\u4E0D\u53EF\u7ACB\u5373\u9B06\u958B\u9632\u79A6\uFF0C\u9700\u63D0\u9632\u80CC\u5F8C\u98DB\u56DE\u7684\u6298\u8FD4\u5203\u3002",
      icon: "fa-solid fa-compact-disc",
      color: "#eab308"
    },
    // ─── 核心近戰武裝與體術 (Melee & Martial Skills) ───
    {
      id: "SK-02",
      name: "\u5347\u9F8D\u885D\u5929\u64CA",
      category: "melee",
      type: "anti_air",
      typeName: "\u5C0D\u7A7A\u7A81\u9032 / \u8FD1\u6230\u6B66\u6280",
      cd: 1.2,
      // 快速冷卻
      damage: 235,
      startup: 3,
      active: 12,
      recovery: 10,
      invincibleFrames: 4,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u524D 3 \u5E40\u5168\u8EAB\u7121\u6575\uFF0C\u659C\u4E0A\u65B9\u9AD8\u9AD8\u8E8D\u8D77\u65CB\u8F49\u6607\u9F8D\u6253\u64CA\uFF0C\u6975\u81F4\u9632\u7A7A\u8207\u89E3\u570D\u795E\u6280\u3002",
      counterGuide: "\u524D\u6416\u7121\u6575\u96E3\u4EE5\u6436\u653B\uFF1B\u82E5\u5C0D\u65B9\u843D\u7A7A\u5F8C\u6416\u6975\u9577\uFF0C\u8457\u5730\u6642\u53EF\u9032\u884C\u6EFF\u984D\u78BA\u53CD\u8655\u7F70\u3002",
      icon: "fa-solid fa-dragon",
      color: "#38bdf8"
    },
    {
      id: "SK-03",
      name: "\u97F3\u901F\u6ED1\u8E22",
      category: "melee",
      type: "low",
      typeName: "\u4E0B\u6BB5\u7A81\u9032 / \u8FD1\u6230\u6B66\u6280",
      cd: 1,
      // 快速冷卻
      damage: 190,
      startup: 4,
      active: 14,
      recovery: 6,
      guardType: "crouch_only",
      chipRatio: 0.5,
      knockdown: true,
      description: "\u8CBC\u5730\u75BE\u885D\u6ED1\u93DF\uFF0C\u547D\u4E2D\u5FC5\u5B9A\u9020\u6210\u5C0D\u624B\u4E0B\u76E4\u5931\u8861\u64CA\u5012\u3002\u7AD9\u7ACB\u9632\u79A6\u7121\u6548\uFF01",
      counterGuide: "\u4E0D\u53EF\u7AD9\u7ACB\u9632\u79A6\uFF0C\u5FC5\u9808\u8FC5\u901F\u5207\u63DB\u70BA\u4E0B\u8E72\u9632\u79A6\u65B9\u53EF\u5316\u89E3\u3002",
      icon: "fa-solid fa-shoe-prints",
      color: "#a855f7"
    },
    {
      id: "SK-04",
      name: "\u8E8D\u7A7A\u9707\u5730\u7838",
      category: "melee",
      type: "overhead",
      typeName: "\u4E2D\u6BB5\u7834\u9632 / \u8FD1\u6230\u6B66\u6280",
      cd: 1.3,
      // 快速冷卻
      damage: 240,
      startup: 8,
      active: 10,
      recovery: 8,
      guardType: "stand_only",
      chipRatio: 0.5,
      knockdown: true,
      description: "\u7E31\u8EAB\u8E8D\u4E0A\u534A\u7A7A\u96D9\u62F3\u5408\u9318\u91CD\u64CA\u5730\u9762\uFF0C\u7834\u9664\u5C0D\u624B\u4E0B\u8E72\u9F9C\u7E2E\u3002\u4E0B\u8E72\u9632\u79A6\u7121\u6548\uFF01",
      counterGuide: "\u4E0D\u53EF\u8E72\u9632\uFF01\u770B\u898B\u89D2\u8272\u8E8D\u8D77\u524D\u6416\u6642\u5FC5\u9808\u7ACB\u5373\u5207\u63DB\u70BA\u7AD9\u7ACB\u683C\u64CB\u3002",
      icon: "fa-solid fa-hand-fist",
      color: "#f59e0b"
    },
    {
      id: "SK-05",
      name: "\u5E7B\u5F71\u53CD\u64CA\u58C1",
      category: "melee",
      type: "parry",
      typeName: "\u67B6\u62DB\u53CD\u5236 / \u6230\u8853\u6B66\u88DD",
      cd: 1.5,
      // 快速冷卻
      damage: 275,
      startup: 1,
      active: 22,
      recovery: 6,
      guardType: "none",
      chipRatio: 0.5,
      description: "\u5C55\u958B 22 \u5E40\u7684\u53CD\u64CA\u529B\u5834\u3002\u53D7\u8FD1\u8EAB\u8089\u640F\u6642\u76F4\u63A5\u5438\u6536\u50B7\u5BB3\u4E26\u53CD\u64CA\u64CA\u6688\u5C0D\u624B\u3002",
      counterGuide: "\u770B\u898B\u67B6\u62DB\u529B\u5834\u5207\u52FF\u51FA\u62F3\uFF0C\u76F4\u63A5\u4F7F\u7528\u6307\u4EE4\u6454\u6280\uFF08SK-08\uFF09\u6216\u5F8C\u64A4\u7B49\u5F85\u6536\u62DB\u3002",
      icon: "fa-solid fa-shield-halved",
      color: "#ec4899"
    },
    {
      id: "SK-06",
      name: "\u865B\u7A7A\u6298\u8E8D\u65AC",
      category: "melee",
      type: "teleport",
      typeName: "\u4F4D\u79FB\u5947\u8972 / \u6230\u8853\u6B66\u88DD",
      cd: 1.8,
      // 快速冷卻
      damage: 225,
      startup: 5,
      active: 8,
      recovery: 8,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u5316\u4F5C\u6B98\u5F71\u76F4\u63A5\u77AC\u79FB\u81F3\u5C0D\u624B\u6B63\u80CC\u5F8C\u5283\u51FA\u6A6B\u65AC\uFF0C\u80FD\u7A7F\u900F\u4E00\u5207\u6CE2\u5C0E\u8207\u98DB\u884C\u9053\u5177\u3002",
      counterGuide: "\u5C0D\u624B\u77AC\u79FB\u6D88\u5931\u77AC\u9593\uFF0C\u9700\u7ACB\u523B\u8F49\u8EAB\u62C9\u5411\u53CD\u65B9\u5411\u7DAD\u6301\u9632\u5B88\u59FF\u614B\u3002",
      icon: "fa-solid fa-wand-magic-sparkles",
      color: "#6366f1"
    },
    {
      id: "SK-07",
      name: "\u767E\u88C2\u9023\u64CA\u885D",
      category: "melee",
      type: "rush",
      typeName: "\u9AD8\u6BB5\u58D3\u5236 / \u8FD1\u6230\u6B66\u6280",
      cd: 1.2,
      // 快速冷卻
      damage: 260,
      startup: 4,
      active: 20,
      recovery: 6,
      guardType: "all",
      chipRatio: 0.5,
      description: "\u524D\u8DE8\u5FEB\u901F\u6253\u51FA 5 \u9023\u6BB5\u5BC6\u96C6\u9AD4\u8853\uFF0C\u6700\u5F8C\u4E00\u638C\u64CA\u9000\u5C0D\u624B\uFF0C\u524A\u9632\u91CF\u8207\u58D3\u8FEB\u611F\u6975\u9AD8\u3002",
      counterGuide: "\u4FDD\u6301\u9023\u7E8C\u683C\u64CB\uFF0C\u7B49\u5F85\u5176\u6253\u5B8C 5 \u6BB5\u9032\u5165\u6536\u62DB\u786C\u76F4\u6642\u679C\u65B7\u51FA\u62F3\u78BA\u53CD\u3002",
      icon: "fa-solid fa-meteor",
      color: "#10b981"
    },
    {
      id: "SK-08",
      name: "\u78C1\u66B4\u91CD\u6454\u6295",
      category: "melee",
      type: "command_grab",
      typeName: "\u6307\u4EE4\u6454\u6280 / \u8FD1\u6230\u6B66\u88DD",
      cd: 1.6,
      // 快速冷卻
      damage: 290,
      startup: 4,
      active: 6,
      recovery: 8,
      armor: true,
      guardType: "unblockable",
      chipRatio: 0.5,
      knockdown: true,
      description: "\u524D\u6416\u9644\u5E36\u9738\u9AD4\uFF0C\u5411\u524D\u5F37\u6293\u5C0D\u624B\u72E0\u72E0\u8CAB\u5165\u5730\u9762\uFF0C\u5B8C\u5168\u7121\u8996\u9632\u79A6\u529B\u5834\uFF01",
      counterGuide: "\u7121\u6CD5\u9632\u79A6\uFF01\u4E0D\u53EF\u9F9C\u7E2E\u9632\u5B88\uFF0C\u5FC5\u9808\u5728\u8DDD\u96E2\u5916\u8D77\u8DF3\u8EB2\u907F\u6216\u6436\u5148\u51FA\u523A\u62F3\u6253\u65B7\u3002",
      icon: "fa-solid fa-magnet",
      color: "#e11d48"
    },
    {
      id: "SK-09",
      name: "\u5948\u7C73\u9707\u6CE2\u7F69",
      category: "melee",
      type: "radial_blast",
      typeName: "\u64CA\u9000\u9632\u8B77 / \u6230\u8853\u6B66\u88DD",
      cd: 1.8,
      // 快速冷卻
      damage: 175,
      startup: 3,
      active: 10,
      recovery: 6,
      guardType: "all",
      chipRatio: 0.5,
      knockback: 280,
      description: "\u5468\u8EAB\u5411\u5916\u8FF8\u767C\u74B0\u5F62\u8108\u885D\u885D\u64CA\u6CE2\uFF0C\u5F37\u884C\u63A8\u958B\u8CBC\u8EAB\u5C0D\u624B\uFF0C\u5316\u89E3\u7248\u908A\u58D3\u5236\u5371\u6A5F\u3002",
      counterGuide: "\u50B7\u5BB3\u8F03\u4F4E\u4F46\u64CA\u9000\u8DDD\u96E2\u6975\u9060\uFF0C\u907F\u514D\u8CBC\u8EAB\u8CAA\u5200\uFF0C\u4FDD\u6301\u4E2D\u8DDD\u96E2\u62C9\u626F\u3002",
      icon: "fa-solid fa-atom",
      color: "#14b8a6"
    }
  ];
  var ARCHETYPES = [
    {
      id: "wave_dp",
      name: "\u6CE2\u5347\u63A7\u5236\u6D41",
      desc: "\u9060\u7A0B\u767C\u6CE2\u903C\u8DF3\uFF0C\u5347\u9F8D\u7A7A\u4E2D\u622A\u64CA\uFF0C\u9707\u6CE2\u5316\u89E3\u8FD1\u8EAB",
      skills: ["SK-01", "SK-02", "SK-09"],
      badge: "\u7D93\u5178\u727D\u5236"
    },
    {
      id: "ranged_artillery",
      name: "\u5168\u57DF\u91CD\u7832\u706B\u529B\u6D41",
      desc: "\u8FFD\u8E64\u98DB\u5F48\u9396\u5B9A\u3001\u6298\u5C04\u6FC0\u5149\u58D3\u5236\u3001\u5929\u9802\u8ECC\u9053\u91CD\u7832\u8F5F\u9802\uFF0C\u5168\u5C4F\u706B\u529B\u8986\u84CB",
      skills: ["SK-11", "SK-12", "SK-13"],
      badge: "\u6975\u81F4\u5C04\u624B"
    },
    {
      id: "sniper_freeze",
      name: "\u72D9\u64CA\u51B0\u971C\u727D\u5236\u6D41",
      desc: "\u9AD8\u65AF\u8D85\u97F3\u901F\u72D9\u64CA\u69CD\u7A7F\u900F\u3001\u6975\u51CD\u51B0\u7BAD\u6E1B\u901F\u63A7\u5834\u3001\u8FF4\u65CB\u5149\u5203\u53BB\u7A0B\u56DE\u7A0B\u96D9\u6253\u64CA",
      skills: ["SK-15", "SK-18", "SK-20"],
      badge: "\u7A7F\u7532\u72D9\u6BBA"
    },
    {
      id: "shotgun_funnel",
      name: "\u6563\u5F48\u6D6E\u6E38\u706B\u529B\u6D41",
      desc: "\u64F4\u6563\u9730\u5F48\u6B63\u9762\u5C01\u9396\u3001\u6D6E\u6E38\u6A5F\u81EA\u52D5\u9023\u7E8C\u96F7\u5C04\u63A9\u8B77\u3001\u71C3\u71D2\u69B4\u5F48\u5C01\u9396\u5730\u9762",
      skills: ["SK-16", "SK-17", "SK-19"],
      badge: "\u5BC6\u96C6\u7FA4\u706B"
    },
    {
      id: "low_rush",
      name: "\u4E0B\u6BB5\u72C2\u653B\u6D41",
      desc: "\u4EA4\u66FF\u4F7F\u7528\u6ED1\u8E22\uFF08\u4E0B\u6BB5\uFF09\u8207\u8E8D\u7A7A\u7838\uFF08\u4E2D\u6BB5\uFF09\u7834\u58DE\u5C0D\u624B\u9632\u5B88\u91CD\u5FC3",
      skills: ["SK-03", "SK-04", "SK-07"],
      badge: "\u96D9\u64C7\u7834\u9632"
    },
    {
      id: "counter_cross",
      name: "\u5947\u8972\u53CD\u6253\u6D41",
      desc: "\u77AC\u79FB\u7A7F\u900F\u9060\u7A0B\u6CE2\u5C0E\uFF0C\u67B6\u62DB\u53CD\u5236\u8FD1\u6230\uFF0C\u6307\u4EE4\u6454\u5F37\u5236\u7834\u9632",
      skills: ["SK-05", "SK-06", "SK-08"],
      badge: "\u9748\u6D3B\u53CD\u64CA"
    }
  ];

  // js/data/skins.js
  var SKINS = [
    // ── 3 套初始預設外觀 ──
    {
      id: "skin_cyber_warrior",
      name: "\u8CFD\u535A\u6B66\u8005",
      title: "\u5168\u606F\u524D\u7DDA\u5C16\u5175",
      category: "default",
      series: "\u7D93\u5178\u5148\u92D2",
      price: 0,
      isDefault: true,
      themeColor: "#00f3ff",
      secondaryColor: "#ffffff",
      glowColor: "rgba(0, 243, 255, 0.6)",
      accentColor: "#38bdf8",
      armorColor: "#0f172a",
      visorColor: "#00f3ff",
      coreColor: "#00f3ff",
      desc: "\u6A19\u6E96\u914D\u7F6E\u578B\u5168\u606F\u6B66\u88DD\uFF0C\u6D41\u66A2\u7684\u4EBA\u9AD4\u5DE5\u5B78\u5E7E\u4F55\u5916\u88DD\uFF0C\u642D\u8F09\u7B2C 4 \u4EE3\u91CF\u5B50\u5149\u5B50\u53CD\u61C9\u7210\u3002",
      vfx: {
        punchTrail: "\u9752\u85CD\u8272\u5168\u606F\u6578\u4F4D\u5200\u5149\u3001\u5168\u606F\u5149\u65B9\u584A",
        sk1: "\u9752\u85CD\u8272\u7B49\u96E2\u5B50\u96FB\u6F3F\u7403\uFF0C\u9644\u5E36\u85CD\u8272\u96FB\u6D41\u62D6\u5C3E",
        sk2: "\u62D4\u5730\u800C\u8D77\u4E4B\u9752\u8272\u65CB\u8F49\u96FB\u5F27\u5149\u67F1",
        guardShield: "\u5168\u606F\u7ACB\u65B9\u9AD4\u5E7E\u4F55\u9632\u79A6\u9663",
        hitEffect: "\u85CD\u8272\u6676\u7247\u706B\u82B1"
      },
      creator: "Official Core"
    },
    {
      id: "skin_neon_shadow",
      name: "\u9713\u8679\u6697\u5F71\u523A\u5BA2",
      title: "\u6697\u5F71\u533F\u8E64\u99ED\u5BA2",
      category: "default",
      series: "\u6697\u591C\u9713\u8679",
      price: 0,
      isDefault: true,
      themeColor: "#ff007f",
      secondaryColor: "#c084fc",
      glowColor: "rgba(255, 0, 127, 0.6)",
      accentColor: "#e879f9",
      armorColor: "#180d24",
      visorColor: "#ff007f",
      coreColor: "#ff007f",
      desc: "\u5C08\u70BA\u591C\u9593\u6F5B\u5165\u8A2D\u8A08\u7684\u6697\u5F71\u5916\u88DD\uFF0C\u6B66\u5668\u642D\u8F09\u6D0B\u7D05\u8D85\u983B\u9AD8\u983B\u5149\u5203\u8207\u6AFB\u82B1\u7159\u9727\u533F\u8E64\u5857\u5C64\u3002",
      vfx: {
        punchTrail: "\u6D0B\u7D05\u80FD\u91CF\u5149\u5203\u5207\u75D5\u3001\u6697\u5F71\u6B98\u50CF",
        sk1: "\u6D0B\u7D05\u6AFB\u82B1\u72C0\u5149\u5B50\u87BA\u65CB\u5F48\uFF0C\u62D6\u66F3\u6697\u5F71\u7159\u9727",
        sk2: "\u7D2B\u8272\u6607\u7A7A\u6697\u5F71\u65CB\u98A8\uFF0C\u4F34\u96A8\u6AFB\u82B1\u7C92\u5B50",
        guardShield: "\u6697\u5F71\u7159\u5E55\u5E7E\u4F55\u8B77\u76FE",
        hitEffect: "\u7C89\u7D2B\u5149\u8292\u65AC\u75D5"
      },
      creator: "Official Core"
    },
    {
      id: "skin_pulse_enforcer",
      name: "\u8108\u885D\u91CD\u88DD\u57F7\u6CD5\u5B98",
      title: "\u6975\u9650\u8B66\u5099\u91CD\u88DD",
      category: "default",
      series: "\u91CD\u88DD\u9632\u79A6",
      price: 0,
      isDefault: true,
      themeColor: "#ffd700",
      secondaryColor: "#f59e0b",
      glowColor: "rgba(255, 215, 0, 0.6)",
      accentColor: "#fbbf24",
      armorColor: "#1c1917",
      visorColor: "#ffd700",
      coreColor: "#ffd700",
      desc: "\u7279\u7A2E\u6CBB\u5B89\u88DD\u7532\uFF0C\u539A\u91CD\u91D1\u5C6C\u9676\u74F7\u88DD\u7532\u677F\u8207\u8D85\u5C0E\u91CD\u529B\u767C\u96FB\u6A5F\uFF0C\u51FA\u62F3\u9644\u5E36\u96FB\u9583\u96F7\u9CF4\u3002",
      vfx: {
        punchTrail: "\u91D1\u8272\u91D1\u5C6C\u91CD\u62F3\u6C23\u6D6A\u3001\u91D1\u9EC3\u7206\u88C2\u96FB\u78C1",
        sk1: "\u91D1\u9EC3\u8272\u91CD\u97F3\u7206\u9707\u6CE2\u5F48\uFF0C\u5E36\u6709\u91CD\u529B\u6CE2\u5708",
        sk2: "\u91D1\u8272\u96FB\u9583\u96F7\u9CF4\u5DE8\u62F3\uFF0C\u9707\u788E\u5730\u9762\u88C2\u75D5",
        guardShield: "\u91D1\u8272\u83F1\u5F62\u539A\u7532\u8B77\u76FE",
        hitEffect: "\u91D1\u9EC3\u8272\u96F7\u96FB\u70B8\u88C2"
      },
      creator: "Official Core"
    },
    // ── 商城熱門角色 (依價格梯度排列，豐富多元風格) ──
    {
      id: "skin_cosmic_ronin",
      name: "\u661F\u7A79\u91CF\u5B50\u6D6A\u4EBA",
      title: "\u661F\u969B\u6D41\u6D6A\u5C45\u5408\u528D\u5BA2",
      category: "shop",
      series: "\u6771\u65B9\u6A5F\u6B66",
      price: 1800,
      isDefault: false,
      themeColor: "#818cf8",
      secondaryColor: "#c084fc",
      glowColor: "rgba(129, 140, 248, 0.6)",
      accentColor: "#a5b4fc",
      armorColor: "#1e1b4b",
      visorColor: "#818cf8",
      coreColor: "#c084fc",
      desc: "\u6F2B\u904A\u661F\u96F2\u7684\u7121\u4E3B\u6B66\u58EB\uFF0C\u4F69\u6234\u647A\u758A\u96FB\u6F3F\u592A\u5200\uFF0C\u51FA\u62DB\u5982\u6D41\u661F\u96E8\u822C\u7D62\u9E97\u6D41\u66A2\u3002",
      vfx: {
        punchTrail: "\u975B\u85CD\u661F\u5875\u5200\u5F27\u3001\u661F\u8292\u6B98\u8DE1",
        sk1: "\u7D2B\u85CD\u8272\u5F57\u661F\u6838\u5FC3\u5F48\uFF0C\u62D6\u66F3\u661F\u5875\u661F\u74B0",
        sk2: "\u7834\u7A7A\u6C96\u5929\u4E4B\u661F\u96F2\u6F29\u6E26\u65AC",
        guardShield: "\u661F\u74B0\u516B\u5366\u8B77\u9AD4\u9663",
        hitEffect: "\u7480\u74A8\u661F\u5C51\u8FF8\u767C"
      },
      creator: "Community Workshop (PR #19)"
    },
    {
      id: "skin_volt_ranger",
      name: "\u96F7\u9706\u795E\u901F\u904A\u4FE0",
      title: "\u8D85\u97F3\u901F\u96FB\u78C1\u5148\u92D2",
      category: "shop",
      series: "\u5143\u7D20\u8D85\u8F09",
      price: 2e3,
      isDefault: false,
      themeColor: "#facc15",
      secondaryColor: "#fde047",
      glowColor: "rgba(250, 204, 21, 0.6)",
      accentColor: "#eab308",
      armorColor: "#1a1702",
      visorColor: "#facc15",
      coreColor: "#fde047",
      desc: "\u5B89\u88DD\u8D85\u9AD8\u58D3\u7279\u65AF\u62C9\u7DDA\u5708\u7684\u6975\u901F\u523A\u5BA2\uFF0C\u5468\u8EAB\u6C38\u9060\u74B0\u7E5E\u8457\u6ECB\u6ECB\u4F5C\u97FF\u7684\u767E\u842C\u4F0F\u7279\u9AD8\u58D3\u96FB\u5F27\u3002",
      vfx: {
        punchTrail: "\u91D1\u9EC3\u9023\u9396\u9583\u96FB\u9739\u9742\u5149\u75D5",
        sk1: "\u9AD8\u983B\u65CB\u8F49\u7279\u65AF\u62C9\u7403\u578B\u9583\u96FB",
        sk2: "\u5F15\u96F7\u6C96\u5929\u4E4B\u66B4\u98A8\u96F7\u67F1",
        guardShield: "\u767E\u842C\u4F0F\u7279\u96FB\u78C1\u611F\u61C9\u7F69",
        hitEffect: "\u9AD8\u58D3\u96FB\u706B\u82B1\u70B8\u88C2"
      },
      creator: "Community Workshop (PR #24)"
    },
    {
      id: "skin_abyssal_ghost",
      name: "\u6DF1\u6DF5\u5E7D\u9748\u7279\u5DE5",
      title: "\u9ED1\u6C34\u6DF1\u6D77\u533F\u8E64\u523A\u5BA2",
      category: "shop",
      series: "\u7279\u52E4\u8ADC\u5F71",
      price: 2200,
      isDefault: false,
      themeColor: "#06b6d4",
      secondaryColor: "#22d3ee",
      glowColor: "rgba(6, 182, 212, 0.6)",
      accentColor: "#67e8f9",
      armorColor: "#082f49",
      visorColor: "#06b6d4",
      coreColor: "#06b6d4",
      desc: "\u914D\u5099\u5168\u50CF\u6298\u5C04\u8FF7\u5F69\u8207\u6C34\u51B7\u53CD\u61C9\u5806\u7684\u5E7D\u9748\u7279\u52D9\uFF0C\u5728\u9ED1\u6697\u4E2D\u5B9B\u5982\u6DF1\u6D77\u63A0\u98DF\u8005\u822C\u81F4\u547D\u3002",
      vfx: {
        punchTrail: "\u9752\u78A7\u8272\u6C34\u6CE2\u6F23\u6F2A\u5149\u8ECC",
        sk1: "\u9AD8\u58D3\u6C34\u6D41\u7B49\u96E2\u5B50\u7A7F\u7532\u5F48",
        sk2: "\u65CB\u8F49\u5347\u9A30\u4E4B\u6DF1\u6D77\u6F29\u6E26\u5674\u5C04\u6D41",
        guardShield: "\u8D85\u6D41\u9AD4\u6298\u5C04\u5E7E\u4F55\u529B\u5834",
        hitEffect: "\u6C34\u85CD\u8272\u8072\u7D0D\u8108\u885D\u74B0"
      },
      creator: "Community Workshop (PR #31)"
    },
    {
      id: "skin_dark_hacker",
      name: "\u6697\u9ED1\u99ED\u5BA2",
      title: "\u4E8C\u9032\u5236\u6DF1\u7DB2\u5E7B\u5F71",
      category: "shop",
      series: "\u77E9\u9663\u4EE3\u78BC",
      price: 2500,
      isDefault: false,
      themeColor: "#00ff66",
      secondaryColor: "#34d399",
      glowColor: "rgba(0, 255, 102, 0.6)",
      accentColor: "#10b981",
      armorColor: "#052e16",
      visorColor: "#00ff66",
      coreColor: "#00ff66",
      desc: "\u6DF1\u7DB2\u6F2B\u904A\u8005\u7684\u795E\u79D8\u9ED1\u5BA2\u88DD\uFF0C\u5168\u8EAB\u6E67\u52D5\u8457 0 \u8207 1 \u7684\u4E8C\u9032\u5236\u7DA0\u8272\u4EE3\u78BC\u6D41\uFF0C\u65AC\u64CA\u7834\u58DE\u73FE\u5BE6\u3002",
      vfx: {
        punchTrail: "\u7DA0\u8272 0 \u8207 1 \u4E8C\u9032\u5236\u4EE3\u78BC\u6D41\u63EE\u780D",
        sk1: "\u7DA0\u8272\u7D42\u7AEF\u5B57\u7B26\u4EE3\u78BC\u5149\u675F\u7403",
        sk2: "\u5782\u76F4\u5347\u9A30\u4E4B\u7DA0\u8272\u6578\u64DA\u77E9\u9663\u5149\u7246",
        guardShield: "\u7DA0\u8272\u6383\u63CF\u7DDA\u4EE3\u78BC\u529B\u5834",
        hitEffect: "\u7DA0\u8272\u50CF\u7D20\u6578\u64DA\u5149\u5875"
      },
      creator: "Community Workshop (PR #42)"
    },
    {
      id: "skin_nano_cyborg",
      name: "\u5948\u7C73\u751F\u5316\u6230\u8B66",
      title: "\u751F\u5316\u6DB2\u614B\u91D1\u5C6C\u6539\u9020\u4EBA",
      category: "shop",
      series: "\u751F\u5316\u79D1\u6280",
      price: 2600,
      isDefault: false,
      themeColor: "#84cc16",
      secondaryColor: "#a3e635",
      glowColor: "rgba(132, 204, 22, 0.6)",
      accentColor: "#65a30d",
      armorColor: "#142005",
      visorColor: "#84cc16",
      coreColor: "#bef264",
      desc: "\u56DB\u80A2\u7531\u5341\u5104\u7D1A\u5948\u7C73\u6A5F\u68B0\u7FA4\u69CB\u6210\uFF0C\u51FA\u62F3\u6642\u6DB2\u614B\u91D1\u5C6C\u80FD\u96A8\u5FC3\u6240\u6B32\u8B8A\u5F62\u70BA\u5C16\u523A\u8207\u5DE8\u5203\u3002",
      vfx: {
        punchTrail: "\u6BD2\u7DA0\u6DB2\u614B\u91D1\u5C6C\u8B8A\u5F62\u523A\u5203\u5149\u75D5",
        sk1: "\u5BC6\u96C6\u8702\u7FA4\u5948\u7C73\u6A5F\u68B0\u5718",
        sk2: "\u6DB2\u614B\u91D1\u5C6C\u5DE8\u77DB\u6C96\u5929\u7A7F\u523A",
        guardShield: "\u516D\u89D2\u5948\u7C73\u81EA\u6211\u4FEE\u5FA9\u76FE",
        hitEffect: "\u8702\u5DE2\u6676\u683C\u91D1\u5C6C\u788E\u5C51"
      },
      creator: "Community Workshop (PR #48)"
    },
    {
      id: "skin_crimson_tyrant",
      name: "\u8D64\u7D05\u66B4\u541B\u91CD\u6A5F\u7532",
      title: "\u7194\u5CA9\u8D85\u8F09\u91CD\u88DD\u72C2\u6230\u58EB",
      category: "shop",
      series: "\u91CD\u88DD\u9632\u79A6",
      price: 2800,
      isDefault: false,
      themeColor: "#ef4444",
      secondaryColor: "#f97316",
      glowColor: "rgba(239, 68, 68, 0.6)",
      accentColor: "#dc2626",
      armorColor: "#2b0707",
      visorColor: "#ef4444",
      coreColor: "#f97316",
      desc: "\u91CD\u578B\u8FD1\u6230\u653B\u57CE\u6A5F\u7532\uFF0C\u642D\u8F09\u7194\u5CA9\u904E\u71B1\u52D5\u529B\u7210\uFF0C\u6BCF\u4E00\u6B21\u91CD\u62F3\u63EE\u52D5\u7686\u4F34\u96A8\u6FC3\u7159\u8207\u9AD8\u6EAB\u7194\u6E23\u3002",
      vfx: {
        punchTrail: "\u71BE\u7D05\u7194\u5CA9\u904E\u71B1\u91CD\u62F3\u5149\u75D5\u3001\u706B\u661F\u56DB\u6FFA",
        sk1: "\u9AD8\u6EAB\u71C3\u71D2\u7194\u5CA9\u5DE8\u7403\uFF0C\u5E36\u9ED1\u7159\u5C3E\u8DE1",
        sk2: "\u706B\u5C71\u5674\u767C\u822C\u5730\u88C2\u706B\u67F1\u5347\u9A30",
        guardShield: "\u5C16\u523A\u91CD\u88DD\u751F\u9435\u71BE\u708E\u76FE",
        hitEffect: "\u8D64\u7D05\u9AD8\u71B1\u706B\u82B1\u788E\u88C2"
      },
      creator: "Community Workshop (PR #53)"
    },
    {
      id: "skin_cryo_maiden",
      name: "\u6975\u5BD2\u8D85\u5C0E\u6B66\u59EC",
      title: "\u7D55\u5C0D\u96F6\u5EA6\u51B0\u6676\u5B88\u885B",
      category: "shop",
      series: "\u5143\u7D20\u8D85\u8F09",
      price: 3e3,
      isDefault: false,
      themeColor: "#38bdf8",
      secondaryColor: "#e0f2fe",
      glowColor: "rgba(56, 189, 248, 0.6)",
      accentColor: "#7dd3fc",
      armorColor: "#08253a",
      visorColor: "#38bdf8",
      coreColor: "#bae6fd",
      desc: "\u642D\u8F09\u8D85\u5C0E\u4F4E\u6EAB\u51B7\u51CD\u6280\u8853\u7684\u6230\u9B25\u4EBA\u5F62\uFF0C\u5468\u8EAB\u7C60\u7F69\u8457\u6975\u81F4\u7684\u51B0\u85CD\u5BD2\u971C\u8207\u947D\u77F3\u51B0\u6676\u5875\u57C3\u3002",
      vfx: {
        punchTrail: "\u96EA\u767D\u51B0\u7A1C\u5207\u9762\u3001\u51B0\u971C\u5149\u9727",
        sk1: "\u65CB\u8F49\u6975\u5BD2\u51B0\u9B44\u6C34\u6676\u5F48",
        sk2: "\u62D4\u5730\u800C\u8D77\u4E4B\u53C3\u5929\u51B0\u523A\u5DE8\u5854",
        guardShield: "\u947D\u77F3\u7A1C\u93E1\u51B0\u58C1\u9632\u79A6",
        hitEffect: "\u51B0\u6676\u788E\u88C2\u6676\u7469\u96EA\u82B1"
      },
      creator: "Community Workshop (PR #59)"
    },
    {
      id: "skin_void_devourer",
      name: "\u865B\u7A7A\u541E\u566C\u8005",
      title: "\u53CD\u7269\u8CEA\u9ED1\u6D1E\u5947\u9EDE\u884C\u8005",
      category: "shop",
      series: "\u672A\u4F86\u6A5F\u795E",
      price: 3200,
      isDefault: false,
      themeColor: "#9333ea",
      secondaryColor: "#a855f7",
      glowColor: "rgba(147, 51, 234, 0.6)",
      accentColor: "#7e22ce",
      armorColor: "#0a0212",
      visorColor: "#c084fc",
      coreColor: "#9333ea",
      desc: "\u7531\u6697\u7269\u8CEA\u80FD\u91CF\u51DD\u805A\u800C\u6210\u7684\u7570\u6B21\u5143\u7375\u624B\uFF0C\u6838\u5FC3\u5982\u540C\u5FAE\u578B\u9ED1\u6D1E\uFF0C\u80FD\u541E\u566C\u5468\u906D\u7684\u5149\u7DDA\u8207\u7A7A\u9593\u3002",
      vfx: {
        punchTrail: "\u6DF1\u7D2B\u9ED1\u6D1E\u91CD\u529B\u6CE2\u5207\u75D5",
        sk1: "\u65CB\u8F49\u7684\u53CD\u7269\u8CEA\u574D\u7E2E\u9ED1\u6D1E\u7403",
        sk2: "\u865B\u7A7A\u6495\u88C2\u7DAD\u5EA6\u88C2\u9699\u5149\u67F1",
        guardShield: "\u4E8B\u4EF6\u8996\u754C\u5F15\u529B\u504F\u6298\u76FE",
        hitEffect: "\u7DAD\u5EA6\u7834\u788E\u6697\u5F71\u88C2\u7D0B"
      },
      creator: "Community Workshop (PR #65)"
    },
    {
      id: "skin_solar_valkyrie",
      name: "\u592A\u967D\u5973\u6B66\u795E",
      title: "\u6046\u661F\u70C8\u7130\u6230\u795E",
      category: "event",
      series: "\u7D42\u6975\u5178\u85CF",
      price: 3500,
      isDefault: false,
      themeColor: "#ff4500",
      secondaryColor: "#fbbf24",
      glowColor: "rgba(255, 69, 0, 0.6)",
      accentColor: "#f97316",
      armorColor: "#270802",
      visorColor: "#ff4500",
      coreColor: "#ff4500",
      desc: "\u9996\u5B63\u300C\u8CFD\u535A\u9802\u5C16\u6C7A\u8CFD\u76DB\u5178\u300D\u9650\u5B9A\u5916\u89C0\u3002\u8403\u53D6\u592A\u967D\u8000\u6591\u80FD\u91CF\u6253\u9020\uFF0C\u7FBD\u7FFC\u5149\u8ECC\u5B9B\u5982\u9CF3\u51F0\u5C55\u7FC5\u3002",
      vfx: {
        punchTrail: "\u91D1\u7D05\u71BE\u70C8\u9AD8\u71B1\u7FBD\u7FFC\u5149\u8ECC",
        sk1: "\u65CB\u8F49\u7684\u592A\u967D\u8000\u6591\u706B\u7403\uFF0C\u5E36\u6709\u706B\u661F\u62D6\u5C3E",
        sk2: "\u9CF3\u51F0\u5C55\u7FC5\u822C\u4E4B\u6C96\u5929\u70C8\u7130\u706B\u67F1",
        guardShield: "\u91D1\u7D05\u5149\u8292\u7FBD\u7FFC\u683C\u64CB",
        hitEffect: "\u71BE\u71B1\u706B\u661F\u8FF8\u767C"
      },
      creator: "Season 1 Grand Master"
    },
    {
      id: "skin_cyber_diva",
      name: "\u8CFD\u535A\u6B4C\u59EC\u97F3\u5F8B",
      title: "\u5168\u606F\u96FB\u5B50\u97F3\u6A02\u865B\u64EC\u5076\u50CF",
      category: "shop",
      series: "\u6697\u591C\u9713\u8679",
      price: 3800,
      isDefault: false,
      themeColor: "#14b8a6",
      secondaryColor: "#f43f5e",
      glowColor: "rgba(20, 184, 166, 0.6)",
      accentColor: "#2dd4bf",
      armorColor: "#042f2e",
      visorColor: "#14b8a6",
      coreColor: "#f43f5e",
      desc: "\u5C07\u96FB\u5B50\u97F3\u6A02\u7B49\u5316\u5668\u8F49\u5316\u70BA\u6B66\u88DD\u7684\u5168\u606F\u6B4C\u59EC\uFF0C\u63EE\u62F3\u5E36\u6709\u97F3\u5F8B\u7B26\u865F\uFF0C\u6230\u9B25\u5B9B\u5982\u76DB\u5927\u6F14\u5531\u6703\u3002",
      vfx: {
        punchTrail: "\u9752\u7DA0/\u6843\u7D05\u96D9\u8272\u52D5\u614B\u7B49\u5316\u5668\u97F3\u6CE2\u6CE2\u5F62",
        sk1: "\u5168\u606F\u516B\u5206\u97F3\u7B26\u8207\u9AD8\u97F3\u8B5C\u865F\u97F3\u7206\u7403",
        sk2: "\u4E03\u5F69\u9713\u8679\u821E\u53F0\u805A\u5149\u71C8\u97F3\u5F8B\u5149\u67F1",
        guardShield: "\u52D5\u611F\u8072\u6CE2\u983B\u8B5C\u5E7E\u4F55\u9632\u8B77\u5C4F",
        hitEffect: "\u8DF3\u8E8D\u7684\u97F3\u7B26\u8207\u70AB\u5F69\u7C92\u5B50"
      },
      creator: "Community Workshop (PR #77)"
    },
    {
      id: "skin_archangel_judicator",
      name: "\u66DC\u767D\u88C1\u6C7A\u8056\u4F7F",
      title: "\u5149\u5B50\u8056\u5F8B\u7D42\u6975\u57F7\u884C\u8005",
      category: "shop",
      series: "\u672A\u4F86\u6A5F\u795E",
      price: 4e3,
      isDefault: false,
      themeColor: "#f8fafc",
      secondaryColor: "#38bdf8",
      glowColor: "rgba(248, 250, 252, 0.7)",
      accentColor: "#93c5fd",
      armorColor: "#1e293b",
      visorColor: "#38bdf8",
      coreColor: "#f8fafc",
      desc: "\u901A\u9AD4\u63A1\u7528\u7D14\u767D\u5948\u7C73\u9676\u74F7\u8207\u767D\u91D1\u88DD\u7532\u7684\u9AD8\u6F54\u6B66\u88DD\uFF0C\u80CC\u5F8C\u5C55\u9732\u516D\u9053\u7D14\u5149\u5B50\u69CB\u6210\u7684\u5BE9\u5224\u5149\u7FFC\u3002",
      vfx: {
        punchTrail: "\u795E\u8056\u66DC\u767D\u5149\u7FBD\u5149\u5F27\u3001\u8056\u5149\u7C92\u5B50",
        sk1: "\u7D14\u6DE8\u5149\u5B50\u795E\u8056\u9577\u77DB\u5C04\u7DDA",
        sk2: "\u516D\u7FFC\u5C55\u7FC5\u62D4\u5730\u800C\u8D77\u4E4B\u5929\u5802\u8056\u5149\u67F1",
        guardShield: "\u5927\u6559\u5802\u5F69\u7E6A\u73BB\u7483\u5149\u8292\u795E\u8056\u529B\u5834",
        hitEffect: "\u91D1\u8272\u8056\u7FBD\u8207\u7D14\u767D\u5149\u74B0"
      },
      creator: "Community Workshop (PR #88)"
    },
    {
      id: "skin_omega_emperor",
      name: "\u9EC3\u91D1\u7D42\u6975\u6A5F\u795E",
      title: "\u91CF\u5B50\u5E1D\u570B\u59CB\u7956\u6A5F\u7687",
      category: "shop",
      series: "\u7D42\u6975\u5178\u85CF",
      price: 5e3,
      isDefault: false,
      themeColor: "#eab308",
      secondaryColor: "#ffffff",
      glowColor: "rgba(234, 179, 8, 0.7)",
      accentColor: "#ca8a04",
      armorColor: "#1e1601",
      visorColor: "#ffffff",
      coreColor: "#eab308",
      desc: "\u53E4\u4EE3\u8D85\u6587\u660E\u907A\u7559\u7684\u7D42\u6975\u7687\u5E1D\u6A5F\u7532\uFF0C\u901A\u9AD4\u7531\u4E0D\u6EC5\u7684\u91CF\u5B50\u771F\u91D1\u9444\u9020\uFF0C\u5C0A\u8CB4\u5A01\u56B4\u51CC\u99D5\u773E\u751F\u3002",
      vfx: {
        punchTrail: "\u5E1D\u738B\u771F\u91D1\u8F1D\u714C\u65E5\u5195\u65AC\u3001\u795E\u5A01\u91D1\u5149",
        sk1: "\u8D85\u65B0\u661F\u7206\u767C\u5E1D\u738B\u91D1\u8F2A\u6838\u7206\u5F48",
        sk2: "\u842C\u4E08\u91D1\u5149\u8CAB\u7A7F\u5929\u5730\u7684\u81F3\u5C0A\u5E1D\u7687\u67F1",
        guardShield: "\u4E5D\u4E94\u81F3\u5C0A\u771F\u91D1\u9F8D\u7D0B\u7D50\u754C",
        hitEffect: "\u5E1D\u7687\u9F8D\u9C57\u91D1\u5149\u70B8\u88C2"
      },
      creator: "Legendary Artisan (PR #99)"
    },
    // ── 漫威宇宙正宗經典系列 (Marvel Universe) ──
    {
      id: "skin_iron_man",
      name: "\u92FC\u9435\u4EBA\u30FB\u99AC\u514B85",
      title: "\u7D0D\u7C73\u9AD8\u79D1\u6280\u5FA9\u4EC7\u8005",
      category: "shop",
      series: "\u6F2B\u5A01\u5B87\u5B99",
      price: 2800,
      isDefault: false,
      themeColor: "#c1121f",
      secondaryColor: "#fbbf24",
      glowColor: "rgba(56, 189, 248, 0.8)",
      accentColor: "#fbbf24",
      armorColor: "#7f1d1d",
      visorColor: "#38bdf8",
      coreColor: "#38bdf8",
      desc: "\u771F\u5BE6\u9084\u539F\u6F2B\u5A01\u300A\u5FA9\u4EC7\u8005\u806F\u76DF\u300B\u7D42\u5C40\u4E4B\u6230\u99AC\u514B85\u88DD\u7532\u3002\u80F8\u53E3\u642D\u8F09\u9AD8\u80FD\u5F27\u5F62\u65B9\u821F\u53CD\u61C9\u7210\uFF0C\u96D9\u624B\u638C\u5FC3\u914D\u5099\u7B49\u96E2\u5B50\u8108\u885D\u7832\u3002",
      vfx: {
        punchTrail: "\u91D1\u7D05\u7D0D\u7C73\u5149\u5203\u3001\u638C\u5FC3\u8108\u885D\u5149\u6D41",
        sk1: "\u9AD8\u80FD\u65B9\u821F\u96E2\u5B50\u805A\u80FD\u7832\uFF0C\u8000\u773C\u851A\u85CD\u96FB\u6D41",
        sk2: "\u63A8\u9032\u80CC\u7FFC\u5168\u958B\u6C96\u5929\u5347\u9F8D\u5674\u5C04",
        guardShield: "\u516D\u89D2\u5F62\u5FAE\u6676\u7D0D\u7C73\u529B\u5834\u76FE",
        hitEffect: "\u851A\u85CD\u8108\u885D\u7B49\u96E2\u5B50\u706B\u82B1"
      },
      creator: "Marvel Studios Tribute"
    },
    {
      id: "skin_spiderman",
      name: "\u8718\u86DB\u4EBA\u30FB\u7D93\u5178\u7D05\u85CD",
      title: "\u597D\u9130\u5C45\u7D10\u7D04\u82F1\u96C4",
      category: "shop",
      series: "\u6F2B\u5A01\u5B87\u5B99",
      price: 2500,
      isDefault: false,
      themeColor: "#dc2626",
      secondaryColor: "#2563eb",
      glowColor: "rgba(220, 38, 38, 0.65)",
      accentColor: "#1d4ed8",
      armorColor: "#991b1b",
      visorColor: "#ffffff",
      coreColor: "#dc2626",
      desc: "\u771F\u5BE6\u9084\u539F\u5F7C\u5F97\u5E15\u514B\u7D93\u5178\u7D05\u85CD\u86DB\u7DB2\u6230\u8863\uFF01\u9762\u90E8\u5177\u5099\u6A19\u8A8C\u6027\u5927\u767D\u86DB\u773C\u8207\u7C97\u9ED1\u773C\u6846\uFF0C\u80F8\u53E3\u5370\u6709\u6A19\u8A8C\u6027\u9ED1\u8718\u86DB\u5716\u9A30\u3002",
      vfx: {
        punchTrail: "\u86DB\u7D72\u8ECC\u8DE1\u3001\u52D5\u611F\u7D05\u85CD\u5149\u5F71",
        sk1: "\u9AD8\u901F\u9AD8\u9ECF\u5EA6\u91CF\u5B50\u86DB\u7D72\u5F48\uFF0C\u5E36\u86DB\u7DB2\u62D6\u5C3E",
        sk2: "\u5410\u7D72\u501F\u529B\u6C96\u5929\u8FF4\u65CB\u7A7A\u7FFB\u8E22",
        guardShield: "\u5168\u65B9\u4F4D\u591A\u5C64\u5E7E\u4F55\u86DB\u7DB2\u9632\u8B77\u5C4F",
        hitEffect: "\u767D\u8272\u86DB\u7D72\u8207\u7D05\u8272\u611F\u61C9\u9583\u96FB"
      },
      creator: "Marvel Studios Tribute"
    },
    {
      id: "skin_captain_america",
      name: "\u7F8E\u570B\u968A\u9577\u30FB\u7F85\u5091\u65AF",
      title: "\u50B3\u5947\u5FA9\u4EC7\u8005\u968A\u9577",
      category: "shop",
      series: "\u6F2B\u5A01\u5B87\u5B99",
      price: 2600,
      isDefault: false,
      themeColor: "#1d4ed8",
      secondaryColor: "#ef4444",
      glowColor: "rgba(29, 78, 216, 0.65)",
      accentColor: "#ffffff",
      armorColor: "#1e3a8a",
      visorColor: "#ffffff",
      coreColor: "#ffffff",
      desc: "\u771F\u5BE6\u9084\u539F\u53F2\u8482\u592B\u7F85\u5091\u65AF\u6DF1\u85CD\u661F\u689D\u6230\u670D\uFF01\u982D\u6234\u8C61\u5FB5\u968A\u9577\u4E4B\u767D\u8272A\u5B57\u982D\u76D4\uFF0C\u80CC\u8CA0\u4E0D\u673D\u7684\u5713\u5F62\u6C4E\u5408\u91D1\u661F\u76FE\u3002",
      vfx: {
        punchTrail: "\u661F\u76FE\u7834\u7A7A\u6B98\u5F71\u3001\u7D05\u767D\u85CD\u4E09\u8272\u82F1\u52C7\u885D\u64CA",
        sk1: "\u8FF4\u65CB\u98DB\u64F2\u9AD8\u901F\u65CB\u8F49\u7684\u6C4E\u5408\u91D1\u661F\u76FE",
        sk2: "\u64CE\u76FE\u6C96\u5929\u91CD\u9318\u7834\u9632\u731B\u64CA",
        guardShield: "\u5DE8\u5927\u6C4E\u5408\u91D1\u9280\u661F\u8FF4\u65CB\u683C\u64CB\u58C1",
        hitEffect: "\u91D1\u5C6C\u5DE8\u97FF\u8207\u9280\u8272\u706B\u82B1"
      },
      creator: "Marvel Studios Tribute"
    },
    {
      id: "skin_thor",
      name: "\u96F7\u795E\u7D22\u723E\u30FB\u5967\u4E01\u4E4B\u5B50",
      title: "\u963F\u65AF\u5609\u96F7\u9706\u6230\u795E",
      category: "shop",
      series: "\u6F2B\u5A01\u5B87\u5B99",
      price: 3e3,
      isDefault: false,
      themeColor: "#38bdf8",
      secondaryColor: "#ef4444",
      glowColor: "rgba(56, 189, 248, 0.85)",
      accentColor: "#e2e8f0",
      armorColor: "#0f172a",
      visorColor: "#38bdf8",
      coreColor: "#38bdf8",
      desc: "\u771F\u5BE6\u9084\u539F\u963F\u65AF\u5609\u96F7\u795E\u5C0A\u5BB9\uFF01\u8EAB\u62AB\u98DB\u821E\u7684\u9BAE\u7D05\u6230\u888D\u62AB\u98A8\uFF0C\u9ED1\u8272\u9C57\u7532\u80F8\u524D\u9472\u5D4C\u516D\u9846\u767D\u9280\u795E\u76FE\u5713\u76E4\uFF0C\u96D9\u76EE\u7DBB\u653E\u842C\u921E\u96F7\u9706\u3002",
      vfx: {
        punchTrail: "\u96F7\u795E\u4E4B\u9318\u66B4\u98A8\u96FB\u5F27\u3001\u8000\u85CD\u7834\u7A7A\u5149\u8DE1",
        sk1: "\u805A\u96C6\u4E5D\u754C\u96F7\u9706\u4E4B\u843D\u96F7\u96F7\u7403",
        sk2: "\u53EC\u559A\u96F7\u9706\u72C2\u66B4\u6C96\u5929\u7684\u5F15\u96F7\u4E4B\u64CA",
        guardShield: "\u963F\u65AF\u5609\u5F69\u8679\u6A4B\u7B26\u6587\u96F7\u5149\u7D50\u754C",
        hitEffect: "\u842C\u4E08\u851A\u85CD\u843D\u96F7\u70B8\u88C2"
      },
      creator: "Marvel Studios Tribute"
    },
    {
      id: "skin_thanos",
      name: "\u85A9\u8AFE\u65AF\u30FB\u7121\u9650\u624B\u5957",
      title: "\u5B87\u5B99\u5929\u547D\u638C\u63A7\u8005",
      category: "shop",
      series: "\u6F2B\u5A01\u5B87\u5B99",
      price: 3800,
      isDefault: false,
      themeColor: "#ffd700",
      secondaryColor: "#a855f7",
      glowColor: "rgba(255, 215, 0, 0.8)",
      accentColor: "#fbbf24",
      armorColor: "#3b0764",
      visorColor: "#ffd700",
      coreColor: "#ffd700",
      desc: "\u771F\u5BE6\u9084\u539F\u6CF0\u5766\u9738\u738B\u85A9\u8AFE\u65AF\uFF01\u5DE6\u624B\u914D\u6234\u5B8C\u6574\u9472\u5D4C\u516D\u9846\u7121\u9650\u539F\u77F3\uFF08\u529B\u91CF/\u7A7A\u9593/\u73FE\u5BE6/\u9748\u9B42/\u6642\u9593/\u5FC3\u9748\uFF09\u7684\u8000\u773C\u9EC3\u91D1\u7121\u9650\u624B\u5957\uFF01",
      vfx: {
        punchTrail: "\u516D\u8272\u539F\u77F3\u7480\u74A8\u5149\u6688\u3001\u6CF0\u5766\u5DE8\u529B\u88C2\u75D5",
        sk1: "\u7A7A\u9593\u8207\u529B\u91CF\u539F\u77F3\u878D\u5408\u4E4B\u7D2B\u9ED1\u574D\u7E2E\u5F15\u529B\u7403",
        sk2: "\u7121\u9650\u62F3\u5957\u6307\u5929\u9707\u64BC\u64C2\u53F0\u4E4B\u5B87\u5B99\u885D\u64CA\u67F1",
        guardShield: "\u6642\u9593\u8207\u73FE\u5BE6\u539F\u77F3\u4E4B\u5F69\u8679\u504F\u6298\u7D50\u754C",
        hitEffect: "\u516D\u539F\u77F3\u5F69\u5149\u661F\u96F2\u788E\u88C2"
      },
      creator: "Marvel Studios Tribute"
    },
    {
      id: "skin_hawkeye",
      name: "\u9DF9\u773C\u30FB\u514B\u6797\u7279\u5DF4\u9813",
      title: "\u5FA9\u4EC7\u8005\u50B3\u5947\u795E\u7BAD\u624B",
      category: "shop",
      series: "\u6F2B\u5A01\u5B87\u5B99",
      price: 2500,
      isDefault: false,
      attackStyle: "bow",
      themeColor: "#8b5cf6",
      secondaryColor: "#1e1b4b",
      glowColor: "rgba(139, 92, 246, 0.75)",
      accentColor: "#a78bfa",
      armorColor: "#180d24",
      visorColor: "#c084fc",
      coreColor: "#8b5cf6",
      desc: "\u771F\u5BE6\u9084\u539F\u5FA9\u4EC7\u8005\u806F\u76DF\u795E\u7BAD\u624B\uFF01\u8EAB\u7A7F\u6697\u7D2B\u9ED1\u6230\u8853\u5C04\u624B\u670D\uFF0C\u80CC\u8CA0\u9AD8\u79D1\u6280\u7BAD\u7B52\uFF0C\u624B\u6301\u7CBE\u5BC6\u8907\u5408\u53CD\u66F2\u5F13\uFF0C\u767E\u6B65\u7A7F\u694A\u4E00\u7BAD\u5C01\u5589\u3002",
      vfx: {
        punchTrail: "\u7D2B\u96FB\u7834\u7A7A\u7BAD\u5F71\u3001\u62C9\u5F13\u6D41\u5149\u8ECC\u8DE1",
        sk1: "\u8CAB\u7A7F\u5168\u5834\u4E4B\u9AD8\u80FD\u5149\u5B50\u7206\u7834\u7BAD",
        sk2: "\u51CC\u7A7A\u7FFB\u9A30\u5F15\u7BAD\u5411\u5929\u843D\u96E8\u5C04\u64CA",
        guardShield: "\u6230\u8853\u53CD\u66F2\u8907\u5408\u5F13\u683C\u64CB\u8B77\u58C1",
        hitEffect: "\u92B3\u5229\u7BAD\u7C07\u7834\u7A7A\u7D2B\u8292"
      },
      creator: "Marvel Studios Tribute"
    },
    // ── 七龍珠超正宗傳奇系列 (Dragon Ball Super) ──
    {
      id: "skin_goku_ssj",
      name: "\u5B6B\u609F\u7A7A\u30FB\u8D85\u7D1A\u8CFD\u4E9E\u4EBA",
      title: "\u5B87\u5B99\u50B3\u5947\u8D85\u7D1A\u8CFD\u4E9E\u4EBA",
      category: "shop",
      series: "\u4E03\u9F8D\u73E0\u8D85",
      price: 2800,
      isDefault: false,
      themeColor: "#fde047",
      secondaryColor: "#ea580c",
      glowColor: "rgba(253, 224, 71, 0.85)",
      accentColor: "#2563eb",
      armorColor: "#c2410c",
      visorColor: "#06b6d4",
      coreColor: "#fde047",
      desc: "\u771F\u5BE6\u9084\u539F\u9CE5\u5C71\u660E\u7B46\u4E0B\u50B3\u5947\u8D85\u8CFD\uFF01\u6012\u9AEE\u885D\u51A0\u7684\u91D1\u8272\u5C16\u523A\u523A\u875F\u982D\u3001\u78A7\u85CD\u96D9\u7738\uFF0C\u8EAB\u8457\u7D93\u5178\u9F9C\u4ED9\u6D41\u6A59\u8272\u9053\u670D\u8207\u6DF1\u85CD\u8170\u5E36\uFF01",
      vfx: {
        punchTrail: "\u91D1\u9EC3\u71C3\u71D2\u6C23\u7130\u3001\u8D85\u8CFD\u7206\u6C23\u97F3\u7206",
        sk1: "\u6B63\u5B97\u85CD\u767D\u76F8\u9593\u300C\u9F9C\u6D3E\u6C23\u529F\u6CE2\u300D\u5149\u5F48",
        sk2: "\u91D1\u5149\u6C96\u5929\u9F8D\u62F3\u5486\u54EE\u5347\u9F8D\u64CA",
        guardShield: "\u5168\u65B9\u4F4D\u71C3\u71D2\u7684\u91D1\u8272\u8CFD\u4E9E\u4EBA\u6C23\u7130\u7206\u767C\u7F69",
        hitEffect: "\u8D85\u8CFD\u91D1\u9EC3\u6C23\u8292\u9707\u6CE2"
      },
      creator: "Dragon Ball Tribute"
    },
    {
      id: "skin_vegeta_ssj",
      name: "\u8C9D\u5409\u5854\u30FB\u8CFD\u4E9E\u4EBA\u738B\u5B50",
      title: "\u9A55\u50B2\u7684\u8CFD\u4E9E\u4EBA\u738B\u5B50",
      category: "shop",
      series: "\u4E03\u9F8D\u73E0\u8D85",
      price: 2800,
      isDefault: false,
      themeColor: "#3b82f6",
      secondaryColor: "#fde047",
      glowColor: "rgba(59, 130, 246, 0.8)",
      accentColor: "#ffffff",
      armorColor: "#1e3a8a",
      visorColor: "#06b6d4",
      coreColor: "#fde047",
      desc: "\u771F\u5BE6\u9084\u539F\u8C9D\u5409\u5854\u738B\u5B50\uFF01\u76F4\u7ACB\u6C96\u5929\u4E4B\u706B\u7130\u91D1\u8272\u8CFD\u4E9E\u9577\u9AEE\uFF0C\u8EAB\u7A7F\u7D93\u5178\u767D\u5E95\u9EC3\u80A9\u689D\u7D0B\u6230\u9B25\u670D\u3001\u6DF1\u85CD\u9023\u9AD4\u670D\u8207\u767D\u624B\u5957\uFF01",
      vfx: {
        punchTrail: "\u6E5B\u85CD\u8207\u91D1\u9EC3\u4EA4\u7E54\u7684\u7206\u88C2\u6C23\u6D41",
        sk1: "\u6975\u9650\u91D1\u8272\u300C\u6700\u7D42\u9583\u5149\u300D\u9023\u7E8C\u5149\u5B50\u5F48",
        sk2: "\u738B\u8005\u50B2\u6C23\u6C96\u5929\u4E4B\u5927\u9739\u9742\u66B4\u98A8\u8E22",
        guardShield: "\u7687\u5BB6\u8CFD\u4E9E\u4EBA\u85CD\u91D1\u96D9\u74B0\u6C23\u969C\u58C1",
        hitEffect: "\u91D1\u8272\u96FB\u5F27\u8207\u6DF1\u85CD\u706B\u82B1"
      },
      creator: "Dragon Ball Tribute"
    },
    {
      id: "skin_trunks_future",
      name: "\u672A\u4F86\u7279\u5357\u514B\u65AF",
      title: "\u5E0C\u671B\u4E4B\u528D\u5B88\u8B77\u8005",
      category: "shop",
      series: "\u4E03\u9F8D\u73E0\u8D85",
      price: 2600,
      isDefault: false,
      themeColor: "#a855f7",
      secondaryColor: "#fde047",
      glowColor: "rgba(168, 85, 247, 0.75)",
      accentColor: "#e2e8f0",
      armorColor: "#312e81",
      visorColor: "#06b6d4",
      coreColor: "#a855f7",
      desc: "\u771F\u5BE6\u9084\u539F\u672A\u4F86\u5C11\u5E74\u7279\u5357\u514B\u65AF\uFF01\u8EAB\u7A7F\u81A0\u56CA\u516C\u53F8\u6DF1\u85CD\u7ACB\u9818\u77ED\u593E\u514B\uFF0C\u659C\u630E\u76AE\u5E36\u80CC\u8CA0\u52C7\u8005\u4E4B\u528D\uFF0C\u96A8\u98A8\u98C4\u52D5\u4FD0\u843D\u7D2B\u9AEE\uFF01",
      vfx: {
        punchTrail: "\u9583\u8000\u52C7\u8005\u8056\u528D\u5200\u5149\u3001\u91D1\u8272\u528D\u6C23",
        sk1: "\u8D85\u97F3\u901F\u9583\u8000\u65AC\u64CA\u528D\u6C23\u6CE2",
        sk2: "\u9B54\u9583\u5149\u5F15\u7206\u6C96\u5929\u7684\u7834\u90AA\u98DB\u5929\u62D4\u528D",
        guardShield: "\u4EA4\u53C9\u96D9\u81C2\u9AD8\u901F\u6C23\u5713\u9632\u79A6\u5C4F",
        hitEffect: "\u7D2B\u8272\u528D\u75D5\u8207\u91D1\u9EC3\u528D\u6C23\u8FF8\u5C04"
      },
      creator: "Dragon Ball Tribute"
    },
    {
      id: "skin_piccolo",
      name: "\u6BD4\u514B\u5927\u9B54\u738B",
      title: "\u90A3\u7F8E\u514B\u661F\u667A\u52C7\u6230\u795E",
      category: "shop",
      series: "\u4E03\u9F8D\u73E0\u8D85",
      price: 2500,
      isDefault: false,
      themeColor: "#22c55e",
      secondaryColor: "#a855f7",
      glowColor: "rgba(34, 197, 94, 0.75)",
      accentColor: "#f43f5e",
      armorColor: "#581c87",
      visorColor: "#22c55e",
      coreColor: "#22c55e",
      desc: "\u771F\u5BE6\u9084\u539F\u90A3\u7F8E\u514B\u661F\u5927\u9B54\u738B\uFF01\u7DA0\u8272\u76AE\u819A\u3001\u7C89\u7D05\u624B\u81C2\u808C\u8089\u689D\u7D0B\uFF0C\u982D\u6234\u767D\u8272\u982D\u5DFE\uFF0C\u8EAB\u62AB\u5BEC\u5927\u539A\u91CD\u7684\u767D\u8272\u9577\u62AB\u80A9\u8207\u7D2B\u8272\u9053\u670D\uFF01",
      vfx: {
        punchTrail: "\u90A3\u7F8E\u514B\u661F\u624B\u81C2\u5EF6\u4F38\u7DA0\u8272\u6C23\u5203\u3001\u6B98\u5F71",
        sk1: "\u6307\u5C16\u51DD\u805A\u4E4B\u96D9\u87BA\u65CB\u300C\u9B54\u8CAB\u5149\u6BBA\u7832\u300D",
        sk2: "\u72C2\u66B4\u5347\u9F8D\u88C2\u5730\u7206\u88C2\u9B54\u6CE2",
        guardShield: "\u90A3\u7F8E\u514B\u661F\u795E\u79D8\u7CBE\u795E\u529B\u5834\u5C4F",
        hitEffect: "\u9EC3\u7DA0\u96FB\u5149\u9B54\u6C23\u56DB\u5C04"
      },
      creator: "Dragon Ball Tribute"
    },
    {
      id: "skin_golden_frieza",
      name: "\u9EC3\u91D1\u5F17\u5229\u6C99",
      title: "\u5B87\u5B99\u5E1D\u738B\u7D42\u6975\u5F62\u614B",
      category: "shop",
      series: "\u4E03\u9F8D\u73E0\u8D85",
      price: 3600,
      isDefault: false,
      themeColor: "#ffd700",
      secondaryColor: "#9333ea",
      glowColor: "rgba(255, 215, 0, 0.85)",
      accentColor: "#ef4444",
      armorColor: "#4c1d95",
      visorColor: "#ef4444",
      coreColor: "#ffd700",
      desc: "\u771F\u5BE6\u9084\u539F\u5F17\u5229\u6C99\u7D42\u6975\u9EC3\u91D1\u9032\u5316\uFF01\u8EAB\u8EC0\u8986\u84CB\u8457\u9AD8\u8CB4\u5962\u83EF\u7684\u91D1\u5C6C\u771F\u91D1\u751F\u7269\u7532\uFF0C\u982D\u9802\u8207\u80F8\u53E3\u9583\u8000\u7D2B\u6C34\u6676\u5BF6\u77F3\uFF0C\u7329\u7D05\u96D9\u773C\u8511\u8996\u4E00\u5207\uFF01",
      vfx: {
        punchTrail: "\u9EC3\u91D1\u6B7B\u4EA1\u6C23\u8292\u3001\u6DF1\u7D2B\u5E1D\u7687\u5149\u7130",
        sk1: "\u6975\u901F\u7834\u7A7A\u4E4B\u7329\u7D05\u300C\u6B7B\u4EA1\u5149\u7DDA\u300D\u6307\u69CD",
        sk2: "\u9EC3\u91D1\u5E1D\u7687\u8D85\u7D1A\u8D85\u65B0\u661F\u6BC0\u6EC5\u67F1",
        guardShield: "\u9EC3\u91D1\u6B7B\u4EA1\u5713\u7403\u74B0\u5F62\u7D55\u5C0D\u9632\u79A6\u7403",
        hitEffect: "\u7329\u7D05\u91D1\u8292\u6B7B\u4EA1\u7206\u88C2"
      },
      creator: "Dragon Ball Tribute"
    },
    // ── 《荒野亂鬥》傳奇英雄系列 (Brawl Stars Series) ──
    {
      id: "skin_brawl_shelly",
      name: "\u96EA\u8389\u30FB\u6563\u5F48\u7375\u624B",
      title: "\u8352\u91CE\u5927\u93E2\u5BA2\u30FB\u62DB\u724C\u9730\u5F48\u69CD\u624B",
      category: "shop",
      series: "\u8352\u91CE\u4E82\u9B25",
      price: 2600,
      isDefault: false,
      attackStyle: "shotgun",
      themeColor: "#a855f7",
      secondaryColor: "#fde047",
      glowColor: "rgba(168, 85, 247, 0.75)",
      accentColor: "#3b82f6",
      armorColor: "#1e3a8a",
      visorColor: "#fde047",
      coreColor: "#a855f7",
      desc: "\u771F\u5BE6\u9084\u539F\u300A\u8352\u91CE\u4E82\u9B25\u300B\u96EA\u8389\uFF01\u62DB\u724C\u7D2B\u8272\u7ACB\u9AD4\u5927\u6372\u9AEE\u3001\u9BAE\u9EC3\u8272\u725B\u4ED4\u9818\u5DFE\u3001\u6230\u8853\u6DF1\u85CD\u80CC\u5FC3\u8207\u5927\u53E3\u5F91\u91D1\u5C6C\u96D9\u7BA1\u6563\u5F48\u69CD\u3002",
      vfx: {
        punchTrail: "\u91D1\u9EC3\u6563\u5F48\u706B\u661F\u8207\u65CB\u8F49\u7D2B\u8272\u7375\u624B\u5149\u8ECC",
        sk1: "\u9AD8\u901F\u91CD\u578B\u6563\u5F48\u7834\u7A7A\u5F48\u5E55",
        sk2: "\u9730\u5F48\u5F8C\u5EA7\u529B\u5F15\u7206\u6C96\u5929\u8DF3\u8E8D\u8F5F\u64CA",
        guardShield: "\u91D1\u9EC3\u8B66\u661F\u9632\u79A6\u76FE\u58C1",
        hitEffect: "\u9EC3\u9285\u5F48\u6BBC\u8207\u91D1\u8272\u706B\u82B1\u788E\u5C51"
      },
      creator: "Brawl Stars Tribute"
    },
    {
      id: "skin_brawl_colt",
      name: "\u67EF\u723E\u7279\u30FB\u96D9\u69CD\u795E\u8B66",
      title: "\u8352\u91CE\u7B2C\u4E00\u5FEB\u69CD\u624B\u30FB\u96D9\u6301\u5DE6\u8F2A\u8B66\u9577",
      category: "shop",
      series: "\u8352\u91CE\u4E82\u9B25",
      price: 2600,
      isDefault: false,
      attackStyle: "dual_guns",
      themeColor: "#ef4444",
      secondaryColor: "#38bdf8",
      glowColor: "rgba(239, 68, 68, 0.75)",
      accentColor: "#ffd700",
      armorColor: "#1d4ed8",
      visorColor: "#38bdf8",
      coreColor: "#ffd700",
      desc: "\u771F\u5BE6\u9084\u539F\u300A\u8352\u91CE\u4E82\u9B25\u300B\u67EF\u723E\u7279\uFF01\u9BAE\u7D05\u9AD8\u8073\u6D41\u7DDA\u98DB\u6A5F\u982D\u3001\u6DF1\u85CD\u8B66\u9577\u80CC\u5FC3\u8207\u80F8\u524D\u516D\u89D2\u8B66\u661F\u5FBD\u7AE0\uFF0C\u624B\u6301\u96D9\u67C4\u96D5\u82B1\u9280\u767D\u5DE6\u8F2A\u624B\u69CD\u3002",
      vfx: {
        punchTrail: "\u96D9\u6301\u9280\u767D\u5F48\u9053\u5149\u75D5\u3001\u91D1\u8272\u516D\u89D2\u8B66\u661F",
        sk1: "\u96D9\u6301\u5DE6\u8F2A\u75BE\u901F\u9023\u767C\u5F48\u5E55",
        sk2: "\u9A30\u7A7A\u8FF4\u65CB\u96D9\u69CD\u9023\u74B0\u5411\u5929\u901F\u5C04",
        guardShield: "\u96D9\u5DE6\u8F2A\u5168\u606F\u5C01\u9396\u661F\u74B0",
        hitEffect: "\u9280\u767D\u5F48\u9053\u706B\u661F\u8207\u8B66\u661F\u5149\u8292"
      },
      creator: "Brawl Stars Tribute"
    },
    {
      id: "skin_brawl_spike",
      name: "\u65AF\u6D3E\u514B\u30FB\u50B3\u5947\u4ED9\u4EBA\u638C",
      title: "\u8352\u91CE\u840C\u9738\u30FB\u523A\u5BA2\u4ED9\u4EBA\u638C",
      category: "shop",
      series: "\u8352\u91CE\u4E82\u9B25",
      price: 2800,
      isDefault: false,
      attackStyle: "cactus_spike",
      themeColor: "#22c55e",
      secondaryColor: "#ec4899",
      glowColor: "rgba(34, 197, 94, 0.75)",
      accentColor: "#fbbf24",
      armorColor: "#15803d",
      visorColor: "#ec4899",
      coreColor: "#22c55e",
      desc: "\u771F\u5BE6\u9084\u539F\u300A\u8352\u91CE\u4E82\u9B25\u300B\u65AF\u6D3E\u514B\uFF01\u5713\u6EFE\u6EFE\u7FE0\u7DA0\u4ED9\u4EBA\u638C\u3001\u982D\u9802\u76DB\u958B\u7C89\u7D05\u5C0F\u82B1\u3001\u6DF1\u7D2B\u523A\u7E61\u7CBE\u7DFB\u77ED\u80CC\u5FC3\u8207\u5446\u840C\u7D14\u9ED1\u5927\u773C\u775B\u3002",
      vfx: {
        punchTrail: "\u7C89\u7D05\u82B1\u74E3\u8207\u7DA0\u8272\u5C16\u523A\u7206\u767C\u5149\u75D5",
        sk1: "\u65CB\u8F49\u5C16\u523A\u4ED9\u4EBA\u638C\u624B\u96F7\u70B8\u88C2",
        sk2: "\u62D4\u5730\u800C\u8D77\u4E4B\u6012\u653E\u4ED9\u4EBA\u638C\u5C16\u523A\u82B1\u67F1",
        guardShield: "\u65CB\u8F49\u5DE8\u5927\u4ED9\u4EBA\u638C\u82B1\u9632\u79A6\u529B\u5834",
        hitEffect: "\u7C89\u7D05\u82B1\u74E3\u8207\u7FE0\u7DA0\u523A\u91DD\u56DB\u6563"
      },
      creator: "Brawl Stars Tribute"
    },
    {
      id: "skin_brawl_el_primo",
      name: "\u666E\u91CC\u83AB\u30FB\u6454\u89D2\u9738\u738B",
      title: "\u50B3\u5947\u6454\u89D2\u5DE8\u661F\u30FB\u6D41\u661F\u91CD\u62F3",
      category: "shop",
      series: "\u8352\u91CE\u4E82\u9B25",
      price: 3e3,
      isDefault: false,
      attackStyle: "luchador",
      themeColor: "#2563eb",
      secondaryColor: "#ffd700",
      glowColor: "rgba(37, 99, 235, 0.8)",
      accentColor: "#f59e0b",
      armorColor: "#1e3a8a",
      visorColor: "#ffd700",
      coreColor: "#ffd700",
      desc: "\u771F\u5BE6\u9084\u539F\u300A\u8352\u91CE\u4E82\u9B25\u300B\u666E\u91CC\u83AB\uFF01\u6E5B\u85CD\u9EC3\u91D1\u58A8\u897F\u54E5\u6454\u89D2\u9762\u5177\u3001\u5065\u78A9\u82F1\u96C4\u80F8\u808C\u9AD4\u9B44\u8207\u91D1\u8272\u51A0\u8ECD\u5DE8\u661F\u91CD\u578B\u6454\u89D2\u91D1\u8170\u5E36\uFF01",
      vfx: {
        punchTrail: "\u71B1\u8840\u6454\u89D2\u6D41\u661F\u706B\u7130\u91CD\u62F3\u3001\u51A0\u8ECD\u91D1\u661F",
        sk1: "\u6D41\u661F\u706B\u62F3\u9023\u74B0\u91CD\u7832\u885D\u64CA\u6CE2",
        sk2: "\u6454\u89D2\u9738\u738B\u9A30\u7A7A\u98DB\u8EAB\u6D41\u661F\u8098\u64CA",
        guardShield: "\u6454\u89D2\u9738\u738B\u91D1\u5149\u51A0\u8ECD\u91D1\u9418\u7F69",
        hitEffect: "\u91D1\u661F\u7480\u74A8\u8207\u70C8\u7130\u885D\u64CA"
      },
      creator: "Brawl Stars Tribute"
    },
    {
      id: "skin_brawl_crow",
      name: "\u9ED1\u9D09\u30FB\u6697\u5F71\u5287\u6BD2\u523A\u5BA2",
      title: "\u8352\u91CE\u6BD2\u689F\u30FB\u81F4\u547D\u6E21\u9D09\u670B\u514B",
      category: "shop",
      series: "\u8352\u91CE\u4E82\u9B25",
      price: 3200,
      isDefault: false,
      attackStyle: "toxic_dagger",
      themeColor: "#10b981",
      secondaryColor: "#facc15",
      glowColor: "rgba(16, 185, 129, 0.8)",
      accentColor: "#ef4444",
      armorColor: "#020617",
      visorColor: "#ef4444",
      coreColor: "#10b981",
      desc: "\u771F\u5BE6\u9084\u539F\u300A\u8352\u91CE\u4E82\u9B25\u300B\u9ED1\u9D09\uFF01\u9ED1\u8272\u6A5F\u8ECA\u76AE\u9769\u98A8\u8863\u7ACB\u9818\u3001\u91D1\u9EC3\u92B3\u5229\u91D1\u5C6C\u5F4E\u5599\u3001\u8840\u7D05\u96D9\u773C\u8207\u96D9\u6301\u5287\u6BD2\u7FE1\u7FE0\u98DB\u5200\u3002",
      vfx: {
        punchTrail: "\u5287\u6BD2\u7FE1\u7FE0\u6697\u5F71\u9727\u6C23\u3001\u6E21\u9D09\u7FBD\u6BDB\u65AC\u75D5",
        sk1: "\u4E09\u5411\u5168\u606F\u6DEC\u6BD2\u7FE1\u7FE0\u98DB\u5200\u5C04\u64CA",
        sk2: "\u5C55\u7FC5\u9A30\u7A7A\u6697\u591C\u6E21\u9D09\u843D\u7FBD\u91CD\u64CA",
        guardShield: "\u5287\u6BD2\u7FBD\u7FFC\u6697\u591C\u8B77\u58C1",
        hitEffect: "\u78A7\u7DA0\u5287\u6BD2\u8150\u8755\u5149\u8292"
      },
      creator: "Brawl Stars Tribute"
    },
    {
      id: "skin_brawl_leon",
      name: "\u91CC\u6602\u30FB\u8B8A\u8272\u9F8D\u795E\u96B1\u5BA2",
      title: "\u8352\u91CE\u795E\u5077\u30FB\u56DB\u91CD\u65CB\u8F49\u98DB\u93E2",
      category: "shop",
      series: "\u8352\u91CE\u4E82\u9B25",
      price: 3200,
      isDefault: false,
      attackStyle: "shuriken",
      themeColor: "#10b981",
      secondaryColor: "#f43f5e",
      glowColor: "rgba(16, 185, 129, 0.75)",
      accentColor: "#38bdf8",
      armorColor: "#064e3b",
      visorColor: "#facc15",
      coreColor: "#10b981",
      desc: "\u771F\u5BE6\u9084\u539F\u300A\u8352\u91CE\u4E82\u9B25\u300B\u91CC\u6602\uFF01\u9BAE\u7DA0\u8B8A\u8272\u9F8D\u9023\u5E3D\u885B\u8863\u3001\u5DE8\u5927\u8B8A\u8272\u9F8D\u9215\u6263\u96D9\u773C\u3001\u5634\u89D2\u54AC\u8457\u7D05\u767D\u87BA\u65CB\u68D2\u68D2\u7CD6\u3001\u624B\u6301\u56DB\u5203\u65CB\u8F49\u624B\u88CF\u528D\u3002",
      vfx: {
        punchTrail: "\u9752\u85CD\u65CB\u8F49\u624B\u88CF\u528D\u5E7B\u5F71\u3001\u7159\u5E55\u6B98\u5F71",
        sk1: "\u56DB\u91CD\u9023\u74B0\u9AD8\u901F\u98DB\u65CB\u624B\u88CF\u528D\u5F48\u5E55",
        sk2: "\u795E\u96B1\u9A30\u7A7A\u7A81\u8972\u65CB\u98A8\u8E22",
        guardShield: "\u8B8A\u8272\u9F8D\u5168\u606F\u5149\u5B78\u96B1\u8EAB\u5C4F\u969C",
        hitEffect: "\u9752\u85CD\u80FD\u91CF\u98DB\u5203\u661F\u5875"
      },
      creator: "Brawl Stars Tribute"
    }
  ];
  function getSkinAttackStyle(skin) {
    if (!skin) return "brawler";
    if (skin.attackStyle) return skin.attackStyle;
    const map = {
      skin_hawkeye: "bow",
      skin_cryo_maiden: "bow",
      skin_volt_ranger: "bow",
      skin_dark_hacker: "gun",
      skin_abyssal_ghost: "gun",
      skin_nano_cyborg: "gun",
      skin_iron_man: "repulsor",
      skin_spiderman: "web_shot",
      skin_captain_america: "shield",
      skin_thor: "hammer",
      skin_thanos: "infinity_strike",
      skin_goku_ssj: "kamehameha",
      skin_vegeta_ssj: "final_flash",
      skin_trunks_future: "sword",
      skin_cosmic_ronin: "sword",
      skin_piccolo: "namek_arm",
      skin_golden_frieza: "death_beam",
      skin_pulse_enforcer: "baton",
      skin_neon_shadow: "kunai",
      skin_solar_valkyrie: "spear",
      skin_brawl_shelly: "shotgun",
      skin_brawl_colt: "dual_guns",
      skin_brawl_spike: "cactus_spike",
      skin_brawl_el_primo: "luchador",
      skin_brawl_crow: "toxic_dagger",
      skin_brawl_leon: "shuriken"
    };
    return map[skin.id] || "brawler";
  }
  function getSkinAttackMeta(skin, attackType = "light_punch") {
    const style = getSkinAttackStyle(skin);
    const isKick = attackType === "heavy_kick" || attackType === "crouch_kick";
    const metas = {
      bow: {
        lightName: "\u8907\u5408\u795E\u5F13\u30FB\u6025\u901F\u7BAD\u77E2",
        heavyName: "\u9AD8\u80FD\u5149\u5B50\u30FB\u91CD\u7BAD\u7A7F\u7532\u5C04\u64CA",
        crouchName: "\u4E0B\u4F0F\u7375\u624B\u30FB\u8CBC\u5730\u6ED1\u7BAD",
        sweepName: "\u4E0B\u4F0F\u7375\u624B\u30FB\u8CBC\u5730\u7BAD\u52C1\u6383\u5802",
        sound: "bow_shot",
        vfxType: "bow_arrow"
      },
      gun: {
        lightName: "\u91CF\u5B50\u624B\u69CD\u30FB\u6025\u901F\u5C04\u64CA",
        heavyName: "\u6230\u8853\u7206\u80FD\u30FB\u904E\u71B1\u9023\u5C04",
        crouchName: "\u4E0B\u8E72\u6ED1\u884C\u30FB\u4F4E\u4F4D\u901F\u5C04",
        sweepName: "\u6230\u8853\u6ED1\u93DF\u30FB\u4F4E\u4F4D\u6383\u5C04",
        sound: "gun_shot",
        vfxType: "gun_bullet"
      },
      repulsor: {
        lightName: "\u638C\u5FC3\u7B49\u96E2\u5B50\u8108\u885D\u7832",
        heavyName: "\u5168\u529F\u7387\u7D0D\u7C73\u63A8\u9032\u91CD\u64CA",
        crouchName: "\u4F4E\u7A7A\u7D0D\u7C73\u5FAE\u5F48\u5C04\u64CA",
        sweepName: "\u4F4E\u7A7A\u7B49\u96E2\u5B50\u5FAE\u7206\u6383\u5802",
        sound: "laser",
        vfxType: "repulsor_blast"
      },
      shield: {
        lightName: "\u6C4E\u5408\u91D1\u661F\u76FE\u30FB\u7834\u9663\u649E\u64CA",
        heavyName: "\u50B3\u5947\u661F\u76FE\u30FB\u8FF4\u65CB\u98DB\u64F2",
        crouchName: "\u4E0B\u76E4\u76FE\u9762\u30FB\u6A6B\u6383\u5D29\u6575",
        sweepName: "\u4E0B\u76E4\u76FE\u9762\u30FB\u6A6B\u6383\u5D29\u6575",
        sound: "shield_hit",
        vfxType: "shield_strike"
      },
      hammer: {
        lightName: "\u96F7\u795E\u4E4B\u939A\u30FB\u5929\u96F7\u8F5F\u64CA",
        heavyName: "\u963F\u65AF\u5609\u72C2\u96F7\u30FB\u843D\u96F7\u91CD\u5288",
        crouchName: "\u5730\u88C2\u96F7\u66B4\u30FB\u8CBC\u5730\u9318\u64CA",
        sweepName: "\u5730\u88C2\u96F7\u66B4\u30FB\u8CBC\u5730\u9318\u64CA",
        sound: "thunder",
        vfxType: "thor_lightning"
      },
      infinity_strike: {
        lightName: "\u7121\u9650\u624B\u5957\u30FB\u539F\u77F3\u5929\u547D\u5DE8\u62F3",
        heavyName: "\u516D\u539F\u77F3\u7206\u767C\u30FB\u6CF0\u5766\u6BC0\u6EC5",
        crouchName: "\u529B\u91CF\u539F\u77F3\u30FB\u5730\u52D5\u5C71\u6416",
        sweepName: "\u529B\u91CF\u539F\u77F3\u30FB\u8CBC\u5730\u9707\u64CA",
        sound: "burst",
        vfxType: "infinity_vfx"
      },
      web_shot: {
        lightName: "\u9748\u52D5\u86DB\u7D72\u30FB\u6025\u901F\u8155\u5C04",
        heavyName: "\u86DB\u7D72\u64FA\u76EA\u30FB\u8FF4\u65CB\u7206\u7834\u8E22",
        crouchName: "\u8CBC\u5730\u86DB\u7D72\u30FB\u7D46\u5012\u727D\u5F15",
        sweepName: "\u8CBC\u5730\u86DB\u7D72\u30FB\u7D46\u5012\u727D\u5F15",
        sound: "web_thwip",
        vfxType: "web_stream"
      },
      kamehameha: {
        lightName: "\u8D85\u8CFD\u9F9C\u6D3E\u6C23\u529F\u30FB\u638C\u5FC3\u7206\u767C",
        heavyName: "\u77AC\u5F71\u91D1\u5149\u30FB\u9F8D\u62F3\u7834\u7A7A\u8E22",
        crouchName: "\u6C23\u7130\u7A81\u9032\u30FB\u4E0B\u6BB5\u6383\u5802",
        sweepName: "\u6C23\u7130\u7A81\u9032\u30FB\u4E0B\u6BB5\u6383\u5802",
        sound: "ki_blast",
        vfxType: "kamehameha_vfx"
      },
      final_flash: {
        lightName: "\u8CFD\u4E9E\u50B2\u6C23\u30FB\u5927\u9739\u9742\u9583\u5149",
        heavyName: "\u738B\u8005\u50B2\u6162\u30FB\u6700\u7D42\u9583\u5149\u6230\u65A7\u8E22",
        crouchName: "\u4E0B\u6BB5\u6C23\u52C1\u30FB\u8CBC\u5730\u7834\u9632",
        sweepName: "\u4E0B\u6BB5\u6C23\u52C1\u30FB\u8CBC\u5730\u7834\u9632",
        sound: "ki_blast",
        vfxType: "final_flash_vfx"
      },
      sword: {
        lightName: "\u52C7\u8005\u4E4B\u528D\u30FB\u7834\u7A7A\u5C45\u5408\u65AC",
        heavyName: "\u9583\u8000\u8056\u528D\u30FB\u6B21\u5143\u96D9\u91CD\u5207",
        crouchName: "\u5730\u8D70\u528D\u6C23\u30FB\u8CBC\u5730\u8FF4\u65CB",
        sweepName: "\u5730\u8D70\u528D\u6C23\u30FB\u8CBC\u5730\u62D4\u5200\u65AC",
        sound: "sword_slash",
        vfxType: "sword_slash_vfx"
      },
      namek_arm: {
        lightName: "\u90A3\u7F8E\u514B\u661F\u30FB\u4F38\u9577\u9B54\u81C2\u7834\u7A7A\u523A",
        heavyName: "\u9B54\u8CAB\u5149\u6BBA\u7832\u30FB\u7834\u90AA\u885D\u64CA",
        crouchName: "\u9B54\u81C2\u6383\u5802\u30FB\u4F4E\u4F4D\u6A6B\u6383",
        sweepName: "\u9B54\u81C2\u6383\u5802\u30FB\u4F4E\u4F4D\u6A6B\u6383",
        sound: "punch",
        vfxType: "namek_arm_vfx"
      },
      death_beam: {
        lightName: "\u5E1D\u7687\u6B7B\u4EA1\u5149\u7DDA\u30FB\u6307\u5C16\u8CAB\u7A7F",
        heavyName: "\u9EC3\u91D1\u5E1D\u7687\u30FB\u8D85\u65B0\u661F\u72C2\u66B4\u8E22",
        crouchName: "\u7329\u7D05\u5C04\u7DDA\u30FB\u8CBC\u5730\u523A\u64CA",
        sweepName: "\u7329\u7D05\u5C04\u7DDA\u30FB\u8CBC\u5730\u6A6B\u6383",
        sound: "laser",
        vfxType: "death_beam_vfx"
      },
      baton: {
        lightName: "\u8108\u885D\u9632\u66B4\u96FB\u64CA\u30FB\u93AE\u58D3\u76F4\u523A",
        heavyName: "\u9AD8\u58D3\u91CD\u529B\u30FB\u91CD\u88DD\u64BC\u5730\u64CA",
        crouchName: "\u4E0B\u8EAB\u6383\u5802\u30FB\u9632\u66B4\u7D46\u6454",
        sweepName: "\u4E0B\u8EAB\u6383\u5802\u30FB\u9632\u66B4\u7D46\u6454",
        sound: "punch",
        vfxType: "punch"
      },
      kunai: {
        lightName: "\u6697\u5F71\u82E6\u7121\u30FB\u77AC\u5F71\u96D9\u523A",
        heavyName: "\u75BE\u98A8\u6697\u5203\u30FB\u9A30\u7A7A\u8FF4\u65CB\u8E22",
        crouchName: "\u5730\u5F71\u7121\u75D5\u30FB\u4E0B\u6BB5\u6697\u8972",
        sweepName: "\u5730\u5F71\u7121\u75D5\u30FB\u4E0B\u6BB5\u6697\u8972",
        sound: "sword_slash",
        vfxType: "punch"
      },
      shotgun: {
        lightName: "\u6563\u5F48\u9EDE\u5C04\u30FB\u6025\u901F\u51FA\u819B",
        heavyName: "\u91CD\u578B\u6563\u5F48\u30FB\u5168\u529F\u7387\u8F5F\u64CA",
        crouchName: "\u4F4E\u59FF\u4F0F\u5730\u30FB\u8CBC\u5730\u6563\u5F48",
        sweepName: "\u4F4E\u59FF\u4F0F\u5730\u30FB\u8CBC\u5730\u6563\u5F48\u6383\u5802",
        sound: "gun_shot",
        vfxType: "gun_bullet"
      },
      dual_guns: {
        lightName: "\u96D9\u6301\u5DE6\u8F2A\u30FB\u6025\u901F\u9023\u767C",
        heavyName: "\u8B66\u661F\u96D9\u69CD\u30FB\u65CB\u98A8\u91CD\u7832",
        crouchName: "\u4E0B\u4F0F\u6ED1\u6B65\u30FB\u4F4E\u4F4D\u901F\u5C04",
        sweepName: "\u6230\u8853\u6ED1\u6B65\u30FB\u4F4E\u4F4D\u901F\u5C04",
        sound: "gun_shot",
        vfxType: "gun_bullet"
      },
      cactus_spike: {
        lightName: "\u4ED9\u4EBA\u638C\u523A\u30FB\u6025\u901F\u98DB\u91DD",
        heavyName: "\u523A\u7403\u624B\u96F7\u30FB\u5C16\u523A\u7206\u767C",
        crouchName: "\u4F4E\u4F0F\u523A\u91DD\u30FB\u8CBC\u5730\u7A7F\u523A",
        sweepName: "\u4F4E\u4F0F\u523A\u91DD\u30FB\u8CBC\u5730\u7A7F\u523A",
        sound: "punch",
        vfxType: "punch"
      },
      luchador: {
        lightName: "\u6454\u89D2\u9023\u62F3\u30FB\u71B1\u8840\u91CD\u62F3",
        heavyName: "\u6D41\u661F\u98DB\u8098\u30FB\u5929\u964D\u9738\u738B\u64CA",
        crouchName: "\u4E0B\u6BB5\u91CD\u52FE\u30FB\u5730\u52D5\u5C71\u6416",
        sweepName: "\u4E0B\u6BB5\u91CD\u52FE\u30FB\u5730\u52D5\u6383\u5802",
        sound: "punch",
        vfxType: "punch"
      },
      toxic_dagger: {
        lightName: "\u5287\u6BD2\u98DB\u5200\u30FB\u7FE1\u7FE0\u6697\u523A",
        heavyName: "\u6697\u5F71\u4E09\u5203\u30FB\u81F4\u547D\u6BD2\u7259",
        crouchName: "\u8CBC\u5730\u6BD2\u5203\u30FB\u4F4E\u4F4D\u6BD2\u523A",
        sweepName: "\u8CBC\u5730\u6BD2\u5203\u30FB\u4F4E\u4F4D\u6BD2\u523A",
        sound: "sword_slash",
        vfxType: "sword_slash_vfx"
      },
      shuriken: {
        lightName: "\u65CB\u8F49\u624B\u88CF\u528D\u30FB\u6025\u901F\u98DB\u64F2",
        heavyName: "\u56DB\u5203\u7834\u7A7A\u30FB\u65CB\u98A8\u65AC\u64CA",
        crouchName: "\u4E0B\u4F0F\u5F71\u5203\u30FB\u4F4E\u4F4D\u98DB\u65CB",
        sweepName: "\u4E0B\u4F0F\u5F71\u5203\u30FB\u4F4E\u4F4D\u98DB\u65CB",
        sound: "sword_slash",
        vfxType: "sword_slash_vfx"
      },
      brawler: {
        lightName: "\u523A\u62F3\u6253\u64CA",
        heavyName: "\u91CD\u529B\u731B\u8E22",
        crouchName: "\u4E0B\u8E72\u523A\u62F3",
        sweepName: "\u4E0B\u8E72\u6383\u5802\u817F",
        sound: isKick ? "kick" : "punch",
        vfxType: isKick ? "kick" : "punch"
      }
    };
    const meta = metas[style] || metas.brawler;
    let name = meta.lightName;
    if (attackType === "heavy_kick") name = meta.heavyName;
    else if (attackType === "crouch_punch") name = meta.crouchName;
    else if (attackType === "crouch_kick") name = meta.sweepName || "\u4E0B\u8E72\u6383\u5802\u817F";
    return {
      style,
      name,
      sound: meta.sound,
      vfxType: meta.vfxType
    };
  }
  function getSkinSuperMeta(skin) {
    const id = skin ? skin.id : "skin_cyber_warrior";
    const supers = {
      // ── 科技與未來原創系列 (15款) ──
      skin_cyber_warrior: {
        name: "\u91CF\u5B50\u8D85\u5F26\u6E6E\u6EC5\u5203",
        title: "\u91CF\u5B50\u5148\u92D2\u30FB\u8D85\u9AD8\u983B\u5168\u606F\u5F26\u5203\u98A8\u66B4",
        type: "beam",
        color: "#00f3ff",
        coreColor: "#ffffff",
        beamWidth: 75,
        sound: "super"
      },
      skin_neon_shadow: {
        name: "\u6697\u5F71\u6AFB\u843D\u77AC\u7344\u6BBA",
        title: "\u6697\u591C\u9713\u8679\u30FB\u516B\u65B9\u6AFB\u82B1\u6B21\u5143\u65AC",
        type: "slash",
        color: "#ff007f",
        coreColor: "#c084fc",
        beamWidth: 70,
        sound: "super"
      },
      skin_pulse_enforcer: {
        name: "\u8108\u885D\u8D85\u8F09\u5BE9\u5224\u9663",
        title: "\u8108\u885D\u57F7\u6CD5\u5B98\u30FB\u8D85\u9AD8\u58D3\u96FB\u78C1\u62D8\u675F\u7262\u7C60",
        type: "shockwave",
        color: "#3b82f6",
        coreColor: "#60a5fa",
        beamWidth: 75,
        sound: "super"
      },
      skin_cosmic_ronin: {
        name: "\u661F\u8FB0\u5C45\u5408\u767E\u82B1\u65AC",
        title: "\u661F\u969B\u6D6A\u4EBA\u30FB\u9280\u6CB3\u661F\u8ECC\u5C45\u5408\u5967\u7FA9",
        type: "slash",
        color: "#a855f7",
        coreColor: "#f43f5e",
        beamWidth: 75,
        sound: "super"
      },
      skin_volt_ranger: {
        name: "\u8D85\u5C0E\u96F7\u96FB\u72D9\u6BBA\u77E2",
        title: "\u8D85\u5C0E\u5DE1\u8B66\u30FB\u842C\u4F0F\u7279\u78C1\u66B4\u9023\u9396\u7BAD\u5E55",
        type: "lightning",
        color: "#facc15",
        coreColor: "#ffffff",
        beamWidth: 75,
        sound: "super"
      },
      skin_abyssal_ghost: {
        name: "\u6DF1\u6DF5\u6B7B\u57DF\u6697\u5F71\u6CE2",
        title: "\u6DF1\u6DF5\u5E7D\u9748\u30FB\u5E7D\u51A5\u6697\u5F71\u6CE2\u9577\u7206\u6563",
        type: "shockwave",
        color: "#6366f1",
        coreColor: "#818cf8",
        beamWidth: 70,
        sound: "super"
      },
      skin_dark_hacker: {
        name: "\u77E9\u9663\u5D29\u6F70\u4EE3\u78BC\u6D41",
        title: "\u6697\u9ED1\u9ED1\u5BA2\u30FB\u96F6\u65E5\u6F0F\u6D1E\u7D42\u7AEF\u5F37\u5236\u95DC\u9589",
        type: "beam",
        color: "#00ff66",
        coreColor: "#34d399",
        beamWidth: 75,
        sound: "super"
      },
      skin_nano_cyborg: {
        name: "\u5341\u5104\u5948\u7C73\u767E\u5203\u5929\u846C",
        title: "\u5948\u7C73\u751F\u5316\u6230\u8B66\u30FB\u6DB2\u614B\u91D1\u5C6C\u66B4\u98A8\u7A7F\u523A",
        type: "slash",
        color: "#84cc16",
        coreColor: "#bef264",
        beamWidth: 75,
        sound: "super"
      },
      skin_crimson_tyrant: {
        name: "\u5730\u6838\u7194\u5CA9\u8D85\u8F09\u91CD\u8F5F",
        title: "\u8D64\u7D05\u66B4\u541B\u30FB\u842C\u5EA6\u706B\u5C71\u5730\u88C2\u5DE8\u8F5F",
        type: "sphere",
        color: "#ef4444",
        coreColor: "#f97316",
        beamWidth: 85,
        sound: "super"
      },
      skin_cryo_maiden: {
        name: "\u7D55\u5C0D\u96F6\u5EA6\u51B0\u6CB3\u5C01\u795E",
        title: "\u6975\u5BD2\u8D85\u5C0E\u6B66\u59EC\u30FB\u842C\u4E08\u947D\u77F3\u51B0\u9B44\u5DE8\u523A",
        type: "beam",
        color: "#38bdf8",
        coreColor: "#bae6fd",
        beamWidth: 80,
        sound: "super"
      },
      skin_void_devourer: {
        name: "\u6697\u7269\u8CEA\u5947\u9EDE\u541E\u566C",
        title: "\u865B\u7A7A\u541E\u566C\u8005\u30FB\u4E8B\u4EF6\u8996\u754C\u5F15\u529B\u574D\u7E2E\u9ED1\u6D1E",
        type: "sphere",
        color: "#9333ea",
        coreColor: "#c084fc",
        beamWidth: 90,
        sound: "super"
      },
      skin_solar_valkyrie: {
        name: "\u71BE\u967D\u8000\u6591\u9CF3\u51F0\u5929\u6607",
        title: "\u592A\u967D\u5973\u6B66\u795E\u30FB\u842C\u4E08\u6046\u661F\u8056\u706B\u70C8\u7130\u88C1\u6C7A",
        type: "beam",
        color: "#ff4500",
        coreColor: "#fbbf24",
        beamWidth: 90,
        sound: "super"
      },
      skin_cyber_diva: {
        name: "\u72C2\u71B1\u7B49\u5316\u5668\u5168\u606F\u66B4\u98A8",
        title: "\u8CFD\u535A\u6B4C\u59EC\u30FB\u97F3\u6D6A\u5171\u632F\u4E03\u5F69\u6975\u5149\u97F3\u7206",
        type: "shockwave",
        color: "#14b8a6",
        coreColor: "#f43f5e",
        beamWidth: 80,
        sound: "super"
      },
      skin_archangel_judicator: {
        name: "\u5929\u570B\u8056\u88C1\u30FB\u516D\u7FFC\u5149\u5B50\u8056\u5F8B",
        title: "\u66DC\u767D\u88C1\u6C7A\u8056\u4F7F\u30FB\u81F3\u7D14\u5149\u5B50\u5BE9\u5224\u9577\u77DB",
        type: "beam",
        color: "#f8fafc",
        coreColor: "#38bdf8",
        beamWidth: 88,
        sound: "super"
      },
      skin_omega_emperor: {
        name: "\u59CB\u7956\u6A5F\u7687\u30FB\u5B87\u5B99\u91D1\u8F2A\u6838\u7206",
        title: "\u9EC3\u91D1\u7D42\u6975\u6A5F\u795E\u30FB\u4E5D\u4E94\u81F3\u5C0A\u6EC5\u4E16\u795E\u5A01\u91D1\u8292",
        type: "sphere",
        color: "#eab308",
        coreColor: "#ffffff",
        beamWidth: 95,
        sound: "super"
      },
      // ── 漫威宇宙經典系列 (6款) ──
      skin_iron_man: {
        name: "\u8CEA\u5B50\u5DE8\u7832 UNIBEAM",
        title: "\u92FC\u9435\u4EBA\u30FB\u99AC\u514B85\u80F8\u53E3\u65B9\u821F\u5DE8\u578B\u7B49\u96E2\u5B50\u96F7\u5C04",
        type: "beam",
        color: "#00f3ff",
        coreColor: "#ef4444",
        beamWidth: 85,
        sound: "super"
      },
      skin_spiderman: {
        name: "\u72C2\u66B4\u86DB\u7DB2\u5DE8\u6454 WEB CYCLONE",
        title: "\u8718\u86DB\u4EBA\u30FB\u5F7C\u5F97\u5E15\u514B\u5168\u5C4F\u86DB\u7DB2\u72C2\u66B4\u5927\u8FF4\u65CB",
        type: "cyclone",
        color: "#ffffff",
        coreColor: "#ef4444",
        beamWidth: 65,
        sound: "super"
      },
      skin_captain_america: {
        name: "\u6C4E\u5408\u91D1\u661F\u8292\u82F1\u52C7\u885D\u64CA",
        title: "\u7F8E\u570B\u968A\u9577\u30FB\u81EA\u7531\u4E4B\u76FE\u8D85\u97F3\u901F\u97F3\u7206\u885D\u64CA",
        type: "charge",
        color: "#38bdf8",
        coreColor: "#ef4444",
        beamWidth: 70,
        sound: "super"
      },
      skin_thor: {
        name: "\u96F7\u795E\u5929\u7F70\u30FB\u4E5D\u754C\u795E\u96F7",
        title: "\u96F7\u795E\u7D22\u723E\u30FB\u5999\u723E\u5C3C\u723E\u5929\u5D29\u5730\u88C2\u72C2\u96F7\u5F15",
        type: "lightning",
        color: "#38bdf8",
        coreColor: "#ffffff",
        beamWidth: 90,
        sound: "super"
      },
      skin_thanos: {
        name: "\u7121\u9650\u624B\u5957\u30FB\u516D\u5BF6\u77F3\u5B87\u5B99\u5C04\u7DDA",
        title: "\u85A9\u8AFE\u65AF\u30FB\u516D\u5927\u7121\u9650\u539F\u77F3\u5B87\u5B99\u7D42\u7109\u5C04\u7DDA",
        type: "infinity",
        color: "#ffd700",
        coreColor: "#a855f7",
        beamWidth: 90,
        sound: "super"
      },
      skin_hawkeye: {
        name: "\u91CF\u5B50\u795E\u7BAD\u30FB\u591A\u91CD\u7206\u7834\u7375\u6BBA",
        title: "\u9DF9\u773C\u30FB\u767E\u6B65\u7A7F\u694A\u5168\u5C4F\u5149\u5B50\u66B4\u98A8\u7BAD\u9663",
        type: "beam",
        color: "#8b5cf6",
        coreColor: "#c084fc",
        beamWidth: 75,
        sound: "super"
      },
      // ── 七龍珠超傳奇系列 (5款) ──
      skin_goku_ssj: {
        name: "\u8D85\u30FB\u9F9C\u6D3E\u6C23\u529F\u6CE2",
        title: "\u5B6B\u609F\u7A7A\u30FB\u8D85\u8D8A\u6975\u9650\u91D1\u9EC3\u72C2\u66B4\u5DE8\u6D6A\u9F9C\u6D3E\u6C23\u529F",
        type: "beam",
        color: "#00bfff",
        coreColor: "#fde047",
        beamWidth: 90,
        sound: "super"
      },
      skin_vegeta_ssj: {
        name: "\u7D42\u6975\u9583\u5149 FINAL FLASH",
        title: "\u8C9D\u5409\u5854\u30FB\u8CFD\u4E9E\u4EBA\u738B\u5B50\u5168\u5C4F\u9EC3\u91D1\u7206\u88C2\u9583\u5149",
        type: "beam",
        color: "#facc15",
        coreColor: "#ffffff",
        beamWidth: 90,
        sound: "super"
      },
      skin_trunks_future: {
        name: "\u71C3\u71D2\u4E4B\u65AC BURNING SLASH",
        title: "\u672A\u4F86\u7279\u5357\u514B\u65AF\u30FB\u5E0C\u671B\u52C7\u8005\u4E4B\u528D\u5341\u5B57\u7834\u7A7A\u65AC",
        type: "slash",
        color: "#a855f7",
        coreColor: "#fde047",
        beamWidth: 75,
        sound: "super"
      },
      skin_piccolo: {
        name: "\u9B54\u8CAB\u5149\u6BBA\u7832",
        title: "\u6BD4\u514B\u5927\u9B54\u738B\u30FB\u96D9\u87BA\u65CB\u8D85\u7A7F\u900F\u87BA\u65CB\u5149\u6BBA\u7832",
        type: "spiral",
        color: "#84cc16",
        coreColor: "#f43f5e",
        beamWidth: 70,
        sound: "super"
      },
      skin_golden_frieza: {
        name: "\u8D85\u65B0\u661F\u6BC0\u6EC5\u5F48 DEATH BALL",
        title: "\u9EC3\u91D1\u5F17\u5229\u6C99\u30FB\u5E1D\u7687\u7329\u7D05\u5DE8\u578B\u6BC0\u6EC5\u9ED1\u5F48",
        type: "sphere",
        color: "#ffd700",
        coreColor: "#ef4444",
        beamWidth: 95,
        sound: "super"
      },
      // ── 《荒野亂鬥》傳奇英雄系列 (6款) ──
      skin_brawl_shelly: {
        name: "\u8D85\u7D1A\u9707\u64BC\u6563\u5F48 SUPER SHELL",
        title: "\u96EA\u8389\u30FB\u5927\u53E3\u5F91\u5168\u5C4F\u7834\u58DE\u9707\u76EA\u5F48\u5E55",
        type: "shockwave",
        color: "#facc15",
        coreColor: "#a855f7",
        beamWidth: 85,
        sound: "super"
      },
      skin_brawl_colt: {
        name: "\u6975\u9650\u5B50\u5F48\u98A8\u66B4 BULLET STORM",
        title: "\u67EF\u723E\u7279\u30FB\u72C2\u66B4\u96D9\u69CD\u7A7F\u900F\u91D1\u5149\u5B50\u5F48\u98A8\u66B4",
        type: "beam",
        color: "#38bdf8",
        coreColor: "#ffd700",
        beamWidth: 80,
        sound: "super"
      },
      skin_brawl_spike: {
        name: "\u5C16\u523A\u4ED9\u4EBA\u638C\u9663 STICK TO 'EM",
        title: "\u65AF\u6D3E\u514B\u30FB\u5DE8\u578B\u523A\u91DD\u4ED9\u4EBA\u638C\u6012\u653E\u7D50\u754C",
        type: "sphere",
        color: "#22c55e",
        coreColor: "#ec4899",
        beamWidth: 90,
        sound: "super"
      },
      skin_brawl_el_primo: {
        name: "\u98DB\u8EAB\u5929\u964D\u91CD\u58D3 FLYING ELBOW",
        title: "\u666E\u91CC\u83AB\u30FB\u91D1\u8272\u6D41\u661F\u6CF0\u5766\u9707\u64BC\u964D\u81E8",
        type: "charge",
        color: "#f59e0b",
        coreColor: "#ffd700",
        beamWidth: 85,
        sound: "super"
      },
      skin_brawl_crow: {
        name: "\u5287\u6BD2\u5929\u964D\u4FEF\u885D SWOOP",
        title: "\u9ED1\u9D09\u30FB\u6F2B\u5929\u6DEC\u6BD2\u98DB\u5200\u5168\u606F\u66B4\u98A8\u96E8",
        type: "slash",
        color: "#10b981",
        coreColor: "#a7f3d0",
        beamWidth: 80,
        sound: "super"
      },
      skin_brawl_leon: {
        name: "\u7159\u9727\u96B1\u8EAB\u7D55\u6BBA SMOKE BOMB",
        title: "\u91CC\u6602\u30FB\u5168\u5C4F\u7159\u5E55\u77AC\u5F71\u56DB\u91CD\u624B\u88CF\u528D\u7A81\u8972",
        type: "slash",
        color: "#34d399",
        coreColor: "#00f3ff",
        beamWidth: 78,
        sound: "super"
      },
      // 兼容舊別名
      skin_ironman: {
        name: "\u8CEA\u5B50\u5DE8\u7832 UNIBEAM",
        title: "\u92FC\u9435\u4EBA\u30FB\u99AC\u514B85\u80F8\u53E3\u65B9\u821F\u5DE8\u578B\u7B49\u96E2\u5B50\u96F7\u5C04",
        type: "beam",
        color: "#00f3ff",
        coreColor: "#ef4444",
        beamWidth: 85,
        sound: "super"
      },
      skin_captain: {
        name: "\u6C4E\u5408\u91D1\u661F\u8292\u82F1\u52C7\u885D\u64CA",
        title: "\u7F8E\u570B\u968A\u9577\u30FB\u81EA\u7531\u4E4B\u76FE\u8D85\u97F3\u901F\u97F3\u7206\u885D\u64CA",
        type: "charge",
        color: "#38bdf8",
        coreColor: "#ef4444",
        beamWidth: 70,
        sound: "super"
      },
      skin_goku: {
        name: "\u8D85\u30FB\u9F9C\u6D3E\u6C23\u529F\u6CE2",
        title: "\u5B6B\u609F\u7A7A\u30FB\u8D85\u8D8A\u6975\u9650\u91D1\u9EC3\u72C2\u66B4\u5DE8\u6D6A\u9F9C\u6D3E\u6C23\u529F",
        type: "beam",
        color: "#00bfff",
        coreColor: "#fde047",
        beamWidth: 90,
        sound: "super"
      },
      skin_vegeta: {
        name: "\u7D42\u6975\u9583\u5149 FINAL FLASH",
        title: "\u8C9D\u5409\u5854\u30FB\u8CFD\u4E9E\u4EBA\u738B\u5B50\u5168\u5C4F\u9EC3\u91D1\u7206\u88C2\u9583\u5149",
        type: "beam",
        color: "#facc15",
        coreColor: "#ffffff",
        beamWidth: 90,
        sound: "super"
      },
      skin_trunks: {
        name: "\u71C3\u71D2\u4E4B\u65AC BURNING SLASH",
        title: "\u672A\u4F86\u7279\u5357\u514B\u65AF\u30FB\u5E0C\u671B\u52C7\u8005\u4E4B\u528D\u5341\u5B57\u7834\u7A7A\u65AC",
        type: "slash",
        color: "#a855f7",
        coreColor: "#fde047",
        beamWidth: 75,
        sound: "super"
      },
      skin_frieza: {
        name: "\u8D85\u65B0\u661F\u6BC0\u6EC5\u5F48 DEATH BALL",
        title: "\u9EC3\u91D1\u5F17\u5229\u6C99\u30FB\u5E1D\u7687\u7329\u7D05\u5DE8\u578B\u6BC0\u6EC5\u9ED1\u5F48",
        type: "sphere",
        color: "#ffd700",
        coreColor: "#ef4444",
        beamWidth: 95,
        sound: "super"
      }
    };
    const selected = supers[id] || {
      name: "\u91CF\u5B50\u8D85\u80FD\u7C92\u5B50\u5DE8\u7832",
      title: "\u91CF\u5B50\u77E9\u9663\u30FB\u9AD8\u983B\u7C92\u5B50\u8CAB\u901A\u66B4\u64CA",
      type: "beam",
      color: skin && skin.themeColor ? skin.themeColor : "#00f3ff",
      coreColor: "#ffffff",
      beamWidth: 75,
      sound: "super"
    };
    return {
      ...selected,
      damage: 220,
      startup: 16,
      duration: 65
    };
  }

  // js/data/stages.js
  var STAGES = [
    {
      id: "stage_cyber_matrix",
      name: "\u8CFD\u535A\u91CF\u5B50\u7A7A\u9593",
      subtitle: "Cyber Matrix / Quantum Void",
      series: "cyber",
      icon: "fa-solid fa-microchip",
      themeColor: "#00f3ff",
      secondaryColor: "#ff007f",
      description: "\u6DF1\u9083\u91CF\u5B50\u77E9\u9663\u865B\u7A7A\uFF0C\u5168\u606F\u7ACB\u9AD4\u7DB2\u683C\u64C2\u53F0\u8207\u65CB\u8F49 3D \u9713\u8679\u591A\u9762\u9AD4\u3002",
      skyColors: ["#040714", "#0a1026", "#101a38"],
      gridColor: "rgba(0, 243, 255, 0.2)",
      groundColor: "#0c142b",
      glowColor: "#00f3ff",
      musicStyle: "cyber"
    },
    {
      id: "stage_tenkaichi",
      name: "\u5929\u4E0B\u7B2C\u4E00\u6B66\u9053\u6703",
      subtitle: "World Martial Arts Tournament Ring",
      series: "dragonball",
      icon: "fa-solid fa-dragon",
      themeColor: "#eab308",
      secondaryColor: "#ef4444",
      description: "\u4E03\u9F8D\u73E0\u50B3\u5947\u6B66\u9053\u64C2\u53F0\uFF0C\u6674\u7A7A\u767D\u96F2\u3001\u9060\u65B9\u9752\u5C71\u8207\u98C4\u63DA\u7684\u300C\u6B66\u300D\u5B57\u9326\u65D7\u3002",
      skyColors: ["#1e40af", "#38bdf8", "#bae6fd"],
      gridColor: "rgba(234, 179, 8, 0.25)",
      groundColor: "#ca8a04",
      glowColor: "#ffd700",
      musicStyle: "martial"
    },
    {
      id: "stage_stark_tower",
      name: "\u65AF\u5854\u514B\u5927\u6A13\u5929\u53F0",
      subtitle: "Stark Tower Rooftop / NYC Skyline",
      series: "marvel",
      icon: "fa-solid fa-building",
      themeColor: "#f43f5e",
      secondaryColor: "#38bdf8",
      description: "\u6F2B\u5A01\u7D10\u7D04\u5348\u591C\u5929\u969B\u7DDA\uFF0C\u5FA9\u4EC7\u8005 A \u6A19\u8A8C\u505C\u6A5F\u576A\u3001\u7D30\u96E8\u9761\u970F\u8207\u9060\u65B9\u96F7\u9706\u9583\u96FB\u3002",
      skyColors: ["#050814", "#0f172a", "#1e293b"],
      gridColor: "rgba(244, 63, 94, 0.2)",
      groundColor: "#1e293b",
      glowColor: "#38bdf8",
      musicStyle: "heroic"
    },
    {
      id: "stage_namek",
      name: "\u90A3\u7F8E\u514B\u661F",
      subtitle: "Planet Namek / Green Sky & Alien Sea",
      series: "dragonball",
      icon: "fa-solid fa-globe",
      themeColor: "#10b981",
      secondaryColor: "#06b6d4",
      description: "\u4E03\u9F8D\u73E0\u7570\u661F\u8056\u5730\uFF0C\u9752\u6AB8\u7DA0\u8272\u5929\u7A7A\u3001\u96D9\u5B50\u5916\u661F\u660E\u6708\u3001\u4E9E\u5947\u85A9\u795E\u6728\u8207\u9752\u78A7\u6D77\u6D0B\u3002",
      skyColors: ["#365314", "#65a30d", "#a3e635"],
      gridColor: "rgba(16, 185, 129, 0.25)",
      groundColor: "#064e3b",
      glowColor: "#34d399",
      musicStyle: "alien"
    }
  ];
  function getStageById(id) {
    return STAGES.find((s) => s.id === id) || STAGES[0];
  }
  function getRandomStage() {
    const idx = Math.floor(Math.random() * STAGES.length);
    return STAGES[idx];
  }

  // js/save_system.js
  var STORAGE_KEY_CURRENT = "cyberstriker_current_session";
  var STORAGE_KEY_ACCOUNTS = "cyberstriker_cloud_accounts";
  var CLOUD_KV_ENDPOINT = "https://kvdb.io/LjcEsRKfWahraYeimuojjQ/";
  function utf8ToBase64(str) {
    try {
      if (typeof btoa === "function") {
        return btoa(unescape(encodeURIComponent(str)));
      }
      return Buffer.from(str, "utf8").toString("base64");
    } catch (e) {
      return btoa(str);
    }
  }
  function base64ToUtf8(b64) {
    try {
      if (typeof atob === "function") {
        return decodeURIComponent(escape(atob(b64)));
      }
      return Buffer.from(b64, "base64").toString("utf8");
    } catch (e) {
      return atob(b64);
    }
  }
  function emailToCloudKey(email) {
    const clean = email.trim().toLowerCase();
    const safeB64 = utf8ToBase64(clean).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    return "cs_u_" + safeB64;
  }
  function safeGetItem(key) {
    try {
      if (typeof localStorage !== "undefined" && localStorage) {
        return localStorage.getItem(key);
      }
    } catch (e) {
    }
    return null;
  }
  function safeSetItem(key, val) {
    try {
      if (typeof localStorage !== "undefined" && localStorage) {
        localStorage.setItem(key, val);
      }
    } catch (e) {
    }
  }
  function getTodayDateString() {
    const now = /* @__PURE__ */ new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  var SaveSystem = class {
    constructor() {
      this.currentUser = null;
      this.isGuest = false;
      this.accounts = this._loadAccountsFromStorage();
      this.cloudEndpoint = CLOUD_KV_ENDPOINT;
      this.syncListeners = [];
      this.syncState = "idle";
      this.lastSyncMessage = "\u96F2\u7AEF\u5C31\u7DD2";
    }
    /**
     * 註冊雲端同步狀態變更監聽器
     */
    onSyncChange(fn) {
      if (typeof fn === "function") {
        this.syncListeners.push(fn);
      }
    }
    _setSyncState(state, message = "") {
      this.syncState = state;
      this.lastSyncMessage = message;
      this.syncListeners.forEach((fn) => {
        try {
          fn(this.syncState, this.lastSyncMessage);
        } catch (e) {
          console.error("Error in sync listener:", e);
        }
      });
    }
    _loadAccountsFromStorage() {
      try {
        const raw = safeGetItem(STORAGE_KEY_ACCOUNTS);
        if (raw) {
          const parsed = JSON.parse(raw);
          const defaultStarterSkins = ["skin_cyber_warrior", "skin_neon_shadow", "skin_pulse_enforcer"];
          const shopOnlyTribute = [
            "skin_iron_man",
            "skin_spiderman",
            "skin_captain_america",
            "skin_thor",
            "skin_thanos",
            "skin_hawkeye",
            "skin_goku_ssj",
            "skin_vegeta_ssj",
            "skin_trunks_future",
            "skin_piccolo",
            "skin_golden_frieza",
            "skin_brawl_shelly",
            "skin_brawl_colt",
            "skin_brawl_spike",
            "skin_brawl_el_primo",
            "skin_brawl_crow",
            "skin_brawl_leon"
          ];
          for (const email in parsed) {
            if (parsed[email]) {
              if ((parsed[email].credits || 0) < 3e4) {
                parsed[email].credits = 5e4;
              }
              if (!Array.isArray(parsed[email].purchasedSkins)) {
                parsed[email].purchasedSkins = [];
              }
              if (Array.isArray(parsed[email].skins)) {
                parsed[email].skins = parsed[email].skins.filter((sid) => {
                  if (shopOnlyTribute.includes(sid)) {
                    return parsed[email].purchasedSkins.includes(sid);
                  }
                  return true;
                });
                defaultStarterSkins.forEach((sid) => {
                  if (!parsed[email].skins.includes(sid)) parsed[email].skins.push(sid);
                });
                if (!parsed[email].skins.includes(parsed[email].equippedSkin)) {
                  parsed[email].equippedSkin = "skin_cyber_warrior";
                }
              }
            }
          }
          return parsed;
        }
      } catch (e) {
        console.warn("Failed to parse saved accounts:", e);
      }
      const initialAccounts = {
        "player@gmail.com": {
          uid: "CY-UID-882101",
          email: "player@gmail.com",
          nickname: "\u91CF\u5B50\u5148\u92D2",
          avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=QuantumVanguard",
          credits: 5e4,
          eventTokens: 120,
          skins: [
            "skin_cyber_warrior",
            "skin_neon_shadow",
            "skin_pulse_enforcer"
          ],
          purchasedSkins: [],
          equippedSkin: "skin_cyber_warrior",
          loadout: ["SK-01", "SK-02", "SK-09"],
          stats: { total: 18, wins: 14, losses: 4, aiBeaten: { easy: true, normal: true, hard: true, nightmare: false } },
          preferences: { bgmVol: 0.4, sfxVol: 0.8, haptics: true },
          lastLogin: new Date(Date.now() - 36e5 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 36e5 * 2).toISOString()
        },
        "ethan.cyber@gmail.com": {
          uid: "CY-UID-773902",
          email: "ethan.cyber@gmail.com",
          nickname: "\u4F0A\u68EE\u5927\u5E2B",
          avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=EthanStriker",
          credits: 5e4,
          eventTokens: 350,
          skins: [
            "skin_cyber_warrior",
            "skin_neon_shadow",
            "skin_pulse_enforcer"
          ],
          purchasedSkins: [],
          equippedSkin: "skin_cyber_warrior",
          loadout: ["SK-03", "SK-04", "SK-07"],
          stats: { total: 42, wins: 38, losses: 4, aiBeaten: { easy: true, normal: true, hard: true, nightmare: true } },
          preferences: { bgmVol: 0.5, sfxVol: 0.85, haptics: true },
          lastLogin: new Date(Date.now() - 864e5).toISOString(),
          updatedAt: new Date(Date.now() - 864e5).toISOString()
        }
      };
      safeSetItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(initialAccounts));
      return initialAccounts;
    }
    _saveAccountsToStorage() {
      try {
        safeSetItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(this.accounts));
      } catch (e) {
        console.error("Failed to persist accounts:", e);
      }
    }
    /**
     * 初始化系統：自動嘗試恢復前次登入，並在背景向雲端驗證有無最新資料
     */
    init() {
      try {
        const lastSession = safeGetItem(STORAGE_KEY_CURRENT);
        if (lastSession) {
          const sessionData = JSON.parse(lastSession);
          if (sessionData.isGuest) {
            this.loginAsGuest(sessionData.user);
            return;
          } else if (sessionData.email && this.accounts[sessionData.email]) {
            this.currentUser = this.accounts[sessionData.email];
            this.currentUser.lastLogin = (/* @__PURE__ */ new Date()).toISOString();
            this._saveAccountsToStorage();
            this.syncWithCloud(sessionData.email).catch((err) => {
              console.warn("Background sync on init:", err);
            });
            return;
          }
        }
      } catch (e) {
        console.warn("Session resume failed, defaulting to first or guest:", e);
      }
      const firstEmail = Object.keys(this.accounts)[0];
      if (firstEmail && this.accounts[firstEmail]) {
        this.currentUser = this.accounts[firstEmail];
        this.currentUser.lastLogin = (/* @__PURE__ */ new Date()).toISOString();
        this.isGuest = false;
        this._persistSession();
        this.syncWithCloud(firstEmail).catch(console.warn);
      } else {
        this.loginAsGuest();
      }
    }
    /**
     * 雲端存檔讀取 (GET from kvdb.io)
     */
    async fetchFromCloud(email) {
      if (!email || email.includes("offline.local")) return null;
      const key = emailToCloudKey(email);
      const url = this.cloudEndpoint + key;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6e3);
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { "Accept": "application/json" },
          signal: controller.signal
        });
        clearTimeout(timer);
        if (res.status === 200) {
          const data = await res.json();
          return data;
        } else if (res.status === 404) {
          return null;
        } else {
          console.warn("Cloud fetch returned status " + res.status);
          return null;
        }
      } catch (e) {
        clearTimeout(timer);
        console.warn("Cloud fetch failed or timed out:", e.message);
        return null;
      }
    }
    /**
     * 雲端存檔寫入 (POST to kvdb.io)
     */
    async saveToCloud(userData) {
      if (!userData || !userData.email || userData.email.includes("offline.local")) {
        return false;
      }
      this._setSyncState("syncing", "\u6B63\u5728\u4E0A\u50B3\u5B58\u6A94\u81F3\u5168\u7403\u96F2\u7AEF...");
      const key = emailToCloudKey(userData.email);
      const url = this.cloudEndpoint + key;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6e3);
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
          signal: controller.signal
        });
        clearTimeout(timer);
        if (res.ok) {
          this._setSyncState("synced", "\u5DF2\u65BC " + (/* @__PURE__ */ new Date()).toLocaleTimeString() + " \u6210\u529F\u540C\u6B65\u81F3\u96F2\u7AEF");
          return true;
        } else {
          console.warn("Cloud save status " + res.status);
          this._setSyncState("error", "\u96F2\u7AEF\u540C\u6B65\u56DE\u61C9\u7570\u5E38\uFF0C\u5DF2\u4FDD\u5B58\u65BC\u672C\u6A5F");
          return false;
        }
      } catch (e) {
        clearTimeout(timer);
        console.warn("Cloud save failed:", e.message);
        this._setSyncState("error", "\u7DB2\u8DEF\u9023\u7DDA\u53D7\u9650\uFF0C\u5B58\u6A94\u66AB\u5B58\u65BC\u672C\u6A5F");
        return false;
      }
    }
    /**
     * 智能合併演算法：確保任何裝置解鎖的造型與最高能量幣永遠不遺失
     */
    _mergeAccounts(cloud, local) {
      if (!cloud) return local;
      if (!local) return cloud;
      const cloudTime = new Date(cloud.updatedAt || 0).getTime();
      const localTime = new Date(local.updatedAt || 0).getTime();
      const mergedPurchased = Array.from(/* @__PURE__ */ new Set([
        ...Array.isArray(cloud.purchasedSkins) ? cloud.purchasedSkins : [],
        ...Array.isArray(local.purchasedSkins) ? local.purchasedSkins : []
      ]));
      const shopOnlyMarvelDB = [
        "skin_iron_man",
        "skin_spiderman",
        "skin_captain_america",
        "skin_thor",
        "skin_thanos",
        "skin_goku_ssj",
        "skin_vegeta_ssj",
        "skin_trunks_future",
        "skin_piccolo",
        "skin_golden_frieza"
      ];
      const rawSkins = Array.from(/* @__PURE__ */ new Set([
        ...Array.isArray(cloud.skins) ? cloud.skins : [],
        ...Array.isArray(local.skins) ? local.skins : []
      ]));
      const allSkins = rawSkins.filter((sid) => {
        if (shopOnlyMarvelDB.includes(sid)) {
          return mergedPurchased.includes(sid);
        }
        return true;
      });
      ["skin_cyber_warrior", "skin_neon_shadow", "skin_pulse_enforcer"].forEach((sid) => {
        if (!allSkins.includes(sid)) allSkins.push(sid);
      });
      const newerAcc = cloudTime >= localTime ? cloud : local;
      let equipped = newerAcc.equippedSkin;
      if (!allSkins.includes(equipped)) {
        equipped = allSkins[0] || "skin_cyber_warrior";
      }
      const credits = Math.max(0, Number(newerAcc.credits) || 0);
      const eventTokens = Math.max(0, Number(newerAcc.eventTokens) || 0);
      const stats = {
        total: Math.max(cloud.stats?.total || 0, local.stats?.total || 0),
        wins: Math.max(cloud.stats?.wins || 0, local.stats?.wins || 0),
        losses: Math.max(cloud.stats?.losses || 0, local.stats?.losses || 0),
        aiBeaten: {
          easy: !!(cloud.stats?.aiBeaten?.easy || local.stats?.aiBeaten?.easy),
          normal: !!(cloud.stats?.aiBeaten?.normal || local.stats?.aiBeaten?.normal),
          hard: !!(cloud.stats?.aiBeaten?.hard || local.stats?.aiBeaten?.hard),
          nightmare: !!(cloud.stats?.aiBeaten?.nightmare || local.stats?.aiBeaten?.nightmare)
        }
      };
      return {
        uid: cloud.uid || local.uid || "CY-UID-" + Math.floor(1e5 + Math.random() * 9e5),
        email: local.email || cloud.email,
        nickname: local.nickname && local.nickname !== "\u91CF\u5B50\u5148\u92D2" ? local.nickname : cloud.nickname || local.nickname || "\u91CF\u5B50\u6230\u58EB",
        avatar: cloud.avatar || local.avatar,
        credits,
        eventTokens,
        purchasedSkins: mergedPurchased,
        skins: allSkins,
        equippedSkin: equipped,
        loadout: Array.isArray(newerAcc.loadout) && newerAcc.loadout.length === 3 ? newerAcc.loadout : local.loadout || ["SK-01", "SK-02", "SK-09"],
        stats,
        preferences: { ...cloud.preferences || {}, ...local.preferences || {} },
        lastLogin: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    /**
     * 手動或定時強制向雲端進行雙向同步
     */
    async syncWithCloud(targetEmail = null) {
      const email = targetEmail || (this.currentUser ? this.currentUser.email : null);
      if (!email || email.includes("offline.local")) {
        return { success: false, reason: "\u8A2A\u5BA2\u5E33\u865F\u7121\u6CD5\u9032\u884C\u96F2\u7AEF\u540C\u6B65" };
      }
      this._setSyncState("syncing", "\u6B63\u5728\u9023\u63A5\u5168\u7403\u96F2\u7AEF\u8CC7\u6599\u5EAB...");
      try {
        const cloudData = await this.fetchFromCloud(email);
        const localData = this.accounts[email] || this.currentUser;
        let merged;
        if (cloudData && localData) {
          merged = this._mergeAccounts(cloudData, localData);
        } else if (cloudData) {
          merged = cloudData;
        } else if (localData) {
          merged = localData;
        } else {
          return { success: false, reason: "\u627E\u4E0D\u5230\u5E33\u865F\u8CC7\u6599" };
        }
        merged.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        this.accounts[email] = merged;
        if (this.currentUser && this.currentUser.email === email) {
          this.currentUser = merged;
        }
        this._saveAccountsToStorage();
        this._persistSession();
        await this.saveToCloud(merged);
        this._setSyncState("synced", "\u5DF2\u5B8C\u6210\u8DE8\u96FB\u8166\u96D9\u5411\u540C\u6B65 (" + (/* @__PURE__ */ new Date()).toLocaleTimeString() + ")");
        return { success: true, user: merged };
      } catch (e) {
        console.error("syncWithCloud error:", e);
        this._setSyncState("error", "\u96F2\u7AEF\u540C\u6B65\u5931\u6557\uFF0C\u5DF2\u7DAD\u6301\u672C\u6A5F\u9032\u5EA6");
        return { success: false, error: e.message };
      }
    }
    /**
     * 途徑一：手動輸入 Gmail 信箱（非同步雲端查找與漫遊恢復）
     */
    async loginWithEmail(email, customNickname = "") {
      email = email.trim().toLowerCase();
      this._setSyncState("syncing", "\u6B63\u5728\u6AA2\u7D22\u96F2\u7AEF\u4F3A\u670D\u5668\u5B58\u6A94...");
      const localData = this.accounts[email] || null;
      let cloudData = null;
      let isNewUser = false;
      let restoreSource = "local";
      try {
        cloudData = await this.fetchFromCloud(email);
      } catch (e) {
        console.warn("Failed to query cloud on login:", e);
      }
      if (cloudData) {
        restoreSource = "cloud";
        isNewUser = false;
        this.currentUser = this._mergeAccounts(cloudData, localData);
        if (customNickname && customNickname.trim()) {
          this.currentUser.nickname = customNickname.trim().slice(0, 12);
        }
        this.currentUser.lastLogin = (/* @__PURE__ */ new Date()).toISOString();
        this.accounts[email] = this.currentUser;
      } else if (localData) {
        restoreSource = "local";
        isNewUser = false;
        this.currentUser = localData;
        if (customNickname && customNickname.trim()) {
          this.currentUser.nickname = customNickname.trim().slice(0, 12);
        }
        this.currentUser.lastLogin = (/* @__PURE__ */ new Date()).toISOString();
      } else {
        isNewUser = true;
        restoreSource = "new";
        const defaultNick = customNickname.trim() || email.split("@")[0];
        const newAccount = {
          uid: "CY-UID-" + Math.floor(1e5 + Math.random() * 9e5),
          email,
          nickname: defaultNick.slice(0, 12),
          avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=" + encodeURIComponent(email),
          credits: 5e4,
          eventTokens: 0,
          skins: [
            "skin_cyber_warrior",
            "skin_neon_shadow",
            "skin_pulse_enforcer"
          ],
          purchasedSkins: [],
          equippedSkin: "skin_cyber_warrior",
          loadout: ["SK-01", "SK-02", "SK-09"],
          stats: { total: 0, wins: 0, losses: 0, aiBeaten: { easy: false, normal: false, hard: false, nightmare: false } },
          preferences: { bgmVol: 0.4, sfxVol: 0.8, haptics: true },
          lastLogin: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.accounts[email] = newAccount;
        this.currentUser = newAccount;
      }
      this.isGuest = false;
      this._persistSession();
      this._saveAccountsToStorage();
      this.saveToCloud(this.currentUser).catch((err) => {
        console.warn("Initial cloud push failed:", err);
      });
      return { user: this.currentUser, isNewUser, restoreSource };
    }
    /**
     * 途徑二：選擇電腦現有 Google 帳號清單一鍵切換
     */
    async switchAccount(email) {
      if (this.accounts[email]) {
        this.currentUser = this.accounts[email];
        this.currentUser.lastLogin = (/* @__PURE__ */ new Date()).toISOString();
        this.isGuest = false;
        this._persistSession();
        this._saveAccountsToStorage();
        this.syncWithCloud(email).catch((e) => console.warn("Switch sync error:", e));
        return this.currentUser;
      }
      return null;
    }
    /**
     * 途徑三：訪客試玩體驗模式 (Guest Play Mode)
     */
    loginAsGuest(existingGuestData = null) {
      this.isGuest = true;
      this.currentUser = existingGuestData || {
        uid: "CY-GUEST-" + Math.floor(1e3 + Math.random() * 9e3),
        email: "guest@offline.local",
        nickname: "\u8A2A\u5BA2\u6230\u58EB",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=GuestStriker",
        credits: 5e4,
        eventTokens: 0,
        skins: [
          "skin_cyber_warrior",
          "skin_neon_shadow",
          "skin_pulse_enforcer"
        ],
        purchasedSkins: [],
        equippedSkin: "skin_cyber_warrior",
        loadout: ["SK-01", "SK-02", "SK-09"],
        stats: { total: 0, wins: 0, losses: 0, aiBeaten: { easy: false, normal: false, hard: false, nightmare: false } },
        preferences: { bgmVol: 0.4, sfxVol: 0.8, haptics: true },
        lastLogin: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this._setSyncState("idle", "\u96E2\u7DDA\u8A2A\u5BA2\u6A21\u5F0F");
      this._persistSession();
      return this.currentUser;
    }
    /**
     * 將訪客帳號綁定至真實 Gmail (資料無痛轉移並上傳雲端)
     */
    async bindGuestToEmail(email, nickname = "") {
      email = email.trim().toLowerCase();
      const isNew = !this.accounts[email];
      if (isNew) {
        this.currentUser.email = email;
        if (nickname.trim()) this.currentUser.nickname = nickname.trim().slice(0, 12);
        this.currentUser.isGuest = false;
        this.accounts[email] = { ...this.currentUser, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      } else {
        const existing = this.accounts[email];
        existing.credits += this.currentUser.credits;
        existing.stats.total += this.currentUser.stats.total;
        existing.stats.wins += this.currentUser.stats.wins;
        existing.stats.losses += this.currentUser.stats.losses;
        this.currentUser = existing;
      }
      this.isGuest = false;
      this._persistSession();
      this._saveAccountsToStorage();
      await this.saveToCloud(this.currentUser);
      return this.currentUser;
    }
    /**
     * 取得所有本機已登記 Google 帳號卡片清單
     */
    getRegisteredAccountsList() {
      return Object.values(this.accounts).map((acc) => ({
        email: acc.email,
        nickname: acc.nickname,
        avatar: acc.avatar,
        credits: acc.credits,
        lastLogin: acc.lastLogin || acc.updatedAt,
        isCurrent: !this.isGuest && this.currentUser && this.currentUser.email === acc.email
      }));
    }
    /**
     * 戰鬥獲勝/落敗經濟收益結算
     */
    recordBattleResult(won, difficulty = "normal", isAi = true) {
      if (!this.currentUser) return { gained: 0, total: 0 };
      let gained = won ? 350 : 120;
      if (won && (difficulty === "hard" || difficulty === "nightmare")) {
        gained += 200;
      }
      this.currentUser.credits += gained;
      this.currentUser.stats.total++;
      if (won) {
        this.currentUser.stats.wins++;
        if (isAi && this.currentUser.stats.aiBeaten) {
          this.currentUser.stats.aiBeaten[difficulty] = true;
        }
      } else {
        this.currentUser.stats.losses++;
      }
      this.currentUser.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      this._saveCurrent();
      return { gained, total: this.currentUser.credits };
    }
    equipSkin(skinId) {
      if (!this.currentUser) return false;
      if (!this.currentUser.skins.includes(skinId)) return false;
      this.currentUser.equippedSkin = skinId;
      this.currentUser.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      this._saveCurrent();
      return true;
    }
    purchaseSkin(skinId, price) {
      if (!this.currentUser) return { success: false, reason: "\u672A\u767B\u5165" };
      if (this.currentUser.skins.includes(skinId)) {
        return { success: false, reason: "\u5DF2\u64C1\u6709\u6B64\u9020\u578B" };
      }
      if (this.currentUser.credits < price) {
        return { success: false, reason: "\u80FD\u91CF\u5E63\u9918\u984D\u4E0D\u8DB3\uFF08\u53EF\u9818\u53D6\u6BCF\u65E5\u6230\u5099\u88DC\u7D66\u6216\u9032\u884C\u5C0D\u6230\u8CFA\u53D6\u80FD\u91CF\u5E63\uFF09" };
      }
      this.currentUser.credits -= price;
      if (!Array.isArray(this.currentUser.purchasedSkins)) {
        this.currentUser.purchasedSkins = [];
      }
      if (!this.currentUser.purchasedSkins.includes(skinId)) {
        this.currentUser.purchasedSkins.push(skinId);
      }
      this.currentUser.skins.push(skinId);
      this.currentUser.equippedSkin = skinId;
      this.currentUser.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      this._saveCurrent();
      return { success: true, remaining: this.currentUser.credits };
    }
    /**
     * 檢查當天是否可以領取戰備補給 (每日嚴格限領一次)
     */
    canClaimDailySupply() {
      const today = getTodayDateString();
      if (this.currentUser && this.currentUser.lastDailySupplyDate) {
        return this.currentUser.lastDailySupplyDate !== today;
      }
      const storedDate = safeGetItem("cyberstriker_daily_supply_date");
      if (storedDate === today) {
        return false;
      }
      return true;
    }
    /**
     * 領取每日戰備補給 (當天僅能領取 1 次，拿完隔日 00:00 才能再次領取)
     */
    claimDailySupply(amount = 1500) {
      if (!this.currentUser) return { success: false, reason: "\u672A\u767B\u5165\u5E33\u865F" };
      const today = getTodayDateString();
      if (!this.canClaimDailySupply()) {
        return {
          success: false,
          reason: "\u4ECA\u65E5\u6230\u5099\u88DC\u7D66\u5DF2\u9818\u53D6\u5B8C\u7562\uFF01\u6BCF\u65E5\u50C5\u9650\u9818\u53D6\u4E00\u6B21\uFF0C\u8ACB\u65BC\u660E\u5929\u518D\u4F86\u9818\u53D6\uFF01",
          nextReset: this.getTimeUntilNextDailyReset()
        };
      }
      this.currentUser.credits = (this.currentUser.credits || 0) + amount;
      this.currentUser.lastDailySupplyDate = today;
      safeSetItem("cyberstriker_daily_supply_date", today);
      this._saveCurrent();
      return {
        success: true,
        amount,
        newBalance: this.currentUser.credits,
        date: today
      };
    }
    /**
     * 計算距離隔日 00:00:00 重置剩餘時間
     */
    getTimeUntilNextDailyReset() {
      const now = /* @__PURE__ */ new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diffMs = tomorrow - now;
      const hours = Math.floor(diffMs / (1e3 * 60 * 60));
      const mins = Math.floor(diffMs % (1e3 * 60 * 60) / (1e3 * 60));
      return `${hours} \u5C0F\u6642 ${mins} \u5206\u9418`;
    }
    updateLoadout(skillsArray) {
      if (!this.currentUser) return;
      if (Array.isArray(skillsArray) && skillsArray.length === 3) {
        this.currentUser.loadout = [...skillsArray];
        this.currentUser.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        this._saveCurrent();
      }
    }
    savePreferences(prefs) {
      if (!this.currentUser) return;
      this.currentUser.preferences = { ...this.currentUser.preferences, ...prefs };
      this.currentUser.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      this._saveCurrent();
    }
    /**
     * 存檔核心：先寫入本機 localStorage，並在背景非同步上傳至全球雲端
     */
    _saveCurrent() {
      if (!this.isGuest && this.currentUser && this.currentUser.email) {
        this.accounts[this.currentUser.email] = { ...this.currentUser, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        this._saveAccountsToStorage();
        this.saveToCloud(this.currentUser).catch((err) => {
          console.warn("Auto cloud sync failed:", err);
        });
      }
      this._persistSession();
    }
    _persistSession() {
      try {
        safeSetItem(STORAGE_KEY_CURRENT, JSON.stringify({
          isGuest: this.isGuest,
          email: this.currentUser ? this.currentUser.email : null,
          user: this.currentUser
        }));
      } catch (e) {
        console.error("Session write failed:", e);
      }
    }
    /**
     * 匯出萬用量子存檔代碼 (CY-SAVE-...)
     */
    exportSaveToken() {
      if (!this.currentUser) return "";
      try {
        const payload = JSON.stringify(this.currentUser);
        const b64 = utf8ToBase64(payload);
        return "CY-SAVE-" + b64;
      } catch (e) {
        console.error("Failed to export save token:", e);
        return "";
      }
    }
    /**
     * 導入萬用量子存檔代碼 (CY-SAVE-...)
     */
    async importSaveToken(tokenStr) {
      if (!tokenStr || !tokenStr.startsWith("CY-SAVE-")) {
        return { success: false, reason: "\u4EE3\u78BC\u683C\u5F0F\u7121\u6548\uFF0C\u5FC5\u9808\u4EE5 CY-SAVE- \u958B\u982D" };
      }
      try {
        const b64 = tokenStr.slice("CY-SAVE-".length).trim();
        const json = base64ToUtf8(b64);
        const imported = JSON.parse(json);
        if (!imported.email || !imported.skins) {
          return { success: false, reason: "\u4EE3\u78BC\u5167\u5BB9\u7F3A\u5C11\u5FC5\u8981\u904A\u6232\u6B04\u4F4D" };
        }
        const email = imported.email.toLowerCase();
        const existing = this.accounts[email] || null;
        const merged = this._mergeAccounts(imported, existing);
        this.accounts[email] = merged;
        this.currentUser = merged;
        this.isGuest = false;
        this._saveAccountsToStorage();
        this._persistSession();
        await this.saveToCloud(merged);
        return { success: true, user: merged };
      } catch (e) {
        console.error("Failed to parse save token:", e);
        return { success: false, reason: "\u5B58\u6A94\u4EE3\u78BC\u89E3\u6790\u5931\u6557\uFF1A" + e.message };
      }
    }
    exportDataJson() {
      return JSON.stringify(this.currentUser, null, 2);
    }
    importDataJson(jsonString) {
      try {
        const imported = JSON.parse(jsonString);
        if (!imported.email || !imported.uid) return false;
        const existing = this.accounts[imported.email];
        const merged = this._mergeAccounts(imported, existing);
        this.accounts[imported.email] = merged;
        this.currentUser = merged;
        this.isGuest = false;
        this._saveAccountsToStorage();
        this._persistSession();
        this.saveToCloud(merged).catch(console.warn);
        return true;
      } catch (e) {
        console.error("Failed to import data:", e);
        return false;
      }
    }
  };
  var saveSystem = new SaveSystem();

  // js/engine/audio.js
  var SoundEngine = class {
    constructor() {
      this.ctx = null;
      this.masterGain = null;
      this.sfxGain = null;
      this.bgmGain = null;
      this.isMuted = false;
      this.sfxVolume = 0.8;
      this.bgmVolume = 0.4;
      this.bgmPlaying = false;
      this.bgmTimer = null;
      this.stepIndex = 0;
    }
    init() {
      if (this.ctx) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
        this.bgmGain.connect(this.masterGain);
      } catch (e) {
        console.warn("Web Audio not supported or failed to initialize:", e);
      }
    }
    ensureContext() {
      if (!this.ctx) this.init();
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }
    setMuted(muted) {
      this.isMuted = muted;
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(muted ? 0 : 1, this.ctx.currentTime);
      }
    }
    setSfxVolume(vol) {
      this.sfxVolume = Math.max(0, Math.min(1, vol));
      if (this.sfxGain && this.ctx) {
        this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      }
    }
    setBgmVolume(vol) {
      this.bgmVolume = Math.max(0, Math.min(1, vol));
      if (this.bgmGain && this.ctx) {
        this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
      }
    }
    // ─── 程序化打擊音效 ───
    playHit(type = "punch") {
      if (this.isMuted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      switch (type) {
        case "punch": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(260, t);
          osc.frequency.exponentialRampToValueAtTime(70, t + 0.08);
          gain.gain.setValueAtTime(0.7, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
          this._playNoise(t, 0.04, 800, 0.4);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.08);
          break;
        }
        case "kick": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(200, t);
          osc.frequency.exponentialRampToValueAtTime(35, t + 0.16);
          gain.gain.setValueAtTime(1, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.16);
          this._playNoise(t, 0.07, 500, 0.6);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.16);
          break;
        }
        case "guard": {
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc1.type = "sine";
          osc1.frequency.setValueAtTime(1240, t);
          osc1.frequency.exponentialRampToValueAtTime(880, t + 0.12);
          osc2.type = "triangle";
          osc2.frequency.setValueAtTime(1860, t);
          osc2.frequency.exponentialRampToValueAtTime(1100, t + 0.12);
          gain.gain.setValueAtTime(0.8, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.sfxGain);
          osc1.start(t);
          osc2.start(t);
          osc1.stop(t + 0.14);
          osc2.stop(t + 0.14);
          break;
        }
        case "shield_up": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(380, t);
          osc.frequency.exponentialRampToValueAtTime(760, t + 0.11);
          gain.gain.setValueAtTime(0.45, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.11);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.11);
          break;
        }
        case "burst": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(180, t);
          osc.frequency.exponentialRampToValueAtTime(30, t + 0.45);
          gain.gain.setValueAtTime(1, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);
          this._playNoise(t, 0.35, 1200, 0.8);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.45);
          break;
        }
        case "laser":
        case "projectile": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(880, t);
          osc.frequency.exponentialRampToValueAtTime(120, t + 0.18);
          gain.gain.setValueAtTime(0.6, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.18);
          break;
        }
        case "bow_shot": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(520, t);
          osc.frequency.exponentialRampToValueAtTime(210, t + 0.09);
          gain.gain.setValueAtTime(0.75, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.09);
          this._playNoise(t + 0.02, 0.11, 2400, 0.45);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.09);
          break;
        }
        case "gun_shot": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(1050, t);
          osc.frequency.exponentialRampToValueAtTime(140, t + 0.08);
          gain.gain.setValueAtTime(0.85, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
          this._playNoise(t, 0.05, 1600, 0.65);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.08);
          break;
        }
        case "shield_hit": {
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc1.type = "sine";
          osc1.frequency.setValueAtTime(920, t);
          osc1.frequency.exponentialRampToValueAtTime(540, t + 0.16);
          osc2.type = "triangle";
          osc2.frequency.setValueAtTime(1480, t);
          osc2.frequency.exponentialRampToValueAtTime(720, t + 0.16);
          gain.gain.setValueAtTime(0.85, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
          this._playNoise(t, 0.06, 800, 0.5);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.sfxGain);
          osc1.start(t);
          osc2.start(t);
          osc1.stop(t + 0.18);
          osc2.stop(t + 0.18);
          break;
        }
        case "thunder": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(240, t);
          osc.frequency.exponentialRampToValueAtTime(32, t + 0.35);
          gain.gain.setValueAtTime(0.95, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
          this._playNoise(t, 0.28, 900, 0.75);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.35);
          break;
        }
        case "sword_slash": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(820, t);
          osc.frequency.exponentialRampToValueAtTime(320, t + 0.1);
          gain.gain.setValueAtTime(0.7, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
          this._playNoise(t, 0.12, 2800, 0.55);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.1);
          break;
        }
        case "web_thwip": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(960, t);
          osc.frequency.exponentialRampToValueAtTime(360, t + 0.06);
          gain.gain.setValueAtTime(0.7, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.07);
          this._playNoise(t, 0.05, 3200, 0.5);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.07);
          break;
        }
        case "ki_blast": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(260, t);
          osc.frequency.linearRampToValueAtTime(740, t + 0.06);
          osc.frequency.exponentialRampToValueAtTime(90, t + 0.22);
          gain.gain.setValueAtTime(0.85, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);
          this._playNoise(t, 0.15, 1100, 0.6);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.22);
          break;
        }
        case "anti_air":
        case "dp": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(160, t);
          osc.frequency.exponentialRampToValueAtTime(650, t + 0.22);
          gain.gain.setValueAtTime(0.7, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);
          this._playNoise(t, 0.2, 1400, 0.5);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.22);
          break;
        }
        case "slide": {
          this._playNoise(t, 0.22, 600, 0.6);
          break;
        }
        case "teleport": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(300, t);
          osc.frequency.exponentialRampToValueAtTime(1200, t + 0.1);
          osc.frequency.exponentialRampToValueAtTime(200, t + 0.2);
          gain.gain.setValueAtTime(0.6, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.2);
          break;
        }
        case "parry_trigger": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(1400, t);
          osc.frequency.exponentialRampToValueAtTime(2200, t + 0.08);
          gain.gain.setValueAtTime(0.8, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.2);
          break;
        }
        case "slam": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(150, t);
          osc.frequency.exponentialRampToValueAtTime(25, t + 0.35);
          gain.gain.setValueAtTime(1, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
          this._playNoise(t, 0.25, 400, 0.8);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.35);
          break;
        }
        case "beam": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(240, t);
          osc.frequency.linearRampToValueAtTime(320, t + 0.4);
          osc.frequency.exponentialRampToValueAtTime(60, t + 0.7);
          gain.gain.setValueAtTime(0.9, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.7);
          this._playNoise(t, 0.6, 2e3, 0.7);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.7);
          break;
        }
        case "knockdown": {
          this._playNoise(t, 0.15, 300, 0.7);
          break;
        }
        case "counter": {
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc1.type = "triangle";
          osc1.frequency.setValueAtTime(1750, t);
          osc1.frequency.exponentialRampToValueAtTime(520, t + 0.18);
          osc2.type = "sawtooth";
          osc2.frequency.setValueAtTime(880, t);
          osc2.frequency.exponentialRampToValueAtTime(120, t + 0.22);
          gain.gain.setValueAtTime(0.95, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.22);
          this._playNoise(t, 0.12, 1600, 0.8);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.sfxGain);
          osc1.start(t);
          osc2.start(t);
          osc1.stop(t + 0.22);
          osc2.stop(t + 0.22);
          break;
        }
        case "whiff_punch": {
          this._playNoise(t, 0.05, 1400, 0.25);
          break;
        }
        case "whiff_kick": {
          this._playNoise(t, 0.08, 600, 0.35);
          break;
        }
        case "sweep": {
          this._playNoise(t, 0.14, 500, 0.55);
          break;
        }
        case "missile_launch": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(400, t);
          osc.frequency.exponentialRampToValueAtTime(1600, t + 0.18);
          gain.gain.setValueAtTime(0.5, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
          this._playNoise(t, 0.12, 1200, 0.35);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.18);
          break;
        }
        case "laser_bounce": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(1400, t);
          osc.frequency.exponentialRampToValueAtTime(800, t + 0.08);
          gain.gain.setValueAtTime(0.6, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.08);
          break;
        }
        case "orbital_beam": {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(120, t);
          osc.frequency.exponentialRampToValueAtTime(30, t + 0.6);
          gain.gain.setValueAtTime(1, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
          this._playNoise(t, 0.5, 600, 0.85);
          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(t);
          osc.stop(t + 0.6);
          break;
        }
        case "bomb_drop": {
          this._playNoise(t, 0.3, 350, 0.8);
          break;
        }
        case "super": {
          const freqs = [130.81, 196, 261.63, 392, 523.25];
          freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(freq * 0.7, t);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.35);
            gain.gain.setValueAtTime(0.35, t);
            gain.gain.exponentialRampToValueAtTime(1e-3, t + 0.9);
            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start(t + idx * 0.04);
            osc.stop(t + 0.9);
          });
          this._playNoise(t, 0.45, 1200, 0.6);
          break;
        }
        case "ko": {
          const chords = [220, 277.18, 329.63, 440];
          chords.forEach((freq) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.4, t);
            gain.gain.exponentialRampToValueAtTime(1e-3, t + 1.2);
            osc.connect(gain);
            gain.connect(this.sfxGain);
            osc.start(t);
            osc.stop(t + 1.2);
          });
          break;
        }
      }
    }
    // ─── 介面音效 ───
    playUI(type = "click") {
      if (this.isMuted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      if (type === "hover") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(480, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(1e-3, t + 0.04);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.04);
      } else if (type === "click") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(400, t + 0.06);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(1e-3, t + 0.06);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.06);
      } else if (type === "equip") {
        const notes = [523.25, 783.99];
        notes.forEach((f, idx) => {
          const o = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          o.type = "sine";
          o.frequency.setValueAtTime(f, t + idx * 0.07);
          g.gain.setValueAtTime(0.25, t + idx * 0.07);
          g.gain.exponentialRampToValueAtTime(1e-3, t + idx * 0.07 + 0.12);
          o.connect(g);
          g.connect(this.sfxGain);
          o.start(t + idx * 0.07);
          o.stop(t + idx * 0.07 + 0.12);
        });
      } else if (type === "countdown") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, t);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.1);
      } else if (type === "fight") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(920, t);
        osc.frequency.exponentialRampToValueAtTime(1400, t + 0.25);
        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.25);
      }
    }
    // 噪聲發生器輔助
    _playNoise(t, duration, cutoff = 1e3, volume = 0.5) {
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(cutoff, t);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(volume, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + duration);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      noise.start(t);
      noise.stop(t + duration);
    }
    // ─── 賽博龐克合成背景旋律 (Procedural Cyberpunk Synth BGM) ───
    startBgm() {
      if (this.bgmPlaying) return;
      this.ensureContext();
      if (!this.ctx) return;
      this.bgmPlaying = true;
      const bassScale = [65.41, 73.42, 82.41, 98, 110, 130.81];
      const leadScale = [261.63, 293.66, 329.63, 392, 440, 523.25];
      const tempo = 128;
      const stepInterval = 60 / tempo / 2 * 1e3;
      this.bgmTimer = setInterval(() => {
        if (!this.bgmPlaying || this.isMuted) return;
        const t = this.ctx.currentTime;
        this.stepIndex++;
        if (this.stepIndex % 2 === 0) {
          const bassFreq = bassScale[(Math.floor(this.stepIndex / 4) + this.stepIndex % 4) % bassScale.length];
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(bassFreq, t);
          const filter = this.ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(320, t);
          filter.frequency.exponentialRampToValueAtTime(100, t + 0.15);
          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(1e-3, t + 0.15);
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.bgmGain);
          osc.start(t);
          osc.stop(t + 0.15);
        }
        if (this.stepIndex % 2 === 1) {
          this._playNoise(t, 0.03, 5e3, 0.05);
        }
        if (this.stepIndex % 8 === 4 || this.stepIndex % 8 === 7) {
          const leadFreq = leadScale[this.stepIndex * 3 % leadScale.length];
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(leadFreq, t);
          gain.gain.setValueAtTime(0.1, t);
          gain.gain.exponentialRampToValueAtTime(1e-3, t + 0.18);
          osc.connect(gain);
          gain.connect(this.bgmGain);
          osc.start(t);
          osc.stop(t + 0.18);
        }
      }, stepInterval);
    }
    stopBgm() {
      this.bgmPlaying = false;
      if (this.bgmTimer) {
        clearInterval(this.bgmTimer);
        this.bgmTimer = null;
      }
    }
  };
  var soundEngine = new SoundEngine();

  // js/engine/special_skins_renderer.js
  var SpecialSkinsRenderer = class {
    constructor() {
      this.specialSkinIds = /* @__PURE__ */ new Set([
        "skin_iron_man",
        "skin_spiderman",
        "skin_captain_america",
        "skin_thor",
        "skin_thanos",
        "skin_hawkeye",
        "skin_goku_ssj",
        "skin_vegeta_ssj",
        "skin_trunks_future",
        "skin_piccolo",
        "skin_golden_frieza"
      ]);
    }
    isSpecial(skin) {
      return skin && skin.id && this.specialSkinIds.has(skin.id);
    }
    // ─── 輔助繪圖工具 ───
    _drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, fillStyle, strokeStyle = null, lineWidth = 1) {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
      if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      ctx.restore();
    }
    _drawSpiderWebOnHead(ctx, cx, cy, radius, color = "rgba(0, 0, 0, 0.75)") {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.9;
      const angles = [
        -Math.PI * 0.9,
        -Math.PI * 0.7,
        -Math.PI * 0.5,
        -Math.PI * 0.3,
        -Math.PI * 0.1,
        Math.PI * 0.1,
        Math.PI * 0.3,
        Math.PI * 0.5,
        Math.PI * 0.7,
        Math.PI * 0.9
      ];
      for (const ang of angles) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius);
        ctx.stroke();
      }
      for (const r of [radius * 0.45, radius * 0.85]) {
        ctx.beginPath();
        for (let i = 0; i < angles.length; i++) {
          const ang = angles[i];
          const px = cx + Math.cos(ang) * r;
          const py = cy + Math.sin(ang) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();
    }
    // ─── 1. 特殊氣場與光環 (Special Aura) ───
    drawAura(ctx, char, skin, t) {
      if (!this.isSpecial(skin)) return;
      const id = skin.id;
      ctx.save();
      if (id === "skin_goku_ssj" || id === "skin_vegeta_ssj") {
        const isVegeta = id === "skin_vegeta_ssj";
        const mainGold = isVegeta ? "#facc15" : "#fde047";
        const glowGold = isVegeta ? "rgba(250, 204, 21, 0.45)" : "rgba(254, 240, 138, 0.5)";
        ctx.shadowColor = mainGold;
        ctx.shadowBlur = 24;
        for (let f = 0; f < 3; f++) {
          const wave = Math.sin(t * 0.2 + f * 1.8) * 6;
          ctx.fillStyle = glowGold;
          ctx.beginPath();
          ctx.moveTo(-26 - wave, 4);
          ctx.quadraticCurveTo(-38 + wave, -45, -18 - wave, -88);
          ctx.quadraticCurveTo(0, -112 - Math.sin(t * 0.3) * 8, 18 + wave, -88);
          ctx.quadraticCurveTo(38 - wave, -45, 26 + wave, 4);
          ctx.closePath();
          ctx.fill();
        }
        for (let i = 0; i < 7; i++) {
          const pSpeed = (t * 2.2 + i * 16) % 110;
          const px = Math.sin(t * 0.15 + i * 2) * (20 - pSpeed * 0.12);
          const py = 4 - pSpeed;
          const alpha = Math.max(0, 1 - pSpeed / 100);
          ctx.fillStyle = isVegeta && i % 3 === 0 ? "#60a5fa" : "#ffffff";
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(px, py - 3);
          ctx.lineTo(px + 2, py);
          ctx.lineTo(px, py + 3);
          ctx.lineTo(px - 2, py);
          ctx.closePath();
          ctx.fill();
        }
        if (isVegeta) {
          ctx.strokeStyle = "#60a5fa";
          ctx.lineWidth = 1.5;
          for (let s = 0; s < 3; s++) {
            const sparkPhase = (t * 0.1 + s * 2.1) % (Math.PI * 2);
            if (Math.sin(sparkPhase) > 0.4) {
              const sx = Math.sin(sparkPhase * 3) * 22;
              const sy = -30 - Math.cos(sparkPhase * 2) * 35;
              ctx.beginPath();
              ctx.moveTo(sx, sy);
              ctx.lineTo(sx + 5, sy - 6);
              ctx.lineTo(sx + 2, sy - 12);
              ctx.stroke();
            }
          }
        }
      } else if (id === "skin_golden_frieza") {
        ctx.shadowColor = "#ffd700";
        ctx.shadowBlur = 26;
        const wave = Math.sin(t * 0.25) * 5;
        ctx.fillStyle = "rgba(255, 215, 0, 0.45)";
        ctx.beginPath();
        ctx.moveTo(-24 - wave, 4);
        ctx.quadraticCurveTo(-34, -40, -16, -85);
        ctx.quadraticCurveTo(0, -108, 16, -85);
        ctx.quadraticCurveTo(34, -40, 24 + wave, 4);
        ctx.closePath();
        ctx.fill();
        for (let i = 0; i < 5; i++) {
          const pSpeed = (t * 2.5 + i * 22) % 100;
          const px = Math.cos(t * 0.2 + i) * 24;
          const py = -pSpeed;
          ctx.fillStyle = "#c084fc";
          ctx.globalAlpha = Math.max(0, 1 - pSpeed / 90);
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (id === "skin_thor") {
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 18;
        ctx.strokeStyle = "#67e8f9";
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
          const arcT = (t * 0.3 + i * 2.3) % 4;
          if (arcT < 2.5) {
            const startX = -15 + i * 15;
            const startY = -70 + i * 20;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + 8, startY + 12);
            ctx.lineTo(startX - 4, startY + 22);
            ctx.lineTo(startX + 10, startY + 34);
            ctx.stroke();
          }
        }
      } else if (id === "skin_thanos") {
        const colors = ["#facc15", "#a855f7", "#3b82f6", "#ef4444", "#f97316", "#22c55e"];
        const activeIdx = Math.floor(t * 0.15) % colors.length;
        ctx.shadowColor = colors[activeIdx];
        ctx.shadowBlur = 16;
        ctx.strokeStyle = colors[activeIdx];
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.5 + Math.sin(t * 0.3) * 0.3;
        ctx.beginPath();
        ctx.arc(0, -45, 34 + Math.sin(t * 0.2) * 4, 0, Math.PI * 2);
        ctx.stroke();
      } else if (id === "skin_hawkeye") {
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 12;
        ctx.strokeStyle = "rgba(168, 85, 247, 0.45)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, -60, 22 + Math.sin(t * 0.1) * 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-8, -60);
        ctx.lineTo(-4, -60);
        ctx.moveTo(4, -60);
        ctx.lineTo(8, -60);
        ctx.moveTo(0, -68);
        ctx.lineTo(0, -64);
        ctx.moveTo(0, -56);
        ctx.lineTo(0, -52);
        ctx.stroke();
      }
      ctx.restore();
    }
    // ─── 2. 特殊頭部渲染 (Special Head) ───
    drawHead(ctx, head, skin) {
      if (!this.isSpecial(skin)) return false;
      const id = skin.id;
      const t = Date.now() / 250;
      switch (id) {
        // ══════════════════════════════════════════════════
        // 1. 鋼鐵人・馬克85 (Iron Man Mark 85)
        // ══════════════════════════════════════════════════
        case "skin_iron_man": {
          ctx.fillStyle = "#b91c1c";
          ctx.strokeStyle = "#7f1d1d";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-14, 8);
          ctx.quadraticCurveTo(-18, -4, -14, -14);
          ctx.quadraticCurveTo(-6, -19, 4, -19);
          ctx.lineTo(13, -12);
          ctx.lineTo(15, -2);
          ctx.lineTo(13, 8);
          ctx.lineTo(6, 16);
          ctx.lineTo(-6, 15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fbbf24";
          ctx.beginPath();
          ctx.moveTo(-8, -17);
          ctx.lineTo(4, -18);
          ctx.lineTo(10, -13);
          ctx.lineTo(4, -15);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#fbbf24";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(2, -14);
          ctx.lineTo(12, -12);
          ctx.lineTo(15, -3);
          ctx.lineTo(13, 7);
          ctx.lineTo(7, 15);
          ctx.lineTo(1, 15);
          ctx.lineTo(2, 6);
          ctx.lineTo(0, -3);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#7f1d1d";
          ctx.fillRect(4, 11, 5, 2.5);
          const eyePulse = Math.sin(t * 1.5) * 0.15 + 0.85;
          ctx.save();
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 10 * eyePulse;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.moveTo(5, -4);
          ctx.lineTo(13, -3);
          ctx.lineTo(12, -1);
          ctx.lineTo(6, -1.5);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(1, -4);
          ctx.lineTo(3.5, -3.5);
          ctx.lineTo(3.2, -1.8);
          ctx.lineTo(1, -2.2);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
          ctx.fillStyle = "#ca8a04";
          ctx.beginPath();
          ctx.arc(-8, 1, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#38bdf8";
          ctx.beginPath();
          ctx.arc(-8, 1, 1.8, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }
        // ══════════════════════════════════════════════════
        // 2. 蜘蛛人・經典紅藍 (Spider-Man Classic Suit)
        // ══════════════════════════════════════════════════
        case "skin_spiderman": {
          ctx.fillStyle = "#dc2626";
          ctx.strokeStyle = "#991b1b";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-13, 8);
          ctx.quadraticCurveTo(-16, -2, -13, -13);
          ctx.quadraticCurveTo(-5, -18, 4, -18);
          ctx.quadraticCurveTo(14, -14, 15, -2);
          ctx.quadraticCurveTo(14, 8, 7, 16);
          ctx.lineTo(-6, 15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          this._drawSpiderWebOnHead(ctx, 8, -2, 16, "rgba(15, 23, 42, 0.7)");
          ctx.fillStyle = "#000000";
          ctx.beginPath();
          ctx.moveTo(4, -8);
          ctx.lineTo(15, -4);
          ctx.quadraticCurveTo(16, 2, 13, 5);
          ctx.lineTo(5, 1);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.moveTo(6, -6);
          ctx.lineTo(13.5, -3);
          ctx.quadraticCurveTo(14.5, 1.5, 12, 3.5);
          ctx.lineTo(6.5, 0);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#000000";
          ctx.beginPath();
          ctx.moveTo(0, -7);
          ctx.lineTo(3.5, -5.5);
          ctx.lineTo(3, 0);
          ctx.lineTo(0.5, -1);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.moveTo(1, -5.5);
          ctx.lineTo(3, -4.5);
          ctx.lineTo(2.5, -0.8);
          ctx.lineTo(1.2, -1.5);
          ctx.closePath();
          ctx.fill();
          return true;
        }
        // ══════════════════════════════════════════════════
        // 3. 美國隊長・羅傑斯 (Captain America Steve Rogers)
        // ══════════════════════════════════════════════════
        case "skin_captain_america": {
          ctx.fillStyle = "#1e3a8a";
          ctx.strokeStyle = "#172554";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-13, 8);
          ctx.quadraticCurveTo(-17, -2, -14, -13);
          ctx.quadraticCurveTo(-6, -19, 4, -19);
          ctx.lineTo(13, -12);
          ctx.lineTo(15, -4);
          ctx.lineTo(6, -1);
          ctx.lineTo(3, 8);
          ctx.lineTo(-10, 10);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.save();
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 9px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("A", 8, -10);
          ctx.restore();
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.beginPath();
          ctx.moveTo(-7, -8);
          ctx.lineTo(-2, -10);
          ctx.lineTo(-4, -6);
          ctx.lineTo(0, -7);
          ctx.lineTo(-5, -4);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#fed7aa";
          ctx.beginPath();
          ctx.moveTo(6, -1);
          ctx.lineTo(15, -1);
          ctx.lineTo(13, 7);
          ctx.lineTo(6, 15);
          ctx.lineTo(2, 14);
          ctx.lineTo(3, 8);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#78350f";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(-3, 8);
          ctx.lineTo(4, 15);
          ctx.stroke();
          ctx.fillStyle = "#0284c7";
          ctx.fillRect(8, -3, 3, 2);
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(7, -5, 5, 1.2);
          return true;
        }
        // ══════════════════════════════════════════════════
        // 4. 雷神索爾・奧丁之子 (Thor Odinson)
        // ══════════════════════════════════════════════════
        case "skin_thor": {
          ctx.fillStyle = "#facc15";
          ctx.strokeStyle = "#ca8a04";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-10, -12);
          ctx.quadraticCurveTo(-22, -2, -19, 16);
          ctx.lineTo(-14, 18);
          ctx.lineTo(-10, 8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#e2e8f0";
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-12, 6);
          ctx.quadraticCurveTo(-16, -4, -12, -14);
          ctx.quadraticCurveTo(-4, -19, 4, -19);
          ctx.lineTo(13, -12);
          ctx.lineTo(14, -3);
          ctx.lineTo(4, 0);
          ctx.lineTo(-4, 7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#f8fafc";
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-6, -12);
          ctx.lineTo(-16, -26);
          ctx.lineTo(-10, -20);
          ctx.lineTo(-18, -20);
          ctx.lineTo(-8, -14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fed7aa";
          ctx.beginPath();
          ctx.moveTo(4, 0);
          ctx.lineTo(14, -1);
          ctx.lineTo(13, 8);
          ctx.lineTo(6, 16);
          ctx.lineTo(0, 15);
          ctx.lineTo(-2, 7);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#eab308";
          ctx.fillRect(4, 13, 4, 2.5);
          ctx.save();
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 12;
          ctx.fillStyle = "#38bdf8";
          ctx.beginPath();
          ctx.arc(8, -2, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(8, -2, 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          return true;
        }
        // ══════════════════════════════════════════════════
        // 5. 薩諾斯・無限手套 (Thanos Titan Warlord)
        // ══════════════════════════════════════════════════
        case "skin_thanos": {
          ctx.fillStyle = "#8b5cf6";
          ctx.strokeStyle = "#6d28d9";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-14, 8);
          ctx.quadraticCurveTo(-18, -4, -14, -15);
          ctx.quadraticCurveTo(-6, -20, 5, -20);
          ctx.lineTo(14, -12);
          ctx.lineTo(16, 2);
          ctx.lineTo(14, 12);
          ctx.lineTo(6, 18);
          ctx.lineTo(-6, 17);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#f59e0b";
          ctx.strokeStyle = "#b45309";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-12, -4);
          ctx.lineTo(-14, -16);
          ctx.lineTo(5, -21);
          ctx.lineTo(13, -14);
          ctx.lineTo(11, -5);
          ctx.lineTo(5, -12);
          ctx.lineTo(-5, -6);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#d97706";
          ctx.fillRect(-2, -21, 5, 8);
          ctx.strokeStyle = "#581c87";
          ctx.lineWidth = 1.5;
          for (let i = 0; i < 4; i++) {
            const rx = 3 + i * 2.8;
            ctx.beginPath();
            ctx.moveTo(rx, 11);
            ctx.lineTo(rx, 17);
            ctx.stroke();
          }
          ctx.fillStyle = "#fef08a";
          ctx.fillRect(8, -4, 3.5, 2);
          ctx.fillStyle = "#4c1d95";
          ctx.fillRect(6, -6, 7, 1.5);
          return true;
        }
        // ══════════════════════════════════════════════════
        // 5.5 鷹眼・克林特巴頓 (Hawkeye Clint Barton)
        // ══════════════════════════════════════════════════
        case "skin_hawkeye": {
          ctx.fillStyle = "#27272a";
          ctx.strokeStyle = "#18181b";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(-12, 4);
          ctx.lineTo(-14, -14);
          ctx.lineTo(2, -18);
          ctx.lineTo(12, -14);
          ctx.lineTo(14, -6);
          ctx.lineTo(6, -16);
          ctx.lineTo(-4, -15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fed7aa";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(2, -14);
          ctx.lineTo(13, -10);
          ctx.lineTo(14, 0);
          ctx.lineTo(12, 9);
          ctx.lineTo(6, 16);
          ctx.lineTo(-2, 15);
          ctx.lineTo(-8, 6);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#581c87";
          ctx.strokeStyle = "#3b0764";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-6, -4);
          ctx.lineTo(14, -4);
          ctx.lineTo(13, 3);
          ctx.lineTo(-4, 3);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#c084fc";
          ctx.beginPath();
          ctx.moveTo(4, -12);
          ctx.lineTo(8, -7);
          ctx.lineTo(5, -7);
          ctx.lineTo(2, -10);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#facc15";
          ctx.fillRect(7, -2, 4, 2);
          ctx.fillStyle = "#581c87";
          ctx.fillRect(9, -2, 2, 2);
          return true;
        }
        // ══════════════════════════════════════════════════
        // 6. 孫悟空・超級賽亞人 (Son Goku SSJ)
        // ══════════════════════════════════════════════════
        case "skin_goku_ssj": {
          ctx.fillStyle = "#facc15";
          ctx.strokeStyle = "#ca8a04";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-4, -18);
          ctx.lineTo(-14, -38);
          ctx.lineTo(-5, -23);
          ctx.lineTo(-24, -32);
          ctx.lineTo(-14, -16);
          ctx.lineTo(-26, -18);
          ctx.lineTo(-14, -5);
          ctx.lineTo(2, -20);
          ctx.lineTo(8, -36);
          ctx.lineTo(12, -18);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fef08a";
          ctx.beginPath();
          ctx.moveTo(-2, -18);
          ctx.lineTo(-10, -32);
          ctx.lineTo(-4, -22);
          ctx.lineTo(6, -30);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#fed7aa";
          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(2, -14);
          ctx.lineTo(14, -10);
          ctx.lineTo(15, -1);
          ctx.lineTo(12, 8);
          ctx.lineTo(6, 16);
          ctx.lineTo(-3, 15);
          ctx.lineTo(-10, 6);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#facc15";
          ctx.strokeStyle = "#ca8a04";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(11, -14);
          ctx.lineTo(15, -4);
          ctx.lineTo(10, -7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(7, -13);
          ctx.lineTo(9, -2);
          ctx.lineTo(5, -6);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#0f172a";
          ctx.beginPath();
          ctx.moveTo(6, -5);
          ctx.lineTo(13, -3);
          ctx.lineTo(12, 1);
          ctx.lineTo(7, 0);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#2dd4bf";
          ctx.fillRect(8, -3.5, 3.5, 3);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(9, -3, 1.2, 1.2);
          ctx.fillStyle = "#facc15";
          ctx.beginPath();
          ctx.moveTo(5, -6);
          ctx.lineTo(14, -4);
          ctx.lineTo(13, -2.5);
          ctx.lineTo(5, -4.5);
          ctx.closePath();
          ctx.fill();
          return true;
        }
        // ══════════════════════════════════════════════════
        // 7. 貝吉塔・賽亞人王子 (Vegeta SSJ)
        // ══════════════════════════════════════════════════
        case "skin_vegeta_ssj": {
          ctx.fillStyle = "#facc15";
          ctx.strokeStyle = "#ca8a04";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(5, -12);
          ctx.lineTo(11, -44);
          ctx.lineTo(3, -28);
          ctx.lineTo(-2, -46);
          ctx.lineTo(-7, -26);
          ctx.lineTo(-14, -40);
          ctx.lineTo(-13, -18);
          ctx.lineTo(-22, -26);
          ctx.lineTo(-12, -4);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fef08a";
          ctx.beginPath();
          ctx.moveTo(3, -14);
          ctx.lineTo(8, -38);
          ctx.lineTo(1, -26);
          ctx.lineTo(-2, -38);
          ctx.lineTo(-5, -24);
          ctx.lineTo(-9, -32);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#fed7aa";
          ctx.strokeStyle = "#ca8a04";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(8, -12);
          ctx.lineTo(5, -7);
          ctx.lineTo(0, -12);
          ctx.lineTo(-6, -11);
          ctx.lineTo(-10, 4);
          ctx.lineTo(-3, 15);
          ctx.lineTo(5, 16);
          ctx.lineTo(13, 7);
          ctx.lineTo(14, -2);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#0f172a";
          ctx.beginPath();
          ctx.moveTo(5, -4);
          ctx.lineTo(13, -1);
          ctx.lineTo(11, 3);
          ctx.lineTo(5, 1);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#2dd4bf";
          ctx.fillRect(7, -2.5, 3.8, 3.5);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(8, -2, 1.2, 1.2);
          ctx.fillStyle = "#facc15";
          ctx.fillRect(4, -5.5, 9, 2);
          return true;
        }
        // ══════════════════════════════════════════════════
        // 8. 未來特南克斯 (Future Trunks)
        // ══════════════════════════════════════════════════
        case "skin_trunks_future": {
          ctx.fillStyle = "#c084fc";
          ctx.strokeStyle = "#9333ea";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(2, -18);
          ctx.quadraticCurveTo(12, -14, 15, -2);
          ctx.lineTo(14, 5);
          ctx.lineTo(11, 0);
          ctx.lineTo(7, -10);
          ctx.lineTo(2, -18);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(2, -18);
          ctx.quadraticCurveTo(-10, -18, -16, -10);
          ctx.quadraticCurveTo(-20, 2, -16, 12);
          ctx.lineTo(-11, 8);
          ctx.lineTo(-10, -6);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fed7aa";
          ctx.beginPath();
          ctx.moveTo(2, -11);
          ctx.lineTo(11, -7);
          ctx.lineTo(13, 3);
          ctx.lineTo(7, 15);
          ctx.lineTo(-2, 14);
          ctx.lineTo(-8, 5);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(6, -2, 4, 2.5);
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(5, -4, 6, 1.5);
          return true;
        }
        // ══════════════════════════════════════════════════
        // 9. 比克大魔王 (Piccolo)
        // ══════════════════════════════════════════════════
        case "skin_piccolo": {
          ctx.fillStyle = "#f8fafc";
          ctx.strokeStyle = "#cbd5e1";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(-14, 2);
          ctx.quadraticCurveTo(-18, -10, -10, -18);
          ctx.quadraticCurveTo(2, -22, 12, -15);
          ctx.lineTo(14, -6);
          ctx.lineTo(3, -6);
          ctx.lineTo(-6, 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#581c87";
          ctx.fillRect(-1, -19, 5, 8);
          ctx.fillStyle = "#22c55e";
          ctx.strokeStyle = "#15803d";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(-4, 0);
          ctx.lineTo(12, -5);
          ctx.lineTo(14, 5);
          ctx.lineTo(7, 16);
          ctx.lineTo(-2, 15);
          ctx.lineTo(-8, 8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-10, 2);
          ctx.lineTo(-20, -3);
          ctx.lineTo(-9, 8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#15803d";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(8, -7);
          ctx.quadraticCurveTo(12, -14, 15, -17);
          ctx.stroke();
          ctx.fillStyle = "#16a34a";
          ctx.beginPath();
          ctx.arc(15, -17, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(4, -8);
          ctx.quadraticCurveTo(8, -16, 10, -19);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(10, -19, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#fef08a";
          ctx.fillRect(7, 0, 4, 2.5);
          ctx.fillStyle = "#000000";
          ctx.fillRect(8.5, 0.5, 1.5, 1.5);
          return true;
        }
        // ══════════════════════════════════════════════════
        // 10. 黃金弗利沙 (Golden Frieza)
        // ══════════════════════════════════════════════════
        case "skin_golden_frieza": {
          ctx.fillStyle = "#ffd700";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-13, 6);
          ctx.quadraticCurveTo(-17, -6, -12, -15);
          ctx.quadraticCurveTo(0, -20, 11, -15);
          ctx.lineTo(15, -3);
          ctx.lineTo(13, 8);
          ctx.lineTo(6, 16);
          ctx.lineTo(-4, 15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.save();
          ctx.shadowColor = "#a855f7";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "#9333ea";
          ctx.beginPath();
          ctx.ellipse(-1, -14, 7, 4.5, -0.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-2, -15, 1.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          ctx.fillStyle = "#7c3aed";
          ctx.beginPath();
          ctx.moveTo(9, 2);
          ctx.lineTo(11, 9);
          ctx.lineTo(7, 8);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#000000";
          ctx.beginPath();
          ctx.moveTo(5, -4);
          ctx.lineTo(14, -2);
          ctx.lineTo(12, 2);
          ctx.lineTo(6, 1);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(8, -2.5, 3.5, 3);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(9, -2, 1, 1);
          return true;
        }
        default:
          return false;
      }
    }
    // ─── 3. 特殊軀幹渲染 (Special Torso) ───
    drawTorso(ctx, torso, skin, t) {
      if (!this.isSpecial(skin)) return false;
      const id = skin.id;
      ctx.save();
      ctx.translate(torso.x, torso.y);
      ctx.rotate(torso.angle);
      switch (id) {
        // ══════════════════════════════════════════════════
        // 1. 鋼鐵人・馬克85 (Iron Man Mark 85)
        // ══════════════════════════════════════════════════
        case "skin_iron_man": {
          ctx.fillStyle = "#b91c1c";
          ctx.strokeStyle = "#7f1d1d";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fbbf24";
          ctx.beginPath();
          ctx.moveTo(-14, -21);
          ctx.lineTo(-6, -21);
          ctx.lineTo(-9, -13);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(14, -21);
          ctx.lineTo(6, -21);
          ctx.lineTo(9, -13);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#d97706";
          ctx.fillRect(-7, 4, 14, 3);
          ctx.fillRect(-6, 9, 12, 3);
          ctx.fillStyle = "#7f1d1d";
          ctx.fillRect(-11, 16, 22, 12);
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(-4, 18, 8, 8);
          const pulse = 1 + Math.sin(t * 0.2) * 0.18;
          ctx.save();
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 15 * pulse;
          ctx.fillStyle = "#e2e8f0";
          ctx.beginPath();
          ctx.moveTo(-6, -11);
          ctx.lineTo(6, -11);
          ctx.lineTo(4, -2);
          ctx.lineTo(-4, -2);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#38bdf8";
          ctx.beginPath();
          ctx.arc(0, -6.5, 4.5 * pulse, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(0, -6.5, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          break;
        }
        // ══════════════════════════════════════════════════
        // 2. 蜘蛛人・經典紅藍 (Spider-Man Classic Suit)
        // ══════════════════════════════════════════════════
        case "skin_spiderman": {
          ctx.fillStyle = "#2563eb";
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#dc2626";
          ctx.strokeStyle = "#991b1b";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-9, -23);
          ctx.lineTo(9, -23);
          ctx.lineTo(7, 16);
          ctx.lineTo(-7, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#0f172a";
          ctx.beginPath();
          ctx.ellipse(0, -7, 2.5, 4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(0, -9);
          ctx.lineTo(7, -15);
          ctx.lineTo(10, -10);
          ctx.moveTo(0, -9);
          ctx.lineTo(-7, -15);
          ctx.lineTo(-10, -10);
          ctx.moveTo(0, -8);
          ctx.lineTo(8, -12);
          ctx.lineTo(11, -8);
          ctx.moveTo(0, -8);
          ctx.lineTo(-8, -12);
          ctx.lineTo(-11, -8);
          ctx.moveTo(0, -5);
          ctx.lineTo(6, -2);
          ctx.lineTo(8, 5);
          ctx.moveTo(0, -5);
          ctx.lineTo(-6, -2);
          ctx.lineTo(-8, 5);
          ctx.moveTo(0, -6);
          ctx.lineTo(5, 0);
          ctx.lineTo(6, 7);
          ctx.moveTo(0, -6);
          ctx.lineTo(-5, 0);
          ctx.lineTo(-6, 7);
          ctx.stroke();
          ctx.fillStyle = "#dc2626";
          ctx.fillRect(-11, 16, 22, 10);
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 0.8;
          ctx.strokeRect(-11, 16, 22, 10);
          ctx.fillStyle = "#1d4ed8";
          ctx.fillRect(-11, 22, 22, 6);
          break;
        }
        // ══════════════════════════════════════════════════
        // 3. 美國隊長・羅傑斯 (Captain America Steve Rogers)
        // ══════════════════════════════════════════════════
        case "skin_captain_america": {
          ctx.fillStyle = "#1e3a8a";
          ctx.strokeStyle = "#172554";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          this._drawStar(ctx, 0, -10, 5, 7.5, 3.2, "#ffffff", "#cbd5e1", 0.8);
          const numStripes = 5;
          const stripeW = 3.6;
          const startX = -(numStripes * stripeW / 2);
          for (let i = 0; i < numStripes; i++) {
            ctx.fillStyle = i % 2 === 0 ? "#dc2626" : "#ffffff";
            ctx.fillRect(startX + i * stripeW, -1, stripeW, 17);
          }
          ctx.fillStyle = "#78350f";
          ctx.fillRect(-12, 16, 24, 10);
          ctx.fillStyle = "#e2e8f0";
          ctx.fillRect(-3, 18, 6, 6);
          ctx.fillStyle = "#451a03";
          ctx.fillRect(-10, 18, 4, 6);
          ctx.fillRect(6, 18, 4, 6);
          const shieldX = -13;
          const shieldY = -6;
          ctx.fillStyle = "#dc2626";
          ctx.beginPath();
          ctx.arc(shieldX, shieldY, 13, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#f8fafc";
          ctx.beginPath();
          ctx.arc(shieldX, shieldY, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#dc2626";
          ctx.beginPath();
          ctx.arc(shieldX, shieldY, 7.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#1e3a8a";
          ctx.beginPath();
          ctx.arc(shieldX, shieldY, 4.5, 0, Math.PI * 2);
          ctx.fill();
          this._drawStar(ctx, shieldX, shieldY, 5, 3.8, 1.6, "#ffffff");
          break;
        }
        // ══════════════════════════════════════════════════
        // 4. 雷神索爾・奧丁之子 (Thor Odinson)
        // ══════════════════════════════════════════════════
        case "skin_thor": {
          ctx.fillStyle = "#b91c1c";
          ctx.strokeStyle = "#7f1d1d";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-14, -20);
          ctx.quadraticCurveTo(-24, 0, -22, 28);
          ctx.lineTo(-12, 28);
          ctx.quadraticCurveTo(-14, 5, -8, -18);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#1e293b";
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          const discs = [
            { x: -7, y: -13, r: 4 },
            { x: 7, y: -13, r: 4 },
            { x: -8, y: -4, r: 4.5 },
            { x: 8, y: -4, r: 4.5 },
            { x: -6, y: 6, r: 3.8 },
            { x: 6, y: 6, r: 3.8 }
          ];
          for (const d of discs) {
            ctx.fillStyle = "#e2e8f0";
            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(d.x - 1, d.y - 1, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = "#f59e0b";
          ctx.fillRect(-11, 16, 22, 10);
          ctx.fillStyle = "#b45309";
          ctx.fillRect(-3, 17, 6, 8);
          break;
        }
        // ══════════════════════════════════════════════════
        // 5. 薩諾斯・無限手套 (Thanos Titan Warlord)
        // ══════════════════════════════════════════════════
        case "skin_thanos": {
          ctx.fillStyle = "#d97706";
          ctx.strokeStyle = "#92400e";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(-17, -23);
          ctx.lineTo(17, -23);
          ctx.lineTo(13, 16);
          ctx.lineTo(-13, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#1e3a8a";
          ctx.beginPath();
          ctx.moveTo(-12, -18);
          ctx.lineTo(12, -18);
          ctx.lineTo(8, -1);
          ctx.lineTo(-8, -1);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#f59e0b";
          ctx.fillRect(-7, 3, 14, 3.5);
          ctx.fillRect(-6, 9, 12, 3.5);
          ctx.fillStyle = "#b45309";
          ctx.fillRect(-12, 16, 24, 12);
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(-4, 17, 8, 9);
          break;
        }
        // ══════════════════════════════════════════════════
        // 5.5 鷹眼・克林特巴頓 (Hawkeye Clint Barton)
        // ══════════════════════════════════════════════════
        case "skin_hawkeye": {
          ctx.fillStyle = "#18181b";
          ctx.strokeStyle = "#27272a";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#7e22ce";
          ctx.strokeStyle = "#a855f7";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(-10, -22);
          ctx.lineTo(10, -22);
          ctx.lineTo(0, -6);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#9333ea";
          ctx.beginPath();
          ctx.moveTo(-7, -22);
          ctx.lineTo(7, -22);
          ctx.lineTo(0, -10);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#581c87";
          ctx.beginPath();
          ctx.moveTo(-14, -20);
          ctx.lineTo(12, 14);
          ctx.lineTo(8, 16);
          ctx.lineTo(-16, -17);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#27272a";
          ctx.strokeStyle = "#581c87";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(-18, -26, 8, 28, 2);
          ctx.fill();
          ctx.stroke();
          const arrowColors = ["#a855f7", "#c084fc", "#38bdf8", "#ef4444"];
          for (let i = 0; i < 4; i++) {
            const ax = -17 + i * 2;
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ax, -26);
            ctx.lineTo(ax - 2, -34);
            ctx.stroke();
            ctx.fillStyle = arrowColors[i];
            ctx.fillRect(ax - 3.5, -34, 3, 4);
          }
          ctx.fillStyle = "#27272a";
          ctx.fillRect(-12, 16, 24, 10);
          ctx.fillStyle = "#9333ea";
          ctx.fillRect(-3, 18, 6, 6);
          ctx.fillStyle = "#18181b";
          ctx.fillRect(-10, 18, 4, 6);
          ctx.fillRect(6, 18, 4, 6);
          break;
        }
        // ══════════════════════════════════════════════════
        // 6. 孫悟空・超級賽亞人 (Son Goku SSJ)
        // ══════════════════════════════════════════════════
        case "skin_goku_ssj": {
          ctx.fillStyle = "#f97316";
          ctx.strokeStyle = "#c2410c";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#1e40af";
          ctx.beginPath();
          ctx.moveTo(-8, -23);
          ctx.lineTo(8, -23);
          ctx.lineTo(0, -9);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#fed7aa";
          ctx.beginPath();
          ctx.moveTo(-4, -23);
          ctx.lineTo(4, -23);
          ctx.lineTo(0, -15);
          ctx.closePath();
          ctx.fill();
          const badgeX = 5;
          const badgeY = -5;
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(badgeX, badgeY, 5.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#000000";
          ctx.fillRect(badgeX - 3, badgeY - 3, 2, 6);
          ctx.fillRect(badgeX, badgeY - 3.5, 3.5, 1.2);
          ctx.fillRect(badgeX + 1, badgeY - 2.5, 1.2, 3);
          ctx.fillRect(badgeX - 1, badgeY + 1.5, 4.5, 1.2);
          ctx.strokeRect(badgeX - 0.5, badgeY + 1.5, 3.5, 2.5);
          ctx.fillStyle = "#1e40af";
          ctx.fillRect(-11, 15, 22, 9);
          ctx.beginPath();
          ctx.moveTo(-9, 19);
          ctx.lineTo(-14, 28);
          ctx.lineTo(-10, 29);
          ctx.lineTo(-6, 20);
          ctx.closePath();
          ctx.fill();
          break;
        }
        // ══════════════════════════════════════════════════
        // 7. 貝吉塔・賽亞人王子 (Vegeta SSJ)
        // ══════════════════════════════════════════════════
        case "skin_vegeta_ssj": {
          ctx.fillStyle = "#1e3a8a";
          ctx.fillRect(-12, 16, 24, 12);
          ctx.fillStyle = "#f8fafc";
          ctx.strokeStyle = "#cbd5e1";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fbbf24";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 1.2;
          ctx.fillRect(-15, -23, 7, 10);
          ctx.fillRect(8, -23, 7, 10);
          for (let i = 0; i < 3; i++) {
            const sy = -1 + i * 5.5;
            ctx.fillStyle = "#fbbf24";
            ctx.fillRect(-6, sy, 12, 4.2);
            ctx.strokeStyle = "#d97706";
            ctx.strokeRect(-6, sy, 12, 4.2);
          }
          break;
        }
        // ══════════════════════════════════════════════════
        // 8. 未來特南克斯 (Future Trunks)
        // ══════════════════════════════════════════════════
        case "skin_trunks_future": {
          ctx.fillStyle = "#4338ca";
          ctx.strokeStyle = "#312e81";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 4);
          ctx.lineTo(-12, 4);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#3730a3";
          ctx.fillRect(-14, -24, 28, 5);
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(-10, 4, 20, 14);
          ctx.fillStyle = "#f8fafc";
          ctx.fillRect(-10, 16, 20, 5);
          ctx.fillStyle = "#334155";
          ctx.fillRect(-11, 20, 22, 8);
          ctx.strokeStyle = "#78350f";
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(10, -22);
          ctx.lineTo(-10, 14);
          ctx.stroke();
          ctx.fillStyle = "#ea580c";
          ctx.fillRect(-17, -24, 5, 20);
          ctx.fillStyle = "#e2e8f0";
          ctx.fillRect(-19, -30, 9, 3);
          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(-16, -37, 3, 7);
          break;
        }
        // ══════════════════════════════════════════════════
        // 9. 比克大魔王 (Piccolo)
        // ══════════════════════════════════════════════════
        case "skin_piccolo": {
          ctx.fillStyle = "#6b21a8";
          ctx.strokeStyle = "#581c87";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#0284c7";
          ctx.fillRect(-11, 14, 22, 10);
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#cbd5e1";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(-22, -20);
          ctx.lineTo(-10, -25);
          ctx.lineTo(0, -18);
          ctx.lineTo(10, -25);
          ctx.lineTo(22, -20);
          ctx.lineTo(16, -11);
          ctx.lineTo(-16, -11);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        }
        // ══════════════════════════════════════════════════
        // 10. 黃金弗利沙 (Golden Frieza)
        // ══════════════════════════════════════════════════
        case "skin_golden_frieza": {
          ctx.fillStyle = "#ffd700";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#4c1d95";
          ctx.beginPath();
          ctx.moveTo(-7, 3);
          ctx.lineTo(7, 3);
          ctx.lineTo(5, 16);
          ctx.lineTo(-5, 16);
          ctx.closePath();
          ctx.fill();
          ctx.save();
          ctx.shadowColor = "#a855f7";
          ctx.shadowBlur = 12;
          ctx.fillStyle = "#9333ea";
          ctx.beginPath();
          ctx.ellipse(0, -7, 5, 6.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-1.5, -8.5, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          ctx.fillStyle = "#d97706";
          ctx.fillRect(-10, 16, 20, 12);
          break;
        }
        default:
          ctx.restore();
          return false;
      }
      ctx.restore();
      return true;
    }
    // ─── 4. 特殊手臂渲染 (Special Arm) ───
    drawArm(ctx, arm, skin, layer) {
      if (!this.isSpecial(skin)) return false;
      const id = skin.id;
      const isBack = layer === "backArm";
      ctx.save();
      ctx.translate(arm.shoulderX, arm.shoulderY);
      ctx.rotate(arm.upperAngle);
      switch (id) {
        // ══════════════════════════════════════════════════
        // 1. 鋼鐵人・馬克85 (Iron Man Mark 85)
        // ══════════════════════════════════════════════════
        case "skin_iron_man": {
          ctx.fillStyle = isBack ? "#7f1d1d" : "#b91c1c";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-4, 0, 8, 22, 3);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(-2, 4, 4, 12);
          ctx.translate(0, 20);
          ctx.rotate(arm.foreAngle);
          ctx.fillStyle = isBack ? "#991b1b" : "#b91c1c";
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(-4, 8, 8, 4);
          ctx.save();
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "#38bdf8";
          ctx.beginPath();
          ctx.arc(0, 17, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(0, 17, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          break;
        }
        // ══════════════════════════════════════════════════
        // 2. 蜘蛛人・經典紅藍 (Spider-Man Classic Suit)
        // ══════════════════════════════════════════════════
        case "skin_spiderman": {
          ctx.fillStyle = isBack ? "#1d4ed8" : "#2563eb";
          ctx.strokeStyle = "#1e3a8a";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(-4, 0, 8, 22, 3);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 20);
          ctx.rotate(arm.foreAngle);
          ctx.fillStyle = isBack ? "#991b1b" : "#dc2626";
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, 22);
          ctx.moveTo(-5, 10);
          ctx.lineTo(5, 10);
          ctx.moveTo(-5, 16);
          ctx.lineTo(5, 16);
          ctx.stroke();
          ctx.fillStyle = "#e2e8f0";
          ctx.fillRect(-2, 14, 4, 2);
          break;
        }
        // ══════════════════════════════════════════════════
        // 3. 美國隊長・羅傑斯 (Captain America Steve Rogers)
        // ══════════════════════════════════════════════════
        case "skin_captain_america": {
          ctx.fillStyle = isBack ? "#172554" : "#1e3a8a";
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-4, 0, 8, 22, 3);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 20);
          ctx.rotate(arm.foreAngle);
          ctx.fillStyle = isBack ? "#7f1d1d" : "#b91c1c";
          ctx.strokeStyle = "#78350f";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#78350f";
          ctx.fillRect(-5, 10, 10, 3.5);
          ctx.fillStyle = "#e2e8f0";
          ctx.fillRect(-1.5, 10.5, 3, 2.5);
          if (!isBack && (arm.holdingWeapon === "shield" || arm.holdingWeapon === void 0)) {
            ctx.save();
            ctx.translate(0, 12);
            ctx.fillStyle = "#dc2626";
            ctx.strokeStyle = "#991b1b";
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.arc(0, 0, 17, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "#f8fafc";
            ctx.beginPath();
            ctx.arc(0, 0, 13.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#dc2626";
            ctx.beginPath();
            ctx.arc(0, 0, 9.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#1e3a8a";
            ctx.beginPath();
            ctx.arc(0, 0, 6.2, 0, Math.PI * 2);
            ctx.fill();
            this._drawStar(ctx, 0, 0, 5, 5.5, 2.4, "#ffffff", "#cbd5e1", 0.6);
            ctx.restore();
          }
          break;
        }
        // ══════════════════════════════════════════════════
        // 4. 雷神索爾・奧丁之子 (Thor Odinson)
        // ══════════════════════════════════════════════════
        case "skin_thor": {
          ctx.fillStyle = isBack ? "#fed7aa" : "#ffedd5";
          ctx.strokeStyle = "#ca8a04";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.roundRect(-4.5, 0, 9, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 20);
          ctx.rotate(arm.foreAngle);
          ctx.fillStyle = "#e2e8f0";
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#f59e0b";
          ctx.fillRect(-5, 6, 10, 3);
          ctx.fillRect(-5, 14, 10, 2);
          ctx.save();
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 8;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(0, 19, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          if (!isBack || arm.holdingWeapon === "hammer") {
            ctx.save();
            ctx.translate(0, 19);
            ctx.fillStyle = "#78350f";
            ctx.fillRect(-2, -3, 4, 18);
            ctx.fillStyle = "#cbd5e1";
            ctx.fillRect(-3, 14, 6, 3);
            ctx.strokeStyle = "#78350f";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(0, 17, 3, 0, Math.PI);
            ctx.stroke();
            ctx.fillStyle = "#e2e8f0";
            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.roundRect(-10, -14, 20, 12, 2.5);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "#cbd5e1";
            ctx.fillRect(-8, -12, 16, 8);
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(-5, -8);
            ctx.lineTo(0, -11);
            ctx.lineTo(5, -8);
            ctx.stroke();
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = 8;
            ctx.strokeStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(-11, -9);
            ctx.lineTo(-14, -12);
            ctx.lineTo(-12, -15);
            ctx.moveTo(11, -9);
            ctx.lineTo(15, -7);
            ctx.stroke();
            ctx.restore();
          }
          break;
        }
        // ══════════════════════════════════════════════════
        // 5. 薩諾斯・無限手套 (Thanos Infinity Gauntlet)
        // ══════════════════════════════════════════════════
        case "skin_thanos": {
          const isGauntlet = !isBack;
          ctx.fillStyle = isBack ? "#6d28d9" : "#8b5cf6";
          ctx.strokeStyle = "#4c1d95";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#f59e0b";
          ctx.fillRect(-3, 6, 6, 12);
          ctx.translate(0, 20);
          ctx.rotate(arm.foreAngle);
          ctx.fillStyle = "#f59e0b";
          ctx.strokeStyle = "#b45309";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(-6, 0, 12, 23, 4);
          ctx.fill();
          ctx.stroke();
          if (isGauntlet) {
            ctx.save();
            ctx.shadowColor = "#facc15";
            ctx.shadowBlur = 10;
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.ellipse(0, 13, 3, 4.2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowColor = "#a855f7";
            ctx.fillStyle = "#c084fc";
            ctx.beginPath();
            ctx.arc(3.5, 20, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowColor = "#3b82f6";
            ctx.fillStyle = "#60a5fa";
            ctx.beginPath();
            ctx.arc(1.2, 21, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowColor = "#ef4444";
            ctx.fillStyle = "#f87171";
            ctx.beginPath();
            ctx.arc(-1.2, 21, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowColor = "#f97316";
            ctx.fillStyle = "#fb923c";
            ctx.beginPath();
            ctx.arc(-3.5, 20, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowColor = "#22c55e";
            ctx.fillStyle = "#4ade80";
            ctx.beginPath();
            ctx.arc(4.2, 14, 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          break;
        }
        // ══════════════════════════════════════════════════
        // 5.5 鷹眼・克林特巴頓 (Hawkeye Clint Barton)
        // ══════════════════════════════════════════════════
        case "skin_hawkeye": {
          ctx.fillStyle = isBack ? "#18181b" : "#27272a";
          ctx.strokeStyle = "#581c87";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-4, 0, 8, 22, 3);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#9333ea";
          ctx.fillRect(-3, 2, 6, 4);
          ctx.translate(0, 20);
          ctx.rotate(arm.foreAngle);
          ctx.fillStyle = isBack ? "#27272a" : "#3f3f46";
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#a855f7";
          ctx.fillRect(-3, 6, 6, 2);
          ctx.fillRect(-3, 10, 6, 2);
          ctx.fillRect(-3, 14, 6, 2);
          ctx.fillStyle = "#18181b";
          ctx.fillRect(-4, 18, 8, 4);
          if (!isBack || arm.holdingWeapon === "bow") {
            ctx.save();
            ctx.translate(0, 18);
            ctx.fillStyle = "#18181b";
            ctx.strokeStyle = "#7e22ce";
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(8, -14, 4, -28);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(8, 14, 4, 28);
            ctx.stroke();
            ctx.fillStyle = "#c084fc";
            ctx.beginPath();
            ctx.arc(4, -28, 3.5, 0, Math.PI * 2);
            ctx.arc(4, 28, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#f5d0fe";
            ctx.lineWidth = 1;
            ctx.beginPath();
            if (arm.drawingArrow) {
              ctx.moveTo(4, -28);
              ctx.lineTo(-14, 0);
              ctx.lineTo(4, 28);
            } else {
              ctx.moveTo(4, -28);
              ctx.lineTo(-2, 0);
              ctx.lineTo(4, 28);
            }
            ctx.stroke();
            if (arm.holdingWeapon === "bow" || arm.drawingArrow) {
              ctx.strokeStyle = "#e9d5ff";
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(-16, 0);
              ctx.lineTo(24, 0);
              ctx.stroke();
              ctx.fillStyle = "#9333ea";
              ctx.beginPath();
              ctx.moveTo(24, -3);
              ctx.lineTo(30, 0);
              ctx.lineTo(24, 3);
              ctx.closePath();
              ctx.fill();
              ctx.fillStyle = "#c084fc";
              ctx.fillRect(-16, -2.5, 5, 1.2);
              ctx.fillRect(-16, 1.3, 5, 1.2);
            }
            ctx.restore();
          }
          break;
        }
        // ══════════════════════════════════════════════════
        // 6. 孫悟空・超級賽亞人 (Son Goku SSJ)
        // ══════════════════════════════════════════════════
        case "skin_goku_ssj": {
          ctx.fillStyle = isBack ? "#fed7aa" : "#ffedd5";
          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.roundRect(-4.5, 0, 9, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 20);
          ctx.rotate(arm.foreAngle);
          ctx.fillStyle = "#fed7aa";
          ctx.beginPath();
          ctx.roundRect(-4.5, 0, 9, 10, 3);
          ctx.fill();
          ctx.fillStyle = "#1e40af";
          ctx.strokeStyle = "#1e3a8a";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.roundRect(-5, 9, 10, 11, 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fed7aa";
          ctx.beginPath();
          ctx.arc(0, 20, 3.5, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        // ══════════════════════════════════════════════════
        // 7. 貝吉塔・賽亞人王子 (Vegeta SSJ)
        // ══════════════════════════════════════════════════
        case "skin_vegeta_ssj": {
          ctx.fillStyle = isBack ? "#172554" : "#1e3a8a";
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(-4, 0, 8, 22, 3);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 20);
          ctx.rotate(arm.foreAngle);
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#cbd5e1";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-6, 2);
          ctx.lineTo(6, 2);
          ctx.lineTo(5, 22);
          ctx.lineTo(-5, 22);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-5, 9);
          ctx.lineTo(5, 9);
          ctx.moveTo(-5, 14);
          ctx.lineTo(5, 14);
          ctx.stroke();
          break;
        }
        // ══════════════════════════════════════════════════
        // 8. 未來特南克斯 (Future Trunks)
        // ══════════════════════════════════════════════════
        case "skin_trunks_future": {
          ctx.fillStyle = isBack ? "#312e81" : "#4338ca";
          ctx.strokeStyle = "#1e1b4b";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-4, 0, 8, 22, 3);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#f8fafc";
          ctx.beginPath();
          ctx.arc(0, 8, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.translate(0, 20);
          ctx.rotate(arm.foreAngle);
          ctx.fillStyle = "#fed7aa";
          ctx.beginPath();
          ctx.roundRect(-4, 0, 8, 12, 3);
          ctx.fill();
          ctx.fillStyle = "#1e293b";
          ctx.beginPath();
          ctx.roundRect(-5, 10, 10, 12, 3);
          ctx.fill();
          if (!isBack || arm.holdingWeapon === "sword") {
            ctx.save();
            ctx.translate(0, 18);
            ctx.fillStyle = "#1e3a8a";
            ctx.fillRect(-2, -2, 4, 15);
            ctx.fillStyle = "#f59e0b";
            ctx.beginPath();
            ctx.arc(0, 14, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#f59e0b";
            ctx.strokeStyle = "#b45309";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(-9, -4, 18, 5, 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "#f8fafc";
            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(-4, -4);
            ctx.lineTo(-3, -38);
            ctx.lineTo(0, -44);
            ctx.lineTo(3, -38);
            ctx.lineTo(4, -4);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, -4);
            ctx.lineTo(0, -36);
            ctx.stroke();
            ctx.shadowColor = "#60a5fa";
            ctx.shadowBlur = 8;
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(-3, -30);
            ctx.lineTo(0, -44);
            ctx.lineTo(3, -30);
            ctx.stroke();
            ctx.restore();
          }
          break;
        }
        // ══════════════════════════════════════════════════
        // 9. 比克大魔王 (Piccolo)
        // ══════════════════════════════════════════════════
        case "skin_piccolo": {
          ctx.fillStyle = isBack ? "#16a34a" : "#22c55e";
          ctx.strokeStyle = "#15803d";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-4.5, 0, 9, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fb7185";
          ctx.beginPath();
          ctx.ellipse(0, 11, 2.8, 6, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.translate(0, 20);
          ctx.rotate(arm.foreAngle);
          ctx.fillStyle = isBack ? "#16a34a" : "#22c55e";
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fb7185";
          ctx.beginPath();
          ctx.ellipse(0, 10, 3, 6, 0, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        // ══════════════════════════════════════════════════
        // 10. 黃金弗利沙 (Golden Frieza)
        // ══════════════════════════════════════════════════
        case "skin_golden_frieza": {
          ctx.fillStyle = "#ffd700";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-4.5, 0, 9, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 20);
          ctx.rotate(arm.foreAngle);
          ctx.fillStyle = "#fbbf24";
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 22, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#9333ea";
          ctx.fillRect(-5, 12, 10, 3.5);
          ctx.fillStyle = "#d97706";
          ctx.fillRect(-4, 20, 8, 4);
          break;
        }
        default:
          ctx.restore();
          return false;
      }
      ctx.restore();
      return true;
    }
    // ─── 5. 特殊腿部與戰靴渲染 (Special Limb) ───
    drawLimb(ctx, leg, skin, layer) {
      if (!this.isSpecial(skin)) return false;
      const id = skin.id;
      const isBack = layer === "backLeg";
      ctx.save();
      ctx.translate(leg.hipX, leg.hipY);
      ctx.rotate(leg.thighAngle);
      switch (id) {
        // ══════════════════════════════════════════════════
        // 1. 鋼鐵人・馬克85 (Iron Man Mark 85)
        // ══════════════════════════════════════════════════
        case "skin_iron_man": {
          ctx.fillStyle = isBack ? "#7f1d1d" : "#b91c1c";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 26, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(-3, 16, 6, 8);
          ctx.translate(0, 24);
          ctx.rotate(leg.shinAngle);
          ctx.fillStyle = isBack ? "#991b1b" : "#b91c1c";
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 28, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(-4, 10, 8, 12);
          ctx.translate(0, 24);
          if (leg.footAngle) ctx.rotate(leg.footAngle);
          ctx.fillStyle = "#7f1d1d";
          ctx.fillRect(-4, 0, 16, 7);
          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(-2, 5, 12, 2.5);
          break;
        }
        // ══════════════════════════════════════════════════
        // 2. 蜘蛛人・經典紅藍 (Spider-Man Classic Suit)
        // ══════════════════════════════════════════════════
        case "skin_spiderman": {
          ctx.fillStyle = isBack ? "#1d4ed8" : "#2563eb";
          ctx.strokeStyle = "#1e3a8a";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 26, 4);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 24);
          ctx.rotate(leg.shinAngle);
          ctx.fillStyle = isBack ? "#1d4ed8" : "#2563eb";
          ctx.fillRect(-5, 0, 10, 10);
          ctx.fillStyle = isBack ? "#991b1b" : "#dc2626";
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(-5, 8, 10, 20, 3);
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(0, 8);
          ctx.lineTo(0, 28);
          ctx.moveTo(-5, 16);
          ctx.lineTo(5, 16);
          ctx.stroke();
          ctx.translate(0, 24);
          if (leg.footAngle) ctx.rotate(leg.footAngle);
          ctx.fillStyle = "#dc2626";
          ctx.fillRect(-4, 0, 16, 6.5);
          break;
        }
        // ══════════════════════════════════════════════════
        // 3. 美國隊長・羅傑斯 (Captain America Steve Rogers)
        // ══════════════════════════════════════════════════
        case "skin_captain_america": {
          ctx.fillStyle = isBack ? "#172554" : "#1e3a8a";
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 26, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(-4, 18, 8, 6);
          ctx.translate(0, 24);
          ctx.rotate(leg.shinAngle);
          ctx.fillStyle = isBack ? "#7f1d1d" : "#991b1b";
          ctx.strokeStyle = "#451a03";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 28, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#78350f";
          ctx.fillRect(-5, 8, 10, 3);
          ctx.fillRect(-5, 16, 10, 3);
          ctx.translate(0, 24);
          if (leg.footAngle) ctx.rotate(leg.footAngle);
          ctx.fillStyle = "#7f1d1d";
          ctx.fillRect(-4, 0, 16, 7);
          break;
        }
        // ══════════════════════════════════════════════════
        // 4. 雷神索爾・奧丁之子 (Thor Odinson)
        // ══════════════════════════════════════════════════
        case "skin_thor": {
          ctx.fillStyle = isBack ? "#0f172a" : "#1e293b";
          ctx.strokeStyle = "#020617";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 26, 4);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 24);
          ctx.rotate(leg.shinAngle);
          ctx.fillStyle = "#1e293b";
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 28, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#e2e8f0";
          ctx.beginPath();
          ctx.arc(0, 2, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-5, 10);
          ctx.lineTo(5, 18);
          ctx.moveTo(5, 10);
          ctx.lineTo(-5, 18);
          ctx.stroke();
          ctx.translate(0, 24);
          if (leg.footAngle) ctx.rotate(leg.footAngle);
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(-4, 0, 16, 6.5);
          break;
        }
        // ══════════════════════════════════════════════════
        // 5. 薩諾斯・無限手套 (Thanos Titan Warlord)
        // ══════════════════════════════════════════════════
        case "skin_thanos": {
          ctx.fillStyle = isBack ? "#172554" : "#1e3a8a";
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-5.5, 0, 11, 26, 4);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 24);
          ctx.rotate(leg.shinAngle);
          ctx.fillStyle = "#f59e0b";
          ctx.strokeStyle = "#b45309";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(-6, 0, 12, 28, 4);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 24);
          if (leg.footAngle) ctx.rotate(leg.footAngle);
          ctx.fillStyle = "#d97706";
          ctx.fillRect(-5, 0, 18, 8);
          break;
        }
        // ══════════════════════════════════════════════════
        // 5.5 鷹眼・克林特巴頓 (Hawkeye Clint Barton)
        // ══════════════════════════════════════════════════
        case "skin_hawkeye": {
          ctx.fillStyle = isBack ? "#18181b" : "#27272a";
          ctx.strokeStyle = "#581c87";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 26, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#3f3f46";
          ctx.fillRect(-4, 8, 8, 10);
          ctx.fillStyle = "#9333ea";
          ctx.fillRect(-4, 7, 8, 2);
          ctx.translate(0, 24);
          ctx.rotate(leg.shinAngle);
          ctx.fillStyle = isBack ? "#18181b" : "#27272a";
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 28, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#7e22ce";
          ctx.beginPath();
          ctx.roundRect(-4, 0, 8, 8, 2);
          ctx.fill();
          ctx.translate(0, 24);
          if (leg.footAngle) ctx.rotate(leg.footAngle);
          ctx.fillStyle = "#18181b";
          ctx.fillRect(-5, 0, 18, 8);
          ctx.fillStyle = "#9333ea";
          ctx.fillRect(-5, 6, 18, 3);
          break;
        }
        // ══════════════════════════════════════════════════
        // 6. 孫悟空・超級賽亞人 (Son Goku SSJ)
        // ══════════════════════════════════════════════════
        case "skin_goku_ssj": {
          ctx.fillStyle = isBack ? "#ea580c" : "#f97316";
          ctx.strokeStyle = "#c2410c";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-5.5, 0, 11, 26, 4);
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#7c2d12";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-2, 6);
          ctx.lineTo(-2, 20);
          ctx.stroke();
          ctx.translate(0, 24);
          ctx.rotate(leg.shinAngle);
          ctx.fillStyle = "#1e3a8a";
          ctx.strokeStyle = "#172554";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 28, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(-1.2, 0, 2.4, 28);
          ctx.fillStyle = "#facc15";
          ctx.fillRect(-5, 14, 10, 3);
          ctx.translate(0, 24);
          if (leg.footAngle) ctx.rotate(leg.footAngle);
          ctx.fillStyle = "#1e3a8a";
          ctx.fillRect(-4, 0, 16, 7);
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(8, 0, 4, 7);
          break;
        }
        // ══════════════════════════════════════════════════
        // 7. 貝吉塔・賽亞人王子 (Vegeta SSJ)
        // ══════════════════════════════════════════════════
        case "skin_vegeta_ssj": {
          ctx.fillStyle = isBack ? "#172554" : "#1e3a8a";
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 26, 4);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 24);
          ctx.rotate(leg.shinAngle);
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#cbd5e1";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 28, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(-5, 0, 10, 4);
          ctx.translate(0, 24);
          if (leg.footAngle) ctx.rotate(leg.footAngle);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(-4, 0, 16, 6.5);
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(5, 0, 7, 6.5);
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 1;
          ctx.strokeRect(5, 0, 7, 6.5);
          break;
        }
        // ══════════════════════════════════════════════════
        // 8. 未來特南克斯 (Future Trunks)
        // ══════════════════════════════════════════════════
        case "skin_trunks_future": {
          ctx.fillStyle = isBack ? "#1e293b" : "#334155";
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-5.5, 0, 11, 26, 4);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 24);
          ctx.rotate(leg.shinAngle);
          ctx.fillStyle = "#eab308";
          ctx.strokeStyle = "#ca8a04";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 28, 4);
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#f8fafc";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-3, 8);
          ctx.lineTo(3, 8);
          ctx.moveTo(-3, 14);
          ctx.lineTo(3, 14);
          ctx.moveTo(-3, 20);
          ctx.lineTo(3, 20);
          ctx.stroke();
          ctx.translate(0, 24);
          if (leg.footAngle) ctx.rotate(leg.footAngle);
          ctx.fillStyle = "#eab308";
          ctx.fillRect(-4, 0, 16, 5);
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(-4, 5, 16, 2.5);
          break;
        }
        // ══════════════════════════════════════════════════
        // 9. 比克大魔王 (Piccolo)
        // ══════════════════════════════════════════════════
        case "skin_piccolo": {
          ctx.fillStyle = isBack ? "#581c87" : "#6b21a8";
          ctx.strokeStyle = "#3b0764";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-6, 0, 12, 26, 5);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 24);
          ctx.rotate(leg.shinAngle);
          ctx.fillStyle = isBack ? "#581c87" : "#6b21a8";
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 28, 4);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 24);
          if (leg.footAngle) ctx.rotate(leg.footAngle);
          ctx.fillStyle = "#d97706";
          ctx.beginPath();
          ctx.moveTo(-4, 0);
          ctx.lineTo(12, 0);
          ctx.quadraticCurveTo(18, -3, 16, 5);
          ctx.lineTo(-4, 6);
          ctx.closePath();
          ctx.fill();
          break;
        }
        // ══════════════════════════════════════════════════
        // 10. 黃金弗利沙 (Golden Frieza)
        // ══════════════════════════════════════════════════
        case "skin_golden_frieza": {
          ctx.fillStyle = "#ffd700";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 26, 4);
          ctx.fill();
          ctx.stroke();
          ctx.translate(0, 24);
          ctx.rotate(leg.shinAngle);
          ctx.fillStyle = "#fbbf24";
          ctx.beginPath();
          ctx.roundRect(-5, 0, 10, 28, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#9333ea";
          ctx.beginPath();
          ctx.arc(0, 20, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.translate(0, 24);
          if (leg.footAngle) ctx.rotate(leg.footAngle);
          ctx.fillStyle = "#ffd700";
          ctx.fillRect(-4, 0, 16, 6.5);
          ctx.fillStyle = "#d97706";
          ctx.fillRect(8, 0, 4, 6.5);
          break;
        }
        default:
          ctx.restore();
          return false;
      }
      ctx.restore();
      return true;
    }
    // ─── 6. 特殊防禦幾何力場 (Special Guard Shield) ───
    drawGuardShield(ctx, stance, skin, t) {
      if (!this.isSpecial(skin)) return false;
      const id = skin.id;
      ctx.save();
      const shieldY = stance === "low" ? -35 : -74;
      const pulse = Math.sin(t * 0.2) * 0.12 + 0.92;
      switch (id) {
        // 美國隊長：擴散汎合金能量光盾 (Vibranium Star Shield)
        case "skin_captain_america": {
          ctx.shadowColor = "#dc2626";
          ctx.shadowBlur = 20;
          const cx = 35;
          const cy = shieldY;
          const r = 38 * pulse;
          ctx.strokeStyle = "#dc2626";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = "#f8fafc";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cx, cy, r * 0.8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = "#dc2626";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = "rgba(30, 58, 138, 0.6)";
          ctx.beginPath();
          ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
          ctx.fill();
          this._drawStar(ctx, cx, cy, 5, r * 0.35, r * 0.15, "#ffffff");
          ctx.restore();
          return true;
        }
        // 鋼鐵人：六角微晶納米力場盾 (Nanotech Hex Shield)
        case "skin_iron_man": {
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 20;
          ctx.strokeStyle = "#38bdf8";
          ctx.fillStyle = "rgba(56, 189, 248, 0.22)";
          ctx.lineWidth = 2.5;
          const cx = 36;
          const cy = shieldY;
          const rad = 36 * pulse;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const ang = Math.PI / 3 * i;
            const px = cx + Math.cos(ang) * rad;
            const py = cy + Math.sin(ang) * rad;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, rad * 0.5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          return true;
        }
        // 蜘蛛人：蛛絲防護陣 (Spider Web Shield)
        case "skin_spiderman": {
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 14;
          const cx = 34;
          const cy = shieldY;
          this._drawSpiderWebOnHead(ctx, cx, cy, 36 * pulse, "rgba(255, 255, 255, 0.85)");
          ctx.restore();
          return true;
        }
        // 鷹眼：複合神弓高能偏折護盾 (Tactical Bow Parrying Forcefield)
        case "skin_hawkeye": {
          ctx.shadowColor = "#a855f7";
          ctx.shadowBlur = 18;
          ctx.strokeStyle = "#c084fc";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(28, shieldY, 34 * pulse, -Math.PI * 0.35, Math.PI * 0.35);
          ctx.stroke();
          ctx.fillStyle = "#e9d5ff";
          ctx.beginPath();
          ctx.arc(32, shieldY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          return true;
        }
        // 孫悟空 & 貝吉塔：超級賽亞人球形氣功防護罩 (Ki Spherical Barrier)
        case "skin_goku_ssj":
        case "skin_vegeta_ssj": {
          const isVegeta = id === "skin_vegeta_ssj";
          const color = isVegeta ? "#60a5fa" : "#fde047";
          ctx.shadowColor = color;
          ctx.shadowBlur = 24;
          ctx.strokeStyle = color;
          ctx.fillStyle = isVegeta ? "rgba(96, 165, 250, 0.25)" : "rgba(253, 224, 71, 0.25)";
          ctx.lineWidth = 3.5;
          const cx = 34;
          const cy = shieldY;
          const r = 40 * pulse;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx, cy, r * 0.85, t * 0.2, t * 0.2 + Math.PI * 0.6);
          ctx.stroke();
          ctx.restore();
          return true;
        }
        // 薩諾斯：6 色無限寶石環狀結界 (Infinity Hexagonal Forcefield)
        case "skin_thanos": {
          const cx = 36;
          const cy = shieldY;
          const r = 42 * pulse;
          const stones = ["#facc15", "#a855f7", "#3b82f6", "#ef4444", "#f97316", "#22c55e"];
          ctx.shadowColor = "#facc15";
          ctx.shadowBlur = 20;
          ctx.fillStyle = "rgba(217, 119, 6, 0.25)";
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          for (let i = 0; i < 6; i++) {
            const ang = Math.PI / 3 * i + t * 0.08;
            const sx = cx + Math.cos(ang) * (r * 0.85);
            const sy = cy + Math.sin(ang) * (r * 0.85);
            ctx.fillStyle = stones[i];
            ctx.shadowColor = stones[i];
            ctx.beginPath();
            ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
          return true;
        }
        // 黃金弗利沙：黃金死亡防禦圓球 (Golden Death Sphere)
        case "skin_golden_frieza": {
          const cx = 35;
          const cy = shieldY;
          const r = 38 * pulse;
          ctx.shadowColor = "#ffd700";
          ctx.shadowBlur = 24;
          ctx.strokeStyle = "#ffd700";
          ctx.fillStyle = "rgba(255, 215, 0, 0.3)";
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(cx, cy, r * 0.75, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          return true;
        }
        default:
          ctx.restore();
          return false;
      }
    }
    // ─── 7. 特殊打擊專屬 VFX (Attack VFX) ───
    drawAttackVFX(ctx, vfx, skin) {
      if (!this.isSpecial(skin)) return false;
      const id = skin.id;
      const type = vfx.type;
      ctx.save();
      if (type === "bow_arrow" || id === "skin_hawkeye") {
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 18;
        ctx.strokeStyle = "#e9d5ff";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 30, vfx.y);
        ctx.lineTo(vfx.x + 8, vfx.y);
        ctx.stroke();
        ctx.fillStyle = "#c084fc";
        ctx.beginPath();
        ctx.moveTo(vfx.x + 8, vfx.y - 4);
        ctx.lineTo(vfx.x + 18, vfx.y);
        ctx.lineTo(vfx.x + 8, vfx.y + 4);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#7e22ce";
        ctx.fillRect(vfx.x - 30, vfx.y - 3.2, 7, 2);
        ctx.fillRect(vfx.x - 30, vfx.y + 1.2, 7, 2);
        ctx.strokeStyle = "rgba(168, 85, 247, 0.6)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(vfx.x - 10, vfx.y, 9, -Math.PI * 0.4, Math.PI * 0.4);
        ctx.stroke();
        ctx.restore();
        return true;
      }
      if (type === "repulsor_blast" || id === "skin_iron_man" && type === "punch") {
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 18;
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 22, vfx.y);
        ctx.lineTo(vfx.x + 16, vfx.y);
        ctx.stroke();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 20, vfx.y);
        ctx.lineTo(vfx.x + 16, vfx.y);
        ctx.stroke();
        ctx.strokeStyle = "#7dd3fc";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(vfx.x + 14, vfx.y, 11, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        return true;
      }
      if (type === "web_stream" || id === "skin_spiderman" && type === "punch") {
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 14;
        ctx.strokeStyle = "#f8fafc";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 28, vfx.y);
        ctx.lineTo(vfx.x + 10, vfx.y);
        ctx.stroke();
        this._drawSpiderWebOnHead(ctx, vfx.x + 10, vfx.y, 16, "#ffffff");
        ctx.restore();
        return true;
      }
      if (type === "shield_strike" || id === "skin_captain_america" && type === "punch") {
        ctx.shadowColor = "#dc2626";
        ctx.shadowBlur = 18;
        ctx.strokeStyle = "#dc2626";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 20, -Math.PI * 0.45, Math.PI * 0.45);
        ctx.stroke();
        ctx.strokeStyle = "#f8fafc";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(vfx.x - 4, vfx.y, 15, -Math.PI * 0.4, Math.PI * 0.4);
        ctx.stroke();
        this._drawStar(ctx, vfx.x, vfx.y, 5, 12, 4.5, "#ffffff", "#dc2626", 1.5);
        ctx.restore();
        return true;
      }
      if (type === "thor_lightning" || id === "skin_thor" && type === "punch") {
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 20;
        ctx.strokeStyle = "#67e8f9";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 16, vfx.y - 18);
        ctx.lineTo(vfx.x - 4, vfx.y - 4);
        ctx.lineTo(vfx.x - 10, vfx.y + 4);
        ctx.lineTo(vfx.x + 12, vfx.y + 16);
        ctx.stroke();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 4, vfx.y - 4);
        ctx.lineTo(vfx.x + 8, vfx.y - 10);
        ctx.moveTo(vfx.x - 10, vfx.y + 4);
        ctx.lineTo(vfx.x - 18, vfx.y + 12);
        ctx.stroke();
        ctx.restore();
        return true;
      }
      if (type === "infinity_vfx" || id === "skin_thanos" && type === "punch") {
        const colors = ["#facc15", "#a855f7", "#3b82f6", "#ef4444", "#f97316", "#22c55e"];
        for (let i = 0; i < 6; i++) {
          const ang = Math.PI / 3 * i;
          ctx.shadowColor = colors[i];
          ctx.shadowBlur = 14;
          ctx.fillStyle = colors[i];
          ctx.beginPath();
          ctx.arc(vfx.x + Math.cos(ang) * 14, vfx.y + Math.sin(ang) * 14, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      }
      if (type === "kamehameha_vfx" || id === "skin_goku_ssj" && type === "punch") {
        ctx.shadowColor = "#fde047";
        ctx.shadowBlur = 22;
        ctx.fillStyle = "#fde047";
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      }
      if (type === "final_flash_vfx" || id === "skin_vegeta_ssj" && type === "punch") {
        ctx.shadowColor = "#60a5fa";
        ctx.shadowBlur = 22;
        ctx.strokeStyle = "#facc15";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#60a5fa";
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      }
      if (type === "sword_slash_vfx" || id === "skin_trunks_future" && type === "punch") {
        ctx.shadowColor = "#60a5fa";
        ctx.shadowBlur = 18;
        ctx.strokeStyle = "#93c5fd";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(vfx.x - 10, vfx.y, 32, -Math.PI * 0.35, Math.PI * 0.35);
        ctx.stroke();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(vfx.x - 10, vfx.y, 32, -Math.PI * 0.35, Math.PI * 0.35);
        ctx.stroke();
        ctx.restore();
        return true;
      }
      if (type === "namek_arm_vfx" || id === "skin_piccolo" && type === "punch") {
        ctx.shadowColor = "#22c55e";
        ctx.shadowBlur = 16;
        ctx.strokeStyle = "#22c55e";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 26, vfx.y);
        ctx.lineTo(vfx.x + 10, vfx.y);
        ctx.stroke();
        ctx.strokeStyle = "#fb7185";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 18, vfx.y);
        ctx.lineTo(vfx.x + 4, vfx.y);
        ctx.stroke();
        ctx.restore();
        return true;
      }
      if (type === "death_beam_vfx" || id === "skin_golden_frieza" && type === "punch") {
        ctx.shadowColor = "#ef4444";
        ctx.shadowBlur = 20;
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 24, vfx.y);
        ctx.lineTo(vfx.x + 20, vfx.y);
        ctx.stroke();
        ctx.fillStyle = "#ffd700";
        ctx.beginPath();
        ctx.arc(vfx.x + 18, vfx.y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      }
      ctx.restore();
      return false;
    }
  };
  var specialSkinsRenderer = new SpecialSkinsRenderer();

  // js/engine/scifi_skins_renderer.js
  var SciFiSkinsRenderer = class {
    constructor() {
      this.sciFiSkinIds = /* @__PURE__ */ new Set([
        "skin_cyber_warrior",
        "skin_neon_shadow",
        "skin_pulse_enforcer",
        "skin_cosmic_ronin",
        "skin_volt_ranger",
        "skin_abyssal_ghost",
        "skin_dark_hacker",
        "skin_nano_cyborg",
        "skin_crimson_tyrant",
        "skin_cryo_maiden",
        "skin_void_devourer",
        "skin_solar_valkyrie",
        "skin_cyber_diva",
        "skin_archangel_judicator",
        "skin_omega_emperor"
      ]);
    }
    isSciFi(skin) {
      return skin && skin.id && this.sciFiSkinIds.has(skin.id);
    }
    // ─── 1. 頭部獨家造型渲染 (Head Rendering) ───
    drawHead(ctx, head, skin) {
      if (!this.isSciFi(skin)) return false;
      const id = skin.id;
      const t = Date.now() / 250;
      const themeCol = skin.themeColor || "#00f3ff";
      const armorCol = skin.armorColor || "#0f172a";
      switch (id) {
        // ══════════════════════════════════════════
        // 1. 賽博武者 (Cyber Warrior): 機武兜盔 + 金色 V-fin 角 + 青藍目鏡
        // ══════════════════════════════════════════
        case "skin_cyber_warrior": {
          ctx.fillStyle = armorCol;
          ctx.strokeStyle = themeCol;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-13, 8);
          ctx.quadraticCurveTo(-18, -4, -14, -14);
          ctx.quadraticCurveTo(-8, -18, 2, -18);
          ctx.lineTo(13, -12);
          ctx.lineTo(15, -2);
          ctx.lineTo(13, 8);
          ctx.lineTo(6, 16);
          ctx.lineTo(-6, 15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fbbf24";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(3, -13);
          ctx.lineTo(12, -26);
          ctx.lineTo(7, -15);
          ctx.lineTo(3, -14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-1, -13);
          ctx.lineTo(-8, -24);
          ctx.lineTo(-4, -15);
          ctx.lineTo(-1, -14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.moveTo(2, -15);
          ctx.lineTo(4, -13);
          ctx.lineTo(2, -11);
          ctx.lineTo(0, -13);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "rgba(0, 243, 255, 0.9)";
          ctx.shadowColor = "#00f3ff";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(2, -4);
          ctx.lineTo(14, -2);
          ctx.lineTo(13, 4);
          ctx.lineTo(3, 4);
          ctx.closePath();
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#090d16";
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(1, 5);
          ctx.lineTo(12, 5);
          ctx.lineTo(7, 15);
          ctx.lineTo(1, 15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          return true;
        }
        // ══════════════════════════════════════════
        // 2. 霓虹暗影刺客 (Neon Shadow): 狐面鬼忍兜帽 + 飄逸圍巾 + 粉光尖眼
        // ══════════════════════════════════════════
        case "skin_neon_shadow": {
          const wave1 = Math.sin(t * 1.6) * 4;
          const wave2 = Math.cos(t * 1.8) * 6;
          ctx.fillStyle = "#ff007f";
          ctx.shadowColor = "#ff007f";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(-10, 10);
          ctx.quadraticCurveTo(-22 + wave1, 16, -34 + wave2, 18);
          ctx.lineTo(-32 + wave2, 24);
          ctx.quadraticCurveTo(-20 + wave1, 20, -8, 14);
          ctx.closePath();
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = armorCol;
          ctx.strokeStyle = "#e879f9";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-12, 10);
          ctx.quadraticCurveTo(-20, -2, -14, -14);
          ctx.quadraticCurveTo(-8, -20, 2, -18);
          ctx.lineTo(12, -13);
          ctx.lineTo(15, -1);
          ctx.lineTo(12, 12);
          ctx.lineTo(0, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ff007f";
          ctx.beginPath();
          ctx.moveTo(-9, -17);
          ctx.lineTo(-14, -26);
          ctx.lineTo(-5, -19);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(1, -18);
          ctx.lineTo(5, -27);
          ctx.lineTo(6, -17);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#ff007f";
          ctx.shadowColor = "#ff007f";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(2, -4);
          ctx.lineTo(14, -6);
          ctx.lineTo(13, 0);
          ctx.lineTo(3, 2);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#0d0614";
          ctx.strokeStyle = "#ff007f";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(1, 3);
          ctx.lineTo(13, 1);
          ctx.lineTo(10, 13);
          ctx.lineTo(0, 15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.shadowBlur = 0;
          return true;
        }
        // ══════════════════════════════════════════
        // 3. 脈衝重裝執法官 (Pulse Enforcer): 警用鎮暴全罩盔 + 旋轉警燈 + 防暴盾面
        // ══════════════════════════════════════════
        case "skin_pulse_enforcer": {
          const flash = Math.sin(t * 3.5) > 0;
          ctx.fillStyle = flash ? "#ffd700" : "#78350f";
          ctx.shadowColor = "#ffd700";
          ctx.shadowBlur = flash ? 14 : 2;
          ctx.fillRect(-4, -24, 9, 6);
          ctx.strokeRect(-4, -24, 9, 6);
          ctx.shadowBlur = 0;
          ctx.fillStyle = armorCol;
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(0, -3, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "rgba(251, 191, 36, 0.45)";
          ctx.strokeStyle = "#ffd700";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(1, -9);
          ctx.lineTo(16, -6);
          ctx.lineTo(15, 6);
          ctx.lineTo(2, 6);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(7, -4);
          ctx.lineTo(11, -4);
          ctx.moveTo(9, -6);
          ctx.lineTo(9, -2);
          ctx.stroke();
          ctx.fillStyle = "#292524";
          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 1.5;
          ctx.fillRect(0, 7, 14, 8);
          ctx.strokeRect(0, 7, 14, 8);
          return true;
        }
        // ══════════════════════════════════════════
        // 4. 星穹量子浪人 (Cosmic Ronin): 斗笠 (Kasa) + 斗笠邊緣霓虹圈 + 飄帶
        // ══════════════════════════════════════════
        case "skin_cosmic_ronin": {
          const ribbonW = Math.sin(t * 1.5) * 5;
          ctx.strokeStyle = "#818cf8";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(-12, 0);
          ctx.quadraticCurveTo(-22, 6 + ribbonW, -32, 4 + ribbonW);
          ctx.stroke();
          ctx.fillStyle = "#0f172a";
          ctx.beginPath();
          ctx.arc(0, 2, 11, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#c084fc";
          ctx.shadowColor = "#818cf8";
          ctx.shadowBlur = 8;
          ctx.fillRect(3, -1, 8, 3);
          ctx.shadowBlur = 0;
          ctx.save();
          ctx.fillStyle = "#1e1b4b";
          ctx.strokeStyle = "#818cf8";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-25, -5);
          ctx.lineTo(2, -22);
          ctx.lineTo(26, -3);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#a5b4fc";
          ctx.shadowColor = "#818cf8";
          ctx.shadowBlur = 10;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-25, -5);
          ctx.lineTo(26, -3);
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.restore();
          return true;
        }
        // ══════════════════════════════════════════
        // 5. 雷霆神速遊俠 (Volt Ranger): 神速雷電鰭盔 + 耳側閃電翼
        // ══════════════════════════════════════════
        case "skin_volt_ranger": {
          ctx.fillStyle = armorCol;
          ctx.strokeStyle = "#facc15";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-13, 8);
          ctx.quadraticCurveTo(-18, -4, -13, -14);
          ctx.quadraticCurveTo(-6, -18, 4, -16);
          ctx.lineTo(15, -8);
          ctx.lineTo(16, 2);
          ctx.lineTo(12, 10);
          ctx.lineTo(4, 15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#facc15";
          ctx.beginPath();
          ctx.moveTo(-10, -15);
          ctx.lineTo(0, -26);
          ctx.lineTo(8, -16);
          ctx.lineTo(0, -18);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#fde047";
          ctx.strokeStyle = "#ca8a04";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-8, -2);
          ctx.lineTo(-18, -12);
          ctx.lineTo(-12, -8);
          ctx.lineTo(-20, -18);
          ctx.lineTo(-8, -8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#facc15";
          ctx.shadowColor = "#facc15";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(3, -5);
          ctx.lineTo(14, -8);
          ctx.lineTo(11, -1);
          ctx.lineTo(16, 3);
          ctx.lineTo(4, 3);
          ctx.closePath();
          ctx.fill();
          ctx.shadowBlur = 0;
          return true;
        }
        // ══════════════════════════════════════════
        // 6. 深淵幽靈特工 (Abyssal Ghost): 三眼夜視儀 (Tri-Ocular NVG) + 戰術防毒面具
        // ══════════════════════════════════════════
        case "skin_abyssal_ghost": {
          ctx.fillStyle = "#082f49";
          ctx.strokeStyle = "#0284c7";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(0, 0, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#030712";
          ctx.fillRect(1, -9, 14, 10);
          ctx.shadowColor = "#06b6d4";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "#06b6d4";
          ctx.beginPath();
          ctx.arc(11, -7, 2.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(11, -1, 2.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(5, -4, 2.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#1e293b";
          ctx.strokeStyle = "#0ea5e9";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(8, 7, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          return true;
        }
        // ══════════════════════════════════════════
        // 7. 暗黑駭客 (Dark Hacker): 寬大連帽風衣 (Hacker Hoodie) + 矩陣代碼眼鏡
        // ══════════════════════════════════════════
        case "skin_dark_hacker": {
          ctx.fillStyle = "#022c22";
          ctx.strokeStyle = "#00ff66";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-16, 12);
          ctx.quadraticCurveTo(-24, -4, -16, -16);
          ctx.quadraticCurveTo(-8, -24, 2, -22);
          ctx.quadraticCurveTo(14, -20, 16, -8);
          ctx.lineTo(16, 6);
          ctx.quadraticCurveTo(12, 16, 2, 18);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#050c08";
          ctx.beginPath();
          ctx.arc(2, 0, 11, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(0, 255, 102, 0.85)";
          ctx.shadowColor = "#00ff66";
          ctx.shadowBlur = 10;
          ctx.fillRect(2, -4, 12, 6);
          ctx.fillStyle = "#fff";
          ctx.font = "5px monospace";
          ctx.fillText("0", 4, 1);
          ctx.fillText("1", 8, 0);
          ctx.shadowBlur = 0;
          return true;
        }
        // ══════════════════════════════════════════
        // 8. 奈米生化戰警 (Nano Cyborg): 魔鬼終結者半鈦金屬頭骨 + 血紅機械眼
        // ══════════════════════════════════════════
        case "skin_nano_cyborg": {
          ctx.fillStyle = "#14532d";
          ctx.strokeStyle = "#84cc16";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(0, 0, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#94a3b8";
          ctx.strokeStyle = "#cbd5e1";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(2, -14);
          ctx.lineTo(14, -10);
          ctx.lineTo(16, 2);
          ctx.lineTo(12, 14);
          ctx.lineTo(2, 15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#334155";
          ctx.lineWidth = 1;
          for (let i = 4; i <= 11; i += 3) {
            ctx.beginPath();
            ctx.moveTo(i, 8);
            ctx.lineTo(i, 13);
            ctx.stroke();
          }
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 14;
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.arc(8, -2, 3.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(8, -2, 1.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          return true;
        }
        // ══════════════════════════════════════════
        // 9. 赤紅暴君重機甲 (Crimson Tyrant): 惡魔雙巨角 + 熔岩排氣面罩
        // ══════════════════════════════════════════
        case "skin_crimson_tyrant": {
          ctx.fillStyle = "#7f1d1d";
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(2, -12);
          ctx.quadraticCurveTo(14, -22, 18, -32);
          ctx.quadraticCurveTo(6, -24, -2, -16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-10, -10);
          ctx.quadraticCurveTo(-18, -24, -14, -34);
          ctx.quadraticCurveTo(-14, -20, -6, -14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = armorCol;
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(-13, 8);
          ctx.lineTo(-16, -8);
          ctx.lineTo(2, -18);
          ctx.lineTo(16, -6);
          ctx.lineTo(15, 6);
          ctx.lineTo(6, 17);
          ctx.lineTo(-6, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ef4444";
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 12;
          ctx.fillRect(2, -4, 13, 4);
          ctx.shadowBlur = 0;
          ctx.strokeStyle = "#f97316";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(4, 8);
          ctx.lineTo(12, 8);
          ctx.moveTo(5, 11);
          ctx.lineTo(11, 11);
          ctx.stroke();
          return true;
        }
        // ══════════════════════════════════════════
        // 10. 極寒超導武姬 (Cryo Maiden): 5 晶棱極地冰晶王冠 + 冰霜髮辮
        // ══════════════════════════════════════════
        case "skin_cryo_maiden": {
          ctx.fillStyle = "rgba(186, 230, 253, 0.75)";
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-10, 4);
          ctx.lineTo(-24, -2);
          ctx.lineTo(-16, -6);
          ctx.lineTo(-28, -12);
          ctx.lineTo(-12, -14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#0c4a6e";
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#e0f2fe";
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.2;
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 8;
          const spires = [-10, -5, 1, 7, 12];
          const heights = [16, 22, 26, 22, 16];
          for (let i = 0; i < spires.length; i++) {
            ctx.beginPath();
            ctx.moveTo(spires[i] - 2, -12);
            ctx.lineTo(spires[i], -heights[i]);
            ctx.lineTo(spires[i] + 2, -12);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(2, -3, 11, 4);
          return true;
        }
        // ══════════════════════════════════════════
        // 11. 虛空吞噬者 (Void Devourer): 無面異面具 + 額前微型黑洞奇點
        // ══════════════════════════════════════════
        case "skin_void_devourer": {
          ctx.fillStyle = "#090514";
          ctx.strokeStyle = "#9333ea";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(0, 0, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          const holeAngle = t * 2.5;
          ctx.save();
          ctx.translate(5, -3);
          ctx.rotate(holeAngle);
          ctx.shadowColor = "#a855f7";
          ctx.shadowBlur = 16;
          ctx.strokeStyle = "#c084fc";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 1.6);
          ctx.stroke();
          ctx.fillStyle = "#000000";
          ctx.beginPath();
          ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          ctx.shadowBlur = 0;
          return true;
        }
        // ══════════════════════════════════════════
        // 12. 太陽女武神 (Solar Valkyrie): 金翼戰盔 + 金羽雙角 + 烈陽額鑽
        // ══════════════════════════════════════════
        case "skin_solar_valkyrie": {
          ctx.fillStyle = "#f59e0b";
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(-6, -4);
          ctx.lineTo(-24, -18);
          ctx.lineTo(-16, -10);
          ctx.lineTo(-28, -26);
          ctx.lineTo(-12, -18);
          ctx.lineTo(-26, -34);
          ctx.lineTo(-2, -14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#451a03";
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ff4500";
          ctx.shadowColor = "#ff4500";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(3, -13, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(2, -4, 12, 4);
          return true;
        }
        // ══════════════════════════════════════════
        // 13. 賽博歌姬音律 (Cyber Diva): 青綠全息雙馬尾 + DJ 耳機 + 等化器
        // ══════════════════════════════════════════
        case "skin_cyber_diva": {
          const hairWave = Math.sin(t * 1.8) * 6;
          ctx.fillStyle = "rgba(20, 184, 166, 0.85)";
          ctx.strokeStyle = "#2dd4bf";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(-10, -10);
          ctx.quadraticCurveTo(-26, 6 + hairWave, -22, 28 + hairWave);
          ctx.lineTo(-16, 24 + hairWave);
          ctx.quadraticCurveTo(-18, 4 + hairWave, -6, -4);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#134e4a";
          ctx.strokeStyle = "#2dd4bf";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(0, 0, 13, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#042f2e";
          ctx.strokeStyle = "#14b8a6";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(-8, 1, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          const b1 = Math.abs(Math.sin(t * 3)) * 6 + 2;
          const b2 = Math.abs(Math.cos(t * 2.5)) * 6 + 2;
          ctx.fillStyle = "#5eead4";
          ctx.fillRect(-10, 1 - b1 / 2, 2, b1);
          ctx.fillRect(-7, 1 - b2 / 2, 2, b2);
          ctx.fillStyle = "#2dd4bf";
          ctx.fillRect(2, -3, 10, 4);
          return true;
        }
        // ══════════════════════════════════════════
        // 14. 曜白裁決聖使 (Archangel Judicator): 懸浮天使光環 + 聖白金十字面甲
        // ══════════════════════════════════════════
        case "skin_archangel_judicator": {
          const haloBob = Math.sin(t * 1.5) * 2;
          ctx.save();
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 16;
          ctx.strokeStyle = "#f8fafc";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.ellipse(0, -26 + haloBob, 15, 4.5, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          ctx.fillStyle = "#f8fafc";
          ctx.strokeStyle = "#e2e8f0";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#eab308";
          ctx.shadowColor = "#facc15";
          ctx.shadowBlur = 10;
          ctx.fillRect(1, -2, 13, 3.5);
          ctx.fillRect(7, -8, 3.5, 15);
          ctx.shadowBlur = 0;
          return true;
        }
        // ══════════════════════════════════════════
        // 15. 黃金終極機神 (Omega Emperor): 帝皇三重金冠 + 龍首面甲
        // ══════════════════════════════════════════
        case "skin_omega_emperor": {
          ctx.fillStyle = "#eab308";
          ctx.strokeStyle = "#ca8a04";
          ctx.lineWidth = 1.6;
          ctx.shadowColor = "#facc15";
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(-12, -12);
          ctx.lineTo(-14, -26);
          ctx.lineTo(-6, -16);
          ctx.lineTo(2, -32);
          ctx.lineTo(8, -16);
          ctx.lineTo(16, -24);
          ctx.lineTo(12, -12);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#dc2626";
          ctx.beginPath();
          ctx.arc(2, -18, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#713f12";
          ctx.strokeStyle = "#eab308";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fde047";
          ctx.shadowColor = "#fde047";
          ctx.shadowBlur = 8;
          ctx.fillRect(2, -3, 12, 4);
          ctx.shadowBlur = 0;
          return true;
        }
        default:
          return false;
      }
    }
    // ─── 2. 胸軀外甲與背部專屬飾物渲染 (Torso & Accessories) ───
    drawTorso(ctx, torso, skin, t) {
      if (!this.isSciFi(skin)) return false;
      const id = skin.id;
      const themeCol = skin.themeColor || "#00f3ff";
      const armorCol = skin.armorColor || "#0f172a";
      ctx.save();
      ctx.translate(torso.x, torso.y);
      ctx.rotate(torso.angle);
      switch (id) {
        // 1. 賽博武者：武士護板 + 腰間佩刀刀鞘 + 胸前反應爐
        case "skin_cyber_warrior": {
          ctx.fillStyle = armorCol;
          ctx.strokeStyle = themeCol;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#00f3ff";
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(-14, 8);
          ctx.lineTo(-28, 26);
          ctx.stroke();
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(-29, 24, 4, 4);
          this._drawCore(ctx, 0, -6, themeCol, 6);
          break;
        }
        // 2. 霓虹暗影刺客：夜行黑甲 + 交叉苦無背帶 (Kunai Harness)
        case "skin_neon_shadow": {
          ctx.fillStyle = armorCol;
          ctx.strokeStyle = "#ff007f";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-14, -22);
          ctx.lineTo(14, -22);
          ctx.lineTo(10, 15);
          ctx.lineTo(-10, 15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#a855f7";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(-13, -20);
          ctx.lineTo(11, 14);
          ctx.stroke();
          ctx.fillStyle = "#ff007f";
          ctx.fillRect(-4, -8, 6, 2.5);
          ctx.fillRect(2, 0, 6, 2.5);
          this._drawCore(ctx, 0, -5, "#ff007f", 5);
          break;
        }
        // 3. 脈衝重裝執法官：厚重防暴戰術防彈背心 + 金色警徽
        case "skin_pulse_enforcer": {
          ctx.fillStyle = "#1c1917";
          ctx.strokeStyle = "#ffd700";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(-18, -24);
          ctx.lineTo(18, -24);
          ctx.lineTo(14, 17);
          ctx.lineTo(-14, 17);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ffd700";
          ctx.beginPath();
          ctx.arc(6, -12, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(-12, 6, 24, 4);
          ctx.fillStyle = "#000";
          ctx.fillRect(-8, 6, 5, 4);
          ctx.fillRect(2, 6, 5, 4);
          this._drawCore(ctx, -2, -4, "#ffd700", 6);
          break;
        }
        // 4. 星穹量子浪人：浪人羽織 (Haori Coat) 隨風拂動 + 星辰紋
        case "skin_cosmic_ronin": {
          const coatW = Math.sin(t * 1.6) * 3;
          ctx.fillStyle = "#1e1b4b";
          ctx.strokeStyle = "#818cf8";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-18, -23);
          ctx.lineTo(18, -23);
          ctx.lineTo(16 + coatW, 20);
          ctx.lineTo(-16 - coatW, 20);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#f8fafc";
          ctx.fillRect(-12, 10, 24, 5);
          this._drawCore(ctx, 0, -6, "#818cf8", 5);
          break;
        }
        // 5. 雷霆神速遊俠：流線金色閃電胸甲 + 雙肩微型特斯拉電容
        case "skin_volt_ranger": {
          ctx.fillStyle = armorCol;
          ctx.strokeStyle = "#facc15";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-15, -23);
          ctx.lineTo(15, -23);
          ctx.lineTo(11, 15);
          ctx.lineTo(-11, 15);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fde047";
          ctx.shadowColor = "#facc15";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(3, -20);
          ctx.lineTo(-6, -4);
          ctx.lineTo(1, -4);
          ctx.lineTo(-4, 10);
          ctx.lineTo(6, -6);
          ctx.lineTo(-1, -6);
          ctx.closePath();
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }
        // 6. 深淵幽靈特工：潛水作戰胸掛 + 聲納脈衝環 + 氧氣瓶
        case "skin_abyssal_ghost": {
          ctx.fillStyle = "#082f49";
          ctx.strokeStyle = "#06b6d4";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-16, -22);
          ctx.lineTo(16, -22);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#0284c7";
          ctx.fillRect(-20, -18, 5, 24);
          ctx.fillRect(-22, -18, 3, 4);
          this._drawCore(ctx, 0, -5, "#06b6d4", 6);
          break;
        }
        // 7. 暗黑駭客：長版風衣領 (Matrix Trench Coat) + 二進制綠色代碼流
        case "skin_dark_hacker": {
          ctx.fillStyle = "#022c22";
          ctx.strokeStyle = "#00ff66";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-18, -23);
          ctx.lineTo(18, -23);
          ctx.lineTo(14, 22);
          ctx.lineTo(-14, 22);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#22c55e";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-8, -18);
          ctx.lineTo(-8, 14);
          ctx.moveTo(8, -18);
          ctx.lineTo(8, 14);
          ctx.stroke();
          this._drawCore(ctx, 0, -6, "#00ff66", 5);
          break;
        }
        // 8. 奈米生化戰警：外露金屬機械肋骨 + 綠色生化藥劑管
        case "skin_nano_cyborg": {
          ctx.fillStyle = "#0f291e";
          ctx.strokeStyle = "#84cc16";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-15, -23);
          ctx.lineTo(15, -23);
          ctx.lineTo(11, 16);
          ctx.lineTo(-11, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 2;
          for (let y = -14; y <= 8; y += 7) {
            ctx.beginPath();
            ctx.moveTo(-11, y);
            ctx.lineTo(-2, y + 2);
            ctx.moveTo(11, y);
            ctx.lineTo(2, y + 2);
            ctx.stroke();
          }
          this._drawCore(ctx, 0, -6, "#84cc16", 5.5);
          break;
        }
        // 9. 赤紅暴君重機甲：尖刺巨肩 + 熔岩發光散熱排氣槽
        case "skin_crimson_tyrant": {
          ctx.fillStyle = "#450a0a";
          ctx.strokeStyle = "#ef4444";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(-20, -25);
          ctx.lineTo(20, -25);
          ctx.lineTo(14, 18);
          ctx.lineTo(-14, 18);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#7f1d1d";
          ctx.beginPath();
          ctx.moveTo(-18, -25);
          ctx.lineTo(-30, -32);
          ctx.lineTo(-16, -14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(18, -25);
          ctx.lineTo(30, -32);
          ctx.lineTo(16, -14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#f97316";
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 10;
          ctx.fillRect(-6, 2, 12, 6);
          ctx.shadowBlur = 0;
          this._drawCore(ctx, 0, -9, "#ef4444", 6);
          break;
        }
        // 10. 極寒超導武姬：冰晶馬甲 + 浮空鑽石冰錐飾品
        case "skin_cryo_maiden": {
          ctx.fillStyle = "#075985";
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-14, -22);
          ctx.lineTo(14, -22);
          ctx.lineTo(10, 16);
          ctx.lineTo(-10, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          const iceRot = t * 2;
          ctx.fillStyle = "#e0f2fe";
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1;
          ctx.save();
          ctx.translate(-20, -18 + Math.sin(iceRot) * 3);
          ctx.beginPath();
          ctx.moveTo(0, -6);
          ctx.lineTo(4, 0);
          ctx.lineTo(0, 6);
          ctx.lineTo(-4, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
          this._drawCore(ctx, 0, -6, "#38bdf8", 5);
          break;
        }
        // 11. 虛空吞噬者：事件視界黑洞反應爐 + 虛空翅膀觸鬚
        case "skin_void_devourer": {
          ctx.fillStyle = "#0b0416";
          ctx.strokeStyle = "#9333ea";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(-15, -23);
          ctx.lineTo(15, -23);
          ctx.lineTo(11, 16);
          ctx.lineTo(-11, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "rgba(168, 85, 247, 0.6)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-10, -14);
          ctx.quadraticCurveTo(-26, -26 + Math.sin(t * 2) * 5, -34, -18);
          ctx.stroke();
          this._drawCore(ctx, 0, -6, "#9333ea", 7);
          break;
        }
        // 12. 太陽女武神：金色太陽浮雕胸甲 + 戰神披風
        case "skin_solar_valkyrie": {
          ctx.fillStyle = "#991b1b";
          ctx.beginPath();
          ctx.moveTo(-16, -20);
          ctx.lineTo(-24, 26);
          ctx.lineTo(4, 24);
          ctx.lineTo(14, -20);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#78350f";
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ff4500";
          ctx.shadowColor = "#ff4500";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(0, -6, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }
        // 13. 賽博歌姬音律：即時音波跳躍頻譜胸甲 (Equalizer Spectrum)
        case "skin_cyber_diva": {
          ctx.fillStyle = "#042f2e";
          ctx.strokeStyle = "#14b8a6";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-14, -22);
          ctx.lineTo(14, -22);
          ctx.lineTo(10, 16);
          ctx.lineTo(-10, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#2dd4bf";
          const barHeights = [4, 8, 12, 6, 10, 5];
          for (let i = 0; i < barHeights.length; i++) {
            const h = (Math.sin(t * 3 + i * 0.8) * 0.5 + 0.5) * barHeights[i] + 2;
            ctx.fillRect(-9 + i * 3.2, 2 - h, 2, h);
          }
          this._drawCore(ctx, 0, -8, "#2dd4bf", 5);
          break;
        }
        // ══════════════════════════════════════════
        // 14. 曜白裁決聖使：六翼幾何天翔光羽 (6 Geometric Light Wings) + 聖十字
        // ══════════════════════════════════════════
        case "skin_archangel_judicator": {
          ctx.save();
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 14;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
          ctx.lineWidth = 2.2;
          const wingFlap = Math.sin(t * 1.5) * 4;
          ctx.beginPath();
          ctx.moveTo(-10, -18);
          ctx.lineTo(-38, -36 + wingFlap);
          ctx.lineTo(-24, -14);
          ctx.moveTo(10, -18);
          ctx.lineTo(38, -36 + wingFlap);
          ctx.lineTo(24, -14);
          ctx.moveTo(-12, -10);
          ctx.lineTo(-44, -18 + wingFlap);
          ctx.lineTo(-20, -4);
          ctx.moveTo(12, -10);
          ctx.lineTo(44, -18 + wingFlap);
          ctx.lineTo(20, -4);
          ctx.moveTo(-10, -4);
          ctx.lineTo(-34, 4 + wingFlap);
          ctx.lineTo(-14, 4);
          ctx.moveTo(10, -4);
          ctx.lineTo(34, 4 + wingFlap);
          ctx.lineTo(14, 4);
          ctx.stroke();
          ctx.restore();
          ctx.fillStyle = "#f8fafc";
          ctx.strokeStyle = "#cbd5e1";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-16, -23);
          ctx.lineTo(16, -23);
          ctx.lineTo(12, 16);
          ctx.lineTo(-12, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#eab308";
          ctx.fillRect(-2, -14, 4, 16);
          ctx.fillRect(-7, -10, 14, 4);
          break;
        }
        // ══════════════════════════════════════════
        // 15. 黃金終極機神：雄獅龍頭巨型金肩甲 + 日冕光環 + 鎏金披風
        // ══════════════════════════════════════════
        case "skin_omega_emperor": {
          ctx.save();
          ctx.shadowColor = "#eab308";
          ctx.shadowBlur = 16;
          ctx.strokeStyle = "#fde047";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(0, -20, 22, 0, Math.PI * 2);
          ctx.stroke();
          for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
            ctx.beginPath();
            ctx.moveTo(Math.cos(a) * 22, -20 + Math.sin(a) * 22);
            ctx.lineTo(Math.cos(a) * 28, -20 + Math.sin(a) * 28);
            ctx.stroke();
          }
          ctx.restore();
          ctx.fillStyle = "#854d0e";
          ctx.strokeStyle = "#eab308";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(-18, -24);
          ctx.lineTo(18, -24);
          ctx.lineTo(13, 17);
          ctx.lineTo(-13, 17);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#eab308";
          ctx.beginPath();
          ctx.arc(-18, -22, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          this._drawCore(ctx, 0, -6, "#eab308", 7);
          break;
        }
      }
      ctx.fillStyle = "#090d16";
      ctx.fillRect(-11, 16, 22, 12);
      ctx.strokeRect(-11, 16, 22, 12);
      ctx.restore();
      return true;
    }
    // ─── 3. 專屬氣場與動態粒子 (Aura & Atmospheric Particles) ───
    drawAura(ctx, char, skin, t) {
      if (!this.isSciFi(skin)) return false;
      const id = skin.id;
      const cx = char.x;
      const cy = char.y - 45;
      ctx.save();
      switch (id) {
        // 1. 賽博武者：青藍全息像素方塊浮空
        case "skin_cyber_warrior": {
          ctx.fillStyle = "rgba(0, 243, 255, 0.4)";
          for (let i = 0; i < 4; i++) {
            const offX = Math.sin(t * 1.5 + i * 1.6) * 28;
            const offY = -((t * 20 + i * 25) % 80);
            ctx.fillRect(cx + offX, char.y + offY, 4, 4);
          }
          break;
        }
        // 2. 霓虹暗影刺客：粉紅櫻花瓣隨風飄飛
        case "skin_neon_shadow": {
          ctx.fillStyle = "rgba(255, 0, 127, 0.5)";
          for (let i = 0; i < 5; i++) {
            const offX = Math.sin(t * 1.2 + i * 1.3) * 32;
            const offY = -((t * 18 + i * 20) % 75);
            ctx.beginPath();
            ctx.ellipse(cx + offX, char.y + offY, 3, 1.5, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        // 3. 脈衝重裝執法官：金黃警示電弧與重壓震波
        case "skin_pulse_enforcer": {
          if (Math.sin(t * 4) > 0.4) {
            ctx.strokeStyle = "rgba(255, 215, 0, 0.6)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx - 15, cy - 10);
            ctx.lineTo(cx - 24, cy - 4);
            ctx.lineTo(cx - 18, cy + 12);
            ctx.stroke();
          }
          break;
        }
        // 4. 星穹量子浪人：靛藍星宿與流星光塵
        case "skin_cosmic_ronin": {
          ctx.fillStyle = "#a5b4fc";
          for (let i = 0; i < 4; i++) {
            const offX = Math.cos(t * 0.8 + i * 1.8) * 30;
            const offY = -((t * 15 + i * 22) % 85);
            ctx.beginPath();
            ctx.arc(cx + offX, char.y + offY, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        // 5. 雷霆神速遊俠：周身跳動黃金高壓閃電
        case "skin_volt_ranger": {
          ctx.strokeStyle = "#facc15";
          ctx.lineWidth = 1.4;
          const spark = Math.sin(t * 5);
          if (spark > 0) {
            ctx.beginPath();
            ctx.moveTo(cx + 12, cy - 20);
            ctx.lineTo(cx + 22, cy - 8);
            ctx.lineTo(cx + 16, cy + 8);
            ctx.lineTo(cx + 26, cy + 24);
            ctx.stroke();
          }
          break;
        }
        // 6. 深淵幽靈特工：聲納擴散圓環
        case "skin_abyssal_ghost": {
          const ringProgress = t * 0.8 % 1;
          ctx.strokeStyle = `rgba(6, 182, 212, ${1 - ringProgress})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.ellipse(cx, char.y - 10, 25 * ringProgress + 5, 8 * ringProgress + 2, 0, 0, Math.PI * 2);
          ctx.stroke();
          break;
        }
        // 7. 暗黑駭客：向上浮升的綠色 0 與 1
        case "skin_dark_hacker": {
          ctx.fillStyle = "rgba(0, 255, 102, 0.6)";
          ctx.font = "8px monospace";
          for (let i = 0; i < 3; i++) {
            const offX = Math.sin(i * 2.2) * 26;
            const offY = -((t * 22 + i * 30) % 85);
            ctx.fillText(i % 2 === 0 ? "0" : "1", cx + offX, char.y + offY);
          }
          break;
        }
        // 8. 奈米生化戰警：綠色生化修復微粒
        case "skin_nano_cyborg": {
          ctx.fillStyle = "#84cc16";
          for (let i = 0; i < 4; i++) {
            const offX = Math.sin(t * 2 + i * 1.5) * 22;
            const offY = -((t * 20 + i * 22) % 70);
            ctx.beginPath();
            ctx.arc(cx + offX, char.y + offY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        // 9. 赤紅暴君重機甲：上升熔岩火星與濃煙
        case "skin_crimson_tyrant": {
          ctx.fillStyle = "#f97316";
          for (let i = 0; i < 5; i++) {
            const offX = Math.sin(t * 1.8 + i * 1.4) * 28;
            const offY = -((t * 25 + i * 20) % 90);
            ctx.beginPath();
            ctx.arc(cx + offX, char.y + offY, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        // 10. 極寒超導武姬：飄落冰晶雪花
        case "skin_cryo_maiden": {
          ctx.fillStyle = "#e0f2fe";
          for (let i = 0; i < 5; i++) {
            const offX = Math.sin(t * 1.1 + i * 1.5) * 32;
            const offY = (t * 16 + i * 20) % 80 - 60;
            ctx.beginPath();
            ctx.arc(cx + offX, char.y + offY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        // 11. 虛空吞噬者：向中心吸引之暗物質奇點
        case "skin_void_devourer": {
          ctx.fillStyle = "#c084fc";
          for (let i = 0; i < 4; i++) {
            const dist = 40 - (t * 18 + i * 20) % 40;
            const angle = t * 2 + i * 1.5;
            ctx.beginPath();
            ctx.arc(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        // 12. 太陽女武神：金色太陽光羽閃爍
        case "skin_solar_valkyrie": {
          ctx.fillStyle = "#fbbf24";
          for (let i = 0; i < 4; i++) {
            const offX = Math.sin(t * 1.4 + i * 1.7) * 26;
            const offY = -((t * 20 + i * 24) % 80);
            ctx.beginPath();
            ctx.arc(cx + offX, char.y + offY, 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        // 13. 賽博歌姬音律：漂浮動態音符 (♪ ♫)
        case "skin_cyber_diva": {
          ctx.fillStyle = "#2dd4bf";
          ctx.font = "10px sans-serif";
          const offX1 = Math.sin(t * 1.3) * 25;
          const offY1 = -(t * 18 % 75);
          ctx.fillText("\u266A", cx + offX1, char.y + offY1);
          const offX2 = Math.cos(t * 1.5) * 28;
          const offY2 = -((t * 18 + 35) % 75);
          ctx.fillText("\u266B", cx + offX2, char.y + offY2);
          break;
        }
        // 14. 曜白裁決聖使：純白神聖羽毛飄落
        case "skin_archangel_judicator": {
          ctx.fillStyle = "#ffffff";
          for (let i = 0; i < 4; i++) {
            const offX = Math.sin(t * 0.9 + i * 1.5) * 34;
            const offY = -((t * 16 + i * 22) % 85);
            ctx.beginPath();
            ctx.ellipse(cx + offX, char.y + offY, 3.5, 1.8, Math.PI / 3, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        // 15. 黃金終極機神：璀璨帝皇金輝光暈
        case "skin_omega_emperor": {
          ctx.fillStyle = "#fde047";
          for (let i = 0; i < 5; i++) {
            const offX = Math.cos(t * 1.2 + i * 1.4) * 30;
            const offY = -((t * 20 + i * 25) % 85);
            ctx.beginPath();
            ctx.arc(cx + offX, char.y + offY, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
      }
      ctx.restore();
      return true;
    }
    // ─── 4. 專屬護盾防護罩渲染 (Guard Shield) ───
    drawGuardShield(ctx, stance, skin, t) {
      if (!this.isSciFi(skin)) return false;
      const id = skin.id;
      const isHigh = stance === "high";
      const shieldY = isHigh ? -50 : -25;
      const themeCol = skin.themeColor || "#00f3ff";
      ctx.save();
      ctx.shadowColor = themeCol;
      ctx.shadowBlur = 18;
      switch (id) {
        // 1. 賽博武者：全息武士家紋八角陣 (Octagonal Samurai Mon)
        case "skin_cyber_warrior": {
          ctx.strokeStyle = "#00f3ff";
          ctx.fillStyle = "rgba(0, 243, 255, 0.2)";
          ctx.lineWidth = 2.5;
          this._drawPolygon(ctx, 28, shieldY, 26, 8);
          break;
        }
        // 2. 霓虹暗影刺客：紫櫻煙幕幾何盾 (Cherry Blossom Smokescreen)
        case "skin_neon_shadow": {
          ctx.strokeStyle = "#ff007f";
          ctx.fillStyle = "rgba(255, 0, 127, 0.25)";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.ellipse(26, shieldY, 22, 32, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        }
        // 3. 脈衝重裝執法官：金黑重裝防暴透明大盾 (SWAT Riot Blast Shield)
        case "skin_pulse_enforcer": {
          ctx.strokeStyle = "#ffd700";
          ctx.fillStyle = "rgba(251, 191, 36, 0.3)";
          ctx.lineWidth = 3;
          ctx.strokeRect(18, shieldY - 34, 18, 68);
          ctx.fillRect(18, shieldY - 34, 18, 68);
          break;
        }
        // 4. 星穹量子浪人：旋轉斗笠式星辰光輪盾
        case "skin_cosmic_ronin": {
          ctx.strokeStyle = "#818cf8";
          ctx.fillStyle = "rgba(129, 140, 248, 0.22)";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(28, shieldY, 28, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        }
        // 5. 雷霆神速遊俠：高壓電磁閃電防禦罩
        case "skin_volt_ranger": {
          ctx.strokeStyle = "#facc15";
          ctx.fillStyle = "rgba(250, 204, 21, 0.22)";
          ctx.lineWidth = 2.5;
          this._drawPolygon(ctx, 28, shieldY, 27, 6);
          break;
        }
        // 6. 深淵幽靈特工：水冷高壓抗壓水泡力場 (Hydro-bubble)
        case "skin_abyssal_ghost": {
          ctx.strokeStyle = "#06b6d4";
          ctx.fillStyle = "rgba(6, 182, 212, 0.25)";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(26, shieldY, 26, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        }
        // 7. 暗黑駭客：綠色代碼防火牆 (Matrix Code Firewall)
        case "skin_dark_hacker": {
          ctx.strokeStyle = "#00ff66";
          ctx.fillStyle = "rgba(0, 255, 102, 0.2)";
          ctx.lineWidth = 2.5;
          ctx.strokeRect(20, shieldY - 32, 14, 64);
          ctx.fillRect(20, shieldY - 32, 14, 64);
          break;
        }
        // 8. 奈米生化戰警：蜂巢綠色生化六角盾 (Bio-Nanite Honeycomb)
        case "skin_nano_cyborg": {
          ctx.strokeStyle = "#84cc16";
          ctx.fillStyle = "rgba(132, 204, 22, 0.25)";
          ctx.lineWidth = 2.5;
          this._drawPolygon(ctx, 28, shieldY, 26, 6);
          break;
        }
        // 9. 赤紅暴君重機甲：地裂熔岩固態裝甲盾 (Magma Crust Shield)
        case "skin_crimson_tyrant": {
          ctx.strokeStyle = "#ef4444";
          ctx.fillStyle = "rgba(239, 68, 68, 0.3)";
          ctx.lineWidth = 3.5;
          this._drawPolygon(ctx, 28, shieldY, 28, 5);
          break;
        }
        // 10. 極寒超導武姬：尖錐冰川冰壁 (Spiked Glacier Wall)
        case "skin_cryo_maiden": {
          ctx.strokeStyle = "#38bdf8";
          ctx.fillStyle = "rgba(56, 189, 248, 0.3)";
          ctx.lineWidth = 2.5;
          this._drawPolygon(ctx, 28, shieldY, 27, 4);
          break;
        }
        // 11. 虛空吞噬者：事件視界吸積盤暗盾 (Singularity Event Horizon)
        case "skin_void_devourer": {
          ctx.strokeStyle = "#9333ea";
          ctx.fillStyle = "rgba(147, 51, 234, 0.35)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(28, shieldY, 27, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        }
        // 12. 太陽女武神：真金烈陽神聖大盾 (Solar Aegis)
        case "skin_solar_valkyrie": {
          ctx.strokeStyle = "#f59e0b";
          ctx.fillStyle = "rgba(245, 158, 11, 0.3)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(26, shieldY, 20, 32, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        }
        // 13. 賽博歌姬音律：音波同心漣漪盾 (Sonic Pulse Barrier)
        case "skin_cyber_diva": {
          ctx.strokeStyle = "#14b8a6";
          ctx.fillStyle = "rgba(20, 184, 166, 0.25)";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(28, shieldY, 26, -Math.PI / 2, Math.PI / 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(28, shieldY, 18, -Math.PI / 2, Math.PI / 2);
          ctx.stroke();
          break;
        }
        // 14. 曜白裁決聖使：六翼合攏聖光神聖守護 (Seraphic Wings Guard)
        case "skin_archangel_judicator": {
          ctx.strokeStyle = "#f8fafc";
          ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(28, shieldY, 28, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        }
        // 15. 黃金終極機神：萬丈帝皇金輪結界 (Imperial Golden Wheel)
        case "skin_omega_emperor": {
          ctx.strokeStyle = "#eab308";
          ctx.fillStyle = "rgba(234, 179, 8, 0.35)";
          ctx.lineWidth = 3.5;
          this._drawPolygon(ctx, 28, shieldY, 28, 8);
          break;
        }
        default:
          ctx.restore();
          return false;
      }
      ctx.restore();
      return true;
    }
    // ─── 輔助繪圖函式 ───
    _drawCore(ctx, x, y, color, radius) {
      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    _drawPolygon(ctx, cx, cy, radius, sides) {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = i * 2 * Math.PI / sides;
        const px = cx + Math.cos(a) * radius;
        const py = cy + Math.sin(a) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  };
  var scifiSkinsRenderer = new SciFiSkinsRenderer();

  // js/engine/brawl_skins_renderer.js
  var BrawlSkinsRenderer = class {
    constructor() {
      this.brawlSkinIds = /* @__PURE__ */ new Set([
        "skin_brawl_shelly",
        "skin_brawl_colt",
        "skin_brawl_spike",
        "skin_brawl_el_primo",
        "skin_brawl_crow",
        "skin_brawl_leon"
      ]);
    }
    isBrawl(skin) {
      return skin && skin.id && this.brawlSkinIds.has(skin.id);
    }
    _safeLinearGrad(ctx, x0, y0, x1, y1, stops, fallbackColor) {
      if (ctx && typeof ctx.createLinearGradient === "function") {
        try {
          const g = ctx.createLinearGradient(x0, y0, x1, y1);
          if (g && typeof g.addColorStop === "function") {
            for (const stop of stops) {
              g.addColorStop(stop[0], stop[1]);
            }
            return g;
          }
        } catch (e) {
        }
      }
      return fallbackColor;
    }
    _safeRadialGrad(ctx, x0, y0, r0, x1, y1, r1, stops, fallbackColor) {
      if (ctx && typeof ctx.createRadialGradient === "function") {
        try {
          const g = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
          if (g && typeof g.addColorStop === "function") {
            for (const stop of stops) {
              g.addColorStop(stop[0], stop[1]);
            }
            return g;
          }
        } catch (e) {
        }
      }
      return fallbackColor;
    }
    // ─── 輔助繪圖工具 ───
    _drawStar(ctx, cx, cy, spikes, outerR, innerR, fillStyle, strokeStyle = null, lineWidth = 1) {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerR);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerR;
        y = cy + Math.sin(rot) * outerR;
        ctx.lineTo(x, y);
        rot += step;
        x = cx + Math.cos(rot) * innerR;
        y = cy + Math.sin(rot) * innerR;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerR);
      ctx.closePath();
      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
      if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      ctx.restore();
    }
    _drawEyes(ctx, x, y, size = 6, pupilColor = "#1e1b4b", highlightColor = "#ffffff", isWinking = false) {
      ctx.save();
      if (isWinking) {
        ctx.strokeStyle = pupilColor;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(x, y + 1, size * 0.9, Math.PI * 0.1, Math.PI * 0.9);
        ctx.stroke();
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.ellipse(x, y, size, size * 1.25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = pupilColor;
        ctx.beginPath();
        ctx.ellipse(x + 1, y, size * 0.65, size * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = highlightColor;
        ctx.beginPath();
        ctx.arc(x, y - size * 0.4, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + size * 0.4, y + size * 0.3, size * 0.18, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    // ─── 1. 特殊氣場與光環 (Special Brawl Aura) ───
    drawAura(ctx, char, skin, t) {
      if (!this.isBrawl(skin)) return;
      const id = skin.id;
      ctx.save();
      switch (id) {
        case "skin_brawl_shelly": {
          ctx.shadowColor = "#facc15";
          ctx.shadowBlur = 15;
          for (let i = 0; i < 4; i++) {
            const ang = (t * 0.08 + i * (Math.PI / 2)) % (Math.PI * 2);
            const r = 28 + Math.sin(t * 0.1 + i) * 6;
            const px = Math.cos(ang) * r;
            const py = -45 + Math.sin(ang) * 14;
            ctx.fillStyle = i % 2 === 0 ? "#facc15" : "#a855f7";
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        case "skin_brawl_colt": {
          ctx.shadowColor = "#ffd700";
          ctx.shadowBlur = 16;
          for (let i = 0; i < 3; i++) {
            const prog = (t * 0.04 + i * 0.33) % 1;
            const px = -25 + prog * 50;
            const py = -10 - prog * 70;
            const alpha = Math.sin(prog * Math.PI);
            ctx.globalAlpha = alpha;
            this._drawStar(ctx, px, py, 6, 4.5, 2.2, "#ffd700");
          }
          break;
        }
        case "skin_brawl_spike": {
          ctx.shadowColor = "#ec4899";
          ctx.shadowBlur = 18;
          for (let i = 0; i < 4; i++) {
            const prog = (t * 0.035 + i * 0.25) % 1;
            const px = Math.sin(t * 0.06 + i * 1.5) * 26;
            const py = -15 - prog * 65;
            ctx.globalAlpha = Math.sin(prog * Math.PI) * 0.85;
            ctx.fillStyle = i % 2 === 0 ? "#f472b6" : "#4ade80";
            ctx.beginPath();
            ctx.ellipse(px, py, 3.5, 5, Math.sin(t * 0.1 + i), 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        case "skin_brawl_el_primo": {
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 20;
          for (let i = 0; i < 5; i++) {
            const prog = (t * 0.05 + i * 0.2) % 1;
            const px = Math.sin(t * 0.1 + i * 2) * (24 - prog * 8);
            const py = -prog * 85;
            ctx.globalAlpha = (1 - prog) * 0.9;
            this._drawStar(ctx, px, py, 5, 4.5, 2.2, "#fbbf24", "#f59e0b", 0.8);
          }
          break;
        }
        case "skin_brawl_crow": {
          ctx.shadowColor = "#10b981";
          ctx.shadowBlur = 18;
          for (let i = 0; i < 4; i++) {
            const prog = (t * 0.045 + i * 0.25) % 1;
            const px = Math.cos(t * 0.08 + i * 2) * 25;
            const py = -35 + Math.sin(t * 0.08 + i * 2) * 20;
            ctx.globalAlpha = Math.sin(prog * Math.PI) * 0.8;
            ctx.fillStyle = "#10b981";
            ctx.beginPath();
            ctx.arc(px, py, 3 + prog * 3, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        case "skin_brawl_leon": {
          ctx.shadowColor = "#2dd4bf";
          ctx.shadowBlur = 16;
          for (let i = 0; i < 3; i++) {
            const r = 18 + (t * 1.5 + i * 20) % 45;
            const alpha = Math.max(0, 1 - r / 50);
            ctx.globalAlpha = alpha * 0.6;
            ctx.strokeStyle = i % 2 === 0 ? "#10b981" : "#f43f5e";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(0, -45, r, r * 0.45, 0, 0, Math.PI * 2);
            ctx.stroke();
          }
          break;
        }
      }
      ctx.restore();
    }
    // ─── 2. 角色精緻頭部 (Expressive HD Heads) ───
    drawHead(ctx, head, skin) {
      if (!this.isBrawl(skin)) return false;
      const id = skin.id;
      ctx.save();
      ctx.translate(head.x, head.y);
      ctx.rotate(head.angle);
      switch (id) {
        // ══════════════════════════════════════════════════
        // 1. 雪莉・散彈獵手 (Shelly)
        // ══════════════════════════════════════════════════
        case "skin_brawl_shelly": {
          const hairGrad = this._safeLinearGrad(
            ctx,
            -16,
            -18,
            16,
            16,
            [
              [0, "#a855f7"],
              [0.5, "#7e22ce"],
              [1, "#581c87"]
            ],
            "#7e22ce"
          );
          ctx.fillStyle = hairGrad;
          ctx.beginPath();
          ctx.arc(-10, -5, 12, 0, Math.PI * 2);
          ctx.arc(-14, 4, 9, 0, Math.PI * 2);
          ctx.arc(-8, -12, 10, 0, Math.PI * 2);
          ctx.arc(4, -14, 11, 0, Math.PI * 2);
          ctx.fill();
          const skinGrad = this._safeLinearGrad(
            ctx,
            0,
            -10,
            0,
            14,
            [
              [0, "#fed7aa"],
              [1, "#fdba74"]
            ],
            "#fed7aa"
          );
          ctx.fillStyle = skinGrad;
          ctx.strokeStyle = "#ea580c";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-10, 2);
          ctx.quadraticCurveTo(-11, -8, -3, -12);
          ctx.quadraticCurveTo(8, -12, 12, -4);
          ctx.quadraticCurveTo(14, 6, 8, 13);
          ctx.quadraticCurveTo(0, 16, -6, 13);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#9333ea";
          ctx.beginPath();
          ctx.moveTo(-6, -12);
          ctx.quadraticCurveTo(2, -8, 6, -3);
          ctx.quadraticCurveTo(3, -5, 0, -6);
          ctx.quadraticCurveTo(-4, -5, -6, -10);
          ctx.closePath();
          ctx.fill();
          this._drawEyes(ctx, 4, 0, 5, "#581c87", "#ffffff");
          const scarfGrad = this._safeLinearGrad(
            ctx,
            -8,
            8,
            12,
            18,
            [
              [0, "#fde047"],
              [1, "#ca8a04"]
            ],
            "#fde047"
          );
          ctx.fillStyle = scarfGrad;
          ctx.strokeStyle = "#a16207";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-8, 9);
          ctx.quadraticCurveTo(0, 11, 10, 8);
          ctx.lineTo(12, 13);
          ctx.lineTo(2, 20);
          ctx.lineTo(-7, 14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fef08a";
          ctx.beginPath();
          ctx.arc(3, 14, 2.5, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        // ══════════════════════════════════════════════════
        // 2. 柯爾特・雙槍神警 (Colt)
        // ══════════════════════════════════════════════════
        case "skin_brawl_colt": {
          const pompadourGrad = this._safeLinearGrad(
            ctx,
            0,
            -26,
            8,
            0,
            [
              [0, "#f87171"],
              [0.4, "#ef4444"],
              [1, "#b91c1c"]
            ],
            "#ef4444"
          );
          ctx.fillStyle = pompadourGrad;
          ctx.strokeStyle = "#991b1b";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(-11, -5);
          ctx.quadraticCurveTo(-14, -18, -4, -22);
          ctx.quadraticCurveTo(6, -26, 14, -18);
          ctx.quadraticCurveTo(18, -10, 13, -3);
          ctx.quadraticCurveTo(8, -8, 2, -10);
          ctx.quadraticCurveTo(-4, -10, -10, -5);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-2, -20);
          ctx.quadraticCurveTo(5, -22, 11, -16);
          ctx.stroke();
          ctx.fillStyle = "#fed7aa";
          ctx.strokeStyle = "#ea580c";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-9, -2);
          ctx.lineTo(8, -4);
          ctx.lineTo(13, 2);
          ctx.lineTo(10, 11);
          ctx.lineTo(2, 16);
          ctx.lineTo(-7, 12);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#dc2626";
          ctx.fillRect(-10, -3, 3, 7);
          this._drawEyes(ctx, 4, 3, 4.5, "#0284c7", "#ffffff");
          ctx.strokeStyle = "#b45309";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(5, 11, 4, 0.1 * Math.PI, 0.9 * Math.PI);
          ctx.stroke();
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(4, 10, 3, 2);
          break;
        }
        // ══════════════════════════════════════════════════
        // 3. 斯派克・傳奇仙人掌 (Spike)
        // ══════════════════════════════════════════════════
        case "skin_brawl_spike": {
          const cactusGrad = this._safeRadialGrad(
            ctx,
            -3,
            -4,
            2,
            0,
            0,
            16,
            [
              [0, "#86efac"],
              [0.6, "#22c55e"],
              [1, "#15803d"]
            ],
            "#22c55e"
          );
          ctx.fillStyle = cactusGrad;
          ctx.strokeStyle = "#14532d";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(0, 0, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#0f172a";
          const spikes = [
            { x: -14, y: -4, r: -0.4 },
            { x: -12, y: 7, r: 0.3 },
            { x: 13, y: -5, r: 0.5 },
            { x: 12, y: 6, r: -0.3 },
            { x: -7, y: -13, r: -0.2 }
          ];
          spikes.forEach((s) => {
            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.r);
            ctx.beginPath();
            ctx.moveTo(-1.5, 0);
            ctx.lineTo(0, -4.5);
            ctx.lineTo(1.5, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          });
          ctx.fillStyle = "#0f172a";
          ctx.beginPath();
          ctx.arc(-4, 0, 3.8, 0, Math.PI * 2);
          ctx.arc(5, 0, 3.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(0, 5);
          ctx.lineTo(3, 8);
          ctx.lineTo(-3, 8);
          ctx.closePath();
          ctx.fill();
          ctx.save();
          ctx.translate(0, -15);
          ctx.fillStyle = "#ec4899";
          for (let p = 0; p < 5; p++) {
            const pAng = p * Math.PI * 2 / 5;
            ctx.beginPath();
            ctx.arc(Math.cos(pAng) * 5, Math.sin(pAng) * 5, 4, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = "#fde047";
          ctx.beginPath();
          ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          break;
        }
        // ══════════════════════════════════════════════════
        // 4. 普里莫・摔角霸王 (El Primo)
        // ══════════════════════════════════════════════════
        case "skin_brawl_el_primo": {
          const maskGrad = this._safeLinearGrad(
            ctx,
            -14,
            -14,
            14,
            14,
            [
              [0, "#3b82f6"],
              [0.5, "#2563eb"],
              [1, "#1d4ed8"]
            ],
            "#2563eb"
          );
          ctx.fillStyle = maskGrad;
          ctx.strokeStyle = "#1e3a8a";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(-11, 4);
          ctx.quadraticCurveTo(-15, -6, -11, -14);
          ctx.quadraticCurveTo(0, -18, 11, -14);
          ctx.quadraticCurveTo(15, -6, 12, 5);
          ctx.lineTo(9, 13);
          ctx.lineTo(-8, 13);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          this._drawStar(ctx, 0, -9, 4, 5.5, 2.4, "#ffd700", "#b45309", 1);
          ctx.fillStyle = "#ffd700";
          ctx.strokeStyle = "#d97706";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(-4, -1, 5, 3.5, -0.2, 0, Math.PI * 2);
          ctx.ellipse(5, -1, 5, 3.5, 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-3, -1, 2.2, 0, Math.PI * 2);
          ctx.arc(4, -1, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#f59e0b";
          ctx.beginPath();
          ctx.moveTo(-5, 7);
          ctx.lineTo(6, 7);
          ctx.lineTo(4, 15);
          ctx.lineTo(-3, 15);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#78350f";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(-2, 10);
          ctx.lineTo(4, 10);
          ctx.stroke();
          break;
        }
        // ══════════════════════════════════════════════════
        // 5. 黑鴉・暗影劇毒刺客 (Crow)
        // ══════════════════════════════════════════════════
        case "skin_brawl_crow": {
          ctx.fillStyle = "#0f172a";
          ctx.strokeStyle = "#1e293b";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(-7, -2);
          ctx.lineTo(-14, -10);
          ctx.lineTo(-8, -12);
          ctx.lineTo(-12, -20);
          ctx.lineTo(-3, -16);
          ctx.lineTo(2, -22);
          ctx.lineTo(6, -14);
          ctx.lineTo(12, -6);
          ctx.lineTo(6, 8);
          ctx.lineTo(-4, 7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          const beakGrad = this._safeLinearGrad(
            ctx,
            4,
            -4,
            18,
            5,
            [
              [0, "#fde047"],
              [0.6, "#eab308"],
              [1, "#ca8a04"]
            ],
            "#eab308"
          );
          ctx.fillStyle = beakGrad;
          ctx.strokeStyle = "#854d0e";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(5, -4);
          ctx.quadraticCurveTo(14, -4, 19, 3);
          ctx.quadraticCurveTo(12, 6, 4, 4);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#713f12";
          ctx.beginPath();
          ctx.arc(8, -1, 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.ellipse(2, -3, 4, 3, 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#facc15";
          ctx.beginPath();
          ctx.arc(2.5, -3, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#020617";
          ctx.beginPath();
          ctx.ellipse(3, -3, 1, 2, 0.1, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        // ══════════════════════════════════════════════════
        // 6. 里昂・變色龍神隱客 (Leon)
        // ══════════════════════════════════════════════════
        case "skin_brawl_leon": {
          const hoodGrad = this._safeLinearGrad(
            ctx,
            -14,
            -14,
            14,
            14,
            [
              [0, "#34d399"],
              [0.5, "#10b981"],
              [1, "#059669"]
            ],
            "#10b981"
          );
          ctx.fillStyle = hoodGrad;
          ctx.strokeStyle = "#065f46";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(-11, 4);
          ctx.quadraticCurveTo(-15, -6, -10, -14);
          ctx.quadraticCurveTo(0, -17, 10, -14);
          ctx.quadraticCurveTo(15, -6, 12, 4);
          ctx.lineTo(8, 14);
          ctx.lineTo(-7, 14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#facc15";
          ctx.strokeStyle = "#ca8a04";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(-5, -14, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#020617";
          ctx.beginPath();
          ctx.ellipse(-5, -14, 1.6, 3.8, 0.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#facc15";
          ctx.strokeStyle = "#ca8a04";
          ctx.beginPath();
          ctx.arc(5, -14, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#020617";
          ctx.beginPath();
          ctx.ellipse(5, -14, 1.6, 3.8, -0.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#064e3b";
          ctx.beginPath();
          ctx.arc(0, 0, 10, 0.1 * Math.PI, 0.9 * Math.PI);
          ctx.fill();
          ctx.fillStyle = "#fed7aa";
          ctx.beginPath();
          ctx.moveTo(-5, 4);
          ctx.lineTo(6, 4);
          ctx.lineTo(3, 12);
          ctx.lineTo(-3, 12);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#b45309";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(1, 7, 3, 0.1 * Math.PI, 0.8 * Math.PI);
          ctx.stroke();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(3, 8);
          ctx.lineTo(12, 11);
          ctx.stroke();
          ctx.fillStyle = "#f43f5e";
          ctx.beginPath();
          ctx.arc(13, 12, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(13, 12, 2, 0, Math.PI * 1.5);
          ctx.stroke();
          break;
        }
      }
      ctx.restore();
      return true;
    }
    // ─── 3. 角色服裝與軀幹 (Detailed Outfits & Torsos) ───
    drawTorso(ctx, torso, skin, t) {
      if (!this.isBrawl(skin)) return false;
      const id = skin.id;
      ctx.save();
      ctx.translate(torso.x, torso.y);
      ctx.rotate(torso.angle);
      switch (id) {
        // ══════════════════════════════════════════════════
        // 1. 雪莉・散彈獵手 (Shelly)
        // ══════════════════════════════════════════════════
        case "skin_brawl_shelly": {
          ctx.fillStyle = "#1e3a8a";
          ctx.strokeStyle = "#172554";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-14, -18, 28, 32, 6);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#f8fafc";
          ctx.beginPath();
          ctx.moveTo(-7, -18);
          ctx.lineTo(7, -18);
          ctx.lineTo(0, -9);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#78350f";
          ctx.fillRect(-12, -4, 24, 6);
          for (let s = 0; s < 4; s++) {
            const sx = -9 + s * 6;
            ctx.fillStyle = "#dc2626";
            ctx.fillRect(sx, -6, 4, 8);
            ctx.fillStyle = "#fbbf24";
            ctx.fillRect(sx, 0, 4, 3);
          }
          ctx.fillStyle = "#451a03";
          ctx.fillRect(-15, 14, 30, 8);
          ctx.fillStyle = "#fbbf24";
          ctx.strokeStyle = "#b45309";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 18, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        }
        // ══════════════════════════════════════════════════
        // 2. 柯爾特・雙槍神警 (Colt)
        // ══════════════════════════════════════════════════
        case "skin_brawl_colt": {
          ctx.fillStyle = "#f8fafc";
          ctx.fillRect(-12, -18, 24, 30);
          ctx.fillStyle = "#0f172a";
          ctx.beginPath();
          ctx.moveTo(-2, -16);
          ctx.lineTo(2, -16);
          ctx.lineTo(3, -4);
          ctx.lineTo(0, -1);
          ctx.lineTo(-3, -4);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#1d4ed8";
          ctx.strokeStyle = "#1e3a8a";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-13, -18);
          ctx.lineTo(-4, -18);
          ctx.lineTo(-2, 14);
          ctx.lineTo(-13, 14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(13, -18);
          ctx.lineTo(4, -18);
          ctx.lineTo(2, 14);
          ctx.lineTo(13, 14);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          this._drawStar(ctx, -7, -8, 6, 4.2, 2.2, "#ffd700", "#b45309", 0.8);
          ctx.fillStyle = "#78350f";
          ctx.fillRect(-15, 14, 30, 8);
          this._drawStar(ctx, 0, 18, 5, 5.5, 2.6, "#ffd700", "#b45309", 1);
          break;
        }
        // ══════════════════════════════════════════════════
        // 3. 斯派克・傳奇仙人掌 (Spike)
        // ══════════════════════════════════════════════════
        case "skin_brawl_spike": {
          const cBodyGrad = this._safeLinearGrad(
            ctx,
            0,
            -18,
            0,
            18,
            [
              [0, "#22c55e"],
              [1, "#15803d"]
            ],
            "#22c55e"
          );
          ctx.fillStyle = cBodyGrad;
          ctx.strokeStyle = "#14532d";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-15, -18, 30, 34, 10);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#0f172a";
          ctx.beginPath();
          ctx.moveTo(-12, -4);
          ctx.lineTo(-15, -6);
          ctx.lineTo(-12, -8);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(12, 2);
          ctx.lineTo(15, 0);
          ctx.lineTo(12, -2);
          ctx.fill();
          ctx.fillStyle = "#7e22ce";
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.roundRect(-13, -12, 26, 22, 6);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(0, -4, 2, 0, Math.PI * 2);
          ctx.arc(0, 3, 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        // ══════════════════════════════════════════════════
        // 4. 普里莫・摔角霸王 (El Primo)
        // ══════════════════════════════════════════════════
        case "skin_brawl_el_primo": {
          const skinGrad = this._safeLinearGrad(
            ctx,
            0,
            -18,
            0,
            14,
            [
              [0, "#f59e0b"],
              [1, "#d97706"]
            ],
            "#f59e0b"
          );
          ctx.fillStyle = skinGrad;
          ctx.strokeStyle = "#92400e";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.roundRect(-16, -18, 32, 32, 6);
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "rgba(120, 53, 15, 0.4)";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-11, -8);
          ctx.quadraticCurveTo(-5, -4, 0, -8);
          ctx.quadraticCurveTo(5, -4, 11, -8);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, -8);
          ctx.lineTo(0, 12);
          ctx.moveTo(-6, 2);
          ctx.lineTo(6, 2);
          ctx.moveTo(-5, 8);
          ctx.lineTo(5, 8);
          ctx.stroke();
          ctx.fillStyle = "#1e3a8a";
          ctx.fillRect(-17, 12, 34, 10);
          const beltGrad = this._safeLinearGrad(
            ctx,
            -10,
            10,
            10,
            22,
            [
              [0, "#fde047"],
              [0.5, "#eab308"],
              [1, "#ca8a04"]
            ],
            "#eab308"
          );
          ctx.fillStyle = beltGrad;
          ctx.strokeStyle = "#78350f";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(-9, 11, 18, 12, 3);
          ctx.fill();
          ctx.stroke();
          this._drawStar(ctx, 0, 17, 5, 4.5, 2.2, "#ef4444", "#ffd700", 0.8);
          break;
        }
        // ══════════════════════════════════════════════════
        // 5. 黑鴉・暗影劇毒刺客 (Crow)
        // ══════════════════════════════════════════════════
        case "skin_brawl_crow": {
          const leatherGrad = this._safeLinearGrad(
            ctx,
            0,
            -18,
            0,
            18,
            [
              [0, "#1e293b"],
              [1, "#020617"]
            ],
            "#1e293b"
          );
          ctx.fillStyle = leatherGrad;
          ctx.strokeStyle = "#334155";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-14, -18, 28, 34, 6);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#0f172a";
          ctx.beginPath();
          ctx.moveTo(-14, -18);
          ctx.lineTo(-4, -10);
          ctx.lineTo(-12, -4);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(14, -18);
          ctx.lineTo(4, -10);
          ctx.lineTo(12, -4);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(0, -10);
          ctx.lineTo(0, 15);
          ctx.stroke();
          ctx.fillStyle = "#f8fafc";
          ctx.beginPath();
          ctx.arc(-6, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#020617";
          ctx.fillRect(-15, 14, 30, 8);
          ctx.fillStyle = "#cbd5e1";
          for (let i = 0; i < 4; i++) {
            ctx.fillRect(-10 + i * 7, 16, 3, 3);
          }
          break;
        }
        // ══════════════════════════════════════════════════
        // 6. 里昂・變色龍神隱客 (Leon)
        // ══════════════════════════════════════════════════
        case "skin_brawl_leon": {
          const hoodieGrad = this._safeLinearGrad(
            ctx,
            0,
            -18,
            0,
            18,
            [
              [0, "#10b981"],
              [1, "#047857"]
            ],
            "#10b981"
          );
          ctx.fillStyle = hoodieGrad;
          ctx.strokeStyle = "#065f46";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.roundRect(-14, -18, 28, 32, 6);
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = "#facc15";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, -16);
          ctx.lineTo(0, 14);
          ctx.stroke();
          ctx.fillStyle = "#059669";
          ctx.strokeStyle = "#047857";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-10, 4);
          ctx.lineTo(10, 4);
          ctx.lineTo(12, 13);
          ctx.lineTo(-12, 13);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#1d4ed8";
          ctx.fillRect(-14, 14, 28, 8);
          break;
        }
      }
      ctx.restore();
      return true;
    }
    // ─── 4. 角色手臂與武器道具 (Arms & Signature Weapons) ───
    drawArm(ctx, arm, skin, layer) {
      if (!this.isBrawl(skin)) return false;
      const id = skin.id;
      const isBack = layer === "backArm";
      ctx.save();
      ctx.translate(arm.shoulderX, arm.shoulderY);
      ctx.rotate(arm.upperAngle);
      let sleeveColor = "#1e3a8a";
      let skinColor = "#fed7aa";
      if (id === "skin_brawl_shelly") {
        sleeveColor = isBack ? "#172554" : "#1e3a8a";
        skinColor = "#fed7aa";
      } else if (id === "skin_brawl_colt") {
        sleeveColor = "#f8fafc";
        skinColor = "#fed7aa";
      } else if (id === "skin_brawl_spike") {
        sleeveColor = "#22c55e";
        skinColor = "#15803d";
      } else if (id === "skin_brawl_el_primo") {
        sleeveColor = isBack ? "#d97706" : "#f59e0b";
        skinColor = "#f59e0b";
      } else if (id === "skin_brawl_crow") {
        sleeveColor = isBack ? "#020617" : "#1e293b";
        skinColor = "#0f172a";
      } else if (id === "skin_brawl_leon") {
        sleeveColor = isBack ? "#047857" : "#10b981";
        skinColor = "#fed7aa";
      }
      ctx.fillStyle = sleeveColor;
      ctx.strokeStyle = isBack ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.roundRect(-4, 0, 8, 22, 4);
      ctx.fill();
      ctx.stroke();
      ctx.translate(0, 20);
      ctx.rotate(arm.foreAngle);
      ctx.fillStyle = skinColor;
      ctx.beginPath();
      ctx.roundRect(-4.5, 0, 9, 20, 4);
      ctx.fill();
      ctx.stroke();
      if (id === "skin_brawl_shelly") {
        ctx.fillStyle = "#78350f";
        ctx.fillRect(-5, 12, 10, 8);
      } else if (id === "skin_brawl_colt") {
        ctx.fillStyle = "#475569";
        ctx.fillRect(-5, 12, 10, 8);
      } else if (id === "skin_brawl_el_primo") {
        ctx.fillStyle = "#2563eb";
        ctx.fillRect(-5.5, 8, 11, 12);
        ctx.fillStyle = "#ffd700";
        ctx.fillRect(-5.5, 12, 11, 4);
      } else if (id === "skin_brawl_crow") {
        ctx.fillStyle = "#020617";
        ctx.fillRect(-5, 12, 10, 8);
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(-3, 14, 2, 2);
        ctx.fillRect(1, 14, 2, 2);
      }
      if (!isBack) {
        this._drawBrawlWeapon(ctx, id, arm);
      }
      ctx.restore();
      return true;
    }
    // 繪製荒野亂鬥標誌性招牌武器
    _drawBrawlWeapon(ctx, id, arm) {
      ctx.save();
      ctx.translate(0, 18);
      switch (id) {
        case "skin_brawl_shelly": {
          ctx.fillStyle = "#92400e";
          ctx.beginPath();
          ctx.moveTo(-4, -2);
          ctx.lineTo(-12, 10);
          ctx.lineTo(-7, 12);
          ctx.lineTo(-2, 3);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#334155";
          ctx.fillRect(-3, -4, 10, 8);
          const barrelGrad = this._safeLinearGrad(
            ctx,
            6,
            -5,
            24,
            -1,
            [
              [0, "#64748b"],
              [0.5, "#cbd5e1"],
              [1, "#475569"]
            ],
            "#64748b"
          );
          ctx.fillStyle = barrelGrad;
          ctx.fillRect(6, -5, 20, 4);
          ctx.fillRect(6, -1, 20, 4);
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(23, -7, 3, 2);
          break;
        }
        case "skin_brawl_colt": {
          ctx.fillStyle = "#f1f5f9";
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 1;
          ctx.fillRect(2, -4, 18, 5);
          ctx.fillStyle = "#cbd5e1";
          ctx.beginPath();
          ctx.ellipse(4, -1.5, 4, 5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#fef08a";
          ctx.beginPath();
          ctx.moveTo(-1, 0);
          ctx.lineTo(-6, 9);
          ctx.lineTo(-2, 10);
          ctx.lineTo(2, 2);
          ctx.closePath();
          ctx.fill();
          this._drawStar(ctx, -3, 5, 5, 1.8, 0.8, "#ffd700");
          break;
        }
        case "skin_brawl_spike": {
          ctx.fillStyle = "#22c55e";
          ctx.strokeStyle = "#14532d";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(8, 2, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(15, 1, 3, 2);
          ctx.fillRect(8, 9, 2, 3);
          ctx.fillRect(8, -5, 2, 3);
          ctx.strokeStyle = "#dc2626";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(8, -4);
          ctx.quadraticCurveTo(12, -8, 14, -6);
          ctx.stroke();
          ctx.fillStyle = "#fbbf24";
          ctx.beginPath();
          ctx.arc(14, -6, 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case "skin_brawl_crow": {
          const bladeGrad = this._safeLinearGrad(
            ctx,
            0,
            -3,
            18,
            0,
            [
              [0, "#10b981"],
              [0.6, "#34d399"],
              [1, "#a7f3d0"]
            ],
            "#10b981"
          );
          ctx.fillStyle = bladeGrad;
          ctx.beginPath();
          ctx.moveTo(2, -3);
          ctx.lineTo(20, 0);
          ctx.lineTo(2, 3);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#10b981";
          ctx.beginPath();
          ctx.arc(22, 1, 1.5, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case "skin_brawl_leon": {
          ctx.save();
          ctx.translate(6, 2);
          const rot = Date.now() / 80 % (Math.PI * 2);
          ctx.rotate(rot);
          this._drawStar(ctx, 0, 0, 4, 8, 3, "#38bdf8", "#0284c7", 1.2);
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          break;
        }
      }
      ctx.restore();
    }
    // ─── 5. 角色腿部與戰靴 (Legs & Stylish Footwear) ───
    drawLimb(ctx, leg, skin, layer) {
      if (!this.isBrawl(skin)) return false;
      const id = skin.id;
      const isBack = layer === "backLeg";
      ctx.save();
      ctx.translate(leg.hipX, leg.hipY);
      ctx.rotate(leg.thighAngle);
      let pantsColor = "#1d4ed8";
      let bootColor = "#78350f";
      if (id === "skin_brawl_shelly") {
        pantsColor = isBack ? "#1e3a8a" : "#2563eb";
        bootColor = "#451a03";
      } else if (id === "skin_brawl_colt") {
        pantsColor = isBack ? "#0f172a" : "#1e293b";
        bootColor = "#78350f";
      } else if (id === "skin_brawl_spike") {
        pantsColor = "#16a34a";
        bootColor = "#78350f";
      } else if (id === "skin_brawl_el_primo") {
        pantsColor = isBack ? "#1d4ed8" : "#2563eb";
        bootColor = "#ffd700";
      } else if (id === "skin_brawl_crow") {
        pantsColor = isBack ? "#020617" : "#0f172a";
        bootColor = "#dc2626";
      } else if (id === "skin_brawl_leon") {
        pantsColor = isBack ? "#1e40af" : "#2563eb";
        bootColor = "#fed7aa";
      }
      ctx.fillStyle = pantsColor;
      ctx.strokeStyle = isBack ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.roundRect(-6, 0, 12, 28, 4);
      ctx.fill();
      ctx.stroke();
      ctx.translate(0, 26);
      ctx.rotate(leg.shinAngle);
      ctx.fillStyle = pantsColor;
      ctx.beginPath();
      ctx.roundRect(-5, 0, 10, 28, 4);
      ctx.fill();
      ctx.stroke();
      ctx.translate(0, 26);
      ctx.rotate(leg.footAngle || 0);
      ctx.fillStyle = bootColor;
      ctx.beginPath();
      ctx.roundRect(-5, 0, 18, 10, 4);
      ctx.fill();
      ctx.stroke();
      if (id === "skin_brawl_colt") {
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(-8, 3, 4, 3);
      }
      ctx.restore();
      return true;
    }
    // ─── 6. 專屬幾何防禦盾 (Stylized Guard Shields) ───
    drawGuardShield(ctx, stance, skin, t) {
      if (!this.isBrawl(skin)) return false;
      const id = skin.id;
      ctx.save();
      const sy = stance === "low" ? 15 : -35;
      ctx.translate(28, sy);
      switch (id) {
        case "skin_brawl_shelly": {
          ctx.shadowColor = "#facc15";
          ctx.shadowBlur = 24;
          ctx.strokeStyle = "#facc15";
          ctx.fillStyle = "rgba(250, 204, 21, 0.25)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, 36, -Math.PI * 0.45, Math.PI * 0.45);
          ctx.lineTo(-10, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          this._drawStar(ctx, 12, 0, 5, 10, 5, "#fbbf24");
          break;
        }
        case "skin_brawl_colt": {
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 22;
          ctx.strokeStyle = "#38bdf8";
          ctx.fillStyle = "rgba(56, 189, 248, 0.22)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(10, 0, 28, 40, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          this._drawStar(ctx, 10, 0, 6, 12, 6, "#ffd700");
          break;
        }
        case "skin_brawl_spike": {
          ctx.shadowColor = "#22c55e";
          ctx.shadowBlur = 26;
          ctx.strokeStyle = "#22c55e";
          ctx.fillStyle = "rgba(34, 197, 94, 0.28)";
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(12, 0, 38, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#ec4899";
          for (let f = 0; f < 5; f++) {
            const fa = t * 0.1 + f * Math.PI * 0.4;
            ctx.beginPath();
            ctx.arc(12 + Math.cos(fa) * 14, Math.sin(fa) * 14, 6, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }
        case "skin_brawl_el_primo": {
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 30;
          ctx.strokeStyle = "#fbbf24";
          ctx.fillStyle = "rgba(251, 191, 36, 0.3)";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(10, 0, 42, -Math.PI * 0.5, Math.PI * 0.5);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          this._drawStar(ctx, 10, 0, 8, 14, 7, "#ffd700");
          break;
        }
        case "skin_brawl_crow": {
          ctx.shadowColor = "#10b981";
          ctx.shadowBlur = 25;
          ctx.strokeStyle = "#10b981";
          ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(10, 0, 24, 42, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        }
        case "skin_brawl_leon": {
          ctx.shadowColor = "#34d399";
          ctx.shadowBlur = 24;
          ctx.strokeStyle = "#34d399";
          ctx.fillStyle = "rgba(52, 211, 153, 0.25)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(0, -38, 26, 76, 12);
          ctx.fill();
          ctx.stroke();
          break;
        }
      }
      ctx.restore();
      return true;
    }
    // ─── 7. 專屬打擊攻擊特效 (VFX) ───
    drawAttackVFX(ctx, vfx, skin) {
      if (!this.isBrawl(skin)) return false;
      const id = skin.id;
      ctx.save();
      switch (id) {
        case "skin_brawl_shelly": {
          ctx.shadowColor = "#facc15";
          ctx.shadowBlur = 20;
          ctx.fillStyle = "#fde047";
          for (let i = 0; i < 7; i++) {
            const ang = -0.35 + i / 6 * 0.7;
            const dist = 32 + Math.random() * 25;
            ctx.beginPath();
            ctx.arc(Math.cos(ang) * dist + 15, Math.sin(ang) * dist - 30, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = "rgba(250, 204, 21, 0.85)";
          ctx.beginPath();
          ctx.ellipse(32, -32, 16, 10, 0, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case "skin_brawl_colt": {
          ctx.shadowColor = "#60a5fa";
          ctx.shadowBlur = 18;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(25, -34, 24, 3);
          ctx.fillRect(32, -26, 26, 3);
          ctx.fillStyle = "#ffd700";
          this._drawStar(ctx, 52, -32, 5, 5, 2, "#ffd700");
          break;
        }
        case "skin_brawl_spike": {
          ctx.shadowColor = "#22c55e";
          ctx.shadowBlur = 20;
          ctx.fillStyle = "#15803d";
          for (let n = 0; n < 6; n++) {
            const ang = n * Math.PI / 3;
            ctx.save();
            ctx.translate(35 + Math.cos(ang) * 16, -28 + Math.sin(ang) * 16);
            ctx.rotate(ang);
            ctx.fillRect(-1.5, 0, 3, 8);
            ctx.restore();
          }
          break;
        }
        case "skin_brawl_el_primo": {
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 28;
          ctx.fillStyle = "#f59e0b";
          ctx.beginPath();
          ctx.arc(38, -30, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.arc(42, -30, 11, 0, Math.PI * 2);
          ctx.fill();
          this._drawStar(ctx, 42, -30, 5, 8, 4, "#ffffff");
          break;
        }
        case "skin_brawl_crow": {
          ctx.shadowColor = "#10b981";
          ctx.shadowBlur = 22;
          ctx.fillStyle = "#34d399";
          for (let d = 0; d < 3; d++) {
            const dy = -40 + d * 10;
            ctx.beginPath();
            ctx.moveTo(25, dy);
            ctx.lineTo(48, dy);
            ctx.lineTo(25, dy + 3);
            ctx.closePath();
            ctx.fill();
          }
          break;
        }
        case "skin_brawl_leon": {
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 20;
          this._drawStar(ctx, 42, -30, 4, 12, 4, "#00f3ff");
          this._drawStar(ctx, 32, -34, 4, 8, 3, "rgba(0, 243, 255, 0.45)");
          break;
        }
      }
      ctx.restore();
      return true;
    }
  };
  var brawlSkinsRenderer = new BrawlSkinsRenderer();

  // js/engine/character_renderer.js
  var CharacterRenderer = class {
    constructor() {
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
      if (char.invincibleTimer && char.invincibleTimer > 0 && Math.floor(char.invincibleTimer / 2) % 2 === 1) {
        ctx.globalAlpha = 0.5;
      }
      const pose = this.calculatePose(state, t, char);
      specialSkinsRenderer.drawAura(ctx, char, skin, t);
      brawlSkinsRenderer.drawAura(ctx, char, skin, t);
      scifiSkinsRenderer.drawAura(ctx, char, skin, t);
      this.drawLimb(ctx, pose.backLeg, skin, "backLeg");
      this.drawArm(ctx, pose.backArm, skin, "backArm");
      this.drawTorso(ctx, pose.torso, skin, t);
      this.drawHead(ctx, pose.head, skin);
      this.drawLimb(ctx, pose.frontLeg, skin, "frontLeg");
      this.drawArm(ctx, pose.frontArm, skin, "frontArm");
      if (char.isGuarding) {
        this.drawGuardShield(ctx, char.guardStance || "high", skin, t);
      }
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
      const normPhase = (p) => (p % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const getHumanLegJoints = (phi) => {
        const p = normPhase(phi);
        const thigh = -Math.cos(p) * 0.36 - 0.04;
        let shin = 0;
        let foot = 0;
        if (p < Math.PI) {
          const sp = p / Math.PI;
          const shock = 0.12 * Math.sin(sp * Math.PI * 2) * (sp < 0.45 ? 1 : 0);
          const push = 0.34 * Math.pow(Math.max(0, sp - 0.45) / 0.55, 2);
          shin = 0.06 + shock + push;
          if (sp < 0.22) {
            foot = -0.16 + sp / 0.22 * 0.24;
          } else if (sp < 0.58) {
            foot = 0.08 - (sp - 0.22) / 0.36 * 0.12;
          } else {
            foot = -0.04 - (sp - 0.58) / 0.42 * 0.26;
          }
        } else {
          const swp = (p - Math.PI) / Math.PI;
          shin = 0.38 + 0.38 * Math.sin(swp * Math.PI) - 0.3 * Math.pow(swp, 2);
          foot = -0.04 + 0.12 * Math.sin(swp * Math.PI);
        }
        shin = Math.max(0.04, Math.min(1.05, shin));
        return { thigh, shin, foot };
      };
      const frontL = getHumanLegJoints(phase);
      const backL = getHumanLegJoints(phase + Math.PI);
      const verticalBob = -Math.cos(phase * 2) * 2.8;
      const torsoAngle = (isBackward ? -0.02 : 0.045) + Math.sin(phase * 2) * 0.012;
      const headAngle = -torsoAngle * 0.75;
      const armSwing = Math.cos(phase) * 0.34;
      const frontArmUpper = isBackward ? -armSwing * 0.6 + 0.22 : armSwing + 0.1;
      const backArmUpper = isBackward ? armSwing * 0.6 + 0.22 : -armSwing + 0.1;
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
        backArm: { shoulderX: -8, shoulderY: -86, upperAngle: 0.3, foreAngle: 1 },
        frontLeg: { hipX: 6, hipY: -42, thighAngle: 0.2, shinAngle: 0.1 },
        backLeg: { hipX: -6, hipY: -42, thighAngle: -0.2, shinAngle: 0.1 },
        vfx: null
      };
      switch (state) {
        case "idle": {
          const breath = Math.sin(t * 0.08) * 3;
          defaultPose.torso.y = -74 + breath;
          defaultPose.head.y = -98 + breath;
          defaultPose.frontArm.upperAngle = 0.4 + Math.sin(t * 0.08) * 0.08;
          defaultPose.frontArm.foreAngle = 1.3 + Math.sin(t * 0.08) * 0.05;
          defaultPose.backArm.upperAngle = 0.2;
          defaultPose.backArm.foreAngle = 1.1;
          return defaultPose;
        }
        case "walk_fwd": {
          return this._calculateHumanWalkPose(t, false);
        }
        case "walk_back": {
          return this._calculateHumanWalkPose(t, true);
        }
        case "jump":
        case "jump_up": {
          if (char && char.currentAction) {
            const actName = char.currentAction.name || "";
            if (actName.includes("\u8E22")) {
              defaultPose.torso.y = -70;
              defaultPose.torso.angle = -0.45;
              defaultPose.head.angle = 0.2;
              defaultPose.frontLeg.thighAngle = -1.25;
              defaultPose.frontLeg.shinAngle = 0.1;
              defaultPose.backLeg.thighAngle = 0.4;
              defaultPose.backLeg.shinAngle = 1.6;
              defaultPose.frontArm.upperAngle = 0.7;
              defaultPose.frontArm.foreAngle = 0.3;
              defaultPose.backArm.upperAngle = 0.9;
              defaultPose.backArm.foreAngle = 0.3;
              defaultPose.vfx = { type: "dive_kick", x: 50, y: -45 };
              return defaultPose;
            } else if (actName.includes("\u62F3")) {
              defaultPose.torso.y = -78;
              defaultPose.torso.angle = 0.25;
              defaultPose.frontArm.upperAngle = -0.35;
              defaultPose.frontArm.foreAngle = 0.2;
              defaultPose.frontLeg.thighAngle = -0.9;
              defaultPose.frontLeg.shinAngle = 1.3;
              defaultPose.backLeg.thighAngle = -0.6;
              defaultPose.backLeg.shinAngle = 1.1;
              defaultPose.vfx = { type: "punch", x: 48, y: -65 };
              return defaultPose;
            }
          }
          defaultPose.torso.y = -82;
          defaultPose.head.y = -106;
          defaultPose.frontLeg.thighAngle = -0.8;
          defaultPose.frontLeg.shinAngle = 1.2;
          defaultPose.backLeg.thighAngle = -0.5;
          defaultPose.backLeg.shinAngle = 1;
          defaultPose.frontArm.upperAngle = -0.6;
          defaultPose.frontArm.foreAngle = 0.4;
          defaultPose.backArm.upperAngle = -0.8;
          defaultPose.backArm.foreAngle = 0.4;
          return defaultPose;
        }
        case "crouch": {
          defaultPose.torso.y = -48;
          defaultPose.torso.angle = 0.25;
          defaultPose.head.y = -72;
          defaultPose.frontLeg.thighAngle = -1.4;
          defaultPose.frontLeg.shinAngle = 2.1;
          defaultPose.backLeg.thighAngle = -1.2;
          defaultPose.backLeg.shinAngle = 2;
          defaultPose.frontArm.upperAngle = 0.8;
          defaultPose.frontArm.foreAngle = 0.9;
          defaultPose.backArm.upperAngle = 0.6;
          defaultPose.backArm.foreAngle = 0.8;
          return defaultPose;
        }
        case "crouch_punch": {
          const style = getSkinAttackStyle(char ? char.skin : null);
          const pProgress = Math.min(1, t / 15);
          const reach = Math.sin(pProgress * Math.PI);
          defaultPose.torso.y = -48;
          defaultPose.torso.angle = 0.35 * reach;
          defaultPose.head.y = -72;
          defaultPose.frontLeg.thighAngle = -1.4;
          defaultPose.frontLeg.shinAngle = 2.1;
          defaultPose.backLeg.thighAngle = -1.2;
          defaultPose.backLeg.shinAngle = 2;
          if (style === "bow") {
            defaultPose.frontArm.upperAngle = 0.2 - reach * 0.4;
            defaultPose.frontArm.foreAngle = 0.05;
            defaultPose.frontArm.holdingWeapon = "bow";
            defaultPose.frontArm.drawingArrow = reach > 0.2;
            defaultPose.backArm.upperAngle = 0.1;
            defaultPose.backArm.foreAngle = 1.2;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "bow_arrow", progress: reach, x: 50, y: -50 };
            }
            return defaultPose;
          } else if (style === "gun") {
            defaultPose.frontArm.upperAngle = 0.1 - reach * 0.3;
            defaultPose.frontArm.foreAngle = 0.05;
            defaultPose.frontArm.holdingWeapon = "gun";
            defaultPose.backArm.upperAngle = 0.2;
            defaultPose.backArm.foreAngle = 0.3;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "gun_bullet", progress: reach, x: 52, y: -50 };
            }
            return defaultPose;
          } else if (style === "sword") {
            defaultPose.frontArm.upperAngle = -0.4 + reach * 1.1;
            defaultPose.frontArm.foreAngle = 0.1;
            defaultPose.frontArm.holdingWeapon = "sword";
            defaultPose.backArm.upperAngle = 0.5;
            defaultPose.backArm.foreAngle = 0.9;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "sword_slash_vfx", progress: reach, x: 52, y: -50 };
            }
            return defaultPose;
          } else if (style === "shield") {
            defaultPose.frontArm.upperAngle = 0.1 - reach * 0.5;
            defaultPose.frontArm.foreAngle = 0.3;
            defaultPose.frontArm.holdingWeapon = "shield";
            defaultPose.backArm.upperAngle = 0.6;
            defaultPose.backArm.foreAngle = 0.8;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "shield_strike", progress: reach, x: 50, y: -50 };
            }
            return defaultPose;
          }
          defaultPose.frontArm.upperAngle = 0.3 - reach * 0.7;
          defaultPose.frontArm.foreAngle = 1.2 - reach * 1.1;
          defaultPose.backArm.upperAngle = 0.7;
          defaultPose.backArm.foreAngle = 0.9;
          if (reach > 0.25) {
            defaultPose.vfx = { type: "crouch_punch", progress: reach, x: 50, y: -50 };
          }
          return defaultPose;
        }
        case "crouch_kick": {
          const sProgress = Math.min(1, t / 20);
          const sweepWave = Math.sin(sProgress * Math.PI);
          defaultPose.torso.y = -36;
          defaultPose.torso.angle = -0.38 * sweepWave;
          defaultPose.head.y = -60;
          defaultPose.frontLeg.thighAngle = -1.55;
          defaultPose.frontLeg.shinAngle = 0.05;
          defaultPose.backLeg.thighAngle = 0.5;
          defaultPose.backLeg.shinAngle = 1.8;
          defaultPose.frontArm.upperAngle = 1.1;
          defaultPose.frontArm.foreAngle = 0.2;
          defaultPose.backArm.upperAngle = 0.9;
          defaultPose.backArm.foreAngle = 0.4;
          if (sweepWave > 0.2) {
            defaultPose.vfx = { type: "sweep", progress: sweepWave, x: 56, y: -12 };
          }
          return defaultPose;
        }
        case "high_guard": {
          defaultPose.frontArm.upperAngle = 1.2;
          defaultPose.frontArm.foreAngle = 1.8;
          defaultPose.backArm.upperAngle = 1;
          defaultPose.backArm.foreAngle = 1.6;
          return defaultPose;
        }
        case "low_guard": {
          defaultPose.torso.y = -50;
          defaultPose.head.y = -74;
          defaultPose.frontLeg.thighAngle = -1.3;
          defaultPose.frontLeg.shinAngle = 2;
          defaultPose.frontArm.upperAngle = 0.5;
          defaultPose.frontArm.foreAngle = 0.4;
          defaultPose.backArm.upperAngle = 0.4;
          defaultPose.backArm.foreAngle = 0.4;
          return defaultPose;
        }
        case "light_punch": {
          const style = getSkinAttackStyle(char ? char.skin : null);
          const pProgress = Math.min(1, t / 16);
          const reach = Math.sin(pProgress * Math.PI);
          if (style === "bow") {
            defaultPose.torso.angle = -0.12 * reach;
            defaultPose.frontArm.upperAngle = -0.25 - reach * 0.12;
            defaultPose.frontArm.foreAngle = 0.05;
            defaultPose.frontArm.holdingWeapon = "bow";
            defaultPose.frontArm.drawingArrow = reach > 0.2;
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
              defaultPose.vfx = { type: "bow_arrow", progress: reach, x: 54, y: -74 };
            }
            return defaultPose;
          }
          if (style === "gun") {
            const recoil = Math.sin(pProgress * Math.PI);
            defaultPose.torso.angle = 0.08 * recoil;
            defaultPose.frontArm.upperAngle = -0.2 - recoil * 0.12;
            defaultPose.frontArm.foreAngle = 0.05;
            defaultPose.frontArm.holdingWeapon = "gun";
            defaultPose.backArm.upperAngle = -0.18 - recoil * 0.1;
            defaultPose.backArm.foreAngle = 0.18;
            if (reach > 0.2) {
              defaultPose.vfx = { type: "gun_bullet", progress: reach, x: 56, y: -74 };
            }
            return defaultPose;
          }
          if (style === "shield") {
            defaultPose.torso.angle = 0.22 * reach;
            defaultPose.frontArm.upperAngle = -0.15 - reach * 0.7;
            defaultPose.frontArm.foreAngle = 0.35;
            defaultPose.frontArm.holdingWeapon = "shield";
            defaultPose.backArm.upperAngle = 0.5;
            defaultPose.backArm.foreAngle = 1.1;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "shield_strike", progress: reach, x: 52, y: -74 };
            }
            return defaultPose;
          }
          if (style === "hammer") {
            defaultPose.torso.angle = 0.18 * reach;
            defaultPose.frontArm.upperAngle = -1.15 + reach * 1.5;
            defaultPose.frontArm.foreAngle = 0.1;
            defaultPose.frontArm.holdingWeapon = "hammer";
            defaultPose.backArm.upperAngle = 0.6;
            defaultPose.backArm.foreAngle = 1.2;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "thor_lightning", progress: reach, x: 52, y: -74 };
            }
            return defaultPose;
          }
          if (style === "sword") {
            defaultPose.torso.angle = 0.25 * reach;
            defaultPose.frontArm.upperAngle = -0.85 + reach * 1.45;
            defaultPose.frontArm.foreAngle = 0.1;
            defaultPose.frontArm.holdingWeapon = "sword";
            defaultPose.backArm.upperAngle = 0.5;
            defaultPose.backArm.foreAngle = 1;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "sword_slash_vfx", progress: reach, x: 54, y: -76 };
            }
            return defaultPose;
          }
          if (style === "repulsor") {
            defaultPose.torso.angle = 0.14 * reach;
            defaultPose.frontArm.upperAngle = -0.22 - reach * 0.45;
            defaultPose.frontArm.foreAngle = -0.12;
            defaultPose.backArm.upperAngle = 0.5;
            defaultPose.backArm.foreAngle = 1.2;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "repulsor_blast", progress: reach, x: 52, y: -76 };
            }
            return defaultPose;
          }
          if (style === "web_shot") {
            defaultPose.torso.angle = 0.14 * reach;
            defaultPose.frontArm.upperAngle = -0.18 - reach * 0.45;
            defaultPose.frontArm.foreAngle = 0.05;
            defaultPose.backArm.upperAngle = 0.4;
            defaultPose.backArm.foreAngle = 1.2;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "web_stream", progress: reach, x: 50, y: -76 };
            }
            return defaultPose;
          }
          if (style === "kamehameha") {
            defaultPose.torso.angle = 0.2 * reach;
            defaultPose.frontArm.upperAngle = -0.15 - reach * 0.5;
            defaultPose.frontArm.foreAngle = 0.05;
            defaultPose.backArm.upperAngle = -0.1 - reach * 0.45;
            defaultPose.backArm.foreAngle = 0.1;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "kamehameha_vfx", progress: reach, x: 54, y: -74 };
            }
            return defaultPose;
          }
          if (style === "final_flash") {
            defaultPose.torso.angle = 0.18 * reach;
            defaultPose.frontArm.upperAngle = -0.2 - reach * 0.6;
            defaultPose.frontArm.foreAngle = 0.02;
            defaultPose.backArm.upperAngle = 0.6;
            defaultPose.backArm.foreAngle = 1.1;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "final_flash_vfx", progress: reach, x: 54, y: -74 };
            }
            return defaultPose;
          }
          if (style === "death_beam") {
            defaultPose.torso.angle = 0.1 * reach;
            defaultPose.frontArm.upperAngle = -0.2 - reach * 0.35;
            defaultPose.frontArm.foreAngle = 0.02;
            defaultPose.backArm.upperAngle = 0.4;
            defaultPose.backArm.foreAngle = 1.2;
            if (reach > 0.2) {
              defaultPose.vfx = { type: "death_beam_vfx", progress: reach, x: 54, y: -75 };
            }
            return defaultPose;
          }
          if (style === "namek_arm") {
            defaultPose.torso.angle = 0.18 * reach;
            defaultPose.frontArm.upperAngle = -0.1 - reach * 0.5;
            defaultPose.frontArm.foreAngle = 0.02;
            defaultPose.backArm.upperAngle = 0.5;
            defaultPose.backArm.foreAngle = 1.2;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "namek_arm_vfx", progress: reach, x: 54, y: -76 };
            }
            return defaultPose;
          }
          if (style === "infinity_strike") {
            defaultPose.torso.angle = 0.22 * reach;
            defaultPose.frontArm.upperAngle = 0.1 - reach * 0.8;
            defaultPose.frontArm.foreAngle = 1 - reach * 0.9;
            defaultPose.backArm.upperAngle = 0.5;
            defaultPose.backArm.foreAngle = 1.3;
            if (reach > 0.25) {
              defaultPose.vfx = { type: "infinity_vfx", progress: reach, x: 52, y: -74 };
            }
            return defaultPose;
          }
          defaultPose.torso.angle = 0.15 * reach;
          defaultPose.frontArm.upperAngle = 0.2 - reach * 0.9;
          defaultPose.frontArm.foreAngle = 1.2 - reach * 1.1;
          defaultPose.backArm.upperAngle = 0.6;
          defaultPose.backArm.foreAngle = 1.4;
          if (reach > 0.3) {
            defaultPose.vfx = { type: "punch", progress: reach, x: 50, y: -78 };
          }
          return defaultPose;
        }
        case "heavy_kick": {
          const style = getSkinAttackStyle(char ? char.skin : null);
          const kProgress = Math.min(1, t / 20);
          const kickWave = Math.sin(kProgress * Math.PI);
          defaultPose.torso.angle = -0.3 * kickWave;
          defaultPose.frontLeg.thighAngle = 0.2 - kickWave * 1.8;
          defaultPose.frontLeg.shinAngle = 0.1 - kickWave * 0.4;
          defaultPose.frontArm.upperAngle = -0.4;
          defaultPose.frontArm.foreAngle = 0.5;
          if (style === "bow") {
            defaultPose.frontArm.holdingWeapon = "bow";
          } else if (style === "gun") {
            defaultPose.frontArm.holdingWeapon = "gun";
          } else if (style === "shield") {
            defaultPose.frontArm.holdingWeapon = "shield";
          } else if (style === "hammer") {
            defaultPose.frontArm.holdingWeapon = "hammer";
          } else if (style === "sword") {
            defaultPose.frontArm.holdingWeapon = "sword";
          }
          if (kickWave > 0.4) {
            defaultPose.vfx = { type: "kick", progress: kickWave, x: 54, y: -60 };
          }
          return defaultPose;
        }
        case "ranged_attack": {
          const rProgress = Math.min(1, t / 18);
          const blastWave = Math.sin(rProgress * Math.PI);
          const isAntiAir = char && char.currentAction && char.currentAction.name.includes("\u5C0D\u7A7A");
          const isHeavy = char && char.currentAction && char.currentAction.name.includes("\u91CD\u7832");
          if (isAntiAir) {
            defaultPose.torso.angle = -0.18 * blastWave;
            defaultPose.frontArm.upperAngle = -0.75 - blastWave * 0.22;
            defaultPose.frontArm.foreAngle = 0.05;
            defaultPose.backArm.upperAngle = 0.45;
            defaultPose.backArm.foreAngle = 0.85;
            if (blastWave > 0.2) {
              defaultPose.vfx = { type: "plasma_muzzle", progress: blastWave, x: 42, y: -90 };
            }
          } else if (isHeavy) {
            defaultPose.torso.angle = 0.28 * blastWave;
            defaultPose.frontArm.upperAngle = -0.15 - blastWave * 0.35;
            defaultPose.frontArm.foreAngle = 0.02;
            defaultPose.backArm.upperAngle = -0.12 - blastWave * 0.3;
            defaultPose.backArm.foreAngle = 0.1;
            if (blastWave > 0.2) {
              defaultPose.vfx = { type: "plasma_muzzle", progress: blastWave, x: 54, y: -74 };
            }
          } else {
            defaultPose.torso.angle = 0.16 * blastWave;
            defaultPose.frontArm.upperAngle = -0.15 - blastWave * 0.2;
            defaultPose.frontArm.foreAngle = 0.05;
            defaultPose.backArm.upperAngle = 0.35;
            defaultPose.backArm.foreAngle = 0.85;
            if (blastWave > 0.2) {
              defaultPose.vfx = { type: "plasma_muzzle", progress: blastWave, x: 48, y: -74 };
            }
          }
          return defaultPose;
        }
        case "hit_stun": {
          const hOffset = Math.sin(t * 0.4) * 4;
          defaultPose.torso.angle = -0.35;
          defaultPose.head.angle = -0.45;
          defaultPose.torso.x = -8 + hOffset;
          defaultPose.head.x = -12 + hOffset;
          defaultPose.frontArm.upperAngle = -0.8;
          defaultPose.frontArm.foreAngle = 0.4;
          defaultPose.backArm.upperAngle = -0.6;
          defaultPose.backArm.foreAngle = 0.5;
          defaultPose.vfx = { type: "hit_sparks", x: 0, y: -74 };
          return defaultPose;
        }
        case "knockdown": {
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
        case "wakeup": {
          const wRatio = Math.min(1, t / 15);
          defaultPose.torso.y = -16 - wRatio * 58;
          defaultPose.head.y = -16 - wRatio * 82;
          defaultPose.torso.angle = -Math.PI / 2 * (1 - wRatio);
          defaultPose.head.angle = -Math.PI / 2 * (1 - wRatio);
          return defaultPose;
        }
        // 招式專屬姿態
        case "SK-02": {
          defaultPose.torso.angle = 0.1;
          defaultPose.frontArm.upperAngle = -2.2;
          defaultPose.frontArm.foreAngle = 0.1;
          defaultPose.frontLeg.thighAngle = -0.9;
          defaultPose.frontLeg.shinAngle = 1.4;
          defaultPose.vfx = { type: "shoryuken", x: 12, y: -110 };
          return defaultPose;
        }
        case "SK-03": {
          defaultPose.torso.y = -26;
          defaultPose.torso.angle = -0.5;
          defaultPose.head.y = -40;
          defaultPose.frontLeg.thighAngle = -1.5;
          defaultPose.frontLeg.shinAngle = 0.1;
          defaultPose.backLeg.thighAngle = 0.6;
          defaultPose.backLeg.shinAngle = 1.8;
          defaultPose.vfx = { type: "slide_dust", x: 30, y: -5 };
          return defaultPose;
        }
        case "victory": {
          const vCycle = Math.sin(t * 0.08) * 2;
          defaultPose.torso.y = -76 + vCycle;
          defaultPose.head.y = -100 + vCycle;
          defaultPose.torso.angle = -0.06;
          defaultPose.head.angle = -0.15;
          defaultPose.frontArm.upperAngle = -2.3;
          defaultPose.frontArm.foreAngle = 0.3;
          defaultPose.backArm.upperAngle = 0.8;
          defaultPose.backArm.foreAngle = 1.9;
          defaultPose.frontLeg.thighAngle = 0.28;
          defaultPose.frontLeg.shinAngle = 0.08;
          defaultPose.backLeg.thighAngle = -0.28;
          defaultPose.backLeg.shinAngle = 0.08;
          defaultPose.vfx = {
            type: "victory_aura",
            color: char.skin && char.skin.themeColor ? char.skin.themeColor : "#ffd700",
            x: 0,
            y: -74,
            time: t
          };
          return defaultPose;
        }
        case "defeat": {
          defaultPose.torso.y = -42;
          defaultPose.torso.angle = 0.35;
          defaultPose.head.y = -62;
          defaultPose.head.angle = 0.55;
          defaultPose.frontLeg.thighAngle = -1.4;
          defaultPose.frontLeg.shinAngle = 2.2;
          defaultPose.backLeg.thighAngle = -1.6;
          defaultPose.backLeg.shinAngle = 1.9;
          defaultPose.frontArm.upperAngle = 0.6;
          defaultPose.frontArm.foreAngle = 0.5;
          defaultPose.backArm.upperAngle = 0.4;
          defaultPose.backArm.foreAngle = 0.4;
          return defaultPose;
        }
        case "super_move": {
          const isCharging = t < 22;
          if (isCharging) {
            defaultPose.torso.y = -68;
            defaultPose.torso.angle = -0.15;
            defaultPose.frontArm.upperAngle = 0.8;
            defaultPose.frontArm.foreAngle = 2.1;
            defaultPose.backArm.upperAngle = 0.7;
            defaultPose.backArm.foreAngle = 2;
            defaultPose.frontLeg.thighAngle = 0.35;
            defaultPose.frontLeg.shinAngle = 0.25;
            defaultPose.backLeg.thighAngle = -0.45;
            defaultPose.backLeg.shinAngle = 0.4;
            defaultPose.vfx = {
              type: "super_charge",
              color: char.skin && char.skin.themeColor ? char.skin.themeColor : "#00f3ff",
              x: 0,
              y: -74,
              time: t
            };
          } else {
            defaultPose.torso.y = -72;
            defaultPose.torso.angle = 0.22;
            defaultPose.frontArm.upperAngle = -0.15;
            defaultPose.frontArm.foreAngle = 0.05;
            defaultPose.backArm.upperAngle = -0.22;
            defaultPose.backArm.foreAngle = 0.08;
            defaultPose.frontLeg.thighAngle = 0.55;
            defaultPose.frontLeg.shinAngle = 0.45;
            defaultPose.backLeg.thighAngle = -0.65;
            defaultPose.backLeg.shinAngle = 0.2;
            defaultPose.vfx = {
              type: "super_blast",
              color: char.skin && char.skin.themeColor ? char.skin.themeColor : "#00f3ff",
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
      if (brawlSkinsRenderer.drawTorso(ctx, torso, skin, t)) {
        return;
      }
      if (scifiSkinsRenderer.drawTorso(ctx, torso, skin, t)) {
        return;
      }
      ctx.save();
      ctx.translate(torso.x, torso.y);
      ctx.rotate(torso.angle);
      ctx.fillStyle = skin.armorColor || "#0f172a";
      ctx.strokeStyle = skin.themeColor || "#00f3ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-16, -23);
      ctx.lineTo(16, -23);
      ctx.lineTo(12, 16);
      ctx.lineTo(-12, 16);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#090d16";
      ctx.fillRect(-11, 16, 22, 12);
      ctx.strokeRect(-11, 16, 22, 12);
      const pulse = 1 + Math.sin(t * 0.1) * 0.15;
      ctx.save();
      ctx.shadowColor = skin.themeColor;
      ctx.shadowBlur = 12 * pulse;
      ctx.fillStyle = skin.coreColor || skin.themeColor;
      ctx.beginPath();
      ctx.arc(0, -6, 6 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, -6, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.restore();
    }
    _hexToRgb(hex) {
      if (!hex || typeof hex !== "string" || !hex.startsWith("#")) return "0, 243, 255";
      let c = hex.substring(1);
      if (c.length === 3) {
        c = c.split("").map((x) => x + x).join("");
      }
      const num = parseInt(c, 16);
      if (isNaN(num)) return "0, 243, 255";
      const r = num >> 16 & 255;
      const g = num >> 8 & 255;
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
      if (brawlSkinsRenderer.drawHead(ctx, head, skin)) {
        ctx.restore();
        return;
      }
      if (scifiSkinsRenderer.drawHead(ctx, head, skin)) {
        ctx.restore();
        return;
      }
      const themeColor = skin.themeColor || "#00f3ff";
      const visorColor = skin.visorColor || themeColor;
      const accentColor = skin.accentColor || themeColor;
      const armorColor = skin.armorColor || "#0f172a";
      const t = Date.now() / 250;
      const rgbVisor = this._hexToRgb(visorColor);
      const rgbTheme = this._hexToRgb(themeColor);
      ctx.fillStyle = armorColor;
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-12, 10);
      ctx.quadraticCurveTo(-18, 0, -15, -10);
      ctx.quadraticCurveTo(-10, -18, 2, -18);
      ctx.lineTo(12, -12);
      ctx.lineTo(15, -4);
      ctx.lineTo(13, 6);
      ctx.lineTo(6, 15);
      ctx.lineTo(-6, 14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = themeColor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-6, -17);
      ctx.lineTo(6, -16);
      ctx.lineTo(11, -11);
      ctx.stroke();
      ctx.fillStyle = themeColor;
      ctx.beginPath();
      ctx.moveTo(3, -15);
      ctx.lineTo(6, -13);
      ctx.lineTo(3, -11);
      ctx.lineTo(0, -13);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#090d16";
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(-8, 1, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      const ledPulse = Math.sin(t * 1.5) * 0.3 + 0.7;
      ctx.fillStyle = visorColor;
      ctx.shadowColor = visorColor;
      ctx.shadowBlur = 6 * ledPulse;
      ctx.beginPath();
      ctx.arc(-8, 1, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(${rgbTheme}, 0.65)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-5, 0);
      ctx.lineTo(0, -2);
      ctx.lineTo(3, -3);
      ctx.stroke();
      ctx.fillStyle = "rgba(2, 6, 18, 0.92)";
      ctx.strokeStyle = `rgba(${rgbTheme}, 0.4)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(2, -7);
      ctx.lineTo(15, -4);
      ctx.lineTo(14, 3);
      ctx.lineTo(3, 3);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.save();
      ctx.shadowColor = visorColor;
      ctx.shadowBlur = 8;
      ctx.fillStyle = visorColor;
      ctx.beginPath();
      ctx.ellipse(3.2, -2, 2.2, 3.2, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(3.2, -2, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.shadowColor = visorColor;
      ctx.shadowBlur = 14;
      ctx.fillStyle = `rgba(${rgbVisor}, 0.4)`;
      ctx.beginPath();
      ctx.moveTo(6, -4.5);
      ctx.lineTo(14, -3.2);
      ctx.lineTo(13, 2);
      ctx.lineTo(6.5, 1.5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = visorColor;
      ctx.beginPath();
      ctx.moveTo(7, -3.8);
      ctx.lineTo(13.2, -2.8);
      ctx.lineTo(12, 1.2);
      ctx.lineTo(7.5, 0.8);
      ctx.closePath();
      ctx.fill();
      const pupilPulse = Math.sin(t * 2) * 0.3 + 1.2;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(10, -1, 1.8 * pupilPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10 - 3.5, -1);
      ctx.lineTo(10 + 3.5, -1);
      ctx.moveTo(10, -1 - 3.5);
      ctx.lineTo(10, -1 + 3.5);
      ctx.stroke();
      const laserAlpha = Math.sin(t * 3) * 0.25 + 0.65;
      ctx.strokeStyle = `rgba(${rgbVisor}, ${laserAlpha})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(14, -2);
      ctx.lineTo(25, -2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(22, -5);
      ctx.lineTo(25, -2);
      ctx.lineTo(22, 1);
      ctx.stroke();
      ctx.restore();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(6, 6);
      ctx.lineTo(12, 5);
      ctx.moveTo(5, 9);
      ctx.lineTo(10, 8);
      ctx.stroke();
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(8, 9, 3, 2);
      ctx.restore();
    }
    drawArm(ctx, arm, skin, layer) {
      if (specialSkinsRenderer.drawArm(ctx, arm, skin, layer)) {
        return;
      }
      if (brawlSkinsRenderer.drawArm(ctx, arm, skin, layer)) {
        return;
      }
      ctx.save();
      ctx.translate(arm.shoulderX, arm.shoulderY);
      ctx.rotate(arm.upperAngle);
      const isBack = layer === "backArm";
      const armorCol = isBack ? "#0a0f1d" : skin.armorColor || "#0f172a";
      const strokeCol = isBack ? "#1e293b" : skin.themeColor;
      ctx.fillStyle = armorCol;
      ctx.strokeStyle = strokeCol;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-4, 0, 8, 22, 4);
      ctx.fill();
      ctx.stroke();
      ctx.translate(0, 20);
      ctx.rotate(arm.foreAngle);
      ctx.fillStyle = skin.accentColor || skin.themeColor;
      ctx.beginPath();
      ctx.roundRect(-5, 0, 10, 22, 4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-3, 16, 6, 4);
      if (!isBack && arm.holdingWeapon) {
        this._drawWeaponProp(ctx, arm.holdingWeapon, skin, arm);
      }
      ctx.restore();
    }
    _drawWeaponProp(ctx, weapon, skin, arm) {
      ctx.save();
      ctx.translate(0, 18);
      if (weapon === "bow") {
        ctx.strokeStyle = skin.themeColor || "#a855f7";
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(8, -14, 4, -26);
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(8, 14, 4, 26);
        ctx.stroke();
        ctx.strokeStyle = "#ffffff";
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
        if (arm.drawingArrow) {
          ctx.strokeStyle = skin.secondaryColor || "#ffffff";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-14, 0);
          ctx.lineTo(24, 0);
          ctx.stroke();
        }
      } else if (weapon === "gun") {
        ctx.fillStyle = "#1e293b";
        ctx.strokeStyle = skin.themeColor || "#38bdf8";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(-2, -4, 18, 7, 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(-2, -2, 4, 12);
        ctx.strokeStyle = skin.themeColor || "#ef4444";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(16, 0);
        ctx.lineTo(32, 0);
        ctx.stroke();
      } else if (weapon === "sword") {
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(-2, 0, 4, 12);
        ctx.fillStyle = skin.themeColor || "#cbd5e1";
        ctx.fillRect(-7, -2, 14, 3);
        ctx.fillStyle = "#f8fafc";
        ctx.strokeStyle = skin.themeColor || "#38bdf8";
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
      } else if (weapon === "shield") {
        ctx.fillStyle = "rgba(56, 189, 248, 0.35)";
        ctx.strokeStyle = skin.themeColor || "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (weapon === "hammer") {
        ctx.fillStyle = "#334155";
        ctx.fillRect(-2, -2, 4, 16);
        ctx.fillStyle = "#e2e8f0";
        ctx.strokeStyle = skin.themeColor || "#94a3b8";
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
      if (brawlSkinsRenderer.drawLimb(ctx, leg, skin, layer)) {
        return;
      }
      ctx.save();
      ctx.translate(leg.hipX, leg.hipY);
      ctx.rotate(leg.thighAngle);
      const isBack = layer === "backLeg";
      const armorCol = isBack ? "#090d18" : skin.armorColor || "#0f172a";
      const strokeCol = isBack ? "#1e293b" : skin.themeColor;
      ctx.fillStyle = armorCol;
      ctx.strokeStyle = strokeCol;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-5, 0, 10, 26, 4);
      ctx.fill();
      ctx.stroke();
      ctx.translate(0, 24);
      ctx.rotate(leg.shinAngle);
      ctx.fillStyle = armorCol;
      ctx.beginPath();
      ctx.roundRect(-5, 0, 10, 28, 4);
      ctx.fill();
      ctx.stroke();
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
      if (brawlSkinsRenderer.drawGuardShield(ctx, stance, skin, t)) {
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
      ctx.fillStyle = skin.glowColor || "rgba(0, 243, 255, 0.2)";
      ctx.lineWidth = 3;
      if (stance === "low") {
        ctx.beginPath();
        ctx.moveTo(10, -10);
        ctx.lineTo(44, -20);
        ctx.lineTo(36, -60);
        ctx.lineTo(6, -45);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
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
      if (brawlSkinsRenderer.drawAttackVFX(ctx, vfx, skin)) {
        return;
      }
      ctx.save();
      ctx.shadowColor = skin.themeColor;
      ctx.shadowBlur = 16;
      ctx.fillStyle = skin.themeColor;
      if (vfx.type === "punch") {
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 18, -Math.PI / 4, Math.PI / 4);
        ctx.lineWidth = 4;
        ctx.strokeStyle = skin.secondaryColor || "#ffffff";
        ctx.stroke();
        if (skin.id === "skin_dark_hacker") {
          ctx.font = "10px monospace";
          ctx.fillStyle = "#00ff66";
          ctx.fillText("0101", vfx.x - 10, vfx.y - 12);
        } else if (skin.id === "skin_solar_valkyrie") {
          ctx.fillStyle = "#ff4500";
          ctx.fillRect(vfx.x - 4, vfx.y - 4, 8, 8);
        } else if (skin.id === "skin_cyber_diva") {
          ctx.font = "13px sans-serif";
          ctx.fillStyle = "#f43f5e";
          ctx.fillText("\u266A", vfx.x - 6, vfx.y - 10);
        } else if (skin.id === "skin_cryo_maiden") {
          ctx.font = "12px sans-serif";
          ctx.fillStyle = "#bae6fd";
          ctx.fillText("\u2744", vfx.x - 6, vfx.y - 8);
        } else if (skin.id === "skin_cosmic_ronin") {
          ctx.font = "12px sans-serif";
          ctx.fillStyle = "#c084fc";
          ctx.fillText("\u2726", vfx.x - 6, vfx.y - 10);
        } else if (skin.id === "skin_archangel_judicator") {
          ctx.font = "14px sans-serif";
          ctx.fillStyle = "#ffffff";
          ctx.fillText("\u2727", vfx.x - 6, vfx.y - 10);
        } else if (skin.id === "skin_volt_ranger") {
          ctx.strokeStyle = "#fde047";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(vfx.x - 10, vfx.y - 10);
          ctx.lineTo(vfx.x - 4, vfx.y - 2);
          ctx.lineTo(vfx.x - 8, vfx.y + 2);
          ctx.lineTo(vfx.x, vfx.y + 8);
          ctx.stroke();
        } else if (skin.id === "skin_omega_emperor") {
          ctx.strokeStyle = "#fef08a";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(vfx.x, vfx.y, 12, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (vfx.type === "kick") {
        ctx.beginPath();
        ctx.arc(vfx.x - 10, vfx.y, 40, -Math.PI / 3, Math.PI / 6);
        ctx.lineWidth = 6;
        ctx.strokeStyle = skin.themeColor;
        ctx.stroke();
        if (skin.secondaryColor) {
          ctx.beginPath();
          ctx.arc(vfx.x - 10, vfx.y, 34, -Math.PI / 3, Math.PI / 6);
          ctx.lineWidth = 2;
          ctx.strokeStyle = skin.secondaryColor;
          ctx.stroke();
        }
      } else if (vfx.type === "shoryuken") {
        ctx.fillStyle = skin.glowColor;
        ctx.fillRect(vfx.x - 15, vfx.y, 30, 90);
        ctx.strokeStyle = skin.themeColor;
        ctx.lineWidth = 3;
        ctx.strokeRect(vfx.x - 15, vfx.y, 30, 90);
      } else if (vfx.type === "plasma_muzzle") {
        const rad = 10 + (vfx.progress || 0.5) * 14;
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, rad, 0, Math.PI * 2);
        ctx.lineWidth = 3;
        ctx.strokeStyle = skin.secondaryColor || "#ffffff";
        ctx.stroke();
        ctx.fillStyle = skin.themeColor;
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, rad * 0.45, 0, Math.PI * 2);
        ctx.fill();
      } else if (vfx.type === "dive_kick") {
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
        ctx.strokeStyle = skin.secondaryColor || "#ffffff";
        ctx.stroke();
      } else if (vfx.type === "crouch_punch") {
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 16, -Math.PI / 4, Math.PI / 4);
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = skin.secondaryColor || "#ffffff";
        ctx.stroke();
      } else if (vfx.type === "bow_arrow") {
        ctx.strokeStyle = skin.themeColor || "#a855f7";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 26, vfx.y);
        ctx.lineTo(vfx.x + 8, vfx.y);
        ctx.stroke();
        ctx.fillStyle = skin.secondaryColor || "#ffffff";
        ctx.beginPath();
        ctx.moveTo(vfx.x + 8, vfx.y - 3.5);
        ctx.lineTo(vfx.x + 16, vfx.y);
        ctx.lineTo(vfx.x + 8, vfx.y + 3.5);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = skin.themeColor || "#a855f7";
        ctx.fillRect(vfx.x - 26, vfx.y - 2.5, 6, 1.5);
        ctx.fillRect(vfx.x - 26, vfx.y + 1, 6, 1.5);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(vfx.x - 6, vfx.y, 7, -Math.PI * 0.4, Math.PI * 0.4);
        ctx.stroke();
      } else if (vfx.type === "gun_bullet") {
        ctx.fillStyle = "#ffedd5";
        ctx.beginPath();
        ctx.arc(vfx.x - 12, vfx.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = skin.secondaryColor || "#facc15";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 12, vfx.y);
        ctx.lineTo(vfx.x + 16, vfx.y);
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(vfx.x + 10, vfx.y - 1.5, 6, 3);
      } else if (vfx.type === "sword_slash_vfx") {
        ctx.strokeStyle = skin.secondaryColor || "#ffffff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(vfx.x - 8, vfx.y, 28, -Math.PI * 0.4, Math.PI * 0.4);
        ctx.stroke();
        ctx.strokeStyle = skin.themeColor || "#38bdf8";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(vfx.x - 8, vfx.y, 28, -Math.PI * 0.35, Math.PI * 0.35);
        ctx.stroke();
      } else if (vfx.type === "shield_strike") {
        ctx.strokeStyle = skin.themeColor || "#38bdf8";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 22, -Math.PI * 0.4, Math.PI * 0.4);
        ctx.stroke();
        ctx.fillStyle = skin.secondaryColor || "#ffffff";
        ctx.beginPath();
        ctx.arc(vfx.x + 6, vfx.y, 5, 0, Math.PI * 2);
        ctx.fill();
      } else if (vfx.type === "thor_lightning") {
        ctx.strokeStyle = skin.themeColor || "#38bdf8";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 12, vfx.y - 14);
        ctx.lineTo(vfx.x - 2, vfx.y - 2);
        ctx.lineTo(vfx.x - 6, vfx.y + 2);
        ctx.lineTo(vfx.x + 12, vfx.y + 14);
        ctx.stroke();
      } else if (vfx.type === "repulsor_blast") {
        ctx.strokeStyle = skin.themeColor || "#38bdf8";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 16, vfx.y);
        ctx.lineTo(vfx.x + 16, vfx.y);
        ctx.stroke();
      } else if (vfx.type === "web_stream") {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 24, vfx.y);
        ctx.lineTo(vfx.x + 12, vfx.y);
        ctx.stroke();
      } else if (vfx.type === "kamehameha_vfx" || vfx.type === "final_flash_vfx") {
        ctx.fillStyle = skin.themeColor || "#fde047";
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 6, 0, Math.PI * 2);
        ctx.fill();
      } else if (vfx.type === "death_beam_vfx") {
        ctx.strokeStyle = skin.themeColor || "#ef4444";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 20, vfx.y);
        ctx.lineTo(vfx.x + 20, vfx.y);
        ctx.stroke();
      } else if (vfx.type === "namek_arm_vfx") {
        ctx.strokeStyle = skin.themeColor || "#22c55e";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(vfx.x - 24, vfx.y);
        ctx.lineTo(vfx.x + 10, vfx.y);
        ctx.stroke();
      } else if (vfx.type === "infinity_vfx") {
        ctx.fillStyle = skin.themeColor || "#facc15";
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 12, 0, Math.PI * 2);
        ctx.fill();
      } else if (vfx.type === "sweep") {
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
      } else if (vfx.type === "hit_sparks") {
        for (let i = 0; i < 4; i++) {
          const ang = Math.PI * 2 / 4 * i;
          ctx.fillStyle = skin.themeColor;
          ctx.fillRect(Math.cos(ang) * 16, vfx.y + Math.sin(ang) * 16, 4, 4);
        }
      } else if (vfx.type === "victory_aura") {
        const time = vfx.time || 0;
        const themeCol = skin.themeColor || "#ffd700";
        ctx.save();
        ctx.shadowColor = themeCol;
        ctx.shadowBlur = 18;
        for (let i = 0; i < 6; i++) {
          const angle = time * 0.05 + i * (Math.PI / 3);
          const rad = 24 + Math.sin(time * 0.1 + i) * 6;
          const py = -30 - (time * 2 + i * 18) % 85;
          ctx.fillStyle = i % 2 === 0 ? "#ffd700" : themeCol;
          ctx.beginPath();
          ctx.arc(Math.cos(angle) * rad, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        const starX = 4;
        const starY = -132;
        const pulse = 6 + Math.sin(time * 0.2) * 3;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(starX - pulse * 2, starY);
        ctx.lineTo(starX + pulse * 2, starY);
        ctx.moveTo(starX, starY - pulse * 2);
        ctx.lineTo(starX, starY + pulse * 2);
        ctx.stroke();
        ctx.fillStyle = "#ffd700";
        ctx.beginPath();
        ctx.arc(starX, starY, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (vfx.type === "super_charge") {
        const time = vfx.time || 0;
        const themeCol = vfx.color || "#00f3ff";
        const rad = 14 + Math.sin(time * 0.3) * 4;
        ctx.save();
        ctx.shadowColor = themeCol;
        ctx.shadowBlur = 24;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(vfx.x - 4, vfx.y - 2, rad * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = themeCol;
        ctx.beginPath();
        ctx.arc(vfx.x - 4, vfx.y - 2, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
          const ang = time * 0.15 + i * (Math.PI / 2);
          const dist = 28 - time % 14;
          ctx.beginPath();
          ctx.moveTo(vfx.x - 4 + Math.cos(ang) * (dist + 8), vfx.y - 2 + Math.sin(ang) * (dist + 8));
          ctx.lineTo(vfx.x - 4 + Math.cos(ang) * dist, vfx.y - 2 + Math.sin(ang) * dist);
          ctx.stroke();
        }
        ctx.restore();
      } else if (vfx.type === "super_blast") {
        const time = vfx.time || 0;
        const themeCol = vfx.color || "#00f3ff";
        ctx.save();
        ctx.shadowColor = themeCol;
        ctx.shadowBlur = 32;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(vfx.x, vfx.y, 24 + Math.sin(time * 0.4) * 6, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
        ctx.fillStyle = themeCol;
        ctx.beginPath();
        ctx.arc(vfx.x + 8, vfx.y, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
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
      ctx.save();
      ctx.rotate(t * 0.02);
      ctx.shadowColor = skin.themeColor;
      ctx.shadowBlur = 20;
      ctx.strokeStyle = skin.themeColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const ang = Math.PI / 3 * i;
        const px = Math.cos(ang) * radius;
        const py = Math.sin(ang) * (radius * 0.35);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.rotate(-t * 0.03);
      ctx.strokeStyle = skin.secondaryColor || "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.75, radius * 0.28, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
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
  };
  var characterRenderer = new CharacterRenderer();

  // js/engine/announcer.js
  var AnnouncerEngine = class {
    constructor() {
      this.speechAvailable = typeof window !== "undefined" && "speechSynthesis" in window;
      this.voice = null;
      this.activeBanners = [];
      this.roundIntro = null;
      this.superCutIn = null;
      if (this.speechAvailable) {
        this._initVoice();
      }
    }
    _initVoice() {
      try {
        const updateVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          this.voice = voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Daniel") || v.name.includes("Alex"))) || voices.find((v) => v.lang.startsWith("en")) || voices[0];
        };
        updateVoices();
        if (typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
          window.speechSynthesis.onvoiceschanged = updateVoices;
        }
      } catch (e) {
      }
    }
    /**
     * 語音播報核心 (非同步零阻塞)
     */
    speak(text, { pitch = 1.05, rate = 1.1, volume = 0.9 } = {}) {
      if (!this.speechAvailable || !window.speechSynthesis) return;
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        if (this.voice) utter.voice = this.voice;
        utter.pitch = pitch;
        utter.rate = rate;
        utter.volume = volume;
        utter.lang = "en-US";
        window.speechSynthesis.speak(utter);
      } catch (e) {
      }
    }
    // ─── 標誌性格鬥語音觸發 ───
    startRoundIntro(round = 1, onFightStart = null) {
      this.roundIntro = {
        phase: "round",
        text: `ROUND ${round}`,
        timer: 45,
        maxTimer: 45,
        roundNumber: round,
        onFightStart
      };
      this.speak(`Round ${round}`, { pitch: 1, rate: 1 });
      soundEngine.playUI("countdown");
    }
    announceCounterHit() {
      this.triggerBanner({
        type: "counter",
        text: "COUNTER HIT!",
        subText: "\u2605 \u622A\u64CA\u7834\u62DB \u2605",
        color: "#ff3366",
        duration: 36
      });
      this.speak("Counter!", { pitch: 1.25, rate: 1.3 });
      soundEngine.playHit("heavy");
    }
    announceBurst() {
      this.triggerBanner({
        type: "burst",
        text: "BURST REVERSAL!",
        subText: "\u2605 \u91CF\u5B50\u9006\u8F49\u812B\u8EAB \u2605",
        color: "#ffd700",
        duration: 40
      });
      this.speak("Burst!", { pitch: 1.15, rate: 1.2 });
      soundEngine.playHit("burst");
    }
    announceCombo(hits) {
      if (hits < 3) return;
      let label = "GREAT COMBO!";
      let sub = "\u9023\u7E8C\u6253\u64CA";
      let voiceText = "Great!";
      let col = "#00f3ff";
      if (hits >= 7) {
        label = "\u2605 QUANTUM ULTRA! \u2605";
        sub = "\u795E\u4E4E\u5176\u6280 \u7D42\u6975\u9023\u6BB5";
        voiceText = "Quantum Ultra!";
        col = "#ffd700";
      } else if (hits >= 5) {
        label = "\u2605 MARVELOUS! \u2605";
        sub = "\u83EF\u9E97\u7834\u9632 \u9023\u74B0\u58D3\u5236";
        voiceText = "Marvelous!";
        col = "#ff007f";
      }
      this.triggerBanner({
        type: "combo",
        text: `${hits} HITS! ${label}`,
        subText: sub,
        color: col,
        duration: 38
      });
      this.speak(voiceText, { pitch: 1.2, rate: 1.25 });
    }
    announceSuper(charName, moveName, themeColor = "#00f3ff") {
      this.superCutIn = {
        charName,
        moveName,
        color: themeColor,
        timer: 42,
        maxTimer: 42
      };
      this.speak("Super Move!", { pitch: 1.1, rate: 1.15 });
      soundEngine.playHit("super");
    }
    announceKO() {
      this.triggerBanner({
        type: "ko",
        text: "K. O. !",
        subText: "\u2605 \u6C7A\u5B9A\u6027\u64CA\u5012 \u2605",
        color: "#ff0055",
        duration: 70
      });
      this.speak("K. O.!", { pitch: 0.9, rate: 0.95 });
      soundEngine.playHit("ko");
    }
    announceVictory(winnerName) {
      this.speak("Winner!", { pitch: 1.1, rate: 1.05 });
    }
    // ─── 橫幅堆疊管理 ───
    triggerBanner(banner) {
      this.activeBanners.push({
        ...banner,
        timer: banner.duration || 35,
        maxTimer: banner.duration || 35
      });
    }
    update() {
      if (this.roundIntro) {
        this.roundIntro.timer--;
        if (this.roundIntro.timer <= 0) {
          if (this.roundIntro.phase === "round") {
            this.roundIntro.phase = "fight";
            this.roundIntro.text = "FIGHT !";
            this.roundIntro.timer = 40;
            this.roundIntro.maxTimer = 40;
            this.speak("Fight!", { pitch: 1.2, rate: 1.15 });
            soundEngine.playUI("fight");
            if (this.roundIntro.onFightStart) {
              this.roundIntro.onFightStart();
            }
          } else {
            this.roundIntro = null;
          }
        }
      }
      if (this.superCutIn) {
        this.superCutIn.timer--;
        if (this.superCutIn.timer <= 0) {
          this.superCutIn = null;
        }
      }
      for (let i = this.activeBanners.length - 1; i >= 0; i--) {
        const b = this.activeBanners[i];
        b.timer--;
        if (b.timer <= 0) {
          this.activeBanners.splice(i, 1);
        }
      }
    }
    // ─── 畫布渲染橫幅 (Draw on Canvas) ───
    draw(ctx, w, h) {
      if (this.roundIntro) {
        this._drawRoundIntro(ctx, w, h, this.roundIntro);
      }
      if (this.superCutIn) {
        this._drawSuperCutIn(ctx, w, h, this.superCutIn);
      }
      this._drawActiveBanners(ctx, w, h);
    }
    _drawRoundIntro(ctx, w, h, intro) {
      const progress = 1 - intro.timer / intro.maxTimer;
      let scale = 1;
      let alpha = 1;
      if (progress < 0.2) {
        scale = 1.8 - progress * 4;
        alpha = progress * 5;
      } else if (progress > 0.8) {
        alpha = (1 - progress) * 5;
        scale = 1 + (progress - 0.8) * 1.2;
      }
      ctx.save();
      ctx.translate(w / 2, h * 0.38);
      ctx.scale(scale, scale);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const isFight = intro.phase === "fight";
      const mainColor = isFight ? "#ff007f" : "#00f3ff";
      const glowColor = isFight ? "#ffd700" : "#00f3ff";
      const beamW = Math.min(w * 0.9, 680);
      const grad = ctx.createLinearGradient(-beamW / 2, 0, beamW / 2, 0);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(0.5, "rgba(5, 8, 22, 0.88)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(-beamW / 2, -45, beamW, 90);
      ctx.fillStyle = glowColor;
      ctx.fillRect(-beamW * 0.4, -45, beamW * 0.8, 2.5);
      ctx.fillRect(-beamW * 0.4, 43, beamW * 0.8, 2.5);
      ctx.font = '900 68px "Orbitron", sans-serif';
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = mainColor;
      ctx.shadowBlur = 32;
      ctx.fillText(intro.text, 0, 0);
      ctx.strokeStyle = mainColor;
      ctx.lineWidth = 3;
      ctx.strokeText(intro.text, 0, 0);
      ctx.restore();
    }
    _drawSuperCutIn(ctx, w, h, cutIn) {
      const progress = 1 - cutIn.timer / cutIn.maxTimer;
      ctx.save();
      ctx.fillStyle = "rgba(2, 4, 12, 0.75)";
      ctx.fillRect(0, 0, w, h);
      const midY = h * 0.42;
      const bannerH = 120;
      ctx.fillStyle = "rgba(11, 17, 32, 0.95)";
      ctx.beginPath();
      ctx.moveTo(0, midY - bannerH / 2 - 20);
      ctx.lineTo(w, midY - bannerH / 2 + 20);
      ctx.lineTo(w, midY + bannerH / 2 + 20);
      ctx.lineTo(0, midY + bannerH / 2 - 20);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = cutIn.color || "#00f3ff";
      ctx.lineWidth = 4;
      ctx.shadowColor = cutIn.color || "#00f3ff";
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.moveTo(0, midY - bannerH / 2 - 20);
      ctx.lineTo(w, midY - bannerH / 2 + 20);
      ctx.moveTo(0, midY + bannerH / 2 - 20);
      ctx.lineTo(w, midY + bannerH / 2 + 20);
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = '900 22px "Orbitron", sans-serif';
      ctx.fillStyle = "#ffd700";
      ctx.shadowColor = "#ffd700";
      ctx.shadowBlur = 14;
      ctx.fillText(`\u26A1 CLIMAX SUPER MOVE \u2022 \u7D42\u6975\u5967\u7FA9 \u26A1`, w / 2, midY - 24);
      ctx.font = '900 42px "Noto Sans TC", "Orbitron", sans-serif';
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = cutIn.color || "#00f3ff";
      ctx.shadowBlur = 28;
      ctx.fillText(`${cutIn.charName}\uFF1A${cutIn.moveName}`, w / 2, midY + 18);
      ctx.restore();
    }
    _drawActiveBanners(ctx, w, h) {
      if (this.activeBanners.length === 0) return;
      this.activeBanners.forEach((b, idx) => {
        const progress = 1 - b.timer / b.maxTimer;
        const alpha = progress < 0.15 ? progress / 0.15 : progress > 0.8 ? (1 - progress) / 0.2 : 1;
        const scale = progress < 0.15 ? 0.7 + progress / 0.15 * 0.3 : 1;
        const posY = Math.max(120, h * 0.26) + idx * 56;
        ctx.save();
        ctx.translate(w / 2, posY);
        ctx.scale(scale, scale);
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const bw = Math.min(w * 0.75, 420);
        const bh = 42;
        ctx.fillStyle = "rgba(11, 17, 32, 0.88)";
        ctx.strokeStyle = b.color || "#00f3ff";
        ctx.lineWidth = 2;
        ctx.shadowColor = b.color || "#00f3ff";
        ctx.shadowBlur = 18;
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 8);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
          ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
        }
        ctx.font = '900 20px "Orbitron", sans-serif';
        ctx.fillStyle = b.color || "#ffffff";
        ctx.shadowColor = b.color || "#00f3ff";
        ctx.shadowBlur = 12;
        ctx.fillText(b.text, 0, -3);
        if (b.subText) {
          ctx.font = 'bold 10px "Noto Sans TC", sans-serif';
          ctx.fillStyle = "#cbd5e1";
          ctx.shadowBlur = 0;
          ctx.fillText(b.subText, 0, 13);
        }
        ctx.restore();
      });
    }
  };
  var announcerEngine = new AnnouncerEngine();

  // js/engine/combat.js
  var CombatEngine = class {
    constructor() {
      this.arenaWidth = 1e3;
      this.floorY = 380;
      this.platforms = [];
      this.updatePlatforms(this.arenaWidth, this.floorY);
      this.p1 = null;
      this.p2 = null;
      this.projectiles = [];
      this.shockwaves = [];
      this.floatingTexts = [];
      this.hitSparks = [];
      this.hitStop = 0;
      this.superFreeze = 0;
      this.slowMoTimer = 0;
      this.screenShake = { x: 0, y: 0, intensity: 0 };
      this.roundTime = 99;
      this.timerAcc = 0;
      this.isOver = false;
      this.winner = null;
      this.isTraining = false;
      this.trainingSettings = {
        dummyStance: "stand",
        // 'stand', 'crouch', 'jump'
        dummyGuard: "none",
        // 'none', 'stand_guard', 'crouch_guard', 'after_first_hit'
        dummyReversal: false,
        // 甦醒第一幀升龍
        instantCd: false
        // 技能即時無冷卻
      };
      this.enableHaptics = true;
    }
    triggerScreenShake(intensity = 4) {
      this.screenShake.intensity = Math.max(this.screenShake.intensity, intensity);
    }
    updatePlatforms(arenaWidth = this.arenaWidth, floorY = this.floorY) {
      this.arenaWidth = arenaWidth;
      this.floorY = floorY;
      const w = Math.min(260, Math.max(180, Math.round(arenaWidth * 0.22)));
      const leftX = Math.round(arenaWidth * 0.14);
      const rightX = Math.round(arenaWidth * 0.86 - w);
      const centerX = Math.round((arenaWidth - w) / 2);
      const lowerY = Math.round(floorY - 145);
      const upperY = Math.round(floorY - 265);
      this.platforms = [
        { id: "plat_left", x: leftX, y: lowerY, width: w, height: 18, color: "#00f3ff" },
        { id: "plat_right", x: rightX, y: lowerY, width: w, height: 18, color: "#ff007f" },
        { id: "plat_center", x: centerX, y: upperY, width: w, height: 18, color: "#ffd700" }
      ];
    }
    initMatch(p1Data, p2Data, isTraining = false, trainingOpts = {}) {
      this.isTraining = isTraining;
      this.isOver = false;
      this.winner = null;
      this.roundTime = 99;
      this.timerAcc = 0;
      this.projectiles = [];
      this.shockwaves = [];
      this.floatingTexts = [];
      this.hitSparks = [];
      this.hitStop = 0;
      this.superFreeze = 0;
      this.slowMoTimer = 0;
      this.screenShake = { x: 0, y: 0, intensity: 0 };
      if (isTraining && trainingOpts) {
        this.trainingSettings = { ...this.trainingSettings, ...trainingOpts };
      }
      const p1StartX = Math.max(160, Math.round(this.arenaWidth * 0.25));
      const p2StartX = Math.min(this.arenaWidth - 160, Math.round(this.arenaWidth * 0.75));
      this.p1 = this._createFighter(1, p1StartX, p1Data);
      this.p2 = this._createFighter(2, p2StartX, p2Data);
      this.p1.facing = 1;
      this.p2.facing = -1;
    }
    _createFighter(id, x, data) {
      const skillList = data.loadout && data.loadout.length === 3 ? data.loadout.map((sid) => SKILLS.find((s) => s.id === sid) || SKILLS[0]) : [SKILLS[0], SKILLS[1], SKILLS[8]];
      return {
        id,
        name: data.name || (id === 1 ? "Player 1" : "Player 2"),
        skin: data.skin,
        x,
        y: this.floorY,
        vx: 0,
        vy: 0,
        facing: id === 1 ? 1 : -1,
        isGrounded: true,
        currentPlatform: null,
        maxHp: 1e3,
        hp: 1e3,
        state: "idle",
        // idle, walk_fwd, walk_back, jump, crouch, high_guard, low_guard, light_punch, heavy_kick, ranged_attack, skill, hit_stun, knockdown, wakeup, super_move
        stateTime: 0,
        stateDuration: 0,
        currentAction: null,
        isGuarding: false,
        guardStance: "high",
        // 'high' 或 'low'
        invincibleTimer: 0,
        rangedCooldown: 0,
        // 終極必殺量表 (Super Gauge - 滿 1000 或殘血逆境覺醒時可發動奧義)
        superMeter: 300,
        superMax: 1e3,
        usedCrisisSuper: false,
        // 量子逆轉爆發 (Burst)
        burstMeter: 500,
        // 滿 500 點可施展
        burstMax: 500,
        burstAvailable: true,
        frostTimer: 0,
        // 冰凍減速計時器
        // 3 大自選技能
        skills: skillList,
        cooldowns: [0, 0, 0],
        // 連段統計
        comboCount: 0,
        comboDamage: 0,
        comboResetTimer: 0,
        frameAdvantage: 0
        // 幀數優劣勢 (+有利 / -不利)
      };
    }
    /**
     * 60 FPS 物理推進核心
     */
    update(inputsP1, inputsP2) {
      if (this.isOver) {
        if (this.p1) this.p1.stateTime++;
        if (this.p2) this.p2.stateTime++;
        this._updateFloatingTexts();
        return;
      }
      if (this.superFreeze > 0) {
        this.superFreeze--;
        announcerEngine.update();
        this._updateFloatingTexts();
        return;
      }
      if (this.slowMoTimer > 0) {
        this.slowMoTimer--;
        if (this.slowMoTimer % 3 !== 0) {
          this._updateHitSparks();
          this._updateFloatingTexts();
          this._updateShockwaves();
          announcerEngine.update();
          return;
        }
      }
      announcerEngine.update();
      if (this.isTraining) {
        if (this.trainingSettings.instantCd) {
          this.p1.cooldowns = [0, 0, 0];
          this.p2.cooldowns = [0, 0, 0];
        }
        if (this.p2.hp <= 150 || this.p2.hp < this.p2.maxHp && this.p2.comboCount === 0 && this.p2.state === "idle") {
          this.p2.hp = Math.min(this.p2.maxHp, this.p2.hp + 12);
        }
        if (this.p1.hp <= 100) {
          this.p1.hp = this.p1.maxHp;
        }
      }
      if (!this.isTraining) {
        this.timerAcc++;
        if (this.timerAcc >= 60) {
          this.timerAcc = 0;
          this.roundTime--;
          if (this.roundTime <= 0) {
            this.roundTime = 0;
            this._handleTimeOver();
          }
        }
      }
      if (this.screenShake.intensity > 0.15) {
        this.screenShake.x = (Math.random() - 0.5) * this.screenShake.intensity * 2.2;
        this.screenShake.y = (Math.random() - 0.5) * this.screenShake.intensity * 2.2;
        this.screenShake.intensity *= 0.82;
      } else {
        this.screenShake.x = 0;
        this.screenShake.y = 0;
        this.screenShake.intensity = 0;
      }
      this._updateHitSparks();
      if (this.hitStop > 0) {
        this.hitStop--;
        return;
      }
      this._updateFighter(this.p1, this.p2, inputsP1);
      this._updateFighter(this.p2, this.p1, inputsP2);
      this._updateProjectiles();
      this._updateShockwaves();
      this._updateFloatingTexts();
      this._resolvePositions();
      if (!this.isTraining && !this.isOver) {
        if (this.p1.hp <= 0 && this.p2.hp <= 0) {
          this.isOver = true;
          this.winner = 0;
          this.slowMoTimer = 45;
          this.hitStop = 18;
          this.triggerScreenShake(16);
          announcerEngine.announceKO();
          this._triggerMatchEndStates();
        } else if (this.p1.hp <= 0) {
          this.isOver = true;
          this.winner = 2;
          this.slowMoTimer = 45;
          this.hitStop = 18;
          this.triggerScreenShake(16);
          announcerEngine.announceKO();
          this._triggerMatchEndStates();
        } else if (this.p2.hp <= 0) {
          this.isOver = true;
          this.winner = 1;
          this.slowMoTimer = 45;
          this.hitStop = 18;
          this.triggerScreenShake(16);
          announcerEngine.announceKO();
          this._triggerMatchEndStates();
        }
      }
    }
    _triggerMatchEndStates() {
      const targetX = this.winner === 1 ? this.p2.x : this.winner === 2 ? this.p1.x : (this.p1.x + this.p2.x) / 2;
      const targetY = this.winner === 1 ? this.p2.y - 60 : this.winner === 2 ? this.p1.y - 60 : 350;
      this.shockwaves.push({
        x: targetX,
        y: targetY,
        radius: 10,
        maxRadius: 420,
        color: "#ffd700",
        duration: 50,
        lineWidth: 8,
        isKO: true
      });
      if (this.winner === 1) {
        this.p1.state = "victory";
        this.p1.stateTime = 0;
        this.p1.vx = 0;
        this.p1.vy = 0;
        if (this.p2.state !== "knockdown") {
          this.p2.state = "defeat";
          this.p2.stateTime = 0;
          this.p2.vx = 0;
        }
        this.floatingTexts.push({
          text: "VICTORY!",
          x: this.p1.x,
          y: this.p1.y - 145,
          color: "#ffd700",
          life: 180
        });
      } else if (this.winner === 2) {
        this.p2.state = "victory";
        this.p2.stateTime = 0;
        this.p2.vx = 0;
        this.p2.vy = 0;
        if (this.p1.state !== "knockdown") {
          this.p1.state = "defeat";
          this.p1.stateTime = 0;
          this.p1.vx = 0;
        }
        this.floatingTexts.push({
          text: "VICTORY!",
          x: this.p2.x,
          y: this.p2.y - 145,
          color: "#ff007f",
          life: 180
        });
      }
    }
    _updateFighter(char, opp, input) {
      char.stateTime++;
      if (char.invincibleTimer > 0) char.invincibleTimer--;
      for (let i = 0; i < char.cooldowns.length; i++) {
        if (char.cooldowns[i] > 0) {
          char.cooldowns[i] = Math.max(0, char.cooldowns[i] - 1 / 60);
        }
      }
      if (char.rangedCooldown > 0) char.rangedCooldown--;
      if (char.frostTimer > 0) char.frostTimer--;
      if (char.comboResetTimer > 0) {
        char.comboResetTimer--;
        if (char.comboResetTimer <= 0) {
          char.comboCount = 0;
          char.comboDamage = 0;
        }
      }
      const moveY = input ? input.y || 0 : 0;
      if (char.isGrounded && char.currentPlatform && moveY > 0.55) {
        char.isGrounded = false;
        char.y += 6;
        char.vy = 2;
        char.currentPlatform = null;
      }
      const prevY = char.y;
      if (!char.isGrounded) {
        char.vy += 0.66;
        if (input && Math.abs(input.x || 0) > 0.1) {
          char.vx += (input.x || 0) * 0.55;
          char.vx = Math.max(-5, Math.min(5, char.vx));
        }
        char.x += char.vx;
        char.y += char.vy;
        let landedOnPlatform = false;
        if (char.vy >= 0) {
          for (const plat of this.platforms) {
            const inX = char.x >= plat.x - 12 && char.x <= plat.x + plat.width + 12;
            if (inX && prevY <= plat.y + 4 && char.y >= plat.y) {
              char.y = plat.y;
              char.vy = 0;
              char.vx *= 0.6;
              char.isGrounded = true;
              char.currentPlatform = plat;
              char.facing = char.x < opp.x ? 1 : -1;
              if (char.state === "jump") {
                char.state = "idle";
                char.stateTime = 0;
                char.currentAction = null;
              }
              landedOnPlatform = true;
              break;
            }
          }
        }
        if (!landedOnPlatform && char.y >= this.floorY) {
          char.y = this.floorY;
          char.vy = 0;
          char.vx = 0;
          char.isGrounded = true;
          char.currentPlatform = null;
          char.facing = char.x < opp.x ? 1 : -1;
          if (char.state === "jump") {
            char.state = "idle";
            char.stateTime = 0;
            char.currentAction = null;
          }
        }
      } else {
        if (char.currentPlatform) {
          const plat = char.currentPlatform;
          if (char.x < plat.x - 16 || char.x > plat.x + plat.width + 16) {
            char.isGrounded = false;
            char.currentPlatform = null;
          }
        }
        char.x += char.vx;
        char.vx *= 0.75;
      }
      char.x = Math.max(50, Math.min(this.arenaWidth - 50, char.x));
      const tryBurst = input && (input.burst || input.punch && input.kick);
      if (tryBurst && char.state === "hit_stun" && char.burstMeter >= char.burstMax && char.burstAvailable) {
        this._executeBurst(char, opp);
        return;
      }
      switch (char.state) {
        case "idle":
        case "walk_fwd":
        case "walk_back":
        case "crouch":
        case "high_guard":
        case "low_guard":
          this._handleNormalInputs(char, opp, input);
          break;
        case "jump":
          if (!char.currentAction) {
            char.facing = char.x < opp.x ? 1 : -1;
          }
          if (input) {
            if (input.skill1 && char.cooldowns[0] <= 0) {
              this._executeSkill(char, opp, 0);
              break;
            }
            if (input.skill2 && char.cooldowns[1] <= 0) {
              this._executeSkill(char, opp, 1);
              break;
            }
            if (input.skill3 && char.cooldowns[2] <= 0) {
              this._executeSkill(char, opp, 2);
              break;
            }
          }
          if (char.currentAction) {
            this._updateAttackAction(char, opp);
          } else if (input && (input.punch || input.kick)) {
            char.facing = char.x < opp.x ? 1 : -1;
            this._executeAirAttack(char, opp, input.kick ? "kick" : "punch");
          }
          break;
        case "light_punch":
        case "heavy_kick":
        case "crouch_punch":
        case "crouch_kick":
        case "ranged_attack":
        case "skill":
          this._updateAttackAction(char, opp);
          break;
        case "super_move":
          this._updateSuperAction(char, opp);
          break;
        case "hit_stun":
          if (char.stateTime >= char.stateDuration) {
            char.state = "idle";
            char.stateTime = 0;
            char.currentAction = null;
          }
          break;
        case "knockdown":
          if (char.stateTime >= 40) {
            char.state = "wakeup";
            char.stateTime = 0;
            char.invincibleTimer = 15;
            soundEngine.playHit("slide");
          }
          break;
        case "wakeup":
          if (char.stateTime >= 15) {
            char.state = "idle";
            char.stateTime = 0;
            char.currentAction = null;
          }
          break;
      }
    }
    _handleNormalInputs(char, opp, input) {
      if (!input) {
        char.state = "idle";
        char.isGuarding = false;
        return;
      }
      if (char.isGrounded) {
        char.facing = char.x < opp.x ? 1 : -1;
      }
      if (input.superMove && (char.superMeter >= char.superMax || char.hp <= 350 && !char.usedCrisisSuper)) {
        this._executeSuperMove(char, opp);
        return;
      }
      if (input.skill1 && char.cooldowns[0] <= 0) {
        this._executeSkill(char, opp, 0);
        return;
      }
      if (input.skill2 && char.cooldowns[1] <= 0) {
        this._executeSkill(char, opp, 1);
        return;
      }
      if (input.skill3 && char.cooldowns[2] <= 0) {
        this._executeSkill(char, opp, 2);
        return;
      }
      const moveX = input.x || 0;
      const moveY = input.y || 0;
      const isCrouching = (moveY > 0.35 || char.state === "crouch") && char.isGrounded;
      if (input.punch) {
        if (isCrouching) {
          this._executeCrouchPunch(char, opp);
        } else {
          this._executeLightPunch(char, opp);
        }
        return;
      }
      if (input.kick) {
        if (isCrouching) {
          this._executeCrouchKick(char, opp);
        } else {
          this._executeHeavyKick(char, opp);
        }
        return;
      }
      if (input.guard && char.isGrounded) {
        const wasGuarding = char.isGuarding;
        char.isGuarding = true;
        if (moveY > 0.4) {
          char.state = "low_guard";
          char.guardStance = "low";
        } else {
          char.state = "high_guard";
          char.guardStance = "high";
        }
        if (!wasGuarding) {
          soundEngine.playHit("shield_up");
        }
        return;
      }
      if (moveY < -0.35 && char.isGrounded) {
        char.isGrounded = false;
        char.currentPlatform = null;
        char.vy = -13.6;
        char.vx = moveX * 4.6;
        char.state = "jump";
        char.stateTime = 0;
        char.isGuarding = false;
        soundEngine.playHit("dp");
        return;
      }
      if (moveY > 0.35 && char.isGrounded) {
        char.state = "crouch";
        char.isGuarding = false;
        return;
      }
      if (Math.abs(moveX) > 0.15) {
        const speedMod = char.frostTimer && char.frostTimer > 0 ? 0.55 : 1;
        const isMovingFwd = char.facing === 1 && moveX > 0 || char.facing === -1 && moveX < 0;
        if (isMovingFwd) {
          char.x += char.facing * 5 * speedMod;
          char.state = "walk_fwd";
          char.isGuarding = false;
        } else {
          char.x -= char.facing * 3.6 * speedMod;
          char.state = "walk_back";
          char.isGuarding = false;
        }
        return;
      }
      char.state = "idle";
      char.isGuarding = false;
    }
    // ─── 量子逆轉爆發系統 (Quantum Burst) ───
    _executeBurst(char, opp) {
      char.burstMeter = 0;
      char.burstAvailable = false;
      char.state = "idle";
      char.stateTime = 0;
      char.invincibleTimer = 10;
      soundEngine.playHit("burst");
      announcerEngine.announceBurst();
      this._triggerHaptic(80);
      this.shockwaves.push({
        x: char.x,
        y: char.y - 70,
        radius: 10,
        maxRadius: 150,
        color: "#ffd700",
        duration: 20
      });
      const dist = Math.abs(char.x - opp.x);
      if (dist < 260) {
        opp.vx = char.facing * 18;
        opp.state = "hit_stun";
        opp.stateTime = 0;
        opp.stateDuration = 20;
        opp.hp = Math.max(1, opp.hp - 40);
        this.floatingTexts.push({
          text: "QUANTUM BURST!",
          x: char.x,
          y: char.y - 120,
          color: "#ffd700",
          life: 45
        });
      }
    }
    // ─── 角色專屬終極必殺大絕招 (Cinematic Super Moves - 26 外觀各自專屬奧義) ───
    _executeSuperMove(char, opp) {
      char.superMeter = 0;
      if (char.hp <= 350) char.usedCrisisSuper = true;
      const meta = getSkinSuperMeta(char.skin);
      this.superFreeze = 42;
      char.invincibleTimer = 55;
      char.state = "super_move";
      char.stateTime = 0;
      char.stateDuration = meta.duration || 65;
      char.vx = 0;
      this.triggerScreenShake(14);
      soundEngine.playHit("super");
      this._triggerHaptic(90);
      announcerEngine.announceSuper(char.skin.name, meta.name, char.skin.themeColor);
      char.currentAction = {
        id: "SUPER",
        type: "super_move",
        name: meta.name,
        meta,
        hitChecked: false,
        hitsDone: 0,
        totalHits: 10,
        damagePerHit: 22,
        // 10 hits * 22 = 220 點傷害，對稱公平
        color: meta.color,
        coreColor: meta.coreColor,
        beamWidth: meta.beamWidth
      };
    }
    _updateSuperAction(char, opp) {
      const action = char.currentAction;
      if (!action) return;
      const t = char.stateTime;
      if (t === 22) {
        this.triggerScreenShake(10);
        soundEngine.playHit("heavy");
        this.shockwaves.push({
          ownerId: char.id,
          x: char.x + char.facing * (this.arenaWidth / 2),
          y: char.y - 74,
          width: this.arenaWidth,
          height: action.beamWidth || 80,
          isSuperBeam: true,
          beamType: action.meta.type,
          color: action.color,
          coreColor: action.coreColor,
          facing: char.facing,
          duration: 34
        });
      }
      if (t >= 22 && t <= 50 && t % 3 === 0 && action.hitsDone < action.totalHits) {
        action.hitsDone++;
        const isInFront = char.facing === 1 && opp.x >= char.x - 20 || char.facing === -1 && opp.x <= char.x + 20;
        const isVerticalInRange = Math.abs(char.y - opp.y) <= 150;
        if (isInFront && isVerticalInRange && opp.invincibleTimer <= 0) {
          opp.hp = Math.max(0, opp.hp - action.damagePerHit);
          opp.state = "hit_stun";
          opp.stateTime = 0;
          opp.stateDuration = 20;
          opp.vx = char.facing * 3.5;
          this.triggerScreenShake(4.5);
          this.hitStop = Math.max(this.hitStop, 2);
          this._triggerHaptic(30);
          const sparkX = opp.x;
          const sparkY = opp.y - 70;
          this.hitSparks.push({
            type: "super_hit",
            x: sparkX,
            y: sparkY,
            color: action.color,
            coreRadius: 25,
            life: 16,
            maxLife: 16,
            rays: Array.from({ length: 6 }, (_, i) => ({
              angle: Math.PI * 2 / 6 * i,
              len: 26
            }))
          });
          char.comboCount++;
          char.comboDamage += action.damagePerHit;
          char.comboResetTimer = 50;
          this.floatingTexts.push({
            text: `ULTRA -${action.damagePerHit}`,
            x: opp.x,
            y: opp.y - 95 - action.hitsDone % 3 * 16,
            color: action.color,
            life: 25
          });
          if (opp.hp <= 0 && !this.isOver && !this.isTraining) {
            this.isOver = true;
            this.winner = char.id;
            this.slowMoTimer = 45;
            this.hitStop = 18;
            this.triggerScreenShake(16);
            announcerEngine.announceKO();
            this._triggerMatchEndStates();
          }
        }
      }
      if (t >= char.stateDuration) {
        char.state = char.isGrounded ? "idle" : "jump";
        char.stateTime = 0;
        char.currentAction = null;
      }
    }
    // ─── 普攻打擊體系 (站立、下蹲、空中全細節三段判定) ───
    _executeLightPunch(char, opp) {
      char.isGuarding = false;
      char.state = "light_punch";
      char.stateTime = 0;
      char.stateDuration = 16;
      const meta = getSkinAttackMeta(char.skin, "light_punch");
      char.currentAction = {
        name: meta.name || "\u523A\u62F3\u6253\u64CA",
        startup: 4,
        active: 5,
        recovery: 7,
        damage: 80,
        guardType: "all",
        hitChecked: false,
        style: meta.style,
        vfxType: meta.vfxType
      };
      soundEngine.playHit(meta.sound || "whiff_punch");
    }
    _executeHeavyKick(char, opp) {
      char.isGuarding = false;
      char.state = "heavy_kick";
      char.stateTime = 0;
      char.stateDuration = 20;
      const meta = getSkinAttackMeta(char.skin, "heavy_kick");
      char.currentAction = {
        name: meta.name || "\u91CD\u529B\u731B\u8E22",
        startup: 6,
        active: 6,
        recovery: 8,
        damage: 145,
        guardType: "all",
        hitChecked: false,
        style: meta.style,
        vfxType: meta.vfxType
      };
      soundEngine.playHit(meta.sound || "whiff_kick");
    }
    _executeCrouchPunch(char, opp) {
      char.isGuarding = false;
      char.state = "crouch_punch";
      char.stateTime = 0;
      char.stateDuration = 15;
      const meta = getSkinAttackMeta(char.skin, "crouch_punch");
      char.currentAction = {
        name: meta.name || "\u4E0B\u8E72\u523A\u62F3",
        startup: 4,
        active: 4,
        recovery: 7,
        damage: 85,
        guardType: "all",
        hitChecked: false,
        style: meta.style,
        vfxType: meta.vfxType
      };
      soundEngine.playHit(meta.sound || "whiff_punch");
    }
    _executeCrouchKick(char, opp) {
      char.isGuarding = false;
      char.state = "crouch_kick";
      char.stateTime = 0;
      char.stateDuration = 20;
      const meta = getSkinAttackMeta(char.skin, "crouch_kick");
      char.currentAction = {
        name: meta.name || "\u4E0B\u8E72\u6383\u5802\u817F",
        startup: 6,
        active: 6,
        recovery: 8,
        damage: 135,
        guardType: "crouch_only",
        // 下段判定：站防無效，必須蹲防！
        knockdown: true,
        // 命中掃翻倒地！
        hitChecked: false,
        style: meta.style,
        vfxType: meta.vfxType
      };
      soundEngine.playHit("sweep");
      soundEngine.playHit(meta.sound || "whiff_kick");
    }
    _executeAirAttack(char, opp, type) {
      char.isGuarding = false;
      char.state = "jump";
      char.stateTime = 0;
      char.stateDuration = 16;
      char.currentAction = {
        name: type === "kick" ? "\u8E8D\u7A7A\u91CD\u98DB\u8E22" : "\u8DF3\u8E8D\u523A\u62F3",
        startup: 4,
        active: 6,
        recovery: 6,
        damage: type === "kick" ? 155 : 90,
        guardType: "stand_only",
        // 空中打擊視為中段，不可蹲防！
        knockdown: type === "kick",
        // 空中重飛踢擊倒對手
        hitChecked: false
      };
      soundEngine.playHit(type === "kick" ? "whiff_kick" : "whiff_punch");
    }
    // ─── 遠程攻擊：全域多元光子武裝體系 (直射/下段爬行波/重砲/防空高射/躍空俯衝/垂直爆彈) ───
    _executeRangedAttack(char, opp) {
      char.isGuarding = false;
      char.state = "ranged_attack";
      char.stateTime = 0;
      char.stateDuration = 18;
      char.rangedCooldown = 24;
      char.currentAction = {
        name: "\u91CF\u5B50\u76F4\u5C04\u5149\u5F48",
        startup: 4,
        active: 5,
        recovery: 9,
        damage: 110,
        guardType: "all",
        isRanged: true,
        hitChecked: true
      };
      soundEngine.playHit("projectile");
      this.projectiles.push({
        ownerId: char.id,
        type: "normal",
        name: "\u91CF\u5B50\u76F4\u5C04\u5149\u5F48",
        x: char.x + char.facing * 42,
        y: char.y - 74,
        vx: char.facing * 8.8,
        // 敏捷流暢飛行
        vy: 0,
        radius: 9,
        damage: 110,
        guardType: "all",
        skin: char.skin,
        life: 110
      });
    }
    _executeCrouchRangedAttack(char, opp) {
      char.isGuarding = false;
      char.state = "crouch_punch";
      char.stateTime = 0;
      char.stateDuration = 18;
      char.rangedCooldown = 24;
      char.currentAction = {
        name: "\u5730\u88C2\u722C\u884C\u9707\u6CE2",
        startup: 4,
        active: 5,
        recovery: 9,
        damage: 135,
        guardType: "crouch_only",
        // 下段判定！站立防禦無效，必須蹲防或翻越！
        knockdown: true,
        isRanged: true,
        hitChecked: true
      };
      soundEngine.playHit("sweep");
      this.projectiles.push({
        ownerId: char.id,
        type: "ground_wave",
        name: "\u5730\u88C2\u722C\u884C\u9707\u6CE2",
        x: char.x + char.facing * 36,
        y: this.floorY - 14,
        vx: char.facing * 7,
        vy: 0,
        radius: 13,
        damage: 135,
        guardType: "crouch_only",
        knockdown: true,
        skin: char.skin,
        life: 120
      });
    }
    _executeHeavyRangedAttack(char, opp) {
      char.isGuarding = false;
      char.state = "ranged_attack";
      char.stateTime = 0;
      char.stateDuration = 20;
      char.rangedCooldown = 28;
      char.currentAction = {
        name: "\u8D85\u8F09\u7A7F\u900F\u91CD\u7832",
        startup: 6,
        active: 6,
        recovery: 8,
        damage: 160,
        guardType: "all",
        knockdown: true,
        // 命中直接擊倒！
        isRanged: true,
        hitChecked: true
      };
      soundEngine.playHit("beam");
      this.triggerScreenShake(3);
      this.projectiles.push({
        ownerId: char.id,
        type: "heavy",
        name: "\u8D85\u8F09\u7A7F\u900F\u91CD\u7832",
        x: char.x + char.facing * 46,
        y: char.y - 74,
        vx: char.facing * 10.5,
        vy: 0,
        radius: 16,
        damage: 160,
        guardType: "all",
        knockdown: true,
        skin: char.skin,
        life: 100
      });
    }
    _executeAntiAirRangedAttack(char, opp) {
      char.isGuarding = false;
      char.state = "ranged_attack";
      char.stateTime = 0;
      char.stateDuration = 18;
      char.rangedCooldown = 24;
      char.currentAction = {
        name: "\u5C0D\u7A7A\u9AD8\u5C04\u96E2\u5B50\u5F48",
        startup: 4,
        active: 5,
        recovery: 9,
        damage: 120,
        guardType: "all",
        isRanged: true,
        hitChecked: true
      };
      soundEngine.playHit("projectile");
      this.projectiles.push({
        ownerId: char.id,
        type: "anti_air",
        name: "\u5C0D\u7A7A\u9AD8\u5C04\u96E2\u5B50\u5F48",
        x: char.x + char.facing * 40,
        y: char.y - 88,
        vx: char.facing * 7,
        vy: -7.5,
        radius: 10,
        damage: 120,
        guardType: "all",
        skin: char.skin,
        life: 110
      });
    }
    _executeAirRangedAttack(char, opp) {
      char.isGuarding = false;
      char.state = "jump";
      char.stateTime = 0;
      char.stateDuration = 16;
      char.rangedCooldown = 22;
      char.currentAction = {
        name: "\u8E8D\u7A7A\u4FEF\u885D\u5149\u5F48",
        startup: 4,
        active: 6,
        recovery: 6,
        damage: 115,
        guardType: "all",
        isRanged: true,
        hitChecked: true
      };
      soundEngine.playHit("projectile");
      this.projectiles.push({
        ownerId: char.id,
        type: "air_dive",
        name: "\u8E8D\u7A7A\u4FEF\u885D\u5149\u5F48",
        x: char.x + char.facing * 42,
        y: char.y - 50,
        vx: char.facing * 8,
        vy: 2,
        radius: 9,
        damage: 115,
        guardType: "all",
        skin: char.skin,
        life: 110
      });
    }
    _executeAirBombAttack(char, opp) {
      char.isGuarding = false;
      char.state = "jump";
      char.stateTime = 0;
      char.stateDuration = 18;
      char.rangedCooldown = 24;
      char.currentAction = {
        name: "\u7A7A\u5C0D\u5730\u96E2\u5B50\u7206\u5F48",
        startup: 4,
        active: 6,
        recovery: 8,
        damage: 145,
        guardType: "stand_only",
        // 中段落雷判定，不可蹲防！
        knockdown: true,
        isRanged: true,
        hitChecked: true
      };
      soundEngine.playHit("projectile");
      this.projectiles.push({
        ownerId: char.id,
        type: "bomb",
        name: "\u7A7A\u5C0D\u5730\u96E2\u5B50\u7206\u5F48",
        x: char.x + char.facing * 25,
        y: char.y - 30,
        vx: char.facing * 3.5,
        vy: 7,
        radius: 12,
        damage: 145,
        guardType: "stand_only",
        knockdown: true,
        skin: char.skin,
        life: 100
      });
    }
    // ─── 10 大核心技能執行 ───
    _executeSkill(char, opp, slotIdx) {
      const skill = char.skills[slotIdx];
      if (!skill) return;
      char.isGuarding = false;
      char.cooldowns[slotIdx] = skill.cd;
      char.state = "skill";
      char.stateTime = 0;
      char.stateDuration = skill.startup + skill.active + skill.recovery;
      char.currentAction = {
        ...skill,
        hitChecked: false
      };
      switch (skill.id) {
        case "SK-01":
          soundEngine.playHit("laser");
          break;
        case "SK-02":
          char.invincibleTimer = skill.invincibleFrames || 4;
          char.isGrounded = false;
          char.vy = -13;
          char.vx = char.facing * 3.2;
          soundEngine.playHit("dp");
          break;
        case "SK-03":
          char.vx = char.facing * 12;
          soundEngine.playHit("slide");
          break;
        case "SK-04":
          char.isGrounded = false;
          char.vy = -10.5;
          char.vx = char.facing * 4.8;
          soundEngine.playHit("dp");
          break;
        case "SK-05":
          soundEngine.playHit("guard");
          break;
        case "SK-06":
          soundEngine.playHit("teleport");
          break;
        case "SK-07":
          char.vx = char.facing * 7.2;
          soundEngine.playHit("punch");
          break;
        case "SK-08":
          char.invincibleTimer = 8;
          soundEngine.playHit("punch");
          break;
        case "SK-09":
          soundEngine.playHit("burst");
          break;
        case "SK-10":
          soundEngine.playHit("beam");
          break;
        case "SK-11":
          soundEngine.playHit("missile_launch");
          break;
        case "SK-12":
          soundEngine.playHit("laser_bounce");
          break;
        case "SK-13":
          soundEngine.playHit("laser");
          break;
        case "SK-14":
          soundEngine.playHit("burst");
          break;
        case "SK-15":
          soundEngine.playHit("laser");
          this.triggerScreenShake(4.5);
          break;
        case "SK-16":
          soundEngine.playHit("laser");
          this.triggerScreenShake(3.5);
          break;
        case "SK-17":
          soundEngine.playHit("burst");
          break;
        case "SK-18":
          soundEngine.playHit("laser");
          break;
        case "SK-19":
          soundEngine.playHit("bomb_drop");
          break;
        case "SK-20":
          soundEngine.playHit("dp");
          break;
      }
    }
    _updateAttackAction(char, opp) {
      const action = char.currentAction;
      if (!action) return;
      const t = char.stateTime;
      const hitStart = action.startup;
      const hitEnd = action.startup + action.active;
      if (action.id === "SK-06" && t === action.startup) {
        char.x = opp.x + opp.facing * -50;
        char.facing = char.x < opp.x ? 1 : -1;
      }
      if (t >= hitStart && t <= hitEnd && !action.hitChecked) {
        this._checkHitbox(char, opp, action);
      }
      if (t >= char.stateDuration) {
        char.state = char.isGrounded ? "idle" : "jump";
        char.stateTime = 0;
        char.currentAction = null;
      }
    }
    // ─── 判定盒 (Hitbox / Hurtbox) 檢定與攻防三段三擇 ───
    _checkHitbox(char, opp, action) {
      if (opp.invincibleTimer > 0) return;
      if (action.id === "SK-01") {
        action.hitChecked = true;
        this.projectiles.push({
          ownerId: char.id,
          x: char.x + char.facing * 40,
          y: char.y - 74,
          vx: char.facing * 12,
          damage: action.damage,
          skin: char.skin,
          life: 70
        });
        return;
      }
      if (action.id === "SK-11") {
        action.hitChecked = true;
        soundEngine.playHit("missile_launch");
        for (let m = 0; m < 3; m++) {
          this.projectiles.push({
            ownerId: char.id,
            type: "homing",
            name: "\u8FFD\u8E64\u5FAE\u578B\u98DB\u5F48",
            x: char.x + char.facing * (32 + m * 10),
            y: char.y - 65 - m * 14,
            vx: char.facing * (9 + m * 1.5),
            vy: (m - 1) * 2.8,
            radius: 8,
            damage: 70,
            guardType: "all",
            skin: char.skin,
            life: 95
          });
        }
        return;
      }
      if (action.id === "SK-12") {
        action.hitChecked = true;
        this.projectiles.push({
          ownerId: char.id,
          type: "bouncing",
          name: "\u6298\u5C04\u7A1C\u93E1\u6FC0\u5149",
          x: char.x + char.facing * 44,
          y: char.y - 68,
          vx: char.facing * 16,
          vy: 5.5,
          bouncesLeft: 3,
          radius: 11,
          damage: action.damage,
          guardType: "all",
          skin: char.skin,
          life: 85
        });
        return;
      }
      if (action.id === "SK-13") {
        action.hitChecked = true;
        const targetX = Math.max(50, Math.min(this.arenaWidth - 50, opp.x));
        this.shockwaves.push({
          x: targetX,
          y: this.floorY - 6,
          radius: 6,
          maxRadius: 45,
          color: "#ffd700",
          duration: 16
        });
        setTimeout(() => {
          soundEngine.playHit("orbital_beam");
          this.triggerScreenShake(7);
          this.shockwaves.push({
            x: targetX,
            y: this.floorY / 2,
            width: 55,
            height: this.floorY + 80,
            isBeam: true,
            color: "#ffd700",
            duration: 16
          });
          if (Math.abs(opp.x - targetX) < 48 && opp.invincibleTimer <= 0) {
            this._applyHit(char, opp, {
              name: "\u5929\u9802\u8ECC\u9053\u6253\u64CA",
              damage: action.damage,
              guardType: "stand_only",
              knockdown: true
            });
          }
        }, 180);
        return;
      }
      if (action.id === "SK-14") {
        action.hitChecked = true;
        this.projectiles.push({
          ownerId: char.id,
          type: "vortex",
          name: "\u865B\u7A7A\u5F15\u529B\u9ED1\u6D1E\u7403",
          x: char.x + char.facing * 40,
          y: char.y - 70,
          vx: char.facing * 4.5,
          vy: 0,
          radius: 26,
          damage: 48,
          tickCooldown: 0,
          guardType: "all",
          skin: char.skin,
          life: 110
        });
        return;
      }
      if (action.id === "SK-15") {
        action.hitChecked = true;
        soundEngine.playHit("laser");
        this.triggerScreenShake(4.5);
        this.projectiles.push({
          ownerId: char.id,
          type: "sniper",
          name: "\u9AD8\u65AF\u72D9\u64CA\u7A7F\u7532\u5F48",
          x: char.x + char.facing * 44,
          y: char.y - 72,
          vx: char.facing * 34,
          vy: 0,
          radius: 13,
          damage: action.damage,
          guardType: "all",
          knockdown: true,
          skin: char.skin,
          life: 45
        });
        return;
      }
      if (action.id === "SK-16") {
        action.hitChecked = true;
        soundEngine.playHit("laser");
        this.triggerScreenShake(3.5);
        const angles = [-0.22, -0.11, 0, 0.11, 0.22];
        for (let ang of angles) {
          this.projectiles.push({
            ownerId: char.id,
            type: "shotgun",
            name: "\u96FB\u6F3F\u9730\u5F48",
            x: char.x + char.facing * 42,
            y: char.y - 70,
            vx: Math.cos(ang) * 15 * char.facing,
            vy: Math.sin(ang) * 15,
            radius: 7,
            damage: 50,
            guardType: "all",
            skin: char.skin,
            life: 40
          });
        }
        return;
      }
      if (action.id === "SK-17") {
        action.hitChecked = true;
        soundEngine.playHit("burst");
        this.projectiles.push({
          ownerId: char.id,
          type: "funnel",
          name: "\u96FB\u78C1\u6D6E\u6E38\u50DA\u6A5F-Alpha",
          droneIndex: 0,
          offsetX: -char.facing * 28,
          offsetY: -105,
          fireTimer: 16,
          shotsLeft: 3,
          x: char.x - char.facing * 28,
          y: char.y - 105,
          radius: 10,
          skin: char.skin,
          life: 140
        });
        this.projectiles.push({
          ownerId: char.id,
          type: "funnel",
          name: "\u96FB\u78C1\u6D6E\u6E38\u50DA\u6A5F-Beta",
          droneIndex: 1,
          offsetX: -char.facing * 44,
          offsetY: -75,
          fireTimer: 28,
          shotsLeft: 3,
          x: char.x - char.facing * 44,
          y: char.y - 75,
          radius: 10,
          skin: char.skin,
          life: 140
        });
        return;
      }
      if (action.id === "SK-18") {
        action.hitChecked = true;
        soundEngine.playHit("laser");
        this.projectiles.push({
          ownerId: char.id,
          type: "cryo_arrow",
          name: "\u6975\u51CD\u51B0\u971C\u7A7F\u900F\u7BAD",
          x: char.x + char.facing * 42,
          y: char.y - 72,
          vx: char.facing * 18,
          vy: 0,
          radius: 10,
          damage: action.damage,
          guardType: "all",
          skin: char.skin,
          life: 70
        });
        return;
      }
      if (action.id === "SK-19") {
        action.hitChecked = true;
        soundEngine.playHit("bomb_drop");
        this.projectiles.push({
          ownerId: char.id,
          type: "grenade",
          name: "\u71C3\u71D2\u69B4\u5F48",
          x: char.x + char.facing * 40,
          y: char.y - 72,
          vx: char.facing * 10.5,
          vy: -8.5,
          radius: 9,
          damage: action.damage,
          guardType: "all",
          skin: char.skin,
          life: 80
        });
        return;
      }
      if (action.id === "SK-20") {
        action.hitChecked = true;
        soundEngine.playHit("dp");
        this.projectiles.push({
          ownerId: char.id,
          type: "boomerang",
          name: "\u8FF4\u65CB\u96F7\u9706\u5149\u5203\u93E2",
          ownerChar: char,
          x: char.x + char.facing * 40,
          y: char.y - 70,
          vx: char.facing * 14,
          vy: 0,
          outwardFrames: 32,
          returnTarget: char,
          hasHitForward: false,
          hasHitReturn: false,
          radius: 14,
          damage: 115,
          guardType: "all",
          skin: char.skin,
          life: 85
        });
        return;
      }
      if (action.id === "SK-09") {
        action.hitChecked = true;
        this.shockwaves.push({
          x: char.x,
          y: char.y - 70,
          radius: 10,
          maxRadius: 180,
          color: char.skin.themeColor,
          duration: 14
        });
        const dist = Math.abs(char.x - opp.x);
        if (dist < 190) {
          this._applyHit(char, opp, action);
        }
        return;
      }
      if (action.id === "SK-10") {
        action.hitChecked = true;
        this.shockwaves.push({
          x: char.x + char.facing * 500,
          y: char.y - 74,
          width: 1e3,
          height: 50,
          isBeam: true,
          color: char.skin.themeColor,
          duration: 16
        });
        const isInFront = char.facing === 1 && opp.x > char.x || char.facing === -1 && opp.x < char.x;
        if (isInFront && opp.y >= this.floorY - 120) {
          this._applyHit(char, opp, action);
        }
        return;
      }
      const hitReach = action.id === "SK-03" ? 130 : action.id === "SK-08" ? 100 : 90;
      const inRange = Math.abs(char.x - opp.x) <= hitReach && Math.abs(char.y - opp.y) <= 125;
      const isFacingOpp = char.facing === 1 && opp.x >= char.x - 20 || char.facing === -1 && opp.x <= char.x + 20;
      if (inRange && isFacingOpp) {
        action.hitChecked = true;
        if (opp.currentAction && opp.currentAction.id === "SK-05" && action.guardType !== "unblockable") {
          this._triggerParryCounter(opp, char);
          return;
        }
        this._applyHit(char, opp, action);
      }
    }
    // ─── 傷害計算與攻防三段三擇 ───
    _applyHit(char, opp, action) {
      let damage = action.damage || 50;
      let isBlocked = false;
      if (action.guardType === "unblockable") {
        isBlocked = false;
      } else if (action.guardType === "stand_only") {
        if (opp.isGuarding && opp.guardStance === "high") {
          isBlocked = true;
        } else {
          isBlocked = false;
        }
      } else if (action.guardType === "crouch_only") {
        if (opp.isGuarding && opp.guardStance === "low") {
          isBlocked = true;
        } else {
          isBlocked = false;
        }
      } else if (opp.isGuarding) {
        isBlocked = true;
      }
      const isCounter = !isBlocked && opp.currentAction && !opp.currentAction.hitChecked;
      if (isCounter) {
        damage = Math.round(damage * 1.25);
        announcerEngine.announceCounterHit();
      }
      if (char.comboCount > 0) {
        const comboScale = Math.max(0.55, 1 - char.comboCount * 0.08);
        damage = Math.max(12, Math.round(damage * comboScale));
      }
      if (isBlocked) {
        damage = Math.max(12, Math.round(damage * 0.5));
        opp.hp = Math.max(0, opp.hp - damage);
        soundEngine.playHit("guard");
        this._triggerHaptic(25);
        opp.vx = char.facing * 2.6;
        char.frameAdvantage = -4;
        this.hitStop = Math.max(this.hitStop, 2);
        this.triggerScreenShake(2);
        const sparkX = (char.x + opp.x) / 2;
        const sparkY = opp.y - 70;
        this.hitSparks.push({
          type: "shield_block",
          x: sparkX,
          y: sparkY,
          facing: char.facing,
          color: "#38bdf8",
          coreRadius: 16,
          life: 14,
          maxLife: 14,
          particles: Array.from({ length: 10 }, () => ({
            x: sparkX,
            y: sparkY,
            vx: (Math.random() - 0.5) * 8 - char.facing * 2,
            vy: (Math.random() - 0.5) * 8,
            life: 12,
            maxLife: 12,
            size: Math.random() * 3 + 2,
            color: Math.random() > 0.3 ? "#38bdf8" : "#e0f2fe"
          }))
        });
        this.floatingTexts.push({
          text: `SHIELD -${damage}`,
          x: opp.x,
          y: opp.y - 80,
          color: "#38bdf8",
          life: 32
        });
        return;
      }
      opp.hp = Math.max(0, opp.hp - damage);
      char.superMeter = Math.min(char.superMax, (char.superMeter || 0) + 45);
      opp.superMeter = Math.min(opp.superMax, (opp.superMeter || 0) + 60);
      opp.burstMeter = Math.min(opp.burstMax, opp.burstMeter + Math.round(damage * 0.9));
      char.comboCount++;
      char.comboDamage += damage;
      char.comboResetTimer = 45;
      char.frameAdvantage = isCounter ? 7 : 4;
      if (char.comboCount === 3 || char.comboCount === 5 || char.comboCount === 7 || char.comboCount === 10) {
        announcerEngine.announceCombo(char.comboCount);
      }
      this.hitStop = Math.max(this.hitStop, isCounter ? 6 : damage >= 80 ? 4 : 2);
      this.triggerScreenShake(isCounter ? 6.5 : damage >= 80 ? 5 : 3);
      if (action.knockdown || damage >= 150) {
        soundEngine.playHit("slam");
        this._triggerHaptic(80);
      } else if (isCounter) {
        soundEngine.playHit("counter");
        this._triggerHaptic(60);
      } else {
        soundEngine.playHit(action.name.includes("\u8E22") ? "kick" : "punch");
        this._triggerHaptic(action.damage > 80 ? 50 : 20);
      }
      if (action.knockdown) {
        opp.state = "knockdown";
        opp.stateTime = 0;
        opp.vx = char.facing * 7;
        opp.vy = -4.5;
        opp.isGrounded = false;
      } else if (!opp.isGrounded) {
        opp.state = "hit_stun";
        opp.stateTime = 0;
        opp.stateDuration = 18;
        opp.vy = -4;
        opp.vx = char.facing * 3;
      } else {
        opp.state = "hit_stun";
        opp.stateTime = 0;
        opp.stateDuration = isCounter ? 18 : 14;
        opp.vx = char.facing * 3.6;
      }
      if (isCounter) {
        this.floatingTexts.push({
          text: `\u2605 COUNTER! -${damage}`,
          x: opp.x,
          y: opp.y - 110,
          color: "#ffd700",
          life: 45
        });
      } else {
        this.floatingTexts.push({
          text: `HIT! -${damage}`,
          x: opp.x,
          y: opp.y - 90,
          color: "#ff007f",
          life: 35
        });
      }
      if (!opp.isGrounded && !action.knockdown && char.comboCount >= 2) {
        this.floatingTexts.push({
          text: "AIR JUGGLE!",
          x: opp.x,
          y: opp.y - 130,
          color: "#00f3ff",
          life: 35
        });
      }
      const contactX = (char.x + opp.x) / 2 + char.facing * 10;
      const contactY = opp.y - (action.name.includes("\u4E0B\u8E72") ? 35 : action.name.includes("\u8E22") ? 65 : 75);
      const sparkColor = isCounter ? "#ffd700" : damage >= 80 ? "#ff007f" : "#ff9900";
      const rayCount = damage >= 80 ? 8 : 5;
      this.hitSparks.push({
        type: isCounter ? "counter_hit" : damage >= 80 ? "heavy_hit" : "light_hit",
        x: contactX,
        y: contactY,
        facing: char.facing,
        color: sparkColor,
        coreRadius: damage >= 80 ? 28 : 18,
        life: 18,
        maxLife: 18,
        rays: Array.from({ length: rayCount }, (_, i) => ({
          angle: Math.PI * 2 / rayCount * i + (Math.random() - 0.5) * 0.4,
          len: Math.random() * 25 + 20,
          width: Math.random() * 2 + 2
        })),
        particles: Array.from({ length: damage >= 80 ? 14 : 8 }, () => ({
          x: contactX,
          y: contactY,
          vx: (Math.random() - 0.5) * 12 + char.facing * 3,
          vy: (Math.random() - 0.5) * 12 - 2,
          life: Math.floor(Math.random() * 8 + 10),
          maxLife: 18,
          size: Math.random() * 3.5 + 2,
          color: isCounter ? "#ffd700" : Math.random() > 0.4 ? "#ff007f" : "#ffff00"
        }))
      });
    }
    _triggerParryCounter(parryChar, attacker) {
      parryChar.currentAction.hitChecked = true;
      soundEngine.playHit("parry_trigger");
      this._triggerHaptic(60);
      this.hitStop = 6;
      this.triggerScreenShake(5);
      attacker.state = "hit_stun";
      attacker.stateTime = 0;
      attacker.stateDuration = 35;
      attacker.hp = Math.max(0, attacker.hp - 190);
      this.hitSparks.push({
        type: "parry",
        x: (parryChar.x + attacker.x) / 2,
        y: parryChar.y - 70,
        facing: parryChar.facing,
        color: "#00ff66",
        coreRadius: 30,
        life: 20,
        maxLife: 20,
        rays: Array.from({ length: 10 }, (_, i) => ({
          angle: Math.PI * 2 / 10 * i,
          len: 35,
          width: 3
        })),
        particles: Array.from({ length: 16 }, () => ({
          x: (parryChar.x + attacker.x) / 2,
          y: parryChar.y - 70,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.5) * 14,
          life: 16,
          maxLife: 16,
          size: 3.5,
          color: "#00ff88"
        }))
      });
      this.floatingTexts.push({
        text: "PARRY COUNTER! -190",
        x: parryChar.x,
        y: parryChar.y - 110,
        color: "#00ff66",
        life: 45
      });
    }
    _checkPlatformHit(p) {
      if (!this.platforms) return false;
      for (const plat of this.platforms) {
        if (p.x >= plat.x && p.x <= plat.x + plat.width && Math.abs(p.y - plat.y) < 14) {
          return true;
        }
      }
      return false;
    }
    _updateProjectiles() {
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        const target = p.ownerId === 1 ? this.p2 : this.p1;
        const owner = p.ownerId === 1 ? this.p1 : this.p2;
        if (p.type === "homing" && target) {
          const targetY = target.y - 48;
          const dx = target.x - p.x;
          const dy2 = targetY - p.y;
          p.vx += Math.sign(dx) * 0.48;
          p.vy += Math.sign(dy2) * 0.42;
          p.vx = Math.max(-14, Math.min(14, p.vx));
          p.vy = Math.max(-9, Math.min(9, p.vy));
        } else if (p.type === "bouncing") {
          if (p.x <= 35 && p.vx < 0 || p.x >= this.arenaWidth - 35 && p.vx > 0) {
            if ((p.bouncesLeft || 0) > 0) {
              p.bouncesLeft--;
              p.vx = -p.vx;
              soundEngine.playHit("laser_bounce");
              this.triggerScreenShake(2);
            }
          }
          if (p.y >= this.floorY - 8 && p.vy > 0) {
            if ((p.bouncesLeft || 0) > 0) {
              p.bouncesLeft--;
              p.vy = -Math.abs(p.vy) * 0.88;
              soundEngine.playHit("laser_bounce");
              this.triggerScreenShake(2);
            }
          }
        } else if (p.type === "ground_wave") {
          p.y = this.floorY - 14;
        } else if (p.type === "vortex" && target) {
          const dist2 = Math.abs(p.x - target.x);
          if (dist2 < 220) {
            target.vx += Math.sign(p.x - target.x) * 1.6;
          }
        } else if (p.type === "funnel") {
          if (owner) {
            const targetX = owner.x - owner.facing * 25 + (p.droneIndex === 0 ? -16 : 16);
            const targetY = owner.y + (p.offsetY || -70) + Math.sin((p.life || 0) * 0.12) * 6;
            p.x += (targetX - p.x) * 0.22;
            p.y += (targetY - p.y) * 0.22;
            p.fireTimer = (p.fireTimer || 18) - 1;
            if (p.fireTimer <= 0 && (p.shotsLeft || 0) > 0) {
              p.shotsLeft--;
              p.fireTimer = 34;
              soundEngine.playHit("laser");
              this.triggerScreenShake(2);
              this.projectiles.push({
                ownerId: p.ownerId,
                type: "funnel_laser",
                name: "\u6D6E\u6E38\u7832\u805A\u7126\u8108\u885D\u5149",
                x: p.x + owner.facing * 18,
                y: p.y,
                vx: owner.facing * 20,
                vy: 0,
                radius: 6,
                damage: 75,
                guardType: "all",
                skin: p.skin,
                life: 38
              });
            }
          }
        } else if (p.type === "grenade") {
          p.vy = (p.vy || 0) + 0.46;
        } else if (p.type === "boomerang") {
          p.outwardFrames = (p.outwardFrames !== void 0 ? p.outwardFrames : 30) - 1;
          if (p.outwardFrames > 0) {
            p.vx *= 0.93;
          } else if (owner) {
            const dx = owner.x - p.x;
            const dy2 = owner.y - 50 - p.y;
            const dist2 = Math.hypot(dx, dy2);
            if (dist2 < 32 && p.outwardFrames < -10) {
              this.projectiles.splice(i, 1);
              continue;
            }
            p.vx += Math.sign(dx) * 1.6;
            p.vy = (p.vy || 0) + Math.sign(dy2) * 0.9;
            p.vx = Math.max(-18, Math.min(18, p.vx));
            p.vy = Math.max(-11, Math.min(11, p.vy));
          }
        } else if (p.type === "napalm_pool") {
          p.tickCooldown = (p.tickCooldown || 15) - 1;
          if (p.tickCooldown <= 0) {
            p.tickCooldown = 16;
            if (target && Math.abs(target.x - p.x) < (p.radius || 48) && Math.abs(target.y - p.y) < 35 && target.invincibleTimer <= 0) {
              this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
                name: "\u71C3\u71D2\u706B\u6D77\u707C\u50B7",
                damage: p.damage || 38,
                guardType: "low",
                chipRatio: 0.5
              });
            }
          }
        }
        if (p.type !== "funnel" && p.type !== "napalm_pool") {
          p.x += p.vx;
          if (p.vy) p.y += p.vy;
        }
        p.life--;
        if (p.type === "grenade" && (p.y >= this.floorY - 6 || p.vy > 0 && this._checkPlatformHit(p))) {
          soundEngine.playHit("bomb_drop");
          this.triggerScreenShake(5);
          this.shockwaves.push({
            x: p.x,
            y: p.y,
            radius: 12,
            maxRadius: 75,
            color: "#ff4500",
            duration: 18
          });
          this.projectiles.push({
            ownerId: p.ownerId,
            type: "napalm_pool",
            name: "\u71C3\u71D2\u706B\u6D77",
            x: p.x,
            y: p.y,
            vx: 0,
            vy: 0,
            radius: 52,
            damage: 38,
            guardType: "low",
            skin: p.skin,
            life: 150,
            tickCooldown: 10
          });
          if (target && Math.abs(p.x - target.x) < 55 && Math.abs(p.y - target.y) < 60 && target.invincibleTimer <= 0) {
            this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
              name: "\u71C3\u71D2\u69B4\u5F48\u76F4\u64CA",
              damage: p.damage,
              guardType: "stand_only",
              knockdown: true
            });
          }
          this.projectiles.splice(i, 1);
          continue;
        }
        if (p.type === "bomb" && (p.y >= this.floorY - 10 || p.vy > 0 && this._checkPlatformHit(p))) {
          soundEngine.playHit("bomb_drop");
          this.triggerScreenShake(5);
          this.shockwaves.push({
            x: p.x,
            y: p.y,
            radius: 8,
            maxRadius: 68,
            color: p.skin && p.skin.themeColor ? p.skin.themeColor : "#ff007f",
            duration: 16
          });
          if (target && Math.abs(p.x - target.x) < 70 && Math.abs(p.y - target.y) < 75 && target.invincibleTimer <= 0) {
            this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
              name: p.name || "\u7A7A\u5C0D\u5730\u96E2\u5B50\u7206\u5F48",
              damage: p.damage,
              guardType: p.guardType || "stand_only",
              knockdown: true
            });
          }
          this.projectiles.splice(i, 1);
          continue;
        }
        if (p.type === "funnel" || p.type === "napalm_pool") {
          if (p.life <= 0) {
            this.projectiles.splice(i, 1);
          }
          continue;
        }
        const dist = Math.abs(p.x - target.x);
        const dy = Math.abs(p.y - (target.y - 45));
        const hitRadius = p.type === "vortex" ? 42 : p.type === "heavy" ? 38 : p.type === "sniper" ? 42 : 34;
        const hitHeight = p.type === "ground_wave" ? 42 : 64;
        if (dist < hitRadius && dy < hitHeight && target && target.invincibleTimer <= 0) {
          if (p.type === "vortex") {
            p.tickCooldown = (p.tickCooldown || 0) - 1;
            if (p.tickCooldown <= 0) {
              p.tickCooldown = 12;
              this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
                name: p.name || "\u865B\u7A7A\u5F15\u529B\u9ED1\u6D1E\u7403",
                damage: p.damage,
                guardType: p.guardType || "all",
                chipRatio: 0.5
              });
            }
          } else if (p.type === "boomerang") {
            if (p.outwardFrames > 0 && !p.hasHitForward) {
              p.hasHitForward = true;
              soundEngine.playHit("laser");
              this.triggerScreenShake(3);
              this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
                name: "\u8FF4\u65CB\u96F7\u9706\u5149\u5203\u93E2 (\u524D\u5411)",
                damage: p.damage,
                guardType: "all",
                chipRatio: 0.5
              });
              p.outwardFrames = 0;
            } else if (p.outwardFrames <= 0 && !p.hasHitReturn) {
              p.hasHitReturn = true;
              soundEngine.playHit("laser");
              this.triggerScreenShake(3);
              this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
                name: "\u8FF4\u65CB\u96F7\u9706\u5149\u5203\u93E2 (\u6298\u8FD4\u80CC\u64CA)",
                damage: p.damage,
                guardType: "all",
                chipRatio: 0.5
              });
            }
          } else if (p.type === "cryo_arrow") {
            target.frostTimer = 130;
            this.floatingTexts.push({
              text: "\u2744\uFE0F \u6975\u51CD\u6E1B\u901F 45%",
              x: target.x,
              y: target.y - 85,
              color: "#00e5ff",
              life: 45
            });
            soundEngine.playHit("laser_bounce");
            this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
              name: p.name || "\u6975\u51CD\u51B0\u971C\u7A7F\u900F\u7BAD",
              damage: p.damage,
              guardType: "all",
              chipRatio: 0.5
            });
            this.projectiles.splice(i, 1);
            continue;
          } else if (p.type === "sniper") {
            this.triggerScreenShake(7);
            soundEngine.playHit("heavy_punch");
            this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
              name: p.name || "\u9AD8\u65AF\u72D9\u64CA\u7A7F\u7532\u91CD\u69CD",
              damage: p.damage,
              guardType: "all",
              chipRatio: 0.6,
              knockdown: true
            });
            p.pierce = (p.pierce || 1) - 1;
            if (p.pierce <= 0) {
              this.projectiles.splice(i, 1);
              continue;
            }
          } else {
            this._applyHit(p.ownerId === 1 ? this.p1 : this.p2, target, {
              name: p.name || "\u91CF\u5B50\u9060\u7A0B\u5149\u5F48",
              damage: p.damage,
              guardType: p.guardType || "all",
              chipRatio: 0.5,
              knockdown: !!p.knockdown
            });
            this.projectiles.splice(i, 1);
            continue;
          }
        }
        if (p.life <= 0 || p.x < 15 || p.x > this.arenaWidth - 15 || p.y > this.floorY + 35 || p.y < -120) {
          this.projectiles.splice(i, 1);
        }
      }
    }
    _updateShockwaves() {
      for (let i = this.shockwaves.length - 1; i >= 0; i--) {
        const s = this.shockwaves[i];
        s.duration--;
        if (s.radius !== void 0) {
          s.radius += (s.maxRadius - s.radius) * 0.2;
        }
        if (s.duration <= 0) {
          this.shockwaves.splice(i, 1);
        }
      }
    }
    _updateHitSparks() {
      for (let i = this.hitSparks.length - 1; i >= 0; i--) {
        const s = this.hitSparks[i];
        s.life--;
        if (s.particles) {
          for (let p of s.particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.9;
            p.vy *= 0.9;
            p.life--;
          }
        }
        if (s.life <= 0) {
          this.hitSparks.splice(i, 1);
        }
      }
    }
    _updateFloatingTexts() {
      for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
        const t = this.floatingTexts[i];
        t.y -= 0.8;
        t.life--;
        if (t.life <= 0) {
          this.floatingTexts.splice(i, 1);
        }
      }
    }
    _resolvePositions() {
      const p1 = this.p1;
      const p2 = this.p2;
      if (!p1 || !p2) return;
      const isP1Passing = p1.state === "skill" && p1.currentAction && (p1.currentAction.id === "SK-03" || p1.currentAction.id === "SK-05");
      const isP2Passing = p2.state === "skill" && p2.currentAction && (p2.currentAction.id === "SK-03" || p2.currentAction.id === "SK-05");
      const isP1Down = p1.state === "knockdown" || p1.state === "wakeup";
      const isP2Down = p2.state === "knockdown" || p2.state === "wakeup";
      if (isP1Passing || isP2Passing || isP1Down || isP2Down) {
        p1.x = Math.max(50, Math.min(this.arenaWidth - 50, p1.x));
        p2.x = Math.max(50, Math.min(this.arenaWidth - 50, p2.x));
        return;
      }
      const dy = Math.abs(p1.y - p2.y);
      const p1Air = !p1.isGrounded;
      const p2Air = !p2.isGrounded;
      if ((p1Air || p2Air) && dy > 35) {
        p1.x = Math.max(50, Math.min(this.arenaWidth - 50, p1.x));
        p2.x = Math.max(50, Math.min(this.arenaWidth - 50, p2.x));
        return;
      }
      if (p1Air || p2Air) {
        const dx2 = p2.x - p1.x;
        if (Math.abs(dx2) < 40) {
          if (p1Air && Math.abs(p1.vx) > 0.5) {
            p1.x += Math.sign(p1.vx) * 2.5;
          } else if (p2Air && Math.abs(p2.vx) > 0.5) {
            p2.x += Math.sign(p2.vx) * 2.5;
          }
        }
        p1.x = Math.max(50, Math.min(this.arenaWidth - 50, p1.x));
        p2.x = Math.max(50, Math.min(this.arenaWidth - 50, p2.x));
        return;
      }
      const minDistance = 44;
      const dx = p2.x - p1.x;
      const dist = Math.abs(dx);
      if (dist < minDistance) {
        const p1Pushing = p1.state === "walk_fwd";
        const p2Pushing = p2.state === "walk_fwd";
        if (p1Pushing && !p2Pushing) {
          p1.x += p1.facing * 2.2;
          p2.x -= p1.facing * 0.7;
        } else if (p2Pushing && !p1Pushing) {
          p2.x += p2.facing * 2.2;
          p1.x -= p2.facing * 0.7;
        } else if (p1Pushing && p2Pushing) {
          p1.x += p1.facing * 1.6;
          p2.x += p2.facing * 1.6;
        } else {
          const push = (minDistance - dist) / 2;
          if (dx >= 0) {
            p1.x -= push;
            p2.x += push;
          } else {
            p1.x += push;
            p2.x -= push;
          }
        }
      }
      p1.x = Math.max(45, Math.min(this.arenaWidth - 45, p1.x));
      p2.x = Math.max(45, Math.min(this.arenaWidth - 45, p2.x));
    }
    _handleTimeOver() {
      this.isOver = true;
      if (this.p1.hp > this.p2.hp) this.winner = 1;
      else if (this.p2.hp > this.p1.hp) this.winner = 2;
      else this.winner = 0;
      soundEngine.playHit("ko");
      this._triggerMatchEndStates();
    }
    _triggerHaptic(durationMs) {
      if (this.enableHaptics && typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate(durationMs);
        } catch (e) {
        }
      }
    }
  };
  var combatEngine = new CombatEngine();

  // js/engine/stage_renderer.js
  var StageRenderer = class {
    constructor() {
      this.timeTick = 0;
      this.rainParticles = [];
      this.matrixGlyphs = [];
      this.clouds = [];
      this.lightningTimer = 0;
      this.lightningFlash = 0;
      this._initRain();
      this._initMatrixGlyphs();
      this._initClouds();
    }
    _initRain() {
      this.rainParticles = [];
      for (let i = 0; i < 90; i++) {
        this.rainParticles.push({
          x: Math.random() * 2e3,
          y: Math.random() * 1e3,
          speed: 12 + Math.random() * 8,
          length: 14 + Math.random() * 10
        });
      }
    }
    _initMatrixGlyphs() {
      this.matrixGlyphs = [];
      for (let i = 0; i < 40; i++) {
        this.matrixGlyphs.push({
          x: Math.random() * 2e3,
          y: Math.random() * 800,
          speed: 2 + Math.random() * 4,
          size: 10 + Math.random() * 6,
          char: String.fromCharCode(12448 + Math.floor(Math.random() * 96))
        });
      }
    }
    _initClouds() {
      this.clouds = [
        { x: 100, y: 70, scale: 1.1, speed: 0.18 },
        { x: 450, y: 110, scale: 0.8, speed: 0.12 },
        { x: 800, y: 60, scale: 1.3, speed: 0.22 },
        { x: 1250, y: 95, scale: 0.9, speed: 0.15 }
      ];
    }
    /**
     * 繪製場景背景與環境
     */
    drawStage(ctx, stage, w, h, floorY) {
      this.timeTick++;
      if (!stage) return;
      switch (stage.id) {
        case "stage_tenkaichi":
          this._drawTenkaichiStage(ctx, w, h, floorY);
          break;
        case "stage_stark_tower":
          this._drawStarkTowerStage(ctx, w, h, floorY);
          break;
        case "stage_namek":
          this._drawNamekStage(ctx, w, h, floorY);
          break;
        case "stage_cyber_matrix":
        default:
          this._drawCyberMatrixStage(ctx, w, h, floorY);
          break;
      }
    }
    // ─── 1. 賽博量子空間 (Cyber Matrix) ───
    _drawCyberMatrixStage(ctx, w, h, floorY) {
      const grad = ctx.createLinearGradient(0, 0, 0, floorY);
      grad.addColorStop(0, "#040714");
      grad.addColorStop(0.6, "#0a1026");
      grad.addColorStop(1, "#0e1738");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, floorY);
      ctx.strokeStyle = "rgba(0, 243, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let y = 30; y < floorY; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(0, 243, 255, 0.35)";
      ctx.font = "11px monospace";
      this.matrixGlyphs.forEach((g) => {
        g.y += g.speed;
        if (g.y > floorY) {
          g.y = -20;
          g.x = Math.random() * w;
        }
        ctx.fillText(g.char, g.x, g.y);
      });
      this._drawHoloCube(ctx, w * 0.15, 120, 36, this.timeTick * 0.015, "#00f3ff");
      this._drawHoloCube(ctx, w * 0.85, 140, 42, -this.timeTick * 0.012, "#ff007f");
      ctx.fillStyle = "#0a0e1e";
      ctx.fillRect(0, floorY, w, h - floorY);
      ctx.strokeStyle = "rgba(0, 243, 255, 0.22)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, floorY);
        ctx.lineTo(x + (x - w / 2) * 0.3, h);
        ctx.stroke();
      }
      for (let gy = floorY + 12; gy < h; gy += 24) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(0, 243, 255, 0.85)";
      ctx.fillRect(0, floorY - 2, w, 3);
    }
    _drawHoloCube(ctx, cx, cy, size, angle, color) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 14;
      ctx.lineWidth = 1.8;
      ctx.strokeRect(-size / 2, -size / 2, size, size);
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.65);
      ctx.lineTo(size * 0.65, 0);
      ctx.lineTo(0, size * 0.65);
      ctx.lineTo(-size * 0.65, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    // ─── 2. 天下第一武道會 (Tenkaichi Budokai) ───
    _drawTenkaichiStage(ctx, w, h, floorY) {
      const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
      skyGrad.addColorStop(0, "#1d4ed8");
      skyGrad.addColorStop(0.45, "#38bdf8");
      skyGrad.addColorStop(1, "#bae6fd");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, floorY);
      ctx.fillStyle = "#15803d";
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(0, floorY - 140);
      ctx.quadraticCurveTo(w * 0.25, floorY - 220, w * 0.5, floorY - 150);
      ctx.quadraticCurveTo(w * 0.75, floorY - 250, w, floorY - 130);
      ctx.lineTo(w, floorY);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(0, floorY - 80);
      ctx.quadraticCurveTo(w * 0.35, floorY - 160, w * 0.65, floorY - 90);
      ctx.quadraticCurveTo(w * 0.85, floorY - 140, w, floorY - 70);
      ctx.lineTo(w, floorY);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      this.clouds.forEach((c) => {
        c.x += c.speed;
        if (c.x > w + 150) c.x = -150;
        this._drawCloud(ctx, c.x, c.y, c.scale);
      });
      const pw = 220;
      const px = w / 2 - pw / 2;
      const py = floorY - 110;
      ctx.fillStyle = "#b91c1c";
      ctx.beginPath();
      ctx.moveTo(px - 20, py + 35);
      ctx.lineTo(w / 2, py);
      ctx.lineTo(px + pw + 20, py + 35);
      ctx.lineTo(px + pw, py + 45);
      ctx.lineTo(px, py + 45);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#fef08a";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.fillStyle = "#facc15";
      ctx.beginPath();
      ctx.arc(w / 2, py - 4, 8, 0, Math.PI * 2);
      ctx.fill();
      this._drawTenkaichiBanner(ctx, w * 0.18, floorY - 160, "\u6B66");
      this._drawTenkaichiBanner(ctx, w * 0.82, floorY - 160, "\u6B66");
      ctx.fillStyle = "#d97706";
      ctx.fillRect(0, floorY, w, h - floorY);
      ctx.strokeStyle = "#b45309";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < w; x += 55) {
        ctx.beginPath();
        ctx.moveTo(x, floorY);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let gy = floorY + 16; gy < h; gy += 20) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, floorY - 4, w, 5);
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 1;
      for (let bx = 0; bx < w; bx += 40) {
        ctx.strokeRect(bx, floorY - 4, 40, 5);
      }
    }
    _drawCloud(ctx, cx, cy, scale) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.arc(22, -6, 20, 0, Math.PI * 2);
      ctx.arc(42, 2, 18, 0, Math.PI * 2);
      ctx.arc(-18, 4, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    _drawTenkaichiBanner(ctx, bx, by, text) {
      ctx.save();
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx, by + 160);
      ctx.stroke();
      const wave = Math.sin(this.timeTick * 0.08) * 6;
      ctx.fillStyle = "#dc2626";
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.quadraticCurveTo(bx + 35, by + wave, bx + 55, by + 10);
      ctx.lineTo(bx + 55, by + 85 + wave);
      ctx.quadraticCurveTo(bx + 25, by + 75, bx, by + 80);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fef08a";
      ctx.font = 'bold 26px "Noto Sans TC", sans-serif';
      ctx.textAlign = "center";
      ctx.fillText(text, bx + 28, by + 50);
      ctx.restore();
    }
    // ─── 3. 斯塔克大樓天台 (Stark Tower Rooftop) ───
    _drawStarkTowerStage(ctx, w, h, floorY) {
      const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
      skyGrad.addColorStop(0, "#020617");
      skyGrad.addColorStop(0.6, "#0f172a");
      skyGrad.addColorStop(1, "#1e293b");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, floorY);
      this.lightningTimer++;
      if (this.lightningTimer > 280 && Math.random() < 0.04) {
        this.lightningFlash = 4;
        this.lightningTimer = 0;
      }
      if (this.lightningFlash > 0) {
        this.lightningFlash--;
        ctx.fillStyle = `rgba(224, 242, 254, ${this.lightningFlash * 0.18})`;
        ctx.fillRect(0, 0, w, floorY);
      }
      this._drawSkyline(ctx, w, floorY);
      ctx.strokeStyle = "rgba(186, 230, 253, 0.4)";
      ctx.lineWidth = 1.2;
      this.rainParticles.forEach((p) => {
        p.x -= 2.5;
        p.y += p.speed;
        if (p.y > floorY) {
          p.y = -20;
          p.x = Math.random() * (w + 200);
        }
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - 4, p.y + p.length);
        ctx.stroke();
      });
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, floorY, w, h - floorY);
      const logoX = w / 2;
      const logoY = floorY + 60;
      ctx.save();
      ctx.translate(logoX, logoY);
      ctx.scale(1, 0.45);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
      ctx.lineWidth = 5;
      ctx.shadowColor = "#00f3ff";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(0, 0, 65, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(56, 189, 248, 0.8)";
      ctx.font = '900 80px "Rajdhani", "Orbitron", sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("A", 0, 0);
      ctx.restore();
      ctx.fillStyle = "#334155";
      ctx.fillRect(0, floorY - 5, w, 6);
      for (let lx = 30; lx < w; lx += 90) {
        const glow = Math.sin(this.timeTick * 0.1 + lx) > 0;
        ctx.fillStyle = glow ? "#ef4444" : "#7f1d1d";
        ctx.beginPath();
        ctx.arc(lx, floorY - 3, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    _drawSkyline(ctx, w, floorY) {
      const buildings = [
        { x: 30, w: 85, h: 220 },
        { x: 130, w: 65, h: 180 },
        { x: 210, w: 110, h: 260 },
        { x: 340, w: 75, h: 190 },
        { x: w * 0.45, w: 130, h: 310 },
        // 帝國大廈風
        { x: w * 0.62, w: 90, h: 240 },
        { x: w * 0.74, w: 80, h: 170 },
        { x: w * 0.84, w: 120, h: 270 }
      ];
      buildings.forEach((b) => {
        ctx.fillStyle = "#090d16";
        ctx.fillRect(b.x, floorY - b.h, b.w, b.h);
        ctx.fillStyle = "rgba(253, 224, 71, 0.5)";
        for (let wy = floorY - b.h + 18; wy < floorY - 20; wy += 22) {
          for (let wx = b.x + 10; wx < b.x + b.w - 10; wx += 14) {
            if ((wx + wy) % 5 !== 0) {
              ctx.fillRect(wx, wy, 6, 8);
            }
          }
        }
      });
    }
    // ─── 4. 那美克星 (Planet Namek) ───
    _drawNamekStage(ctx, w, h, floorY) {
      const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY);
      skyGrad.addColorStop(0, "#365314");
      skyGrad.addColorStop(0.5, "#65a30d");
      skyGrad.addColorStop(1, "#bef264");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, floorY);
      ctx.fillStyle = "rgba(254, 240, 138, 0.85)";
      ctx.shadowColor = "#facc15";
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(w * 0.22, 100, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(167, 243, 208, 0.8)";
      ctx.shadowColor = "#34d399";
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(w * 0.32, 65, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#0f766e";
      ctx.fillRect(0, floorY - 90, w, 90);
      ctx.fillStyle = "#0d9488";
      ctx.beginPath();
      ctx.moveTo(0, floorY);
      ctx.lineTo(0, floorY - 130);
      ctx.lineTo(w * 0.28, floorY - 130);
      ctx.lineTo(w * 0.32, floorY - 70);
      ctx.lineTo(w * 0.65, floorY - 70);
      ctx.lineTo(w * 0.72, floorY - 150);
      ctx.lineTo(w, floorY - 150);
      ctx.lineTo(w, floorY);
      ctx.closePath();
      ctx.fill();
      this._drawAjisaTree(ctx, w * 0.12, floorY, 110);
      this._drawAjisaTree(ctx, w * 0.88, floorY, 125);
      this._drawAjisaTree(ctx, w * 0.94, floorY, 95);
      ctx.fillStyle = "#064e3b";
      ctx.fillRect(0, floorY, w, h - floorY);
      ctx.strokeStyle = "rgba(52, 211, 153, 0.35)";
      ctx.lineWidth = 2;
      for (let rx = 20; rx < w; rx += 70) {
        ctx.beginPath();
        ctx.moveTo(rx, floorY);
        ctx.lineTo(rx + 25, floorY + 30);
        ctx.lineTo(rx + 15, h);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(52, 211, 153, 0.9)";
      ctx.fillRect(0, floorY - 3, w, 4);
    }
    _drawAjisaTree(ctx, tx, floorY, height) {
      ctx.save();
      ctx.strokeStyle = "#78350f";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(tx, floorY);
      ctx.lineTo(tx, floorY - height);
      ctx.stroke();
      ctx.fillStyle = "#14b8a6";
      ctx.shadowColor = "#2dd4bf";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(tx, floorY - height, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#5eead4";
      ctx.beginPath();
      ctx.arc(tx - 6, floorY - height - 8, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    /**
     * 繪製與場景匹配的主題空中浮空平台
     */
    drawPlatforms(ctx, platforms, stage) {
      if (!platforms || platforms.length === 0) return;
      const stageId = stage ? stage.id : "stage_cyber_matrix";
      platforms.forEach((p) => {
        ctx.save();
        if (stageId === "stage_tenkaichi") {
          ctx.fillStyle = "#f8fafc";
          ctx.strokeStyle = "#ca8a04";
          ctx.lineWidth = 2.5;
          if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(p.x, p.y, p.width, p.height, 6);
            ctx.fill();
            ctx.stroke();
          } else {
            ctx.fillRect(p.x, p.y, p.width, p.height);
            ctx.strokeRect(p.x, p.y, p.width, p.height);
          }
          ctx.fillStyle = "#eab308";
          ctx.fillRect(p.x + 8, p.y + p.height - 4, p.width - 16, 2);
        } else if (stageId === "stage_stark_tower") {
          ctx.fillStyle = "#1e293b";
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2;
          ctx.fillRect(p.x, p.y, p.width, p.height);
          ctx.strokeRect(p.x, p.y, p.width, p.height);
          ctx.fillStyle = "#00f3ff";
          ctx.fillRect(p.x + 4, p.y + 2, p.width - 8, 3);
        } else if (stageId === "stage_namek") {
          ctx.fillStyle = "#0f766e";
          ctx.strokeStyle = "#34d399";
          ctx.lineWidth = 2.5;
          ctx.shadowColor = "#34d399";
          ctx.shadowBlur = 10;
          ctx.fillRect(p.x, p.y, p.width, p.height);
          ctx.strokeRect(p.x, p.y, p.width, p.height);
          ctx.fillStyle = "#6ee7b7";
          ctx.fillRect(p.x + 6, p.y + 3, p.width - 12, 3);
        } else {
          ctx.fillStyle = "rgba(11, 17, 32, 0.9)";
          ctx.strokeStyle = p.color || "#00f3ff";
          ctx.lineWidth = 2;
          ctx.shadowColor = p.color || "#00f3ff";
          ctx.shadowBlur = 12;
          ctx.fillRect(p.x, p.y, p.width, p.height);
          ctx.strokeRect(p.x, p.y, p.width, p.height);
          ctx.fillStyle = p.color || "#00f3ff";
          ctx.fillRect(p.x, p.y, p.width, 3);
        }
        ctx.restore();
      });
    }
  };
  var stageRenderer = new StageRenderer();

  // js/engine/ai.js
  var AiController = class {
    constructor(difficulty = "normal") {
      this.difficulty = difficulty;
      this.currentDelay = 0;
      this.bufferedDecision = { x: 0, y: 0, punch: false, kick: false, guard: false, skill1: false, skill2: false, skill3: false, burst: false };
    }
    setDifficulty(diff) {
      this.difficulty = diff;
      this.currentDelay = 0;
    }
    /**
     * 決策每幀輸入
     */
    decide(aiChar, playerChar, combatEngine2) {
      if (combatEngine2.isTraining) {
        return this._decideTrainingDummy(aiChar, playerChar, combatEngine2.trainingSettings);
      }
      if ((!aiChar.isGrounded || aiChar.state === "jump") && !aiChar.currentAction) {
        return this._decideAirborneCombat(aiChar, playerChar, combatEngine2);
      }
      if (!aiChar.isGrounded && this.bufferedDecision.y < 0) {
        this.bufferedDecision.y = 0;
      }
      let targetDelay = 16;
      if (this.difficulty === "easy") targetDelay = 28;
      else if (this.difficulty === "normal") targetDelay = 16;
      else if (this.difficulty === "hard") targetDelay = 8;
      else if (this.difficulty === "nightmare") targetDelay = 4;
      this.currentDelay++;
      if (this.currentDelay >= targetDelay) {
        this.currentDelay = 0;
        this.bufferedDecision = this._makeDecision(aiChar, playerChar, combatEngine2);
      }
      return this.bufferedDecision;
    }
    /**
     * 空中戰鬥決策 (Airborne Combat Execution)
     * 在躍空過程中根據與玩家之相對距離，執行中段破防躍空飛踢或快速刺拳
     */
    _decideAirborneCombat(ai, player, engine) {
      const input = { x: 0, y: 0, punch: false, kick: false, guard: false, skill1: false, skill2: false, skill3: false, burst: false };
      const dist = Math.abs(ai.x - player.x);
      const dirToPlayer = ai.x < player.x ? 1 : -1;
      input.x = dirToPlayer;
      if (dist < 175 && !ai.currentAction) {
        let attackChance = 0.5;
        if (this.difficulty === "nightmare") attackChance = 0.95;
        else if (this.difficulty === "hard") attackChance = 0.85;
        else if (this.difficulty === "normal") attackChance = 0.7;
        else if (this.difficulty === "easy") attackChance = 0.45;
        if (Math.random() < attackChance) {
          if (Math.random() < 0.7) {
            input.kick = true;
          } else {
            input.punch = true;
          }
        }
      }
      return input;
    }
    /**
     * 地面主決策行為樹 (Ground AI Decision Tree)
     */
    _makeDecision(ai, player, engine) {
      const input = { x: 0, y: 0, punch: false, kick: false, guard: false, skill1: false, skill2: false, skill3: false, burst: false };
      const dist = Math.abs(ai.x - player.x);
      const facingPlayer = (ai.x < player.x ? 1 : -1) === ai.facing;
      const dirToPlayer = ai.x < player.x ? 1 : -1;
      const playerInAir = !player.isGrounded;
      const playerAttacking = player.state === "light_punch" || player.state === "heavy_kick" || player.state === "crouch_punch" || player.state === "crouch_kick" || player.state === "ranged_attack" || player.state === "skill" || player.state === "jump" && !!player.currentAction;
      const isPlayerLowAttack = player.state === "crouch_kick" || player.currentAction && player.currentAction.guardType === "crouch_only";
      const playerGuarding = player.isGuarding;
      const incomingProjectile = engine && engine.projectiles && engine.projectiles.find((p) => {
        if (p.owner === player) {
          const pTowardsAI = p.vx > 0 && p.x < ai.x || p.vx < 0 && p.x > ai.x || Math.abs(p.vx) < 1;
          const pDist = Math.abs(p.x - ai.x);
          return pTowardsAI && pDist < 280;
        }
        return false;
      });
      if (this.difficulty === "nightmare") {
        if (ai.state === "hit_stun" && ai.burstMeter >= ai.burstMax && ai.burstAvailable) {
          input.burst = true;
          return input;
        }
        if (playerInAir && dist < 170) {
          if (ai.cooldowns[1] <= 0) {
            input.skill2 = true;
            return input;
          } else {
            if (Math.random() < 0.6) {
              input.y = -1;
              input.x = dirToPlayer;
              input.kick = true;
            } else {
              input.kick = true;
            }
            return input;
          }
        }
        if (incomingProjectile) {
          if (Math.random() < 0.5) {
            input.y = -1;
            input.x = dirToPlayer;
            return input;
          } else {
            input.guard = true;
            return input;
          }
        }
        if (playerAttacking && dist < 140) {
          if (ai.cooldowns[0] <= 0 && ai.skills?.[0]?.id === "SK-05") {
            input.skill1 = true;
            return input;
          }
          input.guard = true;
          if (isPlayerLowAttack) {
            input.y = 1;
          }
          return input;
        }
        if (playerGuarding && dist < 120) {
          if (ai.cooldowns[2] <= 0 && ai.skills?.[2]?.id === "SK-08") {
            input.skill3 = true;
            return input;
          } else if (ai.cooldowns[0] <= 0 && ai.skills?.[0]?.id === "SK-03") {
            input.skill1 = true;
            return input;
          } else {
            if (Math.random() < 0.4) {
              input.y = -1;
              input.x = dirToPlayer;
              return input;
            } else {
              input.y = 1;
              input.kick = true;
              return input;
            }
          }
        }
        if (dist > 220) {
          const r = Math.random();
          if (r < 0.35) {
            input.y = -1;
            input.x = dirToPlayer;
            return input;
          } else if (r < 0.65 && ai.cooldowns[0] <= 0) {
            input.skill1 = true;
            return input;
          } else {
            input.x = dirToPlayer;
            return input;
          }
        }
        if (dist >= 120) {
          const r = Math.random();
          if (r < 0.35) {
            input.y = -1;
            input.x = dirToPlayer;
            return input;
          } else if (r < 0.65) {
            input.x = dirToPlayer;
            return input;
          } else if (r < 0.85) {
            input.x = -dirToPlayer;
            return input;
          } else {
            input.y = -1;
            input.x = 0;
            return input;
          }
        }
        const rClose2 = Math.random();
        if (rClose2 < 0.2) {
          input.y = -1;
          input.x = Math.random() < 0.5 ? dirToPlayer : -dirToPlayer;
          return input;
        } else if (rClose2 < 0.55) {
          input.punch = true;
          return input;
        } else if (rClose2 < 0.85) {
          input.kick = true;
          if (Math.random() < 0.4) input.y = 1;
          return input;
        } else {
          input.x = -dirToPlayer;
          return input;
        }
      }
      if (this.difficulty === "hard") {
        if (playerInAir && dist < 150) {
          if (ai.cooldowns[1] <= 0 && Math.random() < 0.75) {
            input.skill2 = true;
            return input;
          } else if (Math.random() < 0.6) {
            input.kick = true;
            return input;
          } else {
            input.guard = true;
            return input;
          }
        }
        if (incomingProjectile) {
          if (Math.random() < 0.45) {
            input.y = -1;
            input.x = dirToPlayer;
            return input;
          } else {
            input.guard = true;
            return input;
          }
        }
        if (playerAttacking && dist < 140) {
          if (Math.random() < 0.85) {
            input.guard = true;
            if (isPlayerLowAttack) {
              input.y = 1;
            }
            return input;
          } else {
            input.y = -1;
            input.x = -dirToPlayer;
            return input;
          }
        }
        if (playerGuarding && dist < 120) {
          const r = Math.random();
          if (r < 0.35) {
            input.y = -1;
            input.x = dirToPlayer;
            return input;
          } else if (r < 0.65) {
            input.y = 1;
            input.kick = true;
            return input;
          }
        }
        if (dist > 200) {
          const r = Math.random();
          if (r < 0.3) {
            input.y = -1;
            input.x = dirToPlayer;
            return input;
          } else if (r < 0.55 && ai.cooldowns[0] <= 0) {
            input.skill1 = true;
            return input;
          } else {
            input.x = dirToPlayer;
            return input;
          }
        }
        if (dist >= 120) {
          const r = Math.random();
          if (r < 0.3) {
            input.y = -1;
            input.x = dirToPlayer;
            return input;
          } else if (r < 0.65) {
            input.x = dirToPlayer;
            return input;
          } else if (r < 0.9) {
            input.x = -dirToPlayer;
            return input;
          } else {
            input.y = -1;
            input.x = 0;
            return input;
          }
        }
        const rClose2 = Math.random();
        if (rClose2 < 0.18) {
          input.y = -1;
          input.x = Math.random() < 0.6 ? -dirToPlayer : dirToPlayer;
          return input;
        } else if (rClose2 < 0.55) {
          input.punch = true;
          return input;
        } else if (rClose2 < 0.85) {
          input.kick = true;
          return input;
        } else {
          input.x = -dirToPlayer;
          return input;
        }
      }
      if (this.difficulty === "normal") {
        if (playerInAir && dist < 140) {
          const r = Math.random();
          if (r < 0.4) {
            input.kick = true;
            return input;
          } else if (r < 0.8) {
            input.guard = true;
            return input;
          }
        }
        if (incomingProjectile) {
          if (Math.random() < 0.35) {
            input.y = -1;
            input.x = dirToPlayer;
            return input;
          } else if (Math.random() < 0.8) {
            input.guard = true;
            return input;
          }
        }
        if (playerAttacking && dist < 135) {
          const r = Math.random();
          if (r < 0.65) {
            input.guard = true;
            if (isPlayerLowAttack && Math.random() < 0.75) {
              input.y = 1;
            }
            return input;
          } else if (r < 0.8) {
            input.y = -1;
            input.x = -dirToPlayer;
            return input;
          }
        }
        if (dist > 200) {
          const r = Math.random();
          if (r < 0.25) {
            input.y = -1;
            input.x = dirToPlayer;
            return input;
          } else if (r < 0.5 && ai.cooldowns[0] <= 0) {
            input.skill1 = true;
            return input;
          } else {
            input.x = dirToPlayer;
            return input;
          }
        }
        if (dist >= 120) {
          const r = Math.random();
          if (r < 0.25) {
            input.y = -1;
            input.x = dirToPlayer;
            return input;
          } else if (r < 0.65) {
            input.x = dirToPlayer;
            return input;
          } else if (r < 0.88) {
            input.x = -dirToPlayer;
            return input;
          } else {
            input.y = -1;
            input.x = 0;
            return input;
          }
        }
        const rClose2 = Math.random();
        if (rClose2 < 0.15) {
          input.y = -1;
          input.x = Math.random() < 0.5 ? -dirToPlayer : dirToPlayer;
          return input;
        } else if (rClose2 < 0.5) {
          input.punch = true;
          return input;
        } else if (rClose2 < 0.8) {
          input.kick = true;
          return input;
        } else if (rClose2 < 0.9 && ai.cooldowns[1] <= 0) {
          input.skill2 = true;
          return input;
        } else {
          input.x = -dirToPlayer;
          return input;
        }
      }
      if (playerAttacking && dist < 120) {
        const r = Math.random();
        if (r < 0.35) {
          input.guard = true;
          if (isPlayerLowAttack && Math.random() < 0.5) {
            input.y = 1;
          }
          return input;
        } else if (r < 0.5) {
          input.y = -1;
          input.x = -dirToPlayer;
          return input;
        }
      }
      if (dist > 180) {
        const r = Math.random();
        if (r < 0.18) {
          input.y = -1;
          input.x = dirToPlayer;
          return input;
        } else {
          input.x = dirToPlayer * 0.8;
          return input;
        }
      }
      if (dist >= 100) {
        const r = Math.random();
        if (r < 0.18) {
          input.y = -1;
          input.x = dirToPlayer;
          return input;
        } else if (r < 0.68) {
          input.x = dirToPlayer * 0.75;
          return input;
        } else {
          input.x = -dirToPlayer * 0.6;
          return input;
        }
      }
      const rClose = Math.random();
      if (rClose < 0.15) {
        input.y = -1;
        input.x = dirToPlayer;
        return input;
      } else if (rClose < 0.45) {
        input.punch = true;
        return input;
      } else if (rClose < 0.7) {
        input.kick = true;
        return input;
      } else if (rClose < 0.85) {
        input.guard = true;
        return input;
      } else {
        input.x = -dirToPlayer * 0.6;
        return input;
      }
    }
    /**
     * 自由格鬥訓練營假人行為控制 (Training Dummy Behavior)
     */
    _decideTrainingDummy(dummy, player, settings) {
      const input = { x: 0, y: 0, punch: false, kick: false, guard: false, skill1: false, skill2: false, skill3: false, burst: false };
      if (settings.dummyReversal && dummy.state === "wakeup" && dummy.stateTime >= 13) {
        input.skill2 = true;
        return input;
      }
      if (settings.dummyStance === "jump") {
        input.y = -1;
      } else if (settings.dummyStance === "crouch") {
        input.y = 1;
      }
      if (settings.dummyGuard === "stand_guard") {
        input.guard = true;
      } else if (settings.dummyGuard === "crouch_guard") {
        input.guard = true;
        input.y = 1;
      } else if (settings.dummyGuard === "after_first_hit") {
        if (player.comboCount >= 1) {
          input.guard = true;
        }
      }
      return input;
    }
  };
  var aiController = new AiController("normal");

  // js/network/p2p.js
  var P2PNetwork = class {
    constructor() {
      this.peer = null;
      this.conn = null;
      this.roomCode = null;
      this.isHost = false;
      this.isConnected = false;
      this.onConnectedCallback = null;
      this.onDataCallback = null;
      this.onStatusChangeCallback = null;
    }
    generateRoomCode() {
      return "CY-" + Math.floor(1e3 + Math.random() * 9e3);
    }
    initHost(onStatusChange) {
      this.isHost = true;
      this.roomCode = this.generateRoomCode();
      this.onStatusChangeCallback = onStatusChange;
      this._initPeer("host");
      return this.roomCode;
    }
    joinRoom(code, onStatusChange) {
      this.isHost = false;
      this.roomCode = code.trim().toUpperCase();
      this.onStatusChangeCallback = onStatusChange;
      this._initPeer("guest");
    }
    _initPeer(role) {
      const peerId = role === "host" ? `cyberstriker-${this.roomCode.toLowerCase()}` : void 0;
      try {
        if (typeof Peer !== "undefined") {
          this.peer = new Peer(peerId, {
            debug: 1,
            config: {
              iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:global.stun.twilio.com:3478" }
              ]
            }
          });
          this.peer.on("open", (id) => {
            if (this.onStatusChangeCallback) {
              this.onStatusChangeCallback(role === "host" ? "waiting_guest" : "connecting");
            }
            if (role === "guest") {
              const hostPeerId = `cyberstriker-${this.roomCode.toLowerCase()}`;
              this._connectToHost(hostPeerId);
            }
          });
          this.peer.on("connection", (conn) => {
            this.conn = conn;
            this._setupConn();
          });
          this.peer.on("error", (err) => {
            console.warn("P2P Peer error:", err);
            if (this.onStatusChangeCallback) {
              this.onStatusChangeCallback("error", err.message);
            }
          });
        } else {
          console.warn("PeerJS not found, fallback to local loopback.");
          setTimeout(() => {
            if (this.onStatusChangeCallback) this.onStatusChangeCallback("waiting_guest");
          }, 500);
        }
      } catch (e) {
        console.warn("P2P Init exception:", e);
        if (this.onStatusChangeCallback) this.onStatusChangeCallback("error", e.message);
      }
    }
    _connectToHost(hostPeerId) {
      if (!this.peer) return;
      this.conn = this.peer.connect(hostPeerId, { reliable: false });
      this._setupConn();
    }
    _setupConn() {
      if (!this.conn) return;
      this.conn.on("open", () => {
        this.isConnected = true;
        if (this.onStatusChangeCallback) {
          this.onStatusChangeCallback("connected", { isHost: this.isHost, roomCode: this.roomCode });
        }
      });
      this.conn.on("data", (data) => {
        if (this.onDataCallback) {
          this.onDataCallback(data);
        }
      });
      this.conn.on("close", () => {
        this.isConnected = false;
        if (this.onStatusChangeCallback) {
          this.onStatusChangeCallback("disconnected");
        }
      });
    }
    send(data) {
      if (this.conn && this.isConnected) {
        try {
          this.conn.send(data);
        } catch (e) {
          console.warn("Send packet failed:", e);
        }
      }
    }
    disconnect() {
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      if (this.peer) {
        this.peer.destroy();
        this.peer = null;
      }
      this.isConnected = false;
      this.roomCode = null;
    }
  };
  var p2pNetwork = new P2PNetwork();

  // js/app.js
  var CyberStrikerApp = class {
    constructor() {
      this.currentTab = "skins";
      this.pedestalSkin = null;
      this.pedestalAction = "idle";
      this.pedestalActionTimer = 0;
      this.pedestalTime = 0;
      this.pedestalAnimId = null;
      this.isFighting = false;
      this.matchMode = "ai";
      this.aiDifficulty = "normal";
      this.loadoutSelection = ["SK-01", "SK-02", "SK-09"];
      this.loadoutTimer = 15;
      this.loadoutInterval = null;
      this.selectedStageId = "random";
      this.currentStage = STAGES[0];
      this.arcadeMode = false;
      this.arcadeStage = 1;
      this.arcadeMaxStages = 5;
      this.arcadeScore = 0;
      this.arcadeStreakWins = 0;
      this.keys = {};
      this.mobileInputs = { x: 0, y: 0, punch: false, kick: false, guard: false, skill1: false, skill2: false, skill3: false, burst: false, superMove: false };
      this.canvas = null;
      this.ctx = null;
      this.pedestalCanvas = null;
      this.pedestalCtx = null;
      this._battleLoopId = null;
    }
    init() {
      saveSystem.init();
      saveSystem.onSyncChange((state, msg) => {
        this.updateCloudSyncUI(state, msg);
      });
      this.pedestalSkin = this.getEquippedSkin();
      this.canvas = document.getElementById("gameCanvas");
      if (this.canvas) {
        this.ctx = this.canvas.getContext("2d");
        this._resizeCanvas();
        window.addEventListener("resize", () => this._resizeCanvas());
      }
      this.pedestalCanvas = document.getElementById("pedestalCanvas");
      if (this.pedestalCanvas) {
        this.pedestalCtx = this.pedestalCanvas.getContext("2d");
        this.pedestalCanvas.width = 400;
        this.pedestalCanvas.height = 360;
      }
      this._bindDOMEvents();
      this._bindKeyboardEvents();
      this._bindTouchEvents();
      this._startLoadingFlow();
      this._startPedestalLoop();
      this.updateUserHUD();
      this.renderSkinsInventory();
      this.renderShopCatalog();
    }
    _resizeCanvas() {
      if (!this.canvas) return;
      const dpr = Math.min(typeof window !== "undefined" && window.devicePixelRatio || 1, 2);
      this.dpr = dpr;
      this.logicalWidth = window.innerWidth;
      this.logicalHeight = window.innerHeight;
      this.canvas.width = Math.round(window.innerWidth * dpr);
      this.canvas.height = Math.round(window.innerHeight * dpr);
      this.canvas.style.width = window.innerWidth + "px";
      this.canvas.style.height = window.innerHeight + "px";
      combatEngine.arenaWidth = window.innerWidth;
      const newFloorY = Math.max(380, Math.round(window.innerHeight - 130));
      combatEngine.floorY = newFloorY;
      if (combatEngine.updatePlatforms) {
        combatEngine.updatePlatforms(window.innerWidth, newFloorY);
      }
      if (combatEngine.p1 && combatEngine.p1.isGrounded && !combatEngine.p1.currentPlatform) combatEngine.p1.y = newFloorY;
      if (combatEngine.p2 && combatEngine.p2.isGrounded && !combatEngine.p2.currentPlatform) combatEngine.p2.y = newFloorY;
    }
    // ─── 開場前置載入動畫 ───
    _startLoadingFlow() {
      const splash = document.getElementById("splashScreen");
      const bar = document.getElementById("splashProgressBar");
      const text = document.getElementById("splashStatusText");
      if (!splash || !bar || !text) return;
      let progress = 0;
      const stages = [
        { p: 35, text: "\u6B63\u5728\u521D\u59CB\u5316\u91CF\u5B50\u6230\u9B25\u5F15\u64CE (60 FPS Physical Engine)..." },
        { p: 75, text: "\u6B63\u5728\u7DE8\u8B6F 10 \u5927\u6838\u5FC3\u6280\u80FD\u77E9\u9663\u6578\u64DA\u5EAB..." },
        { p: 100, text: "\u6B63\u5728\u9023\u63A5\u5168\u606F\u88DD\u5099\u7DB2\u7D61\u8207\u96F2\u7AEF\u8CC7\u6599\u5EAB..." }
      ];
      const interval = setInterval(() => {
        progress += 2;
        bar.style.width = progress + "%";
        if (progress < 35) text.textContent = stages[0].text;
        else if (progress < 75) text.textContent = stages[1].text;
        else text.textContent = stages[2].text;
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            soundEngine.playHit("burst");
            splash.style.opacity = "0";
            setTimeout(() => {
              splash.style.display = "none";
              this.openAuthModal();
            }, 500);
          }, 300);
        }
      }, 25);
    }
    // ─── 大廳展示台 (Skeletal Real-Time Pedestal) ───
    _startPedestalLoop() {
      const render = () => {
        this.pedestalTime++;
        if (this.pedestalCanvas && this.pedestalCtx) {
          const ctx = this.pedestalCtx;
          const w = this.pedestalCanvas.width;
          const h = this.pedestalCanvas.height;
          ctx.clearRect(0, 0, w, h);
          const currentSkin = this.pedestalSkin || SKINS[0];
          characterRenderer.drawPedestal(ctx, w / 2, h - 50, 90, currentSkin, this.pedestalTime);
          if (this.pedestalActionTimer > 0) {
            this.pedestalActionTimer--;
            if (this.pedestalActionTimer <= 0) {
              this.pedestalAction = "idle";
            }
          }
          const dummyModel = {
            x: w / 2,
            y: h - 60,
            facing: 1,
            state: this.pedestalAction,
            stateTime: this.pedestalTime,
            skin: currentSkin,
            isGuarding: this.pedestalAction.includes("guard"),
            guardStance: "high",
            invincibleTimer: 0
          };
          characterRenderer.draw(ctx, dummyModel);
        }
        this.pedestalAnimId = requestAnimationFrame(render);
      };
      render();
    }
    previewPedestalAction(action) {
      this.pedestalAction = action;
      this.pedestalActionTimer = action === "jump" ? 35 : 20;
      soundEngine.playHit(action === "light_punch" ? "punch" : action === "heavy_kick" ? "kick" : action === "high_guard" ? "guard" : action === "ranged_attack" ? "projectile" : "dp");
    }
    // ─── 畫面導航與分頁 ───
    switchTab(tabId) {
      this.currentTab = tabId;
      document.querySelectorAll(".nav-tab-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.tab === tabId);
      });
      document.querySelectorAll(".tab-view").forEach((view) => {
        view.classList.toggle("active", view.id === `view_${tabId}`);
      });
      soundEngine.playUI("click");
    }
    updateUserHUD() {
      const u = saveSystem.currentUser;
      if (!u) return;
      const nickEl = document.getElementById("userNickDisplay");
      const credEl = document.getElementById("userCreditsDisplay");
      const avatarEl = document.getElementById("userAvatarImg");
      const guestBadge = document.getElementById("guestStatusBadge");
      if (nickEl) nickEl.textContent = u.nickname;
      if (credEl) credEl.textContent = u.credits.toLocaleString();
      if (avatarEl) avatarEl.src = u.avatar;
      if (guestBadge) guestBadge.style.display = saveSystem.isGuest ? "inline-block" : "none";
      this.updateCloudSyncUI(saveSystem.syncState, saveSystem.lastSyncMessage);
      if (u.preferences) {
        soundEngine.setBgmVolume(u.preferences.bgmVol || 0.4);
        soundEngine.setSfxVolume(u.preferences.sfxVol || 0.8);
        combatEngine.enableHaptics = u.preferences.haptics !== false;
      }
      this.updateDailySupplyUI();
    }
    updateDailySupplyUI() {
      const claimRewardBtn = document.getElementById("dailyRewardClaimBtn");
      if (!claimRewardBtn) return;
      const canClaim = saveSystem.canClaimDailySupply();
      if (canClaim) {
        claimRewardBtn.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
        claimRewardBtn.style.color = "#ffffff";
        claimRewardBtn.style.cursor = "pointer";
        claimRewardBtn.style.opacity = "1";
        claimRewardBtn.style.border = "none";
        claimRewardBtn.innerHTML = '<i class="fa-solid fa-gift"></i> \u9818\u53D6\u6230\u5099\u88DC\u7D66 (+1,500 \u80FD\u91CF\u5E63\u30FB\u6BCF\u65E5\u9650\u9818\u4E00\u6B21)';
        claimRewardBtn.title = "\u9EDE\u64CA\u9818\u53D6\u4ECA\u65E5\u6230\u5099\u88DC\u7D66 +1,500 \u80FD\u91CF\u5E63";
      } else {
        const resetTime = saveSystem.getTimeUntilNextDailyReset();
        claimRewardBtn.style.background = "#374151";
        claimRewardBtn.style.color = "#9ca3af";
        claimRewardBtn.style.cursor = "not-allowed";
        claimRewardBtn.style.opacity = "0.75";
        claimRewardBtn.style.border = "1px solid #4b5563";
        claimRewardBtn.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> \u4ECA\u65E5\u6230\u5099\u88DC\u7D66\u5DF2\u9818\u53D6 (\u660E\u65E5\u518D\u4F86)';
        claimRewardBtn.title = `\u4ECA\u65E5\u6230\u5099\u88DC\u7D66\u5DF2\u9818\u53D6\u5B8C\u7562\uFF01\u8DDD\u96E2\u660E\u65E5 00:00 \u91CD\u7F6E\u9084\u5269 ${resetTime}`;
      }
    }
    updateCloudSyncUI(state, message = "") {
      const headerBadge = document.getElementById("cloudSyncHeaderBadge");
      if (headerBadge) {
        if (saveSystem.isGuest) {
          headerBadge.style.display = "none";
        } else {
          headerBadge.style.display = "inline-flex";
          if (state === "syncing") {
            headerBadge.innerHTML = '<i class="fa-solid fa-rotate fa-spin" style="color: #ffd700;"></i> <span style="color: #ffd700;">\u540C\u6B65\u4E2D...</span>';
            headerBadge.title = message || "\u6B63\u5728\u8207\u5168\u7403\u96F2\u7AEF\u540C\u6B65\u5B58\u6A94";
          } else if (state === "synced") {
            headerBadge.innerHTML = '<i class="fa-solid fa-cloud" style="color: #00f3ff;"></i> <span style="color: #00f3ff;">\u96F2\u7AEF\u540C\u6B65</span>';
            headerBadge.title = message || "\u5DF2\u9023\u7DDA\u81F3\u5168\u7403\u96F2\u7AEF\u4F3A\u670D\u5668 (\u9032\u5EA6\u8DE8\u96FB\u8166\u540C\u6B65\u4E2D)";
          } else if (state === "error") {
            headerBadge.innerHTML = '<i class="fa-solid fa-cloud-slash" style="color: #ff007f;"></i> <span style="color: #ff007f;">\u672C\u6A5F\u5FEB\u53D6</span>';
            headerBadge.title = message || "\u96F2\u7AEF\u9023\u7DDA\u53D7\u9650\uFF0C\u9032\u5EA6\u66AB\u5B58\u65BC\u672C\u6A5F";
          } else {
            headerBadge.innerHTML = '<i class="fa-solid fa-cloud" style="color: #94a3b8;"></i> <span>\u96F2\u7AEF\u5B58\u6A94</span>';
          }
        }
      }
      const modalIcon = document.getElementById("cloudSyncModalIcon");
      const modalTitle = document.getElementById("cloudSyncModalTitle");
      const modalDesc = document.getElementById("cloudSyncModalDesc");
      if (modalTitle) {
        if (saveSystem.isGuest) {
          if (modalIcon) modalIcon.innerHTML = '<i class="fa-solid fa-user-ninja" style="color: #ffd700;"></i>';
          modalTitle.textContent = "\u8A2A\u5BA2\u6A21\u5F0F\uFF1A\u9032\u5EA6\u50C5\u5132\u5B58\u65BC\u672C\u6A5F";
          modalTitle.style.color = "#ffd700";
          if (modalDesc) modalDesc.textContent = "\u8F38\u5165\u4E0B\u65B9 Gmail \u4FE1\u7BB1\u5373\u53EF\u5347\u7D1A\u70BA\u5168\u7403\u96F2\u7AEF\u5E33\u865F\uFF0C\u8DE8\u96FB\u8166\u6C38\u4E0D\u4E1F\u5931\uFF01";
        } else if (state === "syncing") {
          if (modalIcon) modalIcon.innerHTML = '<i class="fa-solid fa-rotate fa-spin" style="color: #ffd700;"></i>';
          modalTitle.textContent = "\u5168\u7403\u96F2\u7AEF\u5B58\u6A94\uFF1A\u6B63\u5728\u96D9\u5411\u540C\u6B65\u8CC7\u6599...";
          modalTitle.style.color = "#ffd700";
          if (modalDesc) modalDesc.textContent = message || "\u6B63\u5728\u9A57\u8B49\u8DE8\u96FB\u8166\u9032\u5EA6\u4E26\u5408\u4F75\u6700\u65B0\u5916\u89C0\u8207\u91D1\u5E63";
        } else if (state === "synced") {
          if (modalIcon) modalIcon.innerHTML = '<i class="fa-solid fa-cloud-check" style="color: #00f3ff;"></i>';
          modalTitle.textContent = "\u5168\u7403\u96F2\u7AEF\u5B58\u6A94\u670D\u52D9\uFF1A\u5DF2\u540C\u6B65\u6700\u65B0\u7D00\u9304 \u{1F7E2}";
          modalTitle.style.color = "#00f3ff";
          if (modalDesc) modalDesc.textContent = message || "\u5728\u4EFB\u4F55\u96FB\u8166\u767B\u5165\u6B64\u5E33\u865F\uFF0C\u7686\u80FD\u81EA\u52D5\u63A5\u7E8C\u904A\u73A9\uFF01";
        } else if (state === "error") {
          if (modalIcon) modalIcon.innerHTML = '<i class="fa-solid fa-cloud-slash" style="color: #ff007f;"></i>';
          modalTitle.textContent = "\u5168\u7403\u96F2\u7AEF\u5B58\u6A94\u670D\u52D9\uFF1A\u9023\u7DDA\u66AB\u6642\u53D7\u9650 \u{1F7E1}";
          modalTitle.style.color = "#ff007f";
          if (modalDesc) modalDesc.textContent = message || "\u5DF2\u5148\u5132\u5B58\u81F3\u672C\u6A5F\uFF0C\u7DB2\u8DEF\u6062\u5FA9\u6642\u5C07\u81EA\u52D5\u88DC\u63A8\u81F3\u96F2\u7AEF\u3002";
        } else {
          if (modalIcon) modalIcon.innerHTML = '<i class="fa-solid fa-cloud" style="color: #00f3ff;"></i>';
          modalTitle.textContent = "\u5168\u7403\u96F2\u7AEF\u5B58\u6A94\u670D\u52D9\uFF1A\u5DF2\u5C31\u7DD2";
          modalTitle.style.color = "#00f3ff";
          if (modalDesc) modalDesc.textContent = "\u767B\u5165\u540C\u4E00\u500B Email \u5373\u53EF\u5728\u4EFB\u4F55\u96FB\u8166\u81EA\u52D5\u540C\u6B65\u91D1\u5E63\u3001\u9020\u578B\u8207\u6230\u7E3E";
        }
      }
    }
    getEquippedSkin() {
      const u = saveSystem.currentUser;
      const skinId = u ? u.equippedSkin : "skin_cyber_warrior";
      return SKINS.find((s) => s.id === skinId) || SKINS[0];
    }
    // ─── 分頁一：我的外觀渲染 (只會出現玩家擁有的外觀) ───
    renderSkinsInventory() {
      const container = document.getElementById("skinsGrid");
      if (!container) return;
      const u = saveSystem.currentUser;
      const owned = u ? u.skins : ["skin_cyber_warrior"];
      const equipped = u ? u.equippedSkin : "skin_cyber_warrior";
      const myOwnedSkins = SKINS.filter((s) => owned.includes(s.id));
      if (myOwnedSkins.length === 0) {
        container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
          <i class="fa-solid fa-box-open" style="font-size: 36px; margin-bottom: 12px; color: #00f3ff;"></i>
          <div>\u76EE\u524D\u7121\u89E3\u9396\u5916\u89C0\uFF0C\u8ACB\u524D\u5F80\u5546\u5E97\u89E3\u9396\uFF01</div>
        </div>
      `;
        return;
      }
      container.innerHTML = myOwnedSkins.map((s) => {
        const isEquipped = equipped === s.id;
        let btnHtml = "";
        if (isEquipped) {
          btnHtml = `<button class="nav-tab-btn" style="border-color: #00ff66; color: #00ff66; width: 100%; justify-content: center; font-weight: 800;"><i class="fa-solid fa-check"></i> \u6230\u9B25\u88DD\u5099\u4E2D</button>`;
        } else {
          btnHtml = `<button class="nav-tab-btn equip-skin-btn" data-id="${s.id}" style="background: rgba(0, 243, 255, 0.18); border-color: #00f3ff; color: #00f3ff; width: 100%; justify-content: center; font-weight: 800;"><i class="fa-solid fa-shield"></i> \u88DD\u5099\u6B64\u9020\u578B</button>`;
        }
        return `
        <div class="skin-card ${isEquipped ? "equipped" : ""}" data-id="${s.id}" style="cursor: pointer;">
          <div class="skin-header">
            <div>
              <div class="skin-name" style="color: ${s.themeColor}">${s.name}</div>
              <div style="font-size: 11px; color: #94a3b8;">${s.title}</div>
            </div>
            <span class="skin-tag" style="border: 1px solid ${s.themeColor}; color: ${s.themeColor}">${s.isDefault ? "\u521D\u59CB\u9810\u8A2D" : s.category === "shop" ? "\u5DF2\u64C1\u6709" : "\u9650\u5B9A\u5916\u89C0"}</span>
          </div>
          <div class="skin-desc">${s.desc}</div>
          <div class="skin-vfx-box">
            <div><strong>\u26A1 \u666E\u653B\u5149\u8ECC\uFF1A</strong>${s.vfx.punchTrail}</div>
            <div><strong>\u{1F525} \u6280\u80FD\u7279\u6548\uFF1A</strong>${s.vfx.sk1}</div>
          </div>
          ${btnHtml}
        </div>
      `;
      }).join("");
      container.querySelectorAll(".skin-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          const id = card.dataset.id;
          const skinObj = SKINS.find((s) => s.id === id);
          if (skinObj) {
            this.pedestalSkin = skinObj;
            soundEngine.playUI("hover");
          }
        });
      });
      container.querySelectorAll(".equip-skin-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = btn.dataset.id;
          saveSystem.equipSkin(id);
          this.pedestalSkin = this.getEquippedSkin();
          soundEngine.playUI("equip");
          this.renderSkinsInventory();
          this.updateUserHUD();
        });
      });
    }
    // ─── 分頁二：商店渲染 ───
    renderShopCatalog(filterSeries = "all") {
      const container = document.getElementById("shopGrid");
      if (!container) return;
      const u = saveSystem.currentUser;
      const owned = u ? u.skins : [];
      let forSaleSkins = SKINS.filter((s) => s.price > 0);
      if (filterSeries && filterSeries !== "all") {
        forSaleSkins = forSaleSkins.filter((s) => s.series === filterSeries);
      }
      container.innerHTML = forSaleSkins.map((s) => {
        const isOwned = owned.includes(s.id);
        const isMarvel = s.series === "\u6F2B\u5A01\u5B87\u5B99";
        const isDB = s.series === "\u4E03\u9F8D\u73E0\u8D85";
        const isBrawl = s.series === "\u8352\u91CE\u4E82\u9B25";
        return `
        <div class="skin-card">
          <div class="skin-header">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
                ${isBrawl ? '<span style="font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 4px; background: rgba(168,85,247,0.2); color: #d8b4fe; border: 1px solid #a855f7;">\u{1F335} \u8352\u91CE\u4E82\u9B25</span>' : ""}
                ${isMarvel ? '<span style="font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 4px; background: rgba(239,68,68,0.2); color: #f87171; border: 1px solid #ef4444;">\u{1F9B8} \u6F2B\u5A01\u5B87\u5B99</span>' : ""}
                ${isDB ? '<span style="font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 4px; background: rgba(234,179,8,0.2); color: #fde047; border: 1px solid #eab308;">\u{1F409} \u4E03\u9F8D\u73E0\u8D85</span>' : ""}
                <span class="skin-name" style="color: ${s.themeColor}">${s.name}</span>
              </div>
              <div style="font-size: 11px; color: #94a3b8;">${s.title} | ${s.series || "\u6230\u8853\u5916\u88DD"}</div>
            </div>
            <span class="stat-capsule" style="font-size: 13px; font-weight: 800; color: #ffd700; border-color: #ffd700;">\u{1FA99} ${s.price.toLocaleString()}</span>
          </div>
          <div class="skin-desc">${s.desc}</div>
          <div class="skin-vfx-box">
            <div><strong>\u26A1 \u5C08\u5C6C\u5149\u8ECC\uFF1A</strong>${s.vfx.punchTrail}</div>
            <div><strong>\u{1F6E1}\uFE0F \u5C08\u5C6C\u8B77\u76FE\uFF1A</strong>${s.vfx.guardShield}</div>
          </div>
          <div style="font-size: 11px; color: #64748b;">\u{1F3A8} \u5B98\u65B9\u7D93\u5178\u9084\u539F\uFF1A${s.creator || "\u5B98\u65B9\u7D93\u5178"}</div>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button class="nav-tab-btn try-on-btn" data-id="${s.id}" style="flex: 1; justify-content: center; border-color: ${s.themeColor}; color: ${s.themeColor}">
              <i class="fa-solid fa-eye"></i> \u8A66\u7A7F\u6F14\u793A
            </button>
            ${isOwned ? `
              <button class="nav-tab-btn" disabled style="flex: 1; justify-content: center; color: #10b981; border-color: #10b981; font-weight: bold; background: rgba(16, 185, 129, 0.1);">
                <i class="fa-solid fa-check"></i> \u5DF2\u64C1\u6709
              </button>
            ` : `
              <button class="nav-tab-btn buy-skin-btn" data-id="${s.id}" data-price="${s.price}" style="flex: 1; justify-content: center; background: linear-gradient(135deg, #00f3ff, #ff007f); color: #fff; font-weight: 800; box-shadow: 0 0 10px rgba(0,243,255,0.4);">
                <i class="fa-solid fa-cart-shopping"></i> \u8CFC\u8CB7 (\u{1FA99} ${s.price.toLocaleString()})
              </button>
            `}
          </div>
        </div>
      `;
      }).join("");
      container.querySelectorAll(".try-on-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const skinObj = SKINS.find((s) => s.id === id);
          if (skinObj) {
            this.pedestalSkin = skinObj;
            this.switchTab("skins");
            soundEngine.playUI("hover");
          }
        });
      });
      container.querySelectorAll(".buy-skin-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const price = parseInt(btn.dataset.price, 10);
          const skinObj = SKINS.find((s) => s.id === id);
          const skinName = skinObj ? skinObj.name : "\u9020\u578B";
          const res = saveSystem.purchaseSkin(id, price);
          if (res.success) {
            soundEngine.playUI("equip");
            this.pedestalSkin = this.getEquippedSkin();
            alert(`\u{1F389} \u606D\u559C\u6210\u529F\u8CFC\u8CB7\u89E3\u9396\u3010${skinName}\u3011\uFF01\u5DF2\u76F4\u63A5\u70BA\u60A8\u51FA\u6230\u88DD\u5099\uFF0C\u53EF\u524D\u5F80\u300C\u6211\u7684\u5916\u89C0\u300D\u67E5\u770B\uFF01`);
            this.renderShopCatalog(filterSeries);
            this.renderSkinsInventory();
            this.updateUserHUD();
          } else {
            soundEngine.playHit("guard");
            alert(`\u8CFC\u8CB7\u5931\u6557\uFF1A${res.reason}`);
          }
        });
      });
    }
    // ─── 量子身分授權儀 (Authentication Gateway) ───
    openAuthModal() {
      const modal = document.getElementById("authModal");
      if (!modal) return;
      modal.classList.add("active");
      this.renderRegisteredAccounts();
      this.updateCloudSyncUI(saveSystem.syncState, saveSystem.lastSyncMessage);
    }
    renderRegisteredAccounts() {
      const listContainer = document.getElementById("googleAccountsList");
      if (listContainer) {
        const accounts = saveSystem.getRegisteredAccountsList();
        listContainer.innerHTML = accounts.map((acc) => `
        <div class="google-account-card ${acc.isCurrent ? "current" : ""}" style="background: rgba(255,255,255,0.04); border: 1px solid ${acc.isCurrent ? "#00f3ff" : "rgba(255,255,255,0.1)"}; border-radius: 8px; padding: 12px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${acc.avatar}" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid #00f3ff;">
            <div>
              <div style="font-weight: 800; font-size: 14px;">${acc.nickname} ${acc.isCurrent ? '<span style="color:#00f3ff; font-size: 11px;">(\u7576\u524D\u4F7F\u7528)</span>' : ""}</div>
              <div style="font-size: 12px; color: #94a3b8;">${acc.email}</div>
            </div>
          </div>
          <button class="nav-tab-btn switch-acc-btn" data-email="${acc.email}" style="padding: 6px 12px; font-size: 12px; border-color: #00f3ff; color: #00f3ff;">
            \u4E00\u9375\u5207\u63DB
          </button>
        </div>
      `).join("");
        listContainer.querySelectorAll(".switch-acc-btn").forEach((btn) => {
          btn.addEventListener("click", async () => {
            const email = btn.dataset.email;
            btn.disabled = true;
            btn.textContent = "\u5207\u63DB\u4E2D...";
            await saveSystem.switchAccount(email);
            this.updateUserHUD();
            this.renderSkinsInventory();
            this.renderShopCatalog();
            this.closeAuthModal();
            soundEngine.playUI("equip");
          });
        });
      }
    }
    closeAuthModal() {
      const modal = document.getElementById("authModal");
      if (modal) modal.classList.remove("active");
    }
    // ─── 賽前戰術武器與技能配置視窗 (20 款自由挑選 3 項・無時間限制) ───
    openLoadoutModal(startMatchCallback) {
      const modal = document.getElementById("loadoutModal");
      if (!modal) return;
      modal.classList.add("active");
      if (this.loadoutInterval) {
        clearInterval(this.loadoutInterval);
        this.loadoutInterval = null;
      }
      const u = saveSystem.currentUser;
      this.loadoutSelection = u && u.loadout && u.loadout.length === 3 ? [...u.loadout] : ["SK-15", "SK-16", "SK-18"];
      this.loadoutFilter = this.loadoutFilter || "all";
      document.querySelectorAll(".loadout-filter-btn").forEach((btn) => {
        btn.onclick = () => {
          document.querySelectorAll(".loadout-filter-btn").forEach((b) => {
            b.classList.remove("active");
            b.style.background = "transparent";
          });
          btn.classList.add("active");
          btn.style.background = "rgba(255,255,255,0.1)";
          this.loadoutFilter = btn.dataset.filter || "all";
          this._renderLoadoutSkillsGrid();
          soundEngine.playUI("click");
        };
      });
      this._renderLoadoutSkillsGrid();
      document.querySelectorAll(".archetype-btn").forEach((btn) => {
        btn.onclick = () => {
          const archId = btn.dataset.arch;
          const arch = ARCHETYPES.find((a) => a.id === archId);
          if (arch) {
            this.loadoutSelection = [...arch.skills];
            this._renderLoadoutSkillsGrid();
            soundEngine.playUI("click");
          }
        };
      });
      const confirmBtn = document.getElementById("confirmLoadoutBtn");
      if (confirmBtn) {
        confirmBtn.onclick = () => {
          this._confirmLoadout(startMatchCallback);
        };
      }
    }
    _renderLoadoutSkillsGrid() {
      const container = document.getElementById("loadoutSkillsGrid");
      if (!container) return;
      const filter = this.loadoutFilter || "all";
      const displayedSkills = SKILLS.filter((sk) => {
        if (filter === "all") return true;
        return sk.category === filter;
      });
      container.innerHTML = displayedSkills.map((sk) => {
        const isSelected = this.loadoutSelection.includes(sk.id);
        const slotIndex = this.loadoutSelection.indexOf(sk.id);
        const keyName = slotIndex === 0 ? "[U]" : slotIndex === 1 ? "[I]" : slotIndex === 2 ? "[O]" : "";
        const isRanged = sk.category === "ranged";
        return `
        <div class="skill-card ${isSelected ? "selected" : ""}" data-id="${sk.id}" style="background: rgba(255,255,255,0.03); border: 1.5px solid ${isSelected ? "#00f3ff" : "rgba(255,255,255,0.1)"}; border-radius: 8px; padding: 10px; cursor: pointer; position: relative; transition: all 0.2s;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 4px; background: ${isRanged ? "rgba(56,189,248,0.2)" : "rgba(244,63,94,0.2)"}; color: ${isRanged ? "#38bdf8" : "#fb7185"}; border: 1px solid ${isRanged ? "#38bdf8" : "#fb7185"};">
                ${isRanged ? "\u{1F3F9} \u9060\u7A0B\u6B66\u5668" : "\u2694\uFE0F \u8FD1\u6230\u6B66\u85DD"}
              </span>
              <strong style="color: ${sk.color}; font-size: 13px;"><i class="${sk.icon}"></i> ${sk.name}</strong>
            </div>
            ${isSelected ? `<span style="background: #00f3ff; color: #000; font-size: 11px; font-weight: 900; padding: 1px 7px; border-radius: 4px; box-shadow: 0 0 8px rgba(0,243,255,0.6);">${keyName}</span>` : ""}
          </div>
          <div style="font-size: 11px; color: #94a3b8; font-weight: 600;">${sk.typeName} | \u50B7\u5BB3 ${sk.damage} | CD ${sk.cd}s</div>
          <div style="font-size: 11px; color: #64748b; margin-top: 4px; line-height: 1.35;">${sk.description}</div>
        </div>
      `;
      }).join("");
      container.querySelectorAll(".skill-card").forEach((card) => {
        card.addEventListener("click", () => {
          const id = card.dataset.id;
          if (this.loadoutSelection.includes(id)) {
            if (this.loadoutSelection.length > 1) {
              this.loadoutSelection = this.loadoutSelection.filter((s) => s !== id);
            }
          } else {
            if (this.loadoutSelection.length < 3) {
              this.loadoutSelection.push(id);
            } else {
              this.loadoutSelection.shift();
              this.loadoutSelection.push(id);
            }
          }
          soundEngine.playUI("click");
          this._renderLoadoutSkillsGrid();
        });
      });
    }
    _confirmLoadout(callback) {
      const modal = document.getElementById("loadoutModal");
      if (modal) modal.classList.remove("active");
      saveSystem.updateLoadout(this.loadoutSelection);
      if (callback) callback();
    }
    // ─── 進入對戰系統 ───
    startBattle(mode = "ai", diff = "normal") {
      this.matchMode = mode;
      this.aiDifficulty = diff;
      aiController.setDifficulty(diff);
      if (this.selectedStageId === "random") {
        this.currentStage = getRandomStage();
      } else {
        this.currentStage = getStageById(this.selectedStageId);
      }
      this.openLoadoutModal(() => {
        this._launchMatch();
      });
    }
    startArcadeMode() {
      this.arcadeMode = true;
      this.arcadeStage = 1;
      this.arcadeScore = 0;
      this.arcadeStreakWins = 0;
      this.startBattle("arcade", "normal");
    }
    nextArcadeStage() {
      const endModal = document.getElementById("matchEndModal");
      if (endModal) endModal.classList.remove("active");
      this.arcadeStage++;
      this._launchMatch();
    }
    _launchMatch() {
      if (this._battleLoopId) {
        cancelAnimationFrame(this._battleLoopId);
        this._battleLoopId = null;
      }
      const battleScreen = document.getElementById("battleScreen");
      if (battleScreen) battleScreen.classList.add("active");
      const p1Skin = this.getEquippedSkin();
      let p2Skin = SKINS[1];
      let p2Name = `AI (${this.aiDifficulty.toUpperCase()})`;
      let p2Diff = this.aiDifficulty;
      const arcadeBadge = document.getElementById("arcadeStageBadge");
      if (this.matchMode === "arcade") {
        if (arcadeBadge) {
          arcadeBadge.style.display = "block";
          arcadeBadge.innerHTML = `<i class="fa-solid fa-trophy"></i> STAGE ${this.arcadeStage} / ${this.arcadeMaxStages}`;
        }
        if (this.arcadeStage === 1) {
          p2Skin = SKINS.find((s) => s.id === "skin_spiderman") || SKINS[1];
          p2Name = "\u7B2C 1 \u95DC\uFF1A\u5F7C\u5F97\u5E15\u514B\u30FB\u8718\u86DB\u4EBA";
          p2Diff = "normal";
          this.currentStage = getStageById("stage_stark_tower");
        } else if (this.arcadeStage === 2) {
          p2Skin = SKINS.find((s) => s.id === "skin_piccolo") || SKINS[2];
          p2Name = "\u7B2C 2 \u95DC\uFF1A\u9B54\u65CF\u5927\u5E2B\u30FB\u6BD4\u514B";
          p2Diff = "hard";
          this.currentStage = getStageById("stage_namek");
        } else if (this.arcadeStage === 3) {
          p2Skin = SKINS.find((s) => s.id === "skin_trunks_future") || SKINS[3];
          p2Name = "\u7B2C 3 \u95DC\uFF1A\u672A\u4F86\u5E0C\u671B\u30FB\u7279\u5357\u514B\u65AF";
          p2Diff = "hard";
          this.currentStage = getStageById("stage_tenkaichi");
        } else if (this.arcadeStage === 4) {
          p2Skin = SKINS.find((s) => s.id === "skin_vegeta_ssj") || SKINS[4];
          p2Name = "\u7B2C 4 \u95DC\uFF1A\u8CFD\u4E9E\u4EBA\u738B\u5B50\u30FB\u9054\u723E";
          p2Diff = "nightmare";
          this.currentStage = getStageById("stage_cyber_matrix");
        } else {
          p2Skin = SKINS.find((s) => s.id === "skin_thanos") || SKINS.find((s) => s.id === "skin_omega_emperor") || SKINS[5];
          p2Name = "\u{1F451} \u6700\u7D42\u9B54\u738B\uFF1A\u5B87\u5B99\u9738\u4E3B\u30FB\u85A9\u8AFE\u65AF";
          p2Diff = "nightmare";
          this.currentStage = getStageById("stage_stark_tower");
        }
        this.aiDifficulty = p2Diff;
        aiController.setDifficulty(p2Diff);
      } else {
        if (arcadeBadge) arcadeBadge.style.display = "none";
        if (this.aiDifficulty === "hard") p2Skin = SKINS[2];
        if (this.aiDifficulty === "nightmare") p2Skin = SKINS[4];
        if (this.matchMode === "training") p2Name = "\u7DF4\u7FD2\u6728\u6A01\u5047\u4EBA";
        else if (this.matchMode === "local_2p") p2Name = "Player 2";
      }
      const p1Data = {
        name: saveSystem.currentUser ? saveSystem.currentUser.nickname : "Player 1",
        skin: p1Skin,
        loadout: this.loadoutSelection
      };
      const p2Data = {
        name: p2Name,
        skin: p2Skin,
        loadout: ["SK-01", "SK-02", "SK-09"]
      };
      this._resizeCanvas();
      this.matchEndTimer = 0;
      this._lastFrameTime = 0;
      this._timeAccumulator = 0;
      combatEngine.initMatch(p1Data, p2Data, this.matchMode === "training");
      if (this.matchMode === "arcade" && this.arcadeStage > 1) {
        combatEngine.p1.hp = Math.min(combatEngine.p1.maxHp, 650 + 350);
      }
      this.isFighting = true;
      soundEngine.playUI("fight");
      soundEngine.startBgm();
      announcerEngine.startRoundIntro(1);
      const p1NameEl = document.getElementById("p1NameDisplay");
      const p2NameEl = document.getElementById("p2NameDisplay");
      const p2RoleTag = document.getElementById("p2RoleTag");
      if (p1NameEl) p1NameEl.textContent = p1Data.name;
      if (p2NameEl) p2NameEl.textContent = p2Data.name;
      if (p2RoleTag) {
        const p2Text = this.matchMode === "local_2p" ? "2P \u5C0D\u624B" : this.matchMode === "training" ? "\u8A13\u7DF4\u6728\u6A01" : this.matchMode === "arcade" ? `\u8857\u6A5F\u5C0D\u624B (STAGE ${this.arcadeStage})` : "\u96FB\u8166\u5C0D\u624B / AI";
        p2RoleTag.innerHTML = `<i class="fa-solid fa-robot"></i> ${p2Text}`;
      }
      this._updateSkillActionBar();
      this._runBattleLoop();
    }
    _updateSkillActionBar() {
      const bar = document.getElementById("battleActionBar");
      if (!bar) return;
      bar.innerHTML = combatEngine.p1.skills.map((sk, idx) => {
        const hotkey = idx === 0 ? "U" : idx === 1 ? "I" : "O";
        return `
        <div class="skill-hud-card" id="skillCard_${idx}" style="border-color: ${sk.color};">
          <div class="skill-cd-overlay" id="skillCdOverlay_${idx}"></div>
          <i class="${sk.icon}" style="font-size: 20px; color: ${sk.color};"></i>
          <span style="font-size: 10px; font-weight: 900; color: #fff;">[${hotkey}]</span>
        </div>
      `;
      }).join("") + `
      <div class="guard-hud-card" id="guardHudBtn" title="\u6309\u4F4F\u53EC\u559A\u91CF\u5B50\u9632\u8B77\u7F69 (\u5FEB\u6377\u9375: L / Shift)">
        <i class="fa-solid fa-shield-halved" style="font-size: 20px; color: #38bdf8;"></i>
        <span style="font-size: 10px; font-weight: 900; color: #38bdf8;">[L] \u8B77\u76FE</span>
      </div>
      <div class="burst-hud-card" id="burstHudBtn" title="\u53D7\u64CA\u6642\u812B\u8EAB\u7206\u767C [B]">
        <span style="font-size: 11px;">BURST</span>
        <span style="font-size: 9px; opacity: 0.8;">[B]</span>
      </div>
      <div class="burst-hud-card" id="superHudBtn" style="background: linear-gradient(135deg, #ffd700, #ff007f); border-color: #ffd700;" title="\u6EFF\u80FD\u91CF\u6216\u6B98\u8840\u6642\u767C\u52D5\u7D42\u6975\u5967\u7FA9 [P]">
        <span style="font-size: 11px; font-weight: 900; color: #fff;">SUPER</span>
        <span style="font-size: 9px; opacity: 0.9; color: #ffd700;">[P] \u5967\u7FA9</span>
      </div>
    `;
      const guardBtn = document.getElementById("guardHudBtn");
      if (guardBtn) {
        guardBtn.onmousedown = (e) => {
          e.preventDefault();
          this.keys["KeyL"] = true;
        };
        guardBtn.onmouseup = (e) => {
          e.preventDefault();
          this.keys["KeyL"] = false;
        };
        guardBtn.onmouseleave = () => {
          this.keys["KeyL"] = false;
        };
        guardBtn.ontouchstart = (e) => {
          e.preventDefault();
          this.mobileInputs.guard = true;
        };
        guardBtn.ontouchend = (e) => {
          e.preventDefault();
          this.mobileInputs.guard = false;
        };
      }
      const superBtn = document.getElementById("superHudBtn");
      if (superBtn) {
        superBtn.onclick = (e) => {
          e.preventDefault();
          this.keys["KeyP"] = true;
          setTimeout(() => {
            this.keys["KeyP"] = false;
          }, 80);
        };
        superBtn.ontouchstart = (e) => {
          e.preventDefault();
          this.mobileInputs.superMove = true;
        };
        superBtn.ontouchend = (e) => {
          e.preventDefault();
          this.mobileInputs.superMove = false;
        };
      }
      const trainingBar = document.getElementById("trainingToolbar");
      if (trainingBar) {
        trainingBar.style.display = this.matchMode === "training" ? "flex" : "none";
      }
    }
    _runBattleLoop(timestamp = 0) {
      if (!this.isFighting) return;
      if (!this._lastFrameTime) {
        this._lastFrameTime = timestamp || performance.now();
        this._timeAccumulator = 0;
      }
      const now = timestamp || performance.now();
      let delta = now - this._lastFrameTime;
      this._lastFrameTime = now;
      if (delta > 100) delta = 100;
      this._timeAccumulator += delta;
      const FIXED_STEP = 1e3 / 60;
      let steps = 0;
      while (this._timeAccumulator >= FIXED_STEP && steps < 3) {
        const inputP1 = combatEngine.isOver ? { x: 0, y: 0, punch: false, kick: false, guard: false, skill1: false, skill2: false, skill3: false, burst: false } : this._gatherInputsP1();
        let inputP2 = null;
        if (combatEngine.isOver) {
          inputP2 = { x: 0, y: 0, punch: false, kick: false, guard: false, skill1: false, skill2: false, skill3: false, burst: false };
        } else if (this.matchMode === "local_2p") {
          inputP2 = this._gatherInputsP2();
        } else {
          inputP2 = aiController.decide(combatEngine.p2, combatEngine.p1, combatEngine);
        }
        combatEngine.update(inputP1, inputP2);
        if (combatEngine.isOver && !combatEngine.isTraining) {
          if (!this.matchEndTimer) {
            this.matchEndTimer = 1;
          } else {
            this.matchEndTimer++;
          }
          if (this.matchEndTimer === 110) {
            this._showMatchEndModal();
          }
        }
        this._timeAccumulator -= FIXED_STEP;
        steps++;
      }
      this._renderBattleFrame();
      this._updateBattleHUD();
      this._battleLoopId = requestAnimationFrame((ts) => this._runBattleLoop(ts));
    }
    _gatherInputsP1() {
      const k = this.keys;
      const m = this.mobileInputs;
      let x = 0;
      let y = 0;
      if (k["KeyA"] || k["ArrowLeft"]) x -= 1;
      if (k["KeyD"] || k["ArrowRight"]) x += 1;
      if (k["KeyW"] || k["ArrowUp"] || k["Space"]) y -= 1;
      if (k["KeyS"] || k["ArrowDown"]) y += 1;
      if (Math.abs(m.x) > 0.1) x = m.x;
      if (Math.abs(m.y) > 0.1) y = m.y;
      return {
        x,
        y,
        punch: !!(k["KeyJ"] || m.punch),
        kick: !!(k["KeyK"] || m.kick),
        guard: !!(k["KeyL"] || k["ShiftLeft"] || k["ShiftRight"] || m.guard),
        skill1: !!(k["KeyU"] || m.skill1),
        skill2: !!(k["KeyI"] || m.skill2),
        skill3: !!(k["KeyO"] || m.skill3),
        burst: !!(k["KeyB"] || m.burst),
        superMove: !!(k["KeyP"] || m.superMove)
      };
    }
    _gatherInputsP2() {
      const k = this.keys;
      let x = 0;
      let y = 0;
      if (k["ArrowLeft"]) x -= 1;
      if (k["ArrowRight"]) x += 1;
      if (k["ArrowUp"]) y -= 1;
      if (k["ArrowDown"]) y += 1;
      return {
        x,
        y,
        punch: !!(k["Numpad1"] || k["Digit1"]),
        kick: !!(k["Numpad2"] || k["Digit2"]),
        guard: !!(k["Numpad0"] || k["NumpadDecimal"]),
        skill1: !!(k["Numpad4"] || k["Digit4"]),
        skill2: !!(k["Numpad5"] || k["Digit5"]),
        skill3: !!(k["Numpad6"] || k["Digit6"]),
        burst: !!(k["NumpadPlus"] || k["NumpadEnter"] || k["Digit7"]),
        superMove: !!(k["Numpad3"] || k["Digit3"])
      };
    }
    _renderBattleFrame() {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const dpr = this.dpr || 1;
      const w = this.logicalWidth || window.innerWidth;
      const h = this.logicalHeight || window.innerHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      stageRenderer.drawStage(ctx, this.currentStage, w, h, combatEngine.floorY);
      ctx.save();
      if (combatEngine.screenShake && combatEngine.screenShake.intensity > 0.1) {
        ctx.translate(combatEngine.screenShake.x, combatEngine.screenShake.y);
      }
      const groundY = combatEngine.floorY;
      stageRenderer.drawPlatforms(ctx, combatEngine.platforms, this.currentStage);
      this._drawFighterFloorRings(ctx, groundY);
      characterRenderer.draw(ctx, combatEngine.p1);
      characterRenderer.draw(ctx, combatEngine.p2);
      this._drawFighterOverheadBadges(ctx);
      combatEngine.projectiles.forEach((p) => {
        ctx.save();
        const themeCol = p.skin && p.skin.themeColor ? p.skin.themeColor : "#00f3ff";
        const secCol = p.skin && p.skin.secondaryColor ? p.skin.secondaryColor : "#ffffff";
        const rad = p.radius || 10;
        const angle = Math.atan2(p.vy || 0, p.vx || 1);
        if (p.type === "ground_wave") {
          ctx.shadowColor = "#ffaa00";
          ctx.shadowBlur = 18;
          ctx.strokeStyle = "#ffaa00";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(p.x - 24, p.y + 4);
          ctx.lineTo(p.x - 8, p.y - 12);
          ctx.lineTo(p.x + 4, p.y - 4);
          ctx.lineTo(p.x + 20, p.y - 18);
          ctx.lineTo(p.x + 28, p.y + 4);
          ctx.stroke();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x + 8, p.y - 10, 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "heavy") {
          ctx.shadowColor = themeCol;
          ctx.shadowBlur = 24;
          ctx.fillStyle = themeCol;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad * 0.55, 0, Math.PI * 2);
          ctx.fill();
          const ringT = Date.now() / 150;
          ctx.strokeStyle = secCol;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, rad * 1.5, rad * 0.6, ringT, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = themeCol;
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3.5, p.y - (p.vy || 0) * 3.5);
          ctx.stroke();
        } else if (p.type === "homing") {
          ctx.translate(p.x, p.y);
          ctx.rotate(angle);
          ctx.shadowColor = "#ec4899";
          ctx.shadowBlur = 15;
          ctx.fillStyle = "#f43f5e";
          ctx.beginPath();
          ctx.moveTo(10, 0);
          ctx.lineTo(-8, -4.5);
          ctx.lineTo(-6, 0);
          ctx.lineTo(-8, 4.5);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#ffd700";
          ctx.beginPath();
          ctx.moveTo(-7, -2);
          ctx.lineTo(-18 - Math.random() * 6, 0);
          ctx.lineTo(-7, 2);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === "bouncing") {
          ctx.translate(p.x, p.y);
          const rot = Date.now() / 120;
          ctx.rotate(rot);
          ctx.shadowColor = "#a855f7";
          ctx.shadowBlur = 20;
          ctx.fillStyle = "#c084fc";
          ctx.beginPath();
          ctx.moveTo(0, -rad);
          ctx.lineTo(rad, 0);
          ctx.lineTo(0, rad);
          ctx.lineTo(-rad, 0);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(0, 0, rad * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (p.type === "bomb") {
          ctx.shadowColor = "#ff0055";
          ctx.shadowBlur = 18;
          ctx.fillStyle = "#ff0055";
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffd700";
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#ff0055";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 2.5, p.y - p.vy * 2.5);
          ctx.stroke();
        } else if (p.type === "vortex") {
          const vRot = Date.now() / 200;
          ctx.shadowColor = "#00f3ff";
          ctx.shadowBlur = 24;
          ctx.strokeStyle = "rgba(0, 243, 255, 0.75)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad * (1 + Math.sin(vRot * 2) * 0.15), 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = "#a855f7";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad * 0.75, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = "#050510";
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#00f3ff";
          ctx.stroke();
        } else if (p.type === "sniper") {
          ctx.translate(p.x, p.y);
          ctx.rotate(angle);
          ctx.shadowColor = "#00ffff";
          ctx.shadowBlur = 24;
          ctx.fillStyle = "#00ffff";
          ctx.fillRect(-22, -3, 44, 6);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(-12, -1.5, 30, 3);
          ctx.strokeStyle = "rgba(0, 255, 255, 0.75)";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(-18, 0, 9, -Math.PI / 2, Math.PI / 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(-34, 0, 14, -Math.PI / 2, Math.PI / 2);
          ctx.stroke();
        } else if (p.type === "shotgun") {
          ctx.shadowColor = "#d946ef";
          ctx.shadowBlur = 16;
          ctx.fillStyle = "#d946ef";
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "funnel") {
          ctx.translate(p.x, p.y);
          ctx.shadowColor = "#10b981";
          ctx.shadowBlur = 18;
          ctx.fillStyle = "#064e3b";
          ctx.strokeStyle = "#34d399";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(14, 0);
          ctx.lineTo(0, -9);
          ctx.lineTo(-12, 0);
          ctx.lineTo(0, 9);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#6ee7b7";
          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#00f3ff";
          ctx.beginPath();
          ctx.arc(-13, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "funnel_laser") {
          ctx.shadowColor = "#34d399";
          ctx.shadowBlur = 18;
          ctx.fillStyle = "#34d399";
          ctx.fillRect(p.x - 18, p.y - 3, 36, 6);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(p.x - 12, p.y - 1.5, 24, 3);
        } else if (p.type === "cryo_arrow") {
          ctx.translate(p.x, p.y);
          ctx.rotate(angle);
          ctx.shadowColor = "#00e5ff";
          ctx.shadowBlur = 20;
          ctx.fillStyle = "#00e5ff";
          ctx.beginPath();
          ctx.moveTo(20, 0);
          ctx.lineTo(-16, -7);
          ctx.lineTo(-10, 0);
          ctx.lineTo(-16, 7);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.moveTo(15, 0);
          ctx.lineTo(-8, -3);
          ctx.lineTo(-4, 0);
          ctx.lineTo(-8, 3);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "rgba(186, 230, 253, 0.8)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-16, 0);
          ctx.lineTo(-28, 0);
          ctx.stroke();
        } else if (p.type === "grenade") {
          ctx.translate(p.x, p.y);
          ctx.rotate(Date.now() / 90);
          ctx.shadowColor = "#f97316";
          ctx.shadowBlur = 18;
          ctx.fillStyle = "#c2410c";
          ctx.fillRect(-8, -6, 16, 12);
          ctx.strokeStyle = "#ea580c";
          ctx.lineWidth = 2;
          ctx.strokeRect(-8, -6, 16, 12);
          ctx.fillStyle = "#fef08a";
          ctx.beginPath();
          ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "napalm_pool") {
          ctx.shadowColor = "#f97316";
          ctx.shadowBlur = 22;
          const flameH = Math.sin(Date.now() / 80 + p.x) * 5;
          const grad = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, p.radius || 48);
          grad.addColorStop(0, "rgba(255, 235, 59, 0.85)");
          grad.addColorStop(0.45, "rgba(234, 88, 12, 0.65)");
          grad.addColorStop(1, "rgba(220, 38, 38, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y + 4, p.radius || 48, 13 + flameH, 0, 0, Math.PI * 2);
          ctx.fill();
          for (let s = -2; s <= 2; s++) {
            const sx = p.x + s * 15 + Math.sin(Date.now() / 110 + s) * 4;
            const sy = p.y - 6 - Math.abs(Math.cos(Date.now() / 90 + s * 2)) * 18;
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (p.type === "boomerang") {
          ctx.translate(p.x, p.y);
          ctx.rotate(Date.now() / 40);
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 22;
          ctx.fillStyle = "#0284c7";
          ctx.beginPath();
          for (let k = 0; k < 4; k++) {
            const a = k * Math.PI / 2;
            ctx.lineTo(Math.cos(a) * 18, Math.sin(a) * 18);
            ctx.lineTo(Math.cos(a + Math.PI / 4) * 6, Math.sin(a + Math.PI / 4) * 6);
          }
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2.5;
          ctx.stroke();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.shadowColor = themeCol;
          ctx.shadowBlur = 18;
          ctx.fillStyle = themeCol;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = secCol;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3, p.y - (p.vy || 0) * 3);
          ctx.stroke();
        }
        ctx.restore();
      });
      combatEngine.shockwaves.forEach((s) => {
        ctx.save();
        ctx.strokeStyle = s.color || "#00f3ff";
        ctx.shadowColor = s.color || "#00f3ff";
        ctx.shadowBlur = 20;
        if (s.isSuperBeam) {
          const beamH = s.height || 80;
          ctx.fillStyle = s.color;
          ctx.globalAlpha = 0.35;
          ctx.fillRect(0, s.y - beamH * 0.75, w, beamH * 1.5);
          ctx.globalAlpha = 0.85;
          ctx.fillRect(0, s.y - beamH / 2, w, beamH);
          ctx.fillStyle = s.coreColor || "#ffffff";
          ctx.globalAlpha = 0.95;
          ctx.fillRect(0, s.y - beamH * 0.25, w, beamH * 0.5);
          const tNow = Date.now() / 60;
          ctx.strokeStyle = s.coreColor || "#ffffff";
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let lx = 0; lx < w; lx += 25) {
            const ly = s.y + Math.sin(tNow + lx * 0.05) * (beamH * 0.45);
            if (lx === 0) ctx.moveTo(lx, ly);
            else ctx.lineTo(lx, ly);
          }
          ctx.stroke();
        } else if (s.isKO) {
          const progress = Math.min(1, s.radius / s.maxRadius);
          ctx.globalAlpha = Math.max(0, 1 - progress);
          ctx.lineWidth = Math.max(2, (1 - progress) * 14);
          ctx.strokeStyle = s.color || "#ffd700";
          ctx.shadowColor = s.color || "#ffd700";
          ctx.shadowBlur = 35;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.stroke();
          if (progress < 0.4) {
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(s.x, s.y, (1 - progress * 2.5) * 80, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (s.isBeam) {
          ctx.fillStyle = s.color;
          ctx.fillRect(s.x - s.width / 2, s.y - s.height / 2, s.width, s.height);
        } else {
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      });
      this._drawHitSparks(ctx);
      combatEngine.floatingTexts.forEach((t) => {
        ctx.save();
        ctx.font = "bold 18px Orbitron, sans-serif";
        ctx.fillStyle = t.color;
        ctx.shadowColor = t.color;
        ctx.shadowBlur = 10;
        ctx.fillText(t.text, t.x - 40, t.y);
        ctx.restore();
      });
      ctx.restore();
      this._drawComboCounters(ctx, w, h);
      if (combatEngine.isOver && !combatEngine.isTraining) {
        this._drawVictoryBanner(ctx, w, h);
      }
      announcerEngine.draw(ctx, w, h);
    }
    // ─── 打擊爆裂火花與斬芒特效 (Hit Sparks & Impact Rays) ───
    _drawHitSparks(ctx) {
      if (!combatEngine.hitSparks || combatEngine.hitSparks.length === 0) return;
      for (const spark of combatEngine.hitSparks) {
        const alpha = Math.max(0, spark.life / spark.maxLife);
        const progress = 1 - alpha;
        ctx.save();
        const currentRadius = (spark.coreRadius || 20) * (0.4 + progress * 1.3);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = spark.color || "#ff007f";
        ctx.lineWidth = Math.max(1, (1 - progress) * 4);
        ctx.shadowColor = spark.color || "#ff007f";
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
        if (spark.life >= spark.maxLife - 4) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 24;
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, (spark.coreRadius || 20) * 0.5 * (1 - progress), 0, Math.PI * 2);
          ctx.fill();
        }
        if (spark.rays && spark.rays.length > 0) {
          ctx.strokeStyle = spark.color || "#ffd700";
          ctx.lineWidth = Math.max(1, 2.8 * alpha);
          ctx.shadowColor = spark.color || "#ffd700";
          ctx.shadowBlur = 12;
          for (const ray of spark.rays) {
            const rayLen = ray.len * (0.6 + progress * 0.8);
            const startDist = progress * 6;
            const sx = spark.x + Math.cos(ray.angle) * startDist;
            const sy = spark.y + Math.sin(ray.angle) * startDist;
            const ex = spark.x + Math.cos(ray.angle) * (startDist + rayLen);
            const ey = spark.y + Math.sin(ray.angle) * (startDist + rayLen);
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(ex, ey);
            ctx.stroke();
          }
        }
        if (spark.particles) {
          for (const p of spark.particles) {
            if (p.life <= 0) continue;
            const pAlpha = Math.max(0, p.life / p.maxLife);
            ctx.globalAlpha = pAlpha;
            ctx.fillStyle = p.color || spark.color;
            ctx.shadowColor = p.color || spark.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, (p.size || 2.5) * pAlpha, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }
    }
    // ─── 街機風格連擊計數器 (Arcade Combo Counter HUD) ───
    _drawComboCounters(ctx, w, h) {
      const p1 = combatEngine.p1;
      const p2 = combatEngine.p2;
      const renderCombo = (fighter, isLeft) => {
        if (!fighter || fighter.comboCount < 2) return;
        ctx.save();
        const count = fighter.comboCount;
        const damage = fighter.comboDamage;
        const themeColor = isLeft ? "#00f3ff" : "#ff007f";
        const secColor = isLeft ? "#ffd700" : "#ff9900";
        const pulse = 1 + Math.min(0.2, fighter.comboResetTimer / 45 * 0.15);
        const posX = isLeft ? Math.max(80, w * 0.16) : Math.min(w - 80, w * 0.84);
        const posY = Math.max(140, h * 0.35);
        ctx.translate(posX, posY);
        ctx.scale(pulse, pulse);
        ctx.textAlign = isLeft ? "left" : "right";
        ctx.font = '900 42px "Orbitron", sans-serif';
        ctx.fillStyle = themeColor;
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = 18;
        ctx.fillText(`${count} HITS!`, 0, 0);
        ctx.font = 'bold 15px "Orbitron", "Noto Sans TC", sans-serif';
        ctx.fillStyle = secColor;
        ctx.shadowColor = secColor;
        ctx.shadowBlur = 10;
        let praise = "GOOD COMBO";
        if (count >= 7) praise = "\u2605 QUANTUM MASTER! \u2605";
        else if (count >= 5) praise = "\u2605 AMAZING COMBO! \u2605";
        else if (count >= 3) praise = "GREAT COMBO!";
        ctx.fillText(`DAMAGE: ${damage}  [${praise}]`, 0, 24);
        ctx.restore();
      };
      renderCombo(p1, true);
      renderCombo(p2, false);
    }
    _drawVictoryBanner(ctx, w, h) {
      const isP1Win = combatEngine.winner === 1;
      const isP2Win = combatEngine.winner === 2;
      if (!isP1Win && !isP2Win) return;
      const winner = isP1Win ? combatEngine.p1 : combatEngine.p2;
      const winTitle = isP1Win ? "VICTORY \u6230\u9B25\u52DD\u5229" : "K.O. \u6230\u9B25\u7D50\u675F";
      const subTitle = isP1Win ? "\u2605 \u606D\u559C\u7372\u52DD\uFF01\u6F02\u4EAE\u64CA\u5012\u5C0D\u624B\u596A\u4E0B\u51A0\u8ECD \u2605" : `${winner.name} \u8D0F\u5F97\u4E86\u672C\u5834\u5C0D\u6C7A\uFF01`;
      const themeColor = isP1Win ? "#ffd700" : "#ff007f";
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(5, 8, 20, 0.45)";
      ctx.fillRect(0, 0, w, h);
      const cy = Math.max(160, h * 0.28);
      const bannerW = Math.min(w * 0.88, 560);
      const bannerH = 76;
      const bx = w / 2 - bannerW / 2;
      const by = cy - bannerH / 2;
      ctx.fillStyle = "rgba(11, 17, 32, 0.9)";
      ctx.strokeStyle = themeColor;
      ctx.lineWidth = 3;
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 24;
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(bx, by, bannerW, bannerH, 12);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(bx, by, bannerW, bannerH);
        ctx.strokeRect(bx, by, bannerW, bannerH);
      }
      ctx.font = '900 32px "Orbitron", "Noto Sans TC", sans-serif';
      ctx.fillStyle = themeColor;
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 16;
      ctx.fillText(winTitle, w / 2, cy - 10);
      ctx.font = '700 13px "Noto Sans TC", sans-serif';
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 6;
      ctx.fillText(subTitle, w / 2, cy + 20);
      ctx.restore();
    }
    // ─── 瑪利歐風格空中高低平台繪製 (Mario Style Floating Platforms) ───
    _drawPlatforms(ctx) {
      if (!combatEngine.platforms || combatEngine.platforms.length === 0) return;
      const time = Date.now() / 400;
      combatEngine.platforms.forEach((plat) => {
        const { x, y, width, height, color, id } = plat;
        ctx.save();
        const thrusterOffsets = [width * 0.22, width * 0.78];
        thrusterOffsets.forEach((ox) => {
          const tx = x + ox;
          const ty = y + height;
          const flameH = 10 + Math.sin(time * 3 + ox) * 4;
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(tx - 6, ty, 12, 3);
          const grad = ctx.createLinearGradient(tx, ty + 3, tx, ty + 3 + flameH);
          grad.addColorStop(0, color);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(tx - 5, ty + 3);
          ctx.lineTo(tx + 5, ty + 3);
          ctx.lineTo(tx, ty + 3 + flameH);
          ctx.closePath();
          ctx.fill();
        });
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        const gradBody = ctx.createLinearGradient(x, y, x, y + height);
        gradBody.addColorStop(0, "#1a2333");
        gradBody.addColorStop(0.5, "#0f172a");
        gradBody.addColorStop(1, "#080d1a");
        ctx.fillStyle = gradBody;
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, 3);
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
        ctx.lineWidth = 1.5;
        const midY = y + height / 2;
        ctx.beginPath();
        ctx.moveTo(x + 2, midY);
        ctx.lineTo(x + width - 2, midY);
        ctx.stroke();
        const brickCount = 5;
        const brickW = width / brickCount;
        for (let i = 1; i < brickCount; i++) {
          const bx = x + i * brickW;
          ctx.beginPath();
          ctx.moveTo(bx, y + 3);
          ctx.lineTo(bx, midY);
          ctx.stroke();
        }
        for (let i = 0; i < brickCount; i++) {
          const bx = x + (i + 0.5) * brickW;
          if (bx > x + 4 && bx < x + width - 4) {
            ctx.beginPath();
            ctx.moveTo(bx, midY);
            ctx.lineTo(bx, y + height - 1);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        const rivets = [
          [x + 4, y + 5],
          [x + width - 4, y + 5],
          [x + 4, y + height - 5],
          [x + width - 4, y + height - 5]
        ];
        rivets.forEach(([rx, ry]) => {
          ctx.beginPath();
          ctx.arc(rx, ry, 1.8, 0, Math.PI * 2);
          ctx.fill();
        });
        if (id === "plat_center") {
          ctx.save();
          ctx.font = 'bold 13px "Orbitron", sans-serif';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#ffd700";
          ctx.shadowColor = "#ffd700";
          ctx.shadowBlur = 10;
          ctx.fillText("?", x + width / 2, y + height / 2);
          ctx.restore();
        }
        ctx.restore();
      });
    }
    _drawFighterFloorRings(ctx, groundY) {
      const p1 = combatEngine.p1;
      const p2 = combatEngine.p2;
      if (!p1 || !p2) return;
      const time = Date.now() / 250;
      const p1Floor = p1.isGrounded ? p1.y : groundY;
      const p2Floor = p2.isGrounded ? p2.y : groundY;
      ctx.save();
      ctx.translate(p1.x, p1Floor);
      ctx.scale(1, 0.3);
      ctx.beginPath();
      ctx.arc(0, 0, 46 + Math.sin(time) * 4, 0, Math.PI * 2);
      ctx.strokeStyle = "#00f3ff";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#00f3ff";
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.fillStyle = "rgba(0, 243, 255, 0.2)";
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.translate(p2.x, p2Floor);
      ctx.scale(1, 0.3);
      ctx.beginPath();
      ctx.arc(0, 0, 46 + Math.sin(time + 1.5) * 4, 0, Math.PI * 2);
      ctx.strokeStyle = "#ff007f";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#ff007f";
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 0, 127, 0.2)";
      ctx.fill();
      ctx.restore();
    }
    _drawFighterOverheadBadges(ctx) {
      const p1 = combatEngine.p1;
      const p2 = combatEngine.p2;
      if (!p1 || !p2) return;
      const bounce = Math.sin(Date.now() / 180) * 4;
      const p1HeadY = p1.y - 170 + bounce;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#00f3ff";
      ctx.shadowColor = "#00f3ff";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1HeadY);
      ctx.lineTo(p1.x - 7, p1HeadY - 9);
      ctx.lineTo(p1.x + 7, p1HeadY - 9);
      ctx.closePath();
      ctx.fill();
      const p1Hp = Math.max(0, Math.round(p1.hp));
      const badgeW1 = 186;
      const badgeH1 = 28;
      const badgeX1 = p1.x - badgeW1 / 2;
      const badgeY1 = p1HeadY - 9 - badgeH1;
      ctx.fillStyle = "rgba(5, 15, 30, 0.9)";
      ctx.strokeStyle = "#00f3ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(badgeX1, badgeY1, badgeW1, badgeH1, 6);
      } else {
        ctx.rect(badgeX1, badgeY1, badgeW1, badgeH1);
      }
      ctx.fill();
      ctx.stroke();
      ctx.font = '900 12px "Orbitron", "Noto Sans TC", sans-serif';
      ctx.fillStyle = "#00f3ff";
      ctx.shadowColor = "#00f3ff";
      ctx.shadowBlur = 10;
      ctx.fillText(`\u2605 \u9019\u662F\u73A9\u5BB6\u7684\u89D2\u8272 [${p1Hp} HP]`, p1.x, badgeY1 + badgeH1 / 2);
      if (p1.currentAction) {
        const act = p1.currentAction;
        let propText = "\u4E0A\u6BB5";
        let propColor = "#00f3ff";
        if (act.guardType === "crouch_only") {
          propText = "\u4E0B\u6BB5\u30FB\u6383\u5012";
          propColor = "#ffaa00";
        } else if (act.guardType === "stand_only") {
          propText = "\u4E2D\u6BB5\u30FB\u7834\u8E72";
          propColor = "#ff007f";
        } else if (act.guardType === "unblockable") {
          propText = "\u6295\u6280\u30FB\u7834\u9632";
          propColor = "#ffd700";
        } else if (act.isRanged) {
          propText = "\u9060\u7A0B\u5F48\u9053";
          propColor = "#38bdf8";
        }
        const actTagW = 200;
        const actTagH = 22;
        const actTagX = p1.x - actTagW / 2;
        const actTagY = badgeY1 - actTagH - 4;
        ctx.fillStyle = "rgba(2, 10, 24, 0.95)";
        ctx.strokeStyle = propColor;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = propColor;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(actTagX, actTagY, actTagW, actTagH, 5);
        else ctx.rect(actTagX, actTagY, actTagW, actTagH);
        ctx.fill();
        ctx.stroke();
        ctx.font = 'bold 11px "Noto Sans TC", "Orbitron", sans-serif';
        ctx.fillStyle = propColor;
        ctx.fillText(`\u2694\uFE0F ${act.name} [${propText}] ${act.damage}D`, p1.x, actTagY + actTagH / 2);
      } else if (p1.isGuarding) {
        const guardTagW = 160;
        const guardTagH = 20;
        const guardTagX = p1.x - guardTagW / 2;
        const guardTagY = badgeY1 - guardTagH - 4;
        ctx.fillStyle = "rgba(2, 16, 32, 0.9)";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(guardTagX, guardTagY, guardTagW, guardTagH, 4);
        else ctx.rect(guardTagX, guardTagY, guardTagW, guardTagH);
        ctx.fill();
        ctx.stroke();
        ctx.font = 'bold 10px "Noto Sans TC", sans-serif';
        ctx.fillStyle = "#38bdf8";
        ctx.fillText(`\u{1F6E1}\uFE0F \u9632\u8B77\u7F69\u9632\u79A6 (50%\u6E1B\u50B7)`, p1.x, guardTagY + guardTagH / 2);
      }
      ctx.restore();
      const p2HeadY = p2.y - 170 - bounce;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ff007f";
      ctx.shadowColor = "#ff007f";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(p2.x, p2HeadY);
      ctx.lineTo(p2.x - 7, p2HeadY - 9);
      ctx.lineTo(p2.x + 7, p2HeadY - 9);
      ctx.closePath();
      ctx.fill();
      const p2Hp = Math.max(0, Math.round(p2.hp));
      const p2Label = this.matchMode === "local_2p" ? "2P \u5C0D\u624B" : this.matchMode === "training" ? "\u8A13\u7DF4\u6728\u6A01" : "\u96FB\u8166\u5C0D\u624B (AI)";
      const badgeW2 = 168;
      const badgeH2 = 28;
      const badgeX2 = p2.x - badgeW2 / 2;
      const badgeY2 = p2HeadY - 9 - badgeH2;
      ctx.fillStyle = "rgba(25, 5, 15, 0.9)";
      ctx.strokeStyle = "#ff007f";
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(badgeX2, badgeY2, badgeW2, badgeH2, 6);
      } else {
        ctx.rect(badgeX2, badgeY2, badgeW2, badgeH2);
      }
      ctx.fill();
      ctx.stroke();
      ctx.font = '900 12px "Orbitron", "Noto Sans TC", sans-serif';
      ctx.fillStyle = "#ff007f";
      ctx.shadowColor = "#ff007f";
      ctx.shadowBlur = 10;
      ctx.fillText(`${p2Label} [${p2Hp} HP]`, p2.x, badgeY2 + badgeH2 / 2);
      if (p2.currentAction) {
        const act = p2.currentAction;
        let propText = "\u4E0A\u6BB5";
        let propColor = "#ff007f";
        if (act.guardType === "crouch_only") {
          propText = "\u4E0B\u6BB5\u30FB\u6383\u5012";
          propColor = "#ffaa00";
        } else if (act.guardType === "stand_only") {
          propText = "\u4E2D\u6BB5\u30FB\u7834\u8E72";
          propColor = "#ff007f";
        } else if (act.guardType === "unblockable") {
          propText = "\u6295\u6280\u30FB\u7834\u9632";
          propColor = "#ffd700";
        } else if (act.isRanged) {
          propText = "\u9060\u7A0B\u5F48\u9053";
          propColor = "#38bdf8";
        }
        const actTagW = 200;
        const actTagH = 22;
        const actTagX = p2.x - actTagW / 2;
        const actTagY = badgeY2 - actTagH - 4;
        ctx.fillStyle = "rgba(25, 5, 15, 0.95)";
        ctx.strokeStyle = propColor;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = propColor;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(actTagX, actTagY, actTagW, actTagH, 5);
        else ctx.rect(actTagX, actTagY, actTagW, actTagH);
        ctx.fill();
        ctx.stroke();
        ctx.font = 'bold 11px "Noto Sans TC", "Orbitron", sans-serif';
        ctx.fillStyle = propColor;
        ctx.fillText(`\u2694\uFE0F ${act.name} [${propText}] ${act.damage}D`, p2.x, actTagY + actTagH / 2);
      } else if (p2.isGuarding) {
        const guardTagW = 160;
        const guardTagH = 20;
        const guardTagX = p2.x - guardTagW / 2;
        const guardTagY = badgeY2 - guardTagH - 4;
        ctx.fillStyle = "rgba(28, 5, 20, 0.9)";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(guardTagX, guardTagY, guardTagW, guardTagH, 4);
        else ctx.rect(guardTagX, guardTagY, guardTagW, guardTagH);
        ctx.fill();
        ctx.stroke();
        ctx.font = 'bold 10px "Noto Sans TC", sans-serif';
        ctx.fillStyle = "#38bdf8";
        ctx.fillText(`\u{1F6E1}\uFE0F \u9632\u8B77\u7F69\u9632\u79A6 (50%\u6E1B\u50B7)`, p2.x, guardTagY + guardTagH / 2);
      }
      ctx.restore();
    }
    _updateBattleHUD() {
      const hp1El = document.getElementById("p1HpFill");
      const hp2El = document.getElementById("p2HpFill");
      const hp1Text = document.getElementById("p1HpText");
      const hp2Text = document.getElementById("p2HpText");
      const p1Hp = Math.max(0, Math.round(combatEngine.p1.hp));
      const p1Max = combatEngine.p1.maxHp;
      const p2Hp = Math.max(0, Math.round(combatEngine.p2.hp));
      const p2Max = combatEngine.p2.maxHp;
      if (hp1El) hp1El.style.width = `${p1Hp / p1Max * 100}%`;
      if (hp2El) hp2El.style.width = `${p2Hp / p2Max * 100}%`;
      if (hp1Text) hp1Text.textContent = `${p1Hp} / ${p1Max}`;
      if (hp2Text) hp2Text.textContent = `${p2Hp} / ${p2Max}`;
      const p1HpBig = document.getElementById("p1HpBigText");
      const p2HpBig = document.getElementById("p2HpBigText");
      if (p1HpBig) p1HpBig.textContent = `${p1Hp} / ${p1Max}`;
      if (p2HpBig) p2HpBig.textContent = `${p2Hp} / ${p2Max}`;
      const timerEl = document.getElementById("roundTimerText");
      if (timerEl) {
        timerEl.textContent = combatEngine.isTraining ? "\u221E" : combatEngine.roundTime;
      }
      const burst1El = document.getElementById("p1BurstFill");
      if (burst1El) burst1El.style.width = `${combatEngine.p1.burstMeter / combatEngine.p1.burstMax * 100}%`;
      combatEngine.p1.cooldowns.forEach((cd, idx) => {
        const overlay = document.getElementById(`skillCdOverlay_${idx}`);
        if (overlay) {
          const totalCd = combatEngine.p1.skills[idx].cd;
          const ratio = cd > 0 ? cd / totalCd : 0;
          overlay.style.height = `${ratio * 100}%`;
        }
      });
      const frameEl = document.getElementById("frameAdvantageIndicator");
      if (frameEl && combatEngine.isTraining) {
        const adv = combatEngine.p1.frameAdvantage;
        if (adv > 0) {
          frameEl.innerHTML = `<span style="color: #00ff66;">\u6709\u5229 +${adv} \u5E40</span>`;
        } else if (adv < 0) {
          frameEl.innerHTML = `<span style="color: #ff007f;">\u4E0D\u5229 ${adv} \u5E40</span>`;
        } else {
          frameEl.innerHTML = `<span style="color: #94a3b8;">\u5747\u52E2 0 \u5E40</span>`;
        }
      }
      const guardHudBtn = document.getElementById("guardHudBtn");
      if (guardHudBtn) {
        if (combatEngine.p1.isGuarding) {
          guardHudBtn.classList.add("active");
        } else {
          guardHudBtn.classList.remove("active");
        }
      }
      const touchGuardBtn = document.getElementById("touchGuardBtn");
      if (touchGuardBtn) {
        if (combatEngine.p1.isGuarding) {
          touchGuardBtn.classList.add("active");
        } else {
          touchGuardBtn.classList.remove("active");
        }
      }
      const super1El = document.getElementById("p1SuperFill");
      const super2El = document.getElementById("p2SuperFill");
      const superBtn = document.getElementById("superHudBtn");
      const touchSuperBtn = document.getElementById("touchSuperBtn");
      const isP1SuperReady = combatEngine.p1.superMeter >= combatEngine.p1.superMax || combatEngine.p1.hp <= 350 && !combatEngine.p1.usedCrisisSuper;
      if (super1El) {
        const super1Ratio = isP1SuperReady ? 1 : combatEngine.p1.superMeter / combatEngine.p1.superMax;
        super1El.style.width = `${Math.min(100, Math.round(super1Ratio * 100))}%`;
        super1El.style.background = isP1SuperReady ? "linear-gradient(90deg, #ffd700, #ff007f)" : "linear-gradient(90deg, #38bdf8, #818cf8)";
      }
      if (super2El) {
        const super2Ratio = combatEngine.p2.superMeter / combatEngine.p2.superMax;
        super2El.style.width = `${Math.min(100, Math.round(super2Ratio * 100))}%`;
      }
      if (superBtn) {
        if (isP1SuperReady) {
          superBtn.style.opacity = "1";
          superBtn.style.boxShadow = "0 0 16px #ffd700";
        } else {
          superBtn.style.opacity = "0.45";
          superBtn.style.boxShadow = "none";
        }
      }
      if (touchSuperBtn) {
        touchSuperBtn.style.opacity = isP1SuperReady ? "1" : "0.45";
      }
    }
    // ─── 對決結束與結算面板彈出 ───
    _showMatchEndModal() {
      soundEngine.stopBgm();
      const won = combatEngine.winner === 1;
      const isAi = this.matchMode === "ai" || this.matchMode === "arcade";
      const reward = saveSystem.recordBattleResult(won, this.aiDifficulty, isAi);
      const endModal = document.getElementById("matchEndModal");
      const resultTitle = document.getElementById("matchResultTitle");
      const creditsReward = document.getElementById("matchRewardAmount");
      const playAgainBtn = document.getElementById("matchPlayAgainBtn");
      const nextStageBtn = document.getElementById("matchNextStageBtn");
      if (this.matchMode === "arcade") {
        if (won) {
          this.arcadeScore += 18e3 + Math.round(combatEngine.p1.hp * 12);
          this.arcadeStreakWins++;
          if (this.arcadeStage < this.arcadeMaxStages) {
            if (resultTitle) {
              resultTitle.textContent = `STAGE ${this.arcadeStage} CLEAR!`;
              resultTitle.style.color = "#ffd700";
            }
            if (creditsReward) {
              creditsReward.innerHTML = `+${reward.gained} \u80FD\u91CF\u5E63<div style="font-size: 13px; color: #00ff88; margin-top: 4px;">\u751F\u547D\u503C\u6062\u5FA9 +350\uFF01\u5373\u5C07\u8FCE\u6230\u7B2C ${this.arcadeStage + 1} \u95DC</div>`;
            }
            if (nextStageBtn) nextStageBtn.style.display = "flex";
            if (playAgainBtn) playAgainBtn.style.display = "none";
          } else {
            if (endModal) endModal.classList.remove("active");
            const trophyModal = document.getElementById("arcadeTrophyModal");
            const trophyScore = document.getElementById("arcadeTrophyScore");
            if (trophyScore) trophyScore.textContent = `${this.arcadeScore.toLocaleString()} PTS`;
            saveSystem.addCredits(2500);
            soundEngine.playHit("super");
            if (trophyModal) trophyModal.classList.add("active");
            this.updateUserHUD();
            return;
          }
        } else {
          if (resultTitle) {
            resultTitle.textContent = `STAGE ${this.arcadeStage} FAILED`;
            resultTitle.style.color = "#ff007f";
          }
          if (creditsReward) creditsReward.textContent = `+${reward.gained} \u80FD\u91CF\u5E63 (\u95D6\u95DC\u6B62\u6B65\u65BC\u7B2C ${this.arcadeStage} \u95DC)`;
          if (nextStageBtn) nextStageBtn.style.display = "none";
          if (playAgainBtn) {
            playAgainBtn.style.display = "flex";
            playAgainBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> \u91CD\u8A66\u672C\u95DC';
          }
        }
      } else {
        if (nextStageBtn) nextStageBtn.style.display = "none";
        if (playAgainBtn) {
          playAgainBtn.style.display = "flex";
          playAgainBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> \u518D\u73A9\u4E00\u6B21';
        }
        if (resultTitle) {
          resultTitle.textContent = won ? "VICTORY \u6230\u9B25\u52DD\u5229" : "DEFEAT \u6230\u9B25\u843D\u6557";
          resultTitle.style.color = won ? "#00f3ff" : "#ff007f";
        }
        if (creditsReward) creditsReward.textContent = `+${reward.gained} \u80FD\u91CF\u5E63`;
      }
      if (endModal) endModal.classList.add("active");
      this.updateUserHUD();
    }
    exitBattleToLobby() {
      this.isFighting = false;
      if (this._battleLoopId) {
        cancelAnimationFrame(this._battleLoopId);
        this._battleLoopId = null;
      }
      this.matchEndTimer = 0;
      combatEngine.isOver = true;
      soundEngine.stopBgm();
      const battleScreen = document.getElementById("battleScreen");
      if (battleScreen) battleScreen.classList.remove("active");
      const endModal = document.getElementById("matchEndModal");
      if (endModal) endModal.classList.remove("active");
      const trainingBar = document.getElementById("trainingToolbar");
      if (trainingBar) trainingBar.style.display = "none";
      this.updateUserHUD();
    }
    playAgain() {
      const endModal = document.getElementById("matchEndModal");
      if (endModal) endModal.classList.remove("active");
      this._launchMatch();
    }
    // ─── 事件綁定 ───
    _bindDOMEvents() {
      document.querySelectorAll(".nav-tab-btn[data-tab]").forEach((btn) => {
        btn.addEventListener("click", () => this.switchTab(btn.dataset.tab));
      });
      const userBadge = document.getElementById("userBadge");
      if (userBadge) {
        userBadge.addEventListener("click", () => this.openAuthModal());
      }
      const pPunch = document.getElementById("pedestalPunchBtn");
      const pKick = document.getElementById("pedestalKickBtn");
      const pJump = document.getElementById("pedestalJumpBtn");
      const pGuard = document.getElementById("pedestalGuardBtn");
      if (pPunch) pPunch.onclick = () => this.previewPedestalAction("light_punch");
      if (pKick) pKick.onclick = () => this.previewPedestalAction("heavy_kick");
      if (pJump) pJump.onclick = () => this.previewPedestalAction("jump");
      if (pGuard) pGuard.onclick = () => this.previewPedestalAction("high_guard");
      const fab = document.getElementById("fabStartBtn");
      if (fab) {
        fab.addEventListener("click", () => {
          const modeModal = document.getElementById("modeSelectModal");
          if (modeModal) modeModal.classList.add("active");
          soundEngine.playUI("click");
        });
      }
      document.querySelectorAll(".select-ai-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const diff = btn.dataset.diff;
          document.getElementById("modeSelectModal").classList.remove("active");
          this.startBattle("ai", diff);
        });
      });
      const local2pBtn = document.getElementById("selectLocal2pBtn");
      if (local2pBtn) {
        local2pBtn.onclick = () => {
          document.getElementById("modeSelectModal").classList.remove("active");
          this.startBattle("local_2p");
        };
      }
      const startArcadeBtn = document.getElementById("startArcadeModeBtn");
      if (startArcadeBtn) {
        startArcadeBtn.onclick = () => {
          document.getElementById("modeSelectModal").classList.remove("active");
          this.startArcadeMode();
        };
      }
      const matchNextBtn = document.getElementById("matchNextStageBtn");
      if (matchNextBtn) {
        matchNextBtn.onclick = () => {
          this.nextArcadeStage();
        };
      }
      const trophyClaimBtn = document.getElementById("arcadeTrophyClaimBtn");
      if (trophyClaimBtn) {
        trophyClaimBtn.onclick = () => {
          const tModal = document.getElementById("arcadeTrophyModal");
          if (tModal) tModal.classList.remove("active");
          this.exitBattleToLobby();
        };
      }
      document.querySelectorAll(".stage-select-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".stage-select-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          this.selectedStageId = btn.dataset.stage;
          soundEngine.playUI("click");
        });
      });
      const trainingBtn = document.getElementById("selectTrainingBtn");
      if (trainingBtn) {
        trainingBtn.onclick = () => {
          document.getElementById("modeSelectModal").classList.remove("active");
          this.startBattle("training");
        };
      }
      const hostRoomBtn = document.getElementById("hostRoomBtn");
      if (hostRoomBtn) {
        hostRoomBtn.onclick = () => {
          const code = p2pNetwork.initHost((status, data) => {
            if (status === "connected") {
              document.getElementById("modeSelectModal").classList.remove("active");
              this.startBattle("p2p");
            }
          });
          alert(`\u{1F3AE} \u623F\u9593\u5DF2\u5EFA\u7ACB\uFF01\u623F\u9593\u4EE3\u78BC\uFF1A${code}
\u8ACB\u5C07\u4EE3\u78BC\u5206\u4EAB\u7D66\u597D\u53CB\u9023\u7DDA\u5C0D\u6C7A\u3002`);
        };
      }
      const joinRoomBtn = document.getElementById("joinRoomBtn");
      if (joinRoomBtn) {
        joinRoomBtn.onclick = () => {
          const code = prompt("\u8ACB\u8F38\u5165 6 \u4F4D\u6578\u623F\u9593\u4EE3\u78BC\uFF08\u4F8B\u5982\uFF1ACY-8821\uFF09\uFF1A");
          if (code) {
            p2pNetwork.joinRoom(code, (status) => {
              if (status === "connected") {
                document.getElementById("modeSelectModal").classList.remove("active");
                this.startBattle("p2p");
              }
            });
          }
        };
      }
      const emailForm = document.getElementById("manualEmailForm");
      if (emailForm) {
        emailForm.onsubmit = async (e) => {
          e.preventDefault();
          const emailInput = document.getElementById("authEmailInput");
          const nickInput = document.getElementById("authNicknameInput");
          const submitBtn = document.getElementById("authSubmitBtn");
          const email = emailInput ? emailInput.value.trim() : "";
          const nick = nickInput ? nickInput.value.trim() : "";
          if (!email.includes("@") || !email.includes(".")) {
            alert("\u8ACB\u8F38\u5165\u6709\u6548\u7684 Gmail \u4FE1\u7BB1\u683C\u5F0F\uFF01");
            return;
          }
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> \u6B63\u5728\u6AA2\u7D22\u96F2\u7AEF\u5B58\u6A94...';
          }
          try {
            const res = await saveSystem.loginWithEmail(email, nick);
            soundEngine.playUI("equip");
            if (res.restoreSource === "cloud") {
              alert(`\u2601\uFE0F \u8DE8\u96FB\u8166\u96F2\u7AEF\u5B58\u6A94\u9084\u539F\u6210\u529F\uFF01
\u6B61\u8FCE\u56DE\u4F86\uFF0C${res.user.nickname}\uFF01
\u5DF2\u6210\u529F\u81EA\u5168\u7403\u96F2\u7AEF\u540C\u6B65\u60A8\u4E0A\u6B21\u904A\u73A9\u4E4B\u80FD\u91CF\u5E63 (${res.user.credits.toLocaleString()}) \u8207\u6240\u6709\u5916\u89C0\u3002`);
            } else if (res.isNewUser) {
              alert(`\u{1F389} \u6B61\u8FCE\u65B0\u6230\u58EB\uFF01\u5DF2\u767C\u653E 1,200 \u80FD\u91CF\u5E63\u8207 3 \u5957\u9810\u8A2D\u9020\u578B\uFF0C\u4E26\u5EFA\u7ACB\u5168\u7403\u96F2\u7AEF\u5B58\u6A94\u3002`);
            } else {
              alert(`\u2705 \u6B61\u8FCE\u56DE\u4F86\uFF01\u5DF2\u8F09\u5165\u9032\u5EA6\u4E26\u540C\u6B65\u81F3\u5168\u7403\u96F2\u7AEF\u3002`);
            }
            this.updateUserHUD();
            this.renderSkinsInventory();
            this.renderShopCatalog();
            this.closeAuthModal();
          } catch (err) {
            console.error("Login error:", err);
            alert("\u767B\u5165\u8655\u7406\u767C\u751F\u554F\u984C\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21\u3002");
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> \u78BA\u8A8D\u767B\u5165\u4E26\u81EA\u96F2\u7AEF\u9084\u539F\u9032\u5EA6';
            }
          }
        };
      }
      const forceCloudSyncBtn = document.getElementById("forceCloudSyncBtn");
      if (forceCloudSyncBtn) {
        forceCloudSyncBtn.onclick = async () => {
          if (saveSystem.isGuest) {
            alert("\u8A2A\u5BA2\u8EAB\u5206\u7121\u6CD5\u540C\u6B65\u96F2\u7AEF\uFF0C\u8ACB\u5148\u5728\u4E0B\u65B9\u8F38\u5165 Gmail \u767B\u5165\uFF01");
            return;
          }
          forceCloudSyncBtn.disabled = true;
          forceCloudSyncBtn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> \u540C\u6B65\u4E2D...';
          const res = await saveSystem.syncWithCloud();
          forceCloudSyncBtn.disabled = false;
          forceCloudSyncBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> \u7ACB\u5373\u540C\u6B65';
          if (res.success) {
            soundEngine.playUI("equip");
            this.updateUserHUD();
            this.renderSkinsInventory();
            this.renderShopCatalog();
            this.renderRegisteredAccounts();
            alert(`\u2705 \u8DE8\u96FB\u8166\u96D9\u5411\u540C\u6B65\u6210\u529F\uFF01
\u5DF2\u62C9\u53D6\u6700\u65B0\u96F2\u7AEF\u5B58\u6A94\u3002
\u76EE\u524D\u5E33\u865F\uFF1A${res.user.email}
\u80FD\u91CF\u5E63\uFF1A${res.user.credits.toLocaleString()}`);
          } else {
            soundEngine.playHit("guard");
            alert(`\u26A0\uFE0F \u540C\u6B65\u5931\u6557\uFF1A${res.reason || res.error || "\u7DB2\u8DEF\u7570\u5E38"}`);
          }
        };
      }
      const exportSaveTokenBtn = document.getElementById("exportSaveTokenBtn");
      if (exportSaveTokenBtn) {
        exportSaveTokenBtn.onclick = () => {
          const token = saveSystem.exportSaveToken();
          if (!token) {
            alert("\u7576\u524D\u7121\u6709\u6548\u5E33\u865F\u5B58\u6A94\u53EF\u8907\u88FD\uFF01");
            return;
          }
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(token).then(() => {
              soundEngine.playUI("equip");
              alert("\u{1F4CB} \u842C\u7528\u5B58\u6A94\u4EE3\u78BC\u5DF2\u8907\u88FD\u5230\u526A\u8CBC\u7C3F\uFF01\n\u60A8\u53EF\u4EE5\u5728\u5176\u4ED6\u96FB\u8166\u6216\u700F\u89BD\u5668\u9EDE\u64CA\u300C\u5C0E\u5165\u5B58\u6A94\u4EE3\u78BC\u300D\u7ACB\u5373\u9084\u539F\uFF01");
            }).catch(() => {
              prompt("\u8ACB\u624B\u52D5\u8907\u88FD\u4E0B\u5217\u5B58\u6A94\u4EE3\u78BC\uFF1A", token);
            });
          } else {
            prompt("\u8ACB\u624B\u52D5\u8907\u88FD\u4E0B\u5217\u5B58\u6A94\u4EE3\u78BC\uFF1A", token);
          }
        };
      }
      const importSaveTokenBtn = document.getElementById("importSaveTokenBtn");
      if (importSaveTokenBtn) {
        importSaveTokenBtn.onclick = async () => {
          const token = prompt("\u8ACB\u8CBC\u4E0A\u4EE5 CY-SAVE- \u958B\u982D\u7684\u91CF\u5B50\u5B58\u6A94\u4EE3\u78BC\uFF1A");
          if (!token || !token.trim()) return;
          const res = await saveSystem.importSaveToken(token.trim());
          if (res.success) {
            soundEngine.playUI("equip");
            this.updateUserHUD();
            this.renderSkinsInventory();
            this.renderShopCatalog();
            this.renderRegisteredAccounts();
            alert(`\u{1F389} \u5B58\u6A94\u4EE3\u78BC\u5C0E\u5165\u6210\u529F\uFF01
\u5E33\u865F\uFF1A${res.user.email}
\u66B1\u7A31\uFF1A${res.user.nickname}
\u80FD\u91CF\u5E63\uFF1A${res.user.credits.toLocaleString()}
\u5DF2\u81EA\u52D5\u540C\u6B65\u81F3\u5168\u7403\u96F2\u7AEF\uFF01`);
          } else {
            soundEngine.playHit("guard");
            alert(`\u274C \u5B58\u6A94\u4EE3\u78BC\u5C0E\u5165\u5931\u6557\uFF1A${res.reason || "\u4EE3\u78BC\u7121\u6548"}`);
          }
        };
      }
      const guestBtn = document.getElementById("authGuestBtn");
      if (guestBtn) {
        guestBtn.onclick = () => {
          saveSystem.loginAsGuest();
          this.updateUserHUD();
          this.closeAuthModal();
          soundEngine.playUI("click");
        };
      }
      const bugForm = document.getElementById("bugReportForm");
      if (bugForm) {
        bugForm.onsubmit = (e) => {
          e.preventDefault();
          const ticketCode = "BUG-" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.floor(1e3 + Math.random() * 9e3);
          soundEngine.playUI("equip");
          alert(`\u2705 \u611F\u8B1D\u60A8\u7684\u53CD\u994B\uFF01\u5DE5\u55AE\u5DF2\u6210\u529F\u6D3E\u767C\uFF1A\u3010${ticketCode}\u3011
\u7CFB\u7D71\u5DF2\u81EA\u52D5\u6253\u5305\u60A8\u7684 UID\u3001Gmail \u8207\u6548\u80FD\u5E40\u6578\u6578\u64DA\u3002`);
          bugForm.reset();
        };
      }
      const muteBtn = document.getElementById("muteToggleBtn");
      if (muteBtn) {
        muteBtn.onclick = () => {
          soundEngine.setMuted(!soundEngine.isMuted);
          muteBtn.innerHTML = soundEngine.isMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
        };
      }
      const playAgainBtn = document.getElementById("matchPlayAgainBtn");
      if (playAgainBtn) {
        playAgainBtn.onclick = () => this.playAgain();
      }
      const backLobbyBtn = document.getElementById("matchBackLobbyBtn");
      if (backLobbyBtn) {
        backLobbyBtn.onclick = () => this.exitBattleToLobby();
      }
      const cornerExitBtn = document.getElementById("battleCornerExitBtn");
      if (cornerExitBtn) {
        cornerExitBtn.onclick = () => this.exitBattleToLobby();
      }
      const hudExitBtn = document.getElementById("battleHudExitBtn");
      if (hudExitBtn) {
        hudExitBtn.onclick = () => this.exitBattleToLobby();
      }
      const exitTrainingBtn = document.getElementById("exitTrainingBtn");
      if (exitTrainingBtn) {
        exitTrainingBtn.onclick = () => this.exitBattleToLobby();
      }
      const resetTrainingBtn = document.getElementById("resetTrainingBtn");
      if (resetTrainingBtn) {
        resetTrainingBtn.onclick = () => {
          combatEngine.p1.hp = combatEngine.p1.maxHp;
          combatEngine.p2.hp = combatEngine.p2.maxHp;
          combatEngine.p1.x = 200;
          combatEngine.p2.x = 800;
          combatEngine.p1.vx = 0;
          combatEngine.p1.vy = 0;
          combatEngine.p2.vx = 0;
          combatEngine.p2.vy = 0;
          combatEngine.p1.state = "idle";
          combatEngine.p2.state = "idle";
          combatEngine.p1.cooldowns = [0, 0, 0];
          combatEngine.p2.cooldowns = [0, 0, 0];
          combatEngine.floatingTexts.push({
            text: "RESET COMPLETED!",
            x: 500,
            y: 260,
            color: "#ffd700",
            life: 40
          });
          soundEngine.playUI("click");
        };
      }
      const workshopBtn = document.getElementById("workshopOpenBtn");
      if (workshopBtn) {
        workshopBtn.onclick = () => {
          const m = document.getElementById("workshopModal");
          if (m) m.classList.add("active");
        };
      }
      document.querySelectorAll(".shop-filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".shop-filter-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const series = btn.dataset.series;
          this.renderShopCatalog(series);
          soundEngine.playUI("click");
        });
      });
      const claimRewardBtn = document.getElementById("dailyRewardClaimBtn");
      if (claimRewardBtn) {
        claimRewardBtn.addEventListener("click", () => {
          if (!saveSystem.currentUser) return;
          const res = saveSystem.claimDailySupply(1500);
          if (res.success) {
            this.updateUserHUD();
            this.updateDailySupplyUI();
            soundEngine.playUI("equip");
            alert(`\u{1F381} \u6BCF\u65E5\u6230\u5099\u88DC\u7D66\u9818\u53D6\u6210\u529F\uFF01

\u5DF2\u7372\u5F97 +1,500 \u80FD\u91CF\u5E63\uFF01
\u7576\u524D\u80FD\u91CF\u5E63\u9918\u984D\uFF1A${res.newBalance.toLocaleString()} \u5E63\u3002

\u26A0\uFE0F \u6BCF\u65E5\u50C5\u9650\u9818\u53D6 1 \u6B21\uFF0C\u660E\u5929 00:00 \u5F8C\u53EF\u518D\u6B21\u9818\u53D6\uFF01\u5FEB\u53BB\u5546\u57CE\u89E3\u9396\u5FC3\u5100\u7684\u82F1\u96C4\u5427\uFF01`);
            this.renderShopCatalog();
          } else {
            soundEngine.playUI("error");
            const resetTime = saveSystem.getTimeUntilNextDailyReset();
            alert(`\u26A0\uFE0F \u4ECA\u65E5\u6230\u5099\u88DC\u7D66\u5DF2\u9818\u53D6\u5B8C\u7562\uFF01

\u6BCF\u5929\u53EA\u80FD\u9818\u53D6\u4E00\u6B21\u6230\u5099\u88DC\u7D66\uFF0C\u62FF\u5B8C\u5C31\u53EA\u80FD\u7B49\u9694\u5929\u4E86\u3002
\u8DDD\u96E2\u660E\u5929 00:00 \u91CD\u7F6E\u9084\u5269\uFF1A${resetTime}\u3002
\u8ACB\u660E\u5929\u518D\u4F86\u9818\u53D6\uFF01`);
          }
        });
      }
      document.querySelectorAll(".modal-close-btn").forEach((btn) => {
        btn.onclick = () => {
          const m = btn.closest(".modal-overlay");
          if (m) m.classList.remove("active");
        };
      });
    }
    _bindKeyboardEvents() {
      window.addEventListener("keydown", (e) => {
        this.keys[e.code] = true;
        if (e.key === "Escape") {
          if (this.isFighting) {
            this.exitBattleToLobby();
          } else {
            document.querySelectorAll(".modal-overlay.active").forEach((m) => m.classList.remove("active"));
          }
        }
      });
      window.addEventListener("keyup", (e) => {
        this.keys[e.code] = false;
      });
    }
    _bindTouchEvents() {
      const joyZone = document.getElementById("mobileJoystickZone");
      if (joyZone) {
        joyZone.addEventListener("touchstart", (e) => {
          e.preventDefault();
          const touch = e.touches[0];
          const rect = joyZone.getBoundingClientRect();
          this._updateJoystick(touch.clientX - rect.left - rect.width / 2, touch.clientY - rect.top - rect.height / 2);
        });
        joyZone.addEventListener("touchmove", (e) => {
          e.preventDefault();
          const touch = e.touches[0];
          const rect = joyZone.getBoundingClientRect();
          this._updateJoystick(touch.clientX - rect.left - rect.width / 2, touch.clientY - rect.top - rect.height / 2);
        });
        joyZone.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.mobileInputs.x = 0;
          this.mobileInputs.y = 0;
        });
      }
      const bindTouchBtn = (id, key) => {
        const btn = document.getElementById(id);
        if (btn) {
          btn.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.mobileInputs[key] = true;
          });
          btn.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.mobileInputs[key] = false;
          });
        }
      };
      bindTouchBtn("touchPunchBtn", "punch");
      bindTouchBtn("touchKickBtn", "kick");
      bindTouchBtn("touchGuardBtn", "guard");
      bindTouchBtn("touchSkill1Btn", "skill1");
      bindTouchBtn("touchSkill2Btn", "skill2");
      bindTouchBtn("touchSkill3Btn", "skill3");
      bindTouchBtn("touchBurstBtn", "burst");
      bindTouchBtn("touchSuperBtn", "superMove");
    }
    _updateJoystick(dx, dy) {
      const dist = Math.hypot(dx, dy);
      const maxRadius = 60;
      const clampedDist = Math.min(dist, maxRadius);
      const angle = Math.atan2(dy, dx);
      this.mobileInputs.x = Math.cos(angle) * clampedDist / maxRadius;
      this.mobileInputs.y = Math.sin(angle) * clampedDist / maxRadius;
    }
  };
  window.app = new CyberStrikerApp();
  window.addEventListener("DOMContentLoaded", () => {
    window.app.init();
  });
})();
