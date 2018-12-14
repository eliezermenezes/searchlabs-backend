'use strict';

import { UserInterface } from './../interfaces/user-interface';
import { User } from '../models/attributes/user';

const { user, classe } = require('../models/associations');

export class UserRepository implements UserInterface {

    public async create(dataRequest: User): Promise<User> {
        return await user.create(dataRequest);
    }

    public async delete(id: number): Promise<boolean> {
        return await user.findByPk(id).then((response: any) => {
            return response.update({
                status: 'inactive'
            });
        });
    }

    public async update(id: number | any, dataRequest: User): Promise<User> {
        return await user.findByPk(id).then((response: any) => {
            return response.update(dataRequest);
        });
    }

    public async getUsers(filter: Array<Object>): Promise<User[]> {
        return await user.findAll({
            where: filter
        });
    }

    public async getUserById(id: number): Promise<User> {
        return await user.findByPk(id);
    }

    public async getStudentsByClass(classid: number): Promise<User[]> {
        return await classe.findByPk(classid, {
            include: {
                model: user,
                as: 'students'
            }
        });
    }

    public async getUserByUsername(username: string): Promise<User> {
        return await user.findOne({
            where: {
                username: username,
                status: 'active'
            }
        });
    }
}

export default new UserRepository();
