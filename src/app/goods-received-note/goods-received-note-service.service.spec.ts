import { TestBed } from '@angular/core/testing';

import { GoodsReceivedNoteServiceService } from './goods-received-note-service.service';

describe('GoodsReceivedNoteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoodsReceivedNoteServiceService = TestBed.get(GoodsReceivedNoteServiceService);
    expect(service).toBeTruthy();
  });
});
