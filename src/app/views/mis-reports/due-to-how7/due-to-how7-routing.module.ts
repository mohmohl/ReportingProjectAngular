
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { DueToHOW7Component } from './due-to-how7.component';


const routes: Routes = [
  {
    path: '',
    component: DueToHOW7Component,
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
export class DueToHOW7RoutingModule { }
