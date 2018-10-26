'use strict';

import { Solicitation } from './../models/attributes/solicitation';

export interface SolicitationInterface {

    register(dataRequest: Solicitation): Promise<Solicitation>;
    getAll(): Promise<Solicitation[]>;
}