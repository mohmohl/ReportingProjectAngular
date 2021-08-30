import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import {UserPermissionComponent} from './user-permission.component';

const routes: Routes = [
  {
    path: '',
    component: UserPermissionComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'User Permission',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: ' ',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserPermissionRoutingModule { }