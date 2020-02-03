import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const currentUser = JSON.parse(localStorage.getItem('userData'));
    if (currentUser && currentUser.token) {

       req = req.clone({
        setHeaders: {
          Authorization: `${currentUser.token}`,
        }
      });
    }
    return next.handle(req);
  }
}

