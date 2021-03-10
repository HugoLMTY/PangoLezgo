import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../services/friends/friends.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  constructor(private userServices: UsersService, private router: Router) { }

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
  }

}
