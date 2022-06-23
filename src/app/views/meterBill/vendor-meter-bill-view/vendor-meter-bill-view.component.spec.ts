import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMeterBillViewComponent } from './vendor-meter-bill-view.component';

describe('VendorMeterBillViewComponent', () => {
  let component: VendorMeterBillViewComponent;
  let fixture: ComponentFixture<VendorMeterBillViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorMeterBillViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorMeterBillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
