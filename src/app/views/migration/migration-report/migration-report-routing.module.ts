import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MigrationReportComponent } from './migration-report.component';

const routes: Routes = [
  {
    path: '', component: MigrationReportComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Migration Report',
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
export class MigrationReportRoutingModule { }
