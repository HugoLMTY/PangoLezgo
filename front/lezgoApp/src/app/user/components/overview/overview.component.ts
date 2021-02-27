import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private userServices: UsersService) { }

  userList: any

  ngOnInit(): void {
    this.userServices.all().subscribe(
      result => {
        console.log(result)
        userList: result
      }
    )
  }
}
