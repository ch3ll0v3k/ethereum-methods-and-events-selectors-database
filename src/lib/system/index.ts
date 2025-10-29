import fse, { OpenMode } from 'fs-extra';
import * as fsSync from "fs";
import * as fsPromises from "node:fs/promises";
import * as os from "os";
import { setTimeout as _sleep } from "node:timers/promises";

import tval, { IObject } from "@app/lib/tval";

const _module = 'ststem';

interface IReadFileOptions {
  encoding?: any;
  // flag?: OpenMode | string;
}

const createDir = async (path: string, recursive: boolean = true): Promise<boolean> => {
  try {
    await fsPromises.mkdir(path, { recursive });
    return true;
  } catch (e: any) {
    console.error(`#${_module}: create-dir: ${e.message}`);
    return false;
  }
};

const removeDir = async (path: string, recursive: boolean = true, force: boolean = true): Promise<boolean> => {
  try {
    await fsPromises.rm(path, { recursive, force });
    return true;
  } catch (e: any) {
    console.error(`#${_module}: remove-dir: ${e.message}`);
    return false;
  }
};

const removeFile = async (path: string, recursive: boolean = false, force: boolean = false): Promise<boolean> => {
  try {
    await fsPromises.rm(path, { recursive, force });
    return true;
  } catch (e: any) {
    console.error(`#${_module}: remove-file: ${e.message}`);
    return false;
  }
};

const moveFile = async (src: string, dst: string, overwrite: boolean = true): Promise<boolean> => {
  try {
    await fse.move(src, dst, { overwrite: true });
    return true;
  } catch (e: any) {
    console.error(`#${_module}: move-file: ${e.message}`);
    return false;
  }
};

const readDir = async (path: string): Promise<string[]> => {
  return new Promise(async (resolve) => {
    try {
      const data = await fsPromises.readdir(path,);
      return resolve(data);
    } catch (e: any) {
      console.error(`#${_module}: list-dir: ${e.message}`);
      return resolve([]);
    }
  });
};

const listDir = readDir;

const readDirSync = (path: string): string[] => {
  try {
    const data: string[] = fsSync.readdirSync(path);
    return data;
  } catch (e: any) {
    console.error(`#${_module}: list-dir:sync: ${e.message}`);
    return [];
  }
};

const listDirSync = readDirSync;

const writeFile = async (path: string, data: string, options?: IReadFileOptions): Promise<boolean> => {
  try {
    await fsPromises.writeFile(path, data, {
      encoding: 'utf8',
      ...tval.getObject(options, {}),
    });
    return true;
  } catch (e: any) {
    console.error(`#${_module}: writeFile:async: ${e.message}`);
    return false;
  }
}

const writeJSON = async (path: string, data: IObject): Promise<boolean> => {
  try {
    const json_t: string = JSON.stringify(data, null, 2);
    return writeFile(path, json_t, { encoding: 'utf8' });
  } catch (e: any) {
    console.error(`#${_module}: writeFile:async: ${e.message}`);
    return false;
  }
}

const writeFileSync = (path: string, data: string, options?: IReadFileOptions): boolean => {
  try {
    fsSync.writeFileSync(path, data, {
      encoding: 'utf8',
      ...tval.getObject(options, {}),
    });
    return true;
  } catch (e: any) {
    console.error(`#${_module}: writeFileSync: ${e.message}`);
    return false;
  }
  // fsPromises.readFile(path[, options])
  //   path <string> | <Buffer> | <URL> | <FileHandle> filename or FileHandle
  //   options <Object> | <string>
  //       encoding <string> | <null> Default: null
  //       flag <string> See support of file system flags. Default: 'r'.
  //       signal <AbortSignal> allows aborting an in-progress readFile
}

const readFile = async (path: string, options?: IReadFileOptions): Promise<string> => {
  try {

    // options = {
    //   encoding: 'utf-8',
    //   ...tval.getObject(options, {}),
    // };
    const data = await fsPromises.readFile(path, { encoding: 'utf8' });
    return data.toString();
  } catch (e: any) {
    console.error(`#${_module}: readFile:async: ${e.message}`);
    return "";
  }
  // fsPromises.readFile(path[, options])
  //   path <string> | <Buffer> | <URL> | <FileHandle> filename or FileHandle
  //   options <Object> | <string>
  //       encoding <string> | <null> Default: null
  //       flag <string> See support of file system flags. Default: 'r'.
  //       signal <AbortSignal> allows aborting an in-progress readFile
}

const readJSON = async (path: string): Promise<any> => {
  try {
    const utf8 = await readFile(path, { encoding: 'utf8' });
    const json = JSON.parse(utf8);
    return json;
  } catch (e: any) {
    console.error(`#${_module}: readJSON:async: ${e.message}`);
    return {};
  }
}

