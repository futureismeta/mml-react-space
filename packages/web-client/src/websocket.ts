class WebSocketClient {
  private readonly url: string;
  private ws: WebSocket | null;

  constructor(url: string) {
    this.url = url;
    this.ws = null;
  }

  connect(
    onMessage: (data: string) => void,
    onError: (error: Event) => void,
    onOpen: () => void,
    onClose: () => void,
  ) {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      if (onOpen) onOpen();
      console.log("Web Client: WebSocket connection established");
    };

    this.ws.onmessage = (event: MessageEvent) => {
      console.log(event);
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
    if (this.ws) {
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
