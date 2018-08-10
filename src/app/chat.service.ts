import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { Observable } from '../../node_modules/rxjs';
import { map } from '../../node_modules/rxjs/operators';
import { SocialUser } from '../../node_modules/angular-6-social-login';
@Injectable({
  providedIn: 'root'
})
export class ChatService implements CanActivate {
  constructor(private httpobj: Http, private route: Router) { }

  canActivate() {
    if (localStorage.getItem("Identity")!=null) {
     //this.route.navigate(['/chatpage'])
      return true;
      
    }
    else {
      console.log("false");
      this.route.navigate(['/'])
      return false;
    }
  }

  serId: string = "IS3d084ab427a14238a838899811a10138";
  channel: string = "CH54b64c8dfcec482f80f757a7063038a4";
  identity: string = localStorage.getItem("Identity");
  headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic QUNlNGEyMTAyOWM2NzA5Zjg0YTYxNzlkNDYwZDQzZjYzNzo3NGI4MDIyNjRiYTVjZTE0MTUyZTg2ZGQ0NTM5NGMzNQ=='
  });
  options = new RequestOptions({ headers: this.headers });
  setData(): Observable<any> {


    return this.httpobj.post("https://chat.twilio.com/v2/Services", "FriendlyName=FriendlyName", this.options);//show data
  }

  addCh(Mychannel): Observable<any> {
    this.channel = Mychannel;
    return this.httpobj.post("https://chat.twilio.com/v2/Services/" + this.serId + "/Channels", "FriendlyName=FriendlyName&UniqueName=" + Mychannel, this.options)
  }

  Msgs(Mymsg): Observable<any> {

    return this.httpobj.post("https://chat.twilio.com/v2/Services/" + this.serId + "/Channels/" + this.channel + "/Messages", "ServiceSid=" + this.serId + "&ChannelSid=" + this.channel + "&Body=" + Mymsg + "&From=" + this.identity, this.options)

  }

  listmsgs(): Observable<any> {
    return this.httpobj.get("https://chat.twilio.com/v2/Services/" + this.serId + "/Channels/" + this.channel + "/Messages", this.options).pipe(map(data => data));
  }
  addRole() {
    return this.httpobj.post("https://chat.twilio.com/v2/Services/" + this.serId + "/Roles", "FriendlyName=FriendlyName&Type=deployment&Permission=createChannel", this.options);
  }
}
