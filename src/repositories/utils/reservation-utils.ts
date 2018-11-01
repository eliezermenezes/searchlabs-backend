'use strict';

export class ReservationUtils {
    static isInProgress(situation: string): boolean {
        return situation === 'in progress'
    }

    static isRepeate(repeate: string): boolean {
        return repeate === 'yes'
    }
}