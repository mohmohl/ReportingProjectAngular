import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerSearchFilterComponent } from './cust-search-filter.component';


describe('CustomerSearchFilterComponent', () => {
  let component: CustomerSearchFilterComponent;
  let fixture: ComponentFixture<CustomerSearchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
