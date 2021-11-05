import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticExistingCompanyComponent } from './domestic-existing-company.component';

describe('DomesticExistingCompanyComponent', () => {
  let component: DomesticExistingCompanyComponent;
  let fixture: ComponentFixture<DomesticExistingCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticExistingCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticExistingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
