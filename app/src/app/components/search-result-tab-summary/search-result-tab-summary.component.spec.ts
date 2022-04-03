import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTabSummaryComponent } from './search-result-tab-summary.component';

describe('SearchResultTabSummaryComponent', () => {
  let component: SearchResultTabSummaryComponent;
  let fixture: ComponentFixture<SearchResultTabSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultTabSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTabSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
