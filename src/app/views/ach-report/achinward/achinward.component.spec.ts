import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchinwardComponent } from './achinward.component';

describe('AchinwardComponent', () => {
  let component: AchinwardComponent;
  let fixture: ComponentFixture<AchinwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchinwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchinwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
