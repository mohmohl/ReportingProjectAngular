import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { VendorMeterBillUploadComponent } from './vendor-meter-bill-upload.component';

const routes: Routes = [
  {
    path: '', component: VendorMeterBillUploadComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Vendor Mertre Bill',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Vendor Mertre Bill Upload',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorMetreBillUploadRoutingModule { }
