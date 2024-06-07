import { createModal } from "@rabby-wallet/rabbykit";

import { chains } from "./chains";
import { config } from "./config";

export const client = config.getPublicClient();

export const rabbyKit = createModal({
  chains,
  wagmi: config,
  projectId: "<<--Some ID -->>",
  appName: "",
});
