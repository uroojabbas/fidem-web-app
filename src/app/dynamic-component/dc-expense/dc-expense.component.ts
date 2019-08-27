import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

export interface ExpenseData {
  expenseType: string;
  expenseAmount: number;
}

@Component({
  selector: 'app-dc-expense',
  templateUrl: './dc-expense.component.html',
  styleUrls: ['./dc-expense.component.css']
})
export class DcExpenseComponent implements OnInit {

  public listData: MatTableDataSource<ExpenseData> = new MatTableDataSource();
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['expenseType',  'expenseAmount'];
  isReady = false;
  constructor() {

  }

  ngOnInit() {
    const data = [{expenseType: 'A', expenseAmount: 0}, {expenseType: 'B', expenseAmount: 0}, {expenseType: 'C', expenseAmount: 0}];
    this.listData = new MatTableDataSource(data);
    this.isReady = true;
  }

}
