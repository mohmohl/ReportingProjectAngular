import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoTrialReportComponent } from './conso-trial-report.component';

describe('ConsoTrialReportComponent', () => {
  let component: ConsoTrialReportComponent;
  let fixture: ComponentFixture<ConsoTrialReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoTrialReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoTrialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
