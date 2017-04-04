import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  constructor(public af: AngularFire, private location: Location) { 
    this.af.auth.subscribe(user => {
  		console.log(user);
  		if(user){
  			this.location.back();
  		}
  	});
  }

  ngOnInit() {
  }

}
