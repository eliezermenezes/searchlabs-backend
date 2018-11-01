'use strict';

import { Request, Response, NextFunction } from 'express';
import LaboratoryRepository from '../repositories/laboratory-repository';
import { filterLaboratory } from '../utils/laboratory-filter.utils';

export class LaboratoryController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            const createdLaboratory = await LaboratoryRepository.create(request.body);
            response.status(200).send(createdLaboratory);
        } catch (e) {
            response.send({
                message: 'Não foi possível cadastrar esse laboratório.'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {

        const filter = new filterLaboratory(request);

        try {
            const laboratories = await LaboratoryRepository.getAll(filter.get());
            response.status(200).send(laboratories);
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }

    public async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const laboratory = await LaboratoryRepository.getById(request.params.id);
            if (laboratory == null) {
                response.status(200).send({
                    message: 'Laboratório não encontrado.'
                });
            } else {
                response.status(200).send(laboratory);
            }
        } catch (error) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}