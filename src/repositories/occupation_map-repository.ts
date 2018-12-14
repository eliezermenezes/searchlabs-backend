'use strict';

import { OccupationMapInterface } from "../interfaces/occupation_map-interface";
const { occupation_maps } = require('../models/associations');

export class OccupationMapRepository implements OccupationMapInterface {
    
    public async add(dataRequest: Object): Promise<Object> {
        return await occupation_maps.create(dataRequest);
    }

    public async get(): Promise<Object[]> {
        return await occupation_maps.getAll();
    }
}

export default new OccupationMapRepository();