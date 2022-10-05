import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { DetailTrialReportComponent } from './detail-trial-report.component';

const routes: Routes = [
  {
    path: '',
    component: DetailTrialReportComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Detail Trial Report',
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

export class DetailTrialReportRoutingModule { }