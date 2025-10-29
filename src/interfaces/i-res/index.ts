
export interface IRes<T> {
  success: boolean;
  message: string;
  data: T
}

export const res = <T>(success: boolean, message: string, data?: T): IRes<T> => {
  try {
    return { success, message, data };
  } catch (e: any) {
    return { success: false, message: e.message, data: null as T };
  }
}

export interface IAppPath {
  app: string;
  root: string;
}
