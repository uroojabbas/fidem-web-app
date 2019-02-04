import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceivedNoteDetailComponent } from './goods-received-note-detail.component';

describe('GoodsReceivedNoteDetailComponent', () => {
  let component: GoodsReceivedNoteDetailComponent;
  let fixture: ComponentFixture<GoodsReceivedNoteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReceivedNoteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceivedNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
