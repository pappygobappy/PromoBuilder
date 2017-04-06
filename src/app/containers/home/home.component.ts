import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { CreatePromotionalDialogComponent } from '../../ui/create-promotional-dialog/create-promotional-dialog.component';

declare var electron: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MdDialog) { 
  }

  openPromotionalDialog(){
  	let dialogRef = this.dialog.open(CreatePromotionalDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      //this.selectedOption = result;
    });
  }

  ngOnInit() {
  	/*electron.ipcRenderer.on('asynchronous-message', (event, arg) => {
      this.dialog.open(CreatePromotionalDialogComponent);
    })*/
  }

}
