import { Component, OnInit } from '@angular/core';
import{ChatService} from '../chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  Mychannel:string;
  Mymsg:string;
  arrylist=[];
  len:number;
  constructor(private service:ChatService) { }
 
  ngOnInit() {
    
  this. listallmsgs();
   
}
  Authenticate()
  {
    this.service.setData().subscribe(res => { console.log("get call"+JSON.stringify(res)) }),
    err => { console.log(err) }

  }

  AddCh()
  {
     console.log("My channel name"+"  "+this.Mychannel);
    this.service.addCh(this.Mychannel).subscribe(res => { console.log("get call"+JSON.stringify(res)) }),
    err => { console.log(err) }

  }
  Msg()
  {
    this.service.Msgs(this.Mymsg).subscribe(res => {console.log(JSON.stringify(res))}),
    err=> {console.log(err)}
  }
 
listallmsgs()
{
  this.service.listmsgs().subscribe(res => {
    //console.log(JSON.parse(res._body).messages[3].Body);//JSON.parse(res._body).messages
    //JSON.parse(res._body).messages[].Body
       this.len=JSON.parse(res._body).messages.length;
       console.log(this.len);
       for(let index=0;index<this.len;index++)
       {
        console.log(JSON.parse(res._body).messages[index].body);
        this.arrylist[index]=JSON.parse(res._body).messages[index].body;
       }
      console.log(this.arrylist);
    // for(let index=0;index<this.len;index++)
    //   {
    //     console.log("msgs     "+res.Mymsg[index].Body);
    //     this.arrylist[index]=res.Mymsg[index].Body
    //   }
    },//console.log("get call"+JSON.stringify(res)) }),
   err => { console.log(err) }
   
 )
}

}
