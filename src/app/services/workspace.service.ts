import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  genericUrl="http://localhost:3001";
  constructor(private http:HttpClient) {}

  getName=async (workspace_id:string)=>{
    let name = await this.http.get(`${this.genericUrl}/workspaces/`, { headers: { workspace_id } }).toPromise() as Promise<{name:string}>
    return name;
  }

  getChannels=async (workspace_id:string)=>{
    let channels = await this.http.get(`${this.genericUrl}/workspaces/channels`, { headers: { workspace_id } }).toPromise() as Promise<{id:string,name:string}[]>
    return channels;
  }

  getUsers = async (workspace_id:string) =>{ 
    let users = await this.http.get(`${this.genericUrl}/workspaces/users`, {headers: {workspace_id}}).toPromise() as Promise<{email:string, username:string}[]>
    return users
  }
  
  leaveWorkspace = async (workspace_id:string,tkn:string) =>{
    let message = await this.http.delete(`${this.genericUrl}/workspaces/leave`,{ headers: { tkn,workspace_id } }).toPromise() as Promise<{message:string}>
    return message;
  }

  createChannel = async (workspace_id:string,tkn:string, channelName:string, privacy:boolean) =>{
    let message = await this.http.post(`${this.genericUrl}/workspaces/channels`, {channelName, privacy},{ headers: { tkn,workspace_id } }).toPromise() as Promise<{message:string}>
    return message
  }
  deleteChannel= async(workspace_id:string,channel_id:string)=>{
    let message = await this.http.delete(`${this.genericUrl}/workspaces/channels`,{ headers: { workspace_id,channel_id } }).toPromise() as Promise<{message:string}>
    return message
  }
}
