"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _module = 'base58';
const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = alphabet.length;
const alphabetLookup = [...alphabet].reduce((lookup, char, index) => {
    lookup[char] = index;
    return lookup;
}, {});
const intToBase58 = (num) => {
    let str = "";
    let modulus;
    num = Math.floor(+num);
    while (num >= base) {
        modulus = num % base;
        str = alphabet[modulus] + str;
        num = Math.floor(num / base);
    }
    return alphabet[num] + str;
};
const base58ToInt = (str) => {
    str = `${str}`;
    return [...str]
        .reverse()
        .reduce((num, character, index) => {
        // assertBase58Character(character);
        return num + alphabetLookup[character] * Math.pow(base, index);
    }, 0);
};
exports.default = {
    intToBase58,
    base58ToInt,
};
