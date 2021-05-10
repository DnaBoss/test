
const SocketIO = require('socket.io');
export class SocketObserver {
    private server: SocketIO.Server;
    private socketDict: { [id: string]: SocketIO.Socket }
    constructor(server) {
        this.server = server;
        this.socketDict = {};
    }

    getServer() { return this.server; }

    addSocket(id: string, socket: SocketIO.Socket) {
        // socket.join(id, err => err ? console.log(' socket join error', err) : null);
        // socket.join(type, err => err ? console.log(' socket join  error', err) : null);
        this.socketDict[id] = socket;
        return this.socketDict;
    }

    subscribe() { }
}