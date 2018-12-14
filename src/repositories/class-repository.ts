'use strict';

import { ClassInterface } from './../interfaces/class-interface';
import { Class } from '../models/attributes/class';
import { User } from "../models/attributes/user";

const { classe, user, topic } = require('../models/associations');

export class ClassRepository implements ClassInterface {

    public async create(dataRequest: Class): Promise<Class> {
        return await user.findOne({
            where: {
                id: dataRequest.teacher,
                role: 'teacher'
            }
        }).then((response: User) => {
            if (response) {
                dataRequest.teacher = response.id;
                return classe.create(dataRequest);
            } else {
                return null;
            }
        });
    }

    public async getAll(filter: Array<Object>): Promise<Class[]> {
        return await classe.findAll({ where: filter },
            {
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

    public async onlyClasses(teacher_id: number): Promise<Class[]> {
        return await classe.findAll({
            where: {
                teacher: teacher_id,
                status: 'active'
            }
        });
    }

    public async update(id: number, dataRequest: Class): Promise<Class> {
        return await classe.findByPk(id).then((response: any) => {
            return response.update(dataRequest);
        });
    }

    public async getByTeacher(teacher_id: number): Promise<Class[]> {
        return await classe.findAll({
            where: {
                teacher: teacher_id,
                status: 'active'
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

    public async delete(id: number): Promise<Class> {
        return await classe.findByPk(id).then((response: any) => {
            return response.update({
                status: 'inactive'
            });
        });
    }
}

export default new ClassRepository();