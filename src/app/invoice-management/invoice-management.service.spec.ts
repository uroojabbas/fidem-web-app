import { TestBed } from '@angular/core/testing';

import { InvoiceManagementService } from './invoice-management.service';

describe('InvoiceManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceManagementService = TestBed.get(InvoiceManagementService);
    expect(service).toBeTruthy();
  });
});
