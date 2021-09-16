import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BypassAccountListComponent } from './bypass-account-list.component';

describe('BypassAccountListComponent', () => {
  let component: BypassAccountListComponent;
  let fixture: ComponentFixture<BypassAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BypassAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BypassAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
