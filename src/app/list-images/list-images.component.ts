import { Component, OnInit } from '@angular/core';
import {FirebaseImageService} from '../firebase-image.service'
import {Images} from '../images'
import {MatProgressSpinner} from '@angular/material/progress-spinner'
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss']
})
export class ListImagesComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  Student: Images[];                 // Save students data in Student's array.
  hideWhenNoStudent: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  
  imageGallery: Object[];
  spinner: boolean = true;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  // local_user = JSON.parse(localStorage.getItem("userData"))
  


  constructor(private firebase_image: FirebaseImageService,
              private router: Router) { }
  
  ngOnInit() {

    this.dataState(); // Initialize student's list, when component is ready
    let s = this.firebase_image.GetStudentsList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Student = [];
      this.imageGallery = []
      
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Student.push(a as Images);
      })
      this.spinner = false;
      console.log(this.Student)
    })
  }

  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.firebase_image.GetStudentsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  image_clicked(image){
    console.log(image)
    this.router.navigate(['image-display'], { state: image });
  }

}
