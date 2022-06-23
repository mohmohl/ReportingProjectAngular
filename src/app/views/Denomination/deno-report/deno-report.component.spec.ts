import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenoReportComponent } from './deno-report.component';

describe('DenoReportComponent', () => {
  let component: DenoReportComponent;
  let fixture: ComponentFixture<DenoReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenoReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
