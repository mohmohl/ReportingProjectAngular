import { QuestionReportComponent } from './question-report.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionReportRoutingModule } from './question-report-routing.module';


@NgModule({
  declarations: [
    QuestionReportComponent,
  ],
  imports: [
    CommonModule,
    QuestionReportRoutingModule
  ]
})
export class QuestionReportModule { }
