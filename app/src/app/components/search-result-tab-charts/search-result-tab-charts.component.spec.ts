import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTabChartsComponent } from './search-result-tab-charts.component';

describe('SearchResultTabChartsComponent', () => {
  let component: SearchResultTabChartsComponent;
  let fixture: ComponentFixture<SearchResultTabChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultTabChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTabChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
