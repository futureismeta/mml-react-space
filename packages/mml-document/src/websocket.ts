class WebSocketClient {
    private url: string;
    private ws: WebSocket | null;

    constructor(url: string) {
        this.url = url;
        this.ws = null;
    }

    connect(
        onMessage: (data: string) => void,
        onError: (error: Event) => void,
        onOpen: () => void,
        onClose: () => void
    ) {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log("WebSocket connection established");
            if (onOpen) onOpen();
        };

        this.ws.onmessage = (event: MessageEvent) => {
            console.log("Received message:", event.data);
            if (onMessage) onMessage(event.data);
        };

        this.ws.onerror = (error: Event) => {
            console.error("WebSocket error:", error);
            if (onError) onError(error);
        };

        this.ws.onclose = () => {
            console.log("WebSocket connection closed");
            if (onClose) onClose();
        };
    }

    sendMessage(message: string) {
        console.log("sending message")

        if (this.ws) {
            console.log("sent message")
            this.ws.send(message);
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export { WebSocketClient };