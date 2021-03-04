import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component';
import { ProfilComponent } from './components/profil/profil.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { RequestComponent } from './components/request/request.component';
import { AddNFriendComponent } from './components/add-nfriend/add-nfriend.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserlistComponent
  },
  {
    path: 'add',
    component: AddNFriendComponent
  },
  {
    path: 'request',
    component: RequestComponent
  },
  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
