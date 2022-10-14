import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationReportComponent } from './migration-report.component';

describe('MigrationReportComponent', () => {
  let component: MigrationReportComponent;
  let fixture: ComponentFixture<MigrationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
