import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { EOYGeneralTrialConsoReportComponent } from './eoy-general-trial-conso-report.component';

const routes: Routes = [
  {
    path: '',
    component: EOYGeneralTrialConsoReportComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'General Trial Report',
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

export class EOYGeneralTrialConsoReportRoutingModule { }