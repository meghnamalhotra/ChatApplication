import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  img: any = localStorage.getItem("image");
  arraySer: any = [];
  Mychannel: string;
  Mymsg: string;
  arrylist = [];
  len: number;
  sid;
  channel = ""; //interpolation of found channel on view
  mychann: string; //binding of text input channel from view to model
  iden = this.service.identity;
  Id: string;
  arrychannel = [];
  channels: string;
  nam=localStorage.getItem("name");
  logout()
  {
    localStorage.clear();
  this.route.navigate(['/']);
 
  }
  constructor(private service: ChatService, private route:Router) { }

  ngOnInit() {

 //setInterval(()=> this.listallmsgs(this.idd),8000);
    
    this.channelist();

  }
  Authenticate() {
    this.service.setData().subscribe(res => { console.log("get call" + JSON.stringify(res)) }),
      err => { console.log(err) }

  }

  AddCh() {
    console.log("My channel name" + "  " + this.Mychannel);
    this.service.addCh(this.Mychannel).subscribe(res => { console.log("get call" + JSON.stringify(res)) }),
      err => { console.log(err) }

  }
  Msg() {
    this.service.Msgs(this.Mymsg).subscribe(res => { console.log(JSON.stringify(res)) }),
      err => { console.log(err) }
    //  this.ngOnInit();
  }
 int;
  listallmsgs(ide) {
    
   
  
  // this.int= setInterval(()=>{
    this.arrylist = [];
    this.service.listmsgs(ide).subscribe(res => {
      //console.log(JSON.parse(res._body).messages[3].Body);//JSON.parse(res._body).messages
      //JSON.parse(res._body).messages[].Body
      this.len = JSON.parse(res._body).messages.length;
      console.log(res);
      for (let index = 0; index < this.len; index++) {
        console.log(JSON.parse(res._body).messages[index].body);
        // if(JSON.parse(res._body).messages[index].from==this.iden){
        this.arrylist[index] = { msg: JSON.parse(res._body).messages[index].body, sender: JSON.parse(res._body).messages[index].from, img: JSON.parse(res._body).messages[index].url };


        // }else
        // this.arrylist[index]={msg:JSON.parse(res._body).messages[index].body,sender:JSON.parse(res._body).messages[index].from};
        // console.log(this.sender);
      }
    
      // this.arrylist.length=0;
      console.log(this.arrylist);

    }, 
    
      err => { console.log(err) }

    )
    //this.arrylist.length=0;
  }
  bool: boolean;
  cha;
  searchCh() {
    this.service.searchch().subscribe(res => {
      for (let i = 0; i < JSON.parse(res._body).channels.length; i++) {
        console.log((JSON.parse(res._body).channels[i].unique_name));
        if ((JSON.parse(res._body).channels[i].unique_name) == this.channel) {
          this.bool = true;
          this.cha = this.channel;
          this.sid = JSON.parse(res._body).channels[i].sid;
          console.log(this.sid);
          break;
        }
        else {
          this.bool = false;
        }

      }
      if (this.bool == true) {
        this.mychann = this.cha;
        console.log("yess");
      }
      else {
        this.mychann = "No such channel found";
        console.log("noooo");
      }
      //   {
      //   for(let i=0;i<JSON.parse(res._body).channels.length;i++)
      //   {
      //  //this.arraySer.push(JSON.parse(res._body).channels[i].unique_name);
      //  //console.log(this.arraySer);
      //  var lent=this.arraySer.length;
      //  for(let i=0;i<lent;i++)
      //  {
      //    if(this.arraySer[i]==this.channel)
      //    {
      //     console.log("channel fopund");
      //    }
      //    else
      //    {
      //     console.log("channel not fopund");
      //    }
      //  }
      //   }
      //JSON.parse(res._body).channels[0].unique_name;
    })
  }

  joinch() {
    this.service.joinchannel(this.sid).subscribe(res => {
      console.log(res);

    },
      err => {
        console.log(err);
      })
  }
  channelist() {
    this.service.channellist().subscribe(res => {
      for (let i = 0; i < JSON.parse(res._body).channels.length; i++) {
        console.log("channellist" + JSON.parse(res._body).channels[i].sid);
        this.arrychannel.push({ name: JSON.parse(res._body).channels[i].unique_name, id: JSON.parse(res._body).channels[i].sid })
      }
      console.log(this.arrychannel);
      this.memberlist(this.arrychannel);
    },
      err => {
        console.log(err);
      })
  }
  mych = [];
  idd;

  memberlist(channell) {
    console.log(channell.length);
    channell.forEach(element => {

      this.service.memlist(element.id).subscribe(res => {

        for (let i = 0; i < JSON.parse(res._body).members.length; i++) {

          let idd = localStorage.getItem("Identity");
          if (JSON.parse(res._body).members[i].identity == idd) {
            // console.log("true");
            this.mych.push({ name: element.name, id: element.id });
            this.idd = element.id;
            console.log(this.idd);
          }
        }
        //console.log(this.mych);
        //  console.log("member list"+JSON.parse(res._body).members[1].identity);
        //    this.channels=this.mych;
      },
        err => {
          console.log(err);
        })
    });

  }

}
