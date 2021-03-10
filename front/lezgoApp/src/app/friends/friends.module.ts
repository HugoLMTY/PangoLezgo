import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { ReceivedComponent } from './components/received/received.component';
import { SentComponent } from './components/sent/sent.component';
import { AcceptedComponent } from './components/accepted/accepted.component';


@NgModule({
  declarations: [
    FriendsComponent, 
    ReceivedComponent, 
    SentComponent, 
    AcceptedComponent],
  imports: [
    CommonModule,
    FriendsRoutingModule
  ]
})
export class FriendsModule { }
