'use strict';

import { Request, Response, NextFunction } from 'express';
import ClassRepository from '../repositories/class-repository';

export class ClassController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {

            
            let createdClass = await ClassRepository.create(request.body);

            
            response.status(200).send(createdClass);
        } catch (e) {
            response.send({
                message: 'Não foi possível cadastrar essa classe.'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {
        try {
            let classes = await ClassRepository.getAll();
            response.status(200).send(classes);
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}