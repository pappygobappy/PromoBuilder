import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { CreatePromotionalDialogComponent } from '../../ui/create-promotional-dialog/create-promotional-dialog.component';
import { PromotionalsService } from '../../services/promotionals.service';
import { FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  promotionals: FirebaseListObservable<any>;

  constructor(public dialog: MdDialog, private promoService: PromotionalsService, private router: Router) { }

  openPromotionalDialog(){
  	let dialogRef = this.dialog.open(CreatePromotionalDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      //this.selectedOption = result;
    });
  }

  viewPromotional(event, promoId: string){
    event.target.classList.add("promo-selected");
    this.router.navigateByUrl("promo/"+promoId)
  }
  
  ngOnInit() {
    this.promotionals = this.promoService.getPromotionals(false);
    console.log(this.promotionals)
  }

}
