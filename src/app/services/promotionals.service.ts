import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class PromotionalsService {

  constructor(private af: AngularFire) { }

  getPromotionals(orderByDate: boolean): FirebaseListObservable<any> {
  	if(orderByDate){
  		return this.af.database.list('/promotionals', {
  			query: {
  				orderByChild:'date'
  			}
  		});
  	}
  	else
  		return this.af.database.list('/promotionals');
  }


  addPromotional(date: string, youthOnly: boolean){
  	return this.af.database.list('/promotionals').push({'date': date, 'youthOnly': youthOnly});
  }

}
