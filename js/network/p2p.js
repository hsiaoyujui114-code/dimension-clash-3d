/**
 * 跨次元大亂鬥 (Dimension Clash Online)
 * WebRTC P2P 房間碼即時聯機系統 (Peer-to-Peer 6-Digit Room Matchmaking)
 * 免費開源免伺服器，跨裝置 PC 與手機直接輸入 6 位數房間碼對戰
 */

class P2PNetwork {
  constructor() {
    this.peer = null;
    this.conn = null;
    this.roomCode = null;
    this.isHost = false;
    this.isConnected = false;
    this.onConnected = null;
    this.onMessageReceived = null;
  }

  init(onReady) {
    if (typeof Peer === "undefined") {
      console.warn("PeerJS is not loaded. Online P2P features will run in local simulation mode.");
      if (onReady) onReady(false);
      return;
    }

    try {
      this.peer = new Peer();
      this.peer.on("open", (id) => {
        console.log("P2P Peer opened with ID:", id);
        if (onReady) onReady(true, id);
      });

      this.peer.on("connection", (conn) => {
        this.conn = conn;
        this.isHost = true;
        this.setupConnection();
      });

      this.peer.on("error", (err) => {
        console.warn("P2P Peer error:", err);
      });
    } catch (e) {
      console.warn("Error initializing PeerJS:", e);
      if (onReady) onReady(false);
    }
  }

  createRoom(callback) {
    // Generate 6 digit room code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.roomCode = code;
    this.isHost = true;

    if (typeof Peer !== "undefined") {
      try {
        if (this.peer) this.peer.destroy();
        this.peer = new Peer("CLASH-" + code);
        this.peer.on("open", () => {
          if (callback) callback(code);
        });
        this.peer.on("connection", (conn) => {
          this.conn = conn;
          this.setupConnection();
        });
      } catch (e) {
        if (callback) callback(code);
      }
    } else {
      if (callback) callback(code);
    }
  }

  joinRoom(code, callback) {
    this.roomCode = code;
    this.isHost = false;

    if (typeof Peer !== "undefined" && this.peer) {
      try {
        this.conn = this.peer.connect("CLASH-" + code);
        this.setupConnection();
        if (callback) callback(true);
      } catch (e) {
        if (callback) callback(false);
      }
    } else {
      if (callback) callback(true);
    }
  }

  setupConnection() {
    if (!this.conn) return;

    this.conn.on("open", () => {
      this.isConnected = true;
      if (this.onConnected) this.onConnected();
    });

    this.conn.on("data", (data) => {
      if (this.onMessageReceived) {
        this.onMessageReceived(data);
      }
    });

    this.conn.on("close", () => {
      this.isConnected = false;
    });
  }

  send(data) {
    if (this.conn && this.isConnected) {
      this.conn.send(data);
    }
  }
}

if (typeof window !== "undefined") {
  window.p2pNetwork = new P2PNetwork();
}
