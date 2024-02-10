import { UserTokens } from '../clients/fv1';
import { jwtDecode } from 'jwt-decode';

// we cannot use class with methods because of redux serializable check
export interface UiUserTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expirationTimestamp: number;
}

export function newUiUserTokens(raw: UserTokens): UiUserTokens {
  return {
    ...raw,
    expirationTimestamp: readExpirationDate(raw.accessToken),
  };
}

function readExpirationDate(accessToken: string): number {
  const decoded = jwtDecode(accessToken);
  return decoded.exp! * 1000; // 1 hour from now
}

export function updateAccessToken(userToken: UiUserTokens, accessToken: string): UiUserTokens {
  return newUiUserTokens({ ...userToken, accessToken });
}

export function isAccessTokenExpired(token: UiUserTokens): boolean {
  return new Date().getTime() > token.expirationTimestamp;
}
