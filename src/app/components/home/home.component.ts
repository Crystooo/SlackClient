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
  isDeleted:boolean=false
  workspaces:{id:string, name:string}[] = [];
  
  constructor(private homeService:HomeService, private dataService: DataTransferService, private router:Router) { }

  ngOnInit(): void {
    //this.username = this.dataService.getUsername();
    //this.token = this.dataService.getTkn();
    this.username = sessionStorage.getItem("username") as string;
    this.token = sessionStorage.getItem("tkn") as  string;
    sessionStorage.removeItem('workid')
    this.isDeleted=false
    this.getAllWorkspaces();
  }

  enterWorkspace = () => {
    //this.dataService.setWorkspaceId(this.workspaceId);
    sessionStorage.setItem("workid", this.workspaceId);
    this.router.navigate(["workspace"]);
  }

  createWorkspace=async ()=>{
    let {workspaceId}= await this.homeService.createWorkspace(this.token,this.workspaceName);
    if(workspaceId){
      sessionStorage.setItem("workid", workspaceId);
      this.router.navigate(["workspace"]);
    }
  }

  joinWorkspace=async ()=>{
    let res= await this.homeService.joinWorkspace(this.token,this.workspaceToJoin);
    if(this.workspaceName!="workspace not found"){
      this.dataService.setWorkspaceId(this.workspaceToJoin);
      sessionStorage.setItem("workid", this.workspaceToJoin);
      this.router.navigate(["workspace"]);
    }
  }

  /*leaveWorkspace=async ()=>{
    let res= await this.homeService.leaveWorkspace(this.token,this.workspaceId);
    console.log(res);
  }*/

  deleteAccount=async ()=>{
    let res= await this.homeService.deleteAccount(this.token,this.workspaceId);
    this.isDeleted=true;
    console.log(res);
  }

  getAllWorkspaces=async ()=>{
    this.workspaces= await this.homeService.getAllWorkspaces(this.token);
    console.log(this.workspaces);
  }

  
}