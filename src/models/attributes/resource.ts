'use strict';

export class Resource {
    public id?: number;
    public description?: string;
    public quantity?: number;
    public laboratory_id?: number;
    public createdAt?: Date;
    public updatedAt?: Date;
}

export default new Resource();