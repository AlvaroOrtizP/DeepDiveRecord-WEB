import { TestBed } from '@angular/core/testing';

import { GeograficlocationService } from './geograficlocation.service';

describe('GeograficlocationService', () => {
  let service: GeograficlocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeograficlocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
