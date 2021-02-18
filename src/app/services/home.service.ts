import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  genericUrl="http://localhost:3001";
  constructor(private http:HttpClient) { }

  createWorkspace=async ({token,name}:{token:string,name:string})=>{
    let m = await this.http.post(`${this.genericUrl}/home/workspace`, {body: {name}},{headers: {token}}).toPromise()as Promise<{message:string,workspaceId:string}>
    return m
  }

  joinWorkspace=async ({token,workspaceId}:{token:string,workspaceId:string})=>{
    let m = await this.http.post(`${this.genericUrl}/home/join/workspace`, {body: {workspaceId}},{headers: {token}}).toPromise()as Promise<{message:string}>
    return m
  }

  getAllWorkspaces=async ({token}:{token:string})=>{
    //let m = await this.http.get(`${this.genericUrl}/home/workspace`, {body: {workspaceId}},{headers: {token}}).toPromise()as Promise<{userWorkspacesName: {id:string, name:string}[]}>
    //return m
  }

  leaveWorkspace=async ({token,workspaceId}:{token:string,workspaceId:string})=>{
    let m = await this.http.delete(`${this.genericUrl}/home/workspace`,{headers: {token,workspaceId}}).toPromise()as Promise<{message:string}>
    return m
  }

  deleteAccount=async ({token,workspaceId}:{token:string,workspaceId:string})=>{
    let m = await this.http.delete(`${this.genericUrl}/home/workspace`,{headers: {token,workspaceId}}).toPromise()as Promise<{message:string}>
    return m
  }


}