'use strict';

import { Request, Response, NextFunction } from 'express';
import ClassRepository from '../repositories/class-repository';

export class ClassController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            const createdClass = await ClassRepository.create(request.body);
            response.status(200).send(createdClass);
        } catch (e) {
            response.send({
                message: 'Não foi possível cadastrar essa classe.'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {
        try {
            const classes = await ClassRepository.getAll();
            response.status(200).send(classes);
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }

    public async getByTeacher(request: Request, response: Response, next: NextFunction) {
        if (request.body.teacher == undefined || request.body.teacher == "") {
            response.status(400).send({
                message: 'Informe um professor.'
            });
            return;
        }
        try {
            const classes = await ClassRepository.getByTeacher(request.body.teacher);
            if (classes.length == 0 || classes == null) {
                response.status(200).send({
                    message: 'Professor não possui nenhuma turma'
                });
            } else {
                response.status(200).send(classes);
            }
        } catch (error) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }

    public async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const classe = await ClassRepository.getById(request.params.id);
            if (classe == null) {
                response.status(200).send({
                    message: 'Turma não encontrada.'
                });
            } else {
                response.status(200).send(classe);
            }
        } catch (error) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}