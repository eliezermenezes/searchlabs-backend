'use strict';

import { Router } from 'express';
import { UserController } from '../controllers/user-controller';

export class UserRoute {
    public router: Router;
    public _controller: UserController;

    constructor() {
        this.router = Router();
        this._controller = new UserController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', this._controller.get);
        this.router.post('/add', this._controller.post);
        this.router.get('/:id', this._controller.getById);
        this.router.patch('/:id', this._controller.update);
        this.router.delete('/:id', this._controller.delete);
        this.router.get('/class/:id/students', this._controller.getStudentsByClass);
    }
}

const userRoute = new UserRoute();
userRoute.onInit();
export default userRoute.router;