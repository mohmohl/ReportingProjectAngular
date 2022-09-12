import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { FcdbInfo2Component } from './fcdb-info2.component';


const routes: Routes = [
  {
    path: '',
    component: FcdbInfo2Component,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'FCDB & FCUBS Customer',
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
export class FcdbInfo2RoutingModule { }
