var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AppComponent } from './app.component';
import { LogonComponent } from './ui/logon/logon.component';
import 'hammerjs';
import { AppbarComponent } from './ui/appbar/appbar.component';
import { AppbarUserComponent } from './ui/appbar-user/appbar-user.component';
export var firebaseConfig = {
    apiKey: "AIzaSyColZ5cH9uWk9_fgEmz8ZzWpfDM7K9ZhYc",
    authDomain: "promobuilder2.firebaseapp.com",
    databaseURL: "https://promobuilder2.firebaseio.com",
    projectId: "promobuilder2",
    storageBucket: "promobuilder2.appspot.com",
    messagingSenderId: "784321970487"
};
var myFirebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect,
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            LogonComponent,
            AppbarComponent,
            AppbarUserComponent,
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            MaterialModule.forRoot(),
            AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=C:/Users/Patrick/Documents/GitHub/PromoBuilder/src/app/app.module.js.map