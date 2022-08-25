import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwDomestictransferreversalComponent } from './dw-domestictransferreversal.component';

describe('DwDomestictransferreversalComponent', () => {
  let component: DwDomestictransferreversalComponent;
  let fixture: ComponentFixture<DwDomestictransferreversalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwDomestictransferreversalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwDomestictransferreversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
