import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { routes } from './routes';
import { LogonComponent } from './ui/logon/logon.component';

import 'hammerjs';
import { AppbarComponent } from './ui/appbar/appbar.component';
import { AppbarUserComponent } from './ui/appbar-user/appbar-user.component';
import { MainComponent } from './containers/main/main.component';
import { LoadingComponent } from './containers/loading/loading.component';
import { CanActivateGuard } from './guard/can-activate.guard';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { HomeComponent } from './containers/home/home.component';
import { CreatePromotionalDialogComponent } from './ui/create-promotional-dialog/create-promotional-dialog.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { PromotionalsService } from './services/promotionals.service';

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
  entryComponents:[
    CreatePromotionalDialogComponent,
  ],
  declarations: [
    AppComponent,
    LogonComponent,
    AppbarComponent,
    AppbarUserComponent,
    MainComponent,
    LoadingComponent,
    WelcomeComponent,
    HomeComponent,
    CreatePromotionalDialogComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    routes
  ],
  providers: [
    CanActivateGuard,
    PromotionalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
