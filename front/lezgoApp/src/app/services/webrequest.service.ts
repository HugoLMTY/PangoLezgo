import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WebrequestService {

  readonly url = 'localhost:3000/api/'

  constructor(private http: HttpClient) { }

  get(uri: string) {
    return this.http.get(this.url + uri).pipe(
      map(
        (usersInfos) => {
          console.log(usersInfos)
        }
      )
    )
  }

  post(uri: string, payload: Object) {
    return this.http.post(this.url + uri, payload).pipe(
      map(
        (usersInfos) => {
          console.log(usersInfos)
        }
      )
    )
  }

}
