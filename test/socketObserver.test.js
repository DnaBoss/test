const expect = require('expect');
const { SocketObserver } = require('../base/socketObserver');

const http = require('http');
const io = require('socket.io');
const app = require("express")();
const ops = { path: '/triton', pingInterval: 10000, pingTimeout: 5000 };
const httpServer = http.createServer(app);
httpServer.listen(8899);
const realServer = io(httpServer, ops);
let socketObserver = new SocketObserver(realServer);
const SocketIO = require('socket.io-client');
const uri = `http://127.0.0.1:8899`;
let realSocket = SocketIO(uri, ops);


describe('SocketObserver  測試', () => {
    
    it('SocketObserver 的 getServer 可以取得 server 對像', () => {
        const _server = socketObserver.getServer();
        expect(_server).toEqual(realServer);
    });

    it('SocketObserver 的 subscribe 可以新增參與的房間', () => {
        const socket = socketObserver.subscribe(realSocket.id, 'test');
        const rooms = Object.keys(socket.adapter.rooms);
        expect(rooms.includes('test')).toEqual(true);
    });

    it('SocketObserver 的 publish 可以發送訊息給房間的 subscriber', (done) => {
        realSocket.on('publishTest', function (data) {
            expect(data).toEqual('測試1');
            done()
        })
        socketObserver.publish('test', 'publishTest', '測試1', '測試2', '測試3')
    });

    it('SocketObserver 的 unsubscribe 可以離開參與的房間', () => {
        const socket = socketObserver.unsubscribe(realSocket.id, 'test');
        const rooms = Object.keys(socket.adapter.rooms);
        expect(rooms.includes('test')).toEqual(false);
    });

});


