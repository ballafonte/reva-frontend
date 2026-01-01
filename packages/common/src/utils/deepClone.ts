/**
 * Deep clone an object using JSON serialization.
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
