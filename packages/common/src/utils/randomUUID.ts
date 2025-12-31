import { v4 as uuidv4 } from 'uuid';

export const randomUUID = uuidv4;

const DEFAULT_LENGTH = 10;
/**
 * Returns a number value to be used as a UUID
 *
 * @param length (number)
 * @returns a UUID innumber form
 */
export const getRandomNumber = (length: number = DEFAULT_LENGTH): number => {
  return Math.round(Math.random() * (10 * length));
};

/**
 * Returns a string value to be used as a UUID
 *
 * @param length (number)
 * @returns a UUID in string form
 */
export const getRandomString = (length: number = DEFAULT_LENGTH): string => {
  if (randomUUID && typeof randomUUID === 'function') {
    return randomUUID?.();
  }
  // h/t - https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
