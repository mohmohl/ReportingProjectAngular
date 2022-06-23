import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MetreBillUploadComponent } from '../metre-bill-upload/metre-bill-upload.component';

const routes: Routes = [
  {
    path: '', component: MetreBillUploadComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Mertre Bill',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Merter Bill Upload',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetreBillUploadRoutingModule { }
