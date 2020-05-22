import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CreateUser } from '../shared/createUser.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { UserLoginResponse, User } from '../shared/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthService {
  // url = '';
  url = 'http://localhost:3000';
  user = new BehaviorSubject<User>(null);
  private token: string;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  createUser(body: CreateUser) {
    return this.http.post(`${this.url}/api/auth/register`, body)
    .pipe(catchError(errorRes => {
      return throwError(errorRes.error.message);
    }));
    }

  loginUser(user: {username: string, password: string}) {
    return this.http.post<UserLoginResponse>(`${this.url}/api/auth/login`, user)
    .pipe(catchError(errorRes => {
      return throwError(errorRes.error);
    }),
    tap(resData => {
      const userRes = new User(resData.token, resData.username, resData.isPro, resData.isAdmin);
      localStorage.setItem('userData', JSON.stringify(userRes));
      this.user.next(userRes);
      this.autologout(3600000);
    })
    );
    }

    autoLogin() {
      const userData: UserLoginResponse = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return;
      }
      const loadedUser = new User(userData.token, userData.username, userData.isPro, userData.isAdmin);
      this.user.next(loadedUser);
    }

    logout() {
      this.user.next(null);
      this.router.navigate(['login']);
      localStorage.removeItem('userData');
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
    }

    autologout(expirationDuration: number) {
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expirationDuration);
    }
}
