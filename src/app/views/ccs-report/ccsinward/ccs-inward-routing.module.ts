import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcsinwardComponent } from './ccsinward.component';
import { AuthGuard } from '../../../../helpers/auth.guard';
const routes: Routes = [
    {
      path: '',
      component: CcsinwardComponent,
      canActivate: [AuthGuard],
      data: {
        breadcrumb: 'RTGS Inward',
        icon: 'icofont icofont-file-document bg-c-pink',
        breadcrumb_caption: 'RTGS Inward Report',
        status: true
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CCSInwardRoutingModule { }