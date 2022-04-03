import { TestBed } from '@angular/core/testing';

import { TickerAutoCompleteService } from './ticker-auto-complete.service';

describe('TickerAutoCompleteService', () => {
  let service: TickerAutoCompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickerAutoCompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
