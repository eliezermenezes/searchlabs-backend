'use strict';

import { Router } from 'express';
import { TopicController } from './../controllers/topic-controller';
import { AuthController } from "../controllers/auth-controller";

export class TopicRoute {
    public router: Router;
    public _auth: AuthController;
    public _controller: TopicController;

    constructor() {
        this.router = Router();
        this._auth = new AuthController();
        this._controller = new TopicController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', [this._auth.verifyToken], this._controller.get);
        this.router.post('/add', [this._auth.verifyToken], this._controller.post);
        this.router.get('/:id', [this._auth.verifyToken], this._controller.getById);
        this.router.get('/by/class/:class', [this._auth.verifyToken], this._controller.getByClass);
        this.router.patch('/:id', [this._auth.verifyToken], this._controller.patch);
        this.router.delete('/:id/delete', [this._auth.verifyToken], this._controller.delete);
    }
}

const topicRoute = new TopicRoute();
topicRoute.onInit();
export default topicRoute.router;