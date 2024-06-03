import {configureChains} from "@wagmi/core";
import {arbitrum, bsc, mainnet, metis, optimism, polygon} from "@wagmi/core/chains";
import {alchemyProvider} from "@wagmi/core/dist/providers/alchemy";
import {publicProvider} from "@wagmi/core/dist/providers/public";

export const {chains, publicClient, webSocketPublicClient} = configureChains(
    [mainnet, arbitrum, bsc, optimism, polygon, metis],
    [
        alchemyProvider({apiKey: "CZMa1z-5xUDTZcKqeSsRfcWS1GxwLlte"}),
        // infuraProvider({ apiKey: "yourInfuraApiKey" }),
        publicProvider(),
    ]
);

