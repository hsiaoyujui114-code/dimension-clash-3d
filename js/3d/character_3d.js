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
    const darkColor = new THREE.Color(0x1e293b);
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

    const skinColor = isSkinSilver ? 0xe2e8f0 : (isSkinGreen ? 0x22c55e : (isSkinPurple ? 0xa855f7 : (isSkinAsh ? 0xd1d5db : 0xfed7aa)));
    const skinMat = new THREE.MeshStandardMaterial({
      color: skinColor,
      roughness: isSkinSilver ? 0.1 : 0.7,
      metalness: isSkinSilver ? 0.95 : 0.1
    });

    const darkMat = new THREE.MeshStandardMaterial({ color: darkColor, roughness: 0.5 });
    const goldMat = new THREE.MeshStandardMaterial({ color: goldColor, metalness: 0.9, roughness: 0.1 });
    const glowEnergyMat = new THREE.MeshBasicMaterial({ color: mainColor, transparent: true, opacity: 0.85 });

    // ── 2. Torso ──
    const isLarge = cid === "worldbreaker_hulk" || cid === "thanos_gauntlet" || cid === "jiren_full_power" || cid === "orange_piccolo" || cid === "sazabi_char" || cid === "cell_max" || cid === "eren_titan";
    const isSmall = cid === "goku_kid" || cid === "goten_kid" || cid === "trunks_kid";

    const torsoWidth = isLarge ? 2.4 : (isSmall ? 1.2 : 1.6);
    const torsoHeight = isLarge ? 2.8 : (isSmall ? 1.6 : 2.2);
    const torsoDepth = isLarge ? 1.6 : (isSmall ? 0.8 : 1.0);

    const torsoGeo = new THREE.BoxGeometry(torsoWidth, torsoHeight, torsoDepth);
    const torso = new THREE.Mesh(torsoGeo, bodyMat);
    torso.position.y = isSmall ? 1.8 : (isLarge ? 2.8 : 2.4);
    torso.castShadow = true;
    torso.receiveShadow = true;
    this.group.add(torso);
    this.limbs.torso = torso;

    // ── 3. Head ──
    const headSize = isSmall ? 0.9 : (isLarge ? 1.2 : 1.0);
    const headGeo = new THREE.BoxGeometry(headSize, headSize * 1.1, headSize);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, torsoHeight * 0.75, 0);
    head.castShadow = true;
    torso.add(head);
    this.limbs.head = head;

    // ── 4. Character-Specific Head Accessories & Hair ──
    this.buildHeadFeatures(head, char, goldMat, darkMat);

    // ── 5. Limbs (Arms & Legs) ──
    const armWidth = isLarge ? 0.7 : (isSmall ? 0.4 : 0.5);
    const armLen = isLarge ? 2.2 : (isSmall ? 1.3 : 1.8);
    const armGeo = new THREE.BoxGeometry(armWidth, armLen, armWidth);

    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-(torsoWidth * 0.5 + armWidth * 0.6), torsoHeight * 0.2, 0);
    leftArm.castShadow = true;
    torso.add(leftArm);
    this.limbs.leftArm = leftArm;

    const rightArm = new THREE.Mesh(armGeo, bodyMat);
    rightArm.position.set(torsoWidth * 0.5 + armWidth * 0.6, torsoHeight * 0.2, 0);
    rightArm.castShadow = true;
    torso.add(rightArm);
    this.limbs.rightArm = rightArm;

    const legWidth = isLarge ? 0.8 : (isSmall ? 0.45 : 0.6);
    const legLen = isLarge ? 2.4 : (isSmall ? 1.4 : 2.0);
    const legGeo = new THREE.BoxGeometry(legWidth, legLen, legWidth);

    const leftLeg = new THREE.Mesh(legGeo, darkMat);
    leftLeg.position.set(-torsoWidth * 0.25, -torsoHeight * 0.85, 0);
    leftLeg.castShadow = true;
    torso.add(leftLeg);
    this.limbs.leftLeg = leftLeg;

    const rightLeg = new THREE.Mesh(legGeo, darkMat);
    rightLeg.position.set(torsoWidth * 0.25, -torsoHeight * 0.85, 0);
    rightLeg.castShadow = true;
    torso.add(rightLeg);
    this.limbs.rightLeg = rightLeg;

    // ── 6. Weapons & Signature Props ──
    this.buildWeapons(rightArm, leftArm, torso, char);

    // ── 7. Back Wings, Funnels, Capes & Floating Props ──
    this.buildBackAndFloatingProps(torso, char, mainColor);

    // ── 8. Aura & Shield Spheres ──
    const auraRadius = isLarge ? 3.4 : 2.4;
    const auraGeo = new THREE.SphereGeometry(auraRadius, 16, 16);
    const auraMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      transparent: true,
      opacity: 0.22,
      wireframe: true
    });
    this.auraMesh = new THREE.Mesh(auraGeo, auraMat);
    this.auraMesh.position.set(0, torso.position.y, 0);
    this.group.add(this.auraMesh);

    const shieldGeo = new THREE.SphereGeometry(auraRadius + 0.5, 24, 24);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      metalness: 0.9,
      roughness: 0.1
    });
    this.shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    this.shieldMesh.position.set(0, torso.position.y, 0);
    this.group.add(this.shieldMesh);

    // ── 9. Flight Jet Propulsion Disc ──
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
      this.flightThrusterMesh.position.y = -0.1;
      this.group.add(this.flightThrusterMesh);
    }
  }

  // ─── 髮型、面具、頭盔與頭部飾品 ───
  buildHeadFeatures(head, char, goldMat, darkMat) {
    const cid = char.id;
    const series = char.series;

    if (series === "gundam") {
      // 鋼彈經典 V-Fin 雙天線與綠色眼睛
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
      if (cid.includes("ironman")) {
        const maskGeo = new THREE.BoxGeometry(0.85, 0.9, 0.2);
        const maskMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 });
        const mask = new THREE.Mesh(maskGeo, maskMat);
        mask.position.set(0, 0, 0.45);
        head.add(mask);
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
      } else if (cid.includes("luffy")) {
        const hatGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 16);
        const hatMat = new THREE.MeshStandardMaterial({ color: 0xfacc15 });
        const hat = new THREE.Mesh(hatGeo, hatMat);
        hat.position.set(0, 0.6, 0);
        head.add(hat);
      } else if (cid.includes("sephiroth") || cid.includes("dante") || cid.includes("vergil") || cid.includes("nier_2b")) {
        const hairGeo = new THREE.ConeGeometry(0.9, 1.8, 6);
        const hairMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
        const hair = new THREE.Mesh(hairGeo, hairMat);
        hair.position.set(0, 0.8, -0.2);
        head.add(hair);
      }
    }
  }

  // ─── 3D 專屬武器與手部道具建構 ───
  buildWeapons(rightArm, leftArm, torso, char) {
    const wType = char.weaponType || "none";
    const mainColor = new THREE.Color(char.themeColor || 0x38bdf8);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.9, roughness: 0.1 });
    const beamEnergyMat = new THREE.MeshBasicMaterial({ color: mainColor });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9 });

    if (wType.includes("sword") || wType.includes("blade") || wType.includes("katana") || wType === "tensa_zangetsu" || wType === "nichirin_sword") {
      // 🗡️ 單手長劍 / 武士刀 / 斬月
      const isGiant = wType.includes("buster") || wType.includes("anti_ship") || wType.includes("moonlight") || wType.includes("crucible");
      const bladeLen = isGiant ? 3.5 : 2.4;
      const bladeWidth = isGiant ? 0.6 : 0.15;

      const swordGroup = new THREE.Group();
      const bladeGeo = new THREE.BoxGeometry(bladeWidth, bladeLen, 0.08);
      const blade = new THREE.Mesh(bladeGeo, wType.includes("beam") || wType.includes("crucible") || wType.includes("moonlight") ? beamEnergyMat : bladeMat);
      blade.position.set(0, bladeLen * 0.45, 0.4);
      blade.castShadow = true;
      swordGroup.add(blade);

      const hiltGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8);
      const hilt = new THREE.Mesh(hiltGeo, goldMat);
      hilt.position.set(0, -0.2, 0.4);
      swordGroup.add(hilt);

      swordGroup.position.set(0, -0.8, 0.3);
      swordGroup.rotation.x = Math.PI * 0.4;
      rightArm.add(swordGroup);
      this.weaponMesh = swordGroup;

      if (wType.includes("dual") || wType === "three_swords" || wType === "dual_odm_blades") {
        const leftSword = swordGroup.clone();
        leftArm.add(leftSword);
        this.leftWeaponMesh = leftSword;
      }
    } else if (wType === "shield" || wType.includes("master_sword_shield")) {
      // 🛡️ 圓形振金盾牌 / 海利亞盾
      const shieldGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.12, 24);
      const shieldMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.9, roughness: 0.1 });
      const shield = new THREE.Mesh(shieldGeo, shieldMat);
      shield.rotation.z = Math.PI / 2;
      shield.position.set(-0.3, -0.4, 0);
      leftArm.add(shield);
      this.leftWeaponMesh = shield;
    } else if (wType.includes("claws") || wType === "adamantium_claws" || wType === "vibranium_claws") {
      // 🐾 雙手鋼爪 / 振金利爪
      const makeClaws = () => {
        const clawGroup = new THREE.Group();
        for (let i = -1; i <= 1; i++) {
          const clawGeo = new THREE.BoxGeometry(0.06, 0.9, 0.04);
          const claw = new THREE.Mesh(clawGeo, bladeMat);
          claw.position.set(i * 0.15, 0.4, 0.3);
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
      const handle = new THREE.Mesh(handleGeo, bladeMat);
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
      // 👑 滅霸無限手套
      const gauntletGeo = new THREE.BoxGeometry(0.65, 1.2, 0.65);
      const gauntlet = new THREE.Mesh(gauntletGeo, goldMat);
      gauntlet.position.set(0, -0.4, 0);
      leftArm.add(gauntlet);
      this.leftWeaponMesh = gauntlet;
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
