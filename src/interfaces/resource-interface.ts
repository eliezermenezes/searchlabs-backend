'use strict';

import { Resource } from '../models/attributes/resource';

export interface ResourceInterface {

    create(dataRequest: Resource): Promise<Resource>;
    update(id: number, dataRequest: Resource): Promise<Resource>;
    getAll(): Promise<Resource[]>;
    getById(id: number): Promise<Resource>;
    getByLaboratory(laboratory_id: number): Promise<Resource[]>;
    delete(id: number): Promise<Resource>
}