import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    SharedModule
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
