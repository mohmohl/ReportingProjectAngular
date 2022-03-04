import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthForgotPasswordRoutingModule } from './auth-forgot-password-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthForgotPasswordComponent } from './auth-forgot-password.component';


@NgModule({
  imports: [
    CommonModule,
    AuthForgotPasswordRoutingModule,
    SharedModule
  ],
  declarations: [AuthForgotPasswordComponent]
})
export class AuthForgotPasswordModule { }