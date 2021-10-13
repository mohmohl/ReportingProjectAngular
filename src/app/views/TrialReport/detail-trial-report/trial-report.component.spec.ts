import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialReportComponent } from './trial-report.component';

describe('TrialReportComponent', () => {
  let component: TrialReportComponent;
  let fixture: ComponentFixture<TrialReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
