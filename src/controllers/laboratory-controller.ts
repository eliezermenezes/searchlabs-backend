'use strict';

import { Request, Response, NextFunction } from 'express';
import LaboratoryRepository from '../repositories/laboratory-repository';
import { filterLaboratory } from '../utils/laboratory-filter.utils';

export class LaboratoryController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            const createdLaboratory = await LaboratoryRepository.create(request.body);
            if (createdLaboratory) {
                response.status(201).send(createdLaboratory);
            } else {
                response.status(400).send({
                    message: 'laboratory_not_created'
                });
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async patch(request: Request, response: Response, next: NextFunction) {
        try {
            const updatedLaboratory = await LaboratoryRepository.update(request.params.id, request.body);
            if (updatedLaboratory) {
                response.status(200).send(updatedLaboratory);
            } else {
                response.status(400).send({
                    message: 'laboratory_not_updated'
                });
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {

        const filter = new filterLaboratory(request);

        try {
            const laboratories = await LaboratoryRepository.getAll(filter.get());
            if (laboratories.length === 0) {
                response.status(404).send({
                    message: 'results_not_found'
                });
            } else {
                response.status(200).send(laboratories);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async onlyLaboratories(request: Request, response: Response, next: NextFunction) {

        const filter = new filterLaboratory(request);

        try {
            const laboratories = await LaboratoryRepository.onlyLaboratories(filter.get());
            if (laboratories.length === 0) {
                response.status(404).send({
                    message: 'results_not_found'
                });
            } else {
                response.status(200).send(laboratories);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const laboratory = await LaboratoryRepository.getById(request.params.id);
            if (!laboratory) {
                response.status(404).send({
                    message: 'laboratory_not_found'
                });
            } else {
                response.status(200).send(laboratory);
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const laboratoryDeletet = await LaboratoryRepository.delete(request.params.id);
            if (!laboratoryDeletet) {
                response.status(404).send({
                    message: 'laboratory_not_found'
                });
            } else {
                response.status(200).send(laboratoryDeletet);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async alterSituation(request: Request, response: Response, next: NextFunction) {
        try {
            const laboratory = await LaboratoryRepository.alterSituation(request.params.id, request.body.situation);
            if (!laboratory) {
                response.status(404).send({
                    message: 'situation_not_changed'
                });
            } else {
                response.status(200).send(laboratory);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }
}