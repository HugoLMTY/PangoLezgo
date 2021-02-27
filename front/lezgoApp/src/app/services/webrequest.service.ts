import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WebrequestService {

  readonly url = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  get(uri: string) {
    return this.http.get(this.url + uri)
  }

  post(uri: string, payload: Object) {
    return this.http.post(this.url + uri, payload)
  }
}
