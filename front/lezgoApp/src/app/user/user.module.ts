import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfilComponent } from './components/profil/profil.component';
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    NotFoundComponent, 
    ProfilComponent, 
    MainComponent, 
    ListComponent]
})
export class UserModule { }
