import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassbookPrintingComponent } from './passbook-printing.component';

describe('PassbookPrintingComponent', () => {
  let component: PassbookPrintingComponent;
  let fixture: ComponentFixture<PassbookPrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassbookPrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassbookPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
