import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcVendorComponent } from './dc-vendor.component';

describe('DcVendorComponent', () => {
  let component: DcVendorComponent;
  let fixture: ComponentFixture<DcVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
