import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInterface } from 'src/app/interfaces/user';
import { FriendsService } from 'src/app/services/friends/friends.service';

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss']
})
export class AcceptedComponent implements OnInit {

  constructor(private friendServices: FriendsService, private router: Router) { }

  friendList: any = []

  ngOnInit(): void {
    this.friendServices.acceptedList().subscribe(
      (result: any) => {
        result.forEach((element: any) => {
          this.getUserInfos(element)
        });
      }
    )
  }
  
  removeFriend(target: any) {
    this.friendServices.deleteFriend(target).subscribe()
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
    this.friendList.push(user)
  }
}
