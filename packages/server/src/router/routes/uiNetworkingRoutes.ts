import { Application } from 'express';

export const setupUiNetworkingRoutes = (app: Application) => {
    const uiNetworkPath = '/ui-networking';
    app.ws(uiNetworkPath, (ws) => {
        ws.on('message', (msg) => {

            console.log('New WebSocket connection established')
            console.log('New WebSocket connection established')
            console.log('New WebSocket connection established')
            console.log('Received message:', msg);
        });
        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
        console.log('New WebSocket connection established');
    });
};