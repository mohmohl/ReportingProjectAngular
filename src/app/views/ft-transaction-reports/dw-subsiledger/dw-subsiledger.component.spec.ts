import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwSubsiledgerComponent } from './dw-subsiledger.component';

describe('DwSubsiledgerComponent', () => {
  let component: DwSubsiledgerComponent;
  let fixture: ComponentFixture<DwSubsiledgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwSubsiledgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwSubsiledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
