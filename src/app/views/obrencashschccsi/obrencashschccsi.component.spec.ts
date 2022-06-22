import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrencashschccsiComponent } from './obrencashschccsi.component';

describe('ObrencashschccsiComponent', () => {
  let component: ObrencashschccsiComponent;
  let fixture: ComponentFixture<ObrencashschccsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObrencashschccsiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrencashschccsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
