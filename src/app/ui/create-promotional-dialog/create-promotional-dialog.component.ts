import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-promotional-dialog',
  templateUrl: './create-promotional-dialog.component.html',
  styleUrls: ['./create-promotional-dialog.component.css']
})
export class CreatePromotionalDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<CreatePromotionalDialogComponent>) {}

  ngOnInit() {
  }

}
