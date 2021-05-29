import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPDFComponent } from './search-pdf.component';

describe('SearchPDFComponent', () => {
  let component: SearchPDFComponent;
  let fixture: ComponentFixture<SearchPDFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPDFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
