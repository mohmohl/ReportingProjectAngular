import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwObrencashccsiComponent } from './dw-obrencashccsi.component';

describe('DwObrencashccsiComponent', () => {
  let component: DwObrencashccsiComponent;
  let fixture: ComponentFixture<DwObrencashccsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwObrencashccsiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwObrencashccsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
