import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BypassNewBcAccountComponent } from './bypass-new-bc-account.component';

describe('BypassNewBcAccountComponent', () => {
  let component: BypassNewBcAccountComponent;
  let fixture: ComponentFixture<BypassNewBcAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BypassNewBcAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BypassNewBcAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
