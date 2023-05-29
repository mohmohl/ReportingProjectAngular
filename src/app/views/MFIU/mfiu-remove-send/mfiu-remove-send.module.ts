import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MfiuRemoveSendComponent } from './mfiu-remove-send.component';
import { MFIURemoveSendRoutingModule } from './mfiu-remove-send-routing.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MFIURemoveSendRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MfiuRemoveSendComponent]
})
export class  MFIUHORemoveSendModule { }
