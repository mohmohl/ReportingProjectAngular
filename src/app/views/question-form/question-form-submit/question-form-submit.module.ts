import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionFormSubmitRoutingModule } from './question-form-submit-routing.module';
import { QuestionFormSubmitComponent } from './question-form-submit.component';


@NgModule({
  declarations: [QuestionFormSubmitComponent],
  imports: [
    CommonModule,
    QuestionFormSubmitRoutingModule
  ]
})
export class QuestionFormSubmitModule { }
