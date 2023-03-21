import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { EOYDetailTrialReportComponent } from './eoy-detail-trial-report.component';


const routes: Routes = [
  {
    path: '',
    component: EOYDetailTrialReportComponent,
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

export class EOYDetailTrialReportRoutingModule { }