// const bodyParser = require('body-parser');
// const helmet = require('helmet');
// this.app.use(helmet());
// this.app.use(bodyParser.json());
// this.app.use(bodyParser.urlencoded({ extended: true }));
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import * as SocketIOClient from 'socket.io-client';
import EventEmitter from 'node:events';
export class TritonNode {
    httpServer: http.Server
    socketServer: socketIO.Server;
    app: express.Express;
    constructor(app: express.Express) {
        this.app = app;
    }

    public createHttpServer(app: express.Express): http.Server {
        this.httpServer = http.createServer(app);
        return this.httpServer;
    }

    public creatSocketServer(io, ops: socketIO.ServerOptions): socketIO.Server {
        this.socketServer = io(this.httpServer, ops);
        return this.socketServer;
    }

    public setServerPort(port: string): http.Server {
        this.httpServer.listen(port, () => { console.log(`app listening on port  ${port}  , ${new Date()}`) });
        return this.httpServer;
    }

    public createConnection(io, ip: string, port: string, ops): SocketIOClient.Socket {
        const uri = `http://${ip}:${port}`;
        let socket = io(uri, ops);
        return socket;
    }

}
