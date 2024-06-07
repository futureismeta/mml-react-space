import * as React from "react";
import { useCallback, useEffect } from "react";

import { WebSocketClient } from "../websocket";

export const Avatar = () => {
  const ws = WebSocketClient.getInstance();

  const fetch = useCallback(async () => {
    ws.sendMessage(
      JSON.stringify({
        type: "avatar",
      }),
    );
  }, [ws]);

  return (
    <m-group>
      <m-model
        src="/assets/models/avatar-walk.glb"
        anim="/assets/models/avatar-walk.glb"
        x={20}
        z={-20}
        onClick={fetch}
      ></m-model>
    </m-group>
  );
};
