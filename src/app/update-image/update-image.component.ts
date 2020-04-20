import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FirebaseImageService} from '../firebase-image.service'

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.scss']
})
export class UpdateImageComponent implements OnInit {
  image_details;
  new_input:string;

  constructor(private router: Router,
    private firebaseImageService: FirebaseImageService
    ) {
    this.image_details = this.router.getCurrentNavigation().extras.state
   }

  ngOnInit() {
    this.new_input = this.image_details.name
  }
  
  async onInputClick(inputData){
    console.log("Input data from apiCompoenent :",inputData)
    
    await this.firebaseImageService.updateNamedb(inputData,this.image_details.key);
    alert("Name of person updated")

   }


}
