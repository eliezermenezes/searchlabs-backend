'use strict';

import { Router } from 'express';
import { ClassController } from '../controllers/class-controller';

export class ClassRoute {
    public router: Router;
    public _controller: ClassController;

    constructor() {
        this.router = Router();
        this._controller = new ClassController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', this._controller.get);
        this.router.post('/add', this._controller.get);
        this.router.get('/by/teacher', this._controller.getByTeacher);
        this.router.get('/:id', this._controller.getById);
    }
}

const classRoute = new ClassRoute();
classRoute.onInit();
export default classRoute.router;