import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let req = request.clone();
    if (request.url.indexOf('stadium') === -1) {
      const API_KEY: any = {
        Authorization: `Bearer ${this.authService.getJwt()}`,
      };
      req = request.clone({ setHeaders: API_KEY });
    }
    return next.handle(req);
  }
}
