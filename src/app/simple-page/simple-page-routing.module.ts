import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import {SimplePageComponent} from './simple-page.component';

const routes: Routes = [
  {
    path: '',
    component: SimplePageComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Welcome Page',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Welcome Page',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimplePageRoutingModule { }
