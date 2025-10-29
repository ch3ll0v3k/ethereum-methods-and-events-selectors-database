"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const tval_1 = __importDefault(require("../lib/tval"));
const e_env_1 = require("../interfaces/e-env");
const root = node_path_1.default.resolve(__dirname, '../../');
const config = {
    root,
    appRoot: node_path_1.default.resolve(root, 'src'),
    app: {
        domain: tval_1.default.getEnvAsString('APP_DOMAIN'),
        subDomain: tval_1.default.getEnvAsString('APP_SUB_DOMAIN'),
        name: tval_1.default.getEnvAsString('APP_NAME'),
    },
    aes: {
        algorithm: tval_1.default.getEnvAsString('AES_ALGORITHM'),
        salt: tval_1.default.getEnvAsString('AES_SALT'),
        password: tval_1.default.getEnvAsString('AES_PASSWORD'),
        iv: tval_1.default.getEnvAsString('AES_IV'),
    },
    node: {
        env: tval_1.default.getEnvAsString('NODE_ENV'),
        debug: tval_1.default.getEnvAsBool('NODE_DEBUG'),
        isEnv: {
            development: false,
            staging: false,
            production: false,
        }
    },
};
config.node.env = config.node.env.toLowerCase();
config.node.env = !(config.node.env in e_env_1.EEnvType) ? e_env_1.EEnvType.development : config.node.env;
config.node.isEnv.development = config.node.env === e_env_1.EEnvType.development;
config.node.isEnv.staging = config.node.env === e_env_1.EEnvType.staging || config.node.env === e_env_1.EEnvType.stage;
config.node.isEnv.production = config.node.env === e_env_1.EEnvType.production;
Object.freeze(config);
exports.default = config;
