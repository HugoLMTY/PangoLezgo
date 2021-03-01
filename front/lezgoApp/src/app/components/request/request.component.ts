import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { FriendsService } from 'src/app/services/friends/friends.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  constructor(private userServices: UsersService, private friendServices: FriendsService, private router: Router) { }

  friendList: any
  sentList: any
  receivedList: any
  emptyFriends: any
  emptyReceived: any
  emptySent: any
  isAuth: any
  ngOnInit(): void {

    this.userServices.getAuthState().subscribe(
      (state) => {
        if (!state) {
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        }
      }
    )

    this.friendServices.acceptedList().subscribe(
      (result: any) => {
        console.log(result)
        if (result == []) 
          this.emptyFriends = true
        else {
          this.emptyFriends = false
          this.friendList = result
        }
    })

    this.friendServices.receivedList().subscribe(
      (result: any) => {
        console.log(result)
        if (result == []) 
          this.emptyReceived = true
        else {
          this.emptyReceived = false
          this.receivedList = result
        }
    })

    this.friendServices.sentList().subscribe(
      (result: any) => {
        console.log(result)
        if (result == []) 
          this.emptySent = true
        else {
          this.emptySent = false
          this.sentList = result
        }
    })
  }

  removeFriend(target: any) {
    console.log(target)
  }
}
