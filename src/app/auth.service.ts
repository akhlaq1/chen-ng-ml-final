import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { User } from './user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {FirebaseImageService} from './firebase-image.service'



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  user_local;
  result;
  firestore_doc_observable;
  logedIn: boolean = false;

  userFromFireStore: Observable<User>;

  constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private fimage:FirebaseImageService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          this.fimage.setUserdata(user)

          this.user_local = user;
          //localStorage.setItem('user', JSON.stringify(this.user_local));

          this.userFromFireStore = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          return this.userFromFireStore;

        } else {
          // Logged out
          localStorage.setItem('user', null);
          return of(null);
        }
      })
    );
   }

   

   async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log(credential.user)
    if(credential.user){
      this.setIsLogedInVar(true)
      this.router.navigate(['api'])
    }
    return this.updateUserData(credential.user);
  }

  async register(user1) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user1.email, user1.password)
    const updateUserData = await this.updateUserData(result.user,user1)

    return updateUserData
    
}

// async sendEmailVerification() {
//   await this.afAuth.auth.currentUser.sendEmailVerification()
//   this.router.navigate(['admin/verify-email']);
// }

  async loginEmailPass(user) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
    // const userRef: AngularFirestoreDocument<User> = await this.afs.doc(`users/${result.user.uid}`);
    // this.firestore_doc_observable = userRef.valueChanges()
    // this.firestore_doc_observable.subscribe((data)=>{
    //   console.log("This is data from loginEmailPass from firestore ",data)
    // })
    console.log("This is data from loginEmailPass from firestore ",this.user$)
    
    
    localStorage.setItem('uid',result.user.uid)

    console.log("Login result data ",result)
    //this.router.navigate(['api']);
    //const updatingData = await this.updateUserData(result.user)
    return result
}

  async updateUserData(user,local_user=null) {
    // Sets user data to firestore on login
    
    const userRef: AngularFirestoreDocument<User> =  this.afs.doc(`users/${user.uid}`);
    let data;
    if(local_user){
      data = {
        uid: user.uid,
        email: user.email,
        displayName:  local_user.firstName+" "+local_user.lastName ,
        photoURL: user.photoURL
      }
    }
    else{
      data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }
    }
    await userRef.set(data, { merge: true })
    
    return data

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['login']);
    localStorage.clear();

  }

  setIsLogedInVar(bool){
    this.logedIn = bool;
  }
  get isLoggedIn(): boolean {
    //const  user  =  localStorage.getItem('user');
    if (this.logedIn){
      this.user$.subscribe(data => {localStorage.setItem('userData',JSON.stringify(data))})
      return true
    }
    else{
      return false
    }
}

}