import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateChannelUserComponent } from './duplicate-channel-user.component';

describe('DuplicateChannelUserComponent', () => {
  let component: DuplicateChannelUserComponent;
  let fixture: ComponentFixture<DuplicateChannelUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateChannelUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateChannelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
