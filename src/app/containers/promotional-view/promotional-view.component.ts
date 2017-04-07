import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-promotional-view',
  templateUrl: './promotional-view.component.html',
  styleUrls: ['./promotional-view.component.css']
})
export class PromotionalViewComponent implements OnInit {
  
  promoId: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.forEach((params: Params) => {
  		let id = params['id'];
  		this.promoId = id;
  	})
  }

}
