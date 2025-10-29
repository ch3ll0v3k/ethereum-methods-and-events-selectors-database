"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const _module = 'BCrypt';
const SALT_ROUNDS = 10;
const hash = async (payload, saltRounds = 0) => {
    try {
        const rounds = saltRounds || SALT_ROUNDS;
        const hash_t = await bcrypt_1.default.hash(payload, rounds);
        return hash_t;
    }
    catch (e) {
        console.error(` #${_module}:hash: ${e.message}`);
        return "";
    }
};
const compare = async (payload, hash_t) => {
    try {
        const match = payload && hash_t && (await bcrypt_1.default.compare(payload, hash_t));
        return match;
    }
    catch (e) {
        console.error(` #${_module}:compare: ${e.message}`);
        return false;
    }
};
exports.default = {
    hash,
    compare,
};
