'use strict';

import { Router } from 'express';
import { LaboratoryController } from '../controllers/laboratory-controller';
import { AuthController } from "../controllers/auth-controller";

export class LaboratoryRoute {
    public router: Router;
    public _auth: AuthController;
    public _controller: LaboratoryController;

    constructor() {
        this.router = Router();
        this._auth = new AuthController();
        this._controller = new LaboratoryController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', [this._auth.verifyToken], this._controller.get);
        this.router.get('/list', [this._auth.verifyToken], this._controller.onlyLaboratories);
        this.router.post('/add', [this._auth.verifyToken], this._controller.post);
        this.router.get('/:id', [this._auth.verifyToken], this._controller.getById);
        this.router.patch('/:id', [this._auth.verifyToken], this._controller.patch);
        this.router.delete('/:id/delete', [this._auth.verifyToken], this._controller.delete);
        this.router.post('/:id/alter_situation', [this._auth.verifyToken], this._controller.alterSituation);
    }
}

const labRoute = new LaboratoryRoute();
labRoute.onInit();
export default labRoute.router;