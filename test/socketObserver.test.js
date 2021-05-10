const expect = require('expect');
const { SocketObserver } = require('../base/socketObserver');
const http = require('http');
const io = require('socket.io');
const app = require("express")();
const ops = { path: '/triton', pingInterval: 10000, pingTimeout: 5000 };
const httpServer = http.createServer(app);
httpServer.listen(8899);
const realServer = io(httpServer, ops);
const SocketIO = require('socket.io-client');
const uri = `http://127.0.0.1:8899`;
const realSocket = SocketIO(uri, ops);
const sinon = require('sinon');

describe('SocketObserver  測試', () => {
    let socketObserver = new SocketObserver(realServer);
    it('SocketObserver 的 getServer 可以取得 server 對像', () => {
        const _server = socketObserver.getServer();
        expect(_server).toEqual(realServer);
    });

    it('SocketObserver 的 addSocket 可以監新增連線的 socket', () => {
        const id = 77889;
        let sockets = socketObserver.addSocket(id, realSocket);
        expect(sockets[id]).toEqual(realSocket);
    });

    it('SocketObserver 的 addSocket 可以監新增連線的 socket', () => {
        const id = 77889;
        let sockets = socketObserver.addSocket(id, realSocket);
        expect(sockets[id]).toEqual(realSocket);
    });



});


