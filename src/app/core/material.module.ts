import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,MatIconModule, MatProgressSpinnerModule, MatAutocompleteModule,
  MatProgressBarModule,MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';


@NgModule({
  imports: [

  MatButtonModule, 

  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatAutocompleteModule
  
 
  
  ],
  exports: [
  CommonModule,

   MatButtonModule, 
  MatIconModule,
   MatProgressSpinnerModule,
   MatProgressBarModule,
   MatAutocompleteModule
   
   
   ],
   providers:[{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]
})
export class CustomMaterialModule { }