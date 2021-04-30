import http from 'http';
const app = require("express")();
import { TritonNode } from './tritonNode';
const tritonNode: TritonNode = new TritonNode(app);
const port: string = process.argv[process.argv.length - 1];

const httpServer: http.Server = tritonNode.createHttpServer(app);
tritonNode.setServerPort(port);
const ops = { path: '/triton', pingInterval: 10000, pingTimeout: 5000 };
const io = require('socket.io');
const server = tritonNode.creatSocketServer(io, ops);
server.on('connect', (data) => { console.log(data) });