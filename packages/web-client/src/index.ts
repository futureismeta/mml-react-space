import {Networked3dWebExperienceClient} from "@mml-io/3d-web-experience-client";
import {rabbyKit} from "./ethereum";
import {BaseMessage} from "../../shared/MessageTypes";

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
  // hdrJpgUrl: "/web-client/assets/hdr/puresky_2k.jpg",
  hdrJpgUrl: "/web-client/assets/hdr/industrial_sunset_puresky_4k.jpg",
  mmlDocuments: [{ url: `${protocol}//${host}/mml-document` }],
});
app.update();

const wsUrl = `${protocol}//${host}/messages`;
console.log(wsUrl)
console.log(wsUrl)
console.log(wsUrl)
console.log(wsUrl)


const wsClient = new WebSocket(wsUrl);

wsClient.onopen = () => {
  console.log("WebSocket connection opened");
};

wsClient.onmessage = (event: BaseMessage) => {

    console.log("Received message:", event.data);
    const message = JSON.parse(event.data);
    if (message.type === "connect") {
        rabbyKit.open();
    }
};