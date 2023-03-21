import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EOYGeneralTrialReportComponent } from './eoy-general-trial-report.component';


describe('EOYGeneralTrialReportComponent', () => {
  let component: EOYGeneralTrialReportComponent;
  let fixture: ComponentFixture<EOYGeneralTrialReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EOYGeneralTrialReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOYGeneralTrialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
