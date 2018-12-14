'use strict';

import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repositories/user-repository';
import { filterUser } from './../utils/user-filter.utils';

export class UserController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            const createdUser = await UserRepository.create(request.body);
            response.status(200).send(createdUser);
        } catch (e) {
            response.send({
                message: 'Não foi possível cadastrar esse usuário.'
            });
        }
    }

    public async update(request: Request, response: Response, next: NextFunction) {
        try {
            const updatedUser = await UserRepository.update(request.params.id, request.body);
            response.status(200).send(updatedUser);
        } catch (e) {
            response.send({
                message: 'Não foi possível atualizar esse usuário.'
            });
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const deletedUser = await UserRepository.delete(request.params.id);
            response.status(200).send(deletedUser);
        } catch (e) {
            response.send({
                message: 'Não foi possível deletar esse usuário.'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {

        const filter = new filterUser(request);
  
        try {    
            const users = await UserRepository.getUsers(filter.get());
            if (users.length === 0) {
                response.status(404).send({
                    message: 'no_results_found'
                });
            } else {
                response.status(200).send(users);
            }
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }

    public async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const user = await UserRepository.getUserById(request.params.id);
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

    public async getStudentsByClass(request: Request, response: Response, next: NextFunction) {
        try {
            const students = await UserRepository.getStudentsByClass(request.params.id);

            if (students == null) {
                response.status(200).send({
                    message: 'Nenhum estudante nesta classe.'
                });
            } else {
                response.status(200).send(students);
            }
        } catch (error) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}