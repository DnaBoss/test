export class ProcessArgs {
    instanceId: string;
    serverType: string;
    port: string;
    mode: string;
    //   process.argv = "port=3310 mode=dev serverType=connector instanceId=connector_0 "
    constructor() {
        this.instanceId = 'connector_0';
        this.port = '3310';
        this.mode = 'local';
        this.serverType = 'connector';
    }
}
