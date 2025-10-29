"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.res = void 0;
const res = (success, message, data) => {
    try {
        return { success, message, data };
    }
    catch (e) {
        return { success: false, message: e.message, data: null };
    }
};
exports.res = res;
