import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcdbInfo2Component } from './fcdb-info2.component';

describe('FcdbInfo2Component', () => {
  let component: FcdbInfo2Component;
  let fixture: ComponentFixture<FcdbInfo2Component>;

  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcdbInfo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcdbInfo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
