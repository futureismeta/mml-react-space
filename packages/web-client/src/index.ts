import { Networked3dWebExperienceClient } from "@mml-io/3d-web-experience-client";

import { router } from "./router";

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
      doubleJumpAnimationFileUrl: "/web-client/assets/models/anim_double_jump.glb",
  },
  skyboxHdrJpgUrl: "/web-client/assets/hdr/autumn_field_puresky.jpg",
  // hdrJpgUrl: "/web-client/assets/hdr/industrial_sunset_puresky_4k.jpg",
  mmlDocuments: [{ url: `${protocol}//${host}/mml-document` }],
  enableTweakPane: true,
  uiNetworkAddress: `${protocol}//${host}/ui-networking`,
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
