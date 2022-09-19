import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustFcdbFcubsComponent } from './cust-fcdb-fcubs.component';

describe('CustFcdbFcubsComponent', () => {
  let component: CustFcdbFcubsComponent;
  let fixture: ComponentFixture<CustFcdbFcubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustFcdbFcubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustFcdbFcubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
