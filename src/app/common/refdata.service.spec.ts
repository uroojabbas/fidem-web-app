import { TestBed } from '@angular/core/testing';

import { RefdataService } from './refdata.service';

describe('RefdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefdataService = TestBed.get(RefdataService);
    expect(service).toBeTruthy();
  });
});