const readJSON_C = async (path: string): Promise<any> => {
  try {
    const utf8 = await readFile(path, { encoding: 'utf8' });
    const rawJson = utf8.split('\n')
      .filter((line: string) => !line.trim().startsWith('//'))
      .join('\n');

    const json = JSON.parse(rawJson);
    return json;
  } catch (e: any) {
    console.error(`#${_module}: readJSON_C:async: ${e.message}`);
    return {};
  }
}

const readJSONasT = async<T>(path: string): Promise<T> => {
  try {
    const json = await readJSON(path);
    return json as T;
  } catch (e: any) {
    console.error(`#${_module}: readFile:async: ${e.message}`);
    return {} as T;
  }
}

const readFileToBuffer = async (path: string, options?: IReadFileOptions): Promise<Buffer> => {
  try {

    // options = {
    //   // encoding: 'binary',
    //   // encoding: 'buffer',
    //   ...tval.getObject(options, {}),
    // };
    const data = await fsPromises.readFile(path);
    return data;
  } catch (e: any) {
    console.error(`#${_module}: readFileToBuffer:async: ${e.message}`);
    return;
  }
}

const readFileSync = (path: string, options?: IReadFileOptions): string => {
  try {

    options = {
      encoding: 'utf-8',
      ...tval.getObject(options, {}),
    };

    const data = fsSync.readFileSync(path, options);
    return data.toString();
  } catch (e: any) {
    console.error(`#${_module}: readFile:sync: ${e.message}`);
    return "";
  }
}

const readFileToBufferSync = (path: string, options?: any): Buffer => {
  try {

    options = {
      // encoding: 'binary',
      // encoding: 'buffer',
      ...tval.getObject(options, {}),
    };

    const data = fsSync.readFileSync(path, options);
    return data;
  } catch (e: any) {
    console.error(`#${_module}: readFileToBufferSync:sync: ${e.message}`);
    return;
  }

  // fs.readFileSync(path[, options])
  // path <string> | <Buffer> | <URL> | <integer> filename or file descriptor
  // options <Object> | <string>
  //     encoding <string> | <null> Default: null
  //     flag <string> See support of file system flags. Default: 'r'.
  // Returns: <string> | <Buffer>

}

const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const randFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
}

const getHostname = (): string => {
  return os.hostname().trim();
}

const getFileInfo = (path: any): fsSync.Stats | false => {
  try {
    if (!tval.isString(path)) return false;
    return fsSync.statSync(path); // .isDirectory(); 
  } catch (e: any) {
    // console.error(`${_module}: getFileInfo: ${e.message}`);
    return false;
  }
}

const fGetFileInfo = (path: any): fsSync.Stats | false => {
  try {
    if (!tval.isString(path)) return false;
    return fsSync.statSync(path); // .isDirectory(); 
  } catch (e: any) {
    console.error(`${_module}: fGetFileInfo: ${e.message}`);
    return false;
  }
}

const isFile = (path: any): boolean => {
  const info = getFileInfo(path);
  return info && !info.isDirectory();
};

const isDir = (path: any): boolean => {
  const info = getFileInfo(path);
  return info && info.isDirectory();
};

const isStrictMode = (): boolean => {
  return (!this);
}

const clear = () => {
  try {
    // if (!isStrictMode()) {
    //   process.stdout.write('\033c');
    // } else {
    //   console.warn(` console.clear: Octal escape sequences are not allowed in strict mode `);
    // }
  } catch (e: any) {
    console.warn(`${_module}: clear: ${e.message}`);
  }
}


const sleep = async (msec: number): Promise<boolean> => {
  await _sleep(msec);
  return true;
  // return new Promise(async (resolve: any) => {
  //   try {
  //     let timeout_t = setTimeout(async () => {
  //       clearTimeout(timeout_t);
  //       resolve(true);
  //     }, msec);
  //   } catch (e: any) {
  //     console.error(`#${_module}: sleep: ${e.message}`);
  //     resolve(true);
  //   }
  // });
}


export default {
  createDir,
  removeDir,
  removeFile,
  moveFile,

  readDir,
  listDir,

  readDirSync,
  listDirSync,

  readFile,
  readFileToBuffer,
  readFileSync,
  readFileToBufferSync,

  readJSON,
  readJSONasT,

  writeFile,
  writeJSON,
  readJSON_C,
  writeFileSync,

  randInt,
  randFloat,
  getHostname,
  getFileInfo,
  fGetFileInfo,
  isFile,
  isDir,
  isStrictMode,
  clear,
  sleep,

}

