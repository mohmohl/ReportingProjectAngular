import { CustFcdbFcubsComponent } from './cust-fcdb-fcubs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: CustFcdbFcubsComponent,
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
export class CustFcdbFcubsRoutingModule { }
