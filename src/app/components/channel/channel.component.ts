import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersDialogComponent } from '../users-dialog/users-dialog.component';
import { AddUsersDialogComponent } from '../add-users-dialog/add-users-dialog.component';
import { Message } from 'src/app/interfaces/message';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  id: string = "";
  workspace_id:string = ""
  users: string[] = [];
  content: string=""
  userId:string=""
  toAdd:string | string[] = ""//Testare api add user 
  navigationSubscription: any;
  channelName:string=""
  chronology:Message[] = []
  username: string = ""
  token:string=""


  constructor(private channelService:ChannelService, private activeRoute:ActivatedRoute, private router:Router, 
    public dialog: MatDialog, private authService:AuthService) { 
    this.navigationSubscription = this.router.events.subscribe((e:any) => {if (e instanceof NavigationEnd) this.ngOnInit()})
  }
  
  async ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id') as string;//se id fa parte della lista utenti creare un canale
    this.workspace_id = sessionStorage.getItem('workid') as string
    this.users = await this.channelService.getUsers(this.id);
    this.chronology = []
    sessionStorage.setItem('channelId', this.id);
    //this.userId = sessionStorage.getItem(userId)
    await this.getChannelName();
    await this.getMessages();
    this.token = sessionStorage.getItem('tkn') as string;
    this.userId = await this.authService.getEmail(this.token)
  }

  openUsersDialog() {
    this.dialog.open(UsersDialogComponent, {
      data: this.users
    });
  }

  openAddUserDialog(){
    const dialogRef = this.dialog.open(AddUsersDialogComponent, {
      width: '250px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      this.toAdd = String(result).includes(',') ? result.split(',') : result;
      this.addToChannel()
    });
  }

  /*createDirect=async( channel_name:string, privacy:boolean)=>{
    let {message}=await this.workspaceService.createChannel(this.workspace_id, this.token, channel_name, privacy);
    console.log("create channel: ",message);
  }*/

  getUserName = async(userId:string)=>{
    return await this.channelService.getUserName(userId);
  }
  
  getChannelName = async()=>{
    this.channelName= await this.channelService.getName(this.id);
  }

  createMessage = async()=>{
    let message=await this.channelService.createMessage(this.id, this.userId,this.content);
    console.log("created message: ",message);
    this.content = "";
    this.ngOnInit();
  }

  replyMessage = async()=>{
    let message=await this.channelService.replyMessage(this.userId,this.id,this.content);
    console.log("replied message: ",message);
  }

  getMessages = async()=>{
    let messages=await this.channelService.getMessages(this.id) as Message[];
    messages.forEach(async (message )=> this.chronology.push(
      {
        id: message.id, 
        userId: await this.getUserName(message.userId), 
        content: message.content, 
        time: message.time,
        replies: message.replies
      }));
  }

  addToChannel = async()=>{
    let messages=await this.channelService.addToChannel(this.toAdd, this.id, this.workspace_id)
    console.log("add to channel: ",this.toAdd);
    this.ngOnInit();
  }

  leaveChannel = async () => {
    let message = await this.channelService.leaveChannel(this.userId, this.id);
    console.log(message);
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
