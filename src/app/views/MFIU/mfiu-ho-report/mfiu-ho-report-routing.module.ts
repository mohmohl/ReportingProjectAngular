import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MfiuHoReportComponent } from './mfiu-ho-report.component';

const routes: Routes = [
  {
    path: '', component: MfiuHoReportComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'MFIU HO Report',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'MFIU HO Report',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MFIUHOReportRoutingModule { }
