import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTabInsightsComponent } from './search-result-tab-insights.component';

describe('SearchResultTabInsightsComponent', () => {
  let component: SearchResultTabInsightsComponent;
  let fixture: ComponentFixture<SearchResultTabInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultTabInsightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTabInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
