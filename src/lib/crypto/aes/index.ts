import * as crypto from "crypto";
import tval from "@app/lib/tval";
import { IDecryptRes, IEncryptRes } from "./interfaces";
import { IRes, res } from "@app/interfaces/i-res";
import config from "@app/config";

const { scryptSync, createDecipheriv, createCipheriv } = crypto;

const _module = 'AES';

const AES = {
  algorithm: config.aes.algorithm || 'aes-256-gcm',
  salt: config.aes.salt || 'aes_salt-not-set',
  key: scryptSync(
    config.aes.password || 'aes_password-not-set',
    config.aes.iv || 'aes_iv-not-set',
    32
  ), // l:24 if aes-192
  iv: config.aes.iv || 'aes_iv-not-set',
} as const;

const encrypt = async (input: string): Promise<IRes<IEncryptRes>> => {
  try {
    if (!tval.isString(input))
      return res(false, `Input is not valid string`);
    const { algorithm, key, iv } = AES;
    const cipher = createCipheriv(algorithm, key, iv);
    const buffer: Buffer = cipher.update(input, 'utf8');
    const output: string = buffer.toString('hex');
    cipher.final();
    return res(true, 'successs', {
      encrypted: output,
    });
  } catch (e: any) {
    console.error(`#${_module}:encrypt: ${e.message}`);
    return res(false, 'Failed to encrypt data');
  }
}

const decrypt = async (input: string): Promise<IRes<IDecryptRes>> => {
  try {
    if (!tval.isString(input))
      return res(false, `Input is not valid string`)
    const { algorithm, key, iv } = AES;
    const decipher = createDecipheriv(algorithm, key, iv);
    const output: string = decipher.update(input, 'hex', 'utf8');
    return res(true, 'successs', {
      decrypted: output,
    });
  } catch (e: any) {
    console.error(`#${_module}:decrypt: ${e.message}`);
    return res(false, 'Failed to decrypt data');
  }
}

export default {
  encrypt,
  decrypt,
}
