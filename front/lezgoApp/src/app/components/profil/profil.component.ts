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
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
    })

    this.userServices.getCurrentUserInfos().subscribe(
      (infos) => {
        this.user = infos
    })
  }

  updateUser(formInfos: any) {
    console.log(formInfos)
  }

  logout() {
    this.userServices.logout().subscribe()
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    })
  }
}
