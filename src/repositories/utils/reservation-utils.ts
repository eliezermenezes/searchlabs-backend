'use strict';

const dateArray = require('moment-array-dates');
import moment from "moment";

export class ReservationUtils {
    static isInProgress(situation: string): boolean {
        return situation === 'in progress'
    }

    static isRepeate(repeate: string): boolean {
        return repeate === 'yes'
    }

    static setData(reservation: any, solicitation: any): any {
        return {
            reservation_id: reservation.id,
            date: solicitation.start_date,
            start_hour: solicitation.start_hour,
            end_hour: solicitation.end_hour
        }
    }

    static dataRepeate(data: any, solicitation: any): any {
        return {
            startDate: moment(data.date),
            endDate: moment(solicitation.end_date),
            daysWeek: solicitation.days_week.split(',')
        }
    }

    static createArrayWithAllDates(startDate: moment.Moment, endDate: moment.Moment) {
        const formarDate = 'YYYY-MM-DD';
        return dateArray.range(startDate, endDate, formarDate, true);
    }

    static getDatasValids(everyDay: Array<moment.Moment>, daysWeek: Array<string>) {
        return everyDay.filter((date: moment.Moment) => {
            let dayValid = false;
            daysWeek.forEach((day: string) => {
                if (day === moment(date).format('dddd')) {
                    dayValid = true;
                }
            });
            return dayValid;
        });
    }
}