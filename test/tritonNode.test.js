const expect = require('expect');
const TritonNode = require('../base/tritonNode').TritonNode;
const http = require('http');
const SocketIO = require('socket.io');
const sinon = require('sinon');
describe('TritonNode  測試', () => {

    const app = require("express")();
    const tritonNode = new TritonNode(1, 'test01', app);
    const ip = '127.0.0.1';
    const port = 5566;

    it('tritonNode 的 createHttpServer 方法，可以建立一個 server ，型別與 http Server 一樣', () => {
        const server = tritonNode.createHttpServer(app);
        expect(server).toBeInstanceOf(http.Server);
    });

    it('tritonNode 的 setServerPort 方法，可以讓 server 監聽指定的 port', () => {
        const server = tritonNode.setServerPort(port);
        expect(server.address().port).toEqual(port);
    });

    it('tritonNode 的 createSocketServer 方法，可以建立一個 socket server', () => {
        const ops = { path: '/triton', pingInterval: 10000, pingTimeout: 5000 };
        const io = require('socket.io');
        const server = tritonNode.creatSocketServer(io, ops);
        expect(server).toBeInstanceOf(SocketIO);
        server.close();
    });

    it('tritonNode 的 creatConnection 方法，會呼叫指定的 function', () => {
        const uri = `http://${ip}:${port}`;
        const ops = { 'path': '/triton', 'multiplex': false, 'transports': ['websocket'], 'query': { type: 'connector' } };
        const spy = sinon.spy();
        tritonNode.createConnection(spy, ip, port, ops);
        expect(spy.calledWith(uri, ops)).toBe(true);
    });

    it('tritonNode 的 creatConnection 方法，可以建立 socket 物件 ', () => {
        const io = require('socket.io-client');
        const ops = { 'path': '/triton', 'multiplex': false, 'transports': ['websocket'], 'query': { type: 'connector' } };
        const socket = tritonNode.createConnection(io, ip, port, ops);
        expect(socket).toHaveProperty('io');
    });
});


