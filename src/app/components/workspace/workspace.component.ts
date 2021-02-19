import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(private dataService:DataTransferService, private workspaceService:WorkspaceService) { }
  id:string = "";
  name:string = "";
  async ngOnInit() {
    this.id = this.dataService.getWorkspaceId();
    this.name = await (await this.workspaceService.getName(this.id)).name
  }



}
