import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FirebaseImageService} from './../../firebase-image.service'

export const API = environment.apiUrl;

@Injectable()
export class FileService {

  constructor(private firebaseImageService: FirebaseImageService){}

  formData: FormData = new FormData();
  xhr: XMLHttpRequest = new XMLHttpRequest();

  // BehaviorSubject used to get progressbar value when it changes
  private _progress: BehaviorSubject<number> = new BehaviorSubject(0);

  // Return progress state as observable
  get progress(): Observable<number> {
    return this._progress.asObservable();
  }

  upload(files: File[], url?: string): Observable<{}> {
    // Create observable for sending response to subscribed components
    return Observable.create((observer: any) => {

      // Instantiate XHR request and set response type
      this.xhr = new XMLHttpRequest();
      this.xhr.responseType = 'json';

        // Parse DOM NodeList into regular array
        const _files = [].slice.call(files);

        // Append files to formData
        _files.forEach((file: File) => {
          this.formData.append('image', file, file.name);
        });

      this.xhr.onreadystatechange = () => {
        // Return response to subscribed components
        if (this.xhr.readyState === 4) {
          const response: { img_url?: string; success?: boolean } = this.xhr.response;
          
          observer.next(response);
        }
      };

      // Emit current progress in percents
      this.xhr.upload.onprogress = (event: ProgressEvent) => {
        this._progress.next(Math.round((event.loaded / event.total) * 100));
      };

      this.xhr.open('POST', url ? url : API, true);
      this.xhr.send(this.formData);
    });
  }
}