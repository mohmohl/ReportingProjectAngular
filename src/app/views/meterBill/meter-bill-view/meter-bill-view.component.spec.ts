import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterBillViewComponent } from './meter-bill-view.component';

describe('MeterBillViewComponent', () => {
  let component: MeterBillViewComponent;
  let fixture: ComponentFixture<MeterBillViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterBillViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterBillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
