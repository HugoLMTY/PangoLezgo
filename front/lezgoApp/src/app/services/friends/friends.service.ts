import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebrequestService } from '../webrequest.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private wrs: WebrequestService) { }


  // Les actions font référence au routeur 'user', l'explication est dans ce même router (ligne 174)

  acceptedList() {
    return this.wrs.get('user/acceptedList')
  }

  receivedList() {
    return this.wrs.get('user/receivedList')
  }

  sentList() {
    return this.wrs.get('user/sentList')
  }

  sendInvite(targetID: string) {
    return this.wrs.post('user/sendInvite', {targetID})
  }

  acceptInvite(targetID: string) {
    return this.wrs.post('user/acceptInvite', {targetID})
  }

  rejectInvite(targetID: string) {
    return this.wrs.post('user/rejectInvite', {targetID})
  }

  cancelInvite(targetID: string) {
    return this.wrs.post('user/cancelInvite', {targetID})
  }

  deleteFriend(targetID: string) {
    return this.wrs.post('user/deleteFriend', {targetID})
  }

}
