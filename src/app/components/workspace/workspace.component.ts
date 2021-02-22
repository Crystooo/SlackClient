import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddChannelDialogComponent } from '../add-channel-dialog/add-channel-dialog.component';
import { Channel } from 'src/app/interfaces/channel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(private workspaceService:WorkspaceService, private router:Router, public dialog: MatDialog, private authService:AuthService) { }
  id:string = "";
  name:string = "";
  token:string ="";
  channels:{id:string,name:string}[]=[]
  users:{email:string, username:string}[]=[]

  async ngOnInit() {
    this.id = sessionStorage.getItem("workid") != null ? sessionStorage.getItem("workid") as string : "";
    this.id != "" && (this.name =  (await this.workspaceService.getName(this.id)).name)
    this.channels = await this.workspaceService.getChannels(this.id);
    this.users = await this.workspaceService.getUsers(this.id);
    this.token = sessionStorage.getItem('tkn') as string;
  }

  openAddChannelDialog(){
    const dialogRef = this.dialog.open(AddChannelDialogComponent, {
      width: '350px',
      height: '200px',
      data: {name: "", privacy:false}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createChannel(this.id, this.token, result.name, result.privacy)
    })
  }

  leaveWorkspace=async()=>{
    let {message}=await this.workspaceService.leaveWorkspace(this.id,this.token);//gestisci il token, o sara sempre vuoto
    console.log("leave workspace: ",message);
  }

  createChannel=async(workspace_id:string, user_token:string, channel_name:string, privacy:boolean)=>{
    let {message}=await this.workspaceService.createChannel(workspace_id, user_token, channel_name, privacy);
    console.log("create channel: ",message);
  }

  deleteChannel=async(index:number)=>{
    let {message}=await this.workspaceService.deleteChannel(this.id,this.channels[index].id);
    console.log("create channel: ",message);
  }

  selectChannel =(id:string) => {
    sessionStorage.setItem('channelId', id);
    this.router.navigate(['channel']);
  }

  logout=async()=>{
    const {message}= await this.authService.logout(this.token)
    console.log("message: ",message)
    this.router.navigate(['']);
  }

}
