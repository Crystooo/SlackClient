import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { ChannelService } from 'src/app/services/channel.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message1:Message={id:"",userId:"",content:"",time:new Date(),replies:[]}
  channelId:string=""
  chronology:Message[] = []
  userName:string=""

  constructor(private channelService:ChannelService) { }
  

  async ngOnInit (){
    this.channelId=sessionStorage.getItem('channelId') as string;
    this.chronology= await this.getMessages() as Message[]
    //this.getUserName()
  }

  getUserName = async(userId:string)=>{
    this.userName = await this.channelService.getUserName(userId);
  }

  createMessage=async()=>{
    let message= await this.channelService.createMessage(this.channelId,this.message1.userId,this.message1.content)
    console.log("createMessage: ",message)
  }

  replyMessage=async()=>{
    let message= await this.channelService.replyMessage(this.message1.userId,this.message1.id,this.message1.content)
    console.log("replyMessage: ",message)
  }

  getMessages = async()=>{
    let messages=await this.channelService.getMessages(this.channelId);
    console.log("channel messages: ",messages);
    return messages
  }
}
