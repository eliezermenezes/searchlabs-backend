'use struict';

import { ClassUserInterface } from '../interfaces/class_user-interface';
import { ClassUser } from '../models/attributes/class_user';

const { class_users } = require('../models/associations');

export class ClassUserRepository implements ClassUserInterface {

    public async associateUser(dataRequest: ClassUser): Promise<ClassUser> {
        return await class_users.create(dataRequest);
    }

    public async getAll(): Promise<ClassUser[]> {
        return await class_users.findAll();
    }
}

export default new ClassUserRepository();