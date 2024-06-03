export interface BaseMessage {
    type: string;
    data?: any;
}

interface ConnectMessage extends BaseMessage {
    type: 'connect';
}

interface DisconnectMessage extends BaseMessage {
    type: 'disconnect';
}

interface TransactionMessage extends BaseMessage {
    type: 'transaction';
}

interface AvatarMessage extends BaseMessage {
    type: 'avatar';
}

type Message = ConnectMessage | DisconnectMessage | TransactionMessage | AvatarMessage;
