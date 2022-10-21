import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../model/user";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({providedIn: 'root'})
export class AuthenticatedService {
  public host = environment.apiUrl;
  private token!: string;
  private loggedInUsername!: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/register`, user);
  }

  public logOut(): void {

    this.token = null as any;
    this.loggedInUsername = null as any;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string | null): void {
    // @ts-ignore
    this.token = token;
    // @ts-ignore
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User | null): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token') || '{}';
  }

  public getToken(): string {
    return this.token;
  }



  // @ts-ignore
  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
  }
}
