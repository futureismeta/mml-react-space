import { configureChains, createConfig } from "@wagmi/core";
import { mainnet, arbitrum, bsc, optimism, polygon } from "@wagmi/core/chains";
import { publicProvider } from "@wagmi/core/providers/public";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { createModal } from "@rabby-wallet/rabbykit";

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, arbitrum, bsc, optimism, polygon],
    [
        alchemyProvider({ apiKey: "yourAlchemyApiKey" }),
        infuraProvider({ apiKey: "yourInfuraApiKey" }),
        publicProvider(),
    ]
);

const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
});

export const rabbyKit = createModal({
    chains,
    wagmi: config,
    projectId: "fc143c6c5401275fcef08b59b2dcc6b5",
    appName: "Metaverse",
});