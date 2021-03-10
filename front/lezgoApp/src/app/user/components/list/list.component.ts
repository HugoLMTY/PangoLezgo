import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from 'src/app/services/friends/friends.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private userServices: UsersService, private friendService: FriendsService, private router: Router) { }

  userList: any
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

    this.userServices.countRequests().subscribe()

    this.userServices.all().subscribe(
      (result) => {
        this.userList = result
      })
  }
  addFriend(target: any) {
    this.friendService.sendInvite(target).subscribe()    
  }
}
