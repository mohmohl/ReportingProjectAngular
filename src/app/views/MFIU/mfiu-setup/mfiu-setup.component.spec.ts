import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfiuSetupComponent } from './mfiu-setup.component';

describe('MfiuSetupComponent', () => {
  let component: MfiuSetupComponent;
  let fixture: ComponentFixture<MfiuSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfiuSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfiuSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
