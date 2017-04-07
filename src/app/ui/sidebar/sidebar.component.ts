import { Component, OnInit, Renderer } from '@angular/core';
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


  selectedPromo: string = "";
  hoverPromo: string = "";
  promotionals: FirebaseListObservable<any>;

  constructor(public dialog: MdDialog, private promoService: PromotionalsService, private router: Router, private renderer: Renderer) { }

  openPromotionalDialog(){
  	let dialogRef = this.dialog.open(CreatePromotionalDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      //this.selectedOption = result;
    });
  }

  viewPromotional(event, promoId: string){
    this.selectedPromo = promoId;
    this.router.navigateByUrl("promo/"+promoId)
  }

  mouseEnter(event, promoId){
    this.hoverPromo = promoId;
  }
  
  ngOnInit() {
    this.promotionals = this.promoService.getPromotionals(false);
    console.log(this.promotionals)
  }

}
