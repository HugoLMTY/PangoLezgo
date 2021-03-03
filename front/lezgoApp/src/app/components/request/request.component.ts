import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      (result: any) => this.friendList = result
    )

    this.friendServices.receivedList().subscribe(
      (result: any) => this.receivedList = result
    )

    this.friendServices.sentList().subscribe(
      (result: any) => 
          this.sentList = result
    )
  }

  removeFriend(target: any) {
    this.friendServices.deleteFriend(target).subscribe()
  }

  acceptInvite(target: any) {
    this.friendServices.acceptInvite(target).subscribe()
  }

  rejectInvite(target: any) {
    this.friendServices.rejectInvite(target).subscribe()
  }

  cancelInvite(target: any) {
    this.friendServices.cancelInvite(target).subscribe()
  }
}
