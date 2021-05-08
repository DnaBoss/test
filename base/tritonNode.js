"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TritonNode = void 0;
var http_1 = __importDefault(require("http"));
// import EventEmitter from 'node:events';
var TritonNode = /** @class */ (function () {
    function TritonNode(id, type, app) {
        this.id = id;
        this.type = type;
        this.app = app;
    }
    TritonNode.prototype.createHttpServer = function (app) {
        var bodyParser = require('body-parser');
        var helmet = require('helmet');
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.httpServer = http_1.default.createServer(app);
        return this.httpServer;
    };
    TritonNode.prototype.creatSocketServer = function (io, ops) {
        this.socketServer = io(this.httpServer, ops);
        this.socketServer.on('connect', function (socket) {
            console.log("connected id:" + socket.id);
            socket.on('disconnect', function (reason) { console.log('reason :', reason); });
        });
        // this.socketServer.on('disconnect', function (socket, res) { console.log(` disconnect:${socket.id} res:`, res) })?
        return this.socketServer;
    };
    TritonNode.prototype.setServerPort = function (port) {
        this.port = port;
        this.httpServer.listen(port, function () { });
        return this.httpServer;
    };
    TritonNode.prototype.createConnection = function (io, ip, port, ops) {
        var uri = "http://" + ip + ":" + port;
        var socket = io(uri, ops);
        socket.on('connect', function () { console.log(ip + ":" + port + " \u9023\u5230\u4E86"); });
        return socket;
    };
    return TritonNode;
}());
exports.TritonNode = TritonNode;
