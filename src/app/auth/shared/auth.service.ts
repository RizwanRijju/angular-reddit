import { EventEmitter, Injectable, Output } from '@angular/core';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login.request.payload';
import { LoginResponse } from '../login/login.response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient, 
    private localStorage: LocalStorageService) { }


  signup(signupRequestPayload: SignupRequestPayload): Observable<any>{
    return this.httpClient.post(this.baseUrl + 'api/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean>{

    return this.httpClient.post<LoginResponse>(this.baseUrl + 'api/auth/login',
      loginRequestPayload).pipe(map(data => {

        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;

      }));

  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()

    }
    return this.httpClient.post<LoginResponse>(this.baseUrl + 'api/auth/refresh/token',
      refreshTokenPayload)
      .pipe(tap((response: { authenticationToken: any; expiresAt: any; refreshToken: any; username: any; }) => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
        this.localStorage.store('username', response.username);
        this.localStorage.store('refreshToken', response.refreshToken);
      }));
  }

  logout() {
    this.httpClient.post(this.baseUrl + 'api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe({
        next: (data) => console.log(data),
        error: (e) => throwError(() => new Error(e))
      });
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

}
