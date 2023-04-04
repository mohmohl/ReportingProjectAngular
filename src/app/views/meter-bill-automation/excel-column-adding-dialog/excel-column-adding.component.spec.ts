import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcelColumnAddingComponent } from './excel-column-adding.component';


describe('ExcelColumnAddingComponent', () => {
  let component: ExcelColumnAddingComponent;
  let fixture: ComponentFixture<ExcelColumnAddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelColumnAddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelColumnAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
