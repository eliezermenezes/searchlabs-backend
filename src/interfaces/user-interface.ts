'use strict';

import { User } from '../models/attributes/user';

export interface UserInterface {

    create(dataRequest: User): Promise<User>;
    getAll(name: string): Promise<User[]>;
    getUser(id: number): Promise<User>;
}