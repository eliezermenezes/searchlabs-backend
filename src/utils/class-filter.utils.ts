'use strict';

import { Request } from 'express';
const Sequelize = require('sequelize');

export class filterClass {
    public filter: Array<Object>;
    public request: Request | any;

    constructor(request: Request | any) {
        this.filter = [];
        this.request = request;

        this.add();
    }

    public add() {
        const params = this.request.body;

        if (params.status !== undefined) {
            this.filter.push({ status: params.status });
        } else {
            this.filter.push({ status: 'active' });
        }

        if (params.name) {
            this.filter.push({
                name: {
                    [Sequelize.Op.like]: '%' + params.name + '%'
                }
            });
        }

        if (params.institution) {
            this.filter.push({
                institution: {
                    [Sequelize.Op.like]: '%' + params.institution + '%'
                }
            });
        }

        if (params.situation) {
            this.filter.push({ situation: params.situation });
        }

        if (this.request.data.user.role === 'teacher') {
            this.filter.push({ teacher: this.request.data.user.id });
        }
    }

    public get() {
        return this.filter;
    }
}