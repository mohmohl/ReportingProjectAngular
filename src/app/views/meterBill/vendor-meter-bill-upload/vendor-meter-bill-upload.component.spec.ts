import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMeterBillUploadComponent } from './vendor-meter-bill-upload.component';

describe('VendorMeterBillUploadComponent', () => {
  let component: VendorMeterBillUploadComponent;
  let fixture: ComponentFixture<VendorMeterBillUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorMeterBillUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorMeterBillUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
