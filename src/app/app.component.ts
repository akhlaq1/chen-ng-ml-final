import { Component } from '@angular/core';
import {AuthService} from './auth.service'
import { Observable, of } from 'rxjs';
import {Location} from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Facelook';
  constructor(public auth: AuthService,private _location: Location){}

  
  signout_func(){
    let confirm_res = confirm("Oops !! You really want to Sign Out? :( ")
    if (confirm_res){
      this.auth.setIsLogedInVar(false)
      this.auth.signOut()
    }
    
  }
  backClicked() {
    this._location.back();
  }

}
