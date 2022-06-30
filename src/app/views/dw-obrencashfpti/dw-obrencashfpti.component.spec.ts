import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwObrencashfptiComponent } from './dw-obrencashfpti.component';

describe('DwObrencashfptiComponent', () => {
  let component: DwObrencashfptiComponent;
  let fixture: ComponentFixture<DwObrencashfptiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwObrencashfptiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwObrencashfptiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
