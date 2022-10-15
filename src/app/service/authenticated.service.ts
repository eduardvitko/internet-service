import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedService {
  public host = environment.apiUrl;

  constructor(private http : HttpClient) {}
  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/api/login`, user, { observe: 'response' });
  }
}
