"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketObserver = void 0;
var SocketIO = require('socket.io');
var SocketObserver = /** @class */ (function () {
    function SocketObserver(server) {
        this.server = server;
        this.socketDict = {};
    }
    SocketObserver.prototype.getServer = function () { return this.server; };
    SocketObserver.prototype.addSocket = function (id, socket) {
        // socket.join(id, err => err ? console.log(' socket join error', err) : null);
        // socket.join(type, err => err ? console.log(' socket join  error', err) : null);
        this.socketDict[id] = socket;
        return this.socketDict;
    };
    SocketObserver.prototype.subscribe = function () { };
    return SocketObserver;
}());
exports.SocketObserver = SocketObserver;
