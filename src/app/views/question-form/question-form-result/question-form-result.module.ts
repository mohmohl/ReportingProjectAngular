import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionFormResultRoutingModule } from './question-form-result-routing.module';
import { QuestionFormResultComponent } from './question-form-result.component';


@NgModule({
  declarations: [QuestionFormResultComponent],
  imports: [
    CommonModule,
    QuestionFormResultRoutingModule
  ]
})
export class QuestionFormResultModule { }
