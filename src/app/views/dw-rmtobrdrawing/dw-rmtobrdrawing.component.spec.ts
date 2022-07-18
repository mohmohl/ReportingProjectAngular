import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwRmtobrdrawingComponent } from './dw-rmtobrdrawing.component';

describe('DwRmtobrdrawingComponent', () => {
  let component: DwRmtobrdrawingComponent;
  let fixture: ComponentFixture<DwRmtobrdrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwRmtobrdrawingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwRmtobrdrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
