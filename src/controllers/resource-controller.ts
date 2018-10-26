'use strict';

import { Request, Response, NextFunction } from 'express';
import ResourceRepository from './../repositories/resource-repository';

export class ResourceController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            let createdResource = await ResourceRepository.create(request.body);
            response.status(200).send(createdResource);
        } catch (e) {
            response.send({
                message: 'Não foi possível cadastrar esse recurso.'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {
        try {
            let resources = await ResourceRepository.getAll();
            response.status(200).send(resources);
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}