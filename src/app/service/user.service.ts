import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/users`);
  }

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/user/save`, formData);
  }
  public createUserFormDate( user: User, ): FormData {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('username', user.username);
    formData.append('password', user.password);
    // @ts-ignore
    formData.append('role',user.role);
    return formData;
  }
}
