'use strict';

import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { AuthController } from "../controllers/auth-controller";

export class UserRoute {
    public router: Router;
    public _auth: AuthController;
    public _controller: UserController;

    constructor() {
        this.router = Router();
        this._auth = new AuthController();
        this._controller = new UserController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', [this._auth.verifyToken], this._controller.get);
        this.router.post('/add', [this._auth.verifyToken], this._controller.post);
        this.router.get('/:id', [this._auth.verifyToken], this._controller.getById);
        this.router.patch('/:id', [this._auth.verifyToken], this._controller.update);
        this.router.delete('/:id', [this._auth.verifyToken], this._controller.delete);
        this.router.get('/class/:id/students', [this._auth.verifyToken], this._controller.getStudentsByClass);
    }
}

const userRoute = new UserRoute();
userRoute.onInit();
export default userRoute.router;