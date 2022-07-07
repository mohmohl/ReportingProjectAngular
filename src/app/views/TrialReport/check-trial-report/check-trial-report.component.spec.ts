import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTrialReportComponent } from './check-trial-report.component';

describe('CheckTrialReportComponent', () => {
  let component: CheckTrialReportComponent;
  let fixture: ComponentFixture<CheckTrialReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTrialReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTrialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
