'use strict';

import { Router } from 'express';
import { ClassController } from '../controllers/class-controller';
import { AuthController } from "../controllers/auth-controller";

export class ClassRoute {
    public router: Router;
    public _controller: ClassController;
    public _auth: AuthController;

    constructor() {
        this.router = Router();
        this._auth = new AuthController();
        this._controller = new ClassController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', [this._auth.verifyToken], this._controller.get);
        this.router.post('/add', [this._auth.verifyToken], this._controller.post);
        this.router.get('/by/teacher/only', [this._auth.verifyToken], this._controller.onlyClasses);
        this.router.get('/', [this._auth.verifyToken], this._controller.getByTeacher);
        this.router.get('/:id', [this._auth.verifyToken], this._controller.getById);
        this.router.patch('/:id', [this._auth.verifyToken], this._controller.patch);
        this.router.delete('/:id/delete', [this._auth.verifyToken], this._controller.delete);
    }
}

const classRoute = new ClassRoute();
classRoute.onInit();
export default classRoute.router;