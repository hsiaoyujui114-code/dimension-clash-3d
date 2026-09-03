/**
 * 跨次元大亂鬥 3D (Dimension Clash Online 3D) - 3D 角色模型與武器系統引擎
 * (100+ Procedural 3D Character Meshes, Weapon Props, Dynamic Combat Effects & Skeletal Animations)
 */

class Character3DModel {
  constructor(charData, scene, isPlayer = true) {
    this.charData = charData;
    this.scene = scene;
    this.isPlayer = isPlayer;

    this.group = new THREE.Group();
    this.limbs = {};
    this.animTime = 0;
    this.auraMesh = null;
    this.shieldMesh = null;
    this.flightThrusterMesh = null;
    this.weaponMesh = null;
    this.leftWeaponMesh = null;
    this.floatingAccessories = [];

    this.buildModel();
    this.scene.add(this.group);
  }

  buildModel() {
    const char = this.charData;
    const series = char.series;
    const cid = char.id;

    const mainColor = new THREE.Color(char.themeColor || 0x38bdf8);
    const darkColor = new THREE.Color(0x0f172a);
    const goldColor = new THREE.Color(0xfacc15);

    // ── 1. Materials ──
    const bodyMat = new THREE.MeshStandardMaterial({
      color: mainColor,
      roughness: series === "gundam" ? 0.25 : 0.6,
      metalness: series === "gundam" ? 0.8 : (series === "gaming" ? 0.4 : 0.2)
    });

    const isSkinGreen = cid === "piccolo" || cid === "orange_piccolo" || cid === "worldbreaker_hulk" || cid === "green_goblin";
    const isSkinPurple = cid === "thanos_gauntlet" || cid === "kid_buu" || cid === "beerus_god_of_destruction";
    const isSkinAsh = cid === "kratos_god_of_war" || cid === "jiren_full_power";
    const isSkinSilver = cid === "silver_surfer";

    const skinColor = isSkinSilver ? 0xe2e8f0 : (isSkinGreen ? (cid.includes("orange") ? 0xf97316 : 0x22c55e) : (isSkinPurple ? 0xa855f7 : (isSkinAsh ? 0xd1d5db : 0xfed7aa)));
    const skinMat = new THREE.MeshStandardMaterial({
      color: skinColor,
      roughness: isSkinSilver ? 0.1 : 0.7,
      metalness: isSkinSilver ? 0.95 : 0.1
    });

    const darkMat = new THREE.MeshStandardMaterial({ color: darkColor, roughness: 0.5 });
    const goldMat = new THREE.MeshStandardMaterial({ color: goldColor, metalness: 0.9, roughness: 0.1 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 });

    // ── 2. Torso (Pectorals, Abdominals & Belt) ──
    const isLarge = cid === "worldbreaker_hulk" || cid === "thanos_gauntlet" || cid === "jiren_full_power" || cid === "orange_piccolo" || cid === "sazabi_char" || cid === "cell_max" || cid === "eren_titan";
    const isSmall = cid === "goku_kid" || cid === "goten_kid" || cid === "trunks_kid";

    const torsoWidth = isLarge ? 2.4 : (isSmall ? 1.2 : 1.6);
    const torsoHeight = isLarge ? 2.8 : (isSmall ? 1.6 : 2.2);
    const torsoDepth = isLarge ? 1.6 : (isSmall ? 0.8 : 1.0);

    const torso = new THREE.Group();
    torso.position.y = isSmall ? 1.8 : (isLarge ? 2.8 : 2.4);

    // Upper Chest Pectorals
    const chestGeo = new THREE.BoxGeometry(torsoWidth, torsoHeight * 0.55, torsoDepth * 1.05);
    const chestMesh = new THREE.Mesh(chestGeo, bodyMat);
    chestMesh.position.y = torsoHeight * 0.22;
    chestMesh.castShadow = true;
    torso.add(chestMesh);

    // Midriff Abdominals
    const absGeo = new THREE.BoxGeometry(torsoWidth * 0.9, torsoHeight * 0.45, torsoDepth * 0.95);
    const absMesh = new THREE.Mesh(absGeo, cid.includes("spiderman") ? blueMat : (series === "dragonball" ? bodyMat : darkMat));
    absMesh.position.y = -torsoHeight * 0.22;
    absMesh.castShadow = true;
    torso.add(absMesh);

    this.group.add(torso);
    this.limbs.torso = torso;

    // ── 3. Head & Facial Features ──
    const headSize = isSmall ? 0.9 : (isLarge ? 1.2 : 1.0);
    const headGeo = new THREE.BoxGeometry(headSize, headSize * 1.05, headSize);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, torsoHeight * 0.72, 0);
    head.castShadow = true;
    torso.add(head);
    this.limbs.head = head;

    // ── 4. Character-Specific Head Accessories, Hair & Chest Emblems ──
    this.buildHeadFeatures(head, char, goldMat, darkMat);
    this.buildTorsoEmblem(torso, char, goldMat, darkMat);

    // ── 5. Limbs (Arms, Pauldrons, Gauntlets & Hands) ──
    const armWidth = isLarge ? 0.65 : (isSmall ? 0.38 : 0.48);
    const armLen = isLarge ? 2.2 : (isSmall ? 1.3 : 1.8);

