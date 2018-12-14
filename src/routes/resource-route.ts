'use strict';

import { Router } from 'express';
import { ResourceController } from './../controllers/resource-controller';
import { AuthController } from "../controllers/auth-controller";

export class ResourceRoute {
    public router: Router;
    public _auth: AuthController;
    public _controller: ResourceController;

    constructor() {
        this.router = Router();
        this._auth = new AuthController();
        this._controller = new ResourceController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', [this._auth.verifyToken], this._controller.get);
        this.router.post('/add', [this._auth.verifyToken], this._controller.post);
        this.router.get('/by/laboratory/:lab', [this._auth.verifyToken], this._controller.getByLaboratory);
        this.router.get('/:id', [this._auth.verifyToken], this._controller.getById);
        this.router.patch('/:id', [this._auth.verifyToken], this._controller.patch);
        this.router.delete('/:id/delete', [this._auth.verifyToken], this._controller.delete);
    }
}

const resourceRoute = new ResourceRoute();
resourceRoute.onInit();
export default resourceRoute.router;