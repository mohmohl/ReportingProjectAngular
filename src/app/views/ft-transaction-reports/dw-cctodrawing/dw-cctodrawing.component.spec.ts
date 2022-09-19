import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwCctodrawingComponent } from './dw-cctodrawing.component';

describe('DwCctodrawingComponent', () => {
  let component: DwCctodrawingComponent;
  let fixture: ComponentFixture<DwCctodrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwCctodrawingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwCctodrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
