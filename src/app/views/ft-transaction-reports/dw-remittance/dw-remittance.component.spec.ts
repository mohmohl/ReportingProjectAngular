import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwRemittanceComponent } from './dw-remittance.component';

describe('DwRemittanceComponent', () => {
  let component: DwRemittanceComponent;
  let fixture: ComponentFixture<DwRemittanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwRemittanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwRemittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
