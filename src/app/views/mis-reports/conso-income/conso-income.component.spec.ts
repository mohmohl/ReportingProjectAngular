import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsoIncomeComponent } from './conso-income.component';


describe('ConsoIncomeComponent', () => {
  let component: ConsoIncomeComponent;
  let fixture: ComponentFixture<ConsoIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
