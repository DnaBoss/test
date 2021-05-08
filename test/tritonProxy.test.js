const expect = require('expect');
const TritonProxy = require('../tritonProxy').TritonProxy;
const ProcessArgs = require("../interface/processArgs").ProcessArgs;
const ServersInfo= require("../interface/servers").ServersInfo;
describe('TritonProxy  測試', () => {
    let tritonProxy = new TritonProxy('local');

    it('TritonProxy 的  getEnvArgs 方法，可以取得 ProcessArgs 介面的資料', () => {
        let envArgs = tritonProxy.getEnvArgs();
        expect(envArgs).toBeInstanceOf(ProcessArgs);
    });

    it('TritonProxy 的  getServersInfo 方法，可以取得 ServersInfo 介面的資料', () => {
        let serversInfo = tritonProxy.getServersInfo();
        expect(serversInfo).toBeInstanceOf(ServersInfo);
    });
    
});