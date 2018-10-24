'use strict';

import express from 'express';
import bodyParser from 'body-parser';

// importação das ROTAS
import APIRoute from './routes/api-route';
import UserRoute from './routes/user-route';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.endpoints();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private endpoints(): void {
        this.express.use('/', APIRoute);
        this.express.use('/api/user', UserRoute);
    }
}

export default new App().express;