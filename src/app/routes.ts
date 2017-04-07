import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MainComponent } from './containers/main/main.component';
import { LoadingComponent } from './containers/loading/loading.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { CanActivateGuard } from './guard/can-activate.guard';
import { HomeComponent } from './containers/home/home.component';
import { PromotionalViewComponent } from './containers/promotional-view/promotional-view.component';


export const routes: ModuleWithProviders= RouterModule.forRoot([
	{
		path: '',
		component: MainComponent,
		canActivate: [CanActivateGuard],
		children:[
			{
				path:'',
				component: HomeComponent,
				children:[
					{
						path:'promo/:id',
						component: PromotionalViewComponent
					}
				]
			}
		]
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