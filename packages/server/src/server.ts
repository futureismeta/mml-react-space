import path from 'path';
import url from 'url';
import {Networked3dWebExperienceServer} from '@mml-io/3d-web-experience-server';
import express from 'express';
import enableWs from 'express-ws';
import corsSetup from './middleware/corsSetup';
import {setupMMLDocumentRoutes} from './router/routes/mmlDocumentRoutes';
import {setupMessageRoutes} from './router/routes/messageRoutes';
import {indexContent, MML_DOCUMENT_PATH, webClientBuildDir} from './utils/filePaths';
import {BasicUserAuthenticator} from './auth/BasicUserAuthenticator';
import {characterDescription} from './config/config';
import {setupUiNetworkingRoutes} from "./router/routes/uiNetworkingRoutes";

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const { app } = enableWs(express());
app.enable('trust proxy');

// Apply middleware
app.use('/assets/', corsSetup(), express.static(path.resolve(dirname, '../assets/')));

// Setup routes
setupMMLDocumentRoutes(app, MML_DOCUMENT_PATH);
setupUiNetworkingRoutes(app);
setupMessageRoutes(app);

// Networked 3D Web Experience Server setup
const userAuthenticator = new BasicUserAuthenticator(characterDescription, {
    devAllowUnrecognizedSessions: true,
});

const networked3dWebExperienceServer = new Networked3dWebExperienceServer({
    networkPath: '/network',
    userAuthenticator,
    webClientServing: {
        indexUrl: '/',
        indexContent,
        clientBuildDir: webClientBuildDir,
        clientUrl: '/web-client/',
        clientWatchWebsocketPath: process.env.NODE_ENV !== 'production' ? '/web-client-build' : undefined,
    },
    chatNetworkPath: '/chat-network',
    assetServing: {
        assetsDir: path.resolve(dirname, '../assets/'),
        assetsUrl: '/assets/',
    },
    uiNetworkPath: '/ui-networking',
});
networked3dWebExperienceServer.registerExpressRoutes(app);

export { app };