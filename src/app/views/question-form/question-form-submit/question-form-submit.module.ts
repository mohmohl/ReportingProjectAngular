import { DialogService } from './../../../../helpers/dialog.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionFormSubmitRoutingModule } from './question-form-submit-routing.module';
import { QuestionFormSubmitComponent } from './question-form-submit.component';
import { CanDeactivateGuard } from 'src/helpers/can-deactivate-guard.service';


@NgModule({
  declarations: [QuestionFormSubmitComponent],
  imports: [
    CommonModule,
    QuestionFormSubmitRoutingModule
  ],
  providers: [
    CanDeactivateGuard,
    DialogService,
  ]
})
export class QuestionFormSubmitModule { }
