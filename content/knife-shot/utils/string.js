"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UtilString = {
    convertLong2ShortName: (fullName) => {
        const nameParts = fullName.trim().split(" ");
        if (nameParts.length < 2) {
            console.warn("The provided name must include at least a first name and a last name.");
        }
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        const shortName = `${firstName.charAt(0).toUpperCase()}.${lastName.toLowerCase()}`;
        return shortName;
    },
    replaceQuotesSingle2Double: (value) => {
        return value.replace(/'/g, '"');
    },
    validateName: (name, minLength = 2) => {
        if (name.length <= minLength) {
            return `Your name must be at least ${minLength} letters long`;
        }
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(name);
        if (hasSpecialChars) {
            return 'Your name cannot contain special characters';
        }
        return true;
    },
    kebabToPascalCase(str) {
        const normalizedStr = str.replace(/-+/g, '-').trim();
        return normalizedStr
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    },
};
export const default = UtilString;
