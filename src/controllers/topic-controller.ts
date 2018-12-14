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

        try {
            const topics = await TopicRepository.getByClass(request.params.class);
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

    public async patch(request: Request, response: Response, next: NextFunction) {
        try {
            let updatedTopic = await TopicRepository.update(request.params.id, request.body);
            if (updatedTopic) {
                response.status(200).send(updatedTopic);
            } else {
                response.status(400).send({
                    message: 'topic_not_updated'
                });
            }
        } catch (e) {
            response.send({
                message: 'Não foi possível atualizar esse tópico.'
            });
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction) {
        try {
            let topicDeleted = await TopicRepository.delete(request.params.id);
            if (!topicDeleted) {
                response.status(400).send({
                    message: 'topic_not_deleted'
                });
            } else {
                response.status(200).send(topicDeleted);
            }
        } catch (e) {
            response.status(500).send({
                message: 'Falha ao processar sua requisição.'
            });
        }
    }
}