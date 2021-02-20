import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(private dataService:DataTransferService, private workspaceService:WorkspaceService) { }
  id:string = "";
  name:string = "";
  token:string ="";
  channels:{id:string,name:string}[]=[]
  users:{email:string, username:string}[]=[]
  async ngOnInit() {
    //this.id = this.dataService.getWorkspaceId();
    this.id = localStorage.getItem("workid") != null ? localStorage.getItem("workid") as string : "";
    this.id != "" && (this.name = await (await this.workspaceService.getName(this.id)).name)
    this.channels = await this.workspaceService.getChannels(this.id);
    this.users = await this.workspaceService.getUsers(this.id);
    console.log(this.users);
  }

  leaveWorkspace=async()=>{
    let {message}=await this.workspaceService.leaveWorkspace(this.id,this.token);//gestisci il token, o sara sempre vuoto
    console.log("leave workspace: ",message);
  }

  createChannel=async()=>{
    let {message}=await this.workspaceService.createChannel(this.id,this.token);//gestisci il token, o sara sempre vuoto
    console.log("create channel: ",message);
  }

  deleteChannel=async(index:number)=>{
    let {message}=await this.workspaceService.deleteChannel(this.id,this.channels[index].id);
    console.log("create channel: ",message);
  }

  test =(id:string) => console.log("test", id)

}
