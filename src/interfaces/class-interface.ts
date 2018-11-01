'use strict';

import { Class } from '../models/attributes/class';

export interface ClassInterface {

    create(dataRequest: Class): Promise<Class>;
    getAll(): Promise<Class[]>;
    getByTeacher(teacher_id: number): Promise<Class[]>;
    getById(id: number): Promise<Class>;
}