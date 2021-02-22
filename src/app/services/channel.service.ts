import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  genericUrl="http://localhost:3001";
  constructor(private http:HttpClient) { }

  getUserName = async(user_id:string) => {
    let userName = await this.http.get(`${this.genericUrl}/channels/users/user`, {headers: {user_id}}).toPromise() as Promise<string>
    return userName;
  }

  getName = async(channel_id:string) => {
    let name = await this.http.get(`${this.genericUrl}/channels/`, {headers: {channel_id}}).toPromise() as Promise<string>
    return name;
  } 

  getUsers = async (channel_id:string) => {
    let users = await this.http.get(`${this.genericUrl}/channels/users`, {headers: {channel_id}}).toPromise() as Promise<string[]>
    return users;
  }

  createMessage = async (channel_id:string,user_id:string,content:string) => {
    let message = await this.http.post(`${this.genericUrl}/channels/messages`,{content},{headers:{channel_id,user_id}}).toPromise() as Promise<{message:string}>
    return message;
  }

  replyMessage = async (user_id:string,message_id:string,content:string)=>{
    let message = await this.http.post(`${this.genericUrl}/channels/messages/replies`,content,{headers:{user_id,message_id}}).toPromise() as Promise<{message:string}>
    return message;
  }

  getMessages = async (channel_id:string)=>{
    let messages = await this.http.get(`${this.genericUrl}/channels/messages`, {headers: {channel_id}}).toPromise() as Promise<Message[]| string>
    return messages;
  }

  addToChannel = async (to_add:string | string[], channel_id:string, workspace_id:string) => {
    let message = await this.http.put(`${this.genericUrl}/channels/add`, null, {headers: {to_add, channel_id, workspace_id}}).toPromise() as Promise<string>
    return message;
  }

  leaveChannel = async (user_id:string,channel_id:string) => {
    let message = await this.http.delete(`${this.genericUrl}/channels/leave`, {headers: {user_id,channel_id}}).toPromise() as Promise<string>
    return message;
  }

}
