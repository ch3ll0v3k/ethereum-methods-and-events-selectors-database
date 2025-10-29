"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = __importDefault(require("node:crypto"));
const tval_1 = __importDefault(require("../../../lib/tval"));
const i_res_1 = require("../../../interfaces/i-res");
const _module = 'HASH';
// crypto.HashOptions
const _hash = (func = 'sha256', rawData, fromEncoding = 'utf-8', toEncoding = 'hex') => {
    try {
        rawData = tval_1.default.isString(rawData) ? rawData : ('' + rawData);
        const hash = node_crypto_1.default.createHash(func)
            .update(rawData, fromEncoding)
            .digest(toEncoding);
        return (0, i_res_1.res)(true, "success", { hash });
    }
    catch (e) {
        console.error(`#${_module}:hash:(${func}): ${e.message}`);
        return (0, i_res_1.res)(false, "Failed to create hash");
    }
};
const sha1 = (rawData, fromEncoding = 'utf-8', toEncoding = 'hex') => {
    return _hash('sha1', rawData, fromEncoding, toEncoding);
};
const sha256 = (rawData, fromEncoding = 'utf-8', toEncoding = 'hex') => {
    return _hash('sha256', rawData, fromEncoding, toEncoding);
};
const sha384 = (rawData, fromEncoding = 'utf-8', toEncoding = 'hex') => {
    return _hash('sha384', rawData, fromEncoding, toEncoding);
};
const sha512 = (rawData, fromEncoding = 'utf-8', toEncoding = 'hex') => {
    return _hash('sha512', rawData, fromEncoding, toEncoding);
};
exports.default = {
    sha1,
    sha256,
    sha384,
    sha512
};
