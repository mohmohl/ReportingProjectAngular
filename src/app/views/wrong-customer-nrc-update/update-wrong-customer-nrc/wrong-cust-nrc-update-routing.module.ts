import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { WrongCustomerNRCUpdateComponent } from './wrong-cust-nrc-update.component';

const routes: Routes = [
  {
    path: '',
    component: WrongCustomerNRCUpdateComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Wrong Customer NRC Update',
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
export class WrongCustomerNRCUpdateRoutingModule { }
