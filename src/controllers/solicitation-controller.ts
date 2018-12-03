'use strict';

import { Request, Response, NextFunction } from 'express';
import SolicitationRepository from '../repositories/solicitation-repository';
import { SolicitationFilter } from "../utils/solicitation-filter";

export class SolicitationController {

    public async post(request: Request, response: Response, next: NextFunction) {

        let data = {
            laboratory_id: request.body.laboratory.id,
            class_id: request.body.class.id,
            start_date: request.body.date.start,
            end_date: request.body.date.end,
            start_hour: request.body.schedule.start,
            end_hour: request.body.schedule.end,
            repeate: request.body.repeate,
            days_week: request.body.repeate ? request.body.days_week : null,
            observation: request.body.observation
        };

        try {
            const registedSolicitation = await SolicitationRepository.register(data);
            response.status(200).send(registedSolicitation);
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async update(request: Request, response: Response, next: NextFunction) {

        let data = {
            laboratory_id: request.body.laboratory.id,
            class_id: request.body.class.id,
            start_date: request.body.date.start,
            end_date: request.body.date.end,
            start_hour: request.body.schedule.start,
            end_hour: request.body.schedule.end,
            repeate: request.body.repeate,
            days_week: request.body.repeate ? request.body.days_week : null,
            observation: request.body.observation
        };
        try {
            const solicitationUpdated = await SolicitationRepository.update(request.params.id, data);
            if (solicitationUpdated == null) {
                response.status(200).send({
                    message: 'could_not_update_solicitation'
                });
            } else {
                response.status(200).send(solicitationUpdated);
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async get(request: Request | any, response: Response, next: NextFunction) {

        const filter = new SolicitationFilter(request);
        try {
            const solicitations = await SolicitationRepository.getAll(filter.get(), request.data.user);
            if (solicitations.length === 0) {
                response.status(404).send({
                    message: 'results_not_found'
                });
            } else {
                response.status(200).send(solicitations);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const solicitation = await SolicitationRepository.getById(request.params.id);

            if (solicitation == null) {
                response.status(200).send({
                    message: 'solicitation_not_found'
                });
            } else {
                response.status(200).send(solicitation);
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const solicitationDeleted = await SolicitationRepository.delete(request.params.id);
            if (solicitationDeleted) {
                response.status(200).send(solicitationDeleted);
            } else {
                response.status(400).send({
                    message: 'could_not_delete_solicitation'
                });
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async cancel(request: Request, response: Response, next: NextFunction) {
        try {
            const solicitationCanceled = await SolicitationRepository.cancel(request.params.id, request.body.answer_description);
            if (solicitationCanceled) {
                response.status(200).send(solicitationCanceled);
            } else {
                response.status(400).send({
                    message: 'solicitation_not_canceled'
                });
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }


    public async accept(request: Request, response: Response, next: NextFunction) {
        try {
            const solicitationAccepted = await SolicitationRepository.accept(request.params.id, request.body.answer_description);
            if (solicitationAccepted) {
                response.status(200).send(solicitationAccepted);
            } else {
                response.status(400).send({
                    message: 'could_not_accept_solicitation'
                });
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async refuse(request: Request, response: Response, next: NextFunction) {
        try {
            const solicitationRefused = await SolicitationRepository.refuse(request.params.id, request.body.answer_description);
            if (solicitationRefused) {
                response.status(200).send(solicitationRefused);
            } else {
                response.status(400).send({
                    message: 'solicitation_already_answered_before'
                });
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }
}