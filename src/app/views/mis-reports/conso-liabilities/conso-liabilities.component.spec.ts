import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoLiabilitiesComponent } from './conso-liabilities.component';

describe('ConsoLiabilitiesComponent', () => {
  let component: ConsoLiabilitiesComponent;
  let fixture: ComponentFixture<ConsoLiabilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoLiabilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoLiabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
