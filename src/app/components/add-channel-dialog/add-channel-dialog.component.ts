import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.css']
})
export class AddChannelDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddChannelDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: {name:string, privacy: boolean}) { }

  ngOnInit(): void {
  }

  onNoClick():void {
    this.dialogRef.close();
  }

}
