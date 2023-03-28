import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfiuBranchReportComponent } from './mfiu-branch-report.component';

describe('MfiuBranchReportComponent', () => {
  let component: MfiuBranchReportComponent;
  let fixture: ComponentFixture<MfiuBranchReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfiuBranchReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfiuBranchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
