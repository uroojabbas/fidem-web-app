import { TestBed } from '@angular/core/testing';

import { InventoryTransferService } from './inventory-transfer.service';

describe('InventoryTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryTransferService = TestBed.get(InventoryTransferService);
    expect(service).toBeTruthy();
  });
});
