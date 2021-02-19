import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  genericUrl="http://localhost:3001";
  constructor(private http:HttpClient) { }

  createWorkspace=async (tkn:string,name:string)=>{
    let workInfo = await this.http.post(`${this.genericUrl}/home/workspace`, {name},{headers: {tkn}}).toPromise() as Promise<{message:string,workspaceId:string}>
    return workInfo;
  }

  joinWorkspace=async (tkn:string,workspace_id:string)=>{
    let message = await this.http.post(`${this.genericUrl}/home/join/workspace`,null,{headers: {tkn, workspace_id}}).toPromise() as Promise<{message:string}>
    return message;
  }

  getAllWorkspaces=async (tkn:string)=>{
    let workspacesNames = await this.http.get(`${this.genericUrl}/home/workspace`, { headers: { tkn } }).toPromise() as Promise<{id:string, name:string}[]>
    return workspacesNames;
  }

  /* leaveWorkspace=async (tkn:string,workspace_id:string)=>{
    let message = await this.http.delete(`${this.genericUrl}/home/workspace`,{headers: {tkn,workspace_id}}).toPromise()as Promise<{message:string}>
    return message;
  } *///Da mettere su workspace

  deleteAccount=async (tkn:string,workspace_id:string)=>{
    let message = await this.http.delete(`${this.genericUrl}/home/user`,{headers: {tkn,workspace_id}}).toPromise()as Promise<{message:string}>
    return message;
  }
}