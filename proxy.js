"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var networkInterfaces = require('os').networkInterfaces;
var nets = networkInterfaces();
var TritonProxy = /** @class */ (function () {
    function TritonProxy() {
        this.serversConfig = this.getServersConfig();
        this.envArgs = this.getEnvArgs();
        this.privateIP = this.getPrivateIp();
    }
    TritonProxy.prototype.execProxyProcess = function () {
        // console.log('this.serversConfig  = ', this.serversConfig)
        // console.log('this.envArgs  = ', this.envArgs)
        console.log('this.privateIp  = ', this.privateIP);
    };
    TritonProxy.prototype.getPrivateIp = function () {
        var results = Object.create(null); // Or just '{}', an empty object
        for (var _i = 0, _a = Object.keys(nets); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            for (var _b = 0, _c = nets[name_1]; _b < _c.length; _b++) {
                var net = _c[_b];
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!results[name_1]) {
                        results[name_1] = [];
                    }
                    results[name_1].push(net.address);
                    // return net.address;
                }
            }
        }
        return results;
    };
    TritonProxy.prototype.getServersConfig = function () {
        var serversConfig = require(process.env.PWD + "/config/servers.json");
        return serversConfig[process.env.NODE_ENV];
    };
    TritonProxy.prototype.getEnvArgs = function () {
        // process.argv = "port=3310 mode=dev serverType=connector instanceId=connector_0 "
        var args = { port: '', mode: '', instanceId: '', serverType: '' };
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
var proxy = new TritonProxy();
proxy.execProxyProcess();
// global. = process.env.PWD;
// let node = require(`${process.env.PWD}/base/tritonNode`)
// console.log('node = ',node)
// console.log('process.argv', process.argv);
// console.log('process.env.args',typeof process.env.args);
// while (true) { }
// import http from 'http';
// const app = require("express")();
// import { TritonNode } from './base/tritonNode';
// const tritonNode: TritonNode = new TritonNode(app);
// const port: string = process.argv[process.argv.length - 1];
// tritonNode.createHttpServer(app);
// tritonNode.setServerPort(port);
// const ops = { path: '/triton', pingInterval: 10000, pingTimeout: 5000 };
// const io = require('socket.io');
// const server = tritonNode.creatSocketServer(io, ops);
// server.on('connect', (data) => { console.log(data) });
