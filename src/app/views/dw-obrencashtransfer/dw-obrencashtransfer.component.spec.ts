import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwObrencashtransferComponent } from './dw-obrencashtransfer.component';

describe('DwObrencashtransferComponent', () => {
  let component: DwObrencashtransferComponent;
  let fixture: ComponentFixture<DwObrencashtransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwObrencashtransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwObrencashtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
