'use strict';

import { Topic } from '../models/attributes/topic';

export interface TopicInterface {

    create(dataRequest: Topic): Promise<Topic>;
    getAll(): Promise<Topic[]>;
    getById(id: number): Promise<Topic>;
    getByClass(class_id: number): Promise<Topic[]>;
    update(id: number, dataRequest: Topic): Promise<Topic>;
    delete(id: number): Promise<Topic>;
}