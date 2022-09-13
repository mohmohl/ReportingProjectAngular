import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralTrialConsoReportComponent } from './general-trial-conso-report.component';


describe('GeneralTrialConsoReportComponent', () => {
  let component: GeneralTrialConsoReportComponent;
  let fixture: ComponentFixture<GeneralTrialConsoReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTrialConsoReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTrialConsoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
