import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ChannelComponent } from './components/channel/channel.component';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { MessageComponent } from './components/message/message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUsersDialogComponent } from './components/add-users-dialog/add-users-dialog.component';
import { AddChannelDialogComponent } from './components/add-channel-dialog/add-channel-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    WorkspaceComponent,
    ChannelComponent,
    UsersDialogComponent,
    MessageComponent,
    AddUsersDialogComponent,
    AddChannelDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
