import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwCctransferComponent } from './dw-cctransfer.component';

describe('DwCctransferComponent', () => {
  let component: DwCctransferComponent;
  let fixture: ComponentFixture<DwCctransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwCctransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwCctransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
