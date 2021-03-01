import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(private userServices: UsersService) { }

  userList: any

  ngOnInit(): void {
    this.userServices.all().subscribe(
      (result) => {
        this.userList = result
        console.log(result)
      })
  }

}
