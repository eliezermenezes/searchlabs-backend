'use strict';

import { Laboratory } from '../models/attributes/laboratory';

export interface LaboratoryInterface {

    create(dataRequest: Laboratory): Promise<Laboratory>;
    getAll(): Promise<Laboratory[]>;
}