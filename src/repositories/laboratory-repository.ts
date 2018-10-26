'use struict';

import { LaboratoryInterface } from './../interfaces/laboratory-interface';
import { Laboratory } from '../models/attributes/laboratory';

const { laboratories, resource } = require('../models/associations');

export class LaboratoryRepository implements LaboratoryInterface {
    
    public async create(dataRequest: Laboratory): Promise<Laboratory> {
        return await laboratories.create(dataRequest);
    }

    public async getAll(): Promise<Laboratory[]> {
        return await laboratories.findAll({
            include: [{
                model: resource,
                as: 'resources'
            }]
        });
    }
}

export default new LaboratoryRepository();