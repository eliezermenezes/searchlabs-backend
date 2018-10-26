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
    }
}

const resourceRoute = new ResourceRoute();
resourceRoute.onInit();
export default resourceRoute.router;