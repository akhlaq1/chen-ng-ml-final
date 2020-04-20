import { Component, OnInit } from '@angular/core';
import {FirebaseImageService} from '../firebase-image.service'
import {Images} from '../images'
import {MatProgressSpinner} from '@angular/material/progress-spinner'

import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { Router ,ActivatedRoute} from '@angular/router';

import {Subject,BehaviorSubject} from  'rxjs'
import {switchMap} from 'rxjs/operators'
import { AngularFireDatabase } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {AutocompleteService} from '../autocomplete.service'

export interface User {
  name?: string;
  images_url?: string
}


@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.scss']
})
export class ListImagesComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  Student;                 // Save students data in Student's array.
  hideWhenNoStudent: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)

  imageGallery: Object[];
  spinner: boolean = true;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  // local_user = JSON.parse(localStorage.getItem("userData"))

  movies$: Observable<any[]>;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');

  constructor(private firebase_image: FirebaseImageService,
              private router: Router,
              private db: AngularFireDatabase,
              private moviesSvc: AutocompleteService 
              ) {
                

              }
  myControl = new FormControl();
  ngOnInit() {

    this.myControl.valueChanges.subscribe(item => {
      this.search(item)
    })

    this.movies$ = this.moviesSvc.getMovies(this.startAt);


    this.dataState(); // Initialize student's list, when component is ready
    let s = this.firebase_image.GetStudentsList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Student = [];
      this.imageGallery = []

      data.forEach(item => {
        
          let a = item.payload.toJSON();
          console.log('This is a from list components ',a)
        a['$key'] = item.key;
        this.Student.push(a as Images);
        console.log('This is Student from list components ',this.Student)
        
        
        
      })
      this.spinner = false;
      
      console.log(this.Student)
    })
  }

  search(searchText) {
    this.startAt.next(searchText);
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

  remove_image(image){
    this.firebase_image.remove_image(image)
  }

  update_image(image){
    this.router.navigate(['update-image'], { state: image });
  }

}