    const makeArm = (isLeft) => {
      const armGroup = new THREE.Group();
      const posX = (isLeft ? -1 : 1) * (torsoWidth * 0.5 + armWidth * 0.6);
      armGroup.position.set(posX, torsoHeight * 0.25, 0);

      // Bicep
      const bicep = new THREE.Mesh(new THREE.BoxGeometry(armWidth, armLen * 0.5, armWidth), bodyMat);
      bicep.position.y = armLen * 0.15;
      bicep.castShadow = true;
      armGroup.add(bicep);

      // Forearm / Gauntlet / Bracer
      const forearmColor = series === "gundam" ? whiteMat : (series === "dragonball" ? blueMat : (cid.includes("ironman") ? goldMat : darkMat));
      const forearm = new THREE.Mesh(new THREE.BoxGeometry(armWidth * 1.1, armLen * 0.5, armWidth * 1.1), forearmColor);
      forearm.position.y = -armLen * 0.3;
      forearm.castShadow = true;
      armGroup.add(forearm);

      // Shoulder Pauldron Guard
      const pauldronGeo = new THREE.BoxGeometry(armWidth * 1.5, 0.45, armWidth * 1.4);
      const pauldronMat = series === "gundam" ? bodyMat : (cid.includes("cloud") && isLeft ? new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 }) : (cid.includes("vegeta") ? whiteMat : bodyMat));
      const pauldron = new THREE.Mesh(pauldronGeo, pauldronMat);
      pauldron.position.set(0, armLen * 0.4, 0);
      pauldron.castShadow = true;
      armGroup.add(pauldron);

      torso.add(armGroup);
      return armGroup;
    };

    this.limbs.leftArm = makeArm(true);
    this.limbs.rightArm = makeArm(false);

    // ── 6. Legs, Knees & Boots ──
    const legWidth = isLarge ? 0.75 : (isSmall ? 0.42 : 0.55);
    const legLen = isLarge ? 2.4 : (isSmall ? 1.4 : 2.0);

    const makeLeg = (isLeft) => {
      const legGroup = new THREE.Group();
      const posX = (isLeft ? -1 : 1) * (torsoWidth * 0.25);
      legGroup.position.set(posX, -torsoHeight * 0.45, 0);

      // Thigh Pants
      const thighColor = cid.includes("spiderman") ? blueMat : (series === "dragonball" ? (cid.includes("vegeta") ? blueMat : bodyMat) : darkMat);
      const thigh = new THREE.Mesh(new THREE.BoxGeometry(legWidth, legLen * 0.5, legWidth), thighColor);
      thigh.position.y = -legLen * 0.15;
      thigh.castShadow = true;
      legGroup.add(thigh);

      // Knee Armor Cap
      const knee = new THREE.Mesh(new THREE.BoxGeometry(legWidth * 1.1, 0.35, legWidth * 1.2), goldMat);
      knee.position.set(0, -legLen * 0.42, legWidth * 0.1);
      legGroup.add(knee);

      // Boot / Greave / Foot
      const bootColor = series === "gundam" ? redMat : (series === "dragonball" ? (cid.includes("vegeta") ? whiteMat : blueMat) : (cid.includes("ironman") ? redMat : darkMat));
      const boot = new THREE.Mesh(new THREE.BoxGeometry(legWidth * 1.05, legLen * 0.5, legWidth * 1.3), bootColor);
      boot.position.set(0, -legLen * 0.7, legWidth * 0.15);
      boot.castShadow = true;
      legGroup.add(boot);

      torso.add(legGroup);
      return legGroup;
    };

    this.limbs.leftLeg = makeLeg(true);
    this.limbs.rightLeg = makeLeg(false);

    // ── 7. Weapons & Signature Props ──
    this.buildWeapons(this.limbs.rightArm, this.limbs.leftArm, torso, char);

    // ── 8. Back Wings, Funnels, Capes & Floating Props ──
    this.buildBackAndFloatingProps(torso, char, mainColor);

    // ── 9. Aura & Shield Spheres ──
    const auraRadius = isLarge ? 3.4 : 2.4;
    const auraGeo = new THREE.SphereGeometry(auraRadius, 16, 16);
    const auraMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      transparent: true,
      opacity: 0.22,
      wireframe: true
    });
    this.auraMesh = new THREE.Mesh(auraGeo, auraMat);
    this.auraMesh.position.set(0, 0, 0);
    torso.add(this.auraMesh);

    const shieldGeo = new THREE.SphereGeometry(auraRadius + 0.5, 24, 24);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      metalness: 0.9,
      roughness: 0.1
    });
    this.shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    this.shieldMesh.position.set(0, 0, 0);
    torso.add(this.shieldMesh);

    // ── 10. Flight Jet Propulsion Disc ──
    if (char.canFly) {
      const ringGeo = new THREE.RingGeometry(0.8, isLarge ? 2.5 : 1.8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: mainColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0
      });
      this.flightThrusterMesh = new THREE.Mesh(ringGeo, ringMat);
      this.flightThrusterMesh.rotation.x = Math.PI / 2;
      this.flightThrusterMesh.position.y = -legLen * 1.0;
    }

    // ── 11. 漫畫/電影/卡通/3D遊戲真實尺寸縮小 1 比 24 (1:24 Canonical Lore Scale) ──
    const canonScale = this.getCanonLoreScale(char);
    this.canonScale = canonScale;
    this.group.scale.set(canonScale, canonScale, canonScale);
  }

  // ─── 計算角色在漫畫/電影/卡通/3D遊戲真實尺寸縮小 1:24 比例 ───
  getCanonLoreScale(char) {
    const cid = (char.id || "").toLowerCase();
    const series = (char.series || "").toLowerCase();

    // 1. 機動戰士鋼彈系列 / 巨大人形機體 / 巨人 (15m ~ 26m 原作真實設定)
    if (series === "gundam" || cid.includes("titan") || cid.includes("cell_max")) {
      if (cid.includes("sazabi")) return 2.15; // 25.6m 沙薩比
      if (cid.includes("nu_gundam")) return 2.0; // 22.0m ν 鋼彈
      if (cid.includes("cell_max")) return 2.3; // 30.0m 賽魯 MAX
      if (cid.includes("eren_titan")) return 1.85; // 15.0m 進擊的巨人
      return 1.8; // 18.0m 初鋼、自由、獵魔等標準機動戰士
    }

    // 2. 超重裝 / 巨漢 / 巨型魔王 (2.2m ~ 3.5m 原作真實設定)
    if (cid.includes("hulkbuster")) return 1.68; // 3.35m 反浩克裝甲
    if (cid.includes("hulk")) return 1.5; // 2.74m 綠巨人浩克
    if (cid.includes("broly")) return 1.55; // 3.00m 傳說超賽布羅利
    if (cid.includes("thanos")) return 1.4; // 2.52m 滅霸
    if (cid.includes("orange_piccolo")) return 1.38; // 2.45m 橙色比克
    if (cid.includes("jiren")) return 1.28; // 2.20m 吉連
    if (cid.includes("all_might")) return 1.28; // 2.20m 歐爾麥特
    if (cid.includes("whis")) return 1.28; // 2.20m 天使維斯
    if (cid.includes("piccolo")) return 1.3; // 2.26m 比克大魔王
    if (cid.includes("master_chief")) return 1.24; // 2.18m 士官長雷神錘裝甲
    if (cid.includes("doom_slayer")) return 1.2; // 2.05m 毀滅戰士
    if (cid.includes("kratos")) return 1.18; // 2.00m 奎托斯
    if (cid.includes("sephiroth")) return 1.18; // 2.00m 賽菲羅斯
    if (cid.includes("thor")) return 1.14; // 1.98m 雷神索爾
    if (cid.includes("ironman")) return 1.14; // 1.98m 鋼鐵人奈米戰甲

    // 3. 幼年 / 矮小 / 少年英雄 (1.0m ~ 1.35m 原作真實設定)
    if (cid === "goku_kid") return 0.68; // 1.20m 少年孫悟空
    if (cid === "goten_kid") return 0.70; // 1.23m 幼年悟天
    if (cid === "trunks_kid") return 0.72; // 1.29m 幼年特南克斯
    if (cid === "krillin") return 0.74; // 1.30m 克林
    if (cid === "kid_buu") return 0.76; // 1.35m 純粹小普烏
    if (cid === "nezuko") return 0.68; // 1.20m 縮小禰豆子
    if (cid === "megaman") return 0.75; // 1.32m 洛克人

    // 4. 標準人型英雄 (1.60m ~ 1.90m 原作真實設定)
    if (cid.includes("vegeta")) return 0.94; // 1.64m 達爾
    if (cid.includes("levi")) return 0.92; // 1.60m 里維兵長
    if (cid.includes("wolverine")) return 0.92; // 1.60m 金鋼狼 (漫畫原設 5 呎 3 吋)
    if (cid.includes("sora")) return 0.92; // 1.60m 索拉
    if (cid.includes("tanjiro")) return 0.95; // 1.65m 炭治郎
    if (cid.includes("deku")) return 0.95; // 1.66m 綠谷出久
    if (cid.includes("nier_2b")) return 0.96; // 1.68m 2B
    if (cid.includes("link")) return 0.97; // 1.70m 林克
    if (cid.includes("beerus")) return 0.97; // 1.70m 比魯斯
    if (cid.includes("future_trunks")) return 0.97; // 1.70m 未來特南克斯
    if (cid.includes("cloud")) return 0.99; // 1.73m 克勞德
    if (cid.includes("sukuna")) return 0.99; // 1.73m 宿儺
    if (cid.includes("luffy")) return 1.0; // 1.74m 魯夫
    if (cid.includes("goku")) return 1.0; // 1.75m 成年孫悟空 (基準 1.0)
    if (cid.includes("gohan")) return 1.01; // 1.76m 孫悟飯
    if (cid.includes("spiderman")) return 1.02; // 1.78m 蜘蛛人
    if (cid.includes("naruto")) return 1.03; // 1.80m 漩渦鳴人
    if (cid.includes("zoro")) return 1.03; // 1.81m 索隆
    if (cid.includes("sasuke")) return 1.04; // 1.82m 佐助
    if (cid.includes("black_panther")) return 1.05; // 1.83m 黑豹
    if (cid.includes("cap_america")) return 1.07; // 1.88m 美國隊長
    if (cid.includes("doctor_strange")) return 1.07; // 1.88m 奇異博士
    if (cid.includes("deadpool")) return 1.07; // 1.88m 死侍
    if (cid.includes("gojo")) return 1.08; // 1.90m 五條悟
    if (cid.includes("dante") || cid.includes("vergil")) return 1.08; // 1.90m 但丁 / 維吉爾

    return 1.0;
  }

  // ─── 髮型、面具、頭盔與頭部飾品 ───
  buildHeadFeatures(head, char, goldMat, darkMat) {
    const cid = char.id;
    const series = char.series || "";
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x09090b });
    const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const redGlowMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const goldGlowMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const purpleGlowMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
    const greenGlowMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });

    // ── 通用雙眼與眼部特徵 (Canon Eye Aesthetics) ──
    if (series !== "gundam" && !cid.includes("spiderman") && !cid.includes("ironman") && !cid.includes("master_chief") && !cid.includes("doom_slayer") && !cid.includes("nier_2b") && !cid.includes("gojo")) {
      const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.08), cid.includes("ultra_instinct") ? cyanGlowMat : (cid.includes("sasuke") || cid.includes("sukuna") || cid.includes("gohan_beast") ? redGlowMat : blackMat));
      eyeL.position.set(-0.25, 0.1, 0.52);
      head.add(eyeL);

      const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.08), cid.includes("ultra_instinct") ? cyanGlowMat : (cid.includes("sasuke") ? purpleGlowMat : (cid.includes("sukuna") || cid.includes("gohan_beast") ? redGlowMat : blackMat)));
      eyeR.position.set(0.25, 0.1, 0.52);
      head.add(eyeR);
    }

    // 1. 🤖 GUNDAM SERIES (鋼彈系列機體頭部天線與光學傳感器)
    if (series === "gundam") {
      if (cid.includes("barbatos")) {
        // 巴巴托斯惡魔四叉金色天線 + 紅色下巴飾塊
        const vFinL = new THREE.Mesh(new THREE.ConeGeometry(0.16, 1.4, 4), goldMat);
        vFinL.position.set(-0.45, 0.8, 0.4);
        vFinL.rotation.z = Math.PI * 0.3;
        head.add(vFinL);
        const vFinR = new THREE.Mesh(new THREE.ConeGeometry(0.16, 1.4, 4), goldMat);
        vFinR.position.set(0.45, 0.8, 0.4);
        vFinR.rotation.z = -Math.PI * 0.3;
        head.add(vFinR);
        const chin = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.3, 0.2), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
        chin.position.set(0, -0.4, 0.52);
        head.add(chin);
      } else if (cid.includes("sazabi")) {
        // 沙薩比長型指揮官天線 + 綠色單眼傳感器
        const crest = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.6, 4), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
        crest.position.set(0, 0.9, 0.3);
        crest.rotation.x = Math.PI * 0.15;
        head.add(crest);
        const monoEye = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.2), greenGlowMat);
        monoEye.position.set(0, 0.05, 0.52);
        head.add(monoEye);
      } else if (cid.includes("unicorn") || cid.includes("banshee")) {
        // 獨角獸一角天線 / 報喪女妖獅子金色冠頂
        const horn = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.5, 4), cid.includes("banshee") ? goldMat : whiteMat);
        horn.position.set(0, 0.9, 0.4);
        horn.rotation.x = Math.PI * 0.12;
        head.add(horn);
      } else {
        // 經典鋼彈 V-Fin 雙天線 + 紅色中央菱形寶石
        const vFinGeo = new THREE.ConeGeometry(0.18, 1.3, 4);
        const vFinL = new THREE.Mesh(vFinGeo, goldMat);
        vFinL.position.set(-0.45, 0.75, 0.4);
        vFinL.rotation.z = Math.PI * 0.25;
        vFinL.rotation.x = Math.PI * 0.1;
        head.add(vFinL);
        const vFinR = new THREE.Mesh(vFinGeo, goldMat);
        vFinR.position.set(0.45, 0.75, 0.4);
        vFinR.rotation.z = -Math.PI * 0.25;
        vFinR.rotation.x = Math.PI * 0.1;
        head.add(vFinR);
        const jewel = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 0.15), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
        jewel.position.set(0, 0.45, 0.54);
        head.add(jewel);
      }

      const eyes = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.15, 0.2), new THREE.MeshBasicMaterial({ color: cid.includes("banshee") || cid.includes("sazabi") ? 0xef4444 : 0x22c55e }));
      eyes.position.set(0, 0, 0.52);
      head.add(eyes);
    }
    // 2. ⚡ DRAGON BALL SERIES (七龍珠賽亞人變身與神祇特徵)
    else if (series === "dragonball") {
      let hairColor = 0x0f172a;
      if (cid.includes("ssj3") || cid === "goku_ssj1" || cid.includes("gotenks") || cid.includes("broly")) hairColor = 0xfacc15;
      else if (cid.includes("blue")) hairColor = 0x0284c7;
      else if (cid.includes("rose")) hairColor = 0xec4899;
      else if (cid.includes("beast") || cid.includes("ultra_instinct")) hairColor = 0xe2e8f0;
      else if (cid.includes("ultra_ego")) hairColor = 0x9333ea;
      else if (cid.includes("ssj4")) hairColor = 0x1e1b4b;

      if (cid.includes("whis")) {
        // 維斯天使高聳白色髮型 + 天使藍色光環
        const hair = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.8, 8), new THREE.MeshStandardMaterial({ color: 0xffffff }));
        hair.position.set(0, 0.9, -0.1);
        head.add(hair);
        const halo = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.08, 16, 32), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
        halo.rotation.x = Math.PI / 2;
        halo.position.set(0, 1.4, 0);
        head.add(halo);
      } else if (cid.includes("beerus")) {
        // 比魯斯紫色斯芬克斯長貓耳
        const earL = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.1, 4), new THREE.MeshStandardMaterial({ color: 0xa855f7 }));
        earL.position.set(-0.5, 0.7, 0);
        earL.rotation.z = 0.2;
        head.add(earL);
        const earR = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.1, 4), new THREE.MeshStandardMaterial({ color: 0xa855f7 }));
        earR.position.set(0.5, 0.7, 0);
        earR.rotation.z = -0.2;
        head.add(earR);
      } else if (cid.includes("piccolo")) {
        // 比克綠色/橙色觸角雙根
        const isOrange = cid.includes("orange");
        const antL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), new THREE.MeshStandardMaterial({ color: isOrange ? 0xf97316 : 0x22c55e }));
        antL.position.set(-0.35, 0.6, 0.3);
        antL.rotation.z = 0.4;
        head.add(antL);
        const antR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), new THREE.MeshStandardMaterial({ color: isOrange ? 0xf97316 : 0x22c55e }));
        antR.position.set(0.35, 0.6, 0.3);
        antR.rotation.z = -0.4;
        head.add(antR);
      } else if (cid.includes("frieza")) {
        // 弗利沙紫色光澤頭頂寶石
        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 12), new THREE.MeshStandardMaterial({ color: 0x9333ea, roughness: 0.1 }));
        dome.position.set(0, 0.5, 0);
        head.add(dome);
      } else if (cid.includes("cell")) {
        // 賽魯雙重黑色冠角
        const hornL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.2, 0.4), blackMat);
        hornL.position.set(-0.55, 0.6, 0);
        hornL.rotation.z = 0.25;
        head.add(hornL);
        const hornR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.2, 0.4), blackMat);
        hornR.position.set(0.55, 0.6, 0);
        hornR.rotation.z = -0.25;
        head.add(hornR);
      } else {
        // 賽亞人經典向上尖刺髮型 (超級賽亞人、悟飯 Beast 超長銀髮、貝吉塔火焰髮)
        const isBeast = cid.includes("beast");
        const isSSJ3 = cid.includes("ssj3");
        const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.3 });
        const hairGeo = new THREE.ConeGeometry(isSSJ3 || isBeast ? 1.2 : 0.85, isSSJ3 || isBeast ? 2.6 : 1.4, 5);
        const hair = new THREE.Mesh(hairGeo, hairMat);
        hair.position.set(0, isSSJ3 || isBeast ? 1.3 : 0.95, -0.1);
        head.add(hair);
      }
    }
    // 3. 🦸 MARVEL HEROES & VILLAINS (漫威英雄與反派)
    else if (series === "marvel") {
      if (cid.includes("spiderman")) {
        const is2099 = cid.includes("2099");
        const isSymbiote = cid.includes("symbiote");
        const lensMat = is2099 ? redGlowMat : (isSymbiote ? whiteMat : whiteMat);
        const eyeLensL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.05), lensMat);
        eyeLensL.position.set(-0.25, 0.1, 0.52);
        eyeLensL.rotation.z = -0.2;
        head.add(eyeLensL);
        const eyeLensR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.05), lensMat);
        eyeLensR.position.set(0.25, 0.1, 0.52);
        eyeLensR.rotation.z = 0.2;
        head.add(eyeLensR);
      } else if (cid.includes("ironman")) {
        const mask = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.9, 0.2), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 }));
        mask.position.set(0, 0, 0.45);
        head.add(mask);
        const arcEyes = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.1, 0.05), cyanGlowMat);
        arcEyes.position.set(0, 0.12, 0.56);
        head.add(arcEyes);
      } else if (cid.includes("wolverine")) {
        const finMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
        const finL = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.2, 3), finMat);
        finL.position.set(-0.6, 0.5, 0);
        finL.rotation.z = 0.4;
        head.add(finL);
        const finR = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.2, 3), finMat);
        finR.position.set(0.6, 0.5, 0);
        finR.rotation.z = -0.4;
        head.add(finR);
      } else if (cid.includes("loki")) {
        const hornL = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.08, 8, 16, Math.PI * 0.7), goldMat);
        hornL.position.set(-0.5, 0.6, 0.2);
        hornL.rotation.y = -0.5;
        head.add(hornL);
      } else if (cid.includes("ghost_rider")) {
        const flame = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 8), new THREE.MeshBasicMaterial({ color: 0xea580c, wireframe: true }));
        flame.position.set(0, 0.5, 0);
        head.add(flame);
      } else if (cid.includes("black_panther")) {
        const earL = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.4, 4), blackMat);
        earL.position.set(-0.4, 0.6, 0);
        head.add(earL);
        const earR = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.4, 4), blackMat);
        earR.position.set(0.4, 0.6, 0);
        head.add(earR);
      }
    }
    // 4. ⚔️ ANIME & 🎮 GAMING HEROES (動漫與遊戲全明星)
    else {
      if (cid.includes("naruto")) {
        // 鳴人護額 + 黃色尖刺金髮
        const band = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.25, 1.02), new THREE.MeshStandardMaterial({ color: 0x475569 }));
        band.position.set(0, 0.3, 0);
        head.add(band);
        const yellowHair = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.4, 6), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
        yellowHair.position.set(0, 0.9, -0.1);
        head.add(yellowHair);
      } else if (cid.includes("luffy")) {
        if (cid.includes("gear5")) {
          // 魯夫五檔純白雲朵飄逸髮型
          const cloudHair = new THREE.Mesh(new THREE.SphereGeometry(0.85, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 }));
          cloudHair.position.set(0, 0.7, 0);
          head.add(cloudHair);
        } else {
          // 草帽
          const hat = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.1, 16), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
          hat.position.set(0, 0.6, 0);
          head.add(hat);
        }
      } else if (cid.includes("tanjiro")) {
        // 炭治郎暗紅短髮 + 額頭斑紋
        const hair = new THREE.Mesh(new THREE.SphereGeometry(0.7, 8, 8), new THREE.MeshStandardMaterial({ color: 0x7f1d1d }));
        hair.position.set(0, 0.65, 0);
        head.add(hair);
        const scar = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 0.05), redGlowMat);
        scar.position.set(-0.3, 0.3, 0.52);
        head.add(scar);
      } else if (cid.includes("gojo") || cid.includes("nier_2b")) {
        // 五條悟眼罩 / 2B 黑色眼罩
        const blindfold = new THREE.Mesh(new THREE.BoxGeometry(1.04, 0.3, 1.04), blackMat);
        blindfold.position.set(0, 0.1, 0);
        head.add(blindfold);
        const whiteHair = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.6, 6), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
        whiteHair.position.set(0, 0.9, -0.1);
        head.add(whiteHair);
      } else if (cid.includes("master_chief") || cid.includes("doom_slayer")) {
        const visor = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.25, 0.2), goldGlowMat);
        visor.position.set(0, 0.1, 0.5);
        head.add(visor);
      } else if (cid.includes("cloud")) {
        const spikeHair = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.7, 5), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
        spikeHair.position.set(0, 0.95, -0.1);
        spikeHair.rotation.z = -0.2;
        head.add(spikeHair);
      } else if (cid.includes("sephiroth") || cid.includes("dante") || cid.includes("vergil")) {
        const hair = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.8, 6), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 }));
        hair.position.set(0, 0.8, -0.2);
        head.add(hair);
      } else if (cid.includes("link")) {
        const hat = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.8, 4), new THREE.MeshStandardMaterial({ color: 0x15803d }));
        hat.position.set(0, 0.9, -0.4);
        hat.rotation.x = -0.6;
        head.add(hat);
      }
    }
  }

  // ─── 胸前標誌、反應爐、腰帶與鎧甲特徵 (Canon Movie/Anime/Game Costumes) ───
  buildTorsoEmblem(torso, char, goldMat, darkMat) {
    const cid = char.id;
    const series = char.series || "";
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
    const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x15803d });
    const brownMat = new THREE.MeshStandardMaterial({ color: 0x78350f });

    if (cid.includes("ironman")) {
      // 鋼鐵人方舟反應爐 + 金色胸甲飾條
      const arcReactor = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.1, 16), cyanGlowMat);
      arcReactor.rotation.x = Math.PI / 2;
      arcReactor.position.set(0, 0.35, 0.55);
      torso.add(arcReactor);
      const goldTrim = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.15, 0.08), goldMat);
      goldTrim.position.set(0, 0.7, 0.52);
      torso.add(goldTrim);
    } else if (cid.includes("cap_america")) {
      // 美國隊長白星 + 紅白條紋腹肌 + 棕色戰術背帶
      const star = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.08), whiteMat);
      star.position.set(0, 0.45, 0.55);
      torso.add(star);
      for (let i = -2; i <= 2; i++) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.7, 0.06), i % 2 === 0 ? redMat : whiteMat);
        stripe.position.set(i * 0.22, -0.4, 0.53);
        torso.add(stripe);
      }
      const belt = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.2, 1.05), brownMat);
      belt.position.set(0, -0.85, 0);
      torso.add(belt);
    } else if (cid.includes("spiderman")) {
      // 蜘蛛人胸前蜘蛛圖騰 + 藍色側腹
      const emblem = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.06), new THREE.MeshStandardMaterial({ color: 0x09090b }));
      emblem.position.set(0, 0.35, 0.55);
      torso.add(emblem);
      const flankL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.4, 1.02), blueMat);
      flankL.position.set(-0.7, 0, 0);
      torso.add(flankL);
      const flankR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.4, 1.02), blueMat);
      flankR.position.set(0.7, 0, 0);
      torso.add(flankR);
    } else if (cid.includes("thor")) {
      // 雷神索爾 6 顆銀色護胸圓盤
      for (let r = 0; r < 3; r++) {
        for (let c = -1; c <= 1; c += 2) {
          const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06, 12), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 }));
          disc.rotation.x = Math.PI / 2;
          disc.position.set(c * 0.4, 0.5 - r * 0.45, 0.55);
          torso.add(disc);
        }
      }
    } else if (cid.includes("thanos")) {
      // 滅霸金色戰甲條紋
      for (let i = -1; i <= 1; i++) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.1), goldMat);
        rib.position.set(0, 0.4 - i * 0.35, 0.85);
        torso.add(rib);
      }
    } else if (cid.includes("doctor_strange")) {
      // 奇異博士阿迦莫度之眼 (Eye of Agamotto)
      const eyeAmulet = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 12), goldMat);
      eyeAmulet.rotation.x = Math.PI / 2;
      eyeAmulet.position.set(0, 0.55, 0.55);
      torso.add(eyeAmulet);
      const gem = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
      gem.position.set(0, 0.55, 0.59);
      torso.add(gem);
    } else if (series === "dragonball") {
      if (cid.includes("vegeta")) {
        // 達爾賽亞人戰鬥服白胸甲 + 金色肩帶
        const armorPlate = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.2, 0.2), whiteMat);
        armorPlate.position.set(0, 0.3, 0.5);
        torso.add(armorPlate);
        const strapL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.9), goldMat);
        strapL.position.set(-0.6, 0.9, 0);
        torso.add(strapL);
        const strapR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.9), goldMat);
        strapR.position.set(0.6, 0.9, 0);
        torso.add(strapR);
      } else {
        // 悟空深藍色內襯 V 領 + 藍色腰帶 + 悟字標誌
        const vNeck = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.1), blueMat);
        vNeck.position.set(0, 0.65, 0.52);
        torso.add(vNeck);
        const sash = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.25, 1.05), blueMat);
        sash.position.set(0, -0.65, 0);
        torso.add(sash);
        const kanji = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 16), whiteMat);
        kanji.rotation.x = Math.PI / 2;
        kanji.position.set(-0.4, 0.3, 0.54);
        torso.add(kanji);
      }
    } else if (series === "gundam") {
      // 鋼彈經典紅色駕駛艙門 + 雙側黃色排氣進氣散熱口
      const hatch = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.2), redMat);
      hatch.position.set(0, 0.15, 0.55);
      torso.add(hatch);
      const ventL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.25, 0.15), goldMat);
      ventL.position.set(-0.55, 0.35, 0.52);
      torso.add(ventL);
      const ventR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.25, 0.15), goldMat);
      ventR.position.set(0.55, 0.35, 0.52);
      torso.add(ventR);
    } else if (cid.includes("cloud")) {
      // 克勞德左肩鐵質巨型肩鎧 (Silver Bolted Pauldron)
      const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.8, 0.9), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 }));
      pauldron.position.set(-1.1, 0.8, 0);
      torso.add(pauldron);
    } else if (cid.includes("kratos")) {
      // 奎托斯紅色戰神刺青條紋
      const redTattoo = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.0, 0.1), redMat);
      redTattoo.rotation.z = Math.PI * 0.18;
      redTattoo.position.set(-0.2, 0.1, 0.53);
      torso.add(redTattoo);
    } else if (cid.includes("tanjiro")) {
      // 炭治郎綠黑方格羽織 (Checkered Haori Trim)
      const haoriL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.8, 1.05), greenMat);
      haoriL.position.set(-0.8, 0, 0);
      torso.add(haoriL);
      const haoriR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.8, 1.05), greenMat);
      haoriR.position.set(0.8, 0, 0);
      torso.add(haoriR);
    } else if (series === "anime") {
      if (cid.includes("naruto")) {
        const collar = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 0.95), darkMat);
        collar.position.set(0, 0.85, 0);
        torso.add(collar);
        const spiral = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.04, 16), redMat);
        spiral.rotation.x = Math.PI / 2;
        spiral.position.set(0, 0.2, -0.55);
        torso.add(spiral);
      } else if (cid.includes("luffy")) {
        const vestCut = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.3, 0.1), new THREE.MeshStandardMaterial({ color: 0xfed7aa }));
        vestCut.position.set(0, 0.2, 0.52);
        torso.add(vestCut);
        const sash = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.25, 1.05), goldMat);
        sash.position.set(0, -0.7, 0);
        torso.add(sash);
      } else if (cid.includes("zoro")) {
        const haramaki = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.6, 1.05), new THREE.MeshStandardMaterial({ color: 0x22c55e }));
        haramaki.position.set(0, -0.4, 0);
        torso.add(haramaki);
      } else if (cid.includes("levi")) {
        const cravat = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.4, 0.1), whiteMat);
        cravat.position.set(0, 0.65, 0.52);
        torso.add(cravat);
        const harness = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.15, 1.05), brownMat);
        harness.position.set(0, -0.3, 0);
        torso.add(harness);
      }
    } else if (series === "gaming") {
      if (cid.includes("cloud")) {
        const strap = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.8, 1.05), brownMat);
        strap.rotation.z = Math.PI * 0.2;
        strap.position.set(0, 0.1, 0.05);
        torso.add(strap);
        const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.4, 0.7), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 }));
        pauldron.position.set(-1.1, 0.8, 0);
        torso.add(pauldron);
      } else if (cid.includes("kratos")) {
        const redTattoo = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.0, 0.1), redMat);
        redTattoo.rotation.z = Math.PI * 0.18;
        redTattoo.position.set(-0.2, 0.1, 0.53);
        torso.add(redTattoo);
      } else if (cid.includes("link_hero")) {
        const swordCrest = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.06), whiteMat);
        swordCrest.position.set(0, 0.3, 0.53);
        torso.add(swordCrest);
      }
    }
  }

  // ─── 3D 專屬武器與手部道具建構 (High-Fidelity Canon Weapon Meshes) ───
  buildWeapons(rightArm, leftArm, torso, char) {
    const cid = char.id;
    const series = char.series || "";
    const wType = char.weaponType || "none";
    const mainColor = new THREE.Color(char.themeColor || 0x38bdf8);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.95, roughness: 0.1 });
    const darkSteelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 });
    const beamEnergyMat = new THREE.MeshBasicMaterial({ color: mainColor });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.1 });

    if (cid.includes("goku_kid")) {
      // 🥢 如意棒 (Power Pole / Nyoi-bo)
      const poleGroup = new THREE.Group();
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 12), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
      poleGroup.add(pole);
      const capTop = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.15, 12), goldMat);
      capTop.position.y = 1.6;
      poleGroup.add(capTop);
      const capBot = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.15, 12), goldMat);
      capBot.position.y = -1.6;
      poleGroup.add(capBot);
      poleGroup.position.set(0, -0.6, 0.3);
      poleGroup.rotation.x = Math.PI * 0.35;
      rightArm.add(poleGroup);
      this.weaponMesh = poleGroup;
    } else if (cid.includes("whis")) {
      // 🪄 天使神杖 (Whis Angel Staff)
      const staffGroup = new THREE.Group();
      const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.6, 12), goldMat);
      staffGroup.add(staff);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
      orb.position.y = 1.9;
      staffGroup.add(orb);
      staffGroup.position.set(0, -0.6, 0.3);
      rightArm.add(staffGroup);
      this.weaponMesh = staffGroup;
    } else if (cid.includes("naruto")) {
      // 🌀 螺旋丸 (Rasengan Rotating Cyan Energy Sphere)
      const rOrb = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85, wireframe: true }));
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      rOrb.add(core);
      rOrb.position.set(0, -0.7, 0.3);
      rightArm.add(rOrb);
      this.weaponMesh = rOrb;
    } else if (cid.includes("sasuke") && !wType.includes("sword")) {
      // ⚡ 千鳥 (Chidori Lightning Blade)
      const chidori = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.8, 6), new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true }));
      chidori.position.set(0, -0.8, 0.3);
      rightArm.add(chidori);
      this.weaponMesh = chidori;
    } else if (cid.includes("doctor_strange")) {
      // 🔯 塞拉芬之盾 / 艾爾德里奇魔法陣 (Eldritch Magic Mandalas)
      const makeMandala = () => {
        const mg = new THREE.Group();
        const outer = new THREE.Mesh(new THREE.RingGeometry(0.4, 1.2, 24), new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.DoubleSide, transparent: true, opacity: 0.85 }));
        mg.add(outer);
        const star = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.4, 6), new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide }));
        mg.add(star);
        mg.position.set(0, -0.8, 0.2);
        return mg;
      };
      rightArm.add(makeMandala());
      leftArm.add(makeMandala());
    } else if (cid.includes("ironman")) {
      // 💠 掌心脈衝砲 (Repulsor Palm Emitters)
      const repulsorR = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 16), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
      repulsorR.rotation.x = Math.PI / 2;
      repulsorR.position.set(0, -0.8, 0.25);
      rightArm.add(repulsorR);
      const repulsorL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.05, 16), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
      repulsorL.rotation.x = Math.PI / 2;
      repulsorL.position.set(0, -0.8, 0.25);
      leftArm.add(repulsorL);
    } else if (cid.includes("green_goblin")) {
      // 🎃 南瓜炸彈 (Pumpkin Bomb)
      const bomb = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.2 }));
      const glowEyes = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 0.26), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
      bomb.add(glowEyes);
      bomb.position.set(0, -0.7, 0.3);
      rightArm.add(bomb);
      this.weaponMesh = bomb;
    } else if (series === "gundam" && (wType.includes("rifle") || wType.includes("gun") || wType === "beam_rifle")) {
      // 🔫 鋼彈專屬高出力光束步槍 (High-Energy Beam Rifle)
      const rifleGroup = new THREE.Group();
      const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.2, 0.3), darkSteelMat);
      barrel.position.set(0, 0.6, 0);
      rifleGroup.add(barrel);
      const scope = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.3, 12), goldMat);
      scope.rotation.x = Math.PI / 2;
      scope.position.set(0, 0.8, 0.25);
      rifleGroup.add(scope);
      rifleGroup.position.set(0, -0.7, 0.3);
      rifleGroup.rotation.x = Math.PI * 0.4;
      rightArm.add(rifleGroup);
      this.weaponMesh = rifleGroup;
    } else if (series === "dragonball" && !wType.includes("sword")) {
      // ⚡ 賽亞人氣功彈 / 龜派氣功能量蓄力球 (Ki Blast Energy Spheres)
      const kiOrb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), new THREE.MeshBasicMaterial({ color: mainColor, transparent: true, opacity: 0.85, wireframe: true }));
      kiOrb.position.set(0, -0.7, 0.3);
      rightArm.add(kiOrb);
      this.weaponMesh = kiOrb;
    } else if (wType.includes("sword") || wType.includes("blade") || wType.includes("katana") || wType === "tensa_zangetsu" || wType === "nichirin_sword") {
      // 🗡️ 單手長劍 / 武士刀 / 斬月 / 破壞劍 / 鑰刃
      const isGiant = wType.includes("buster") || wType.includes("anti_ship") || wType.includes("moonlight") || wType.includes("crucible");
      const isSephiroth = cid.includes("sephiroth");
      const isKeyblade = cid.includes("sora");
      const isCrucible = cid.includes("doom_slayer");
      const isTanjiro = cid.includes("tanjiro");

      const bladeLen = isSephiroth ? 4.2 : (isGiant ? 3.5 : 2.4);
      const bladeWidth = isGiant ? 0.65 : (isSephiroth ? 0.12 : 0.16);

      const createSwordInstance = (isLeft = false) => {
        const group = new THREE.Group();
        if (cid.includes("cloud")) {
          // 克勞德經典破壞劍 (Buster Sword) - 雙魔晶石插槽 + 雙面刃
          const bladeGeo = new THREE.BoxGeometry(bladeWidth, bladeLen, 0.1);
          const blade = new THREE.Mesh(bladeGeo, bladeMat);
          blade.position.set(0, bladeLen * 0.45, 0.4);
          blade.castShadow = true;
          group.add(blade);

          const spineGeo = new THREE.BoxGeometry(bladeWidth * 0.3, bladeLen, 0.12);
          const spine = new THREE.Mesh(spineGeo, darkSteelMat);
          spine.position.set(-bladeWidth * 0.35, bladeLen * 0.45, 0.4);
          group.add(spine);

          // 雙魔晶石 (Green & Red Glowing Materia Orbs)
          const materiaG = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
          materiaG.position.set(0, 0.6, 0.46);
          group.add(materiaG);

          const materiaR = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
          materiaR.position.set(0, 0.9, 0.46);
          group.add(materiaR);

          const crossguard = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.15, 0.2), goldMat);
          crossguard.position.set(0, 0.1, 0.4);
          group.add(crossguard);
        } else if (isKeyblade) {
          // 🗝️ 索拉王國之心鑰刃 (Kingdom Keyblade)
          const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.4, 12), bladeMat);
          shaft.position.set(0, 1.0, 0.4);
          group.add(shaft);
          const crownTeeth = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.08), goldMat);
          crownTeeth.position.set(0.2, 2.0, 0.4);
          group.add(crownTeeth);
          const crownGuard = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.06, 8, 16), goldMat);
          crownGuard.position.set(0, 0, 0.4);
          group.add(crownGuard);
        } else if (isCrucible) {
          // 🩸 毀滅戰士裁決劍 (The Crucible Blood-Red Energy Broadsword)
          const cBlade = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.2, 0.08), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
          cBlade.position.set(0, 1.4, 0.4);
          group.add(cBlade);
        } else if (isTanjiro) {
          // 🗡️ 炭治郎日輪刀 (漆黑刀身 + 火焰刀鐔)
          const nBlade = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.4, 0.06), new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.1 }));
          nBlade.position.set(0, 1.1, 0.4);
          group.add(nBlade);
          const tsuba = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.04, 16), new THREE.MeshBasicMaterial({ color: 0xdc2626 }));
          tsuba.rotation.x = Math.PI / 2;
          tsuba.position.set(0, 0, 0.4);
          group.add(tsuba);
        } else {
          const bladeGeo = new THREE.BoxGeometry(bladeWidth, bladeLen, 0.08);
          const blade = new THREE.Mesh(bladeGeo, wType.includes("beam") || wType.includes("moonlight") ? beamEnergyMat : bladeMat);
          blade.position.set(0, bladeLen * 0.45, 0.4);
          blade.castShadow = true;
          group.add(blade);

          const guardGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.06, 12);
          const guard = new THREE.Mesh(guardGeo, goldMat);
          guard.rotation.x = Math.PI / 2;
          guard.position.set(0, 0, 0.4);
          group.add(guard);
        }

        const hiltGeo = new THREE.CylinderGeometry(0.08, 0.08, isGiant ? 0.9 : 0.6, 8);
        const hiltMat = new THREE.MeshStandardMaterial({ color: isSephiroth ? 0xf8fafc : 0x78350f });
        const hilt = new THREE.Mesh(hiltGeo, hiltMat);
        hilt.position.set(0, -0.25, 0.4);
        group.add(hilt);

        group.position.set(0, -0.8, 0.3);
        group.rotation.x = Math.PI * 0.4;
        return group;
      };

      const swordGroup = createSwordInstance(false);
      rightArm.add(swordGroup);
      this.weaponMesh = swordGroup;

      if (wType.includes("dual") || wType === "three_swords" || wType === "dual_odm_blades") {
        const leftSword = createSwordInstance(true);
        leftArm.add(leftSword);
        this.leftWeaponMesh = leftSword;
      }
    } else if (wType === "shield" || wType.includes("master_sword_shield")) {
      // 🛡️ 圓形振金盾牌 / 海利亞盾
      const shieldGroup = new THREE.Group();
      if (cid.includes("cap_america")) {
        // 美國隊長同心圓星盾 (Concentric Rings + Raised Star)
        const baseDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.1, 24), new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.9 }));
        baseDisc.rotation.z = Math.PI / 2;
        shieldGroup.add(baseDisc);

        const whiteRing = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.11, 24), new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.9 }));
        whiteRing.rotation.z = Math.PI / 2;
        shieldGroup.add(whiteRing);

        const innerRed = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.12, 24), new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.9 }));
        innerRed.rotation.z = Math.PI / 2;
        shieldGroup.add(innerRed);

        const centerBlue = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.13, 24), new THREE.MeshStandardMaterial({ color: 0x1d4ed8, metalness: 0.9 }));
        centerBlue.rotation.z = Math.PI / 2;
        shieldGroup.add(centerBlue);

        const star = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.3), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
        star.position.set(-0.08, 0, 0);
        shieldGroup.add(star);
      } else {
        const shieldGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.12, 24);
        const shieldMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.9, roughness: 0.1 });
        const shield = new THREE.Mesh(shieldGeo, shieldMat);
        shield.rotation.z = Math.PI / 2;
        shieldGroup.add(shield);
      }

      shieldGroup.position.set(-0.3, -0.4, 0);
      leftArm.add(shieldGroup);
      this.leftWeaponMesh = shieldGroup;
    } else if (wType.includes("claws") || wType === "adamantium_claws" || wType === "vibranium_claws") {
      // 🐾 雙手鋼爪 / 振金利爪
      const makeClaws = () => {
        const clawGroup = new THREE.Group();
        for (let i = -1; i <= 1; i++) {
          const clawGeo = new THREE.BoxGeometry(0.06, 1.1, 0.04);
          const claw = new THREE.Mesh(clawGeo, bladeMat);
          claw.position.set(i * 0.16, 0.45, 0.35);
          clawGroup.add(claw);
        }
        clawGroup.position.set(0, -0.8, 0);
        return clawGroup;
      };
      rightArm.add(makeClaws());
      leftArm.add(makeClaws());
    } else if (wType.includes("hammer") || wType.includes("axe") || wType.includes("giant_mace")) {
      // 🔨 雷神之鎚 / 戰斧 / 巨型錘矛
      const maceGroup = new THREE.Group();
      if (cid.includes("barbatos")) {
        // 巴巴托斯超大型鐵槌 (Giant Flanged Iron Mace)
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.8, 8), darkSteelMat);
        maceGroup.add(handle);
        for (let i = 0; i < 4; i++) {
          const flange = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.8, 0.6), darkSteelMat);
          flange.rotation.y = (Math.PI / 2) * i;
          flange.position.set(0, 1.2, 0);
          maceGroup.add(flange);
        }
        const pileBunker = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.8, 8), darkSteelMat);
        pileBunker.position.set(0, 2.4, 0);
        maceGroup.add(pileBunker);
      } else {
        const handleGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.8, 8);
        const handle = new THREE.Mesh(handleGeo, darkSteelMat);
        maceGroup.add(handle);

        const headGeo = new THREE.BoxGeometry(0.9, 1.2, 0.9);
        const maceHead = new THREE.Mesh(headGeo, goldMat);
        maceHead.position.set(0, 1.2, 0);
        maceGroup.add(maceHead);
      }

      maceGroup.position.set(0, -0.7, 0.4);
      maceGroup.rotation.x = Math.PI * 0.35;
      rightArm.add(maceGroup);
      this.weaponMesh = maceGroup;
    } else if (wType === "infinity_gauntlet") {
      // 👑 滅霸無限手套 (金裝手套 + 6 顆發光無限寶石)
      const gauntletGroup = new THREE.Group();
      const gauntletGeo = new THREE.BoxGeometry(0.68, 1.2, 0.68);
      const gauntlet = new THREE.Mesh(gauntletGeo, goldMat);
      gauntletGroup.add(gauntlet);

      // 6 顆無限寶石 (Power, Space, Reality, Soul, Time, Mind)
      const gemColors = [0x9333ea, 0x0284c7, 0xef4444, 0xf97316, 0x22c55e, 0xfacc15];
      const gemPositions = [
        [-0.2, 0.4, 0.36],
        [-0.07, 0.45, 0.36],
        [0.07, 0.45, 0.36],
        [0.2, 0.4, 0.36],
        [0.25, 0.1, 0.36],
        [0, 0.15, 0.36] // Mind Stone in center
      ];

      gemColors.forEach((col, idx) => {
        const gem = new THREE.Mesh(new THREE.SphereGeometry(idx === 5 ? 0.12 : 0.08, 8, 8), new THREE.MeshBasicMaterial({ color: col }));
        const [gx, gy, gz] = gemPositions[idx];
        gem.position.set(gx, gy, gz);
        gauntletGroup.add(gem);
      });

      gauntletGroup.position.set(0, -0.4, 0);
      leftArm.add(gauntletGroup);
      this.leftWeaponMesh = gauntletGroup;
    } else if (wType === "ten_rings") {
      // 🟡 尚氣十環 (懸浮金環)
      for (let i = 0; i < 5; i++) {
        const ringGeo = new THREE.TorusGeometry(0.35, 0.05, 8, 16);
        const ringL = new THREE.Mesh(ringGeo, goldMat);
        ringL.position.set(0, -0.2 - i * 0.25, 0);
        ringL.rotation.x = Math.PI / 2;
        leftArm.add(ringL);

        const ringR = new THREE.Mesh(ringGeo, goldMat);
        ringR.position.set(0, -0.2 - i * 0.25, 0);
        ringR.rotation.x = Math.PI / 2;
        rightArm.add(ringR);
      }
    }
  }

  // ─── 背部光翼、感應砲、浮游盾、斗篷與懸浮配件 ───
  buildBackAndFloatingProps(torso, char, mainColor) {
    const cid = char.id;
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 });
    const energyMat = new THREE.MeshBasicMaterial({ color: mainColor, side: THREE.DoubleSide });

    if (cid.includes("strike_freedom")) {
      // 8 枚超級龍騎兵金色光翼
      for (let i = -2; i <= 2; i++) {
        if (i === 0) continue;
        const wingGeo = new THREE.BoxGeometry(0.2, 2.8, 0.4);
        const wing = new THREE.Mesh(wingGeo, energyMat);
        wing.position.set(i * 0.7, 1.0 + Math.abs(i) * 0.3, -0.7);
        wing.rotation.z = i * 0.35;
        torso.add(wing);
      }
    } else if (cid.includes("nu_gundam")) {
      // 左背 6 枚翼狀感應砲 Fin Funnel
      for (let i = 0; i < 6; i++) {
        const funnelGeo = new THREE.BoxGeometry(0.15, 2.2 - i * 0.15, 0.3);
        const funnel = new THREE.Mesh(funnelGeo, goldMat);
        funnel.position.set(-1.0 - i * 0.18, 1.4 + i * 0.2, -0.6);
        torso.add(funnel);
      }
    } else if (cid.includes("wing_zero")) {
      // 4 片天使純白羽翼
      const wingMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
      for (let s of [-1, 1]) {
        const wingGeo = new THREE.BoxGeometry(0.15, 3.2, 1.2);
        const wing = new THREE.Mesh(wingGeo, wingMat);
        wing.position.set(s * 1.2, 1.2, -0.8);
        wing.rotation.y = s * 0.4;
        wing.rotation.z = s * 0.3;
        torso.add(wing);
      }
    } else if (cid.includes("sephiroth")) {
      // 片翼天使單側黑翼
      const wingMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
      const wingGeo = new THREE.BoxGeometry(0.15, 3.5, 1.4);
      const wing = new THREE.Mesh(wingGeo, wingMat);
      wing.position.set(1.2, 1.4, -0.7);
      wing.rotation.y = 0.4;
      wing.rotation.z = -0.4;
      torso.add(wing);
    } else if (cid.includes("saitama") || cid.includes("thor") || cid.includes("doctor_strange") || cid.includes("magneto")) {
      // 英雄紅色/白色披風
      const capeColor = cid.includes("saitama") ? 0xffffff : (cid.includes("magneto") ? 0x9333ea : 0xdc2626);
      const capeGeo = new THREE.BoxGeometry(1.6, 2.6, 0.04);
      const capeMat = new THREE.MeshStandardMaterial({ color: capeColor, side: THREE.DoubleSide });
      const cape = new THREE.Mesh(capeGeo, capeMat);
      cape.position.set(0, 0, -0.55);
      torso.add(cape);
    }
  }

  updateAnimation(dt, state, isMoving, isFlying, chargeProgress = 0, isGuarding = false) {
    this.animTime += dt;
    const t = this.animTime;

    const torso = this.limbs.torso;
    const leftArm = this.limbs.leftArm;
    const rightArm = this.limbs.rightArm;
    const leftLeg = this.limbs.leftLeg;
    const rightLeg = this.limbs.rightLeg;
    const head = this.limbs.head;

    if (!torso) return;

    if (this.shieldMesh) {
      this.shieldMesh.material.opacity = isGuarding ? 0.65 : 0;
    }

    if (this.flightThrusterMesh) {
      this.flightThrusterMesh.material.opacity = isFlying ? 0.75 : 0;
      if (isFlying) this.flightThrusterMesh.rotation.z += dt * 8;
    }

    if (state === "ko") {
      this.group.rotation.x = -Math.PI / 2;
      this.group.position.y = 0.5;
      return;
    } else {
      this.group.rotation.x = 0;
    }

    if (state === "hit") {
      torso.position.y = 2.4;
      torso.rotation.x = -0.3;
      leftArm.rotation.set(0.6, 0, -0.5);
      rightArm.rotation.set(0.6, 0, 0.5);
    } else if (state === "heavy_charge") {
      torso.rotation.x = 0.2;
      rightArm.rotation.set(-Math.PI * 0.7, 0, 0.4);
      leftArm.rotation.set(0.4, 0, -0.4);
    } else if (state === "heavy_release" || state === "attack_1" || state.startsWith("skill")) {
      // ⚔️ 攻擊招式揮舞手臂與武器
      const swing = Math.sin(t * 22) * 1.2;
      rightArm.rotation.set(-Math.PI * 0.5 + swing, 0, 0);
      leftArm.rotation.set(0.3, 0, -0.2);
    } else if (isGuarding) {
      leftArm.rotation.set(-Math.PI * 0.55, 0, -0.3);
      rightArm.rotation.set(-Math.PI * 0.55, 0, 0.3);
    } else if (isMoving) {
      const stride = Math.sin(t * 14) * 0.7;
      leftLeg.rotation.set(stride, 0, 0);
      rightLeg.rotation.set(-stride, 0, 0);
      leftArm.rotation.set(-stride * 0.8, 0, 0);
      rightArm.rotation.set(stride * 0.8, 0, 0);
      torso.position.y = 2.4 + Math.abs(Math.sin(t * 14)) * 0.15;
    } else {
      const breath = Math.sin(t * 3) * 0.05;
      torso.position.y = 2.4 + breath;
      leftArm.rotation.set(breath * 0.5, 0, 0.05);
      rightArm.rotation.set(-breath * 0.5, 0, -0.05);
      leftLeg.rotation.set(0, 0, 0);
      rightLeg.rotation.set(0, 0, 0);
      head.rotation.set(-breath * 0.3, 0, 0);
    }
  }

  destroy() {
    this.scene.remove(this.group);
  }
}

if (typeof window !== "undefined") {
  window.Character3DModel = Character3DModel;
}
