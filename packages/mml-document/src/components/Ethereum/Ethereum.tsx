import * as React from "react";

import { WebSocketClient } from "../../websocket";

export const Ethereum = () => {
  return (
    <m-group>
      <m-model
        z={5}
        x={20}
        y={3}
        sx={0.005}
        sz={0.005}
        sy={0.005}
        src="/assets/ethereum_3d_logo.glb"
        id="ethereum-model"
        onClick={() => {
          WebSocketClient.getInstance().sendMessage(
              JSON.stringify({
                  type: "connect"
              }))
        }}
      >
        <m-attr-anim
          attr="ry"
          start="0"
          end="360"
          start-time="0"
          duration="20000"
        ></m-attr-anim>
      </m-model>
    </m-group>
  );
};
