import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';


@Injectable({
  providedIn: 'root'
})
export class GoodsReceivedNoteServiceService {

  public id: number;

  constructor(private userService: UserService,
              private _http: HttpClient,
  ) { }

  initGoodsReceivedNoteDetail(id: number): Observable<any>  {

    return this._http.get(this.userService.getrestURL() + '/grn/id/' + id);
  }


}
