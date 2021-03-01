import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebrequestService } from '../webrequest.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private wrs: WebrequestService) { }

  acceptedList() {
    return this.wrs.get('user/acceptedList')
  }

  receivedList() {
    return this.wrs.get('user/receivedList')
  }

  sentList() {
    return this.wrs.get('user/sentList')
  }

}
