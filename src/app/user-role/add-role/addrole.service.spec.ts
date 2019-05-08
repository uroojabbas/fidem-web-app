import { TestBed } from '@angular/core/testing';

import { AddroleService } from './addrole.service';

describe('AddroleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddroleService = TestBed.get(AddroleService);
    expect(service).toBeTruthy();
  });
});
