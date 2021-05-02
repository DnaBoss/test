import { ProcessArgs } from "./interface/processArgs";
import { ServersInfo, ServerConfig } from "./interface/servers";
import http from 'http';
import { TritonNode } from "./base/tritonNode";

const { networkInterfaces } = require('os');
const nets = networkInterfaces();

const ops = { path: '/triton', pingInterval: 10000, pingTimeout: 5000 };
export class TritonProxy {
    private ServersInfo: ServersInfo;
    private envArgs: ProcessArgs;
    private privateIPs: string[];
    private env: string;
    constructor(env: string) {
        this.env = process.env.NODE_ENV || env;
        this.ServersInfo = this.getServersInfo();
        this.envArgs = this.getEnvArgs();
        this.privateIPs = this.getPrivateIp();
    }

    public execProxyProcess() {
        const ProxyClass = require(`${process.env.PWD}/base/${this.envArgs.serverType}`);
        const proxyNode: TritonNode = this.createServer(ProxyClass, this.envArgs.port);
        let flattenArray = [];
        this.ServersInfo.connector.forEach(info => flattenArray.push(info));
        this.ServersInfo.gameServer.forEach(info => flattenArray.push(info));
        const result = flattenArray.filter((info: ServerConfig) => this.needConnected(info.privateip, info.port));
        const sockets = result.map((info: ServerConfig) => this.connect(proxyNode, info.serverType, info.port));
    }

    private connect(proxyNode: TritonNode, ip: string, port: string) {
        const SocketIOClient = require('socket.io-client');
        return proxyNode.createConnection(SocketIOClient, ip, port, ops);
    }

    private createServer(ProxyClass: any, port: string): TritonNode {
        const app = require("express")();
        const proxyClass: TritonNode = new ProxyClass(app);
        const io = require('socket.io');
        proxyClass.createHttpServer(app);
        proxyClass.setServerPort(port);
        proxyClass.creatSocketServer(io, ops);
        return proxyClass;
    }
    
    private needConnected(ip, port): boolean {
        if (this.privateIPs.includes(ip)) {
            return false;
        }
        if (this.envArgs.port == port) {
            return false;
        }
        return true;
    }

    private getPrivateIp(): string[] {
        const results = []; // Or just '{}', an empty object
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                net.family === 'IPv4' && !net.internal ? results.push(net.address) : null;
            }
        }
        return results;
    }

    public getServersInfo(): ServersInfo {
        const allServerInfo = require(`${process.env.PWD}/config/servers.json`);
        const serverInfo = new ServersInfo(allServerInfo[this.env]);
        return serverInfo;
    }

    public getEnvArgs(): ProcessArgs {
        // process.argv = "port=3310 mode=dev serverType=connector instanceId=connector_0 "
        let args: ProcessArgs = new ProcessArgs();
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
let proxy = new TritonProxy('local');
proxy.execProxyProcess();


// server.on('connect', (data) => { console.log(data) });