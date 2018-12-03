'use strict';

import { Request } from 'express';

export class ReservationFilter {
    public filter: Array<Object>;
    public request: Request;

    constructor(request: Request) {
        this.filter = [];
        this.request = request;

        this.add();
    }

    public add() {
        const params = this.request.body;

        if (params.status) {
            this.filter.push({ status: params.status });
        } else {
            this.filter.push({ status: 'active' });
        }

        if (params.situation) {
            this.filter.push({ situation: params.situation });
        }
    }

    public get() {
        return this.filter;
    }
}