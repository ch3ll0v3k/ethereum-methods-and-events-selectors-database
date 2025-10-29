// const gray = "\u001b[01;30m";
const red = "\u001b[01;31m";
const green = "\u001b[01;32m";
const yellow = "\u001b[01;33m";
const blue = "\u001b[01;34m";
const purple = "\u001b[01;35m";
const blue2 = "\u001b[01;36m";
const white = "\u001b[01;37m";
const endl = "\u001b[0m";

const R = (value: any) => `${red}${value}${endl}`;
const G = (value: any) => `${green}${value}${endl}`;
const B = (value: any) => `${blue}${value}${endl}`;
const P = (value: any) => `${purple}${value}${endl}`;
const Y = (value: any) => `${yellow}${value}${endl}`;
const W = (value: any) => `${white}${value}${endl}`;
const B2 = (value: any) => `${blue2}${value}${endl}`;

export { R, G, B, P, Y, W, B2 };

declare global {
  interface Console {
    json(input: any, fn?: any, format?: string | number | undefined): void;
    toJson(input: any, fn?: any, format?: string | number | undefined): any;
    line(): void;
    deepClone(data: any): Object;
    ok(input: any): void;
  }
}

const BigIntReplaces = (key: string, value: any) => typeof value === "bigint" ? { $bigint: value.toString() } : value;

const circularStructure = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return `[circular structure]`;
      }


      value = BigIntReplaces(key, value);
      seen.add(value);
    }
    if (typeof value === "function") {
      return `[function]`;
    }
    value = BigIntReplaces(key, value);
    return value;
  };
};

const reviver = (key: any, value: any) => {
  return (
    value !== null &&
    typeof value === "object" &&
    "$bigint" in value &&
    typeof value.$bigint === "string"
  )
    ? BigInt(value.$bigint)
    : value;
}

const JSONparse = JSON.parse;

JSON.parse = (payload: string) => {
  const parsed = JSONparse(payload, reviver);
  return parsed;
};

console.toJson = function (input: any, fn: any = undefined, format: string | number | undefined = 2): any {
  try {
    fn = fn || circularStructure();
    const json_t = JSON.stringify(input, fn, format);
    return json_t;
  } catch (e: any) {
    console.error(`console.json(input: any): ${e.message}`);
    return 'error-encoding-json';
  }
};

// prettier-ignore
console.json = function (input: any, fn: any = undefined, format: string | number | undefined = 2): void {
  try {
    const json_t = console.toJson(input, fn, format);
    console.log(json_t);
  } catch (e: any) {
    console.error(`console.json(input: any): ${e.message}`);
  }
};


console.ok = (input: string): void => {
  try {
    console.log(G(input));
  } catch (e: any) {
    console.error(`console.ok(input: string): ${e.message}`);
  }
};

// prettier-ignore
console.line = (): void => {
  const line = ' ----  ----  ----  ----  ----  ----  ----  ----  ---- ';
  console.log(line);
};

export { };
