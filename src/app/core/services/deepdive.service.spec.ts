import { TestBed } from '@angular/core/testing';

import { DeepdiveService } from './deepdive.service';

describe('DeepdiveService', () => {
  let service: DeepdiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepdiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
