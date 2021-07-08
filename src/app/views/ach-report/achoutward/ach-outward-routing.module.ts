import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../helpers/auth.guard';
import { AchoutwardComponent } from './achoutward.component';
const routes: Routes = [
    {
      path: '',
      component: AchoutwardComponent,
      canActivate: [AuthGuard],
      data: {
        breadcrumb: 'ACH Outward',
        icon: 'icofont icofont-file-document bg-c-pink',
        breadcrumb_caption: 'ACH Outward Report',
        status: true
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ACHOutwardRoutingModule { }