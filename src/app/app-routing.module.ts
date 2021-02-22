import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ChannelComponent } from './components/channel/channel.component';
import { HomeComponent } from './components/home/home.component';
import { MessageComponent } from './components/message/message.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

const routes: Routes = [
 {path:"", component:AuthComponent},
 {path:"home", component:HomeComponent},
 {
   path:"workspace",component:WorkspaceComponent,
    children: [
      {
        path: 'channel/:id', component: ChannelComponent
      }
    ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
