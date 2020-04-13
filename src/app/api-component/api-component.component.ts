import { Component, OnInit } from '@angular/core';


import { HttpClient,HttpEventType} from '@angular/common/http';
import {environment} from '../../environments/environment';

import {FirebaseImageService} from '../firebase-image.service'

import {Router, ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-api-component',
  templateUrl: './api-component.component.html',
  styleUrls: ['./api-component.component.scss']
})
export class ApiComponentComponent implements OnInit {

  selectedFile;
  outImgUrl: string;
  progress: number;
  isUploadStarted: boolean =false;
  isUploadButtonDisabled: boolean = true;
  uploadedFile:boolean = false;


    // Define FormGroup to student's form

  constructor(
              private http:HttpClient,
              private firebaseImageService: FirebaseImageService,
              private router: Router, private r:ActivatedRoute
    ) { }

  // local_user = JSON.parse(localStorage.getItem("userData"))

  ngOnInit() {

  }



  onFileSelected(event){
    this.isUploadButtonDisabled = false;
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile)
  }


  uploadFileFunc(){
    this.isUploadStarted = true;
    console.log("File upload")
    const fd = new FormData();

    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post(environment.apiUrl, fd,{
      reportProgress: true,
      observe: 'events'
    })

    .subscribe(event =>{
      console.log("Heroku response   ",event)
      if (event.type == HttpEventType.UploadProgress){

        this.progress = Math.round(event.loaded/event.total*100)
        console.log("Upload Progress: ", this.progress,"%")

        if (this.progress == 100){
          console.log("processing started , have patience")
        }
      }
      else if(event.type == HttpEventType.Sent){
        console.log("Processing")
      }
      else if(event.type == HttpEventType.Response){
        this.uploadedFile = true;
        console.log(event)
        this.outImgUrl = event.body['img_url']
        this.firebaseImageService.pushConvertedImageUrlToFirebase(this.outImgUrl)
      }


  },
      error => console.log("Heroku response   ",error)
    );
  }
  goToList() {
    this.router.navigate(["../list"], { relativeTo: this.r.parent });
 }

 async onInputClick(inputData){
  console.log("Input data from apiCompoenent :",inputData)
  let key  = localStorage.getItem('pushedImageKey')
  await this.firebaseImageService.updateNamedb(inputData,key);
  alert("Name of person updated")
  this.goToList()
 }


}
