import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MfiuHoResendComponent } from './mfiu-ho-resend.component';
import { MFIUHOResendRoutingModule } from './mfiu-ho-resend-routing.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MFIUHOResendRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MfiuHoResendComponent]
})
export class  MFIUHOResendModule { }
