import { TritonNode } from "./tritonNode";
import express from 'express';
class Connector extends TritonNode {
    constructor(id: string, type: string, app: express.Express) {
        super(id, type, app);
        console.log('Connector start')
    }
}
module.exports = Connector;