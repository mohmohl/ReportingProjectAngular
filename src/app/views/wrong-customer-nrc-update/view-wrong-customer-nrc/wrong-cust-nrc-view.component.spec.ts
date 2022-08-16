import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WrongCustomerNRCViewComponent } from './wrong-cust-nrc-view.component';


describe('MABDocUploadComponent', () => {
  let component: WrongCustomerNRCViewComponent;
  let fixture: ComponentFixture<WrongCustomerNRCViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongCustomerNRCViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongCustomerNRCViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
