import { TestBed } from '@angular/core/testing';

import { UserRoleServiceService } from './user-role-service.service';

describe('UserRoleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRoleServiceService = TestBed.get(UserRoleServiceService);
    expect(service).toBeTruthy();
  });
});
