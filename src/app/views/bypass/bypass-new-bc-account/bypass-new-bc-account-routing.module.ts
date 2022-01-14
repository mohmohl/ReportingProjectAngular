import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { BypassNewBcAccountComponent } from './bypass-new-bc-account.component';

const routes: Routes = [
  {
    path: '',
    component: BypassNewBcAccountComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'New Better Current Account Cash% ',
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
export class ByPassNewBCAccountRoutingModule { }