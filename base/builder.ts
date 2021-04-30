const util = require('util');
const exec = require('child_process').exec;
// const exec = util.promisify(require('child_process').exec);
export class Builder {
    static _instance: Builder;
    constructor() { }
    static getInstance() {
        return Builder._instance = Builder._instance || new Builder();
    }
    public getClass(fileName: String) {
        const currentFold = __dirname;
        const path = `${currentFold}/${fileName}`;
        const exportObject = require(path);;
        let className = '';
        Object.keys(exportObject).forEach(name => className = name);
        const specifyClass = exportObject[className];
        return specifyClass;
    }
    public buildTritonNode(ip: string, port: number, service: string) {
        const currentFold = __dirname;
        const ssh: string = `ssh 13.212.70.13 cd /test/base node proxy.js 3310`;
        exec(ssh, function (error, stdout, stderr) {
            console.log('error = ', error);
            console.log('stdout = ', stdout);
            console.log('stderr = ', stderr);
        });
    }

    private getServersConfig(env) {
        const serversConfig = require('../config/servers.json');
        console.log('serversConfig[env] =', serversConfig[env]);
    }
}    
console.log('process.argv = ', process.argv)
const env = process.argv[process.argv.length - 1];
let builder = Builder.getInstance();
// builder.buildTritonNode('127.0.0.1', 5566, 'TritonNode')
// let sepcClass = builder.getClass('tritonNode');
builder.buildTritonNode('13.212.70.13', 5566, 'tritonNode');
// builder.getServersConfig(env);