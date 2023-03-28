import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EOYIncomeComponent } from './eoy-income.component';


describe('EOYIncomeComponent', () => {
  let component: EOYIncomeComponent;
  let fixture: ComponentFixture<EOYIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EOYIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOYIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
