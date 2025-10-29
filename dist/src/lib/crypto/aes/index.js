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
const crypto = __importStar(require("crypto"));
const tval_1 = __importDefault(require("../../../lib/tval"));
const i_res_1 = require("../../../interfaces/i-res");
const config_1 = __importDefault(require("../../../config"));
const { scryptSync, createDecipheriv, createCipheriv } = crypto;
const _module = 'AES';
const AES = {
    algorithm: config_1.default.aes.algorithm || 'aes-256-gcm',
    salt: config_1.default.aes.salt || 'aes_salt-not-set',
    key: scryptSync(config_1.default.aes.password || 'aes_password-not-set', config_1.default.aes.iv || 'aes_iv-not-set', 32), // l:24 if aes-192
    iv: config_1.default.aes.iv || 'aes_iv-not-set',
};
const encrypt = async (input) => {
    try {
        if (!tval_1.default.isString(input))
            return (0, i_res_1.res)(false, `Input is not valid string`);
        const { algorithm, key, iv } = AES;
        const cipher = createCipheriv(algorithm, key, iv);
        const buffer = cipher.update(input, 'utf8');
        const output = buffer.toString('hex');
        cipher.final();
        return (0, i_res_1.res)(true, 'successs', {
            encrypted: output,
        });
    }
    catch (e) {
        console.error(`#${_module}:encrypt: ${e.message}`);
        return (0, i_res_1.res)(false, 'Failed to encrypt data');
    }
};
const decrypt = async (input) => {
    try {
        if (!tval_1.default.isString(input))
            return (0, i_res_1.res)(false, `Input is not valid string`);
        const { algorithm, key, iv } = AES;
        const decipher = createDecipheriv(algorithm, key, iv);
        const output = decipher.update(input, 'hex', 'utf8');
        return (0, i_res_1.res)(true, 'successs', {
            decrypted: output,
        });
    }
    catch (e) {
        console.error(`#${_module}:decrypt: ${e.message}`);
        return (0, i_res_1.res)(false, 'Failed to decrypt data');
    }
};
exports.default = {
    encrypt,
    decrypt,
};
