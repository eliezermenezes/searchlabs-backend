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

            const params = request.body;
            let name = params.name !== undefined ? params.name : '';

            if (params.name !== undefined && params.name !== null) {
                name = params.name;
            }
            
            let users = await UserRepository.getAll(name);
            response.status(200).send(users);
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }

    public async getById(request: Request, response: Response, next: NextFunction) {
        try {
            let user = await UserRepository.getUser(request.params.id);
            if (user == null) {
                response.status(200).send({
                    message: 'Usuário não encontrado.'
                });
            } else {
                response.status(200).send(user);
            }
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}