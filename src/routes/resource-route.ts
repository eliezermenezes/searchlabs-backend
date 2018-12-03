'use strict';

import { Router } from 'express';
import { ResourceController } from './../controllers/resource-controller';

export class ResourceRoute {
    public router: Router;
    public _controller: ResourceController;

    constructor() {
        this.router = Router();
        this._controller = new ResourceController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', this._controller.get);
        this.router.post('/add', this._controller.post);
        this.router.get('/by/laboratory/:lab', this._controller.getByLaboratory);
        this.router.get('/:id', this._controller.getById);
        this.router.patch('/:id', this._controller.patch);
        this.router.delete('/:id/delete', this._controller.delete);
    }
}

const resourceRoute = new ResourceRoute();
resourceRoute.onInit();
export default resourceRoute.router;