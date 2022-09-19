import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BasicLoginComponent} from './basic-login.component';

const routes: Routes = [
  {
    path: '',
    component: BasicLoginComponent,
    data: {
      breadcrumb: 'Login',
      icon: '',
      breadcrumb_caption: '',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicLoginRoutingModule { }
