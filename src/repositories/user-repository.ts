'use struict';

import { UserInterface } from './../interfaces/user-interface';
import { User } from './../models/user';

const { users } = require('../models');

export class UserRepository implements UserInterface {
    
    public async create(data: User): Promise<User> {
        return await users.create(data);
    }

    public async getAll(): Promise<User[]> {
        return await users.findAll();
    }
}

export default new UserRepository();