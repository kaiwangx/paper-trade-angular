import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTabNewsModelComponent } from './search-result-tab-news-model.component';

describe('SearchResultTabNewsModelComponent', () => {
  let component: SearchResultTabNewsModelComponent;
  let fixture: ComponentFixture<SearchResultTabNewsModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultTabNewsModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTabNewsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
