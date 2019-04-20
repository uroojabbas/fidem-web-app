import { TestBed } from '@angular/core/testing';

import { PersonalInfoService } from './personal-info.service';

describe('PersonalInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonalInfoService = TestBed.get(PersonalInfoService);
    expect(service).toBeTruthy();
  });
});
