import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTransferComponent } from './inventory-transfer.component';

describe('InventoryTransferComponent', () => {
  let component: InventoryTransferComponent;
  let fixture: ComponentFixture<InventoryTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
