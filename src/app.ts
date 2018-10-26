'use strict';

import express from 'express';
import bodyParser from 'body-parser';

// importação das ROTAS
import APIRoute from './routes/api-route';
import UserRoute from './routes/user-route';
import LaboratoryRoute from './routes/laboratory-route';
import ClassRoute from './routes/class-route';
import ResourceRoute from './routes/resource-route';
import TopicRoute from './routes/topic-route';
import ClassUserRoute from './routes/class_user-route';
import SolicitationRoute from './routes/solicitation-route';

class App {
    public express: express.Application;
    public sufix_api: string;

    constructor() {
        this.express = express();
        this.sufix_api = '/api/'
        this.middleware();
        this.endpoints();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private endpoints(): void {
        this.express.use('/', APIRoute);

        // Users
        this.express.use(`${this.sufix_api}user`, UserRoute);

        // Laboratories
        this.express.use(`${this.sufix_api}laboratory`, LaboratoryRoute);

        // Classes
        this.express.use(`${this.sufix_api}class`, ClassRoute);

        // Resources
        this.express.use(`${this.sufix_api}resource`, ResourceRoute);

        // Topics
        this.express.use(`${this.sufix_api}topic`, TopicRoute);

        // Classes Users
        this.express.use(`${this.sufix_api}associate`, ClassUserRoute);

        // Solicitations
        this.express.use(`${this.sufix_api}solicitation`, SolicitationRoute);
    }
}

export default new App().express;