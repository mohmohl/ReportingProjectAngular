import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EOYLiabilitiesComponent } from './eoy-liabilities.component';


describe('EOYLiabilitiesComponent', () => {
  let component: EOYLiabilitiesComponent;
  let fixture: ComponentFixture<EOYLiabilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EOYLiabilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOYLiabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
