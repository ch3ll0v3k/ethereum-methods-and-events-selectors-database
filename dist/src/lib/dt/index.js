"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETimeFrameName = exports.UTC_ZERO_TIMEZONE = void 0;
// const moment = require('moment-timezone');
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const tval_1 = __importDefault(require("../tval"));
moment_timezone_1.default.suppressDeprecationWarnings = true;
moment_timezone_1.default.defaultFormat = 'YYYY-MM-DDTHH:mm:ss'; // "YYYY-MM-DDTHH:mm:ssZ"
const dt = {
    tzFormat: 'YYYY-MM-DDTHH:mm:ssZ',
    humanDateFormat: 'YYYY-MMM-DD',
    humanDatetimeFormat: 'YYYY-MMM-DD HH:mm',
    humanTimeFormat: 'h:mm a',
    inFormat_0: 'YYYY-MMM-DD HH:mm',
    inFormat_1: 'YYYY/MMM/DD HH:mm',
    inFormat_2: 'YYYY MMM DD HH:mm',
};
exports.UTC_ZERO_TIMEZONE = 'Atlantic/Reykjavik';
var ETimeFrameName;
(function (ETimeFrameName) {
    ETimeFrameName["years"] = "years";
    ETimeFrameName["months"] = "months";
    ETimeFrameName["weeks"] = "weeks";
    ETimeFrameName["days"] = "days";
    ETimeFrameName["hours"] = "hours";
    ETimeFrameName["minutes"] = "minutes";
    ETimeFrameName["seconds"] = "seconds";
})(ETimeFrameName || (exports.ETimeFrameName = ETimeFrameName = {}));
const _module = 'DT';
const getMicroTime = () => {
    const hrTime = process.hrtime();
    const micro = Math.floor((hrTime[0] * 1000000) + (hrTime[1] / 1000));
    return micro;
};
const isValidDatetime = (datetime_t) => {
    try {
        // RFC2822/ISO
        return (0, moment_timezone_1.default)(datetime_t).isValid( /*{_isValid: null}*/);
    }
    catch (e) {
        console.error(`#${_module}:isValidDatetime: ${e.message}`);
        return false;
    }
};
const getISODate = (format = moment_timezone_1.default.defaultFormat) => {
    try {
        return (0, moment_timezone_1.default)().format(format);
    }
    catch (e) {
        console.error(`#${_module}:getISODate: ${e.message}`);
        return '';
    }
};
const getISODateTZ = (format = dt.tzFormat) => {
    try {
        return (0, moment_timezone_1.default)().format(format);
    }
    catch (e) {
        console.error(`#${_module}:getISODateTZ: ${e.message}`);
        return '';
    }
};
const getISODateTZOr = (datetime, format = moment_timezone_1.default.defaultFormat) => {
    try {
        return isValidDatetime(datetime)
            ? (0, moment_timezone_1.default)(datetime).format(format)
            : "";
    }
    catch (e) {
        console.error(`#${_module}:getISODateTZOr: ${e.message}`);
        return '';
    }
};
const getISODateTZOrNull = (datetime, format = dt.tzFormat) => {
    try {
        return isValidDatetime(datetime)
            ? (0, moment_timezone_1.default)(datetime).format(format)
            : null;
    }
    catch (e) {
        console.error(`#${_module}:getISODateTZOrNull: ${e.message}`);
        return null;
    }
};
const applyTimezone = (datetime_t, timezone_t = 'America/Los_Angeles', format = moment_timezone_1.default.defaultFormat) => {
    try {
        if (!isValidDatetime(datetime_t))
            return 'n/a';
        datetime_t = (0, moment_timezone_1.default)(datetime_t).tz(timezone_t);
        return (format ? datetime_t.format(format) : datetime_t);
    }
    catch (e) {
        console.error(`#${_module}:applyTimezone: ${e.message}`);
        return '';
    }
};
const requireMinAge = (datetime_t, minAge = 13) => {
    try {
        const mDate = new Date(datetime_t);
        return (((new Date()).getFullYear() - mDate.getFullYear()) > minAge);
    }
    catch (e) {
        console.error(`#${_module}:requireMinAge: ${e.message}`);
        return false;
    }
};
const getTimePast = (datetime_t) => {
    try {
        if (!isValidDatetime(datetime_t))
            throw Error(`supplied [datetime] is not valid`);
        return (0, moment_timezone_1.default)(datetime_t).fromNow();
    }
    catch (e) {
        console.error(`#${_module}:getTimePast: ${e.message}`);
        return '';
    }
};
const subFromCurrentDate = ({ amount, of, format = moment_timezone_1.default.defaultFormat }) => {
    try {
        // @ts-ignore
        const moment_t = (0, moment_timezone_1.default)().subtract(amount, of);
        return tval_1.default.isString(format) && format.length > 0
            ? moment_t.format(format) // App.getDateFormat() 
            : moment_t;
    }
    catch (e) {
        console.error(`#${_module}:subFromCurrentDate: ${e.message}`);
        return '';
    }
};
const addToCurrentDate = ({ amount, of, format = moment_timezone_1.default.defaultFormat }) => {
    try {
        // @ts-ignore
        const moment_t = (0, moment_timezone_1.default)().add(amount, of);
        return tval_1.default.isString(format) && format.length > 0
            ? moment_t.format(format) // App.getDateFormat() 
            : moment_t;
    }
    catch (e) {
        console.error(`#${_module}:addToCurrentDate: ${e.message}`);
        return '';
    }
};
const getStartOf = (datetime_t, ofThis, format = moment_timezone_1.default.defaultFormat) => {
    try {
        // @ts-ignore
        const date_t = (0, moment_timezone_1.default)(datetime_t).startOf(ofThis);
        format = (!!format) ? moment_timezone_1.default.defaultFormat : format;
        return format ? date_t.format(format) : date_t;
    }
    catch (e) {
        console.error(`#${_module}:getStartOf: ${e.message}`);
        return '';
    }
};
const getEndOf = (datetime_t, ofThis, format = moment_timezone_1.default.defaultFormat) => {
    try {
        // @ts-ignore
        const date_t = (0, moment_timezone_1.default)(datetime_t).endOf(ofThis);
        format = (!!format) ? moment_timezone_1.default.defaultFormat : format;
        return format ? date_t.format(format) : date_t;
    }
    catch (e) {
        console.error(`#${_module}:getEndOf: ${e.message}`);
        return '';
    }
};
const unixTimestampToISO = (timestamp, format = '') => {
    try {
        // RFC2822/ISO
        return (0, moment_timezone_1.default)((+timestamp) * 1000).format(format ? format : moment_timezone_1.default.defaultFormat);
    }
    catch (e) {
        console.error(`#${_module}:unixTimestampToISO: ${e.message}`);
        return '';
    }
};
const getTzAtUTCZero = () => {
    return exports.UTC_ZERO_TIMEZONE;
};
exports.default = {
    getMicroTime,
    isValidDatetime,
    getISODate,
    getISODateTZ,
    getISODateTZOr,
    getISODateTZOrNull,
    applyTimezone,
    requireMinAge,
    getTimePast,
    subFromCurrentDate,
    addToCurrentDate,
    getStartOf,
    getEndOf,
    unixTimestampToISO,
    getTzAtUTCZero,
    moment: moment_timezone_1.default,
};
