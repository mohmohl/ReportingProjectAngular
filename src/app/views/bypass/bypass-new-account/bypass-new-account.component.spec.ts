import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BypassNewAccountComponent } from './bypass-new-account.component';

describe('BypassNewAccountComponent', () => {
  let component: BypassNewAccountComponent;
  let fixture: ComponentFixture<BypassNewAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BypassNewAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BypassNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
