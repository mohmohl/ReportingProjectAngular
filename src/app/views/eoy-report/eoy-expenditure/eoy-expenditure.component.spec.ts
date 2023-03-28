import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EOYExpenditureComponent } from './eoy-expenditure.component';


describe('EOYExpenditureComponent', () => {
  let component: EOYExpenditureComponent;
  let fixture: ComponentFixture<EOYExpenditureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EOYExpenditureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOYExpenditureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
