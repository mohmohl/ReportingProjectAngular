import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MfiuFileDownloadComponent } from './mfiu-file-download.component';

const routes: Routes = [
  {
    path: '', component: MfiuFileDownloadComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'MFIU File Download',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'MFIU File Download',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MFIUFileDownloadRoutingModule { }
