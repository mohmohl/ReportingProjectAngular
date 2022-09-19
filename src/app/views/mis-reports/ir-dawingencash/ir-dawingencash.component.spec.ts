import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrDawingencashComponent } from './ir-dawingencash.component';

describe('IrDawingencashComponent', () => {
  let component: IrDawingencashComponent;
  let fixture: ComponentFixture<IrDawingencashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrDawingencashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrDawingencashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
