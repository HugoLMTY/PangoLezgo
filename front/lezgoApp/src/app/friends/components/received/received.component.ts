import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInterface } from 'src/app/interfaces/user';
import { FriendsService } from 'src/app/services/friends/friends.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit {
  
  constructor(private friendServices: FriendsService, private router: Router) { }
  
  receivedList: any = []

  ngOnInit(): void {

    this.friendServices.receivedList().subscribe(
      (result: any) => {
        result.forEach((element: any) => {
          this.getUserInfos(element)
        })
      }
    )
  }

  acceptInvite(target: any) {
    this.friendServices.acceptInvite(target).subscribe()
  }

  rejectInvite(target: any) {
    this.friendServices.rejectInvite(target).subscribe()
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
    this.receivedList.push(user)
  }

}
