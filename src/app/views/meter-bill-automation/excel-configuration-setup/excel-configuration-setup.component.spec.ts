import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcelConfigurationSetupComponent } from './excel-configuration-setup.component';


describe('MABDocViewComponent', () => {
  let component: ExcelConfigurationSetupComponent;
  let fixture: ComponentFixture<ExcelConfigurationSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelConfigurationSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelConfigurationSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
