const expect = require('expect');
const SocketObserver = require('./base/socketObserver').SocketObserver;

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
const sinon = require('sinon');
let realSocket = SocketIO(uri, ops);
setTimeout(function () {
    console.log('realSocket.id', realSocket.id)
    let room = 'gggg'
    let event = 'bigTest'
    socketObserver.subscribe(realSocket.id, room);
    // this.server.in(channel).emit(event, msg);
    realServer.to(room).emit(event, 'real test')
    realSocket.on(event, function (data) { console.log('data = ', data) })
}, 1000)
