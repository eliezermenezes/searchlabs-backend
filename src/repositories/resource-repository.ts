'use strict';

import { ResourceInterface } from './../interfaces/resource-interface';
import { Resource } from '../models/attributes/resource';

const { resource, laboratories } = require('../models/associations');

export class ResourceRepository implements ResourceInterface {

    public async create(dataRequest: Resource): Promise<Resource> {
        return await resource.create(dataRequest);
    }

    public async update(id: number, dataRequest: Resource): Promise<Resource> {
        return await resource.findByPk(id).then((response: any) => {
            return response.update(dataRequest);
        });
    }

    public async getAll(): Promise<Resource[]> {
        return await resource.findAll({
            include: [{
                model: laboratories,
                as: 'laboratory'
            }]
        });
    }

    public async getById(id: number): Promise<Resource> {
        return await resource.findByPk(id, {
            include: {
                model: laboratories,
                as: 'laboratory'
            }
        });
    }

    public async getByLaboratory(laboratory_id: number): Promise<Resource[]> {
        return await resource.findAll({
            where: {
                laboratory_id: laboratory_id,
                status: 'active'
            }
        });
    }

    public async delete(id: number): Promise<Resource> {
        return await resource.findByPk(id).then((response: any) => {
            return response.update({
                status: 'inactive'
            });
        });
    }
}

export default new ResourceRepository();