'use strict';

import { Router } from 'express';
import { LaboratoryController } from '../controllers/laboratory-controller';

export class LaboratoryRoute {
    public router: Router;
    public _controller: LaboratoryController;

    constructor() {
        this.router = Router();
        this._controller = new LaboratoryController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', this._controller.get);
        this.router.post('/add', this._controller.post);
    }
}

const labRoute = new LaboratoryRoute();
labRoute.onInit();
export default labRoute.router;