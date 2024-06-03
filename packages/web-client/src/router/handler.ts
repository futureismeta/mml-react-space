import {BaseMessage} from "../../../shared/MessageTypes";

type Handler = (message: BaseMessage) => Promise<void> | void;

export class MessageRouter {
    private routes: Map<string, Handler> = new Map();

    public registerRoute(type: string, handler: Handler): void {
        this.routes.set(type, handler);
    }

    public async handleMessage(event: MessageEvent): Promise<void> {
        const message: BaseMessage = JSON.parse(event.data);

        const handler = this.routes.get(message.type);
        if (handler) {
            await handler(message);
        } else {
            console.warn(`No handler registered for message type: ${message.type}`);
        }
    }
}