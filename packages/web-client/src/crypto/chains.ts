import { configureChains } from "@wagmi/core";
import {
  arbitrum,
  bsc,
  mainnet,
  metis,
  optimism,
  polygon,
} from "@wagmi/core/chains";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { publicProvider } from "@wagmi/core/providers/public";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, arbitrum, bsc, optimism, polygon, metis],
  [
    alchemyProvider({ apiKey: "<<--Some API -->>" }),
    // infuraProvider({ apiKey: "yourInfuraApiKey" }),
    publicProvider(),
  ],
);
