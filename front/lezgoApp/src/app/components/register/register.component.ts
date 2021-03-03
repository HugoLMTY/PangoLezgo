import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userServices: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userServices.getAuthState().subscribe(
      (state) => {
        if (state)
          this.router.navigate(['/profil']).then(() => {
            window.location.reload();
          });
      }  
    )
  }

  register(formInfos: any) {
    console.log(formInfos)
    this.userServices.register(formInfos.name, formInfos.uname, formInfos.age, formInfos.pwd, formInfos.family, formInfos.race, formInfos.feeding).subscribe()
  }

}
