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
const tval_1 = __importDefault(require("../../../lib/tval"));
const uuid = __importStar(require("uuid-with-v6"));
const _module = 'UUID';
const v6 = {
    gen: () => uuid.v6(),
    validate: (input) => {
        try {
            if (!tval_1.default.isString(input))
                return false;
            const _uuid = input.substring(input.length - 36);
            const res = !!_uuid.match(/^([a-z0-9]{8})-([a-z0-9]{4})-([a-z0-9]{4})-([a-z0-9]{4})-([a-z0-9]{12})$/i);
            return res;
        }
        catch (e) {
            console.error(`#uuid:validate: (input: ${input}): ${e.message}`);
            return false;
        }
    },
    withPrefix: (prefix, separator) => {
        const prefixed = `${prefix}${separator}${uuid.v6()}`;
        return prefixed;
    },
    remotePrefix: (id, separator) => {
        try {
            const unprefixed = `${id}`.split(`${separator}`);
            return tval_1.default.isArray(unprefixed) && unprefixed.length >= 2
                ? unprefixed[1]
                : `${_module}:v6RemotePrefix:[error:invalid-array]`;
        }
        catch (e) {
            console.error(`#${_module}:v6RemotePrefix: ${e.message}`);
            return id;
        }
    },
};
exports.default = {
    v6
};
