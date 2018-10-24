'use strict';

import http from 'http';
import App from '../src/app';
import { Utils } from '../src/utils/utils';

class Server {
    public port: number | string | boolean;
    public server: any;
    public utils: Utils;

    constructor() {
        this.utils = new Utils(process.env.PORT || 3000);
        this.port = this.utils.getPort();
        this.inicializeServer();
    }

    inicializeServer() {
        App.set('port', this.port);
        this.server = http.createServer(App);
        this.server.listen(this.port);
        console.log('[SERVER] rodando na porta ' + this.port);
        
        this.server.on('error', this.utils.onError);
    }
}

new Server();
