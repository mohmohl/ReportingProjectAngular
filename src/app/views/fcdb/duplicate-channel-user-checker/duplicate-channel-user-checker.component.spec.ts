import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateChannelUserCheckerComponent } from './duplicate-channel-user-checker.component';

describe('DuplicateChannelUserCheckerComponent', () => {
  let component: DuplicateChannelUserCheckerComponent;
  let fixture: ComponentFixture<DuplicateChannelUserCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateChannelUserCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateChannelUserCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
