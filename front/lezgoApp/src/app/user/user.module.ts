import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';
import { ProfilComponent } from './components/profil/profil.component';
import { FriendsRoutingModule } from '../friends/friends-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FriendsRoutingModule
  ],
  declarations: [
    ProfilComponent, 
    MainComponent, 
    ListComponent
  ]
})
export class UserModule { }
