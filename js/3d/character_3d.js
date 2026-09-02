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
  }

  // ─── 髮型、面具、頭盔與頭部飾品 ───
  buildHeadFeatures(head, char, goldMat, darkMat) {
    const cid = char.id;
    const series = char.series;
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x09090b });
    const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const redGlowMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const goldGlowMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

    // 通用眼睛 (Eyes / Visors)
    if (series !== "gundam" && !cid.includes("spiderman") && !cid.includes("ironman") && !cid.includes("master_chief") && !cid.includes("doom_slayer")) {
      const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.08), cid.includes("ultra_instinct") ? cyanGlowMat : (cid.includes("sasuke") || cid.includes("sukuna") ? redGlowMat : blackMat));
      eyeL.position.set(-0.25, 0.1, 0.52);
      head.add(eyeL);

      const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.08), cid.includes("ultra_instinct") ? cyanGlowMat : (cid.includes("sasuke") || cid.includes("sukuna") ? redGlowMat : blackMat));
      eyeR.position.set(0.25, 0.1, 0.52);
      head.add(eyeR);
    }

    if (series === "gundam") {
      // 鋼彈經典 V-Fin 雙天線與發光雙眼
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

      const eyeGeo = new THREE.BoxGeometry(0.6, 0.15, 0.2);
      const eyeMat = new THREE.MeshBasicMaterial({ color: cid.includes("banshee") || cid.includes("sazabi") ? 0xef4444 : 0x22c55e });
      const eyes = new THREE.Mesh(eyeGeo, eyeMat);
      eyes.position.set(0, 0, 0.52);
      head.add(eyes);
    } else if (series === "dragonball") {
      let hairColor = 0x0f172a;
      if (cid.includes("ssj3") || cid === "goku_ssj1" || cid.includes("gotenks")) hairColor = 0xfacc15;
      else if (cid.includes("blue")) hairColor = 0x0284c7;
      else if (cid.includes("rose")) hairColor = 0xec4899;
      else if (cid.includes("beast") || cid.includes("ultra_instinct")) hairColor = 0xe2e8f0;
      else if (cid.includes("ultra_ego")) hairColor = 0x9333ea;
      else if (cid.includes("ssj4")) hairColor = 0x1e1b4b;

      const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.3 });
      const hairGeo = new THREE.ConeGeometry(cid.includes("ssj3") || cid.includes("beast") ? 1.1 : 0.85, cid.includes("ssj3") || cid.includes("beast") ? 2.2 : 1.4, 5);
      const hair = new THREE.Mesh(hairGeo, hairMat);
      hair.position.set(0, 0.95, -0.1);
      head.add(hair);

      if (cid === "whis_angel") {
        const haloGeo = new THREE.TorusGeometry(0.7, 0.08, 16, 32);
        const haloMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.rotation.x = Math.PI / 2;
        halo.position.set(0, 1.4, 0);
        head.add(halo);
      }
    } else if (series === "marvel") {
      if (cid.includes("spiderman")) {
        const eyeLensGeo = new THREE.BoxGeometry(0.35, 0.25, 0.05);
        const eyeLensL = new THREE.Mesh(eyeLensGeo, whiteMat);
        eyeLensL.position.set(-0.25, 0.1, 0.52);
        eyeLensL.rotation.z = -0.2;
        head.add(eyeLensL);
        const eyeLensR = new THREE.Mesh(eyeLensGeo, whiteMat);
        eyeLensR.position.set(0.25, 0.1, 0.52);
        eyeLensR.rotation.z = 0.2;
        head.add(eyeLensR);
      } else if (cid.includes("ironman")) {
        const maskGeo = new THREE.BoxGeometry(0.85, 0.9, 0.2);
        const maskMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 });
        const mask = new THREE.Mesh(maskGeo, maskMat);
        mask.position.set(0, 0, 0.45);
        head.add(mask);
        const arcEyes = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.1, 0.05), cyanGlowMat);
        arcEyes.position.set(0, 0.12, 0.56);
        head.add(arcEyes);
      } else if (cid.includes("wolverine")) {
        const finGeo = new THREE.ConeGeometry(0.3, 1.2, 3);
        const finMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
        const finL = new THREE.Mesh(finGeo, finMat);
        finL.position.set(-0.6, 0.5, 0);
        finL.rotation.z = 0.4;
        head.add(finL);
        const finR = new THREE.Mesh(finGeo, finMat);
        finR.position.set(0.6, 0.5, 0);
        finR.rotation.z = -0.4;
        head.add(finR);
      } else if (cid.includes("loki")) {
        const hornGeo = new THREE.TorusGeometry(0.6, 0.08, 8, 16, Math.PI * 0.7);
        const hornL = new THREE.Mesh(hornGeo, goldMat);
        hornL.position.set(-0.5, 0.6, 0.2);
        hornL.rotation.y = -0.5;
        head.add(hornL);
      } else if (cid.includes("ghost_rider")) {
        const flameGeo = new THREE.SphereGeometry(0.9, 8, 8);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0xea580c, wireframe: true });
        const flame = new THREE.Mesh(flameGeo, flameMat);
        flame.position.set(0, 0.5, 0);
        head.add(flame);
      }
    } else {
      // Anime & Gaming Heroes
      if (cid.includes("naruto")) {
        const bandGeo = new THREE.BoxGeometry(1.02, 0.25, 1.02);
        const bandMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
        const band = new THREE.Mesh(bandGeo, bandMat);
        band.position.set(0, 0.3, 0);
        head.add(band);
        const yellowHair = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.4, 6), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
        yellowHair.position.set(0, 0.9, -0.1);
        head.add(yellowHair);
      } else if (cid.includes("luffy")) {
        const hatGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 16);
        const hatMat = new THREE.MeshStandardMaterial({ color: 0xfacc15 });
        const hat = new THREE.Mesh(hatGeo, hatMat);
        hat.position.set(0, 0.6, 0);
        head.add(hat);
      } else if (cid.includes("zoro")) {
        const greenHair = new THREE.Mesh(new THREE.SphereGeometry(0.65, 8, 8), new THREE.MeshStandardMaterial({ color: 0x16a34a }));
        greenHair.position.set(0, 0.65, 0);
        head.add(greenHair);
      } else if (cid.includes("gojo") || cid.includes("nier_2b")) {
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
      } else if (cid.includes("link_hero")) {
        const hat = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.8, 4), new THREE.MeshStandardMaterial({ color: 0x15803d }));
        hat.position.set(0, 0.9, -0.4);
        hat.rotation.x = -0.6;
        head.add(hat);
      } else if (cid.includes("cloud_strife")) {
        const spikeHair = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.7, 5), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
        spikeHair.position.set(0, 0.95, -0.1);
        spikeHair.rotation.z = -0.2;
        head.add(spikeHair);
      } else if (cid.includes("sephiroth") || cid.includes("dante") || cid.includes("vergil")) {
        const hairGeo = new THREE.ConeGeometry(0.9, 1.8, 6);
        const hairMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
        const hair = new THREE.Mesh(hairGeo, hairMat);
        hair.position.set(0, 0.8, -0.2);
        head.add(hair);
      }
    }
  }

  // ─── 胸前標誌、反應爐、腰帶與鎧甲特徵 (Canon Movie/Anime/Game Costumes) ───
  buildTorsoEmblem(torso, char, goldMat, darkMat) {
    const cid = char.id;
    const series = char.series;
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
        // 悟空深藍色內襯 V 領 + 藍色腰帶
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
    const wType = char.weaponType || "none";
    const mainColor = new THREE.Color(char.themeColor || 0x38bdf8);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.95, roughness: 0.1 });
    const darkSteelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 });
    const beamEnergyMat = new THREE.MeshBasicMaterial({ color: mainColor });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.1 });

    if (wType.includes("sword") || wType.includes("blade") || wType.includes("katana") || wType === "tensa_zangetsu" || wType === "nichirin_sword") {
      // 🗡️ 單手長劍 / 武士刀 / 斬月 / 破壞劍
      const isGiant = wType.includes("buster") || wType.includes("anti_ship") || wType.includes("moonlight") || wType.includes("crucible");
      const isSephiroth = cid.includes("sephiroth");
      const bladeLen = isSephiroth ? 4.2 : (isGiant ? 3.5 : 2.4);
      const bladeWidth = isGiant ? 0.65 : (isSephiroth ? 0.12 : 0.16);

      const createSwordInstance = () => {
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

          // 黃銅護手十字樑
          const crossguard = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.15, 0.2), goldMat);
          crossguard.position.set(0, 0.1, 0.4);
          group.add(crossguard);
        } else {
          const bladeGeo = new THREE.BoxGeometry(bladeWidth, bladeLen, 0.08);
          const blade = new THREE.Mesh(bladeGeo, wType.includes("beam") || wType.includes("crucible") || wType.includes("moonlight") ? beamEnergyMat : bladeMat);
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
        const hiltMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
        const hilt = new THREE.Mesh(hiltGeo, hiltMat);
        hilt.position.set(0, -0.25, 0.4);
        group.add(hilt);

        group.position.set(0, -0.8, 0.3);
        group.rotation.x = Math.PI * 0.4;
        return group;
      };

      const swordGroup = createSwordInstance();
      rightArm.add(swordGroup);
      this.weaponMesh = swordGroup;

      if (wType.includes("dual") || wType === "three_swords" || wType === "dual_odm_blades") {
        const leftSword = createSwordInstance();
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
      const handleGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.8, 8);
      const handle = new THREE.Mesh(handleGeo, darkSteelMat);
      maceGroup.add(handle);

      const headGeo = new THREE.BoxGeometry(0.9, 1.2, 0.9);
      const maceHead = new THREE.Mesh(headGeo, goldMat);
      maceHead.position.set(0, 1.2, 0);
      maceGroup.add(maceHead);

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
      const capeGeo = new THREE.PlaneGeometry(1.6, 2.6);
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
