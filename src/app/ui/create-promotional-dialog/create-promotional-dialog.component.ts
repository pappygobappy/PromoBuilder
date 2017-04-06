import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { PromotionalsService } from '../../services/promotionals.service';

@Component({
  selector: 'app-create-promotional-dialog',
  templateUrl: './create-promotional-dialog.component.html',
  styleUrls: ['./create-promotional-dialog.component.css']
})
export class CreatePromotionalDialogComponent implements OnInit {
  
  promoDate: string = "";
  promoYouthOnly: boolean = false;

  constructor(public dialogRef: MdDialogRef<CreatePromotionalDialogComponent>, private promoService: PromotionalsService) {}

  ngOnInit() {
  }

  onSubmit() {
  	console.log(this.promoDate + " " + this.promoYouthOnly);
    this.promoService.addPromotional(this.promoDate, this.promoYouthOnly);
    this.dialogRef.close()
  }

}
