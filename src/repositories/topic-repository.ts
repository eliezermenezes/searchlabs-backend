'use struict';

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
}

export default new TopicRepository();