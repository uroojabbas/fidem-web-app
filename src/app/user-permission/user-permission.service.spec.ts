import { TestBed } from '@angular/core/testing';

import { UserPermissionService } from './user-permission.service';

describe('UserPermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPermissionService = TestBed.get(UserPermissionService);
    expect(service).toBeTruthy();
  });
});
