import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MeterBillUploadComponent } from './meter-bill-upload.component';


describe('MABDocUploadComponent', () => {
  let component: MeterBillUploadComponent;
  let fixture: ComponentFixture<MeterBillUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterBillUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterBillUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
