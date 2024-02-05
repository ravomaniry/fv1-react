import sign from 'jwt-encode';

/**
 *
 * @param date - default = `new Date().getTime() + 60 * 1000`
 */
export function createAccessToken(date?: Date) {
  return sign({ exp: Math.floor((date?.getTime() ?? new Date().getTime() + 60 * 1000) / 1000) }, 'test');
}
