'use strict';

import { Request, Response, NextFunction } from 'express';
import ClassUserRepository from './../repositories/class_user-repository';

export class ClassUserController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            let associateUser = await ClassUserRepository.associateUser(request.body);
            response.status(200).send(associateUser);
        } catch (e) {
            response.send({
                message: 'Não foi possível o usuário à turma.'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {
        try {
            let associates = await ClassUserRepository.getAll();
            response.status(200).send(associates);
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}