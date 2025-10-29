import { hexBytesString } from "@app/interfaces/app";

export interface IResRandomSecureBuffer {
  buffer: Buffer;
}

export interface IResRandomSecureToken {
  randomSecureToken: hexBytesString;
}
