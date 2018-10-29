'use strict';

import { Request, Response, NextFunction } from 'express';

export class Cors {
    public setHeaders(request: Request, response: Response, next: NextFunction) {
        const methods = 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT';
        const headers = 'Authorization, Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept';

        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', methods);
        response.header('Access-Control-Allow-Headers', headers);
        response.header('Access-Control-Allow-Credentials', 'true');
        next();
    }
}
