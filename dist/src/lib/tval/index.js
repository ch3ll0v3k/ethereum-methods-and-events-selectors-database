"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_buffer_1 = require("node:buffer");
const dt_1 = __importDefault(require("../dt"));
const _module = 'tval';
const mPhoneRegExp = new RegExp(/^([+]?)([\d]{8,15})$/);
const mEmailRegExp = new RegExp(/^([a-zA-Z0-9.\-_+=$|]){1,58}([@]{1})([a-zA-Z0-9.\-_]){1,58}([.]){1}(.)?([a-zA-Z0-9.\-_]){1,24}$/);
const mUUIDRegExp = /^([a-f0-9]{8})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{12})$/i;
class LTVal {
    constructor() { }
    isString(value) {
        return typeof value === "string";
    }
    isArray(value) {
        return Array.isArray(value);
    }
    isBuffer(value) {
        return Buffer.isBuffer(value);
    }
    isObject(value) {
        return (typeof value === "object" &&
            !this.isNull(value) &&
            !this.isArray(value) &&
            !this.isArrayBuffer(value));
    }
    isNull(value) {
        return typeof value === "object" && value === null;
    }
    isNaN(value) {
        return typeof value === "number" && isNaN(value);
    }
    isUndefined(value) {
        return typeof value === "undefined";
    }
    isUndefinedOrNull(value) {
        return this.isUndefined(value) || this.isNull(value);
    }
    isBool(value) {
        return typeof value === "boolean";
    }
    isBoolean(value) {
        return this.isBool(value);
    }
    isInfinity(value) {
        return typeof value === "number" && Math.abs(value) === Infinity;
    }
    isNumber(value) {
        return (!this.isNaN(value) &&
            typeof value === "number" &&
            Math.abs(value) !== Infinity);
    }
    isPosNumber(value) {
        return this.isNumber(value) && value > 0;
    }
    isNegNumber(value) {
        return this.isNumber(value) && value < 0;
    }
    isFunction(value) {
        return typeof value === "function";
    }
    isArrayBuffer(value) {
        return value instanceof ArrayBuffer && this.isNumber(value?.byteLength);
    }
    getString(value, defaultValue = "") {
        return this.isString(value) && value.length
            ? value
            : this.isString(defaultValue)
                ? defaultValue
                : "";
    }
    getJsonStringFromAny(value) {
        try {
            const result = JSON.stringify(value);
            return result;
        }
        catch (e) {
            try {
                const result = (value || '').toString();
                return result;
            }
            catch (e) {
                return `${value}`;
            }
        }
    }
    getArray(value, defaultValue = []) {
        return this.isArray(value)
            ? value
            : this.isArray(defaultValue)
                ? defaultValue
                : [];
    }
    getObject(value, defaultValue = {}) {
        return this.isObject(value) && this.isFunction(value.hasOwnProperty)
            ? value
            : this.isObject(defaultValue)
                ? defaultValue
                : {};
    }
    getObjectAs(value, defaultValue = {}) {
        return this.isObject(value) && this.isFunction(value.hasOwnProperty)
            ? value
            : this.isObject(defaultValue)
                ? defaultValue
                : {};
    }
    getFunction(value, defaultValue = Function) {
        return this.isFunction(value)
            ? value
            : this.isFunction(defaultValue)
                ? defaultValue
                : () => { };
    }
    isDateString(value) {
        try {
            const not = (!this.isArray(value)
                &&
                    !this.isNumber(value)
                &&
                    !this.isNull(value)
                &&
                    !this.isArray(value)
                &&
                    !this.isBuffer(value)
                &&
                    !this.isObject(value)
                &&
                    !this.isNaN(value)
                &&
                    !this.isFunction(value)
                &&
                    !this.isBoolean(value)
                &&
                    !this.isArrayBuffer(value)
                &&
                    !this.isInfinity(value)
                &&
                    !this.isUndefined(value)
                &&
                    !this.isNull(value));
            return not && dt_1.default.isValidDatetime(value);
        }
        catch (e) {
            return false;
        }
    }
    getBoolFromValue(value) {
        if (this.isString(value)) {
            if (value.trim().toLowerCase() === "true")
                return true;
            if (value.trim().toLowerCase() === "false")
                return false;
            return false;
        }
        ;
        if (this.isPosNumber(+value))
            return !!+value;
        return !!value;
    }
    getBooleanFromValue(value) {
        return this.getBoolFromValue(value);
    }
    getNumber(value, { floor = false, abs = false, toFixed = false } = {}) {
        if (!this.isNumber(+value))
            return 0;
        let res = value;
        res = abs ? Math.abs(res) : res;
        res = floor ? Math.floor(+res) : +res;
        return this.isPosNumber(toFixed) ? +res.toFixed(+toFixed) : res;
    }
    getPosNumber(value, P) {
        const floor = this.isUndefinedOrNull(P.floor) ? false : P.floor;
        const min = this.isUndefinedOrNull(P.min) ? false : P.min;
        const max = this.isUndefinedOrNull(P.max) ? false : P.max;
        const abs = this.isUndefinedOrNull(P.abs) ? false : P.abs;
        const toFixed = this.isUndefinedOrNull(P.toFixed) ? false : P.toFixed;
        if (!this.isNumber(+value))
            return 0;
        let ret = value;
        ret = abs ? Math.abs(ret) : ret;
        ret = floor ? Math.floor(+ret) : +ret;
        ret =
            this.isNumber(min) && ret < min
                ? min
                : this.isNumber(max) && ret > max
                    ? max
                    : ret;
        return this.isPosNumber(toFixed) ? +(+ret).toFixed(+toFixed) : ret;
    }
    constrainNumber(amount, min, max) {
        return amount < min ? min : amount >= max ? max : amount;
    }
    isValidPhone(phone) {
        if (!this.isString(phone))
            return false;
        return mPhoneRegExp.test(phone);
    }
    isValidEmail(email) {
        if (!this.isString(email))
            return false;
        return mEmailRegExp.test(email);
    }
    getValidAnyProtocolUrl(urlString) {
        try {
            const url = new URL(urlString);
            return url;
        }
        catch (e) {
            console.error(`#${_module}:isValidAnyProtocolUrl: ${e.message}`);
            console.error(`#${_module}:isValidAnyProtocolUrl: (urlString: ${urlString})`);
            return null;
        }
    }
    isValidAnyUrl(urlString) {
        const url = this.getValidAnyProtocolUrl(urlString);
        return !!url;
    }
    isValidHttpUrl(urlString) {
        const url = this.getValidAnyProtocolUrl(urlString);
        if (!url)
            return false;
        return !!url.protocol.match('http'); // http(s) including...
    }
    isValidWSUrl(urlString) {
        const url = this.getValidAnyProtocolUrl(urlString);
        if (!url)
            return false;
        return !!url.protocol.match('ws'); // ws(s) including...
    }
    isValidUDPUrl(urlString) {
        const url = this.getValidAnyProtocolUrl(urlString);
        if (!url)
            return false;
        return !!url.protocol.match('upd');
    }
    isValidTPCUrl(urlString) {
        const url = this.getValidAnyProtocolUrl(urlString);
        if (!url)
            return false;
        return !!url.protocol.match('tcp');
    }
    // TODO: replace by isNodeEnv + toLowerCase()?
    isEnv(env) {
        return this.isString(env) && env === this.getEnv("NODE_ENV");
    }
    getEnv(key, toObject = false) {
        try {
            if (!this.isString(process.env[key]))
                return '';
            return toObject ? JSON.parse(process.env[key] || "{}") : process.env[key];
        }
        catch (e) {
            console.error(`#ltval:getEnv: ${e.message}  key: [${key}], toObject: [${toObject}]`);
            return '';
        }
    }
    getEnvAsObject(key) {
        try {
            return JSON.parse(process.env[key] || "{}");
        }
        catch (e) {
            console.error(`#ltval:getEnvAsObject: ${e.message} key: [${key}]`);
            return {};
        }
    }
    getEnvOnceAsObject(key) {
        try {
            const v = process.env[key];
            process.env[key] = '';
            return JSON.parse(v || "{}");
        }
        catch (e) {
            console.error(`#ltval:getEnvOnceAsObject: ${e.message} key: [${key}]`);
            return {};
        }
    }
    getEnvOnce(key) {
        try {
            const v = process.env[key];
            if (!this.isString(v))
                return '';
            process.env[key] = '';
            return v || "";
        }
        catch (e) {
            console.error(`#ltval:getEnvOnce: ${e.message} key: [${key}]`);
            return "";
        }
    }
    getEnvAsBool(key) {
        try {
            if (!this.isString(process.env[key]))
                return false;
            return this.getBoolFromValue(process.env[key]);
        }
        catch (e) {
            console.error(`#ltval:getEnvAsBool: ${e.message}  key: [${key}]`);
            return false;
        }
    }
    getEnvAsInt(key) {
        try {
            if (!this.isString(process.env[key]))
                return 0;
            return this.getNumber(process.env[key], { floor: true, abs: false });
        }
        catch (e) {
            console.error(`#ltval:getEnvAsInt: ${e.message}  key: [${key}]`);
            return 0;
        }
    }
    getEnvAsString(key) {
        try {
            return this.getEnv(key) || "";
        }
        catch (e) {
            console.error(`#ltval:getEnvAsString: ${e.message}  key: [${key}]`);
            return "";
        }
    }
    getEnvAsFloat(key) {
        try {
            if (!this.isString(process.env[key]))
                return 0;
            return this.getNumber(process.env[key], { floor: false, abs: false });
        }
        catch (e) {
            console.error(`#ltval:getEnvAsFloat: ${e.message}  key: [${key}]`);
            return 0;
        }
    }
    getEnvAs(key, as) {
        try {
            switch (as) {
                case 'string':
                    return this.getEnv(key);
                case 'number':
                case 'int':
                case 'integer':
                    return this.getEnvAsInt(key);
                case 'float':
                case 'double':
                    return this.getEnvAsFloat(key);
                case 'boolean':
                case 'bool':
                    return this.getEnvAsBool(key);
            }
            return "";
        }
        catch (e) {
            console.error(`#ltval:getEnvAs:(${as}): ${e.message}  key: [${key}]`);
            return false;
        }
    }
    isHexBytes(value) {
        const l = value.length;
        return this.isString(value) && /^(0x)?([a-f0-9])*$/i.test(value);
    }
    isSha256(value) {
        const l = value.length;
        return this.isString(value) && (l === 64 || l == 66) && /^(0x)?[a-f0-9]{64}$/i.test(value);
    }
    isValidUUID(uuid) {
        if (!this.isString(uuid))
            return false;
        if (uuid.length !== 36)
            return false;
        return !!uuid.match(mUUIDRegExp);
    }
    // res(success: boolean, message: string, data?: any): IRes {
    //   return { success, message, data: data || {} };
    // }
    isValidUtf8(value) {
        return (0, node_buffer_1.isUtf8)(Uint8Array.from((value).split('').map((i) => i.charCodeAt(0))));
    }
    async sleep(msec) {
        return new Promise((res) => {
            setTimeout(() => { res(true); }, msec);
        });
    }
}
const tval = new LTVal();
exports.default = tval;
