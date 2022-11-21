import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { VoucherPrintComponent } from './voucher-print.component';

const routes: Routes = [
  {
    path: '', component: VoucherPrintComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Voucher Print',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Migration Report',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherPrintRoutingModule { }
