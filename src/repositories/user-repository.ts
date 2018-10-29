'use struict';

import { UserInterface } from './../interfaces/user-interface';
import { User } from '../models/attributes/user';

const { user, classe } = require('../models/associations');

export class UserRepository implements UserInterface {

    public async create(dataRequest: User): Promise<User> {
        return await user.create(dataRequest);
    }

    public async getAll(name: string): Promise<User[]> {
        return await user.findAll({
            include: [{
                model: classe,
                as: 'classes'
            },
            {
                model: classe,
                as: 'turmas'
            }],
            where: {
                status: 'active',
            }
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
}

export default new UserRepository();
