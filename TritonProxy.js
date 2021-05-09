"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TritonProxy = void 0;
var processArgs_1 = require("./interface/processArgs");
var servers_1 = require("./interface/servers");
var nets = require('os').networkInterfaces();
var ops = { path: '/triton', pingInterval: 10000, pingTimeout: 5000 };
var TritonProxy = /** @class */ (function () {
    function TritonProxy(env) {
        this.env = process.env.NODE_ENV || env;
        this.ServersInfo = this.getServersInfo();
        this.envArgs = this.getEnvArgs();
        this.privateIPs = this.getPrivateIp();
    }
    TritonProxy.prototype.execProxyProcess = function () {
        var _this = this;
        var ProxyClass = require("./base/" + this.envArgs.serverType);
        var proxyNode = this.createHttpServer(this.envArgs.instanceId, this.envArgs.serverType, ProxyClass, this.envArgs.port);
        this.createSocketServer(proxyNode);
        var connectionList = this.getConnectionList();
        return connectionList.map(function (info) { _this.connect(proxyNode, info.privateip, info.port); });
    };
    TritonProxy.prototype.getConnectionList = function () {
        var _this = this;
        var connectionList = [];
        this.ServersInfo.connector.forEach(function (info) { return connectionList.push(info); });
        this.ServersInfo.gameServer.forEach(function (info) { return connectionList.push(info); });
        return connectionList.filter(function (info) { return _this.needConnected(info.privateip, info.port); });
    };
    TritonProxy.prototype.connect = function (proxyNode, ip, port) {
        var SocketIOClient = require('socket.io-client');
        return proxyNode.createConnection(SocketIOClient, ip, port, ops);
    };
    TritonProxy.prototype.createSocketServer = function (tritonNode) {
        var io = require('socket.io');
        tritonNode.creatSocketServer(io, ops);
        return tritonNode;
    };
    TritonProxy.prototype.createHttpServer = function (id, type, ProxyClass, port) {
        var app = require("express")();
        var tritonNode = new ProxyClass(id, type, app);
        tritonNode.createHttpServer(app);
        tritonNode.setServerPort(port);
        return tritonNode;
    };
    TritonProxy.prototype.needConnected = function (ip, port) {
        if (this.privateIPs.includes(ip) && this.envArgs.port == port) {
            return false;
        }
        return true;
    };
    TritonProxy.prototype.getPrivateIp = function () {
        var results = []; // Or just '{}', an empty object
        for (var _i = 0, _a = Object.keys(nets); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            for (var _b = 0, _c = nets[name_1]; _b < _c.length; _b++) {
                var net = _c[_b];
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                // net.family === 'IPv4' && !net.internal ? results.push(net.address) : null;
                results.push(net.address);
            }
        }
        return results;
    };
    TritonProxy.prototype.getServersInfo = function () {
        var allServerInfo = require("./config/servers.json");
        var serverInfo = new servers_1.ServersInfo(allServerInfo[this.env]);
        return serverInfo;
    };
    TritonProxy.prototype.getEnvArgs = function () {
        // process.argv = "port=3310 mode=dev serverType=connector instanceId=connector_0 "
        var args = new processArgs_1.ProcessArgs();
        process.argv.forEach(function (val) {
            if (/^port(:|=)\d+$/i.test(val)) {
                args.port = val.substr(5);
            }
            if (/^mode(:|=)/i.test(val)) {
                args.mode = val.substr(5);
            }
            if (/^instanceId(:|=)/i.test(val)) {
                args.instanceId = val.substr(11);
            }
            if (/^serverType(:|=)/i.test(val)) {
                args.serverType = val.substr(11);
            }
        });
        return args;
    };
    return TritonProxy;
}());
exports.TritonProxy = TritonProxy;
var proxy = new TritonProxy('local');
proxy.execProxyProcess();
