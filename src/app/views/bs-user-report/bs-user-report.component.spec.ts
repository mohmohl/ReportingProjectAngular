import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsUserReportComponent } from './bs-user-report.component';

describe('BsUserReportComponent', () => {
  let component: BsUserReportComponent;
  let fixture: ComponentFixture<BsUserReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsUserReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsUserReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
