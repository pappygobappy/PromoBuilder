import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

declare var electron: any;

@Component({
  selector: 'app-appbar-user',
  templateUrl: './appbar-user.component.html',
  styleUrls: ['./appbar-user.component.css']
})
export class AppbarUserComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(public af: AngularFire, private router: Router) { 
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
  	this.router.navigate(['loading'])
  }

  logout(){
  	this.af.auth.logout()
  	.then((success) =>{
  		this.loggedIn = false;
  		this.router.navigate(['welcome']);
      console.log(electron.ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

      electron.ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg) // prints "pong"
      })
      electron.ipcRenderer.send('asynchronous-message', 'ping')
  	})
  	
  }

}
