'use strict';

import { Request, Response, NextFunction } from 'express';
import ReservationRepository from "../repositories/reservation-repository";
import { ReservationFilter } from "../utils/reservation-filter";

export class ReservationController {

    public async register(request: Request, response: Response, next: NextFunction) {
        try {
            const reservationSolicitation = await ReservationRepository.register(request.body);
            response.status(200).send(reservationSolicitation);
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async addObservacao(request: Request, response: Response, next: NextFunction) {
        try {
            const observation = await ReservationRepository.addObservation(request.params.id, request.body.observation);
            if (observation == null) {
                response.status(200).send({
                    message: 'could_not_update_reservation'
                });
            } else {
                response.status(200).send(observation);
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {

        const filter = new ReservationFilter(request);
        try {
            const reservations = await ReservationRepository.getAll(filter.get());
            if (reservations.length === 0) {
                response.status(404).send({
                    message: 'results_not_found'
                });
            } else {
                response.status(200).send(reservations);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async getByLaboratory(request: Request, response: Response, next: NextFunction) {

        try {
            const reservations = await ReservationRepository.getByLaboratory(request.params.laboratory);
            if (reservations.length === 0) {
                response.status(404).send({
                    message: 'results_not_found'
                });
            } else {
                response.status(200).send(reservations);
            }
        } catch (e) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const reservation = await ReservationRepository.getById(request.params.id);

            if (reservation == null) {
                response.status(200).send({
                    message: 'reservation_not_found'
                });
            } else {
                response.status(200).send(reservation);
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const reservationDeleted = await ReservationRepository.delete(request.params.id);
            if (reservationDeleted) {
                response.status(200).send(reservationDeleted);
            } else {
                response.status(400).send({
                    message: 'could_not_delete_reservation'
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
            const reservationCanceled = await ReservationRepository.cancel(request.params.id);
            if (reservationCanceled) {
                response.status(200).send(reservationCanceled);
            } else {
                response.status(400).send({
                    message: 'reservation_not_canceled'
                });
            }
        } catch (error) {
            response.status(500).send({
                message: 'failed_to_process_your_request'
            });
        }
    }
}