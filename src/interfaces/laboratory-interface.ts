'use strict';

import { Laboratory } from '../models/attributes/laboratory';

export interface LaboratoryInterface {

    create(dataRequest: Laboratory): Promise<Laboratory>;
    update(id: number, dataRequest: Laboratory): Promise<Laboratory>;
    getAll(filter: Array<Object>): Promise<Laboratory[]>;
    getById(id: number): Promise<Laboratory>;
    delete(id: number): Promise<Laboratory>;
    onlyLaboratories(filter: Array<Object>): Promise<Laboratory[]>;
    alterSituation(id: number, situation: string): Promise<Laboratory[]>;
}