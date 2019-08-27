import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import {UserService} from '../user.service';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(public userService: UserService,
              private httpClient: HttpClient) { }

  public upload(data) {
    const userId = this.userService.getUserId();
    const uploadURL = this.userService.getrestURL() + '/upload-file/';

    return this.httpClient.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progressValue = Math.round(100 * (event.loaded / event.total));
            const progress = progressValue + ' %';
            console.log('Http Event Type UploadProgress' + event);
            return { status: 'progress', message: progress, value: progressValue };

          case HttpEventType.Response:
            console.log('Http Event Type Response');
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }
}
