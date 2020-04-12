import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiUrl = "https://jsonplaceholder.typicode.com/users"

  constructor(private _http: HttpClient) { }

uploadFi(){
  return this._http.get(this.apiUrl)
}


}
