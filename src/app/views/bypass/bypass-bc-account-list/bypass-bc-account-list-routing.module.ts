import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { BypassBcAccountListComponent } from './bypass-bc-account-list.component';

const routes: Routes = [
  {
    path: '',
    component: BypassBcAccountListComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Better Current Account Cash% List',
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
export class ByPassBCAccountListRoutingModule { }