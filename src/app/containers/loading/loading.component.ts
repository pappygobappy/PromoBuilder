import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  constructor(public af: AngularFire, private router: Router) { 
    this.af.auth.subscribe(user => {
  		console.log(user);
  		if(user){
  			this.router.navigate(['']);
  		}
  	});
  }

  ngOnInit() {
  }

}
