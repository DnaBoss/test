"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var node_events_1 = __importDefault(require("node:events"));
var TritonNode = /** @class */ (function (_super) {
    __extends(TritonNode, _super);
    function TritonNode(app) {
        var _this = _super.call(this) || this;
        _this.app = app;
        return _this;
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
}(node_events_1.default));
exports.TritonNode = TritonNode;
