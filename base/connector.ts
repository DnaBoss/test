import { TritonNode } from "./tritonNode";
import express from 'express';
class Connector extends TritonNode {
    constructor(app: express.Express) {
        super(app);
    }
}
module.exports = Connector;