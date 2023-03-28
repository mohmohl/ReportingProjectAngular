import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfiuHoResendComponent } from './mfiu-ho-resend.component';

describe('MfiuHoResendComponent', () => {
  let component: MfiuHoResendComponent;
  let fixture: ComponentFixture<MfiuHoResendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfiuHoResendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfiuHoResendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
