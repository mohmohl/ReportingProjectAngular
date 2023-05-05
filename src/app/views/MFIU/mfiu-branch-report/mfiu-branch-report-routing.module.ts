import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MfiuBranchReportComponent } from './mfiu-branch-report.component';

const routes: Routes = [
  {
    path: '', component: MfiuBranchReportComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'MFIU Branch Report',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'MFIU Branch Report',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MFIUBranchReportRoutingModule { }
