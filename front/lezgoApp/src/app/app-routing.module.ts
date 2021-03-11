import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component';
import { AddNFriendComponent } from './components/add-nfriend/add-nfriend.component';
import { BlogModule } from './blog/blog.module';
const routes: Routes = [
  
  { path: 'lazyUser', loadChildren: './user/user.module#UserModule' },

  { path: 'lazyFriends', loadChildren: './friends/friends.module#FriendsModule' },

  { path: 'blog', loadChildren: './blog/blog.module#BlogModule' },

  { path: 'add', component: AddNFriendComponent },

  { path: 'login', component: LoginComponent },
  
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
