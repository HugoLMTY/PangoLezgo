import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { WebrequestService } from '../webrequest.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private wrs: WebrequestService) { }                                 
         
  getAuthState() {
    return this.wrs.get('user/isAuth')
  }

  getCurrentUserInfos() {
    return this.wrs.get('user/currentUser')
  }

  login(uname: string, pwd: string) {
    return this.wrs.post('user/login', {uname, pwd})
  }

  all() {
    return this.wrs.get('user/all')
  }

  logout() {
    this.wrs.get('user/logout')
  }
}
