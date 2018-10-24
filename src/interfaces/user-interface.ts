'use strict';

import { User } from './../models/user';

export interface UserInterface {

    create(data: User): Promise<User>;
    getAll(): Promise<User[]>;
}