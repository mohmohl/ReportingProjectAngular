import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MABDocUploadComponent } from './mab-doc-upload.component';


describe('MABDocUploadComponent', () => {
  let component: MABDocUploadComponent;
  let fixture: ComponentFixture<MABDocUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MABDocUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MABDocUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
