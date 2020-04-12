import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {
  image_details;
  constructor(private router: Router) {
    this.image_details = this.router.getCurrentNavigation().extras.state
   }

  ngOnInit() {
  }


}
