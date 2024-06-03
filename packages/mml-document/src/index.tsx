import * as React from "react";
import {flushSync} from "react-dom";
import {createRoot} from "react-dom/client";
import {WebSocketClient} from "./websocket";
import {Ethereum} from "./components/Ethereum/Ethereum";
import {PepeRoom} from "./rooms/Pepe/PepeRoom";
import {Avatar} from "./inworld/Avatar";

function App() {

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;

    const ws = WebSocketClient.getInstance(`ws://127.0.0.1:8080/messages`);

    return (
        <m-group
            z={30}
        >

            <PepeRoom/>

            <Ethereum/>

            <Avatar/>

            <m-cube
                x={20}
                z={10}
                y={1}
                onClick={() => {
                    WebSocketClient.getInstance().sendMessage(
                        JSON.stringify({
                            type: "transaction",
                        })
                    )
                }}
            >

            </m-cube>
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
