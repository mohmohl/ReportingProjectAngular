import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTrialReportComponent } from './general-trial-report.component';

describe('GeneralTrialReportComponent', () => {
  let component: GeneralTrialReportComponent;
  let fixture: ComponentFixture<GeneralTrialReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTrialReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTrialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
