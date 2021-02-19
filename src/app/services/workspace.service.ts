import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  genericUrl="http://localhost:3001";
  constructor(private http:HttpClient) {}

  getName=async (workspace_id:string)=>{
    let name = await this.http.get(`${this.genericUrl}/workspace/`, { headers: { workspace_id } }).toPromise() as Promise<{name:string}>
    return name;
  }
}
