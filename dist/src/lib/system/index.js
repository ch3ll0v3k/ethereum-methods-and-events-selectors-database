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
const fs_extra_1 = __importDefault(require("fs-extra"));
const fsSync = __importStar(require("fs"));
const fsPromises = __importStar(require("node:fs/promises"));
const os = __importStar(require("os"));
const promises_1 = require("node:timers/promises");
const tval_1 = __importDefault(require("../../lib/tval"));
const _module = 'ststem';
const createDir = async (path, recursive = true) => {
    try {
        await fsPromises.mkdir(path, { recursive });
        return true;
    }
    catch (e) {
        console.error(`#${_module}: create-dir: ${e.message}`);
        return false;
    }
};
const removeDir = async (path, recursive = true, force = true) => {
    try {
        await fsPromises.rm(path, { recursive, force });
        return true;
    }
    catch (e) {
        console.error(`#${_module}: remove-dir: ${e.message}`);
        return false;
    }
};
const removeFile = async (path, recursive = false, force = false) => {
    try {
        await fsPromises.rm(path, { recursive, force });
        return true;
    }
    catch (e) {
        console.error(`#${_module}: remove-file: ${e.message}`);
        return false;
    }
};
const moveFile = async (src, dst, overwrite = true) => {
    try {
        await fs_extra_1.default.move(src, dst, { overwrite: true });
        return true;
    }
    catch (e) {
        console.error(`#${_module}: move-file: ${e.message}`);
        return false;
    }
};
const readDir = async (path) => {
    return new Promise(async (resolve) => {
        try {
            const data = await fsPromises.readdir(path);
            return resolve(data);
        }
        catch (e) {
            console.error(`#${_module}: list-dir: ${e.message}`);
            return resolve([]);
        }
    });
};
const listDir = readDir;
const readDirSync = (path) => {
    try {
        const data = fsSync.readdirSync(path);
        return data;
    }
    catch (e) {
        console.error(`#${_module}: list-dir:sync: ${e.message}`);
        return [];
    }
};
const listDirSync = readDirSync;
const writeFile = async (path, data, options) => {
    try {
        await fsPromises.writeFile(path, data, {
            encoding: 'utf8',
            ...tval_1.default.getObject(options, {}),
        });
        return true;
    }
    catch (e) {
        console.error(`#${_module}: writeFile:async: ${e.message}`);
        return false;
    }
};
const writeJSON = async (path, data) => {
    try {
        const json_t = JSON.stringify(data, null, 2);
        return writeFile(path, json_t, { encoding: 'utf8' });
    }
    catch (e) {
        console.error(`#${_module}: writeFile:async: ${e.message}`);
        return false;
    }
};
const writeFileSync = (path, data, options) => {
    try {
        fsSync.writeFileSync(path, data, {
            encoding: 'utf8',
            ...tval_1.default.getObject(options, {}),
        });
        return true;
    }
    catch (e) {
        console.error(`#${_module}: writeFileSync: ${e.message}`);
        return false;
    }
    // fsPromises.readFile(path[, options])
    //   path <string> | <Buffer> | <URL> | <FileHandle> filename or FileHandle
    //   options <Object> | <string>
    //       encoding <string> | <null> Default: null
    //       flag <string> See support of file system flags. Default: 'r'.
    //       signal <AbortSignal> allows aborting an in-progress readFile
};
const readFile = async (path, options) => {
    try {
        // options = {
        //   encoding: 'utf-8',
        //   ...tval.getObject(options, {}),
        // };
        const data = await fsPromises.readFile(path, { encoding: 'utf8' });
        return data.toString();
    }
    catch (e) {
        console.error(`#${_module}: readFile:async: ${e.message}`);
        return "";
    }
    // fsPromises.readFile(path[, options])
    //   path <string> | <Buffer> | <URL> | <FileHandle> filename or FileHandle
    //   options <Object> | <string>
    //       encoding <string> | <null> Default: null
    //       flag <string> See support of file system flags. Default: 'r'.
    //       signal <AbortSignal> allows aborting an in-progress readFile
};
const readJSON = async (path) => {
    try {
        const utf8 = await readFile(path, { encoding: 'utf8' });
        const json = JSON.parse(utf8);
        return json;
    }
    catch (e) {
        console.error(`#${_module}: readJSON:async: ${e.message}`);
        return {};
    }
};
const readJSON_C = async (path) => {
    try {
        const utf8 = await readFile(path, { encoding: 'utf8' });
        const rawJson = utf8.split('\n')
            .filter((line) => !line.trim().startsWith('//'))
            .join('\n');
        const json = JSON.parse(rawJson);
        return json;
    }
    catch (e) {
        console.error(`#${_module}: readJSON_C:async: ${e.message}`);
        return {};
    }
};
const readJSONasT = async (path) => {
    try {
        const json = await readJSON(path);
        return json;
    }
    catch (e) {
        console.error(`#${_module}: readFile:async: ${e.message}`);
        return {};
    }
};
const readFileToBuffer = async (path, options) => {
    try {
        // options = {
        //   // encoding: 'binary',
        //   // encoding: 'buffer',
        //   ...tval.getObject(options, {}),
        // };
        const data = await fsPromises.readFile(path);
        return data;
    }
    catch (e) {
        console.error(`#${_module}: readFileToBuffer:async: ${e.message}`);
        return;
    }
};
const readFileSync = (path, options) => {
    try {
        options = {
            encoding: 'utf-8',
            ...tval_1.default.getObject(options, {}),
        };
        const data = fsSync.readFileSync(path, options);
        return data.toString();
    }
    catch (e) {
        console.error(`#${_module}: readFile:sync: ${e.message}`);
        return "";
    }
};
const readFileToBufferSync = (path, options) => {
    try {
        options = {
            // encoding: 'binary',
            // encoding: 'buffer',
            ...tval_1.default.getObject(options, {}),
        };
        const data = fsSync.readFileSync(path, options);
        return data;
    }
    catch (e) {
        console.error(`#${_module}: readFileToBufferSync:sync: ${e.message}`);
        return;
    }
    // fs.readFileSync(path[, options])
    // path <string> | <Buffer> | <URL> | <integer> filename or file descriptor
    // options <Object> | <string>
    //     encoding <string> | <null> Default: null
    //     flag <string> See support of file system flags. Default: 'r'.
    // Returns: <string> | <Buffer>
};
const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
const randFloat = (min, max) => {
    return Math.random() * (max - min) + min;
};
const getHostname = () => {
    return os.hostname().trim();
};
const getFileInfo = (path) => {
    try {
        if (!tval_1.default.isString(path))
            return false;
        return fsSync.statSync(path); // .isDirectory(); 
    }
    catch (e) {
        // console.error(`${_module}: getFileInfo: ${e.message}`);
        return false;
    }
};
const fGetFileInfo = (path) => {
    try {
        if (!tval_1.default.isString(path))
            return false;
        return fsSync.statSync(path); // .isDirectory(); 
    }
    catch (e) {
        console.error(`${_module}: fGetFileInfo: ${e.message}`);
        return false;
    }
};
const isFile = (path) => {
    const info = getFileInfo(path);
    return info && !info.isDirectory();
};
const isDir = (path) => {
    const info = getFileInfo(path);
    return info && info.isDirectory();
};
const isStrictMode = () => {
    return (!this);
};
const clear = () => {
    try {
        // if (!isStrictMode()) {
        //   process.stdout.write('\033c');
        // } else {
        //   console.warn(` console.clear: Octal escape sequences are not allowed in strict mode `);
        // }
    }
    catch (e) {
        console.warn(`${_module}: clear: ${e.message}`);
    }
};
const sleep = async (msec) => {
    await (0, promises_1.setTimeout)(msec);
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
};
exports.default = {
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
};
