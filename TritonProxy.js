"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TritonProxy = void 0;
var processArgs_1 = require("./interface/processArgs");
var servers_1 = require("./interface/servers");
var networkInterfaces = require('os').networkInterfaces;
var nets = networkInterfaces();
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
        var ProxyClass = require(process.env.PWD + "/base/" + this.envArgs.serverType);
        var proxyNode = this.createServer(ProxyClass, this.envArgs.port);
        var flattenArray = [];
        this.ServersInfo.connector.forEach(function (info) { return flattenArray.push(info); });
        this.ServersInfo.gameServer.forEach(function (info) { return flattenArray.push(info); });
        var result = flattenArray.filter(function (info) { return _this.needConnected(info.privateip, info.port); });
        var sockets = result.map(function (info) { return _this.connect(proxyNode, info.serverType, info.port); });
    };
    TritonProxy.prototype.connect = function (proxyNode, ip, port) {
        var SocketIOClient = require('socket.io-client');
        return proxyNode.createConnection(SocketIOClient, ip, port, ops);
    };
    TritonProxy.prototype.createServer = function (ProxyClass, port) {
        var app = require("express")();
        var proxyClass = new ProxyClass(app);
        var io = require('socket.io');
        proxyClass.createHttpServer(app);
        proxyClass.setServerPort(port);
        proxyClass.creatSocketServer(io, ops);
        return proxyClass;
    };
    TritonProxy.prototype.needConnected = function (ip, port) {
        if (this.privateIPs.includes(ip)) {
            return false;
        }
        if (this.envArgs.port == port) {
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
                net.family === 'IPv4' && !net.internal ? results.push(net.address) : null;
            }
        }
        return results;
    };
    TritonProxy.prototype.getServersInfo = function () {
        var allServerInfo = require(process.env.PWD + "/config/servers.json");
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
// server.on('connect', (data) => { console.log(data) });
