import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ChannelComponent } from './components/channel/channel.component';
import { FailedAuthComponent } from './components/failed-auth/failed-auth.component';
import { HomeComponent } from './components/home/home.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

const routes: Routes = [
 {path:"", component:AuthComponent},
 {path:"home", component:HomeComponent},
 {path:"failedauth", component:FailedAuthComponent},
 {path:"workspace",component:WorkspaceComponent},
 {path:"channel", component:ChannelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
