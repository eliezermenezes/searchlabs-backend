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

        this.router.get('/:id', this._controller.getById);
        this.router.put('/:id/update', this._controller.update);

        this.router.delete('/:id/delete', this._controller.delete);
        this.router.post('/:id/refuse', this._controller.refuse);
        this.router.post('/:id/accept', this._controller.accept);
        this.router.post('/:id/cancel', this._controller.cancel);
    }
}

const solicitationRoute = new SolicitationRoute();
solicitationRoute.onInit();
export default solicitationRoute.router;