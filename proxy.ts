import { ProcessArgs } from "./interface/processArgs";
import { ServersConfig } from "./interface/servers";
const { networkInterfaces } = require('os');
const nets = networkInterfaces();

class TritonProxy {
    private serversConfig: ServersConfig;
    private envArgs: ProcessArgs;
    private privateIP: any;
    constructor() {
        this.serversConfig = this.getServersConfig();
        this.envArgs = this.getEnvArgs();
        this.privateIP = this.getPrivateIp();
    }

    public execProxyProcess() {
        // console.log('this.serversConfig  = ', this.serversConfig)
        // console.log('this.envArgs  = ', this.envArgs)
        console.log('this.privateIp  = ', this.privateIP)
    }

    private getPrivateIp():string {
        const results = Object.create(null); // Or just '{}', an empty object
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!results[name]) {
                        results[name] = [];
                    }
                    results[name].push(net.address);
                    // return net.address;
                }
            }
        }
        return results;
    }
    private getServersConfig(): ServersConfig {
        const serversConfig = require(`${process.env.PWD}/config/servers.json`);
        return serversConfig[process.env.NODE_ENV];
    }

    private getEnvArgs(): ProcessArgs {
        // process.argv = "port=3310 mode=dev serverType=connector instanceId=connector_0 "
        let args: ProcessArgs = { port: '', mode: '', instanceId: '', serverType: '' };
        process.argv.forEach((val) => {
            if (/^port(:|=)\d+$/i.test(val)) {
                args.port = val.substr(5);
            }
            if (/^mode(:|=)/i.test(val)) {
                args.mode = val.substr(5);
            }
            if (/^instanceId(:|=)/i.test(val)) {
                args.instanceId = val.substr(11);
            }
            if (/^serverType(:|=)/i.test(val)) {
                args.serverType = val.substr(11);
            }
        });
        return args
    }
}
let proxy = new TritonProxy();
proxy.execProxyProcess();
// global. = process.env.PWD;

// let node = require(`${process.env.PWD}/base/tritonNode`)
// console.log('node = ',node)
// console.log('process.argv', process.argv);

// console.log('process.env.args',typeof process.env.args);
// while (true) { }
// import http from 'http';
// const app = require("express")();
// import { TritonNode } from './base/tritonNode';
// const tritonNode: TritonNode = new TritonNode(app);
// const port: string = process.argv[process.argv.length - 1];

// tritonNode.createHttpServer(app);
// tritonNode.setServerPort(port);
// const ops = { path: '/triton', pingInterval: 10000, pingTimeout: 5000 };
// const io = require('socket.io');
// const server = tritonNode.creatSocketServer(io, ops);
// server.on('connect', (data) => { console.log(data) });