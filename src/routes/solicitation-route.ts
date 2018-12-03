'use strict';

import { Router } from 'express';
import { SolicitationController } from '../controllers/solicitation-controller';
import { AuthController } from "../controllers/auth-controller";

export class SolicitationRoute {
    public router: Router;
    public _controller: SolicitationController;
    public _auth: AuthController;

    constructor() {
        this.router = Router();
        this._auth = new AuthController();
        this._controller = new SolicitationController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', [this._auth.verifyToken], this._controller.get);
        this.router.post('/register', [this._auth.verifyToken], this._controller.post);

        this.router.get('/:id', [this._auth.verifyToken], this._controller.getById);
        this.router.patch('/:id', [this._auth.verifyToken], this._controller.update);

        this.router.delete('/:id/delete', [this._auth.verifyToken], this._controller.delete);
        this.router.post('/:id/refuse', [this._auth.verifyToken], this._controller.refuse);
        this.router.post('/:id/accept', [this._auth.verifyToken], this._controller.accept);
        this.router.post('/:id/cancel', [this._auth.verifyToken], this._controller.cancel);
    }
}

const solicitationRoute = new SolicitationRoute();
solicitationRoute.onInit();
export default solicitationRoute.router;