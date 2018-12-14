'use strict';

export class Reservation {
    public id?: number;
    public solicitation_id?: number;
    public situation?: string;
    public observation?: string;
    public status?: string;
    public createdAt?: Date;
    public updatedAt?: Date;
}

export default new Reservation();