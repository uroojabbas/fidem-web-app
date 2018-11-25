import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderManagementComponent } from './purchase-order-management.component';

describe('PurchaseOrderManagementComponent', () => {
  let component: PurchaseOrderManagementComponent;
  let fixture: ComponentFixture<PurchaseOrderManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
