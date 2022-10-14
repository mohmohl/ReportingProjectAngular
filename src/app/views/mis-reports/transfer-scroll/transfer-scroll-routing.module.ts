import { TransferScrollComponent } from './transfer-scroll.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: TransferScrollComponent,
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
export class TransferScrollRoutingModule { }