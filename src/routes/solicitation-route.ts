'use strict';

import { Router } from 'express';
import { SolicitationController } from '../controllers/solicitation-controller';

export class SolicitationRoute {
    public router: Router;
    public _controller: SolicitationController;

    constructor() {
        this.router = Router();
        this._controller = new SolicitationController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', this._controller.get);
        this.router.post('/register', this._controller.post);
    }
}

const solicitationRoute = new SolicitationRoute();
solicitationRoute.onInit();
export default solicitationRoute.router;