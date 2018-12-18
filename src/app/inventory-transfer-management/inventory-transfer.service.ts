import { Injectable } from '@angular/core';
import {User} from '../user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryTransferService {

  public displayStepper: boolean;
  public id: number;
  public poNumber: string;
  public date: Date =  new Date();
  public userName: string;
  public fromRegion: string;
  public toRegion: string;
  public transferType: string;
  public totalQuantity: number;
  public totalProducts: number;
  public toStatusType: string;
  public productList: any[];
  constructor(private userService: UserService,
    private _http: HttpClient) { }

  public setTransferOrderValues(transferOrder) {
    this.poNumber = transferOrder.toId;
    this.date = new Date();
    this.userName = transferOrder.users.name;
    this.fromRegion = transferOrder.fromregion;
    this.toRegion = transferOrder.toregion;
    this.transferType = transferOrder.transfertype;
    this.totalQuantity = transferOrder.totalQuantity;
    this.totalProducts = transferOrder.totalProducts;
    this.productList = transferOrder.todetail;
    this.toStatusType = transferOrder.toStatusType;
  }

  public isPendingApproval(): boolean {
    return this.toStatusType.toLowerCase() === 'Pending Approval'.toLowerCase() ? true : false;
  }

  public isApproved(): boolean {
    return this.toStatusType.toLowerCase() === 'Approved'.toLowerCase() ? true : false;
  }

  public isTODispatched(): boolean {
    return this.toStatusType.toLowerCase() === 'TO Inventory Dispatched'.toLowerCase() ? true : false;
  }

  private getTO() {
    return      {
      id: this.id,
      users: {id: this.userService.getUserId()}
    };
  }

  public approveTO(): Observable<any> {

    const po = this.getTO();

    return this._http.post<User>(this.userService.getrestURL() + '/transferOrder/approve', po);
  }

  public rejectTO(): Observable<any>  {

    const po = this.getTO();

    return this._http.post<User>(this.userService.getrestURL() + '/transferOrder/reject', po);
  }

  dispatchTO(): Observable<any>  {

    const po = this.getTO();

    return this._http.post<User>(this.userService.getrestURL() + '/transferOrder/dispatch', po);
  }

  receivedTO(): Observable<any>  {

    const po = this.getTO();

    return this._http.post<User>(this.userService.getrestURL() + '/transferOrder/inventoryReceived', po);
  }

  public cancelTO(): Observable<any>  {

    const po = this.getTO();

    return this._http.post<User>(this.userService.getrestURL() + '/transferOrder/cancel', po);
  }
}
