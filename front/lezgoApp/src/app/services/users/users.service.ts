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

  countRequests() {
    return this.wrs.get('user/countRequests')
  }

  login(uname: string, pwd: string) {
    return this.wrs.post('user/login', {uname, pwd})
  }

  register(name: string, uname: string, age: number, pwd: string, family: string, race: string, feeding: string) {
    return this.wrs.post('user/createAccount', {name, uname, age, pwd, family, race, feeding})
  }

  editUser(name: string, age: number, family: string, race: string, feeding: string) {
    return this.wrs.post('user/editAccount', {name, age, family, race, feeding})
  }

  all() {
    return this.wrs.get('user/all')
  }

  logout() {
    return this.wrs.get('user/logout')
  }

  deleteAccount() {
    return this.wrs.get('user/deleteAccount')
  }
}
