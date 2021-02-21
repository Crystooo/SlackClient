import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  id: string = "";
  users: string[] = [];
  content: string=""//preso con ngmodel
  userId:string=""
  toAdd:string | string[] = ""
  navigationSubscription: any;
  channelName:string=""

  constructor(private channelService:ChannelService, private activeRoute:ActivatedRoute, private router:Router) { 
    this.navigationSubscription = this.router.events.subscribe((e:any) => {if (e instanceof NavigationEnd) this.ngOnInit()})
  }
  
  async ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id') as string;
    this.users = await this.channelService.getUsers(this.id);
    await this.getChannelName();
  }

  getChannelName = async()=>{
    this.channelName= await this.channelService.getName(this.id);
  }

  createMessage = async()=>{
    let {message}=await this.channelService.createMessage(this.userId,this.content);
    console.log("created message: ",message);
  }

  replyMessage = async()=>{
    let message=await this.channelService.replyMessage(this.userId,this.id,this.content);
    console.log("replied message: ",message);
  }

  getMessages = async()=>{
    let messages=await this.channelService.getMessages(this.id);
    console.log("channel messages: ",messages);
  }

  addToChannel = async()=>{
    let messages=await this.channelService.addToChannel(this.toAdd)
    console.log("add to channel: ",this.toAdd);
  }

  ngOnDestroy() {
    this.navigationSubscription && this.navigationSubscription.unsubscribe();
  }
}
