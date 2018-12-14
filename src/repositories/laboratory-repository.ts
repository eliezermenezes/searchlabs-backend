'use strict';

import { LaboratoryInterface } from './../interfaces/laboratory-interface';
import { Laboratory } from '../models/attributes/laboratory';

const { laboratories, resource } = require('../models/associations');

export class LaboratoryRepository implements LaboratoryInterface {
    
    public async create(dataRequest: Laboratory): Promise<Laboratory> {
        return await laboratories.create(dataRequest);
    }

    public async update(id: number, dataRequest: Laboratory): Promise<Laboratory> {
        return await laboratories.findByPk(id).then((response: any) => {
            return response.update(dataRequest);
        });
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

    public async onlyLaboratories(filter: Array<Object>): Promise<Laboratory[]> {
        return await laboratories.findAll({
            where: filter
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

    public async delete(id: number): Promise<Laboratory> {
        return await laboratories.findByPk(id).then((response: any) => {
            return response.update({
                status: 'inactive'
            });
        });
    }

    public async alterSituation(id: number, situation: string): Promise<Laboratory[]> {
        return await laboratories.findByPk(id).then((response: any) => {
            return response.update({
                situation: situation
            });
        });
    }
}

export default new LaboratoryRepository();
