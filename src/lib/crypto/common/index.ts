import * as crypto from "crypto";

import { IResRandomSecureBuffer, IResRandomSecureToken } from "./interfaces";
import tval from "@app/lib/tval";
import { IRes, res } from "@app/interfaces/i-res";

const _module = 'common';

export const DEFAULT_RANDOM_SECURE_BUFFER_BYTES = 16;

const randomSecureToken = (size: number): IRes<IResRandomSecureToken> => {
  try {

    if (!tval.isPosNumber(size))
      throw Error('Invalid size');

    const buffer: Buffer = crypto.randomBytes(size);
    if (!tval.isBuffer(buffer))
      return res(false, 'Failed to create random secure token');

    const token: string = buffer.toString('hex');
    if (!tval.isString(token) || !token.length)
      return res(false, 'Failed to create random secure token');

    return res(true, 'success', { randomSecureToken: token });
  } catch (e: any) {
    console.error(`#${_module}:randomSecureToken: ${e.message}`);
    return res(false, 'Failed to create random secure token');
  }
}

const randomSecureBuffer = (lenBytes: number = DEFAULT_RANDOM_SECURE_BUFFER_BYTES): IRes<IResRandomSecureBuffer> => {
  try {

    if (!tval.isPosNumber(lenBytes))
      throw Error('Invalid bytes size');

    const buffer = crypto.randomBytes((+lenBytes));
    if (!tval.isBuffer(buffer))
      return res(false, 'Failed to create random secure-buffer');

    return res(true, 'success', { buffer });
  } catch (e: any) {
    console.error(` #${_module}:randomSecureBuffer: ${e.message}`);
    return res(false, 'Failed to create random secure-buffer',);
  }
}

export default {
  randomSecureToken,
  randomSecureBuffer,
};
