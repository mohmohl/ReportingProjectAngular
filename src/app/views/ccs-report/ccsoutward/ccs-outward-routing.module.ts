import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcsoutwardComponent } from './ccsoutward.component';
import { AuthGuard } from '../../../../helpers/auth.guard';
const routes: Routes = [
    {
      path: '',
      component: CcsoutwardComponent,
      canActivate: [AuthGuard],
      data: {
        breadcrumb: 'RTGS Outward',
        icon: 'icofont icofont-file-document bg-c-pink',
        breadcrumb_caption: 'RTGS Outward Report',
        status: true
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CCSOutwardRoutingModule { }