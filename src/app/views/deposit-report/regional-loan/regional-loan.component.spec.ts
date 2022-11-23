import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalLoanComponent } from './regional-loan.component';

describe('RegionalLoanComponent', () => {
  let component: RegionalLoanComponent;
  let fixture: ComponentFixture<RegionalLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
