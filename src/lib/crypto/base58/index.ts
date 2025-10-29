import { IObject } from "@app/lib/tval";

const _module = 'base58';

const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = alphabet.length;

const alphabetLookup = [...alphabet].reduce((lookup: IObject, char: string, index: number) => {
  lookup[char] = index;
  return lookup;
}, {});

const intToBase58 = (num: number): string => {
  let str = "";
  let modulus: number;

  num = Math.floor(+num);

  while (num >= base) {
    modulus = num % base;
    str = alphabet[modulus] + str;
    num = Math.floor(num / base);
  }

  return alphabet[num] + str;
};

const base58ToInt = (str: string): number => {
  str = `${str}`;
  return [...str]
    .reverse()
    .reduce((num, character, index) => {
      // assertBase58Character(character);
      return num + alphabetLookup[character] * Math.pow(base, index);
    }, 0);
};

export default {
  intToBase58,
  base58ToInt,
};
