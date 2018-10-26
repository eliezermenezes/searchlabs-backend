'use strict';

import { User } from '../models/attributes/user';

export interface UserInterface {

    create(dataRequest: User): Promise<User>;
    getAll(): Promise<User[]>;
}