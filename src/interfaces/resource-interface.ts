'use strict';

import { Resource } from '../models/attributes/resource';

export interface ResourceInterface {

    create(dataRequest: Resource): Promise<Resource>;
    getAll(): Promise<Resource[]>;
}