import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BypassEditAccountComponent } from './bypass-edit-account.component';

describe('BypassEditAccountComponent', () => {
  let component: BypassEditAccountComponent;
  let fixture: ComponentFixture<BypassEditAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BypassEditAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BypassEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
