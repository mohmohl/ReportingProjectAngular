import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfiuRemoveSendComponent } from './mfiu-remove-send.component';

describe('MfiuRemoveSendComponent', () => {
  let component: MfiuRemoveSendComponent;
  let fixture: ComponentFixture<MfiuRemoveSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfiuRemoveSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfiuRemoveSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
