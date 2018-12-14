'use strict';

import { Request } from 'express';

export class SolicitationFilter {
    public filter: Array<Object>;
    public request: Request | any;

    constructor(request: Request | any) {
        this.filter = [];
        this.request = request;

        this.add();
    }

    public add() {
        const filter = this.request.query;

        if (filter.status) {
            this.filter.push({ status: filter.status });
        } else {
            this.filter.push({ status: 'active' });
        }

        if (filter.situation) {
            this.filter.push({ situation: filter.situation });
        }
    }

    public get() {
        return this.filter;
    }
}