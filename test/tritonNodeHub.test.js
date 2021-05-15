const expect = require('expect');
const sinon = require('sinon');
const consts = require('../config/consts.json');
const TritonNodeHub = require('../base/tritonNodeHub').TritonNodeHub;
describe('TritonProxy  測試', () => {
    let tritonNOdeHub = new TritonNodeHub();
    const TritonNode = require('../base/tritonNode').TritonNode;
    const app = require("express")();
    const tritonNode1 = new TritonNode('test01', 'connector', app);
    const tritonNode2 = new TritonNode('test02', 'holdem', app);
    const port1 = 7788;
    const port2 = 3322;
    const ops = { path: '/triton', pingInterval: 10000, pingTimeout: 5000 };
    const io = require('socket.io');
    tritonNode1.createHttpServer(app);
    tritonNode2.createHttpServer(app);
    tritonNode1.setServerPort(port1);
    tritonNode2.setServerPort(port2);
    const socketServer1 = tritonNode1.creatSocketServer(io, ops);
    const socketServer2 = tritonNode2.creatSocketServer(io, ops);
    it('TritonNodeHub 的  addNode 方法，可以取得 依照  id 指定儲存的的資料', () => {
        let hub = tritonNOdeHub.addNode(1, 'test');
        expect(hub[1]).toEqual('test');
    });

    it('TritonNodeHub 的  removeNode 方法，可以依照 serverType and id 取得指定的資料', () => {
        let node = tritonNOdeHub.getNode(1);
        expect(node).toEqual('test');
    });

    it('TritonNodeHub 的  removeNode 方法，可以取得 依照 serverType and id 移除指定的資料', () => {
        let node = tritonNOdeHub.getNode(1);
        expect(node).toEqual('test');
        let hub = tritonNOdeHub.removeNode(1);
        expect(hub[1]).toEqual(undefined);
    });

    it('TritonNodeHub 的  closeNode 方法，可以關閉 server', () => {
        const socketServerSpy = sinon.spy(socketServer1, 'close');
        tritonNOdeHub.addNode(1, socketServer1);
        tritonNOdeHub.closeNode(1);
        expect(socketServerSpy.callCount).toEqual(1);
        socketServerSpy.restore();
    });

});
