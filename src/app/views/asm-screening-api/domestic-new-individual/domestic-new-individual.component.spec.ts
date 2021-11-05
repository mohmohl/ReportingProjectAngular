import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticNewIndividualComponent } from './domestic-new-individual.component';

describe('DomesticNewIndividualComponent', () => {
  let component: DomesticNewIndividualComponent;
  let fixture: ComponentFixture<DomesticNewIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticNewIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticNewIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
