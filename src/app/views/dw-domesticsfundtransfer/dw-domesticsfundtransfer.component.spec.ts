import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwDomesticsfundtransferComponent } from './dw-domesticsfundtransfer.component';

describe('DwDomesticsfundtransferComponent', () => {
  let component: DwDomesticsfundtransferComponent;
  let fixture: ComponentFixture<DwDomesticsfundtransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwDomesticsfundtransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwDomesticsfundtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
