'use strict';

export interface OccupationMapInterface {

    add(dataRequest: Object): Promise<Object>;
    get(): Promise<Object[]>;
}