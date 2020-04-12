import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {UploadImageComponent} from './upload-image/upload-image.component'
import {ListImagesComponent} from './list-images/list-images.component'
import {ApiComponentComponent} from './api-component/api-component.component'
import {ImageDisplayComponent} from './image-display/image-display.component'

import {AuthGuard} from './auth.guard'

import {UploadFileComponent} from './file-upload-modules/shared/upload-file/upload-file.component'

const routes: Routes = [  { path: '', redirectTo: 'login', pathMatch: 'full' },

{ path: 'login', component: UserProfileComponent},
// { path: 'upload', component: UploadImageComponent ,canActivate: [AuthGuard]},
{ path: 'api', component: ApiComponentComponent,canActivate: [AuthGuard] },
{ path: 'list', component: ListImagesComponent ,canActivate: [AuthGuard]},
{ path: 'upload', component: UploadFileComponent,canActivate: [AuthGuard]},
{ path: 'image-display', component: ImageDisplayComponent,canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
