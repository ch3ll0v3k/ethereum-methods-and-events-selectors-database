import { EEnvType } from "@app/interfaces/e-env";

export interface IAppConfig {
  root: string;
  appRoot: string;
  app: {
    name: string;
    domain: string;
    subDomain: string;
  };
  aes: {
    algorithm: string;
    salt: string;
    password: string;
    iv: string;
  },
  node: {
    env: EEnvType;
    debug: boolean;
    isEnv: {
      development: boolean;
      staging: boolean;
      production: boolean;
    }
  }
};
