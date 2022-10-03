import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoExpenditureComponent } from './conso-Expenditure.component';


describe('ConsoExpenditureComponent', () => {
  let component: ConsoExpenditureComponent;
  let fixture: ComponentFixture<ConsoExpenditureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoExpenditureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoExpenditureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
