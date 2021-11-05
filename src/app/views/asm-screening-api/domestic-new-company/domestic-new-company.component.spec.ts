import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticNewCompanyComponent } from './domestic-new-company.component';

describe('DomesticNewCompanyComponent', () => {
  let component: DomesticNewCompanyComponent;
  let fixture: ComponentFixture<DomesticNewCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticNewCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticNewCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
