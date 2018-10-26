'use strict';

import { Request, Response, NextFunction } from 'express';
import TopicRepository from './../repositories/topic-repository';

export class TopicController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            let createdTopic = await TopicRepository.create(request.body);
            response.status(200).send(createdTopic);
        } catch (e) {
            response.send({
                message: 'Não foi possível cadastrar esse tópico.'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {
        try {
            let topics = await TopicRepository.getAll();
            response.status(200).send(topics);
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}