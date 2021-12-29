import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MabSurveyQuestionComponent } from './mab-survey-question.component';

describe('MabSurveyQuestionComponent', () => {
  let component: MabSurveyQuestionComponent;
  let fixture: ComponentFixture<MabSurveyQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MabSurveyQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MabSurveyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
