import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcdbNewUserComponent } from './fcdb-new-user.component';

describe('FcdbNewUserComponent', () => {
  let component: FcdbNewUserComponent;
  let fixture: ComponentFixture<FcdbNewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcdbNewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcdbNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
