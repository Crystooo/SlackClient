import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser?:string = "";

  genericUrl="http://localhost:3001";

  constructor(private http:HttpClient) { }

  //httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')//.set('Access-Control-Allow-Origin', '*');
  
  register = (user: User)  => this.http.post(`${this.genericUrl}/auth/register`, user).toPromise() as Promise<{message:string}>
  
  
  login = async (tkn:string,email:string,password:string) =>{
    console.log("tkn: ",tkn,"email: ",email,"password: ",password)
    const headers = new HttpHeaders({"Content-type": "application/json"});
    let m = await this.http.post(`${this.genericUrl}/auth/login`, "",{headers: {tkn,email,password}}).toPromise()
    return m;//aggiunta una stringa vuota, prima di passare gli headers. NON HO CAPITO IL PROBLEMA
    //SE NON METTO NIENTE PRIMA DI HEADERS, IN AUTOMATICO SI PRENDERA' GLI HEADERS COME BODY
  }
  
  

  //logout = (tkn:string) => this.http.delete(`${this.genericUrl}/auth/logout`,tkn);
}
