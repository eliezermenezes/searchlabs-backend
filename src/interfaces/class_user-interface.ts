'use strict';

import { ClassUser } from '../models/attributes/class_user';

export interface ClassUserInterface {

    associateUser(dataRequest: ClassUser): Promise<ClassUser>;
    getAll(): Promise<ClassUser[]>;
}