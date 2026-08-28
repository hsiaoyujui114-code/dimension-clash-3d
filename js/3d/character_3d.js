/**
 * 跨次元大亂鬥 (Dimension Clash Online) - 3D 角色模型與骨骼動畫引擎
 * (Procedural 3D Character Mesh & Skeletal Animator for all 45 Cross-Universe Fighters)
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
    this.weaponMesh = null;

    this.buildModel();
    this.scene.add(this.group);
  }

  buildModel() {
    const char = this.charData;
    const series = char.series;

    // Base materials
    const mainColor = new THREE.Color(char.themeColor || 0x38bdf8);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: mainColor,
      roughness: series === "gundam" ? 0.25 : 0.6,
      metalness: series === "gundam" ? 0.8 : 0.2
    });

    const skinMat = new THREE.MeshStandardMaterial({
      color: char.id === "piccolo" ? 0x22c55e : (char.id === "kid_buu" ? 0xf472b6 : (char.id === "thanos_gauntlet" ? 0xa855f7 : 0xfed7aa)),
      roughness: 0.7
    });

    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.1 });

    // 1. Torso (胸膛軀幹)
    const torsoGeo = new THREE.BoxGeometry(1.6, 2.2, 1.0);
    const torso = new THREE.Mesh(torsoGeo, bodyMat);
    torso.position.y = 2.4;
    torso.castShadow = true;
    torso.receiveShadow = true;
    this.group.add(torso);
    this.limbs.torso = torso;

    // 2. Head & Distinctive Features (頭部與專屬特徵)
    const headGeo = new THREE.BoxGeometry(1.0, 1.1, 1.0);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 1.7, 0);
    head.castShadow = true;
    torso.add(head);
    this.limbs.head = head;

    // Gundam V-Fin / Hair / Helmet details
    if (series === "gundam") {
      const vFinGeo = new THREE.ConeGeometry(0.2, 1.2, 4);
      const vFinL = new THREE.Mesh(vFinGeo, goldMat);
      vFinL.position.set(-0.5, 0.7, 0.4);
      vFinL.rotation.z = Math.PI * 0.25;
      vFinL.rotation.x = Math.PI * 0.1;
      head.add(vFinL);

      const vFinR = new THREE.Mesh(vFinGeo, goldMat);
      vFinR.position.set(0.5, 0.7, 0.4);
      vFinR.rotation.z = -Math.PI * 0.25;
      vFinR.rotation.x = Math.PI * 0.1;
      head.add(vFinR);

      // Glowing Eyes / Camera Visor
      const eyeGeo = new THREE.BoxGeometry(0.6, 0.15, 0.2);
      const eyeMat = new THREE.MeshBasicMaterial({ color: char.id === "unicorn_crystal" ? 0x10b981 : 0x22c55e });
      const eyes = new THREE.Mesh(eyeGeo, eyeMat);
      eyes.position.set(0, 0, 0.52);
      head.add(eyes);
    } else if (series === "dragonball") {
      // Spiky Saiyan Hair
      const hairColor = char.id === "ssj3_goku" ? 0xfacc15 : (char.id === "goku_ultra_instinct" ? 0xe2e8f0 : (char.id.includes("blue") ? 0x06b6d4 : 0x0f172a));
      const hairMat = new THREE.MeshStandardMaterial({
        color: hairColor,
        roughness: 0.4,
        emissive: (char.id === "ssj3_goku" || char.id === "goku_ultra_instinct") ? hairColor : 0x000000,
        emissiveIntensity: 0.4
      });

      const hairGeo = new THREE.ConeGeometry(0.8, 1.4, 5);
      const hair = new THREE.Mesh(hairGeo, hairMat);
      hair.position.set(0, 0.9, -0.1);
      head.add(hair);
    } else {
      // Marvel specific helmet / mask
      if (char.id === "cap_america") {
        const shieldGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 24);
        const shieldMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.7, roughness: 0.2 });
        const shield = new THREE.Mesh(shieldGeo, shieldMat);
        shield.rotation.x = Math.PI / 2;
        shield.position.set(0.6, 0, 0);
        this.weaponMesh = shield;
      }
    }

    // 3. Limbs (四肢)
    // Left Arm
    const armGeo = new THREE.BoxGeometry(0.5, 1.8, 0.5);
    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-1.1, 0.2, 0);
    leftArm.castShadow = true;
    torso.add(leftArm);
    this.limbs.leftArm = leftArm;

    // Right Arm
    const rightArm = new THREE.Mesh(armGeo, bodyMat);
    rightArm.position.set(1.1, 0.2, 0);
    rightArm.castShadow = true;
    torso.add(rightArm);
    this.limbs.rightArm = rightArm;

    if (this.weaponMesh) {
      leftArm.add(this.weaponMesh);
    }

    // Left Leg
    const legGeo = new THREE.BoxGeometry(0.6, 2.0, 0.6);
    const leftLeg = new THREE.Mesh(legGeo, darkMat);
    leftLeg.position.set(-0.45, -2.0, 0);
    leftLeg.castShadow = true;
    torso.add(leftLeg);
    this.limbs.leftLeg = leftLeg;

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeo, darkMat);
    rightLeg.position.set(0.45, -2.0, 0);
    rightLeg.castShadow = true;
    torso.add(rightLeg);
    this.limbs.rightLeg = rightLeg;

    // 4. Glowing 3D Aura Sphere (氣焰光環)
    const auraGeo = new THREE.SphereGeometry(2.4, 16, 16);
    const auraMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      transparent: true,
      opacity: 0.25,
      wireframe: true
    });
    this.auraMesh = new THREE.Mesh(auraGeo, auraMat);
    this.auraMesh.position.set(0, 2.4, 0);
    this.group.add(this.auraMesh);

    // 5. 3D Guard Barrier Sphere (格擋護盾)
    const shieldGeo = new THREE.SphereGeometry(2.8, 24, 24);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0,
      metalness: 0.9,
      roughness: 0.1
    });
    this.shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    this.shieldMesh.position.set(0, 2.4, 0);
    this.group.add(this.shieldMesh);
  }

  updateAnimation(dt, state, isMoving, speed, isCharging) {
    this.animTime += dt;
    const t = this.animTime;

    const { torso, leftArm, rightArm, leftLeg, rightLeg, head } = this.limbs;
    if (!torso) return;

    // Aura pulse
    if (this.auraMesh) {
      const pulse = 1 + Math.sin(t * 8) * 0.08;
      this.auraMesh.scale.set(pulse, pulse, pulse);
      this.auraMesh.rotation.y += dt * 1.5;
    }

    // Guard shield visibility
    if (this.shieldMesh) {
      const isGuarding = state === "guard";
      this.shieldMesh.material.opacity = isGuarding ? 0.45 : 0;
      this.shieldMesh.rotation.y += dt * 3;
    }

    // ── 動作狀態骨骼姿態 (Procedural Poses) ──
    if (state === "guard") {
      // Crossed arms guard pose
      leftArm.rotation.set(-Math.PI * 0.35, 0.4, -0.4);
      rightArm.rotation.set(-Math.PI * 0.35, -0.4, 0.4);
      leftLeg.rotation.set(0, 0, 0);
      rightLeg.rotation.set(0, 0, 0);
      torso.position.y = 2.2;
    } else if (isCharging) {
      // Power charge pose: deep squat, vibrating arms
      torso.position.y = 2.0 + Math.sin(t * 30) * 0.05;
      leftArm.rotation.set(-Math.PI * 0.25, 0.5, -0.6);
      rightArm.rotation.set(-Math.PI * 0.25, -0.5, 0.6);
      leftLeg.rotation.set(-0.3, 0.3, 0);
      rightLeg.rotation.set(-0.3, -0.3, 0);
    } else if (state.startsWith("attack") || state.startsWith("skill")) {
      // Punch / Slash thrust
      const punchPhase = Math.sin(t * 25);
      rightArm.rotation.set(punchPhase * 1.8, 0, 0);
      leftArm.rotation.set(-punchPhase * 0.5, 0, 0);
      torso.position.y = 2.4;
    } else if (state === "jump" || state === "fall") {
      // Airborne leap pose
      leftArm.rotation.set(-Math.PI * 0.6, 0, -0.3);
      rightArm.rotation.set(-Math.PI * 0.6, 0, 0.3);
      leftLeg.rotation.set(0.6, 0, 0);
      rightLeg.rotation.set(-0.4, 0, 0);
    } else if (isMoving) {
      // Omnidirectional Run Stride
      const legStride = Math.sin(t * 14) * 0.7;
      leftLeg.rotation.set(legStride, 0, 0);
      rightLeg.rotation.set(-legStride, 0, 0);
      leftArm.rotation.set(-legStride * 0.8, 0, 0);
      rightArm.rotation.set(legStride * 0.8, 0, 0);
      torso.position.y = 2.4 + Math.abs(Math.sin(t * 14)) * 0.15;
    } else {
      // Idle Breathing
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
