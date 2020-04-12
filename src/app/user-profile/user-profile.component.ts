import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router ,ActivatedRoute} from '@angular/router';

import { MatIconRegistry } from "@angular/material/icon";


import { DomSanitizer} from '@angular/platform-browser'

const googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from '../shared/must-match.validator';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  toggle: boolean = true;
  registerForm: FormGroup;
  loginForm: FormGroup;
  submitted_login = false;
  submitted_register = false;
  user;
  error_toggle: boolean;
  errors;



  constructor(public auth: AuthService,
    private router: Router,
     private r:ActivatedRoute,
     private matIconRegistry: MatIconRegistry,
     private domSanitizer: DomSanitizer,
     private formBuilder: FormBuilder) { 
      this.matIconRegistry.addSvgIcon(
        "logo",
        this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
     }
     toggle_func(){
      if (this.toggle){
        this.toggle = false

      }
      else{
        this.toggle = true

      }
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  
  this.loginForm = this.formBuilder.group({
   
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  
  });
}


get f() { return  this.loginForm.controls;  }
get f_register() { return  this.registerForm.controls;  }



async onSubmit() { // Registration Function
    this.submitted_register = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    console.log(this.registerForm.value)
    const dataFromRegister   = await this.auth.register(this.registerForm.value)
    .then((data)=>{
      console.log("Data from dataFromRegister from user-profile ",data);
      alert('SUCCESS!! :-)\n\n' +" Welcome "+ this.registerForm.value.firstName+'\n\n'+"Please Sign In to Continue");
      localStorage.clear();
      this.toggle_func()
    })
    .catch((error)=>{
      alert(error)
    })

    console.log("Data from register async function ",dataFromRegister)


    
      // .then(data => {
      //   alert("SUCCESS!! ")
      //   this.router.navigate['login']

      // })
      // .catch(error => {
      //   this.error_toggle = true
      //   this.errors = error
      //   alert(error)
      // })
}

async onLogInSubmit(){
  this.submitted_login = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }

  //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value));
  console.log(this.loginForm.value)
  await this.auth.loginEmailPass(this.loginForm.value)
    .then(data => {
      this.auth.setIsLogedInVar(true)
      this.router.navigate(['api'])
    })
    .catch(error => alert(error))


}
googleSignIn(){
  this.submitted_login = false;
  console.log()
  this.auth.googleSignin()
  this.auth.user$.subscribe(user=>{
    
  }) 
}


}
