"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tritonNode_1 = require("./base/tritonNode");
var serversConfig = require('./config/servers.json');
var serverOption = require('./config/serverOption.json');
var express = require("express");
var app = express();
function forEachEnv(serversConfig) {
    Object.keys(serversConfig).forEach(forEachServerType);
}
function forEachServerType(env) {
    Object.keys(serversConfig[env]).forEach(function (serverType) { return start(env, serverType); });
}
function start(env, serverType) {
    var serverConfig = serversConfig[env][serverType];
    var server = require("https").createServer(app);
    var io = require('socket.io')(server, serverOption[serverType]);
    var tritonNode = new tritonNode_1.TritonNode(app);
    tritonNode.setServerPort(serverConfig.port);
}
// forEachEnv(serversConfig)
