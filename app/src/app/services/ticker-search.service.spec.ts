import { TestBed } from '@angular/core/testing';

import { TickerSearchService } from './ticker-search.service';

describe('TickerSearchService', () => {
  let service: TickerSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickerSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
