import { TritonNode } from "./tritonNode";
import express from 'express';
class Holdem extends TritonNode {
    constructor(app: express.Express) {
        super(app);
    }
}
module.exports = Holdem;