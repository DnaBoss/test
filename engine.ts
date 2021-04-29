import { ServerConfig, ServersConfig } from './interface/servers';
import { TritonNode } from './base/tritonNode'
const serversConfig: ServersConfig = require('./config/servers.json');

const serverOption = require('./config/serverOption.json');
const express = require("express");
const app = express();
function forEachEnv(serversConfig) {
    Object.keys(serversConfig).forEach(forEachServerType);
}
function forEachServerType(env) {
    Object.keys(serversConfig[env]).forEach(serverType => start(env, serverType));
}
function start(env, serverType) {
    const serverConfig: ServerConfig = serversConfig[env][serverType];
    const server = require("https").createServer(app);
    const io = require('socket.io')(server, serverOption[serverType]);
    const tritonNode = new TritonNode( app);
    tritonNode.setServerPort(serverConfig.port);
}

// forEachEnv(serversConfig)
