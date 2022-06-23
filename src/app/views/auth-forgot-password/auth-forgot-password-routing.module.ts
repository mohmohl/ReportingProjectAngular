import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { AuthForgotPasswordComponent } from './auth-forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthForgotPasswordComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Auth Forgot Password',
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

export class AuthForgotPasswordRoutingModule { }