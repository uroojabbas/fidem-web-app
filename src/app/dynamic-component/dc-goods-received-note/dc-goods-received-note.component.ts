import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../common/notification.service';

export interface GroodReceivedNote {

id: number;
poId: number;
vendorName: string;
receivedDate: Date;
userName: string;
amount: number;
poCreationDate: Date;
productQuantity: number;
productCost: number;
productName: string;
grnId: string;
purchaseOrderId: string;
}

@Component({
  selector: 'app-dc-goods-received-note',
  templateUrl: './dc-goods-received-note.component.html',
  styleUrls: ['./dc-goods-received-note.component.css']
})
export class DcGoodsReceivedNoteComponent implements OnInit {

  @Input() grnList: number[];
  grnData: GroodReceivedNote[];
  isReady: boolean;
  constructor(private user: UserService,
  private _http: HttpClient,
  private notificationService: NotificationService) { }

  ngOnInit() {
    this.isReady = false;
    if (this.grnList === undefined) {
      this.notificationService.showErrorMsg('GRN List is not defined');
    } else {
      this.getGRNList();
    }

  }

  getGRNList(): void {

    this._http.get(this.user.getrestURL() + '/grn/list/' + this.grnList).subscribe(data => this.setGRNList(data),
      error => this.notificationService.showError(error));
  }

  setGRNList(data): void {
    this.grnData = data;
    this.isReady = true;
  }
}
