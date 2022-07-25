import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsUserHomeBranchReportComponent } from './bs-user-home-branch-report.component';


describe('BsUserHomeBranchReportComponent', () => {
  let component: BsUserHomeBranchReportComponent;
  let fixture: ComponentFixture<BsUserHomeBranchReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsUserHomeBranchReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsUserHomeBranchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
