// TODO: Replace this with your own data model type
import {DataSource} from '@angular/cdk/collections';
import {merge, Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/internal/operators';

export interface PurchaseOrderItem {

  id: number;
  isbn: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
  discountedPrice: number;
  amount: number;
}

export class PurchaseOrderDatasource extends DataSource<PurchaseOrderItem> {
  public data: PurchaseOrderItem[] = [];


  constructor() {
    super();
  }

  public add(purchaseOrderItem: PurchaseOrderItem){
    this.data.push(purchaseOrderItem);
  }

  public delete(id: number): void {
    const purchaseOrderItem = this.data.findIndex(c => c.id === id);
    this.data.splice(purchaseOrderItem);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PurchaseOrderItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data)
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.data;
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}
}
