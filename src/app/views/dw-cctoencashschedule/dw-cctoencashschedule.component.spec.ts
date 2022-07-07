import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwCctoencashscheduleComponent } from './dw-cctoencashschedule.component';

describe('DwCctoencashscheduleComponent', () => {
  let component: DwCctoencashscheduleComponent;
  let fixture: ComponentFixture<DwCctoencashscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwCctoencashscheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwCctoencashscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
