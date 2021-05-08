import { TritonNode } from "./tritonNode";
import express from 'express';
class Holdem extends TritonNode {
    constructor(id: string, type: string, app: express.Express) {
        super(id, type, app);
    }
}
module.exports = Holdem;