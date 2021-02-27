import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebrequestService } from '../webrequest.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private wrs: WebrequestService) { }

  allById(uid: string) {
    return this.wrs.post('friends/accptedList', uid)
  }

}
