import { Injectable } from '@angular/core';
import {
  Observable,
  of,
  BehaviorSubject,
  Subject,
  ObservableInput
} from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { USERS } from './mock-users';
import { RESULTS } from './mock-results';
import { LowerCasePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private _HOST = environment._HOST;
  constructor(private http: HttpClient) {}

  authenticateUser(user: any): Observable<any> {
    return this.http.post(this._HOST + '/user/authenticate', user);
  }

  setSession(authResult) {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');
    sessionStorage.setItem('id_token', authResult.token);
    // sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    sessionStorage.removeItem('id_token');
    // sessionStorage.removeItem('expires_at');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = sessionStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getIdToken() {
    this.token = sessionStorage.getItem('id_token');
    return this.token;
  }

  getUserFromToken(token: any) {
    // return jwt_decode(token);
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
}
