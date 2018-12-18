import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTransferManagementComponent } from './inventory-transfer-management.component';

describe('InventoryTransferManagementComponent', () => {
  let component: InventoryTransferManagementComponent;
  let fixture: ComponentFixture<InventoryTransferManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTransferManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTransferManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
