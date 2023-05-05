import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EOYDetailTrialReportComponent } from './eoy-detail-trial-report.component';


describe('EOYDetailTrialReportComponent', () => {
  let component: EOYDetailTrialReportComponent;
  let fixture: ComponentFixture<EOYDetailTrialReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EOYDetailTrialReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOYDetailTrialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
