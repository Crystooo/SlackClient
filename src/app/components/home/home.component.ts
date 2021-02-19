import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //@Input() emptyCamps:boolean=false
  workspaceName:string=""
  workspaceId:string=""
  workspaceToJoin:string=""
  username:string=""
  token:string=""
  workspaces:{id:string, name:string}[] = [];
  constructor(private homeService:HomeService, private dataService: DataTransferService, private router:Router) { }

  ngOnInit(): void {
    this.username = this.dataService.getUsername();
    this.token = this.dataService.getTkn();
    this.getAllWorkspaces();
  }

  createWorkspace=async ()=>{
    let {workspaceId}= await this.homeService.createWorkspace(this.token,this.workspaceName);
    this.workspaceId=workspaceId;
    if(workspaceId){//il token e sotto await, non e immediato
      this.dataService.setWorkspaceId(this.workspaceId);
      this.router.navigate(["workspace"]);
    }
  }

  joinWorkspace=async ()=>{
    let res= await this.homeService.joinWorkspace(this.token,this.workspaceToJoin);
    if(this.workspaceName!="workspace not found"){//il token e sotto await, non e immediato
      this.dataService.setWorkspaceId(this.workspaceToJoin);
      this.router.navigate(["workspace"]);
    }
    console.log(res);
  }

  /*leaveWorkspace=async ()=>{
    let res= await this.homeService.leaveWorkspace(this.token,this.workspaceId);
    console.log(res);
  }*/

  deleteAccount=async ()=>{
    let res= await this.homeService.deleteAccount(this.token,this.workspaceId);
    console.log(res);
  }

  getAllWorkspaces=async ()=>{
    this.workspaces= await this.homeService.getAllWorkspaces(this.token);
    console.log(this.workspaces);
  }

  enterWorkspace = () => {
    this.dataService.setWorkspaceId(this.workspaceId) ;
    this.router.navigate(["workspace"]);
  }
}