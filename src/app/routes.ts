import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MainComponent } from './containers/main/main.component';
import { LoadingComponent } from './containers/loading/loading.component';

export const routes: ModuleWithProviders= RouterModule.forRoot([
	{
		path: '',
		component: MainComponent/*,
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