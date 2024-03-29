import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UpdatesComponent } from './components/updates/updates.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'updates',
		component: UpdatesComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
