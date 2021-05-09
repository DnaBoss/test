import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import * as SocketIOClient from 'socket.io-client';
export class TritonNode {
    httpServer: http.Server
    socketServer: socketIO.Server;
    app: express.Express;
    id: string;
    port: string;
    type: string;
    constructor(id: string, type: string, app: express.Express) {
        this.id = id;
        this.type = type;
        this.app = app;
    }

    public createHttpServer(app: express.Express): http.Server {
        const bodyParser = require('body-parser');
        const helmet = require('helmet');
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.httpServer = http.createServer(app);
        return this.httpServer;
    }

    public creatSocketServer(io, ops: socketIO.ServerOptions): socketIO.Server {
        this.socketServer = io(this.httpServer, ops);
        this.socketServer.on('connect', function (socket) {
            console.log(`connected id:${socket.id}`)
            socket.on('disconnect', function (reason) { console.log('reason :', reason) });
        })
        return this.socketServer;
    }

    public setServerPort(port: string): http.Server {
        this.port = port;
        this.httpServer.listen(port, () => { });
        return this.httpServer;
    }

    public createConnection(io, ip: string, port: string, ops): SocketIOClient.Socket {
        const uri = `http://${ip}:${port}`;
        let socket = io(uri, ops);
        // socket.on('connect', function () { console.log(`${ip}:${port} 連到了`) });
        return socket;
    }

}
