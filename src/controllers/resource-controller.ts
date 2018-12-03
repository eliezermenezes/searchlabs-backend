'use strict';

import { Request, Response, NextFunction } from 'express';
import ResourceRepository from './../repositories/resource-repository';

export class ResourceController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            let createdResource = await ResourceRepository.create(request.body);
            if (createdResource) {
                response.status(201).send(createdResource);
            } else {
                response.status(400).send({
                    message: 'resource_not_created'
                });
            }
        } catch (e) {
            response.send({
                message: 'Não foi possível cadastrar esse recurso.'
            });
        }
    }

    public async patch(request: Request, response: Response, next: NextFunction) {
        try {
            let updatedResource = await ResourceRepository.update(request.params.id, request.body);
            if (updatedResource) {
                response.status(200).send(updatedResource);
            } else {
                response.status(400).send({
                    message: 'resource_not_updated'
                });
            }
        } catch (e) {
            response.send({
                message: 'Não foi possível atualizar esse recurso.'
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
        try {
            let resources = await ResourceRepository.getByLaboratory(request.params.lab);
            if (resources.length == 0) {
                response.status(404).send({
                    message: 'results_not_found'
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

    public async delete(request: Request, response: Response, next: NextFunction) {
        try {
            let resourceDeleted = await ResourceRepository.delete(request.params.id);
            if (!resourceDeleted) {
                response.status(400).send({
                    message: 'resource_not_deleted'
                });
            } else {
                response.status(200).send(resourceDeleted);
            }
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}