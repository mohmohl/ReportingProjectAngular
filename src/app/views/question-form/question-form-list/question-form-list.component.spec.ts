import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormListComponent } from './question-form-list.component';

describe('QuestionFormListComponent', () => {
  let component: QuestionFormListComponent;
  let fixture: ComponentFixture<QuestionFormListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFormListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
