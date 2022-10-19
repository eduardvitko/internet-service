import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticatedService} from "./service/authenticated.service";

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {AuthenticationGuard} from "./guard/authentication.guard";

import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {NotificationService} from "./service/notification.service";
import {UserService} from "./service/user.service";
import {AppRoutingModule} from "./app-routing.module";
import {NotificationModule} from "./notification.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotificationModule


  ],
    providers: [NotificationService, AuthenticationGuard, AuthenticatedService, UserService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
