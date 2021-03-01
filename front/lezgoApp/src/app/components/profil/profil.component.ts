import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(private userServices: UsersService, private router: Router) { }

  user: any

  ngOnInit(): void {

    this.userServices.getAuthState().subscribe(
      (state) => {
        if (!state)
          this.router.navigate(['/login'])
      }  
    )

    this.userServices.getCurrentUserInfos().subscribe(
      (infos) => {
        this.user = infos
      }
    )
  }

  logout() {
    this.userServices.logout().subscribe(
      (result) => console.log(result)
    )
    this.router.navigate(['/login'])
  }
}
