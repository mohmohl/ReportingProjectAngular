import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwIncomingmt103Component } from './dw-incomingmt103.component';

describe('DwIncomingmt103Component', () => {
  let component: DwIncomingmt103Component;
  let fixture: ComponentFixture<DwIncomingmt103Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwIncomingmt103Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwIncomingmt103Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
