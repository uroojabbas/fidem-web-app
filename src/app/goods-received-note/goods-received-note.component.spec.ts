import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceivedNoteComponent } from './goods-received-note.component';

describe('GoodsReceivedNoteComponent', () => {
  let component: GoodsReceivedNoteComponent;
  let fixture: ComponentFixture<GoodsReceivedNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReceivedNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceivedNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
