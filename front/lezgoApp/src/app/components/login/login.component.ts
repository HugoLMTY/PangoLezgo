import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userServices: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userServices.getAuthState().subscribe(
      (state) => {
        if (state)
          this.router.navigate(['/profil'])
      }  
    )
  }

  login(formInfos: any) {
    if (formInfos.uname == "" || formInfos.pwd == "" ){
      console.log('no')
    } else {
      this.userServices.login(formInfos.uname, formInfos.pwd).subscribe(
        (result: any) => { 
          this.router.navigate(['/profil'])
        }
      )
    }
  }

}
