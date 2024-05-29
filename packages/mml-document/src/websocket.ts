class WebSocketClient {
    private static instance: WebSocketClient | null = null;
    private ws: WebSocket;

    private constructor(url: string = "ws://default.url") {
        this.ws = new WebSocket(url);
    }

    static getInstance(url?: string): WebSocketClient {
        if (!WebSocketClient.instance) {
            WebSocketClient.instance = new WebSocketClient(url);
        }
        return WebSocketClient.instance;
    }

    sendMessage(message: string) {
        if (this.ws.readyState === WebSocket.OPEN) {
            console.log("Sent message:", message);
            this.ws.send(message);
        } else {
            console.error("WebSocket is not open. Ready state is:", this.ws.readyState);
        }
    }

    disconnect() {
        if (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING) {
            this.ws.close();
        }
    }
}

export { WebSocketClient };