import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { FailedAuthComponent } from './components/failed-auth/failed-auth.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [{path:"", component:AuthComponent},{path:"home", component:HomeComponent}
,{path:"failedauth", component:FailedAuthComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
