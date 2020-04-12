import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import {Images} from './images'
import {AngularFireModule} from '@angular/fire'

@Injectable({
  providedIn: 'root'
})
export class FirebaseImageService {

  studentsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  studentRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
    

  userData;
  storage;
  constructor(private db: AngularFireDatabase, private firebase: AngularFireModule) { }

  

  setUserdata(data){
    this.userData = data
    localStorage.setItem('uid', data.uid);

    }
    
    AddStudent(image_url:Images) {
      this.studentsRef.push({
          image_url:image_url
      })
    }
  
    GetStudentsList() {
      let uid  = localStorage.getItem('uid')
      this.studentsRef = this.db.list(uid);
      return this.studentsRef;
    }  
  
    pushConvertedImageUrlToFirebase(url){
      this.GetStudentsList()
      this.studentsRef.push({
        image_url:url
    })
    console.log("Converted Image Url pushed to db,, congrats")
    }
 

  }


