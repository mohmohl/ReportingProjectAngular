import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormSubmitComponent } from './question-form-submit.component';

describe('QuestionFormSubmitComponent', () => {
  let component: QuestionFormSubmitComponent;
  let fixture: ComponentFixture<QuestionFormSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFormSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
