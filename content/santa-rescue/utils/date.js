"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UtilDate = {
    syncDigit: (time, digits = 2) => {
        if (typeof time === 'number') {
            time = `${time}`;
        }
        if (time.length === 1) {
            time = `0${time}`;
        }
        return time;
    },
    chckSameDay: (d1, d2) => {
        return d1.getUTCFullYear() === d2.getUTCFullYear() &&
            d1.getUTCMonth() === d2.getUTCMonth() &&
            d1.getUTCDate() === d2.getUTCDate();
    },
    chckDateIsToday: (d) => {
        return UtilDate.chckSameDay(d, new Date(Date.now()));
    },
    chckYearIsSame: (year) => {
        return new Date(Date.now()).getUTCFullYear() === Number(year);
    },
    chckIsYesterday: (d) => {
        const isToday = UtilDate.chckDateIsToday(d);
        if (isToday) {
            return false;
        }
        return new Date(d).getTime() < new Date(Date.now()).getTime();
    },
    getWithOutMillisecond: (timestamp) => {
        return ~~((timestamp !== null && timestamp !== void 0 ? timestamp : new Date(Date.now()).getTime()) / 1000);
    },
    addMillisecond: (timestamp) => {
        return new Date(Number(`${timestamp}000`));
    },
    changeMonthNum2Str: (idx, isShort = true) => {
        const list = isShort ? [
            'JAN', 'FEB', 'MAR', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
        ] : [
            'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
        ];
        return list[idx + 1];
    },
    getWeekday: (idx) => {
        return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][idx];
    },
    getRelativeTime: (timestamp) => {
        const now = new Date().getTime();
        const time = new Date(timestamp).getTime();
        const diff = now - time;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        if (minutes < 1)
            return 'now';
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        return new Date(timestamp).toLocaleDateString();
    },
};
export const default = UtilDate;
