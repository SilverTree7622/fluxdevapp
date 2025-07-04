"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UtilArray = {
    compareList: (a1, a2) => {
        return (a1.sort().toString() === a2.sort().toString());
    },
};
export const default = UtilArray;
