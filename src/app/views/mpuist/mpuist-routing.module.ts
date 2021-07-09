import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../helpers/auth.guard';
import { MpuistComponent } from './mpuist.component';

const routes: Routes = [
    {
      path: '',
      component: MpuistComponent,
      canActivate: [AuthGuard],
      data: {
        breadcrumb: 'MPU SETTLEMENT',
        icon: 'icofont icofont-file-document bg-c-pink',
        breadcrumb_caption: 'MPU SETTLEMENT',
        status: true
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MPUISTRoutingModule { }