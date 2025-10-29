"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B2 = exports.W = exports.Y = exports.P = exports.B = exports.G = exports.R = void 0;
// const gray = "\u001b[01;30m";
const red = "\u001b[01;31m";
const green = "\u001b[01;32m";
const yellow = "\u001b[01;33m";
const blue = "\u001b[01;34m";
const purple = "\u001b[01;35m";
const blue2 = "\u001b[01;36m";
const white = "\u001b[01;37m";
const endl = "\u001b[0m";
const R = (value) => `${red}${value}${endl}`;
exports.R = R;
const G = (value) => `${green}${value}${endl}`;
exports.G = G;
const B = (value) => `${blue}${value}${endl}`;
exports.B = B;
const P = (value) => `${purple}${value}${endl}`;
exports.P = P;
const Y = (value) => `${yellow}${value}${endl}`;
exports.Y = Y;
const W = (value) => `${white}${value}${endl}`;
exports.W = W;
const B2 = (value) => `${blue2}${value}${endl}`;
exports.B2 = B2;
const BigIntReplaces = (key, value) => typeof value === "bigint" ? { $bigint: value.toString() } : value;
const circularStructure = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return `[circular structure]`;
            }
            value = BigIntReplaces(key, value);
            seen.add(value);
        }
        if (typeof value === "function") {
            return `[function]`;
        }
        value = BigIntReplaces(key, value);
        return value;
    };
};
const reviver = (key, value) => {
    return (value !== null &&
        typeof value === "object" &&
        "$bigint" in value &&
        typeof value.$bigint === "string")
        ? BigInt(value.$bigint)
        : value;
};
const JSONparse = JSON.parse;
JSON.parse = (payload) => {
    const parsed = JSONparse(payload, reviver);
    return parsed;
};
console.toJson = function (input, fn = undefined, format = 2) {
    try {
        fn = fn || circularStructure();
        const json_t = JSON.stringify(input, fn, format);
        return json_t;
    }
    catch (e) {
        console.error(`console.json(input: any): ${e.message}`);
        return 'error-encoding-json';
    }
};
// prettier-ignore
console.json = function (input, fn = undefined, format = 2) {
    try {
        const json_t = console.toJson(input, fn, format);
        console.log(json_t);
    }
    catch (e) {
        console.error(`console.json(input: any): ${e.message}`);
    }
};
console.ok = (input) => {
    try {
        console.log(G(input));
    }
    catch (e) {
        console.error(`console.ok(input: string): ${e.message}`);
    }
};
// prettier-ignore
console.line = () => {
    const line = ' ----  ----  ----  ----  ----  ----  ----  ----  ---- ';
    console.log(line);
};
