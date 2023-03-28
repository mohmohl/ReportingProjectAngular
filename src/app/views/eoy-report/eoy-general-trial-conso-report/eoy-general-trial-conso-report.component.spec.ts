import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EOYGeneralTrialConsoReportComponent } from './eoy-general-trial-conso-report.component';

describe('EOYGeneralTrialConsoReportComponent', () => {
  let component: EOYGeneralTrialConsoReportComponent;
  let fixture: ComponentFixture<EOYGeneralTrialConsoReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EOYGeneralTrialConsoReportComponent ]
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
