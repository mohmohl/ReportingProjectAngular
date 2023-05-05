import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MfiuDataCheckingComponent } from './mfiu-data-checking.component';

describe('MfiuDataCheckingComponent', () => {
  let component: MfiuDataCheckingComponent;
  let fixture: ComponentFixture<MfiuDataCheckingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MfiuDataCheckingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MfiuDataCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
