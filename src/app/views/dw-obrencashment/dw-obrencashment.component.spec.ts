import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwObrencashmentComponent } from './dw-obrencashment.component';

describe('DwObrencashmentComponent', () => {
  let component: DwObrencashmentComponent;
  let fixture: ComponentFixture<DwObrencashmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwObrencashmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwObrencashmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
