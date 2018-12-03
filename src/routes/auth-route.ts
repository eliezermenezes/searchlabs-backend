'use strict';

import { Router } from 'express';
import { AuthController } from "../controllers/auth-controller";

export class AuthRoute {
    public router: Router;
    public _controller: AuthController;

    constructor() {
        this.router = Router();
        this._controller = new AuthController();
        this.onInit();
    }

    public onInit(): void {
        this.router.post('/login', this._controller.doLogin);
        this.router.post('/logout', this._controller.doLogout);
    }
}

const authRoute = new AuthRoute();
authRoute.onInit();
export default authRoute.router;