import InWorld from "../InWorld";
import {MessageRouter} from "./handler";
import {rabbyKit} from "../crypto";

export const router = new MessageRouter();
const inWorld = new InWorld()

router.registerRoute('connect', () => {
    console.log('Handling connect message');
    rabbyKit.open();
});

router.registerRoute('disconnect', () => {
    console.log('Handling disconnect message');
    rabbyKit.close();
});

router.registerRoute('transaction', async () => {
    console.log('Handling transaction message');
    // await swapTokens();
});

router.registerRoute('avatar', async () => {
    console.log('Handling avatar message');
    await inWorld.connect();
    const response = await inWorld.fetchVoiceResponse();
    console.log(response);
});