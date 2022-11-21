import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherPrintComponent } from './voucher-print.component';

describe('MigrationReportComponent', () => {
  let component: VoucherPrintComponent;
  let fixture: ComponentFixture<VoucherPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
