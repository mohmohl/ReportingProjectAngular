import { AuthGuard } from './../../../../helpers/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthlySummaryCashComponent } from './monthly-summary-cash.component';


const routes: Routes = [
  {
    path: '',
    component: MonthlySummaryCashComponent,
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
export class MonthlySummaryCashRoutingModule { }
