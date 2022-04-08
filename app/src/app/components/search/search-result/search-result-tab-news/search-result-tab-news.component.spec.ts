import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTabNewsComponent } from './search-result-tab-news.component';

describe('SearchResultTabNewsComponent', () => {
  let component: SearchResultTabNewsComponent;
  let fixture: ComponentFixture<SearchResultTabNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultTabNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTabNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
