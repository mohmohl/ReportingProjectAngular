import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WrongCustomerNRCUpdateComponent } from './wrong-cust-nrc-update.component';


describe('MABDocUploadComponent', () => {
  let component: WrongCustomerNRCUpdateComponent;
  let fixture: ComponentFixture<WrongCustomerNRCUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongCustomerNRCUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongCustomerNRCUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
