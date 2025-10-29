import path from "node:path";
import tval from "@app/lib/tval";
import { IAppConfig } from "@app/config/interface"
import { EEnvType } from "@app/interfaces/e-env";

export { IAppConfig } from "@app/config/interface";

const root = path.resolve(__dirname, '../../');

const config: IAppConfig = {
  root,
  appRoot: path.resolve(root, 'src'),
  app: {
    domain: tval.getEnvAsString('APP_DOMAIN'),
    subDomain: tval.getEnvAsString('APP_SUB_DOMAIN'),
    name: tval.getEnvAsString('APP_NAME'),
  },
  aes: {
    algorithm: tval.getEnvAsString('AES_ALGORITHM'),
    salt: tval.getEnvAsString('AES_SALT'),
    password: tval.getEnvAsString('AES_PASSWORD'),
    iv: tval.getEnvAsString('AES_IV'),
  },
  node: {
    env: tval.getEnvAsString('NODE_ENV') as EEnvType,
    debug: tval.getEnvAsBool('NODE_DEBUG'),
    isEnv: {
      development: false,
      staging: false,
      production: false,
    }
  },
};

config.node.env = config.node.env.toLowerCase() as EEnvType;
config.node.env = !(config.node.env in EEnvType) ? EEnvType.development : config.node.env;

config.node.isEnv.development = config.node.env === EEnvType.development;
config.node.isEnv.staging = config.node.env === EEnvType.staging || config.node.env === EEnvType.stage;
config.node.isEnv.production = config.node.env === EEnvType.production;

Object.freeze(config);

export default config;
