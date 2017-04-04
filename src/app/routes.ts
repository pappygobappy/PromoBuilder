import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MainComponent } from './containers/main/main.component';
import { LoadingComponent } from './containers/loading/loading.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { CanActivateGuard } from './guard/can-activate.guard';


export const routes: ModuleWithProviders= RouterModule.forRoot([
	{
		path: '',
		component: MainComponent,
		canActivate: [CanActivateGuard]
	},
	{
		path:'welcome',
		component: WelcomeComponent
	},
	{
		path:'loading',
		component: LoadingComponent
	},
	{
		path: '**',
		redirectTo: ''
	}
]);