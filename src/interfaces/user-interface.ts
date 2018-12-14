'use strict';

import { User } from '../models/attributes/user';

export interface UserInterface {

    create(dataRequest: User): Promise<User>;
    update(id: number | any, dataRequest: User): Promise<User>;
    getUsers(filter: Array<Object>): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getStudentsByClass(classid: number): Promise<User[]>;
    delete(id: number): Promise<boolean>;
    getUserByUsername(username: string): Promise<User>;
}