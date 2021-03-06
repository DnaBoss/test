import { ProcessArgs } from "./interface/processArgs";
import { ServersInfo, ServerConfig } from "./interface/servers";
import { TritonNode } from './base/tritonNode';
const nets = require('os').networkInterfaces();
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
        const ProxyClass = require(`./base/${this.envArgs.serverType}`);
        const proxyNode: TritonNode = this.createHttpServer(this.envArgs.instanceId, this.envArgs.serverType, ProxyClass, this.envArgs.port);
        this.createSocketServer(proxyNode);
        const connectionList = this.getConnectionList();
        return connectionList.map(info => { this.connect(proxyNode, info.privateip, info.port) });
    }

    private getConnectionList(): ServerConfig[] {
        let connectionList = [];
        this.ServersInfo.connector.forEach(info => connectionList.push(info));
        this.ServersInfo.gameServer.forEach(info => connectionList.push(info));
        return connectionList.filter((info: ServerConfig) => this.needConnected(info.privateip, info.port));
    }

    private connect(proxyNode: TritonNode, ip: string, port: string) {
        const SocketIOClient = require('socket.io-client');
        return proxyNode.createConnection(SocketIOClient, ip, port, ops);
    }

    private createSocketServer(tritonNode) {
        const io = require('socket.io');
        tritonNode.creatSocketServer(io, ops);
        return tritonNode;
    }

    private createHttpServer(id: string, type: string, ProxyClass: any, port: string): TritonNode {
        const app = require("express")();
        const tritonNode: TritonNode = new ProxyClass(id, type, app);
        tritonNode.createHttpServer(app);
        tritonNode.setServerPort(port);
        return tritonNode;
    }

    private needConnected(ip, port): boolean {
        if (this.privateIPs.includes(ip) && this.envArgs.port == port) {
            return false;
        }
        return true;
    }

    private getPrivateIp(): string[] {
        const results = []; // Or just '{}', an empty object
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                // net.family === 'IPv4' && !net.internal ? results.push(net.address) : null;
                results.push(net.address)
            }
        }
        return results;
    }

    public getServersInfo(): ServersInfo {
        const allServerInfo = require(`./config/servers.json`);
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