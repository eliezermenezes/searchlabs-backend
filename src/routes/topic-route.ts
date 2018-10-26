'use strict';

import { Router } from 'express';
import { TopicController } from './../controllers/topic-controller';

export class TopicRoute {
    public router: Router;
    public _controller: TopicController;

    constructor() {
        this.router = Router();
        this._controller = new TopicController();
        this.onInit();
    }

    public onInit(): void {
        this.router.get('/', this._controller.get);
        this.router.post('/add', this._controller.post);
    }
}

const topicRoute = new TopicRoute();
topicRoute.onInit();
export default topicRoute.router;