import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

const api = environment.api;
export interface User {
  last_login?: Date;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  is_stadium_owner: boolean;
  telephone: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  isLoggedIn = new BehaviorSubject<boolean>(false);

  login(username: string, password: string) {
    return this.http.post(api + 'auth/login', {
      username,
      password,
    });
  }

  signup(creds: User) {
    return this.http.post(api + 'auth/register', {
      creds,
    });
  }

  logout() {
    this.clearToken();
    this.isLoggedIn.next(false);
    this.router.navigate(['/']);
  }
  autologin() {}

  saveJwt(token: string) {
    localStorage.setItem('jwt', token);
  }

  saveRefresh(refresh: string) {
    localStorage.setItem('refresh', refresh);
  }

  clearToken() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refresh');
  }
  getJwt() {
    return localStorage.getItem('jwt');
  }
  getRefresh() {
    return localStorage.getItem('refresh');
  }

  verify() {
    let jwt: any = this.getJwt(),
      refresh: any = this.getRefresh();

    if (!jwt && !refresh) {
      return false;
    } else {
      let decoded: any = jwt_decode(jwt);
      let current_time: any = Date.now() / 1000;
      if (decoded.exp < current_time) {
        return this.refresh_token(refresh);
      } else {
        if (this.router.url === '/login' || this.router.url === '/register') {
          this.router.navigate(['/']);
        }
        return true;
      }
    }
  }

  refresh_token(token: string): boolean | void {
    if (!token) {
      return;
    }
    this.http
      .post(`${environment.api}auth/refresh`, { refresh: token })
      .subscribe(
        (res: any) => {
          window.location.reload();
          this.saveJwt(res['access']);
          return true;
        },
        (err: any) => {
          return false;
        }
      );
  }
}
