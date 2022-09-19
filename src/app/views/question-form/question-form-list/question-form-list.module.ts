import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionFormListRoutingModule } from './question-form-list-routing.module';
import { QuestionFormListComponent } from './question-form-list.component';


@NgModule({
  declarations: [QuestionFormListComponent],
  imports: [
    CommonModule,
    QuestionFormListRoutingModule
  ]
})
export class QuestionFormListModule { }
