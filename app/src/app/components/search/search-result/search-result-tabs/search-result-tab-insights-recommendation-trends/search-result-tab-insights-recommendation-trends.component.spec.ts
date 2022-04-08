import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTabInsightsRecommendationTrendsComponent } from './search-result-tab-insights-recommendation-trends.component';

describe('SearchResultTabInsightsRecommendationTrendsComponent', () => {
  let component: SearchResultTabInsightsRecommendationTrendsComponent;
  let fixture: ComponentFixture<SearchResultTabInsightsRecommendationTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultTabInsightsRecommendationTrendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTabInsightsRecommendationTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
