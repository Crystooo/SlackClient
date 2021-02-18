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
    let test= await this.homeService.createWorkspace({token:this.tkn,name:this.workspaceName})
    console.log("test: ",test)
    this.workspaceId=test.workspaceId
  }

  joinWorkspace=async ()=>{
    let test= await this.homeService.joinWorkspace({token:this.tkn,workspaceId:this.workspaceId});
  }

  leaveWorkspace=async ()=>{
    let test= await this.homeService.leaveWorkspace({token:this.tkn,workspaceId:this.workspaceId});
  }

  deleteAccount=async ()=>{
    let test= await this.homeService.deleteAccount({token:this.tkn,workspaceId:this.workspaceId});
  }

}
