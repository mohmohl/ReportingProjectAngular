import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticExistingIndividualComponent } from './domestic-existing-individual.component';

describe('DomesticExistingIndividualComponent', () => {
  let component: DomesticExistingIndividualComponent;
  let fixture: ComponentFixture<DomesticExistingIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticExistingIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticExistingIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
