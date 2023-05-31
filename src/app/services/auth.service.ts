import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post<any>(environment.apiUrl + '/auth/login', user);
  }

  getToken(): string {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      if (user.token) {
        return user.token;
      }
    }
    return '';
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }
}
