import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import {MABQuestionAnswerComponent} from './mab-question-answer.component';
import {MABQuestionAnswerRoutingModule} from './mab-question-answer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MABQuestionAnswerRoutingModule,
    SharedModule
  ],
  declarations: [MABQuestionAnswerComponent]
})
export class MABQuestionAnswerModule { }