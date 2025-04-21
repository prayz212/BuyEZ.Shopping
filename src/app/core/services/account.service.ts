import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  SignInRequest,
  SignUpRequest,
  TokenResponse,
  UserDetailResponse,
} from '../../features/accounts/models/api.model';
import { Token, UserInfo } from '../../features/accounts/models/token.model';

@Injectable()
export class AccountService {
  private readonly prefix = 'identities';
  private readonly clientId = environment.clientId;

  constructor(private readonly http: HttpClient) {}

  login(requestPayload: SignInRequest): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.prefix}/login`, {
        ...requestPayload,
        clientId: this.clientId,
      })
      .pipe(
        tap((response: TokenResponse) => {
          this.storeTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            expiresAt: moment().add(response.expiresIn, 'seconds').toDate(),
          });
        })
      );
  }

  logout(refreshToken: string): Observable<Object> {
    return this.http
      .post(`${this.prefix}/revoke-token`, {
        refreshToken,
        clientId: this.clientId,
      })
      .pipe(tap(() => this.deleteTokens()));
  }

  register(requestPayload: SignUpRequest): Observable<UserDetailResponse> {
    return this.http.post<UserDetailResponse>(
      `${this.prefix}/register`,
      requestPayload
    );
  }

  refreshToken(token: string): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.prefix}/refresh-token`, {
        refreshToken: token,
        clientId: this.clientId,
      })
      .pipe(
        tap((response: TokenResponse) => {
          this.storeTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            expiresAt: moment().add(response.expiresIn, 'seconds').toDate(),
          });
        })
      );
  }

  queryUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.prefix}/user-info`);
  }

  // TODO: Put it to LocalStorageService instead
  // TODO: Find a better way to store tokens
  storeTokens(token: Token): void {
    console.log('Storing tokens...');

    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
    localStorage.setItem('expiresAt', token.expiresAt.toUTCString());
  }

  loadTokensFromStorage(): Token {
    console.log('Loading tokens...');

    return {
      accessToken: localStorage.getItem('accessToken') ?? '',
      refreshToken: localStorage.getItem('refreshToken') ?? '',
      expiresAt: new Date(localStorage.getItem('expiresAt') ?? ''),
    };
  }

  deleteTokens(): void {
    console.log('Deleting tokens...');

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
  }
}
