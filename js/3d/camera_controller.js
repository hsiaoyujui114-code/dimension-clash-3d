/**
 * 跨次元大亂鬥 (Dimension Clash Online) - 3D 視角控制器
 * 支援三大核心視角：第三人稱 (3rd Person)、第一人稱 (1st Person)、上方俯瞰 (Top-Down)
 */

class CameraController3D {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    // View Modes: "third_person", "first_person", "top_down"
    this.mode = "third_person";
    this.target = null; // Player fighter 3D object
    this.opponent = null; // Opponent fighter 3D object

    // Mouse & Orbit Parameters
    this.yaw = 0; // Horizontal rotation (radians)
    this.pitch = 0.25; // Vertical tilt (radians)
    this.distance = 16; // Distance in 3rd person
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };

    this.smoothPosition = new THREE.Vector3(0, 15, 25);
    this.smoothLookAt = new THREE.Vector3(0, 2, 0);

    this.setupInputListeners();
  }

  setupInputListeners() {
    if (!this.domElement) return;

    // Mouse Drag to rotate camera in 3rd & 1st person
    this.domElement.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      const sensitivity = this.mode === "first_person" ? 0.003 : 0.005;
      this.yaw -= deltaX * sensitivity;
      this.pitch -= deltaY * sensitivity;

      // Pitch clamping
      if (this.mode === "first_person") {
        this.pitch = Math.max(-Math.PI * 0.35, Math.min(Math.PI * 0.35, this.pitch));
      } else {
        this.pitch = Math.max(0.05, Math.min(Math.PI * 0.45, this.pitch));
      }

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
    });

    // Touch Drag for Mobile
    this.domElement.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: false });

    window.addEventListener("touchmove", (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      const sensitivity = 0.005;
      this.yaw -= deltaX * sensitivity;
      this.pitch -= deltaY * sensitivity;
      this.pitch = Math.max(0.05, Math.min(Math.PI * 0.45, this.pitch));

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: false });

    window.addEventListener("touchend", () => {
      this.isDragging = false;
    });
  }

  cycleViewMode() {
    if (this.mode === "third_person") {
      this.setViewMode("first_person");
    } else if (this.mode === "first_person") {
      this.setViewMode("top_down");
    } else {
      this.setViewMode("third_person");
    }
    return this.mode;
  }

  setViewMode(mode) {
    this.mode = mode;
    if (mode === "top_down") {
      this.pitch = Math.PI * 0.48; // Near vertical
    } else if (mode === "first_person") {
      this.pitch = 0;
    } else {
      this.pitch = 0.25;
    }
  }

  getViewModeLabel() {
    switch (this.mode) {
      case "first_person": return "👁️ 第一人稱 (1st Person)";
      case "third_person": return "🎥 第三人稱 (3rd Person)";
      case "top_down": return "🗺️ 上方俯瞰 (Top-Down)";
      default: return "3D 視角";
    }
  }

  update(dt) {
    if (!this.camera || !this.target) return;

    const targetPos = this.target.position;
    let desiredCameraPos = new THREE.Vector3();
    let desiredLookAt = new THREE.Vector3();

    if (this.mode === "first_person") {
      // ── 第一人稱 (1st Person View) ──
      // Camera placed right at the character's eye level (Y + 2.4)
      const eyeHeight = 2.4;
      desiredCameraPos.set(targetPos.x, targetPos.y + eyeHeight, targetPos.z);

      // Look direction according to character facing or yaw/pitch
      const charAngle = this.target.rotation.y + this.yaw;
      const lookDir = new THREE.Vector3(
        -Math.sin(charAngle) * Math.cos(this.pitch),
        Math.sin(this.pitch),
        -Math.cos(charAngle) * Math.cos(this.pitch)
      );
      desiredLookAt.copy(desiredCameraPos).add(lookDir);

      this.camera.position.copy(desiredCameraPos);
      this.camera.lookAt(desiredLookAt);
      return;
    } 
    else if (this.mode === "top_down") {
      // ── 上方俯瞰視角 (Top-Down / Tactical Bird's-Eye View) ──
      // Placed high above arena (Y = 48, slight Z offset)
      const midPoint = new THREE.Vector3().copy(targetPos);
      if (this.opponent) {
        midPoint.add(this.opponent.position).multiplyScalar(0.5);
      }

      desiredCameraPos.set(midPoint.x, midPoint.y + 45, midPoint.z + 18);
      desiredLookAt.set(midPoint.x, midPoint.y, midPoint.z);

      // Smooth camera interpolation
      this.smoothPosition.lerp(desiredCameraPos, 0.1);
      this.smoothLookAt.lerp(desiredLookAt, 0.1);

      this.camera.position.copy(this.smoothPosition);
      this.camera.lookAt(this.smoothLookAt);
      return;
    } 
    else {
      // ── 第三人稱跟隨視角 (3rd Person Dynamic Follow) ──
      const charAngle = this.target.rotation.y + this.yaw;
      const horizontalDist = this.distance * Math.cos(this.pitch);
      const verticalDist = this.distance * Math.sin(this.pitch) + 3.0;

      desiredCameraPos.set(
        targetPos.x + Math.sin(charAngle) * horizontalDist,
        targetPos.y + verticalDist,
        targetPos.z + Math.cos(charAngle) * horizontalDist
      );

      desiredLookAt.set(targetPos.x, targetPos.y + 2.0, targetPos.z);

      // Auto-lock onto opponent if available
      if (this.opponent && !this.isDragging) {
        desiredLookAt.lerp(this.opponent.position, 0.35);
        desiredLookAt.y += 1.8;
      }

      this.smoothPosition.lerp(desiredCameraPos, 0.12);
      this.smoothLookAt.lerp(desiredLookAt, 0.15);

      this.camera.position.copy(this.smoothPosition);
      this.camera.lookAt(this.smoothLookAt);
    }
  }
}

if (typeof window !== "undefined") {
  window.CameraController3D = CameraController3D;
}
