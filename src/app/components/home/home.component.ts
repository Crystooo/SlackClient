import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //@Input() emptyCamps:boolean=false
  tkn:string=""
  email:string=""
  password:string=""
  workspaceName:string=""
  workspaceId:string=""
  @Input() username:string=""
  constructor(private homeService:HomeService) { }

  ngOnInit(): void {
  }

  createWorkspace=async ()=>{
    let res= await this.homeService.createWorkspace(this.tkn,this.workspaceName);
    console.log("test: ",res);
    this.workspaceId=res.workspaceId;
  }

  joinWorkspace=async ()=>{
    let res= await this.homeService.joinWorkspace(this.tkn,this.workspaceId);
    console.log(res);
  }

  leaveWorkspace=async ()=>{
    let res= await this.homeService.leaveWorkspace(this.tkn,this.workspaceId);
    console.log(res);
  }

  deleteAccount=async ()=>{
    let res= await this.homeService.deleteAccount(this.tkn,this.workspaceId);
    console.log(res);
  }

}
