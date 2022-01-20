import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPdfReportComponent } from './search-pdf-report.component';

describe('SearchPdfReportComponent', () => {
  let component: SearchPdfReportComponent;
  let fixture: ComponentFixture<SearchPdfReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPdfReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPdfReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
