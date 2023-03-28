import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfiuHoReportComponent } from './mfiu-ho-report.component';

describe('MfiuHoReportComponent', () => {
  let component: MfiuHoReportComponent;
  let fixture: ComponentFixture<MfiuHoReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfiuHoReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfiuHoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
