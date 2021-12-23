import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MABQuestionAnswerComponent } from './mab-question-answer.component';

describe('MABQuestionAnswerComponent', () => {
  let component: MABQuestionAnswerComponent;
  let fixture: ComponentFixture<MABQuestionAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MABQuestionAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MABQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

