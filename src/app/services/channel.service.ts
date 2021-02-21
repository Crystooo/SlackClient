import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  genericUrl="http://localhost:3001";
  constructor(private http:HttpClient) { }

  getName = async(channel_id:string) => {
    let name = await this.http.get(`${this.genericUrl}/channels/`, {headers: {channel_id}}).toPromise() as Promise<string>
    return name;
  } 

  getUsers = async (channel_id:string) => {
    let users = await this.http.get(`${this.genericUrl}/channels/users`, {headers: {channel_id}}).toPromise() as Promise<string[]>
    return users;
  }

  createMessage = async (user_id:string,content:string) => {
    let message = await this.http.post(`${this.genericUrl}/channels/messages`,content,{headers:{user_id}}).toPromise() as Promise<{message:string}>
    return message;
  }

  replyMessage = async (user_id:string,message_id:string,content:string)=>{
    let message = await this.http.post(`${this.genericUrl}/channels/messages/replies`,content,{headers:{user_id,message_id}}).toPromise() as Promise<{message:string}>
    return message;
  }

  getMessages = async (channel_id:string)=>{
    let messages = await this.http.get(`${this.genericUrl}/channels/messages`, {headers: {channel_id}}).toPromise() as Promise<Message[]>
    return messages;
  }

  addToChannel = async (to_add:string | string[]) => {
    let message = await this.http.put(`${this.genericUrl}/channels/users`, null, {headers: {to_add}}).toPromise() as Promise<string>
    return message;
  }

  leaveChannel = async (user_id:string,channel_id:string) => {
    let message = await this.http.delete(`${this.genericUrl}/channels/leave`, {headers: {user_id,channel_id}}).toPromise() as Promise<string>
    return message;
  }

}
