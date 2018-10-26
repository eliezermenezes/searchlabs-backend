'use strict';

import { Request, Response, NextFunction } from 'express';
import SolicitationRepository from '../repositories/solicitation-repository';

export class SolicitationController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            let registedSolicitation = await SolicitationRepository.register(request.body);
            response.status(200).send(registedSolicitation);
        } catch (e) {
            response.send({
                message: 'Não foi possível registrar essa solicitação.'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {
        try {
            let solicitations = await SolicitationRepository.getAll();
            response.status(200).send(solicitations);
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}