'use struict';

import { SolicitationInterface } from './../interfaces/solicitation-interface';
import { Solicitation } from './../models/attributes/solicitation';

const { solicitation, laboratories, classe, user } = require('../models/associations');

export class SolicitationRepository implements SolicitationInterface {

    public async register(dataRequest: Solicitation): Promise<Solicitation> {
        return await solicitation.create(dataRequest);
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
}

export default new SolicitationRepository();