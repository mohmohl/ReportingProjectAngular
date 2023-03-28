import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MfiuDataCheckingComponent } from './mfiu-data-checking.component';

const routes: Routes = [
  {
    path: '', component: MfiuDataCheckingComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'MFIU Data Checking',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'MFIU Data Checking',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MFIUDataCheckingRoutingModule { }
