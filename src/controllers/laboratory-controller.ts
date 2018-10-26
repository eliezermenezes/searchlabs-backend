'use strict';

import { Request, Response, NextFunction } from 'express';
import LaboratoryRepository from '../repositories/laboratory-repository';

export class LaboratoryController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            let createdLaboratory = await LaboratoryRepository.create(request.body);
            response.status(200).send(createdLaboratory);
        } catch (e) {
            response.send({
                message: 'Não foi possível cadastrar esse laboratório.'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {
        try {
            let laboratories = await LaboratoryRepository.getAll();
            response.status(200).send(laboratories);
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}