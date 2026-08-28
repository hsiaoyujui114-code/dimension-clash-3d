/**
 * 跨次元大亂鬥 (Dimension Clash Online) - 3D 角色模型與飛行骨骼動畫引擎
 * (Procedural 3D Character Mesh, Flight Hovering & Skeletal Animator)
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

    this.buildModel();
    this.scene.add(this.group);
  }

  buildModel() {
    const char = this.charData;
    const series = char.series;

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

    // 1. Torso
    const torsoGeo = new THREE.BoxGeometry(1.6, 2.2, 1.0);
    const torso = new THREE.Mesh(torsoGeo, bodyMat);
    torso.position.y = 2.4;
    torso.castShadow = true;
    torso.receiveShadow = true;
    this.group.add(torso);
    this.limbs.torso = torso;

    // 2. Head
    const headGeo = new THREE.BoxGeometry(1.0, 1.1, 1.0);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 1.7, 0);
    head.castShadow = true;
    torso.add(head);
    this.limbs.head = head;

    // Head custom features
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

      const eyeGeo = new THREE.BoxGeometry(0.6, 0.15, 0.2);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
      const eyes = new THREE.Mesh(eyeGeo, eyeMat);
      eyes.position.set(0, 0, 0.52);
      head.add(eyes);
    } else if (series === "dragonball") {
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
    }

    // 3. Limbs
    const armGeo = new THREE.BoxGeometry(0.5, 1.8, 0.5);
    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-1.1, 0.2, 0);
    leftArm.castShadow = true;
    torso.add(leftArm);
    this.limbs.leftArm = leftArm;

    const rightArm = new THREE.Mesh(armGeo, bodyMat);
    rightArm.position.set(1.1, 0.2, 0);
    rightArm.castShadow = true;
    torso.add(rightArm);
    this.limbs.rightArm = rightArm;

    const legGeo = new THREE.BoxGeometry(0.6, 2.0, 0.6);
    const leftLeg = new THREE.Mesh(legGeo, darkMat);
    leftLeg.position.set(-0.45, -2.0, 0);
    leftLeg.castShadow = true;
    torso.add(leftLeg);
    this.limbs.leftLeg = leftLeg;

    const rightLeg = new THREE.Mesh(legGeo, darkMat);
    rightLeg.position.set(0.45, -2.0, 0);
    rightLeg.castShadow = true;
    torso.add(rightLeg);
    this.limbs.rightLeg = rightLeg;

    // 4. Aura Sphere
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

    // 5. Guard Barrier Sphere
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

    // 6. 3D Flight Thruster Jet / Ki Ring beneath feet
    if (char.canFly) {
      const ringGeo = new THREE.RingGeometry(0.6, 1.8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: series === "gundam" ? 0x06b6d4 : (series === "dragonball" ? 0xfacc15 : 0xec4899),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0
      });
      this.flightThrusterMesh = new THREE.Mesh(ringGeo, ringMat);
      this.flightThrusterMesh.rotation.x = Math.PI / 2;
      this.flightThrusterMesh.position.set(0, 0.1, 0);
      this.group.add(this.flightThrusterMesh);
    }
  }

  updateAnimation(dt, state, isMoving, speed, isCharging, isFlying) {
    this.animTime += dt;
    const t = this.animTime;

    const { torso, leftArm, rightArm, leftLeg, rightLeg, head } = this.limbs;
    if (!torso) return;

    // Aura & Thruster pulse
    if (this.auraMesh) {
      const pulse = (isFlying ? 1.15 : 1) + Math.sin(t * 8) * 0.08;
      this.auraMesh.scale.set(pulse, pulse, pulse);
      this.auraMesh.rotation.y += dt * (isFlying ? 3.0 : 1.5);
    }

    if (this.flightThrusterMesh) {
      this.flightThrusterMesh.material.opacity = isFlying ? 0.75 : 0;
      this.flightThrusterMesh.rotation.z += dt * 6;
    }

    if (this.shieldMesh) {
      this.shieldMesh.material.opacity = state === "guard" ? 0.45 : 0;
      this.shieldMesh.rotation.y += dt * 3;
    }

    // ── 飛行狀態下的懸浮姿態 (Flight Hover Pose) ──
    if (isFlying) {
      const hoverSway = Math.sin(t * 4) * 0.15;
      torso.position.y = 2.4 + hoverSway;
      torso.rotation.x = isMoving ? Math.PI * 0.15 : 0; // Forward tilt during flight
      leftLeg.rotation.set(0.3, 0.15, -0.1);
      rightLeg.rotation.set(0.4, -0.15, 0.1);
      leftArm.rotation.set(-0.2, 0.3, -0.4);
      rightArm.rotation.set(-0.2, -0.3, 0.4);
      return;
    }

    // ── 一般地面與戰鬥姿態 ──
    torso.rotation.x = 0;

    if (state === "guard") {
      leftArm.rotation.set(-Math.PI * 0.35, 0.4, -0.4);
      rightArm.rotation.set(-Math.PI * 0.35, -0.4, 0.4);
      leftLeg.rotation.set(0, 0, 0);
      rightLeg.rotation.set(0, 0, 0);
      torso.position.y = 2.2;
    } else if (isCharging) {
      torso.position.y = 2.0 + Math.sin(t * 30) * 0.05;
      leftArm.rotation.set(-Math.PI * 0.25, 0.5, -0.6);
      rightArm.rotation.set(-Math.PI * 0.25, -0.5, 0.6);
      leftLeg.rotation.set(-0.3, 0.3, 0);
      rightLeg.rotation.set(-0.3, -0.3, 0);
    } else if (state.startsWith("attack") || state.startsWith("skill")) {
      const punchPhase = Math.sin(t * 25);
      rightArm.rotation.set(punchPhase * 1.8, 0, 0);
      leftArm.rotation.set(-punchPhase * 0.5, 0, 0);
      torso.position.y = 2.4;
    } else if (state === "jump" || state === "fall") {
      leftArm.rotation.set(-Math.PI * 0.6, 0, -0.3);
      rightArm.rotation.set(-Math.PI * 0.6, 0, 0.3);
      leftLeg.rotation.set(0.6, 0, 0);
      rightLeg.rotation.set(-0.4, 0, 0);
    } else if (isMoving) {
      const legStride = Math.sin(t * 14) * 0.7;
      leftLeg.rotation.set(legStride, 0, 0);
      rightLeg.rotation.set(-legStride, 0, 0);
      leftArm.rotation.set(-legStride * 0.8, 0, 0);
      rightArm.rotation.set(legStride * 0.8, 0, 0);
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
