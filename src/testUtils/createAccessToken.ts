import sign from 'jwt-encode';

export function createAccessToken(date: Date) {
  return sign({ exp: Math.floor(date.getTime() / 1000) }, 'test');
}
