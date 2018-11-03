'use strict';

import { SolicitationInterface } from './../interfaces/solicitation-interface';
import { Solicitation } from './../models/attributes/solicitation';
import ReservationRepository from "./reservation-repository";
import { SolicitationUtils } from "./utils/SolicitationUtils";

const { solicitation, laboratories, classe, user } = require('../models/associations');

export class SolicitationRepository implements SolicitationInterface {

    public async register(dataRequest: Solicitation): Promise<Solicitation> {
        return await solicitation.create(dataRequest);
    }

    public async update(id: number, dataRequest: Solicitation): Promise<Solicitation> {
        return await solicitation.find();
    }

    public async getAll(): Promise<Solicitation[]> {
        return await solicitation.findAll({
            include: [{
                model: laboratories,
                as: 'laboratory'
            },
            {
                model: classe,
                as: 'class',
                include: [{
                    model: user,
                    as: 'instructor'
                }]
            }]
        });
    }

    public async getById(id: number): Promise<Solicitation> {
        return await solicitation.findByPk(id, {
            include: [{
                model: laboratories,
                as: 'laboratory'
            },
            {
                model: classe,
                as: 'class'
            }]
        });
    }

    public async delete(id: number): Promise<Solicitation> {
        return await solicitation.findByPk(id).then((response: any) => {
            if (SolicitationUtils.isOpenedOrAccepted(response.situation)) {
                return false;
            }
            return response.update({
                status: 'inactive'
            });
        });
    }

    public async cancel(id: number, description: string): Promise<Solicitation> {
        return await solicitation.findByPk(id).then((response: any) => {
            if (SolicitationUtils.isNotOpened(response.situation)) {
                return false;
            }
            return response.update(
                SolicitationUtils.setSituation('canceled', description)
            );
        });
    }

    public async accept(id: number, description_answer: string): Promise<Solicitation> {
        return await solicitation.findByPk(id).then((response: any) => {
            if (SolicitationUtils.isNotOpened(response.situation)) {
                return false;
            }
            ReservationRepository.register(response);
            return response.update(
                SolicitationUtils.setSituation('accepted', description_answer)
            );
        });
    }

    public async refuse(id: number, description_answer: string): Promise<Solicitation> {
        return await solicitation.findByPk(id).then((response: any) => {
            if (SolicitationUtils.isNotOpened(response.situation)) {
                return false;
            }
            return response.update(
                SolicitationUtils.setSituation('refused', description_answer)
            );
        });
    }
}

export default new SolicitationRepository();