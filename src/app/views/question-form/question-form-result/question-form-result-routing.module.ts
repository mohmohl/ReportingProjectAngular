import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { QuestionFormResultComponent } from './question-form-result.component';


const routes: Routes = [{
  path: '',
  component: QuestionFormResultComponent,
  canActivate: [AuthGuard],
  data: {
    breadcrumb: 'Question & Answer',
    icon: 'icofont icofont-file-document bg-c-pink',
    breadcrumb_caption: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit - Sample Page',
    status: true
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionFormResultRoutingModule { }
