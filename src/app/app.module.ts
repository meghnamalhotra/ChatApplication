import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
  
} from "angular-6-social-login";
import{HttpClientModule}from '@angular/common/http';
import{HttpModule}from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import{RouterModule, Routes, Router}from '@angular/router';
import{FormsModule} from '@angular/forms';
const router:Routes=[{
  path: '',
    component:LoginComponent},
    {
    path: 'chatpage',
    component:ChatComponent},
    {
      path:'login',
      component:LoginComponent
    }
    


];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    RouterModule.forRoot(router),
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [{
    provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs}],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider( "233861707822-a6cn9h32umtbl5pultvetsdh0d7am69v.apps.googleusercontent.com")
        }]
      );
      return config;
      }
//233861707822-a6cn9h32umtbl5pultvetsdh0d7am69v.apps.googleusercontent.com