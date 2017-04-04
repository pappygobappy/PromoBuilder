import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{

  loginEmail: string ="";
  loginPassword: string ="";
  errorMsg: string = "error";
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

  login(){
  	//console.log(this.af.auth.getAuth())
  	this.af.auth.login()
  	.catch((err) => {
  		console.log(err);
  		this.errorMsg = err.message;
  	});
  }

  logout(){
  	//console.log(this.af.auth.getAuth())
  	this.af.auth.subscribe(auth => {
  		console.log(auth);
  		if(auth){
  			this.loggedIn = true;
  			console.log(this.loggedIn);
  		}
  		else
  			this.loggedIn = false;
  	});
  	this.af.auth.logout();
  }

  ngOnInit(){
  	this.af.auth.subscribe(user => {
  		console.log(user);
  		if(user){
  			this.loggedIn = true;
  			console.log(this.loggedIn);
  		}
  	});
  }

}
