import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MfiuSetupComponent } from './mfiu-setup.component';

const routes: Routes = [
  {
    path: '', component: MfiuSetupComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'MFIU Setup',
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
export class MFIUSetupRoutingModule { }
