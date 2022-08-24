import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwDailyfundtransferComponent } from './dw-dailyfundtransfer.component';

describe('DwDailyfundtransferComponent', () => {
  let component: DwDailyfundtransferComponent;
  let fixture: ComponentFixture<DwDailyfundtransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwDailyfundtransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwDailyfundtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
