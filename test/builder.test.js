const expect = require('expect');
const Builder = require('../base/builder').Builder;
const http = require('http');
const SocketIOClient = require('socket.io-client');
const SocketIO = require('socket.io');
describe('Builder  測試', () => {
    const app = require("express")();
    const builder = Builder.getInstance();
    const ip = '127.0.0.1';
    const port = 5566;
    it('Builder 的 getClass 方法，可以取得指定的類別 ', () => {
        let specifyClass = builder.getClass('tritonNode');
        let TritonNode = require('../base/tritonNode').TritonNode;
        expect(specifyClass).toEqual(TritonNode);
    });
    
});


