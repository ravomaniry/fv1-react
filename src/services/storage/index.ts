import { UiUserModel, UserTokens } from '../../clients/fv1';
import { UiUserTokens } from '../../models/userTokents';

export class StorageService {
  private readonly refreshTokenKey = 'e078cb80';
  private readonly userKey = 'd53965678';

  public async getTokens(): Promise<UiUserTokens | null> {
    return this.get(this.refreshTokenKey, (d) => new UiUserTokens(JSON.parse(d)));
  }

  public saveTokens(tokens: UserTokens): void {
    localStorage.setItem(this.refreshTokenKey, JSON.stringify(tokens));
  }

  public getUser(): UiUserModel | null {
    return this.get(this.userKey, JSON.parse);
  }

  public saveUser(user: UiUserModel): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public deleteToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
  }

  public deleteUser(): void {
    localStorage.removeItem(this.userKey);
  }

  private get<T>(key: string, create: (map: string) => T): T | null {
    const raw = localStorage.getItem(key);
    return raw === null ? null : create(raw);
  }
}
