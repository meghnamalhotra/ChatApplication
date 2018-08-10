import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  
} from 'angular-6-social-login';
import{Router}from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
title="LET'S CHAT";
  constructor( private socialAuthService: AuthService ,private router:Router) { }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        localStorage.setItem("Identity",userData.email);
      this.router.navigate(['chatpage'])
      }
    );
  }

  ngOnInit() {
  }

}
