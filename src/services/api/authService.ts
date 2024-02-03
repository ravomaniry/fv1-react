import { StorageService } from '../storage';
import { NotConnectedException } from '../../types/exceptions';
import { Logger } from '../../lib/logger';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto, UiUserModel } from '../../clients/fv1';
import { UiUserTokens } from '../../models/userTokens';
import { AxiosRequest } from '../../types/axiosRequest';
import { AuthClient } from './authClient';

export class AuthService {
  private storage: StorageService;
  private logger: Logger;
  private tokens: UiUserTokens | null = null;

  public constructor(
    storage: StorageService,
    private readonly client: AuthClient,
  ) {
    this.storage = storage;
    this.logger = new Logger('AuthService');
  }

  public async login(data: LoginRequestDto): Promise<UiUserModel> {
    return this.handleLogin(() => this.client.login(data));
  }

  public async register(data: RegisterRequestDto): Promise<UiUserModel> {
    return this.handleLogin(() => this.client.register(data));
  }

  public async registerGuest(): Promise<UiUserModel> {
    return this.handleLogin(() => this.client.registerGuest());
  }

  public logOut(): void {
    this.storage.deleteToken();
    this.storage.deleteUser();
  }

  private async handleLogin(fn: AxiosRequest<LoginResponseDto>): Promise<UiUserModel> {
    try {
      const resp = await fn();
      this.tokens = new UiUserTokens(resp.data.tokens);
      this._saveTokens();
      this.storage.saveUser(resp.data.user);
      return resp.data.user;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async _refreshExpiredToken(): Promise<void> {
    if (this.tokens?.isAccessTokenExpired()) {
      const resp = await this.client.refreshToken({ token: this.tokens!.refreshToken });
      this.tokens = new UiUserTokens(resp.data);
      this.logger.info('Access token refreshed');
      this._saveTokens();
    }
  }

  private _saveTokens(): void {
    if (this.tokens) {
      this.storage.saveTokens(this.tokens);
      this.logger.info('Tokens saved');
    }
  }

  public async getAccessToken(): Promise<string> {
    this.tokens = this.tokens || (await this.storage.getTokens());
    this.logger.info(`Token from local storage: ${this.tokens !== null}`);
    if (!this.tokens) {
      throw new NotConnectedException();
    }
    await this._refreshExpiredToken();
    return this.tokens.accessToken;
  }
}
