import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwRmtobrencashComponent } from './dw-rmtobrencash.component';

describe('DwRmtobrencashComponent', () => {
  let component: DwRmtobrencashComponent;
  let fixture: ComponentFixture<DwRmtobrencashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwRmtobrencashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwRmtobrencashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
