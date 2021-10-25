import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenoImportComponent } from './deno-import.component';

describe('DenoImportComponent', () => {
  let component: DenoImportComponent;
  let fixture: ComponentFixture<DenoImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenoImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenoImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
