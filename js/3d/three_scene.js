/**
 * 跨次元大亂鬥 (Dimension Clash Online) - 3D 引擎
 * 3D 場景、競技場擂台、動態光影與環境渲染 (Three.js 3D Scene & Arena Manager)
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
    this.skyboxMesh = null;
  }

  init() {
    if (typeof THREE === "undefined") {
      console.error("Three.js is required for 3D version.");
      return;
    }

    // 1. Create Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x07090e);
    this.scene.fog = new THREE.FogExp2(0x07090e, 0.012);

    // 2. Create Camera
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 1000);
    this.camera.position.set(0, 15, 25);

    // 3. Create WebGL Renderer with Anti-aliasing & Shadows
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear old canvases and append
    this.container.innerHTML = "";
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.id = "battleCanvas3D";

    // 4. Setup Lighting
    this.setupLighting();

    // 5. Build 3D Arena & Environment
    this.buildArena();

    // 6. Resize listener
    window.addEventListener("resize", () => this.onWindowResize());
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    this.lights.ambient = ambientLight;

    // Main Directional Sun Light with Shadows
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(25, 45, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 150;
    sunLight.shadow.camera.left = -50;
    sunLight.shadow.camera.right = 50;
    sunLight.shadow.camera.top = 50;
    sunLight.shadow.camera.bottom = -50;
    this.scene.add(sunLight);
    this.lights.sun = sunLight;

    // Cyberpunk Colored Rim Spotlights
    const cyanLight = new THREE.PointLight(0x38bdf8, 2.5, 60);
    cyanLight.position.set(-30, 10, -20);
    this.scene.add(cyanLight);

    const magentaLight = new THREE.PointLight(0xec4899, 2.5, 60);
    magentaLight.position.set(30, 10, 20);
    this.scene.add(magentaLight);

    const goldLight = new THREE.PointLight(0xfacc15, 1.8, 50);
    goldLight.position.set(0, 20, 0);
    this.scene.add(goldLight);
  }

  buildArena() {
    // Circular Cyberpunk Fighting Arena Floor
    const arenaGeo = new THREE.CylinderGeometry(this.arenaRadius, this.arenaRadius + 2, 2, 64);
    const arenaMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.3,
      metalness: 0.7
    });
    this.arenaMesh = new THREE.Mesh(arenaGeo, arenaMat);
    this.arenaMesh.position.y = -1;
    this.arenaMesh.receiveShadow = true;
    this.scene.add(this.arenaMesh);

    // Glowing Arena Border Ring
    const ringGeo = new THREE.RingGeometry(this.arenaRadius - 0.5, this.arenaRadius + 0.5, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.05;
    this.scene.add(ringMesh);

    // Center Hexagon Fighting Ring Decal
    const innerRingGeo = new THREE.RingGeometry(14, 15, 6);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      side: THREE.DoubleSide
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.rotation.x = -Math.PI / 2;
    innerRingMesh.position.y = 0.06;
    this.scene.add(innerRingMesh);

    // Grid on Ground
    const gridHelper = new THREE.GridHelper(this.arenaRadius * 2, 40, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = 0.02;
    this.scene.add(gridHelper);

    // Surrounding Sci-Fi Energy Pillars
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const px = Math.cos(angle) * (this.arenaRadius + 4);
      const pz = Math.sin(angle) * (this.arenaRadius + 4);

      const pillarGeo = new THREE.CylinderGeometry(1.2, 1.8, 16, 16);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: 0x1f2937,
        metalness: 0.8,
        roughness: 0.2
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(px, 7, pz);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      this.scene.add(pillar);

      // Glowing Beacon Top
      const beaconGeo = new THREE.SphereGeometry(0.8, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0xec4899
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(px, 15.5, pz);
      this.scene.add(beacon);
    }
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  render() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

if (typeof window !== "undefined") {
  window.Arena3DScene = Arena3DScene;
}
