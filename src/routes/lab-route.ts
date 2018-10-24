import express from 'express';

export class LabRoutes {
    public router: any;

    constructor() {
        this.router = express.Router();
    }
    get(): any {
        this.router.get('/', (_:any, res:any) => {
            res.json({
                title: 'API Searchlabs',
                version: '1.0.0',
                auth: 'Eliezer Menezes'
            });
        });
    }
}