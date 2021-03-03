import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendsService } from './services/friends/friends.service';
import { UsersService } from './services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  receivedCount: any
  constructor(private userServices: UsersService, private friendServices: FriendsService) { }
  isAuth: any
  ngOnInit(): void {
    this.userServices.getAuthState().subscribe(
      (result) => {
        this.isAuth = result
        if (result) {
          this.friendServices.receivedList().subscribe(
            (result: any) => {
              this.receivedCount = result.length
          })
        }
      })
  }

  ngOnDestroy(): void {
    this.userServices.logout()
  }

  title = 'lezgoApp';
}