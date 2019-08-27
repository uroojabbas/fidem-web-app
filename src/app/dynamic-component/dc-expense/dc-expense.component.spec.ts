import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcExpenseComponent } from './dc-expense.component';

describe('DcExpenseComponent', () => {
  let component: DcExpenseComponent;
  let fixture: ComponentFixture<DcExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
