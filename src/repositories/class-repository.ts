'use strict';

import { ClassInterface } from './../interfaces/class-interface';
import { Class } from '../models/attributes/class';

const { classe, user, topic } = require('../models/associations');

export class ClassRepository implements ClassInterface {

    public async create(dataRequest: Class): Promise<Class> {
        return await classe.create(dataRequest);
    }

    public async getAll(): Promise<Class[]> {
        return await classe.findAll({
            include: [{
                model: user,
                as: 'instructor'
            },
            {
                model: topic,
                as: 'topics'
            },
            {
                model: user,
                as: 'students'
            }]
        });
    }

    public async getByTeacher(teacher_id: number): Promise<Class[]> {
        return await classe.findAll({
            where: {
                teacher: teacher_id
            },
            include: [{
                model: topic,
                as: 'topics'
            }]
        });
    }

    public async getById(id: number): Promise<Class> {
        return await classe.findByPk(id, {
            include: [{
                model: user,
                as: 'instructor'
            },
            {
                model: topic,
                as: 'topics'
            }]
        });
    }
}

export default new ClassRepository();