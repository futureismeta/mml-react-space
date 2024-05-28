import {Networked3dWebExperienceClient} from "@mml-io/3d-web-experience-client";
import {WebSocketClient} from "./websocket";
import {createModal} from "@rabby-wallet/rabbykit";
import {rabbyKit} from "./ethereum";

const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const host = window.location.host;
const userNetworkAddress = `${protocol}//${host}/network`;
const chatNetworkAddress = `${protocol}//${host}/chat-network`;

const holder = Networked3dWebExperienceClient.createFullscreenHolder();
const app = new Networked3dWebExperienceClient(holder, {
  sessionToken: (window as any).SESSION_TOKEN,
  userNetworkAddress,
  chatNetworkAddress,
  animationConfig: {
    airAnimationFileUrl: "/web-client/assets/models/anim_air.glb",
    idleAnimationFileUrl: "/web-client/assets/models/anim_idle.glb",
    jogAnimationFileUrl: "/web-client/assets/models/anim_jog.glb",
    sprintAnimationFileUrl: "/web-client/assets/models/anim_run.glb",
  },
  hdrJpgUrl: "/web-client/assets/hdr/puresky_2k.jpg",
  mmlDocuments: [{ url: `${protocol}//${host}/mml-document` }],
});
app.update();

//open RabbyKit modal
rabbyKit.open();

const wsClient = new WebSocketClient(`${protocol}//${host}/messages`);
wsClient.connect(
(data) => {



  },
  (error) => {
    console.error("WebSocket error:", error);
  },
  () => {
    console.log("WebSocket connection established");
  },
  () => {
    console.log("WebSocket connection closed");
  }
);