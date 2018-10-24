'use strict';

import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/user-repository';

export class UserController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            let createdUser = await UserRepository.create(request.body);
            response.status(200).send(createdUser);
        } catch (e) {
            response.send({
                message: 'Não foi possível cadastrar esse usuário.'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {
        try {
            let users = await UserRepository.getAll();
            response.status(200).send(users);
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}