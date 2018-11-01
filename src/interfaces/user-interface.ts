'use strict';

import { User } from '../models/attributes/user';

export interface UserInterface {

    create(dataRequest: User): Promise<User>;
    getAll(filter: Array<Object>): Promise<User[]>;
    getUser(id: number): Promise<User>;
    getStudentsByClass(classid: number): Promise<User[]>;
}