import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hod3ReportComponent } from './hod3-report.component';

describe('Hod3ReportComponent', () => {
  let component: Hod3ReportComponent;
  let fixture: ComponentFixture<Hod3ReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hod3ReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hod3ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
