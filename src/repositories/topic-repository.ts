'use strict';

import { TopicInterface } from '../interfaces/topic-interface';
import { Topic } from '../models/attributes/topic';

const { topic, classe } = require('../models/associations');

export class TopicRepository implements TopicInterface {

    public async create(dataRequest: Topic): Promise<Topic> {
        return await topic.create(dataRequest);
    }

    public async getAll(): Promise<Topic[]> {
        return await topic.findAll({
            include: [{
                model: classe,
                as: 'class'
            }]
        });
    }

    public async getById(id: number): Promise<Topic> {
        return await topic.findByPk(id, {
            include: [{
                model: classe,
                as: 'class'
            }]
        });
    }

    public async getByClass(class_id: number): Promise<Topic[]> {
        return await topic.findAll({
            where: {
                class_id: class_id,
                status: 'active'
            }
        });
    }

    public async update(id: number, dataRequest: Topic): Promise<Topic> {
        return await topic.findByPk(id).then((response: any) => {
            return response.update(dataRequest);
        });
    }

    public async delete(id: number): Promise<Topic> {
        return await topic.findByPk(id).then((response: any) => {
            return response.update({
                status: 'inactive'
            });
        });
    }
}

export default new TopicRepository();