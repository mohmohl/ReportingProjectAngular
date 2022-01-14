import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BypassBcAccountListComponent } from './bypass-bc-account-list.component';

describe('BypassBcAccountListComponent', () => {
  let component: BypassBcAccountListComponent;
  let fixture: ComponentFixture<BypassBcAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BypassBcAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BypassBcAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
