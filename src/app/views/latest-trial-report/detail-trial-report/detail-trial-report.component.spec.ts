import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTrialReportComponent } from './detail-trial-report.component';

describe('DetailTrialReportComponent', () => {
  let component: DetailTrialReportComponent;
  let fixture: ComponentFixture<DetailTrialReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTrialReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTrialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
