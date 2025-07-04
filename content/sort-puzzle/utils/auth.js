"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const UtilAuth = {
    hmacSHA256: (data, key = 'ASD*uoj-awd89esrhewuf@#TWEFVSd-', raw = true) => {
        const hash = (0, crypto_1.createHmac)('sha256', key).update(data).digest();
        return raw ? hash.toString('base64') : hash.toString('hex');
    },
};
export const default = UtilAuth;
