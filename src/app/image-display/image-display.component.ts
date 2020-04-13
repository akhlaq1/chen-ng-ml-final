import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FirebaseImageService} from '../firebase-image.service'


@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {
  image_details;
  constructor(private router: Router,
    private firebaseImageService: FirebaseImageService
    ) {
    this.image_details = this.router.getCurrentNavigation().extras.state
   }

  ngOnInit() {
  }

  async onInputClick(inputData){
    console.log("Input data from apiCompoenent :",inputData)
    let key  = localStorage.getItem('pushedImageKey')
    await this.firebaseImageService.updateNamedb(inputData,key);
    alert("Name of person updated")

   }


}
