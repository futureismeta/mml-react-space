import {createModal} from "@rabby-wallet/rabbykit";
import {config} from "./config";
import {chains} from "./chains";

export const client = config.getPublicClient()

export const rabbyKit = createModal({
    chains,
    wagmi: config,
    projectId: "fc143c6c5401275fcef08b59b2dcc6b5",
    appName: "Metaverse"
});
