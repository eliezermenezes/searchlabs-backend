'use strict';

import { Solicitation } from './../models/attributes/solicitation';
import { User } from "../models/attributes/user";

export interface SolicitationInterface {

    register(dataRequest: Solicitation): Promise<Solicitation>;

    update(id: number, dataRequest: Solicitation): Promise<Solicitation>;

    getAll(filter: Array<Object>, teacher?: User): Promise<Solicitation[]>;

    getById(id: number): Promise<Solicitation>

    delete(id: number): Promise<Solicitation>;

    cancel(id: number, description: string): Promise<Solicitation>;

    accept(id: number, description_answer: string): Promise<Solicitation>;

    refuse(id: number, description_answer: string): Promise<Solicitation>;
}