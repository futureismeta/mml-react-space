import {Networked3dWebExperienceClient} from "@mml-io/3d-web-experience-client";
import {router} from "./router";

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
        // jogAnimationFileUrl: "/web-client/assets/models/rpm/avatar-walk.glb",
        jogAnimationFileUrl: "/web-client/assets/models/anim_jog.glb",
        sprintAnimationFileUrl: "/web-client/assets/models/anim_run.glb",
    },
    hdrJpgUrl: "/web-client/assets/hdr/puresky_2k.jpg",
    // hdrJpgUrl: "/web-client/assets/hdr/industrial_sunset_puresky_4k.jpg",
    mmlDocuments: [{url: `${protocol}//${host}/mml-document`}],
});

const wsUrl = `${protocol}//${host}/messages`;

const wsClient = new WebSocket(wsUrl);

wsClient.onopen = () => {
    console.log("WebSocket connection opened");
};

wsClient.onmessage = async (event: MessageEvent) => {
    await router.handleMessage(event);
};

app.update();
