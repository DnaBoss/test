import * as SocketIOClient from 'socket.io-client';

type NodeDict = { [instanceId: number]: SocketIOClient.Socket };
export class TritonNodeHub {
    private nodeDict: NodeDict;
    constructor() {
        this.nodeDict = {};
    }

    public addNode(instanceId: number, socket: SocketIOClient.Socket): NodeDict {
        this.nodeDict[instanceId] = socket;
        return this.nodeDict;
    }

    public removeNode(instanceId: number): NodeDict {
        this.nodeDict = this.nodeDict || {};
        this.nodeDict[instanceId] = undefined;
        return this.nodeDict;
    }

    public getNode(instanceId: number): SocketIOClient.Socket {
        this.nodeDict = this.nodeDict || {};
        return this.nodeDict[instanceId];
    }

    public closeNode(instanceId: number) {
        this.nodeDict = this.nodeDict || {};
        return this.nodeDict[instanceId].close();
    }
}