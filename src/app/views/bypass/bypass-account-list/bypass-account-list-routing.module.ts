import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { BypassAccountListComponent } from './bypass-account-list.component';

const routes: Routes = [
  {
    path: '',
    component: BypassAccountListComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'ByPass Account List',
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
export class ByPassAccountListRoutingModule { }