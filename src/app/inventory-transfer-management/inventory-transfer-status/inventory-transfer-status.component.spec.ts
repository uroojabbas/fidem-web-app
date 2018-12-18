import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTransferStatusComponent } from './inventory-transfer-status.component';

describe('InventoryTransferStatusComponent', () => {
  let component: InventoryTransferStatusComponent;
  let fixture: ComponentFixture<InventoryTransferStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTransferStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTransferStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
