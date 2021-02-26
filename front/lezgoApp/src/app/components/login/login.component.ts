import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userServices: UsersService) { }

  ngOnInit(): void {
  }

  login() {
    this.userServices.login('human', 'adm').subscribe(
      (result: any) => {
        console.log(result)
      }
    )
  }

}
