"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_RANDOM_SECURE_BUFFER_BYTES = void 0;
const crypto = __importStar(require("crypto"));
const tval_1 = __importDefault(require("../../../lib/tval"));
const i_res_1 = require("../../../interfaces/i-res");
const _module = 'common';
exports.DEFAULT_RANDOM_SECURE_BUFFER_BYTES = 16;
const randomSecureToken = (size) => {
    try {
        if (!tval_1.default.isPosNumber(size))
            throw Error('Invalid size');
        const buffer = crypto.randomBytes(size);
        if (!tval_1.default.isBuffer(buffer))
            return (0, i_res_1.res)(false, 'Failed to create random secure token');
        const token = buffer.toString('hex');
        if (!tval_1.default.isString(token) || !token.length)
            return (0, i_res_1.res)(false, 'Failed to create random secure token');
        return (0, i_res_1.res)(true, 'success', { randomSecureToken: token });
    }
    catch (e) {
        console.error(`#${_module}:randomSecureToken: ${e.message}`);
        return (0, i_res_1.res)(false, 'Failed to create random secure token');
    }
};
const randomSecureBuffer = (lenBytes = exports.DEFAULT_RANDOM_SECURE_BUFFER_BYTES) => {
    try {
        if (!tval_1.default.isPosNumber(lenBytes))
            throw Error('Invalid bytes size');
        const buffer = crypto.randomBytes((+lenBytes));
        if (!tval_1.default.isBuffer(buffer))
            return (0, i_res_1.res)(false, 'Failed to create random secure-buffer');
        return (0, i_res_1.res)(true, 'success', { buffer });
    }
    catch (e) {
        console.error(` #${_module}:randomSecureBuffer: ${e.message}`);
        return (0, i_res_1.res)(false, 'Failed to create random secure-buffer');
    }
};
exports.default = {
    randomSecureToken,
    randomSecureBuffer,
};
