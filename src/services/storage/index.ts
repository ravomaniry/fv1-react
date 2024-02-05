import { UiUserModel, UserTokens } from '../../clients/fv1';
import { UiUserTokens } from '../../models/userTokens';

export const tokenKey = 'e078cb80';
export const userKey = 'd53965678';

export class StorageService {
  public async getTokens(): Promise<UiUserTokens | null> {
    if (!this.storageStateIsValid()) {
      return null;
    }
    return this.get(tokenKey, (d) => new UiUserTokens(JSON.parse(d)));
  }

  public saveTokens(tokens: UserTokens): void {
    localStorage.setItem(tokenKey, JSON.stringify(tokens));
  }

  public getUser(): UiUserModel | null {
    if (!this.storageStateIsValid()) {
      return null;
    }
    return this.get(userKey, JSON.parse);
  }

  public saveUser(user: UiUserModel): void {
    localStorage.setItem(userKey, JSON.stringify(user));
  }

  public deleteToken(): void {
    localStorage.removeItem(tokenKey);
  }

  public deleteUser(): void {
    localStorage.removeItem(userKey);
  }

  private get<T>(key: string, create: (map: string) => T): T | null {
    const raw = localStorage.getItem(key);
    return raw === null ? null : create(raw);
  }

  private storageStateIsValid(): boolean {
    return Boolean(localStorage.getItem(userKey) && localStorage.getItem(tokenKey));
  }
}
