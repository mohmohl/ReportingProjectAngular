import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MabSurveySettingComponent } from './mab-survey-setting.component';

describe('MabSurveySettingComponent', () => {
  let component: MabSurveySettingComponent;
  let fixture: ComponentFixture<MabSurveySettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MabSurveySettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MabSurveySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
