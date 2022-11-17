import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MabDenoReportComponent } from './mab-deno-report.component';

describe('MabDenoReportComponent', () => {
  let component: MabDenoReportComponent;
  let fixture: ComponentFixture<MabDenoReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MabDenoReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MabDenoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
