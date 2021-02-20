import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor(private channelService:ChannelService) { }
  id: string = "";
  users: string[] = [];
  content: string=""//preso con ngmodel
  userId:string=""
  toAdd:string | string[] = ""

  async ngOnInit() {
    this.id = sessionStorage.getItem('channelId') as string;
    this.users = await this.channelService.getUsers(this.id);
    console.log(this.users);
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
}
