import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwOutgoingmt103Component } from './dw-outgoingmt103.component';

describe('DwOutgoingmt103Component', () => {
  let component: DwOutgoingmt103Component;
  let fixture: ComponentFixture<DwOutgoingmt103Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwOutgoingmt103Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwOutgoingmt103Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
