import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { LoginComponentComponent } from './ui/login-component/login-component.component';

export const firebaseConfig = {
  apiKey: "AIzaSyColZ5cH9uWk9_fgEmz8ZzWpfDM7K9ZhYc",
  authDomain: "promobuilder2.firebaseapp.com",
  databaseURL: "https://promobuilder2.firebaseio.com",
  projectId: "promobuilder2",
  storageBucket: "promobuilder2.appspot.com",
  messagingSenderId: "784321970487"
 };

 const myFirebaseAuthConfig = {
   provider: AuthProviders.Google,
   method: AuthMethods.Redirect,
 };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
