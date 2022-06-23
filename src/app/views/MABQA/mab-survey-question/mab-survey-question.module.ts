import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import {MabSurveyQuestionComponent} from './mab-survey-question.component';
import {MABSurveyQuestionRoutingModule} from './mab-survey-question-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MABSurveyQuestionRoutingModule,
    SharedModule
  ],
  declarations: [MabSurveyQuestionComponent]
})
export class MABSurveyQuestionModule { }