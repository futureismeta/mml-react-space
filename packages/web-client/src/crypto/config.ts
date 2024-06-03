import {createConfig} from "@wagmi/core";
import {publicClient, webSocketPublicClient} from "./chains";

export const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
});