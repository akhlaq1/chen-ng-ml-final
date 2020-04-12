import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent {

  @ViewChild('progressbar') progressbar: ElementRef;
  @Input() progress: number;

  constructor() { }
}