import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoInvoiceComponent } from './po-invoice-record.component';

describe('DailyDenoRecordComponent', () => {
  let component: PoInvoiceComponent;
  let fixture: ComponentFixture<PoInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
