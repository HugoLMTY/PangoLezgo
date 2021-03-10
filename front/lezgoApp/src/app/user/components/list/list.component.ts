import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from 'src/app/services/friends/friends.service';
import { UsersService } from 'src/app/services/users/users.service';
import { userInterface } from '../../interfaces/user'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  
  constructor(private userServices: UsersService, private friendService: FriendsService, private router: Router) { }
  user: any
  userList: any = []
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
      (result: any) => {
        result.forEach((element: any) => {
          this.getUserInfos(element)
        });
      })
  }
  addFriend(target: any) {
    this.friendService.sendInvite(target).subscribe()    
  }

  getUserInfos(userInfos: any) {
    
    const user:userInterface = {
      uname: userInfos.uname,
      name: userInfos.name,
      pwd: userInfos.pwd,
      age: userInfos.age,
      family: userInfos.family,
      race: userInfos.race,
      feeding: userInfos.feeding 
    }
    this.userList.push(user)
  }
}
