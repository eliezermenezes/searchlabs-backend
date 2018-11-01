'use strict';

import { Request, Response, NextFunction } from 'express';
import TopicRepository from './../repositories/topic-repository';

export class TopicController {

    public async post(request: Request, response: Response, next: NextFunction) {
        try {
            const createdTopic = await TopicRepository.create(request.body);
            response.status(200).send(createdTopic);
        } catch (e) {
            response.send({
                message: 'Não foi possível cadastrar esse tópico.'
            });
        }
    }

    public async get(request: Request, response: Response, next: NextFunction) {
        try {
            const topics = await TopicRepository.getAll();
            response.status(200).send(topics);
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }

    public async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const topic = await TopicRepository.getById(request.params.id);
            if (topic == null) {
                response.status(200).send({
                    message: 'Tópico não encontrado.'
                });
            } else {
                response.status(200).send(topic);
            }
        } catch (error) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }

    public async getByClass(request: Request, response: Response, next: NextFunction) {

        if (request.body.class == undefined || request.body.class == "") {
            response.status(400).send({
                message: 'Informe uma classe.'
            });
            return;
        }

        try {
            const topics = await TopicRepository.getByClass(request.body.class);
            if (topics.length == 0 || topics == null) {
                response.status(200).send({
                    message: 'Essa turma não possui nenhum tópico.'
                });
            } else {
                response.status(200).send(topics);
            }
        } catch (error) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}