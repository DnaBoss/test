"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TritonNode = void 0;
// const bodyParser = require('body-parser');
// const helmet = require('helmet');
// this.app.use(helmet());
// this.app.use(bodyParser.json());
// this.app.use(bodyParser.urlencoded({ extended: true }));
var http_1 = __importDefault(require("http"));
var TritonNode = /** @class */ (function () {
    function TritonNode(app) {
        this.app = app;
    }
    TritonNode.prototype.createHttpServer = function (app) {
        this.httpServer = http_1.default.createServer(app);
        return this.httpServer;
    };
    TritonNode.prototype.creatSocketServer = function (io, ops) {
        this.socketServer = io(this.httpServer, ops);
        return this.socketServer;
    };
    TritonNode.prototype.setServerPort = function (port) {
        this.httpServer.listen(port, function () { console.log("app listening on port  " + port + "  , " + new Date()); });
        return this.httpServer;
    };
    TritonNode.prototype.createConnection = function (io, ip, port, ops) {
        var uri = "http://" + ip + ":" + port;
        var socket = io(uri, ops);
        return socket;
    };
    return TritonNode;
}());
exports.TritonNode = TritonNode;
