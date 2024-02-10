export function arrayToObject<T, V>(
  array: T[],
  getKey: (item: T) => string,
  getValue: (item: T) => V,
): Record<string, V> {
  const result: Record<string, V> = {};
  array.forEach((item) => {
    result[getKey(item)] = getValue(item);
  });
  return result;
}
