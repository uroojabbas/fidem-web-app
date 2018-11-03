import { TestBed } from '@angular/core/testing';

import { UsermanagementService } from './usermanagement.service';

describe('UsermanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsermanagementService = TestBed.get(UsermanagementService);
    expect(service).toBeTruthy();
  });
});
