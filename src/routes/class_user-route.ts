'use strict';

import { Router } from 'express';
import { ClassUserController } from './../controllers/class_user-controller';

export class ClassUserRoute {
    public router: Router;
    public _controller: ClassUserController;

    constructor() {
        this.router = Router();
        this._controller = new ClassUserController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/list', this._controller.get);
        this.router.post('/user', this._controller.post);
    }
}

const classUserRoute = new ClassUserRoute();
classUserRoute.onInit();
export default classUserRoute.router;