import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  userToken: string = "";
  userName: string = "";
  workspaceId:string = "";
  channelId:string = "";
  
  constructor() { }


  setTkn = (tkn:string) => this.userToken = tkn;
  setUserName = (username:string) => this.userName = username;
  setWorkspaceId = (workspaceId:string) => this.workspaceId = workspaceId;
  setChannelId = (channelId:string) => this.channelId=channelId
   
  getUsername = () => this.userName;
  getTkn = () => this.userToken;
  getWorkspaceId = () => this.workspaceId;
  getChannelId = () => this.channelId;
}
