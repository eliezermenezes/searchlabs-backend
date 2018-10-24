'use strict';

import { Router, Request, Response, NextFunction } from 'express';

export class APIRoute {
    public router: Router;

    constructor() {
        this.router = Router();
        this.onInit();
    }

    private get(request: Request, response: Response, next: NextFunction): any {
        response.status(200).send({
            title: 'API Searchlabs',
            version: '1.0.0',
            auth: 'Eliezer dos Santos Menezes',
            institution: 'Faculdade Fucapi'
        });
    }

    public onInit(): void {
        this.router.get('/', this.get);
    }
}

const apiRoute = new APIRoute();
apiRoute.onInit();
export default apiRoute.router;