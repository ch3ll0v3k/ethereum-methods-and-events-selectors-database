import tval from "@app/lib/tval";
import { UUID } from "crypto";

import * as uuid from "uuid-with-v6";

const _module = 'UUID';

const v6 = {
  gen: (): UUID => (uuid.v6() as UUID),

  validate: (input: string): boolean => {
    try {
      if (!tval.isString(input))
        return false;
      const _uuid = input.substring(input.length - 36);
      const res = !!_uuid.match(/^([a-z0-9]{8})-([a-z0-9]{4})-([a-z0-9]{4})-([a-z0-9]{4})-([a-z0-9]{12})$/i);
      return res;
    } catch (e: any) {
      console.error(`#uuid:validate: (input: ${input}): ${e.message}`);
      return false;
    }
  },
  withPrefix: (prefix: string, separator: string): string => {
    const prefixed = `${prefix}${separator}${uuid.v6()}`;
    return prefixed
  },

  remotePrefix: (id: string, separator: string): string => {
    try {
      const unprefixed = `${id}`.split(`${separator}`);
      return tval.isArray(unprefixed) && unprefixed.length >= 2
        ? unprefixed[1]
        : `${_module}:v6RemotePrefix:[error:invalid-array]`;
    } catch (e: any) {
      console.error(`#${_module}:v6RemotePrefix: ${e.message}`);
      return id;
    }
  },
}

export default {
  v6
};
