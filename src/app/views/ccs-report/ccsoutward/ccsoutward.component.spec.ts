import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcsoutwardComponent } from './ccsoutward.component';

describe('CcsoutwardComponent', () => {
  let component: CcsoutwardComponent;
  let fixture: ComponentFixture<CcsoutwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcsoutwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcsoutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
