import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-appbar-user',
  templateUrl: './appbar-user.component.html',
  styleUrls: ['./appbar-user.component.css']
})
export class AppbarUserComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(public af: AngularFire) { 
  	this.af.auth.subscribe(user => {
  		console.log(user);
  		if(user){
  			this.loggedIn = true;
  			console.log(this.loggedIn);
  		}
  	});
  }

  ngOnInit() {
  }

  login(){
  	this.af.auth.login()
  	.then((success) => {
  		this.loggedIn = true;
  	});
  }

  logout(){
  	this.af.auth.logout()
  	this.loggedIn = false;
  }

}
