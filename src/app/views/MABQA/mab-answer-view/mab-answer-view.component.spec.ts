import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MABAnswerViewComponent } from './mab-answer-view.component';

describe('AsmAnswerViewComponent', () => {
  let component: MABAnswerViewComponent;
  let fixture: ComponentFixture<MABAnswerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MABAnswerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MABAnswerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
