'use strict';

import { Solicitation } from './../models/attributes/solicitation';

export interface SolicitationInterface {

    register(dataRequest: Solicitation): Promise<Solicitation>;

    update(id: number, dataRequest: Solicitation): Promise<Solicitation>;

    getAll(): Promise<Solicitation[]>;

    getById(id: number): Promise<Solicitation>

    delete(id: number): Promise<Solicitation>;

    cancel(id: number, description: string): Promise<Solicitation>;

    accept(id: number, description_answer: string): Promise<Solicitation>;

    refuse(id: number, description_answer: string): Promise<Solicitation>;
}