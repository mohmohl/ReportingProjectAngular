import { DmdReportOneComponent } from './dmd-report-one.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: DmdReportOneComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Welcome',
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
export class DmdReportOneRoutingModule { }
