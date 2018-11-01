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

    public async getById(request: Request, response: Response, next: NextFunction) {
        try {
            let resource = await ResourceRepository.getById(request.params.id);
            if (resource == null) {
                response.status(200).send({
                    message: 'Recurso não encontrado.'
                });
            } else {
                response.status(200).send(resource);
            }
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }

    public async getByLaboratory(request: Request, response: Response, next: NextFunction) {

        if (!request.body.laboratory) {
            response.status(400).send({
                message: 'Informe um laboratório.'
            });
            return;
        }

        try {
            let resources = await ResourceRepository.getByLaboratory(request.body.laboratory);
            if (resources.length == 0 || resources == null) {
                response.status(200).send({
                    message: 'Laboratório não possui nenhum recurso.'
                });
            } else {
                response.status(200).send(resources);
            }
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}