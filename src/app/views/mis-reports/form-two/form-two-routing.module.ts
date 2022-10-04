import { AuthGuard } from './../../../../helpers/auth.guard';
import { FormTwoComponent } from './form-two.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: FormTwoComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Welcome',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit - Sample Page',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormTwoRoutingModule { }
