import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EOYConsoAssetsComponent } from './eoy-assets.component';


describe('EOYConsoAssetsComponent', () => {
  let component: EOYConsoAssetsComponent;
  let fixture: ComponentFixture<EOYConsoAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EOYConsoAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOYConsoAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
