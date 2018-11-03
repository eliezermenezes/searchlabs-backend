'use strict';

import { UserInterface } from './../interfaces/user-interface';
import { User } from '../models/attributes/user';

const { user, classe } = require('../models/associations');

export class UserRepository implements UserInterface {

    public async create(dataRequest: User): Promise<User> {
        return await user.create(dataRequest);
    }

    public async getAll(filter: Array<Object>): Promise<User[]> {
        return await user.findAll({
            where: filter,
            include: [{
                model: classe,
                as: 'classes'
            }]
        });
    }

    public async getUser(id: number): Promise<User> {
        return await user.findByPk(id, {
            include: [{
                model: classe,
                as: 'classes'
            }]
        });
    }

    public async getStudentsByClass(classid: number): Promise<User[]> {
        return await classe.findByPk(classid, {
            include: {
                model: user,
                as: 'students'
            }
        });
    }
}

export default new UserRepository();
