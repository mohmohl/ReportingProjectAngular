import { QuestionFormSubmitComponent } from './question-form-submit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { CanDeactivateGuard } from 'src/helpers/can-deactivate-guard.service';


const routes: Routes = [{
  path: '',
  component: QuestionFormSubmitComponent,
  canActivate: [AuthGuard],
  canDeactivate: [CanDeactivateGuard],
  data: {
    breadcrumb: 'Question & Answer',
    icon: 'icofont icofont-file-document bg-c-pink',
    breadcrumb_caption: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit - Sample Page',
    status: true
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionFormSubmitRoutingModule { }
