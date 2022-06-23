import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MABDocViewManagementComponent } from './mab-doc-view-management.component';


describe('MABDocViewComponent', () => {
  let component: MABDocViewManagementComponent;
  let fixture: ComponentFixture<MABDocViewManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MABDocViewManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MABDocViewManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
