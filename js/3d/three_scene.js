/**
 * 跨次元大亂鬥 (Dimension Clash Online) - 3D 引擎
 * 3D 場景、星空宇宙、競技場擂台、動態光影與環境渲染 (Three.js 3D Scene & Arena Manager)
 */

class Arena3DScene {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.arenaRadius = 45;
    this.lights = {};
    this.arenaMesh = null;
    this.starfield = null;
  }

  init() {
    if (typeof THREE === "undefined") {
      console.error("Three.js is required for 3D version.");
      return;
    }

    // 1. Create Scene with Deep Cosmic Nebula Space
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b132b);
    this.scene.fog = new THREE.FogExp2(0x0b132b, 0.003); // 輕柔深空霧化，確保整個擂台與角色清晰無比

    // 2. Calculate Viewport Dimensions (Safe Fallback to avoid 0x0 aspect)
    const rect = this.container.getBoundingClientRect();
    const width = this.container.clientWidth || rect.width || window.innerWidth || 900;
    const height = this.container.clientHeight || rect.height || 580;
    const aspect = Math.max(0.1, width / height);

    // 3. Create Camera
    this.camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 1000);
    this.camera.position.set(0, 16, 28);

    // 4. Create WebGL Renderer with Anti-aliasing & High Performance
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance", alpha: false });
    this.renderer.setClearColor(0x0b132b, 1);
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear old canvases and append
    this.container.innerHTML = "";
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.id = "battleCanvas3D";
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    this.renderer.domElement.style.display = "block";

    // 5. Setup Rich Lighting
    this.setupLighting();

    // 6. Build 3D Arena & Space Environment
    this.buildEnvironment();
    this.buildArena();

    // 7. Resize listener
    window.addEventListener("resize", () => this.onWindowResize());
    setTimeout(() => this.onWindowResize(), 100);
  }

  setupLighting() {
    // 1. High Intensity Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    this.scene.add(ambientLight);
    this.lights.ambient = ambientLight;

    // 2. Main Directional Sun Light with Crisp Shadows
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(30, 55, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 180;
    sunLight.shadow.camera.left = -60;
    sunLight.shadow.camera.right = 60;
    sunLight.shadow.camera.top = 60;
    sunLight.shadow.camera.bottom = -60;
    this.scene.add(sunLight);
    this.lights.sun = sunLight;

    // 3. Hemisphere Sky / Ground Contrast Light
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x1e1b4b, 1.2);
    this.scene.add(hemiLight);
    this.lights.hemi = hemiLight;

    // 4. Cyberpunk Colored Arena Floodlights
    const cyanLight = new THREE.PointLight(0x38bdf8, 3.5, 90);
    cyanLight.position.set(-32, 14, -22);
    this.scene.add(cyanLight);

    const magentaLight = new THREE.PointLight(0xec4899, 3.5, 90);
    magentaLight.position.set(32, 14, 22);
    this.scene.add(magentaLight);

    const goldLight = new THREE.PointLight(0xfacc15, 2.5, 80);
    goldLight.position.set(0, 24, 0);
    this.scene.add(goldLight);
  }

  buildEnvironment() {
    // 🌌 3D 宇宙星空粒子穹頂 (Starfield Sky Dome)
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 450;
      starPositions[i + 1] = Math.random() * 220 + 2;
      starPositions[i + 2] = (Math.random() - 0.5) * 450;

      // 星光漸層色彩
      const isCyan = Math.random() > 0.4;
      starColors[i] = isCyan ? 0.3 : 1.0;
      starColors[i + 1] = isCyan ? 0.8 : 0.8;
      starColors[i + 2] = 1.0;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.9
    });

    this.starfield = new THREE.Points(starGeo, starMat);
    this.scene.add(this.starfield);
  }

  buildArena() {
    // 1. Circular Cyberpunk Fighting Arena Floor
    const arenaGeo = new THREE.CylinderGeometry(this.arenaRadius, this.arenaRadius + 2.5, 2.5, 64);
    const arenaMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.65,
      emissive: 0x0f172a
    });
    this.arenaMesh = new THREE.Mesh(arenaGeo, arenaMat);
    this.arenaMesh.position.y = -1.25;
    this.arenaMesh.receiveShadow = true;
    this.scene.add(this.arenaMesh);

    // 2. Glowing Outer Arena Border Ring
    const ringGeo = new THREE.RingGeometry(this.arenaRadius - 0.8, this.arenaRadius + 0.8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.05;
    this.scene.add(ringMesh);

    // 3. Outer Magenta Ring Accent
    const outerRingGeo = new THREE.RingGeometry(this.arenaRadius + 1.2, this.arenaRadius + 1.8, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      side: THREE.DoubleSide
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.x = -Math.PI / 2;
    outerRingMesh.position.y = 0.04;
    this.scene.add(outerRingMesh);

    // 4. Center Hexagon Fighting Ring Decal
    const innerRingGeo = new THREE.RingGeometry(14, 15.5, 6);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      side: THREE.DoubleSide
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.rotation.x = -Math.PI / 2;
    innerRingMesh.position.y = 0.06;
    this.scene.add(innerRingMesh);

    // 5. High-Tech Grid on Ground
    const gridHelper = new THREE.GridHelper(this.arenaRadius * 2, 36, 0x38bdf8, 0x3b82f6);
    gridHelper.position.y = 0.03;
    this.scene.add(gridHelper);

    // 6. Surrounding Sci-Fi Energy Pillars
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const px = Math.cos(angle) * (this.arenaRadius + 4);
      const pz = Math.sin(angle) * (this.arenaRadius + 4);

      const pillarGeo = new THREE.CylinderGeometry(1.4, 2.0, 18, 16);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.8,
        roughness: 0.25
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(px, 8, pz);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      this.scene.add(pillar);

      // Glowing Beacon Top
      const beaconGeo = new THREE.SphereGeometry(1.0, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0xec4899
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(px, 17.5, pz);
      this.scene.add(beacon);
    }
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const rect = this.container.getBoundingClientRect();
    const width = this.container.clientWidth || rect.width || window.innerWidth || 900;
    const height = this.container.clientHeight || rect.height || 580;

    if (width > 50 && height > 50) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  render() {
    if (this.renderer && this.scene && this.camera) {
      // 緩慢旋轉星空增加動態深度感
      if (this.starfield) {
        this.starfield.rotation.y += 0.0003;
      }
      this.renderer.render(this.scene, this.camera);
    }
  }
}

if (typeof window !== "undefined") {
  window.Arena3DScene = Arena3DScene;
}
