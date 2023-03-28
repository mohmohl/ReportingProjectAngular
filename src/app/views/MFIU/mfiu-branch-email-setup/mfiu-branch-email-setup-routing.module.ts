import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MfiuBranchEmailSetupComponent } from './mfiu-branch-email-setup.component';

const routes: Routes = [
  {
    path: '', component: MfiuBranchEmailSetupComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'MFIU Email Setup',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'MFIU Email Setup',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MFIUBranchEmailSetupRoutingModule { }
