'use struict';

import { ReservationInterface } from "../interfaces/reservation-interface";
import { Reservation } from "../models/attributes/reservation";
import { ReservationUtils } from "./utils/reservation-utils";
import { Solicitation } from "../models/attributes/solicitation";
const { reservations, solicitation, occupation_maps } = require('../models/associations');

export class ReservationRepository implements ReservationInterface {

    public register(dataRequest: Solicitation): any {

        reservations.create({solicitation_id: dataRequest.id}).then((response: any) => {

            if (ReservationUtils.isRepeate(dataRequest.repeate || 'no')) {

            } else {
                occupation_maps.create({
                    reservation_id: response.id,
                    date: dataRequest.start_date,
                    start_hour: dataRequest.start_hour,
                    end_hour: dataRequest.end_hour
                });
            }
        });

        /*
        id      reservation_id	        date	        start_hour	        end_hour
        */

        /*
        {
             start_date: '2018-12-01',
             end_date: '2018-12-01',
             start_hour: '10:00:00',
             end_hour: '11:45:00',
             repeate: 'no',
             days_week: null,
             laboratory_id: 2,
             class_id: 6
          }
        */

        //return await reservations.create(dataRequest);
    }

    public async addObservation(id: number, observation: string): Promise<Reservation> {
        return await reservations.findByPk(id).then((response: any) => {
            return response.update({
                observation: observation
            });
        });
    }

    public async getAll(): Promise<Reservation[]> {
        return await reservations.findAll({
            include: [{
                model: solicitation,
                as: 'solicitation'
            }]
        });
    }

    public async getById(id: number): Promise<Reservation> {
        return await reservations.findByPk(id, {
            include: [{
                model: solicitation,
                as: 'solicitation'
            }]
        });
    }

    public async delete(id: number): Promise<Reservation> {
        return await reservations.findByPk(id).then((response: any) => {
            if (ReservationUtils.isInProgress(response.situation)) {
                return false;
            }
            return response.update({
                status: 'inactive'
            });
        });
    }

    public async cancel(id: number): Promise<Reservation> {
        return await reservations.findByPk(id).then((response: any) => {
            if (!ReservationUtils.isInProgress(response.situation)) {
                return false;
            }
            return response.update({
                situation: 'canceled'
            });
        });
    }
}

export default new ReservationRepository();