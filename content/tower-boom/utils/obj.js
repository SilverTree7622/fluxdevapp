"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UtilObj = {
    compareEquals: (x, y) => {
        if (x === y)
            return true;
        if (!(x instanceof Object) || !(y instanceof Object))
            return false;
        if (x.constructor !== y.constructor)
            return false;
        for (var p in x) {
            if (!x.hasOwnProperty(p))
                continue;
            if (!y.hasOwnProperty(p))
                return false;
            if (x[p] === y[p])
                continue;
            if (typeof (x[p]) !== "object")
                return false;
            if (!UtilObj.compareEquals(x[p], y[p]))
                return false;
        }
        for (p in y)
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
                return false;
        return true;
    },
    chckIsEmpty: (obj) => {
        if (obj === undefined || obj === null) {
            return true;
        }
        return !Object.keys(obj !== null && obj !== void 0 ? obj : {}).length;
    },
};
export const default = UtilObj;
