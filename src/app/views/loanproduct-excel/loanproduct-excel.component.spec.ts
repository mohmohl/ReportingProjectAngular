import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanproductExcelComponent } from './loanproduct-excel.component';

describe('LoanproductExcelComponent', () => {
  let component: LoanproductExcelComponent;
  let fixture: ComponentFixture<LoanproductExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanproductExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanproductExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
