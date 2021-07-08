import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../helpers/auth.guard';
import { AchinwardComponent } from './achinward.component';
const routes: Routes = [
    {
      path: '',
      component: AchinwardComponent,
      canActivate: [AuthGuard],
      data: {
        breadcrumb: 'ACH Inward',
        icon: 'icofont icofont-file-document bg-c-pink',
        breadcrumb_caption: 'ACH Inward Report',
        status: true
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ACHInwardRoutingModule { }