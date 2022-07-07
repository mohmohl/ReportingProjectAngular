import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwCctodrawingreversalComponent } from './dw-cctodrawingreversal.component';

describe('DwCctodrawingreversalComponent', () => {
  let component: DwCctodrawingreversalComponent;
  let fixture: ComponentFixture<DwCctodrawingreversalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwCctodrawingreversalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwCctodrawingreversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
