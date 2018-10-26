'use struict';

import { ResourceInterface } from './../interfaces/resource-interface';
import { Resource } from '../models/attributes/resource';

const { resource, laboratories } = require('../models/associations');

export class ResourceRepository implements ResourceInterface {

    public async create(dataRequest: Resource): Promise<Resource> {
        return await resource.create(dataRequest);
    }

    public async getAll(): Promise<Resource[]> {
        return await resource.findAll({
            include: [{
                model: laboratories,
                as: 'laboratory'
            }]
        });
    }
}

export default new ResourceRepository();