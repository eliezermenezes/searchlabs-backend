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
import ReservationRoute from "./routes/reservation-route";
import AuthRoute from "./routes/auth-route";

import { Cors } from './middleware/cors';
import { AuthController } from "./controllers/auth-controller";

class App {
    public express: express.Application;
    public sufix_api: string;
    public _auth: AuthController;

    constructor() {
        this.express = express();

        this._auth = new AuthController();
        this.sufix_api = '/api/';
        this.middleware();
        this.endpoints();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(Cors.prototype.setHeaders);
    }

    private endpoints(): void {

        // Boas-vindas
        this.express.use('/', APIRoute);

        // Authenticate
        this.express.use(`${this.sufix_api}auth`, AuthRoute);

        // Users
        this.express.use(`${this.sufix_api}users`, UserRoute);

        // Laboratories
        this.express.use(`${this.sufix_api}laboratories`, LaboratoryRoute);

        // Classes
        this.express.use(`${this.sufix_api}classes`, ClassRoute);

        // Resources
        this.express.use(`${this.sufix_api}resources`, ResourceRoute);

        // Topics
        this.express.use(`${this.sufix_api}topics`, TopicRoute);

        // Classes Users
        this.express.use(`${this.sufix_api}associate`, ClassUserRoute);

        // Solicitations
        this.express.use(`${this.sufix_api}solicitations`, SolicitationRoute);

        // Reservations
        this.express.use(`${this.sufix_api}reservations`, ReservationRoute);
    }
}

export default new App().express;