import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Hod2ReportComponent } from './hod2-report.component';


describe('Hod2ReportComponent', () => {
  let component: Hod2ReportComponent;
  let fixture: ComponentFixture<Hod2ReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hod2ReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hod2ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
