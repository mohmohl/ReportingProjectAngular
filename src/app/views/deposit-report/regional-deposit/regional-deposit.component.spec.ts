import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalDepositComponent } from './regional-deposit.component';

describe('RegionalDepositComponent', () => {
  let component: RegionalDepositComponent;
  let fixture: ComponentFixture<RegionalDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
