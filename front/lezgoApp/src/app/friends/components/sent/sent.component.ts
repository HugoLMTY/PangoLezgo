import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInterface } from 'src/app/interfaces/user';
import { FriendsService } from 'src/app/services/friends/friends.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {

  constructor(private userServices: UsersService, private friendServices: FriendsService, private router: Router) { }

  sentList: any = []

  ngOnInit(): void {
    this.friendServices.sentList().subscribe(
      (result: any) => 
          result.forEach((element: any) => {
            this.getUserInfos(element)
          })
    )
  }
  
  cancelInvite(target: any) {
    this.friendServices.cancelInvite(target).subscribe()
  }

  getUserInfos(userInfos: any) {
    
    const user:userInterface = {
      _id: userInfos._id,
      uname: userInfos.uname,
      name: userInfos.name,
      pwd: userInfos.pwd,
      age: userInfos.age,
      family: userInfos.family,
      race: userInfos.race,
      feeding: userInfos.feeding 
    }
    this.sentList.push(user)
  }

}
