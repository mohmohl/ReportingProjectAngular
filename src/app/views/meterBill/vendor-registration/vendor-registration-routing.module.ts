import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { VendorRegistrationComponent } from './vendor-registration.component';

const routes: Routes = [
  {
    path: '', component: VendorRegistrationComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Vendor Registration',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Vendor Registration',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRegistrationRoutingModule { }
