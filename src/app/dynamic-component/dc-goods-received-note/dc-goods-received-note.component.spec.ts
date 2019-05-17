import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcGoodsReceivedNoteComponent } from './dc-goods-received-note.component';

describe('DcGoodsReceivedNoteComponent', () => {
  let component: DcGoodsReceivedNoteComponent;
  let fixture: ComponentFixture<DcGoodsReceivedNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcGoodsReceivedNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcGoodsReceivedNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
