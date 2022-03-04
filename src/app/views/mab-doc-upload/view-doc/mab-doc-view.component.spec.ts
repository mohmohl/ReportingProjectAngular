import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MABDocViewComponent } from './mab-doc-view.component';


describe('MABDocViewComponent', () => {
  let component: MABDocViewComponent;
  let fixture: ComponentFixture<MABDocViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MABDocViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MABDocViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
