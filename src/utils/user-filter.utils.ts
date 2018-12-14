'use strict';

import { Request } from 'express';
const Sequelize = require('sequelize');

export class filterUser {
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

        this.filter.push({ register: 'complete' });

        if (params.name) {
            this.filter.push({
                name: {
                    [Sequelize.Op.like]: '%' + params.name + '%'
                }
            });
        }

        if (params.role) {
            this.filter.push({ role: params.role });
        }
    }

    public get() {
        return this.filter;
    }
}