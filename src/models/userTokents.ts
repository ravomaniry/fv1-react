import { UserTokens } from '../clients/fv1';
import { jwtDecode } from 'jwt-decode';

export class UiUserTokens implements UserTokens {
  public accessToken: string;
  public refreshToken: string;
  private expirationTimestamp: number;

  public constructor(raw: UserTokens) {
    this.accessToken = raw.accessToken;
    this.refreshToken = raw.refreshToken;
    this.expirationTimestamp = this.readExpirationDate(raw.accessToken);
  }

  public updateAccessToken(token: string): void {
    this.accessToken = token;
    this.expirationTimestamp = this.readExpirationDate(token);
  }

  public isAccessTokenExpired(): boolean {
    return new Date().getTime() > this.expirationTimestamp;
  }

  private readExpirationDate(accessToken: string): number {
    const decoded = jwtDecode(accessToken);
    return decoded.exp! * 1000; // 1 hour from now
  }
}
