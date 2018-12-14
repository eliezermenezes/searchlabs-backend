'use strict';

import { ReservationInterface } from "../interfaces/reservation-interface";
import { Reservation } from "../models/attributes/reservation";
import { ReservationUtils } from "./utils/reservation-utils";
import { Solicitation } from "../models/attributes/solicitation";
import OccupationMapRepository from "./occupation_map-repository";
import moment from "moment";
const { reservations, solicitation, laboratories, classe, occupation_maps, user } = require('../models/associations');

export class ReservationRepository implements ReservationInterface {

    public async register(dataRequest: Solicitation | any): Promise<Reservation> {
        return await reservations.create({solicitation_id: dataRequest.id}).then((response: any) => {
            let data = ReservationUtils.setData(response, dataRequest);
            if (ReservationUtils.isRepeate(dataRequest.repeate || 'no')) {

                const dataRepeate = ReservationUtils.dataRepeate(data, dataRequest);
                const everyDay: Array<moment.Moment> = ReservationUtils.createArrayWithAllDates(dataRepeate.startDate, dataRepeate.endDate);
                const everyDayValids: Array<moment.Moment> = ReservationUtils.getDatasValids(everyDay, dataRepeate.daysWeek);

                everyDayValids.forEach((date: moment.Moment) => {
                    data.date = date;
                    OccupationMapRepository.add(data);
                })
            } else {
                OccupationMapRepository.add(data);
            }
        });
    }

    public async addObservation(id: number, observation: string): Promise<Reservation> {
        return await reservations.findByPk(id).then((response: any) => {
            return response.update({
                observation: observation
            });
        });
    }

    public async getAll(filter: Array<Object>): Promise<Reservation[]> {
        return await reservations.findAll({
            where: filter,
            include: {
                model: solicitation,
                as: 'solicitation',
                include: [{
                    model: laboratories,
                    as: 'laboratory'
                },{
                    model: classe,
                    as: 'class',
                    include: [{
                        model: user,
                        as: 'instructor'
                    }]
                }]
            }
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

    public async getByLaboratory(laboratory: number): Promise<Reservation[]> {
        return await reservations.findAll({
            where: {
                status: 'active'
            },
            include: [{
                model: solicitation,
                as: 'solicitation',
                where: {
                    laboratory_id: laboratory
                },
                include: [{
                    model: laboratories,
                    as: 'laboratory'
                }, {
                    model: classe,
                    as: 'class'
                }]
            }, {
                model: occupation_maps,
                as: 'occupation_maps'
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