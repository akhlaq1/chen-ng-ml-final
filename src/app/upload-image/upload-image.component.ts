import { Component, OnInit } from '@angular/core';

import {FirebaseImageService} from '../firebase-image.service'


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  constructor(private firebase_image: FirebaseImageService) { }

  ngOnInit() {
    this.firebase_image.GetStudentsList();
  }

   
  submitStudentData(value) {
    this.firebase_image.AddStudent(value); // Submit student data using CRUD API
    
   };
   

}
