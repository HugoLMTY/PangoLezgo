import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private userServices: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userServices.getAuthState().subscribe(
      (state) => {
        if (!state)
          this.router.navigate(['/login']).then(() => {
            window.location.reload()
          })
    })
  }

}
