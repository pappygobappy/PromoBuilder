import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class CanActivateGuard implements CanActivate {
  constructor(private af: AngularFire, private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    return this.af.auth
    	.map((authState: FirebaseAuthState) => !!authState)
    	.do(authenticated => {
    		if(!authenticated)
    			this.router.navigate(['welcome'])
    	})
  }
}
