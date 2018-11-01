'use strict';

import { Laboratory } from '../models/attributes/laboratory';

export interface LaboratoryInterface {

    create(dataRequest: Laboratory): Promise<Laboratory>;
    getAll(filter: Array<Object>): Promise<Laboratory[]>;
    getById(id: number): Promise<Laboratory>;
}