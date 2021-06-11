import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcsinwardComponent } from './ccsinward.component';

describe('CcsinwardComponent', () => {
  let component: CcsinwardComponent;
  let fixture: ComponentFixture<CcsinwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcsinwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcsinwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
