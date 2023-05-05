import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MfiuHoResendComponent } from './mfiu-ho-resend.component';

const routes: Routes = [
  {
    path: '', component: MfiuHoResendComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'MFIU Resend',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'MFIU Resend',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MFIUHOResendRoutingModule { }
