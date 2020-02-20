import { TestBed } from '@angular/core/testing';

import { FetchmenueService } from './fetchmenue.service';

describe('FetchmenueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchmenueService = TestBed.get(FetchmenueService);
    expect(service).toBeTruthy();
  });
});
