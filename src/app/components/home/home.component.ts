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
    this.getAllWorkspaces()
    console.log(this.token)
  }

  createWorkspace=async ()=>{
    let res= await this.homeService.createWorkspace(this.token,this.workspaceName);
    console.log("createWorkspace: ",res);
    this.workspaceId=res.workspaceId;
  }

  joinWorkspace=async ()=>{
    let res= await this.homeService.joinWorkspace(this.token,this.workspaceToJoin);
    console.log(res);
  }

  leaveWorkspace=async ()=>{
    let res= await this.homeService.leaveWorkspace(this.token,this.workspaceId);
    console.log(res);
  }

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
    console.log(this.workspaceId);
    //this.router.navigate([workspace]);
  }
}