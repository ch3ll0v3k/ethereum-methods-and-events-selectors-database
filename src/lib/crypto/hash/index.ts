import crypto from 'node:crypto';
import { hexBytesString } from '@app/interfaces/app';
import tval from '@app/lib/tval';
import { IRes, res } from '@app/interfaces/i-res';

const _module = 'HASH';

export interface IHashRes {
  hash: hexBytesString;
}

// crypto.HashOptions

const _hash = (
  func = 'sha256', rawData: string, fromEncoding: crypto.Encoding = 'utf-8', toEncoding: crypto.Encoding = 'hex'
): IRes<IHashRes> => {
  try {
    rawData = tval.isString(rawData) ? rawData : ('' + rawData);
    const hash = crypto.createHash(func)
      .update(rawData, fromEncoding as crypto.Encoding)
      .digest(toEncoding as crypto.BinaryToTextEncoding);
    return res(true, "success", { hash });
  } catch (e: any) {
    console.error(`#${_module}:hash:(${func}): ${e.message}`);
    return res(false, "Failed to create hash");
  }
}

const sha1 = (rawData: string, fromEncoding: crypto.Encoding = 'utf-8', toEncoding: crypto.Encoding = 'hex') => {
  return _hash('sha1', rawData, fromEncoding, toEncoding);
}

const sha256 = (rawData: string, fromEncoding: crypto.Encoding = 'utf-8', toEncoding: crypto.Encoding = 'hex') => {
  return _hash('sha256', rawData, fromEncoding, toEncoding);
}

const sha384 = (rawData: string, fromEncoding: crypto.Encoding = 'utf-8', toEncoding: crypto.Encoding = 'hex') => {
  return _hash('sha384', rawData, fromEncoding, toEncoding);
}

const sha512 = (rawData: string, fromEncoding: crypto.Encoding = 'utf-8', toEncoding: crypto.Encoding = 'hex') => {
  return _hash('sha512', rawData, fromEncoding, toEncoding);
}

export default {
  sha1,
  sha256,
  sha384,
  sha512
};
