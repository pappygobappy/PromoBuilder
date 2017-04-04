import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MainComponent } from './containers/main/main.component';
import { LoadingComponent } from './containers/loading/loading.component';
import { CanActivateGuard } from './guard/can-activate.guard';

export const routes: ModuleWithProviders= RouterModule.forRoot([
	{
		path: '',
		component: MainComponent,
		canActivate: [CanActivateGuard]/*
			'CanActivateGuard',
			CanActivateGuard
		],
		children: [{
				path: '',
				component: NotesContainer,
			},
			{
				path:'about',
				component: About
			}
		]*/
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