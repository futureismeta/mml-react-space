class WebSocketClient {
    private readonly url: string;
    private readonly ws: WebSocket | null;

    constructor(url: string) {
        this.url = url;
        this.ws = new WebSocket(this.url);
    }
    sendMessage(message: string) {
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