import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from 'src/app/services/friends/friends.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-add-nfriend',
  templateUrl: './add-nfriend.component.html',
  styleUrls: ['./add-nfriend.component.scss']
})
export class AddNFriendComponent implements OnInit {

  constructor(private friendService: FriendsService, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    
    

  }

  addNFriend(formInfos: any) {
    this.userService.registerFriend(
      formInfos.name, formInfos.uname, 
      formInfos.age, formInfos.pwd, 
      formInfos.family, formInfos.race, 
      formInfos.feeding).subscribe(
        (result) => {
          console.log(result)
        }
      )
  }

}
