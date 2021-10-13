import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTrialReportComponent } from './mis-trial-report.component';

describe('MisTrialReportComponent', () => {
  let component: MisTrialReportComponent;
  let fixture: ComponentFixture<MisTrialReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTrialReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTrialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
