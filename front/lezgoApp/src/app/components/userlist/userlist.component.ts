import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(private userServices: UsersService, private router: Router) { }

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
  addFriend(formInfo: any) {
    console.log(formInfo)
  }
}
