import bcrypt from 'bcrypt';

const _module = 'BCrypt';
const SALT_ROUNDS = 10;

const hash = async (payload: string, saltRounds = 0): Promise<string> => {
  try {
    const rounds = saltRounds || SALT_ROUNDS;
    const hash_t = await bcrypt.hash(payload, rounds);
    return hash_t;
  } catch (e: any) {
    console.error(` #${_module}:hash: ${e.message}`);
    return "";
  }
}

const compare = async (payload: string, hash_t: string): Promise<boolean> => {
  try {
    const match = payload && hash_t && (await bcrypt.compare(payload, hash_t));
    return match;
  } catch (e: any) {
    console.error(` #${_module}:compare: ${e.message}`);
    return false;
  }
}

export default {
  hash,
  compare,
}
