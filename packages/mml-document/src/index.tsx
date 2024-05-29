import * as React from "react";
import {flushSync} from "react-dom";
import {createRoot} from "react-dom/client";
import {WebSocketClient} from "./websocket";

function App() {

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;

    const ws = new WebSocketClient(`ws://127.0.0.1:8080/messages`);

    return (
        <m-group ry={180} z={10}>
            <m-cube
                z={10}
                x={10}
                y={2}
                color="red"
                onClick={() => {
                    ws.sendMessage(
                        JSON.stringify({
                            type: "connect"
                        })
                    )
                }}
            ></m-cube>
        </m-group>
    );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById("root")!;
const root = createRoot(container);
flushSync(() => {
    root.render(
        <App/>
    );
});
