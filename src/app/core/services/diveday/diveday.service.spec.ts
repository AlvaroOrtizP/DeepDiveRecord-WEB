import { TestBed } from '@angular/core/testing';

import { DivedayService } from './diveday.service';

describe('DivedayService', () => {
  let service: DivedayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivedayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
