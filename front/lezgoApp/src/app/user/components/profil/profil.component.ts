import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
            window.location.reload()
          });
    })

    this.userServices.getCurrentUserInfos().subscribe(
      (infos: any) => {
        this.user = infos
    })
  }

  updateUser(formInfos: any) {
    const f = formInfos
    this.userServices.editUser(
      f.name, 
      f.age, 
      f.family, 
      f.race, 
      f.feeding).subscribe(
        () => window.location.reload()
      )
  }

  logout() {
    this.userServices.logout().subscribe()
    this.router.navigate(['/login']).then(() => {
      window.location.reload()
    })
  }

  deleteAccount() {
    this.userServices.deleteAccount().subscribe()
    this.router.navigate(['/login']).then(() => {
      window.location.reload()
    })
  }

}
