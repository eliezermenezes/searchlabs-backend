'use struict';

import { LaboratoryInterface } from './../interfaces/laboratory-interface';
import { Laboratory } from '../models/attributes/laboratory';

const { laboratories, resource } = require('../models/associations');

export class LaboratoryRepository implements LaboratoryInterface {
    
    public async create(dataRequest: Laboratory): Promise<Laboratory> {
        return await laboratories.create(dataRequest);
    }

    public async getAll(filter: Array<Object>): Promise<Laboratory[]> {
        return await laboratories.findAll({
            where: filter,
            include: [{
                model: resource,
                as: 'resources'
            }]
        });
    }

    public async getById(id: number): Promise<Laboratory> {
        return await laboratories.findByPk(id, {
            include: {
                model: resource,
                as: 'resources'
            }
        });
    }
}

export default new LaboratoryRepository();
