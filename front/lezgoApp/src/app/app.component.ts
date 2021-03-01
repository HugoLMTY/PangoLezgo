import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private userService:UsersService) { }
  isAuth: any
  ngOnInit(): void {
    this.userService.getAuthState().subscribe(
      (result) => this.isAuth = result
    )
  }

  title = 'lezgoApp';
}