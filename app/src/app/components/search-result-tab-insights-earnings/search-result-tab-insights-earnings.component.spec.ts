import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTabInsightsEarningsComponent } from './search-result-tab-insights-earnings.component';

describe('SearchResultTabInsightsEarningsComponent', () => {
  let component: SearchResultTabInsightsEarningsComponent;
  let fixture: ComponentFixture<SearchResultTabInsightsEarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultTabInsightsEarningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTabInsightsEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
