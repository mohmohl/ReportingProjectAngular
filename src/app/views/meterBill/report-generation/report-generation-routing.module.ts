import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { ReportGenerationComponent } from './report-generation.component';

const routes: Routes = [
  {
    path: '', component: ReportGenerationComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Report',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Report',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportGenerationRoutingModule { }
