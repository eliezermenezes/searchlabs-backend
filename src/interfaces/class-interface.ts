'use strict';

import { Class } from '../models/attributes/class';

export interface ClassInterface {

    create(dataRequest: Class): Promise<Class>;
    getAll(filter: Array<Object>): Promise<Class[]>;
    update(id: number, dataRequest: Class): Promise<Class>;
    getByTeacher(teacher_id: number): Promise<Class[]>;
    getById(id: number): Promise<Class>;
    delete(id: number): Promise<Class>;
    onlyClasses(teacher_id: number): Promise<Class[]>;
}