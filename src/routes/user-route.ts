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
    }
}

const userRoute = new UserRoute();
userRoute.onInit();
export default userRoute.router;