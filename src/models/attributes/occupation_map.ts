'use strict';

export class OccupationMap {
    public id?: number;
    public reservation_id?: number;
    public date?: Date;
    public start_hour?: string;
    public end_hour?: string;
    public createdAt?: Date;
    public updatedAt?: Date;
}

export default new OccupationMap();