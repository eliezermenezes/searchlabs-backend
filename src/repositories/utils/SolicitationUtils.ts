'use strict';

import moment from "moment";

export class SolicitationUtils {

    static isOpenedOrAccepted(situation: string): boolean {
        return situation === 'opened' || situation === 'accepted';
    }

    static isNotOpened(situation: string): boolean {
        return situation !== 'opened';
    }

    static setSituation(situation: string, description: string): any {
        return {
            situation: situation,
            answer_description: description,
            answer_date: moment().format()
        }
    }
}