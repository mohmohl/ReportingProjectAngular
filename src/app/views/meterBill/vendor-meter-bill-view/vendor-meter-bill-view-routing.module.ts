import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { VendorMeterBillViewComponent } from './vendor-meter-bill-view.component';

const routes: Routes = [
  {
    path: '', component: VendorMeterBillViewComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Vendor Mertre Bill View',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Vendor Mertre Bill View',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorMetreBillViewRoutingModule { }
