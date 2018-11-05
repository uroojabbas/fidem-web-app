import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface UserManagementItem {

  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  departmentid: number;
  cityid: number;
  regionid: number;
  gender: number;
  permanent: boolean;
  hiredate: Date;
  username: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: UserManagementItem[] = [
  {
    id: 1,
    name: 'Ali Jaffar',
    email: 'contact@jeejava.com',
    phone: '1234567890',
    address: 'Test',
    username: 'sjaffar',
    departmentid: 1,
    cityid: 1,
    regionid: 1,
    gender: 1,
    permanent: true,
    hiredate: new Date()
  } ,
  {
    id: 2,
    name: 'Abdul Rafay',
    email: 'contact@jeejava.com',
    phone: '1234567891',
    address: '2',
    username: 'arafay',
    departmentid: 1,
    cityid: 1,
    regionid: 1,
    gender: 1,
    permanent: true,
    hiredate: new Date()
  },
  {
    id: 3,
    name: 'Muhammad Mujtaba',
    email: 'contact@jeejava.com',
    phone: '1234567891',
    address: '2',
    username: 'mmujtaba',
    departmentid: 1,
    cityid: 1,
    regionid: 1,
    gender: 1,
    permanent: true,
    hiredate: new Date()
  },
  {
    id: 4,
    name: 'Urooj Abbas',
    email: 'contact@jeejava.com',
    phone: '1234567891',
    address: '2',
    username: 'uabbas',
    departmentid: 1,
    cityid: 1,
    regionid: 1,
    gender: 1,
    permanent: true,
    hiredate: new Date()
  }
];

/**
 * Data source for the UserManagement view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserManagementDataSource extends DataSource<UserManagementItem> {
  private data: UserManagementItem[] = EXAMPLE_DATA;

  public setData(data: UserManagementItem[]): void {
    this.data = data;
  }

  public getData(): UserManagementItem[] {
    return this.data;
  }

  public setUserData(userData: UserManagementItem){
    this.data.push(userData);
  }

  public removeUser(id: number): void {
    const userManagementItem = this.data.findIndex(c => c.id === id);
    this.data.splice(userManagementItem);
  }

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserManagementItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UserManagementItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserManagementItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'username': return compare(a.username, b.username, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
